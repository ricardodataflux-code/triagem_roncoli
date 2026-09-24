import { GoogleGenAI } from '@google/genai';
import { findOfflinePart, generateSmartFallbackPart } from '../data/offlineCatalog';
import { getRioClaroSuppliersForPart } from '../data/rioClaroSuppliers';

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

INSTRUÇÕES DE PESQUISA NA WEB & PRECISÃO DE CATÁLOGO:
1. Faça uma pesquisa precisa na internet em catálogos originais (OEM) das montadoras e nas principais fabricantes de autopeças aftermarket comercializadas no Brasil (ex: Cobreq, Nakata, Fras-le, Bosch, Cofap, LUK, etc.).
2. RIGIDEZ E PRECISÃO CIRÚRGICA DE CATÁLOGO (EVITAR ERROS DE BALCÃO):
- ATENÇÃO SUPREMA AO CAMPO 'Detalhes / Observações adicionais' (notes), geração da carroceria, diâmetro de disco e sistema de freio/injeção.
- Diferencie com precisão técnica submodelos e gerações brasileiras:
  * Exemplo Crítico de Pastilhas de Freio Chevrolet:
    - Chevrolet Corsa Hatch/Sedan G2 ("Frente Montana" 2002 a 2012), Montana 1.4/1.8 e Meriva: A pastilha dianteira oficial do catálogo é estritamente COBREQ N-360 / FRAS-LE PD/58 / NAKATA NKF1122P / BOSCH 0 986 BB0 236 / SYL 1079 (OEM GM 93374246). JAMAIS forneça Cobreq N-382 (que é exclusiva de Onix/Prisma/Cobalt) nem Cobreq N-325 (que é para Corsa Classic modelo B antigo / Celta).
    - Chevrolet Onix / Prisma G1 / Cobalt / Spin: Usa Cobreq N-382 / Fras-le PD/1446.
    - Chevrolet Corsa Classic antigo (B) / Celta: Usa Cobreq N-325 / Fras-le PD/60.
- Se o usuário informar detalhes como 'frente montana', 'sistema teves', 'varga', 'disco 240mm', 'com ar condicionado', 'com ABS' ou código gravado na peça antiga, você DEVE priorizar e cruzar essas informações para entregar a aplicação exata sem margem de erro.

3. MARCAS PRIORITÁRIAS A SEREM PESQUISADAS:
PESQUISE E PRIORIZE EXCLUSIVAMENTE AS SEGUINTES MARCAS PRINCIPAIS (SE APLICÁVEIS À CATEGORIA DA PEÇA):
LUK, Valeo, Sachs, Nakata, Monroe, Bosch, NGK, SKF, DS, COFAP, CONTINENTAL, DAYCO, DISAUTO, FAMA, FANIA, GATES, FLORIO, IGUAÇU, IMA, JAHU, MOBENSANI, KYB, MAHLE, THOMSON, VISCONDE, TSA, URBA, VALCLEI, ZF AFTERMARKET, VETOR, SCHADEK, BROSOL, JAMAICA, NOVO KIT, NK, DPL, TECFIL, SABO, TARANTO, MAGNETI MARELLI, SYL, COBREQ, TECPADS, WAHLER.

Para cada opção aftermarket identificada, forneça:
- 'salesVolume': 'Mais vendida' | 'Média saída' | 'Menos vendida'
- 'tier': '1ª Linha' (OEM / Original montadora) | '2ª Linha' (Reposição consolidada) | '3ª Linha' (Linha alternativa)
- 'verdictBadge': 'Melhor em Qualidade' | 'Melhor Custo-Benefício' | 'Melhor em Durabilidade' | 'Opção Econômica'
- 'technicalDetails': Detalhamento técnico de medidas, material, estrias, ligas ou compostos.
- 'persuasiveDetails': Argumento técnico persuasivo e convincente para o cliente comprar esta marca (benefício prático, segurança, ausência de ruídos, certificação ISO/INMETRO, facilidade de instalação).
- 'warrantyInfo': Termo de garantia recomendado no balcão (ex: 'Garantia de 12 meses direto de fábrica', '2 anos de garantia nacional').

