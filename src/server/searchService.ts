import { GoogleGenAI } from '@google/genai';
import { findOfflinePart } from '../data/offlineCatalog';
import { matchBrazilianPart } from '../data/brazilianPartsEngine';
import { getRioClaroSuppliersForPart } from '../data/rioClaroSuppliers';
import { OFFICIAL_BRAND_CATALOG_GUIDE_TEXT } from '../data/officialBrandRules';
import {
  executeMultiSourceWebSearch,
  classifySourceChannel,
  extractCoreModelTokens,
  WebSearchSource,
} from './webSearchService';

export function getAiClient(): GoogleGenAI | null {
  const apiKey =
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.API_KEY;

  if (!apiKey) {
    return null;
  }

  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// In-memory circuit breaker: when quota is exhausted (429/402), avoid hammering API for 60 seconds
let quotaExhaustedUntil = 0;

function isTransientAiError(err: any): boolean {
  const msg = (err?.message || '').toLowerCase();
  const status = err?.status || '';
  const code = err?.code || err?.error?.code;

  return (
    status === 'RESOURCE_EXHAUSTED' ||
    status === 'UNAVAILABLE' ||
    code === 429 ||
    code === 503 ||
    code === 402 ||
    msg.includes('429') ||
    msg.includes('503') ||
    msg.includes('402') ||
    msg.includes('quota') ||
    msg.includes('resource_exhausted') ||
    msg.includes('unavailable') ||
    msg.includes('high demand')
  );
}

async function generateWithGoogleGrounding(
  ai: GoogleGenAI,
  prompt: string
): Promise<{ response: any; modelUsed: string; searchUsed: boolean } | null> {
  if (Date.now() < quotaExhaustedUntil) {
    console.log(
      `[Circuit Breaker Active] Cooldown active for ${Math.round((quotaExhaustedUntil - Date.now()) / 1000)}s.`
    );
    return null;
  }

  // Primary: gemini-4-hydrogen with Google Search grounding (no temperature/topP overrides)
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });
    return { response: res, modelUsed: 'gemini-4-hydrogen', searchUsed: true };
  } catch (err1: any) {
    console.warn('[Gemini Primary] Error with gemini-4-hydrogen:', err1?.message || err1);
    // Fallback: gemini-3.1-flash-lite with Google Search grounding
    try {
      const res2 = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });
      return { response: res2, modelUsed: 'gemini-3.1-flash-lite', searchUsed: true };
    } catch (err2: any) {
      if (isTransientAiError(err1) || isTransientAiError(err2)) {
        quotaExhaustedUntil = Date.now() + 60000;
      }
      console.warn('[Gemini Fallback] Unavailable:', err2?.message || err2);
      return null;
    }
  }
}

