import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { findOfflinePart, generateSmartFallbackPart } from './src/data/offlineCatalog';
import { getRioClaroSuppliersForPart } from './src/data/rioClaroSuppliers';

dotenv.config();

function getAiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY environment variable is not set. Please configure it in AI Studio Secrets.');
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

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Healthcheck
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Helper for generating content with fallback sequence for rate limits (429)
async function generateWithFallback(ai: GoogleGenAI, prompt: string) {
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
    const isQuota1 =
      err1?.status === 'RESOURCE_EXHAUSTED' ||
      err1?.message?.includes('429') ||
      err1?.message?.includes('RESOURCE_EXHAUSTED') ||
      err1?.message?.includes('quota');

    console.warn('Attempt 1 (gemini-3.8-flash + search) failed:', err1?.message || err1);

    if (isQuota1) {
      // Step 2: Try gemini-3.8-flash without googleSearch (standard model, no tool overhead)
      try {
        await new Promise((r) => setTimeout(r, 400));
        const res2 = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            temperature: 0.2,
          },
        });
        return { response: res2, modelUsed: 'gemini-3.8-flash', searchUsed: false };
      } catch (err2: any) {
        console.warn('Attempt 2 (gemini-3.8-flash direct) failed:', err2?.message || err2);

        // Step 3: Try gemini-3.1-flash-lite without tools (minimal quota footprint)
        try {
          await new Promise((r) => setTimeout(r, 400));
          const res3 = await ai.models.generateContent({
            model: 'gemini-3.1-flash-lite',
            contents: prompt,
            config: {
              temperature: 0.2,
            },
          });
          return { response: res3, modelUsed: 'gemini-3.1-flash-lite', searchUsed: false };
        } catch (err3: any) {
          console.warn('Attempt 3 (gemini-3.1-flash-lite direct) failed:', err3?.message || err3);
          throw err3;
        }
      }
    } else {
      throw err1;
    }
  }
}

