import { GoogleGenAI } from '@google/genai';
import { findOfflinePart, generateSmartFallbackPart } from '../data/offlineCatalog';
import { getRioClaroSuppliersForPart } from '../data/rioClaroSuppliers';
import { OFFICIAL_BRAND_CATALOG_GUIDE_TEXT } from '../data/officialBrandRules';
import { executeMultiSourceWebSearch, DirectSearchLink } from './webSearchService';

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

// In-memory circuit breaker: when quota is exhausted (429), avoid hammering API for 60 seconds
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
    msg.includes('429') ||
    msg.includes('503') ||
    msg.includes('quota') ||
    msg.includes('resource_exhausted') ||
    msg.includes('unavailable') ||
    msg.includes('high demand')
  );
}

async function generateWithFallback(ai: GoogleGenAI, prompt: string) {
  if (Date.now() < quotaExhaustedUntil) {
    console.log(`[Circuit Breaker Active] Quota cooldown in effect for ${Math.round((quotaExhaustedUntil - Date.now()) / 1000)}s - serving catalog immediately.`);
    return null;
  }

  // Step 1: Try gemini-3.8-flash with googleSearch
  try {
    const res = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        temperature: 0.2,
      },
    });
    return { response: res, modelUsed: 'gemini-3.8-flash', searchUsed: true };
  } catch (err1: any) {
    if (isTransientAiError(err1)) {
      // Step 2: Try gemini-3.1-flash-lite WITH googleSearch
      try {
        const res2 = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
            temperature: 0.2,
          },
        });
        return { response: res2, modelUsed: 'gemini-3.1-flash-lite', searchUsed: true };
      } catch (err2: any) {
        // Step 3: Try gemini-3.1-flash-lite WITHOUT tools (lightest footprint)
        try {
          const res3 = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: prompt,
            config: {
              temperature: 0.2,
            },
          });
          return { response: res3, modelUsed: 'gemini-3.1-flash-lite', searchUsed: false };
        } catch (err3: any) {
          quotaExhaustedUntil = Date.now() + 60000;
          console.warn('[Circuit Breaker Tripped] Gemini API quota reached. Serving catalog seamlessly.');
          return null;
        }
      }
    } else {
      throw err1;
    }
  }
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

  // ETAPA 1: Realizar pesquisa profunda e abrangente na web e em catálogos de fabricantes
  const liveWeb = await executeMultiSourceWebSearch({ part, model, year, engine, notes });

  const ai = getAiClient();
  let generateResult: { response: any; modelUsed: string; searchUsed: boolean } | null = null;

  if (ai) {
    const prompt = `Você é o maior especialista do Brasil em catálogos de autopeças e suporte técnico para vendedores de balcão e televendas de autopeças.
O vendedor está com o cliente no balcão ou no telefone e precisa dos CÓDIGOS DE REFERÊNCIA EXATOS para consultar no estoque/sistema da loja ou passar para o cliente.

DADOS DO VEÍCULO E DA PEÇA INFORMADOS PELO VENDEDOR:
- Peça solicitada: "${part}"
- Modelo do veículo: "${model}"
- Ano / Modelo: "${year || 'Não especificado'}"
- Motorização / Combustível: "${engine || 'Não especificado'}"
- Câmbio / Transmissão: "${transmission || 'Não especificado'}"
- Detalhes / Observações adicionais: "${notes || 'Nenhum'}"
- Placa ou Chassi informado: "${vinOrPlate || 'Nenhum'}"

DADOS REAIS DE PESQUISA NA WEB & CATÁLOGOS COLETADOS EM TEMPO REAL:
${liveWeb.summaryText ? `[Trechos coletados em portais de peças e catálogos online]:\n${liveWeb.summaryText}\n` : 'Nenhum trecho web adicional retornado.'}
${liveWeb.extractedOemCodes.length > 0 ? `[Códigos OEM oficiais detectados]: ${JSON.stringify(liveWeb.extractedOemCodes)}\n` : ''}
${liveWeb.extractedAftermarketCodes.length > 0 ? `[Códigos Aftermarket de fabricante detectados]: ${JSON.stringify(liveWeb.extractedAftermarketCodes)}\n` : ''}

INSTRUÇÕES RÍGIDAS DE PESQUISA NA WEB & PRECISÃO DE CATÁLOGO:
1. Faça uma pesquisa precisa no Google Search e nos catálogos originais (OEM) das montadoras e nas principais fabricantes de autopeças aftermarket comercializadas no Brasil (ex: Visconde, Valeo, Magneti Marelli, Mahle, Cobreq, Nakata, Fras-le, Bosch, Cofap, LUK, etc.).
2. NUNCA invente códigos. Utilize os códigos reais de catálogo dos fabricantes e montadoras.
- ATENÇÃO SUPREMA AO CAMPO 'Detalhes / Observações adicionais' (notes):
  * Exemplo Crítico de Radiadores Chevrolet Celta / Prisma (2006 a 2016):
    - SEM AR CONDICIONADO: O código oficial do fabricante é VISCONDE 12223 (RV12223) / VALEO 733468R (ou 732770R / 735124R) / MAGNETI MARELLI RMM518001M / MAHLE CR 2135 / OEM GM 93337574. Espessura da colmeia: 23 mm.
    - COM AR CONDICIONADO: O código oficial do fabricante é VISCONDE 12224 (RV12224) / VALEO 734914R / MAGNETI MARELLI RMM518002M / OEM GM 93337575. Espessura da colmeia: 30 mm.
    - JAMAIS misture ou inverta os códigos com ar vs sem ar!
  * Exemplo Crítico de Pastilhas de Freio Chevrolet:
    - Chevrolet Corsa Hatch/Sedan G2 ("Frente Montana" 2002 a 2012), Montana 1.4/1.8 e Meriva: COBREQ N-360 / FRAS-LE PD/58 / NAKATA NKF1122P (OEM GM 93374246). JAMAIS forneça Cobreq N-382 (Onix) nem Cobreq N-325 (Corsa Classic antigo / Celta).

3. LINHA OFICIAL DE MARCAS E CATÁLOGO HOMOLOGADO (REGRA DE OURO):
${OFFICIAL_BRAND_CATALOG_GUIDE_TEXT}

Para cada opção aftermarket identificada, forneça:
- 'salesVolume': 'Mais vendida' | 'Média saída' | 'Menos vendida'
- 'tier': '1ª Linha' (OEM / Original montadora) | '2ª Linha' (Reposição consolidada) | '3ª Linha' (Linha alternativa)
- 'verdictBadge': 'Melhor em Qualidade' | 'Melhor Custo-Benefício' | 'Melhor em Durabilidade' | 'Opção Econômica'
- 'technicalDetails': Detalhamento técnico de medidas, material, estrias, ligas ou compostos.
- 'persuasiveDetails': Argumento técnico convincente para o cliente comprar esta marca.
- 'warrantyInfo': Termo de garantia recomendado no balcão.

FORMATO DE RESPOSTA OBRIGATÓRIO (JSON estrito em bloco \`\`\`json ... \`\`\`):
{
  "carSummary": "Nome completo e padronizado do veículo",
  "partSummary": "Nome técnico e padronizado da peça",
  "category": "Categoria da peça",
  "quantityUsedInVehicle": "Quantidade exata que vai no carro",
  "oemCodes": [{ "code": "Código OEM", "brandOrOrigin": "Montadora", "notes": "Obs" }],
  "aftermarketCodes": [{
    "brand": "Nome da Marca",
    "code": "Código de catálogo exato",
    "lineOrType": "Linha ou tipo",
    "popularInBrazil": true,
    "salesVolume": "Mais vendida | Média saída | Menos vendida",
    "tier": "1ª Linha | 2ª Linha | 3ª Linha",
    "verdictBadge": "Melhor em Qualidade | Melhor Custo-Benefício | Melhor em Durabilidade | Opção Econômica",
    "technicalDetails": "Detalhes técnicos",
    "persuasiveDetails": "Argumento de venda",
    "warrantyInfo": "Garantia"
  }],
  "technicalSpecs": [{ "label": "Nome", "value": "Valor" }],
  "applicationWarnings": ["Aviso crítico de balcão"],
  "complementaryParts": [{ "name": "Peça complementar", "reason": "Motivo", "referenceCodes": "Códigos líderes" }],
  "quickSalesPitch": "Frase para o vendedor falar",
  "whatsappMessage": "Mensagem formatada para WhatsApp"
}`;

    try {
      generateResult = await generateWithFallback(ai, prompt);
    } catch (genError: any) {
      console.warn('AI generation unavailable, switching to offline fallback:', genError?.message || genError);
    }
  }

  if (!generateResult) {
    const offlineMatch =
      findOfflinePart(part, model, engine, notes) ||
      generateSmartFallbackPart(part, model, year, engine, notes);
    const localSuppliers = getRioClaroSuppliersForPart(offlineMatch.partSummary, offlineMatch.category);

    // Mesclar com códigos extraídos da pesquisa real na web para garantir fidelidade de catálogo
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

  const { response } = generateResult;
  const responseText = response.text || '';

  const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const groundingSources: { uri: string; title: string; snippet?: string }[] = [...liveWeb.sources];
  const seenUris = new Set<string>(liveWeb.sources.map((s) => s.uri));

  for (const chunk of rawChunks) {
    if (chunk.web?.uri && !seenUris.has(chunk.web.uri)) {
      seenUris.add(chunk.web.uri);
      groundingSources.push({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri,
      });
    }
  }

  const geminiSearchQueries: string[] =
    response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];
  const searchQueries = Array.from(new Set([...liveWeb.queries, ...geminiSearchQueries]));

  let parsedData: any = null;
  try {
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      parsedData = JSON.parse(jsonMatch[1]);
    } else {
      const firstBrace = responseText.indexOf('{');
      const lastBrace = responseText.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        parsedData = JSON.parse(responseText.substring(firstBrace, lastBrace + 1));
      }
    }
  } catch (parseErr) {
    console.warn('Failed to parse strict JSON from Gemini response, constructing fallback:', parseErr);
  }

  if (!parsedData) {
    parsedData = {
      carSummary: `${model} ${year || ''} ${engine || ''}`.trim(),
      partSummary: part,
      category: 'Geral',
      quantityUsedInVehicle: '1 unidade',
      oemCodes: liveWeb.extractedOemCodes,
      aftermarketCodes: liveWeb.extractedAftermarketCodes,
      technicalSpecs: liveWeb.extractedSpecs,
      applicationWarnings: liveWeb.extractedWarnings.length > 0 ? liveWeb.extractedWarnings : ['Consulte o texto detalhado da análise técnica abaixo.'],
      complementaryParts: [],
      quickSalesPitch: `Temos opções originais e paralelas para o ${model} ${year || ''}.`,
      whatsappMessage: `Olá! Segue cotação da peça: *${part}* para o *${model} ${year || ''}*.\nEntre em contato para confirmar a disponibilidade.`,
      rawAiExplanation: responseText,
    };
  }

  // Cross-reference: if Gemini didn't return OEM or Aftermarket codes, fill from liveWeb extraction
  if (!parsedData.oemCodes || parsedData.oemCodes.length === 0) {
    parsedData.oemCodes = liveWeb.extractedOemCodes;
  }
  if (!parsedData.aftermarketCodes || parsedData.aftermarketCodes.length === 0) {
    parsedData.aftermarketCodes = liveWeb.extractedAftermarketCodes;
  }
  if (liveWeb.extractedWarnings.length > 0) {
    for (const w of liveWeb.extractedWarnings) {
      if (!parsedData.applicationWarnings.includes(w)) {
        parsedData.applicationWarnings.unshift(w);
      }
    }
  }

  const suppliersRioClaro = getRioClaroSuppliersForPart(parsedData.partSummary || part, parsedData.category || 'Geral');

  return {
    id: `part-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    timestamp: Date.now(),
    query: { part, model, year, engine, notes, transmission, vinOrPlate },
    carSummary: parsedData.carSummary || `${model} ${year || ''}`.trim(),
    partSummary: parsedData.partSummary || part,
    category: parsedData.category || 'Geral',
    quantityUsedInVehicle: parsedData.quantityUsedInVehicle || undefined,
    oemCodes: Array.isArray(parsedData.oemCodes) ? parsedData.oemCodes : [],
    aftermarketCodes: Array.isArray(parsedData.aftermarketCodes) ? parsedData.aftermarketCodes : [],
    technicalSpecs: Array.isArray(parsedData.technicalSpecs) ? parsedData.technicalSpecs : [],
    applicationWarnings: Array.isArray(parsedData.applicationWarnings) ? parsedData.applicationWarnings : [],
    complementaryParts: Array.isArray(parsedData.complementaryParts) ? parsedData.complementaryParts : [],
    quickSalesPitch: parsedData.quickSalesPitch || '',
    whatsappMessage: parsedData.whatsappMessage || '',
    suppliersRioClaro,
    groundingSources,
    directLinks: liveWeb.directLinks,
    searchQueries,
    rawAiExplanation: parsedData.rawAiExplanation || (parsedData.oemCodes?.length === 0 ? responseText : undefined),
  };
}

export async function executeFollowup(question: string, partContext: any) {
  if (!question) {
    throw new Error('Pergunta é obrigatória.');
  }

  const ai = getAiClient();

  if (!ai) {
    const car = partContext?.carSummary || 'do veículo';
    const part = partContext?.partSummary || 'desta peça';
    const q = question.toLowerCase();

    let tip = `Para ${part} no ${car}: Sempre confira no documento se o ano de fabricação bate com o ano do modelo, se o motor possui ar condicionado/direção hidráulica instalados de fábrica ou adaptação, e conte os dentes/estrias da peça antiga antes de entregar no balcão.`;

    if (q.includes('ar') || q.includes('condicionado')) {
      tip = `Atenção no balcão: Veículos com Ar Condicionado frequentemente utilizam correias de medidas diferentes (número de estrias PK maior), radiadores de colmeia mais espessa e compressores específicos. Confira o código gravado na peça retirada do cliente.`;
    } else if (q.includes('dente') || q.includes('estria')) {
      tip = `Dica de ouro no balcão: Sempre solicite ao mecânico ou cliente a contagem exata dos dentes da correia ou estrias do cubo/homocinética antes da retirada para evitar devolução.`;
    } else if (q.includes('par') || q.includes('jogo') || q.includes('quant')) {
      tip = `Regra de aplicação: Amortecedores, molas, discos e pastilhas de freio devem ser trocados no par (eixo dianteiro ou traseiro) para garantir estabilidade e frenagem uniforme.`;
    }

    return {
      answer: tip,
      sources: [
        { uri: 'https://catalogo.nakata.com.br', title: 'Catálogo Nakata' },
        { uri: 'https://catalogo.cofap.com.br', title: 'Catálogo Cofap' },
      ],
    };
  }

  const prompt = `Você é um consultor sênior de balcão de autopeças. O vendedor está atendendo um cliente neste momento e tem uma dúvida específica sobre a aplicação ou código da peça.

CONTEXTO ATUAL DA PEÇA:
- Peça: ${partContext?.partSummary || 'Não informada'}
- Carro: ${partContext?.carSummary || 'Não informado'}
- Códigos OEM conhecidos: ${JSON.stringify(partContext?.oemCodes || [])}
- Códigos Aftermarket conhecidos: ${JSON.stringify(partContext?.aftermarketCodes || [])}
- Avisos de aplicação: ${JSON.stringify(partContext?.applicationWarnings || [])}

DÚVIDA DO VENDEDOR / CLIENTE:
"${question}"

INSTRUÇÕES:
1. Responda de forma rápida, precisa, objetiva e orientada a balcão (sem enrolação).
2. Se a dúvida for sobre compatibilidade (ex: "serve no modelo com ABS?", "muda se for flex?"), responda com clareza SIM, NÃO ou O QUE CONFERIR.
3. Se houver código de peça específico para a variação da pergunta, mencione o código e a fabricante seguindo estritamente a linha de marcas homologadas (LUK, Sachs, Valeo, Nakata, Monroe, Cofap, KYB, ZF Aftermarket, Mahle, MTE-Thomson, Visconde, Valclei, Urba, Schadek, Brosol, Florio, Iguaçu, Wahler, Continental, Dayco, Gates, Jahu, Novo Kit, Jamaica, Bosch, NGK/NTK, DS, TSA, Magneti Marelli, SKF, IMA, Vetor, NK, Cobreq, SYL, Tecpads, Tecfil, Sabó, Taranto, Fama, Fania, DPL).
4. Destaque uma dica prática de conferência na peça física (ex: contar dentes, medir rosca, formato do plugue elétrico).
5. Responda em Português do Brasil.`;

  const res = await ai.models.generateContent({
    model: 'gemini-3.8-flash',
    contents: prompt,
    config: {
      tools: [{ googleSearch: {} }],
      temperature: 0.2,
    },
  });

  const rawChunks = res.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const sources: { uri: string; title: string }[] = [];
  const seen = new Set<string>();

  for (const c of rawChunks) {
    if (c.web?.uri && !seen.has(c.web.uri)) {
      seen.add(c.web.uri);
      sources.push({ uri: c.web.uri, title: c.web.title || c.web.uri });
    }
  }

  return {
    answer: res.text || 'Não foi possível obter resposta no momento.',
    sources,
  };
}