function normalizeCheckText(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasWordBound(haystackNorm: string, tokenRaw: string): boolean {
  const token = normalizeCheckText(tokenRaw);
  if (!token) return false;
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|\\s)${escaped}(?:$|\\s)`).test(haystackNorm);
}

const KNOWN_VEHICLE_FAMILIES = [
  'celta', 'prisma', 'astra', 'vectra', 'zafira', 'corsa', 'onix', 'montana', 'meriva',
  'cobalt', 'spin', 'cruze', 's10', 'tracker', 'gol', 'polo', 'golf', 'fox', 'saveiro',
  'voyage', 'up', 'virtus', 'nivus', 't-cross', 'amarok', 'palio', 'uno', 'strada',
  'siena', 'argo', 'mobi', 'toro', 'cronos', 'pulse', 'fiorino', 'ka', 'fiesta',
  'ecosport', 'focus', 'ranger', 'hb20', 'creta', 'corolla', 'hilux', 'etios', 'yaris',
  'civic', 'fit', 'city', 'hrv', 'sandero', 'logan', 'duster', 'kwid', 'kicks', 'versa',
  'march', 'frontier', 'renegade', 'compass', 'korando',
];

function isResultConsistentWithQuery(
  parsedData: any,
  model: string,
  engine?: string
): { valid: boolean; reason?: string } {
  if (!parsedData || typeof parsedData !== 'object') {
    return { valid: false, reason: 'JSON estruturado inválido ou ausente.' };
  }

  const carSummaryNorm = normalizeCheckText(parsedData.carSummary || '');
  const modelNorm = normalizeCheckText(model);
  const coreTokens = extractCoreModelTokens(model);

  // 1. Returned carSummary must mention at least one core model token requested by the user
  if (coreTokens.length > 0) {
    const mentionsRequestedModel = coreTokens.some((tok) => hasWordBound(carSummaryNorm, tok));
    if (!mentionsRequestedModel) {
      return {
        valid: false,
        reason: `Veículo retornado ("${parsedData.carSummary}") não corresponde ao solicitado ("${model}").`,
      };
    }
  }

  // 2. Reject if carSummary mentions a completely unrelated model family that user did NOT ask for
  const conflictingFamilies = KNOWN_VEHICLE_FAMILIES.filter((fam) => {
    const userAskedFam = hasWordBound(modelNorm, fam);
    const summaryMentionsFam = hasWordBound(carSummaryNorm, fam);
    if (!summaryMentionsFam || userAskedFam) return false;

    // Allow natural shared platforms when requested model is also present in carSummary
    const sharedGroups = [
      ['celta', 'prisma'],
      ['astra', 'zafira', 'vectra'],
      ['gol', 'voyage', 'saveiro', 'parati'],
      ['palio', 'siena', 'strada', 'weekend'],
      ['onix', 'prisma', 'cobalt', 'spin'],
      ['sandero', 'logan'],
    ];
    for (const grp of sharedGroups) {
      if (grp.includes(fam) && grp.some((sibling) => hasWordBound(modelNorm, sibling))) {
        return false;
      }
    }
    return true;
  });

  if (conflictingFamilies.length > 0) {
    return {
      valid: false,
      reason: `Contaminação detectada: resposta citou outro veículo (${conflictingFamilies.join(', ')}) em vez de ${model}.`,
    };
  }

  // 3. Reject blatant engine displacement mismatch (e.g. asked 2.0, summary says 1.0/1.4 without 2.0)
  const engineNorm = normalizeCheckText(engine || '');
  const askedDisp = engineNorm.match(/\b(1\.0|1\.3|1\.4|1\.5|1\.6|1\.8|2\.0|2\.2|2\.4|2\.8|3\.0)\b/);
  if (askedDisp) {
    const targetDisp = askedDisp[1];
    const summaryDisps = carSummaryNorm.match(/\b(1\.0|1\.3|1\.4|1\.5|1\.6|1\.8|2\.0|2\.2|2\.4|2\.8|3\.0)\b/g);
    if (summaryDisps && summaryDisps.length > 0 && !summaryDisps.includes(targetDisp)) {
      return {
        valid: false,
        reason: `Divergência de motorização: solicitado ${targetDisp}, retornado ${summaryDisps.join('/')}.`,
      };
    }
  }

  return { valid: true };
}

function parseJsonFromGeminiResponse(responseText: string): any | null {
  try {
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      return JSON.parse(jsonMatch[1]);
    }
    const firstBrace = responseText.indexOf('{');
    const lastBrace = responseText.lastIndexOf('}');
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
      return JSON.parse(responseText.substring(firstBrace, lastBrace + 1));
    }
  } catch (parseErr) {
    console.warn('Failed to parse strict JSON from Gemini response:', parseErr);
  }
  return null;
}

export interface SearchPartInput {
  part: string;
  model: string;
  year?: string;
  engine?: string;
  notes?: string;
  transmission?: string;
  vinOrPlate?: string;
}

export async function executePartSearch(params: SearchPartInput) {
  const { part, model, year, engine, notes, transmission, vinOrPlate } = params;

  if (!part || !model) {
    throw new Error('Peça e Modelo do veículo são obrigatórios.');
  }

  // STEP 1: Build direct Google + MercadoLivre links & optional live web hints (strictly model-guarded)
  const liveWeb = await executeMultiSourceWebSearch({
    part,
    model,
    year,
    engine,
    notes,
    transmission,
  });

  const ai = getAiClient();
  let generateResult: { response: any; modelUsed: string; searchUsed: boolean } | null = null;
  let parsedData: any = null;

  const buildPrompt = (correctionWarning?: string) => `Você é o maior especialista do Brasil em catálogos de autopeças e suporte técnico para vendedores de balcão e televendas de autopeças.
O vendedor está com o cliente no balcão ou no telefone e precisa dos CÓDIGOS DE REFERÊNCIA EXATOS para consultar no estoque e passar para o cliente.

DADOS EXATOS DO VEÍCULO E DA PEÇA SOLICITADOS:
- Peça solicitada: "${part}"
- Veículo / Modelo: "${model}"
- Ano / Modelo: "${year || 'Não especificado'}"
- Motorização / Combustível: "${engine || 'Não especificado'}"
- Câmbio / Transmissão: "${transmission || 'Não especificado'}"
- Detalhes / Observações adicionais: "${notes || 'Nenhum'}"
- Placa ou Chassi: "${vinOrPlate || 'Nenhum'}"

${correctionWarning ? `⚠️ CORREÇÃO OBRIGATÓRIA DA TENTATIVA ANTERIOR:\n${correctionWarning}\n` : ''}
${liveWeb.summaryText ? `[Trechos preliminares da Web encontrados para ${model}]:\n${liveWeb.summaryText}\n` : ''}
${liveWeb.extractedOemCodes.length > 0 ? `[Códigos OEM detectados para ${model}]: ${JSON.stringify(liveWeb.extractedOemCodes)}\n` : ''}
${liveWeb.extractedAftermarketCodes.length > 0 ? `[Códigos Aftermarket detectados para ${model}]: ${JSON.stringify(liveWeb.extractedAftermarketCodes)}\n` : ''}

INSTRUÇÕES OBRIGATÓRIAS DE PESQUISA (GOOGLE SEARCH + MERCADOLIVRE + CATÁLOGOS):
1. Utilize obrigatoriamente a ferramenta Google Search fazendo buscas específicas para "${part} ${model} ${year || ''} ${engine || ''} ${transmission || ''} ${notes || ''}" incluindo consultas no banco de anúncios e catálogos do MercadoLivre (ex: site:mercadolivre.com.br) e catálogos oficiais dos fabricantes no Brasil (Visconde, Valeo, Magneti Marelli, Mahle, Nakata, Cofap, Monroe, KYB, LUK, Sachs, Bosch, NGK, Urba, Schadek, MTE-Thomson, Valclei, Wahler, Cobreq, SYL, Tecfil, Sabó, Gates, Dayco, Continental, SKF, IMA).
2. EXATIDÃO ABSOLUTA DO VEÍCULO:
   - Retorne EXCLUSIVAMENTE códigos que sirvam no veículo "${model}" ${year || ''} ${engine || ''} ${transmission || ''} ${notes || ''}.
   - NUNCA confunda plataformas diferentes (por exemplo, NÃO misture Celta/Corsa com Astra/Vectra/Zafira, nem Gol com Golf, nem Ka com Fiesta).
   - Respeite rigorosamente as especificações de AR CONDICIONADO (Com Ar vs Sem Ar), CÂMBIO (Manual vs Automático - radiador de automático tem trocador de óleo ATF!), EIXO (Dianteiro vs Traseiro) e MOTORIZAÇÃO (${engine || 'informada'}).
   - NUNCA invente ou chute códigos. Se um código OEM ou de marca for obtido, confirme sua aplicação real nas fontes do Google e MercadoLivre encontradas.

3. LINHA OFICIAL DE MARCAS E CATÁLOGO HOMOLOGADO:
${OFFICIAL_BRAND_CATALOG_GUIDE_TEXT}

Para cada opção aftermarket identificada, forneça:
- 'salesVolume': 'Mais vendida' | 'Média saída' | 'Menos vendida'
- 'tier': '1ª Linha' (OEM / Original montadora) | '2ª Linha' (Reposição consolidada) | '3ª Linha' (Linha alternativa)
- 'verdictBadge': 'Melhor em Qualidade' | 'Melhor Custo-Benefício' | 'Melhor em Durabilidade' | 'Opção Econômica'
- 'technicalDetails': Detalhamento técnico de medidas (ex: dimensões da colmeia em mm, número de dentes, diâmetro do disco), material e aplicação exata.
- 'persuasiveDetails': Argumento técnico convincente para o vendedor apresentar ao cliente.
- 'warrantyInfo': Termo de garantia padrão do fabricante.

FORMATO DE RESPOSTA OBRIGATÓRIO (JSON estrito em bloco \`\`\`json ... \`\`\`):
{
  "carSummary": "Nome completo e padronizado EXATAMENTE do veículo solicitado (${model} ${year || ''} ${engine || ''})",
  "partSummary": "Nome técnico e padronizado da peça",
  "category": "Categoria da peça",
  "quantityUsedInVehicle": "Quantidade exata que vai no carro",
  "oemCodes": [{ "code": "Código OEM exato", "brandOrOrigin": "Montadora", "notes": "Aplicação exata" }],
  "aftermarketCodes": [{
    "brand": "Nome da Marca",
    "code": "Código de catálogo exato",
    "lineOrType": "Linha ou tipo",
    "popularInBrazil": true,
    "salesVolume": "Mais vendida | Média saída | Menos vendida",
    "tier": "1ª Linha | 2ª Linha | 3ª Linha",
    "verdictBadge": "Melhor em Qualidade | Melhor Custo-Benefício | Melhor em Durabilidade | Opção Econômica",
    "technicalDetails": "Detalhes técnicos e dimensões",
    "persuasiveDetails": "Argumento de venda",
    "warrantyInfo": "Garantia"
  }],
  "technicalSpecs": [{ "label": "Nome", "value": "Valor" }],
  "applicationWarnings": ["Aviso crítico de balcão específico para este veículo e variação"],
  "complementaryParts": [{ "name": "Peça complementar", "reason": "Motivo", "referenceCodes": "Códigos líderes compatíveis" }],
  "quickSalesPitch": "Frase pronta para o vendedor falar no telefone",
  "whatsappMessage": "Mensagem formatada para WhatsApp com códigos deste veículo"
}`;

  if (ai) {
    try {
      generateResult = await generateWithGoogleGrounding(ai, buildPrompt());

      if (generateResult) {
        const candidateParsed = parseJsonFromGeminiResponse(generateResult.response.text || '');
        const check = isResultConsistentWithQuery(candidateParsed, model, engine);

        if (check.valid) {
          parsedData = candidateParsed;
        } else {
          console.warn(
            `[Vehicle Consistency Guard] Rejected initial Gemini response for "${model}": ${check.reason}. Retrying once...`
          );
          const retryResult = await generateWithGoogleGrounding(
            ai,
            buildPrompt(
              `A resposta anterior falhou na validação: ${check.reason}. Refaça a busca no Google e no MercadoLivre (site:mercadolivre.com.br) EXCLUSIVAMENTE para "${part}" do veículo "${model} ${year || ''} ${engine || ''} ${transmission || ''} ${notes || ''}".`
            )
          );
          if (retryResult) {
            const retryParsed = parseJsonFromGeminiResponse(retryResult.response.text || '');
            const retryCheck = isResultConsistentWithQuery(retryParsed, model, engine);
            if (retryCheck.valid) {
              generateResult = retryResult;
              parsedData = retryParsed;
            } else {
              console.warn(
                `[Vehicle Consistency Guard] Retry also failed for "${model}": ${retryCheck.reason}. Discarding inconsistent AI result.`
              );
              generateResult = null;
              parsedData = null;
            }
          } else {
            generateResult = null;
            parsedData = null;
          }
        }
      }
    } catch (genError: any) {
      console.warn('AI grounded search failed:', genError?.message || genError);
      generateResult = null;
      parsedData = null;
    }
  }

  // TIER 2: Exact Verified Catalog Lookup (ONLY when live AI grounding is unavailable/rejected)
  if (!generateResult || !parsedData) {
    const offlineMatch =
      findOfflinePart(part, model, engine, notes, year, transmission) ||
      matchBrazilianPart(part, model, engine, notes);

    if (!offlineMatch) {
      const err: any = new Error(
        `Não foi possível obter uma referência confirmada no Google/MercadoLivre para "${part} - ${model} ${year || ''} ${engine || ''}". Nenhum registro exato para este veículo foi encontrado na base verificada local.`
      );
      err.statusCode = 503;
      err.directLinks = liveWeb.directLinks;
      throw err;
    }

    const localSuppliers = getRioClaroSuppliersForPart(
      offlineMatch.partSummary,
      offlineMatch.category
    );

    const mergedOem = [...offlineMatch.oemCodes];
    for (const liveOem of liveWeb.extractedOemCodes) {
      if (!mergedOem.some((o) => o.code === liveOem.code)) {
        mergedOem.push(liveOem);
      }
    }

    const mergedAftermarket = [...offlineMatch.aftermarketCodes];
    for (const liveAfter of liveWeb.extractedAftermarketCodes) {
      const idx = mergedAftermarket.findIndex(
        (a) => a.brand.toLowerCase() === liveAfter.brand.toLowerCase()
      );
      if (idx >= 0) {
        mergedAftermarket[idx] = { ...mergedAftermarket[idx], ...liveAfter };
      } else {
        mergedAftermarket.push(liveAfter);
      }
    }

    const mergedSpecs = [...offlineMatch.technicalSpecs];
    for (const s of liveWeb.extractedSpecs) {
      if (!mergedSpecs.some((sp) => sp.label.toLowerCase() === s.label.toLowerCase())) {
        mergedSpecs.push(s);
      }
    }

    const mergedWarnings = [...offlineMatch.applicationWarnings];
    for (const w of liveWeb.extractedWarnings) {
      if (!mergedWarnings.some((mw) => mw.toLowerCase() === w.toLowerCase())) {
        mergedWarnings.unshift(w);
      }
    }

    return {
      id: `catalog-${Date.now()}`,
      timestamp: Date.now(),
      query: { part, model, year, engine, notes, transmission, vinOrPlate },
      carSummary: offlineMatch.carSummary,
      partSummary: offlineMatch.partSummary,
      category: offlineMatch.category,
      quantityUsedInVehicle: offlineMatch.quantityUsedInVehicle,
      verificationStatus: 'verified_catalog' as const,
      oemCodes: mergedOem,
      aftermarketCodes: mergedAftermarket,
      technicalSpecs: mergedSpecs,
      applicationWarnings: mergedWarnings,
      complementaryParts: offlineMatch.complementaryParts,
      quickSalesPitch: offlineMatch.quickSalesPitch,
      whatsappMessage: offlineMatch.whatsappMessage,
      suppliersRioClaro: localSuppliers,
      groundingSources: liveWeb.sources,
      directLinks: liveWeb.directLinks,
      searchQueries: liveWeb.queries,
    };
  }

  // Merge Google Search grounding chunks with liveWeb sources, classifying channels cleanly
  const { response } = generateResult;
  const responseText = response.text || '';

  const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const groundingSources: WebSearchSource[] = [];
  const seenUris = new Set<string>();

  for (const chunk of rawChunks) {
    if (chunk.web?.uri && !seenUris.has(chunk.web.uri)) {
      seenUris.add(chunk.web.uri);
      groundingSources.push({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri,
        sourceChannel: classifySourceChannel(chunk.web.uri),
      });
    }
  }

  for (const s of liveWeb.sources) {
    if (!seenUris.has(s.uri)) {
      seenUris.add(s.uri);
      groundingSources.push({
        ...s,
        sourceChannel: s.sourceChannel || classifySourceChannel(s.uri),
      });
    }
  }

  const geminiSearchQueries: string[] =
    response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
  const searchQueries = Array.from(new Set([...geminiSearchQueries, ...liveWeb.queries]));

  if (!parsedData.oemCodes || parsedData.oemCodes.length === 0) {
    parsedData.oemCodes = liveWeb.extractedOemCodes;
  }
  if (!parsedData.aftermarketCodes || parsedData.aftermarketCodes.length === 0) {
    parsedData.aftermarketCodes = liveWeb.extractedAftermarketCodes;
  }
  if (!Array.isArray(parsedData.applicationWarnings)) {
    parsedData.applicationWarnings = [];
  }
  if (liveWeb.extractedWarnings.length > 0) {
    for (const w of liveWeb.extractedWarnings) {
      if (!parsedData.applicationWarnings.includes(w)) {
        parsedData.applicationWarnings.unshift(w);
      }
    }
  }

  const suppliersRioClaro = getRioClaroSuppliersForPart(
    parsedData.partSummary || part,
    parsedData.category || 'Geral'
  );

  return {
    id: `part-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    query: { part, model, year, engine, notes, transmission, vinOrPlate },
    carSummary: parsedData.carSummary || `${model} ${year || ''} ${engine || ''}`.trim(),
    partSummary: parsedData.partSummary || part,
    category: parsedData.category || 'Geral',
    quantityUsedInVehicle: parsedData.quantityUsedInVehicle || undefined,
    verificationStatus: 'online_google_ml' as const,
    oemCodes: Array.isArray(parsedData.oemCodes) ? parsedData.oemCodes : [],
    aftermarketCodes: Array.isArray(parsedData.aftermarketCodes) ? parsedData.aftermarketCodes : [],
    technicalSpecs: Array.isArray(parsedData.technicalSpecs) ? parsedData.technicalSpecs : [],
    applicationWarnings: parsedData.applicationWarnings,
    complementaryParts: Array.isArray(parsedData.complementaryParts)
      ? parsedData.complementaryParts
      : [],
    quickSalesPitch: parsedData.quickSalesPitch || '',
    whatsappMessage: parsedData.whatsappMessage || '',
    suppliersRioClaro,
    groundingSources,
    directLinks: liveWeb.directLinks,
    searchQueries,
    rawAiExplanation:
      parsedData.rawAiExplanation ||
      (parsedData.oemCodes?.length === 0 && parsedData.aftermarketCodes?.length === 0
        ? responseText
        : undefined),
  };
}

export async function executeFollowup(question: string, partContext: any) {
  if (!question) {
    throw new Error('Pergunta é obrigatória.');
  }

  const ai = getAiClient();
  const car = partContext?.carSummary || 'do veículo';
  const part = partContext?.partSummary || 'desta peça';

  const buildFallbackTip = () => {
    const q = question.toLowerCase();
    let tip = `Para ${part} no ${car}: Sempre confira no documento se o ano de fabricação bate com o ano do modelo, se o motor possui ar condicionado/direção hidráulica instalados de fábrica e confirme as medidas ou código gravado na peça antiga.`;

    if (q.includes('ar') || q.includes('condicionado')) {
      tip = `Atenção no balcão (${car}): Veículos com Ar Condicionado frequentemente utilizam correias maiores, radiadores com colmeia diferente e suportes específicos para o condensador. Sempre confirme na peça antiga ou pelo chassi.`;
    } else if (q.includes('dente') || q.includes('estria')) {
      tip = `Dica de balcão (${car}): Solicite ao mecânico ou cliente a contagem exata dos dentes da correia/polia ou estrias do cubo/homocinética antes da retirada para evitar devolução.`;
    } else if (q.includes('par') || q.includes('jogo') || q.includes('quant')) {
      tip = `Regra de aplicação (${car}): Amortecedores, molas, discos e pastilhas de freio devem ser substituídos no par (mesmo eixo) para manter estabilidade e eficiência de frenagem.`;
    }

    return {
      answer: tip,
      sources: [
        {
          uri: `https://www.google.com/search?q=${encodeURIComponent(`site:mercadolivre.com.br ${part} ${car}`)}`,
          title: `MercadoLivre: ${part} ${car}`,
          sourceChannel: 'mercadolivre' as const,
        },
        {
          uri: `https://www.google.com/search?q=${encodeURIComponent(`${part} ${car} ${question}`)}`,
          title: `Google Search: ${part} ${car}`,
          sourceChannel: 'google' as const,
        },
      ],
    };
  };

  if (!ai) {
    return buildFallbackTip();
  }

  const prompt = `Você é um consultor sênior de balcão de autopeças. O vendedor está atendendo um cliente neste momento e tem uma dúvida específica sobre a aplicação ou código da peça.

CONTEXTO ATUAL DA PEÇA:
- Peça: ${part}
- Veículo: ${car}
- Códigos OEM conhecidos: ${JSON.stringify(partContext?.oemCodes || [])}
- Códigos Aftermarket conhecidos: ${JSON.stringify(partContext?.aftermarketCodes || [])}
- Avisos de aplicação: ${JSON.stringify(partContext?.applicationWarnings || [])}

DÚVIDA DO VENDEDOR / CLIENTE:
"${question}"

INSTRUÇÕES:
1. Pesquise no Google e no MercadoLivre (site:mercadolivre.com.br) caso precise confirmar códigos de variações para ${car}.
2. Responda de forma rápida, precisa, objetiva e orientada a balcão (sem enrolação).
3. Se a dúvida for sobre compatibilidade (ex: "serve no modelo automático?", "muda se for sem ar?"), responda com clareza SIM, NÃO ou O QUE CONFERIR.
4. Se houver código específico para a variação perguntada, mencione o código e fabricante seguindo a linha homologada.
5. Destaque uma dica prática de conferência na peça física (medidas, bocais, dentes, conexões).
6. Responda em Português do Brasil.`;

  try {
    const gen = await generateWithGoogleGrounding(ai, prompt);
    if (!gen) {
      return buildFallbackTip();
    }

    const res = gen.response;
    const rawChunks = res.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: WebSearchSource[] = [];
    const seen = new Set<string>();

    for (const c of rawChunks) {
      if (c.web?.uri && !seen.has(c.web.uri)) {
        seen.add(c.web.uri);
        sources.push({
          uri: c.web.uri,
          title: c.web.title || c.web.uri,
          sourceChannel: classifySourceChannel(c.web.uri),
        });
      }
    }

    return {
      answer: res.text || 'Não foi possível obter resposta no momento.',
      sources,
    };
  } catch (err) {
    console.warn('Followup AI fallback triggered:', err);
    return buildFallbackTip();
  }
}