3. ESPECIFICAÇÕES TÉCNICAS COMPLETAS ('technicalSpecs'): Traga no mínimo entre 6 e 10 especificações técnicas detalhadas para conferência imediata no balcão da loja (ex: Quantidade que vai no carro, Diâmetro externo/interno, Espessura/Comprimento, Medida e passo de rosca, Número de dentes ou estrias, Lado/Posição de montagem LE/LD/Dianteiro/Traseiro, Pinos ou vias do conector elétrico, Material de atrito ou fabricação, Sistema de freio ou injeção, Pressão de trabalho, Folga/GAP, Tamanho de chave de encaixe). Nunca deixe menos de 6 especificações técnicas.
4. Forneça "Avisos de Balcão" com as pegadinhas mais comuns de aplicação para este carro específico (ex: diferença se tiver ar condicionado, mudança de código por ano/mês de fabricação, diferença de motor flex ou gasolina).
5. Sugira peças complementares (venda casada / itens que se recomenda trocar juntos, ex: correia + tensor + bomba d'água; pastilha + disco + fluido). INCLUA OBRIGATORIAMENTE os códigos de referência das peças complementares ("referenceCodes") das marcas mais vendidas no Brasil (ex: "Fremax BD-5298 • Hipper Freios HF-24A • TRW RCDI09780").
6. QUANTIDADE QUE VAI NO CARRO ('quantityUsedInVehicle'): Indique de forma clara e direta quantas unidades dessa peça são utilizadas no veículo pesquisado e como é vendida no balcão (ex: '2 unidades (1 lado direito + 1 lado esquerdo - recomenda-se trocar o par)', '1 jogo (contém 4 pastilhas para as 2 rodas dianteiras)', '4 unidades (1 vela por cilindro)', '3 unidades (1 vela por cilindro)', '1 unidade', '2 unidades (1 por roda)', '1 kit').
7. Redija um resumo curto ("quickSalesPitch") de 1 ou 2 frases para o vendedor falar na hora no telefone com o cliente.
8. Redija uma mensagem pronta e formatada para WhatsApp ("whatsappMessage") seguindo rigorosamente o seguinte modelo:
Orçamento de Roncoli - [Modelo do Carro]

Olá! Segue a especificação de [peça] para o seu veículo:

Opção 1
✅ Peça: [Nome da Peça] ([quantidade que vai no carro])
✅ Marca Recomendada: [Marca 1ª Linha] (Original de montadora)
✅ Código: [Código]
✅ Preço: (deixar vazio para preenchimento manual)
💰 Valor: R$ [Inserir Preço] [o jogo / a peça / o kit].

Opção 2
✅ Peça: [Nome da Peça] ([quantidade que vai no carro])
✅ Marca Recomendada: [Marca Alternativa]
✅ Código: [Código]
✅ Preço: (deixar vazio para preenchimento manual)
💰 Valor: R$ [Inserir Preço] [o jogo / a peça / o kit].

⚠️ Dica do Especialista: [Dica técnica importante sobre aplicação ou troca preventiva]

Qualquer dúvida, estou à disposição!

FORMATO DE RESPOSTA OBRIGATÓRIO:
Você DEVE retornar a resposta estritamente no formato JSON dentro de um bloco de código markdown \`\`\`json ... \`\`\`.
A estrutura do JSON DEVE ser:
{
  "carSummary": "Nome completo e padronizado do veículo (ex: VW Gol G6 1.0 8V Flex)",
  "partSummary": "Nome técnico e padronizado da peça",
  "category": "Categoria da peça (ex: Motor, Freios, Suspensão, Transmissão, Elétrica, Arrefecimento)",
  "quantityUsedInVehicle": "Quantidade exata que vai no carro (ex: 2 unidades - 1 lado direito e 1 lado esquerdo; ou 1 jogo com 4 pastilhas; ou 4 unidades - 1 por cilindro)",
  "oemCodes": [
    {
      "code": "Código OEM original (ex: 030121008D)",
      "brandOrOrigin": "Montadora / Marca Original (ex: Volkswagen Original)",
      "notes": "Observação se houver (ex: Aplica-se a partir de 2014)"
    }
  ],
  "aftermarketCodes": [
    {
      "brand": "Nome da Marca da lista principal (ex: LUK, Valeo, Sachs, Nakata, Monroe, Bosch, NGK, SKF, Cofap, Continental, etc.)",
      "code": "Código exato no catálogo da marca (ex: 620 3020 00)",
      "lineOrType": "Linha ou subtipo (ex: Linha RepSet com Rolamento)",
      "popularInBrazil": true,
      "salesVolume": "Mais vendida | Média saída | Menos vendida",
      "tier": "1ª Linha | 2ª Linha | 3ª Linha",
      "verdictBadge": "Melhor em Qualidade | Melhor Custo-Benefício | Melhor em Durabilidade | Opção Econômica",
      "technicalDetails": "Informação técnica específica da peça desta marca",
      "persuasiveDetails": "Argumento de venda técnica para convencer o cliente a comprar no balcão",
      "warrantyInfo": "Prazo e cobertura de garantia da fabricante"
    }
  ],
  "technicalSpecs": [
    {
      "label": "Nome da especificação (ex: Diâmetro externo, Número de Dentes, Rosca, Pinos do Conector, Lado)",
      "value": "Valor ou medida técnica (ex: 138 dentes, 4 pinos, Lado Esquerdo/Motorista)"
    }
  ],
  "applicationWarnings": [
    "Alerta crítico para o vendedor não vender a peça errada"
  ],
  "complementaryParts": [
    {
      "name": "Nome da peça adicional recomendada (ex: Disco de freio dianteiro)",
      "reason": "Por que o cliente deve trocar junto",
      "referenceCodes": "Códigos de referência das marcas líderes para consulta no estoque"
    }
  ],
  "quickSalesPitch": "Frase pronta e confiante para o vendedor falar no telefone ou balcão",
  "whatsappMessage": "Texto completo formatado com emojis, quebras de linha e dados para envio no WhatsApp do cliente"
}

Responda sempre em Português do Brasil com máxima precisão técnica.`;

    try {
      generateResult = await generateWithFallback(ai, prompt);
    } catch (genError: any) {
      console.warn('AI generation unavailable, switching to offline fallback:', genError?.message || genError);
    }
  }

  if (!generateResult) {
    const offlineMatch = findOfflinePart(part, model, engine, notes) || generateSmartFallbackPart(part, model, year, engine, notes);
    const localSuppliers = getRioClaroSuppliersForPart(offlineMatch.partSummary, offlineMatch.category);

    return {
      id: `catalog-${Date.now()}`,
      timestamp: Date.now(),
      query: { part, model, year, engine, notes, transmission, vinOrPlate },
      carSummary: offlineMatch.carSummary,
      partSummary: offlineMatch.partSummary,
      category: offlineMatch.category,
      quantityUsedInVehicle: offlineMatch.quantityUsedInVehicle,
      oemCodes: offlineMatch.oemCodes,
      aftermarketCodes: offlineMatch.aftermarketCodes,
      technicalSpecs: offlineMatch.technicalSpecs,
      applicationWarnings: offlineMatch.applicationWarnings,
      complementaryParts: offlineMatch.complementaryParts,
      quickSalesPitch: offlineMatch.quickSalesPitch,
      whatsappMessage: offlineMatch.whatsappMessage,
      suppliersRioClaro: localSuppliers,
      groundingSources: [
        { uri: 'https://catalogo.nakata.com.br', title: 'Catálogo Nakata' },
        { uri: 'https://catalogo.cofap.com.br', title: 'Catálogo Cofap' },
        { uri: 'https://www.luk.com.br', title: 'Catálogo Schaeffler LUK' },
        { uri: 'https://www.boschaftermarket.com/br', title: 'Catálogo Bosch' },
      ],
      searchQueries: [part, model],
    };
  }

  const { response } = generateResult;
  const responseText = response.text || '';

  const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
  const groundingSources: { uri: string; title: string }[] = [];
  const seenUris = new Set<string>();

  for (const chunk of rawChunks) {
    if (chunk.web?.uri && !seenUris.has(chunk.web.uri)) {
      seenUris.add(chunk.web.uri);
      groundingSources.push({
        uri: chunk.web.uri,
        title: chunk.web.title || chunk.web.uri,
      });
    }
  }

  const searchQueries: string[] = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

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
      oemCodes: [],
      aftermarketCodes: [],
      technicalSpecs: [],
      applicationWarnings: ['Consulte o texto detalhado da análise técnica abaixo.'],
      complementaryParts: [],
      quickSalesPitch: `Temos opções originais e paralelas para o ${model} ${year || ''}.`,
      whatsappMessage: `Olá! Segue cotação da peça: *${part}* para o *${model} ${year || ''}*.\nEntre em contato para confirmar a disponibilidade.`,
      rawAiExplanation: responseText,
    };
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
3. Se houver código de peça específico para a variação da pergunta, mencione o código e a fabricante (Bosch, Cofap, Nakata, Luk, etc.).
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