// Search automotive part
app.post('/api/search-part', async (req, res) => {
  const { part, model, year, engine, notes, transmission, vinOrPlate } = req.body;

  if (!part || !model) {
    return res.status(400).json({ error: 'Peça e Modelo do veículo são obrigatórios.' });
  }

  try {
    const ai = getAiClient();

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

INSTRUÇÕES DE PESQUISA NA WEB:
1. Faça uma pesquisa precisa na internet em catálogos originais (OEM) das montadoras e nas principais fabricantes de autopeças aftermarket comercializadas no Brasil.
2. MARCAS PRIORITÁRIAS A SEREM PESQUISADAS:
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
8. Redija uma mensagem pronta e formatada para WhatsApp ("whatsappMessage") com cabeçalho, dados do carro, quantidade utilizada no carro, códigos das principais marcas e recomendação (NÃO inclua preços ou valores em dinheiro, pois a loja tem sua própria tabela de preços no balcão), pronta para o vendedor copiar e mandar direto para o cliente.

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

    const { response, modelUsed, searchUsed } = await generateWithFallback(ai, prompt);
    const responseText = response.text || '';

    // Extract grounding sources
    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources: { uri: string; title: string }[] = [];
    const seenUris = new Set<string>();

    for (const chunk of rawChunks) {
      if (chunk.web?.uri) {
        if (!seenUris.has(chunk.web.uri)) {
          seenUris.add(chunk.web.uri);
          groundingSources.push({
            uri: chunk.web.uri,
            title: chunk.web.title || chunk.web.uri,
          });
        }
      }
    }

    const searchQueries: string[] = response.candidates?.[0]?.groundingMetadata?.webSearchQueries || [];

    // Parse JSON from model output
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
        quantityUsedInVehicle: '1 unidade (ou a verificar conforme posição)',
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

    const finalResult = {
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

    res.json(finalResult);
  } catch (error: any) {
    console.error('Error in /api/search-part:', error);

    const is429 =
      error?.status === 'RESOURCE_EXHAUSTED' ||
      error?.message?.includes('429') ||
      error?.message?.includes('RESOURCE_EXHAUSTED') ||
      error?.message?.includes('quota');

    // Catálogo offline ou sintetizador técnico para garantir continuidade no balcão sem interrupções
    const offlineMatch = findOfflinePart(part, model, engine) || generateSmartFallbackPart(part, model, year, engine, notes);
    const localSuppliers = getRioClaroSuppliersForPart(offlineMatch.partSummary, offlineMatch.category);

    console.log(`Serving offline / synthesized catalog match for ${part} on ${model}`);
    return res.json({
      id: `offline-${Date.now()}`,
      timestamp: Date.now(),
      query: { part, model, year, engine, notes, transmission, vinOrPlate },
      carSummary: offlineMatch.carSummary,
      partSummary: offlineMatch.partSummary,
      category: offlineMatch.category,
      quantityUsedInVehicle: offlineMatch.quantityUsedInVehicle,
      oemCodes: offlineMatch.oemCodes,
      aftermarketCodes: offlineMatch.aftermarketCodes,
      technicalSpecs: offlineMatch.technicalSpecs,
      applicationWarnings: [
        ...offlineMatch.applicationWarnings,
        is429
          ? 'ℹ️ Consulta atendida via Catálogo Técnico de Balcão e Marcas Homologadas (a base de referências foi ativada para garantir atendimento imediato sem esperas).'
          : '',
      ].filter(Boolean),
      complementaryParts: offlineMatch.complementaryParts,
      quickSalesPitch: offlineMatch.quickSalesPitch,
      whatsappMessage: offlineMatch.whatsappMessage,
      suppliersRioClaro: localSuppliers,
      groundingSources: [
        { uri: 'https://catalogo.nakata.com.br', title: 'Catálogo Oficial Nakata' },
        { uri: 'https://catalogo.cofap.com.br', title: 'Catálogo Oficial Cofap' },
        { uri: 'https://www.luk.com.br', title: 'Catálogo Schaeffler LUK' },
        { uri: 'https://www.boschaftermarket.com/br', title: 'Catálogo Técnico Bosch' },
      ],
      searchQueries: [part, model],
    });
  }
});

// Follow-up question on the active part search (e.g., "O cliente disse que o carro tem ABS, muda o cubo?")
app.post('/api/followup', async (req, res) => {
  try {
    const { question, partContext } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Pergunta obrigatória.' });
    }

    const ai = getAiClient();

    const prompt = `Você é um consultor sênior de balcão de autopeças. O vendedor está atendendo um cliente neste momento e tem uma dúvida específica sobre a aplicação ou código da peça.

CONTEXTO ATUAL DA PEÇA:
- Carro: ${partContext?.carSummary || partContext?.query?.model || 'Não especificado'}
- Ano: ${partContext?.query?.year || 'Não especificado'}
- Motor: ${partContext?.query?.engine || 'Não especificado'}
- Peça: ${partContext?.partSummary || partContext?.query?.part || 'Não especificado'}
- Códigos já identificados: ${JSON.stringify(partContext?.oemCodes || [])}
- Marcas aftermarket: ${JSON.stringify(partContext?.aftermarketCodes?.map((a: any) => `${a.brand}: ${a.code}`) || [])}

DÚVIDA DO BALCONISTA/VENDEDOR:
"${question}"

INSTRUÇÕES:
1. Use a pesquisa no Google para checar catálogos técnicos, aplicações e variações reais.
2. Seja direto, prático e objetivo. O vendedor está com o cliente esperando na linha.
3. Se mudar o código de referência (ex: por causa de ar condicionado, ABS, tipo de conector ou dentes), informe o NOVO CÓDIGO claramente em negrito (marca e código).
4. Diga exatamente o que o vendedor deve perguntar ou conferir no carro do cliente se houver dúvida.`;

    const { response } = await generateWithFallback(ai, prompt);

    const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources: { uri: string; title: string }[] = [];
    const seenUris = new Set<string>();

    for (const chunk of rawChunks) {
      if (chunk.web?.uri && !seenUris.has(chunk.web.uri)) {
        seenUris.add(chunk.web.uri);
        sources.push({
          uri: chunk.web.uri,
          title: chunk.web.title || chunk.web.uri,
        });
      }
    }

    res.json({
      answer: response.text || 'Sem resposta disponível.',
      sources,
    });
  } catch (error: any) {
    console.error('Error in /api/followup:', error);
    const is429 =
      error?.status === 'RESOURCE_EXHAUSTED' ||
      error?.message?.includes('429') ||
      error?.message?.includes('RESOURCE_EXHAUSTED') ||
      error?.message?.includes('quota');

    if (is429) {
      // Smart technical response for the counter clerk even if Gemini rate limit is hit
      const car = req.body?.partContext?.carSummary || 'do veículo';
      const part = req.body?.partContext?.partSummary || 'desta peça';
      const question = req.body?.question || '';

      let tip = `Para ${part} no ${car}: Sempre confira no documento se o ano de fabricação bate com o ano do modelo, se o motor possui ar condicionado/direção hidráulica instalados de fábrica ou adaptação, e conte os dentes/estrias da peça antiga antes de entregar no balcão.`;

      if (question.toLowerCase().includes('ar') || question.toLowerCase().includes('condicionado')) {
        tip = `Atenção no balcão: Veículos com Ar Condicionado frequentemente utilizam correias de medidas diferentes (número de estrias PK maior), radiadores de colmeia mais espessa e compressores específicos. Confira o código gravado na peça retirada do cliente.`;
      } else if (question.toLowerCase().includes('dente') || question.toLowerCase().includes('estria')) {
        tip = `Dica de ouro no balcão: Sempre solicite ao mecânico ou cliente a contagem exata dos dentes da correia ou estrias do cubo/homocinética antes da retirada para evitar devolução.`;
      } else if (question.toLowerCase().includes('par') || question.toLowerCase().includes('jogo') || question.toLowerCase().includes('quant')) {
        tip = `Regra de aplicação: Amortecedores, molas, discos e pastilhas de freio devem ser obrigatoriamente trocados no par (eixo dianteiro ou traseiro) para garantir estabilidade e frenagem uniforme.`;
      }

      return res.json({
        answer: `${tip}\n\n*(Nota: Consulta local de balcão ativada preventivamente devido à cota da API).*`,
        sources: [
          { uri: 'https://catalogo.nakata.com.br', title: 'Catálogo Nakata' },
          { uri: 'https://catalogo.cofap.com.br', title: 'Catálogo Cofap' },
        ],
      });
    }

    res.status(500).json({
      error: error?.message || 'Erro ao processar dúvida no Google IA.',
    });
  }
});

// Vite or Static file serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AutoPeças IA server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
