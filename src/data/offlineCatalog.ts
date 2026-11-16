export interface OfflinePartRecord {
  partKeywords: string[];
  vehicleKeywords: string[];
  variantKeywords?: string[];
  requiresAc?: boolean;
  requiresTransmission?: 'manual' | 'automatico';
  yearRange?: [number, number];
  carSummary: string;
  partSummary: string;
  category: string;
  quantityUsedInVehicle?: string;
  oemCodes: { code: string; brandOrOrigin: string; notes?: string }[];
  aftermarketCodes: {
    brand: string;
    code: string;
    lineOrType?: string;
    popularInBrazil?: boolean;
    salesVolume?: 'Mais vendida' | 'Média saída' | 'Menos vendida' | string;
    tier?: '1ª Linha' | '2ª Linha' | '3ª Linha' | string;
    verdictBadge?: 'Melhor em Qualidade' | 'Melhor Custo-Benefício' | 'Melhor em Durabilidade' | 'Opção Econômica' | 'Mais Procurada' | string;
    technicalDetails?: string;
    persuasiveDetails?: string;
    warrantyInfo?: string;
    catalogUrl?: string;
  }[];
  technicalSpecs: { label: string; value: string }[];
  applicationWarnings: string[];
  complementaryParts: { name: string; reason: string; referenceCodes?: string }[];
  priceRangeBRL?: string;
  quickSalesPitch: string;
  whatsappMessage: string;
}

export const OFFLINE_CATALOG: OfflinePartRecord[] = [
  // 0. Chevrolet Celta / Prisma 1.0 e 1.4 SEM AR (2006 a 2016) - Radiador de Água
  {
    partKeywords: ['radiador', 'agua', 'arrefecimento', 'colmeia'],
    vehicleKeywords: ['celta', 'prisma'],
    variantKeywords: ['sem ar', 's/ ar', 'sem ac', '1.0', '1.4', 'vhc', 'vhce', 'flexpower', 'manual'],
    requiresAc: false,
    requiresTransmission: 'manual',
    yearRange: [2000, 2016],
    carSummary: 'Chevrolet Celta / Prisma 1.0 e 1.4 8V Flex SEM Ar Condicionado (2006 a 2016)',
    partSummary: 'Radiador de Arrefecimento com Colmeia de Alumínio (Sem Ar)',
    category: 'Arrefecimento',
    quantityUsedInVehicle: '1 unidade',
    oemCodes: [
      {
        code: '93337574',
        brandOrOrigin: 'Chevrolet / GM Original',
        notes: 'Código oficial genuíno da montadora GM para Celta e Prisma 1.0/1.4 SEM ar condicionado',
      },
    ],
    aftermarketCodes: [
      {
        brand: 'Visconde',
        code: '12223',
        lineOrType: 'RV 12223 / Alumínio Expandido Mecânico',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails:
          'Código oficial do catálogo do fabricante Visconde RV 12223 (Modine). Medidas da colmeia: 522 mm x 322 mm x 23 mm. Desenvolvido para modelos SEM ar condicionado.',
      },
      {
        brand: 'Valeo',
        code: '733468R',
        lineOrType: 'Linha Tradicional OEM (Substitui 732770R / 735124R)',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails:
          'Código comercial Valeo 733468R (EAN: 3276427334685) / 732770R. Dimensões: 522 x 322 x 23 mm. Padrão montadora de fábrica.',
      },
      {
        brand: 'Magneti Marelli',
        code: 'RMM518001M',
        lineOrType: 'Linha Qualidade Original',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails:
          'Código oficial do catálogo Magneti Marelli RMM518001M / RMM518001. Tubos planos e aletas de alto fluxo térmico.',
      },
      {
        brand: 'Mahle',
        code: 'CR 2135',
        lineOrType: 'Linha Behr Hella Service (CR 2135 000P)',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Mais Procurada',
        technicalDetails:
          'Código oficial Mahle Behr CR 2135 000P. Caixas plásticas reforçadas e colmeia em liga de alumínio anti-corrosão.',
      },
      {
        brand: 'Notus',
        code: 'EL-140026',
        lineOrType: 'Linha Leve (NT-20752.523)',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Código Notus EL-140026 / NT-20752.523. Compatível com encaixes originais.',
      },
      {
        brand: 'Bochum',
        code: '242192',
        lineOrType: 'Reposição Nacional Standard',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '3ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Código Bochum 242192. Para Celta 1.0 e 1.4 de 2006 a 2013 sem ar.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade' },
      { label: 'Ar Condicionado', value: 'SEM Ar Condicionado (Incompatível com modelo COM ar)' },
      { label: 'Transmissão', value: 'Câmbio Manual' },
      { label: 'Comprimento da Colmeia', value: '522 mm' },
      { label: 'Altura da Colmeia', value: '322 mm' },
      { label: 'Espessura da Colmeia', value: '23 mm (Atenção: modelo COM ar usa 30 mm)' },
      { label: 'Tecnologia Construtiva', value: 'Alumínio Mecânico / Expandido' },
      { label: 'Capacidade do Sistema', value: '6,4 Litros (Aditivo orgânico 50% + Água desmineralizada 50%)' },
      { label: 'Código Original GM (OEM)', value: '93337574' },
      { label: 'Código Oficial Visconde', value: 'RV 12223 (12223)' },
      { label: 'Código Oficial Valeo', value: '733468R / 732770R / 735124R' },
      { label: 'Código Magneti Marelli', value: 'RMM518001M' },
    ],
    applicationWarnings: [
      'ATENÇÃO CRÍTICA DE BALCÃO: Para o Celta 1.0 2006 a 2016 SEM Ar Condicionado, os códigos oficiais do fabricante são estritamente OEM GM 93337574, VISCONDE 12223 (RV12223), VALEO 733468R e MAGNETI MARELLI RMM518001M.',
      'NUNCA forneça o radiador do modelo COM Ar (OEM 93337575 / Visconde 12224), pois a espessura da colmeia é mais grossa (30 mm contra 23 mm) e o encaixe do defletor/ventoinha não é compatível.',
      'Sempre utilize aditivo orgânico concentrado diluído 50/50 em água desmineralizada na troca do radiador para proteger a colmeia de alumínio.',
    ],
    complementaryParts: [
      {
        name: 'Mangueiras Superior e Inferior do Radiador',
        reason: 'Evita vazamentos recorrentes por ressecamento ou estufamento da borracha antiga.',
        referenceCodes: 'Jamaica 4290 • Jamaica 4291 • Gates 2241 • Novo Kit 2230',
      },
      {
        name: 'Válvula Termostática com Carcaça de Alumínio',
        reason: 'Recomenda-se a troca preventiva no sistema de arrefecimento do motor VHC/VHC-E.',
        referenceCodes: 'MTE-Thomson VT248.92 • Wahler 4148.92 • Valclei VC-1248',
      },
      {
        name: 'Tampa do Reservatório de Expansão (1.4 bar)',
        reason: 'Garante a pressurização exata do circuito para o líquido não ferver a 100°C.',
        referenceCodes: 'Florio 20.140 • Valclei V-102 • GM Original 93326521',
      },
      {
        name: 'Aditivo Concentrado Orgânico Long Life (Rosa)',
        reason: 'Anticorrosivo essencial para manter a garantia do radiador de alumínio.',
        referenceCodes: 'Paraflu 1001 Orgânico • Tirreno • Delphi RL10008 • Radiex',
      },
    ],
    quickSalesPitch:
      'Temos o radiador original Visconde 12223 e Valeo 733468R para o Celta 1.0 sem ar, com colmeia de 23mm e garantia de 1 ano.',
    whatsappMessage: `Orçamento de Roncoli - Chevrolet Celta 1.0 2013 (Sem Ar Condicionado)\n\nOlá! Segue a especificação exata do catálogo do fabricante para o radiador do seu veículo:\n\nOpção 1\n✅ Peça: Radiador de Arrefecimento com Colmeia de Alumínio (1 unidade)\n✅ Marca Recomendada: Visconde / Modine (Original de montadora)\n✅ Código do Fabricante: 12223 (RV12223)\n✅ Código OEM GM: 93337574\n✅ Espessura: 23 mm (específico SEM ar condicionado)\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Radiador de Arrefecimento (1 unidade)\n✅ Marca Recomendada: Valeo\n✅ Código do Fabricante: 733468R / 732770R\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: O modelo sem ar condicionado possui colmeia de 23 mm de espessura (o modelo com ar usa 30 mm e código 12224). Recomendamos utilizar aditivo orgânico na instalação.\n\nQualquer dúvida, estou à disposição!`,
  },

  // 0.1 Chevrolet Celta / Prisma 1.0 e 1.4 COM AR (2006 a 2016) - Radiador de Água
  {
    partKeywords: ['radiador', 'agua', 'arrefecimento', 'colmeia'],
    vehicleKeywords: ['celta', 'prisma'],
    variantKeywords: ['com ar', 'c/ ar', 'com ac', 'ar condicionado', '1.0', '1.4', 'manual'],
    requiresAc: true,
    requiresTransmission: 'manual',
    yearRange: [2000, 2016],
    carSummary: 'Chevrolet Celta / Prisma 1.0 e 1.4 8V Flex COM Ar Condicionado (2006 a 2016)',
    partSummary: 'Radiador de Arrefecimento com Colmeia de Alumínio (Com Ar)',
    category: 'Arrefecimento',
    quantityUsedInVehicle: '1 unidade',
    oemCodes: [
      {
        code: '93337575',
        brandOrOrigin: 'Chevrolet / GM Original',
        notes: 'Código oficial genuíno da montadora GM para Celta e Prisma 1.0/1.4 COM ar condicionado',
      },
    ],
    aftermarketCodes: [
      {
        brand: 'Visconde',
        code: '12224',
        lineOrType: 'RV 12224 / Alumínio Expandido Reforçado (30mm)',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails:
          'Código oficial Visconde RV 12224 (Modine). Medidas: 522 x 322 x 30 mm. Colmeia reforçada para suportar o calor do condensador de ar condicionado.',
      },
      {
        brand: 'Valeo',
        code: '734914R',
        lineOrType: 'Linha Tradicional OEM',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Código oficial Valeo 734914R para modelos COM ar condicionado. Medidas: 522 x 322 x 30 mm.',
      },
      {
        brand: 'Magneti Marelli',
        code: 'RMM518002M',
        lineOrType: 'Linha Qualidade Original',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Código oficial Magneti Marelli RMM518002M para Celta com ar condicionado.',
      },
      {
        brand: 'Notus',
        code: 'EL-140027',
        lineOrType: 'Linha Leve',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Código Notus EL-140027.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade' },
      { label: 'Ar Condicionado', value: 'COM Ar Condicionado' },
      { label: 'Transmissão', value: 'Câmbio Manual' },
      { label: 'Espessura da Colmeia', value: '30 mm (mais espessa que a de 23 mm do modelo sem ar)' },
      { label: 'Comprimento da Colmeia', value: '522 mm' },
      { label: 'Altura da Colmeia', value: '322 mm' },
      { label: 'Capacidade do Sistema', value: '6,6 Litros' },
      { label: 'Código Original GM (OEM)', value: '93337575' },
      { label: 'Código Oficial Visconde', value: 'RV 12224 (12224)' },
    ],
    applicationWarnings: [
      'ATENÇÃO: O Celta COM Ar Condicionado utiliza o código OEM 93337575 e Visconde 12224 com colmeia reforçada de 30 mm de espessura.',
      'Não aplicar o modelo sem ar (Visconde 12223 / 23mm) em carros com ar condicionado, sob risco de superaquecimento com o ar ligado.',
    ],
    complementaryParts: [
      {
        name: 'Aditivo Concentrado Orgânico',
        reason: 'Evita cavitação e corrosão na colmeia de alumínio de 30mm.',
        referenceCodes: 'Paraflu 1001 • Tirreno',
      },
      {
        name: 'Filtro Secador / Ar Condicionado',
        reason: 'Manutenção do sistema de climatização.',
        referenceCodes: 'Denso • Valeo',
      },
    ],
    quickSalesPitch:
      'Temos o radiador Visconde 12224 e Valeo 734914R com colmeia reforçada de 30mm para Celta com ar condicionado.',
    whatsappMessage: `Orçamento de Roncoli - Chevrolet Celta 1.0 COM Ar Condicionado\n\nOlá! Segue cotação do radiador oficial para seu veículo com ar:\n\nOpção 1\n✅ Peça: Radiador de Arrefecimento 30mm\n✅ Marca Recomendada: Visconde (Original)\n✅ Código: 12224 (RV12224)\n✅ OEM GM: 93337575\n\nOpção 2\n✅ Peça: Radiador de Arrefecimento\n✅ Marca Recomendada: Valeo\n✅ Código: 734914R`,
  },

  // 0.2 Chevrolet Astra / Zafira 1.8 e 2.0 8V/16V (1999 a 2011) Câmbio Manual - Radiador de Água
  {
    partKeywords: ['radiador', 'agua', 'arrefecimento', 'colmeia'],
    vehicleKeywords: ['astra', 'zafira'],
    variantKeywords: ['1.8', '2.0', '8v', '16v', 'flexpower', 'manual', 'com ar', 'sem ar', 'ar condicionado'],
    requiresTransmission: 'manual',
    yearRange: [1999, 2012],
    carSummary: 'Chevrolet Astra / Zafira 1.8 e 2.0 8V/16V Câmbio Manual (1999 a 2011)',
    partSummary: 'Radiador de Arrefecimento do Motor (Câmbio Manual)',
    category: 'Motor, Arrefecimento e Climatização',
    quantityUsedInVehicle: '1 unidade',
    oemCodes: [
      {
        code: '93277996',
        brandOrOrigin: 'Chevrolet / GM Original',
        notes: 'Código OEM GM para Astra/Zafira 1.8 e 2.0 Câmbio Manual (Com/Sem Ar analógico)',
      },
      {
        code: '93277988',
        brandOrOrigin: 'Chevrolet / GM Original',
        notes: 'Referência cruzada oficial GM para linha Astra / Zafira manual',
      },
    ],
    aftermarketCodes: [
      {
        brand: 'Visconde',
        code: '12575',
        lineOrType: 'RV 12575 (RV 2575) / Alumínio Brasado',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails:
          'Código oficial Visconde 12575 (RV 2575). Colmeia ~600 x 378 mm para Astra e Zafira 1.8/2.0 Câmbio Manual (compatível com modelos com ar-condicionado manual/analógico e sem ar).',
      },
      {
        brand: 'Valeo',
        code: '732808',
        lineOrType: 'Linha Tradicional OEM (732808R / 732809R)',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails:
          'Código oficial Valeo 732808 / 732808R (variação 732809R conforme versão de ar analógico). Padrão original de montagem GM.',
      },
      {
        brand: 'Magneti Marelli',
        code: 'RMM54292',
        lineOrType: 'Linha Qualidade Original',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails:
          'Código oficial Magneti Marelli RMM54292 (ou RMM93192 conforme ano/sistema de ar). Construção reforçada de alta dissipação térmica para motor Família 2 2.0.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade' },
      { label: 'Transmissão', value: 'Câmbio Manual (Sem trocador de óleo ATF)' },
      { label: 'Ar Condicionado', value: 'Compatível Com Ar Analógico / Sem Ar (conferir se é Ar Digital)' },
      { label: 'Comprimento da Colmeia', value: '600 mm' },
      { label: 'Altura da Colmeia', value: '378 mm' },
      { label: 'Código Original GM (OEM)', value: '93277996 / 93277988' },
      { label: 'Código Oficial Visconde', value: '12575 (RV 2575)' },
      { label: 'Código Oficial Valeo', value: '732808 / 732808R' },
      { label: 'Código Magneti Marelli', value: 'RMM54292' },
    ],
    applicationWarnings: [
      'ATENÇÃO CRÍTICA DE BALCÃO: Aplicação estrita para Astra / Zafira 1.8 e 2.0 CÂMBIO MANUAL. Veículos com Câmbio Automático utilizam radiador com trocador de óleo ATF integrado na caixa lateral.',
      'Conferir no painel do veículo se o Ar Condicionado é Manual (botões giratórios analógicos) ou Ar Digital automático, pois versões com ar digital podem exigir variação de fixação/código (ex: Valeo 732809R / Marelli RMM93192).',
    ],
    complementaryParts: [
      {
        name: 'Válvula Termostática com Carcaça Astra 2.0',
        reason: 'Troca preventiva recomendada em qualquer manutenção do sistema de arrefecimento Família 2.',
        referenceCodes: 'MTE-Thomson VT241.82 • Wahler 4118.82 • Valclei 2241.82',
      },
      {
        name: 'Aditivo Concentrado Orgânico Long Life (Rosa)',
        reason: 'Protege a colmeia de alumínio contra cavitação e corrosão.',
        referenceCodes: 'Paraflu 1001 Orgânico • Delphi RL10008',
      },
    ],
    quickSalesPitch:
      'Para o Astra 2.0 manual com ar, o radiador correto de catálogo é o Visconde 12575, Valeo 732808 ou Magneti Marelli RMM54292 (OEM GM 93277996).',
    whatsappMessage: `Orçamento de Roncoli - Chevrolet Astra / Zafira 1.8 / 2.0 (Câmbio Manual)\n\nOlá! Segue a cotação do radiador de catálogo oficial para o seu Astra:\n\nOpção 1\n✅ Peça: Radiador de Arrefecimento (1 unidade)\n✅ Marca Recomendada: Visconde / Modine (Original)\n✅ Código: 12575 (RV 2575)\n✅ Código OEM GM: 93277996 / 93277988\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Radiador de Arrefecimento (1 unidade)\n✅ Marca Recomendada: Valeo\n✅ Código: 732808 / 732808R\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 3\n✅ Peça: Radiador de Arrefecimento (1 unidade)\n✅ Marca Recomendada: Magneti Marelli\n✅ Código: RMM54292\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Confirmar se o ar-condicionado é analógico ou digital e utilizar aditivo orgânico 50/50 na instalação.`,
  },

  // 1. VW Gol 1.0 EA111 - Bomba d'água
  {
    partKeywords: ['bomba', 'agua', 'arrefecimento'],
    vehicleKeywords: ['gol', 'voyage', 'saveiro', 'fox', 'polo'],
    variantKeywords: ['ea111', '1.0', '1.6', '8v'],
    yearRange: [2002, 2022],
    carSummary: 'Volkswagen Gol / Voyage / Fox 1.0 e 1.6 8V Total Flex (EA111)',
    partSummary: "Bomba d'água do Motor",
    category: 'Arrefecimento',
    quantityUsedInVehicle: '1 unidade',
    oemCodes: [
      { code: '030.121.008.D', brandOrOrigin: 'Volkswagen Original', notes: 'Aplicável a motores EA111 1.0 e 1.6 8V' },
      { code: '030.121.005.S', brandOrOrigin: 'VW Genuíno', notes: 'Código anterior de reposição' },
    ],
    aftermarketCodes: [
      {
        brand: 'Urba',
        code: 'UB0163',
        lineOrType: 'Com carcaça e rotor em alumínio',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Rotor metálico reforçado anti-cavitação e carcaça usinada em alumínio; junta o-ring inclusa.',
      },
      {
        brand: 'Nakata',
        code: 'NKBA01163',
        lineOrType: 'Linha Leve Premium',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Rolamento blindado de alta rotação e polia com 27 dentes de perfil curvilíneo.',
      },
      {
        brand: 'Schadek',
        code: '20.084',
        lineOrType: 'Rotor metálico reforçado',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '2ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Padrão original montadora com rotor balanceado dinamicamente para zero vibração.',
      },
      {
        brand: 'Magneti Marelli',
        code: 'BMM0163',
        lineOrType: 'Qualidade Original',
        popularInBrazil: false,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Componente certificado ISO/TS de padrão OEM europeu com vedação em borracha fluorada.',
      },
      {
        brand: 'Indisa',
        code: '104000',
        lineOrType: 'Padrão reposição',
        popularInBrazil: true,
        salesVolume: 'Menos vendida',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Opção econômica com carcaça usinada e garantia de fábrica para o motor EA111.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade' },
      { label: 'Acionamento', value: 'Pela correia dentada (27 dentes)' },
      { label: 'Rotor', value: 'Metálico em liga de alumínio anti-cavitação' },
      { label: 'Vedação', value: 'Anel O-ring de borracha nitrílica incluso' },
      { label: 'Polia', value: '27 dentes com perfil arredondado' },
      { label: 'Carcaça', value: 'Alumínio usinado de alta pressão' },
      { label: 'Torque de Aperto', value: '10 Nm (1.0 Kgfm)' },
    ],
    applicationWarnings: [
      'Atenção: Sempre substituir o anel de vedação (O-Ring) na montagem e usar aditivo orgânico proporção 50/50.',
      'Não confundir com o motor 1.0 12V 3 cilindros (EA211), cuja bomba é dupla e acionada por correia traseira.',
    ],
    complementaryParts: [
      {
        name: 'Kit Correia Dentada e Tensor',
        reason: 'A correia passa pela bomba; recomendável trocar juntos para garantir garantia.',
        referenceCodes: 'Contitech CT1167K1 • Gates KS101 • Dayco KTB269 • Ina 530 0171 10',
      },
      {
        name: 'Aditivo Concentrado para Radiador',
        reason: 'Essencial para não enferrujar o rotor e o bloco do motor.',
        referenceCodes: 'Paraflu 1001 Orgânico Rosa • Radiex R-1922 • Delphi RL10008',
      },
    ],
    quickSalesPitch: 'Temos a bomba da Urba e Nakata com rotor metálico reforçado para o motor EA111, com anel o-ring incluso.',
    whatsappMessage: `Olá! Segue cotação da *Bomba d'água* para *VW Gol / Fox 1.0/1.6 EA111*:\n\n• *OEM Original VW:* 030121008D\n• *Urba:* UB0163 (Rotor metálico)\n• *Nakata:* NKBA01163\n• *Schadek:* 20.084\n\n✅ Acompanha anel o-ring de vedação. Pronta entrega!`,
  },

  // 2. VW Gol / Voyage / Fox - Pastilha de freio dianteira
  {
    partKeywords: ['pastilha', 'freio', 'dianteira', 'dianteiro'],
    vehicleKeywords: ['gol', 'voyage', 'saveiro', 'fox', 'crossfox', 'spacefox'],
    variantKeywords: ['g5', 'g6', 'g7', '1.0', '1.6'],
    yearRange: [2008, 2023],
    carSummary: 'Volkswagen Gol G5/G6/G7 / Voyage / Fox 1.0 e 1.6',
    partSummary: 'Pastilha de Freio Dianteira (Jogo com 4 peças)',
    category: 'Freios',
    quantityUsedInVehicle: '1 jogo (contém 4 pastilhas para as 2 rodas dianteiras)',
    oemCodes: [
      { code: '5Z0.698.151.A', brandOrOrigin: 'Volkswagen Original', notes: 'Sistema de freio Teves / Continental' },
      { code: '5U0.698.151', brandOrOrigin: 'VW Genuíno', notes: 'Linha Gol G5/G6' },
    ],
    aftermarketCodes: [
      {
        brand: 'Fras-le',
        code: 'PD/58',
        lineOrType: 'Linha Original Macia',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Fórmula macia de alta durabilidade e frenagem progressiva; excelente preservação do disco.',
      },
      {
        brand: 'Cobreq',
        code: 'N-254',
        lineOrType: 'Com anti-ruído integrado',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Placa anti-ruído metálica integrada e coeficiente de atrito estável para trânsito urbano intenso.',
      },
      {
        brand: 'Bosch',
        code: '0 986 BB0 744',
        lineOrType: 'Fórmula Cerâmica Sem Amianto',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Composto cerâmico livre de amianto com alta resistência ao fading térmico e mínima poeira preta.',
      },
      {
        brand: 'Syl',
        code: 'SYL1094',
        lineOrType: 'Linha Econômica',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Composto semimetálico de reposição padrão; excelente valor de aquisição inicial.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 jogo (4 peças para as 2 rodas dianteiras)' },
      { label: 'Sistema de Freio', value: 'Teves / ATE Continental' },
      { label: 'Posição / Lado', value: 'Dianteiro (Direito e Esquerdo)' },
      { label: 'Comprimento', value: '141.4 mm' },
      { label: 'Altura', value: '51.2 mm' },
      { label: 'Espessura Total', value: '17.0 mm (com chapa)' },
      { label: 'Placa Anti-Ruído', value: 'Integrada (shim anti-vibração)' },
      { label: 'Sensor de Desgaste', value: 'Não possui sensor elétrico' },
    ],
    applicationWarnings: [
      'Verifique se o disco é sólido (1.0) ou ventilado (1.6), a pastilha para sistema Teves PD/58 é a mais comum.',
      'Sempre verificar a condição e espessura do disco de freio antes de instalar pastilhas novas para evitar vibrações.',
    ],
    complementaryParts: [
      {
        name: 'Discos de Freio Dianteiros',
        reason: 'Substituição recomendada caso apresentem rebarbas ou espessura abaixo do mínimo.',
        referenceCodes: 'Fremax BD-5002 (Ventilado) / BD-5001 (Sólido) • Hipper Freios HF-22A • TRW RCDI08560',
      },
      {
        name: 'Fluido de Freio DOT 4',
        reason: 'Recomenda-se a sangria e substituição a cada 2 anos.',
        referenceCodes: 'Bosch 0 986 BF0 001 • Varga / TRW RCCR00050 • Cobreq DOT 4 500ml',
      },
    ],
    quickSalesPitch: 'Temos a Fras-le PD/58 e Cobreq N-254 em estoque, ambas com placa anti-ruído para o Gol.',
    whatsappMessage: `Olá! Segue cotação das *Pastilhas de Freio Dianteiras* para o *VW Gol G5/G6/G7 / Fox*:\n\n• *Original VW:* 5Z0698151A\n• *Fras-le:* PD/58 (Excelente durabilidade)\n• *Cobreq:* N-254 (Com anti-ruído)\n• *Bosch:* 0986BB0744\n\n✅ Pronta entrega no balcão!`,
  },

  // 3. VW Gol / Fox - Kit Correia Dentada
  {
    partKeywords: ['correia', 'dentada', 'tensor', 'sincronizadora', 'distribuicao'],
    vehicleKeywords: ['gol', 'voyage', 'fox', 'saveiro'],
    variantKeywords: ['ea111', '1.0', '1.6', '8v'],
    yearRange: [2002, 2022],
    carSummary: 'Volkswagen Gol / Fox / Voyage 1.0 e 1.6 8V Total Flex (EA111)',
    partSummary: 'Kit de Correia Dentada e Tensor',
    category: 'Motor',
    quantityUsedInVehicle: '1 kit (1 correia dentada + 1 tensor)',
    oemCodes: [
      { code: '030.198.119.F', brandOrOrigin: 'Volkswagen Original', notes: 'Kit correia 135 dentes + tensor' },
    ],
    aftermarketCodes: [
      {
        brand: 'Contitech',
        code: 'CT1167K1',
        lineOrType: 'Kit Correia + Tensor',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Correia em borracha HNBR resistente a altas temperaturas com tensor de rolamento reforçado.',
      },
      {
        brand: 'Gates',
        code: 'KS101',
        lineOrType: 'Kit PowerGrip Original',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Perfil curvilíneo de dente autolubrificado e poliamida anti-atrito de longa duração.',
      },
      {
        brand: 'Dayco',
        code: 'KTB269',
        lineOrType: 'Kit Completo',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Construção robusta com cordoneis de fibra de vidro para estiramento zero em rotações altas.',
      },
      {
        brand: 'Ina',
        code: '530 0171 10',
        lineOrType: 'Rolamento Alemão Premium',
        popularInBrazil: false,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Tensor com rolamento alemão Schaeffler com selagem dupla contra poeira e óleo.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 kit (1 correia dentada + 1 tensor)' },
      { label: 'Número de Dentes', value: '135 dentes' },
      { label: 'Largura da Correia', value: '19.0 mm' },
      { label: 'Perfil do Dente', value: 'Curvilíneo HNBR térmico de alta resistência' },
      { label: 'Tipo de Tensor', value: 'Automático excêntrico com ponteiro indicador' },
      { label: 'Diâmetro do Rolamento', value: '62 mm' },
      { label: 'Intervalo de Troca', value: 'Recomendado a cada 60.000 km ou 3 anos' },
    ],
    applicationWarnings: [
      'Atenção: Válido para motor EA111 8 válvulas (135 dentes). Se for motor EA211 3 cilindros 12V, a correia tem outro perfil e sincronismo diferente.',
      'Nunca reutilize o esticador antigo; a falha do rolamento do tensor estoura o cabeçote.',
    ],
    complementaryParts: [
      {
        name: "Bomba d'água Urba UB0163",
        reason: 'Acionada pela correia; substituição preventiva recomendada.',
        referenceCodes: 'Urba UB0163 • Nakata NKBA01163 • Schadek 20.084 • Indisa 104000',
      },
      {
        name: 'Correia Poly-V de Acessórios',
        reason: 'Recomendado trocar no mesmo serviço de desmontagem.',
        referenceCodes: 'Gates 6PK1200 • Contitech 6PK1200 • Dayco 6PK1200',
      },
    ],
    quickSalesPitch: 'Trabalhamos com o Kit original da Contitech CT1167K1 e Gates KS101 de 135 dentes para o motor EA111.',
    whatsappMessage: `Olá! Segue cotação do *Kit Correia Dentada + Tensor* para *VW Gol / Fox 1.0 / 1.6 EA111*:\n\n• *Original VW:* 030198119F\n• *Contitech (Continental):* CT1167K1\n• *Gates:* KS101\n• *Dayco:* KTB269\n\n⚙️ 135 dentes | HNBR de alta durabilidade\n✅ Temos a pronta entrega!`,
  },

  // 4. Chevrolet Corsa G2 (Frente Montana 2002 a 2012) / Montana 1.4 e 1.8 - Pastilha Dianteira
  {
    partKeywords: ['pastilha', 'freio', 'dianteira', 'dianteiro'],
    vehicleKeywords: ['corsa', 'montana', 'meriva'],
    variantKeywords: ['frente montana', 'corsa g2', 'novo corsa', 'econoflex', '1.4', '1.8'],
    yearRange: [2002, 2016],
    carSummary: 'Chevrolet Corsa G2 (Frente Montana) / Montana / Meriva 1.4 e 1.8 8V (2002 a 2012)',
    partSummary: 'Pastilha de Freio Dianteira (Jogo 4 peças)',
    category: 'Freios',
    quantityUsedInVehicle: '1 jogo (contém 4 pastilhas para as 2 rodas dianteiras)',
    oemCodes: [
      { code: '93374246', brandOrOrigin: 'Chevrolet Genuine Parts', notes: 'Sistema Teves / Varga para Corsa Frente Montana' },
      { code: '93399127', brandOrOrigin: 'GM Original', notes: 'Código montadora' },
      { code: '93310931', brandOrOrigin: 'GM Genuíno', notes: 'Disco ventilado 240mm' },
    ],
    aftermarketCodes: [
      {
        brand: 'Cobreq',
        code: 'N-360',
        lineOrType: 'Linha Street Original com Anti-Ruído',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Pastilha exata para Corsa Frente Montana e Montana (141.4 x 51.2 x 17.0mm) com chapa anti-ruído integrada.',
      },
      {
        brand: 'Fras-le',
        code: 'PD/58',
        lineOrType: 'Linha Macia Confort',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Composto macio de alto atrito; não vitrifica, frenagem silenciosa e excelente durabilidade dos discos.',
      },
      {
        brand: 'Nakata',
        code: 'NKF1122P',
        lineOrType: 'Linha Segura',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '2ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Composto semimetálico desenvolvido rigorosamente nas medidas da pinça original do Corsa G2 / Montana.',
      },
      {
        brand: 'Bosch',
        code: '0 986 BB0 236',
        lineOrType: 'Fórmula Cerâmica Sem Amianto',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Frenagem silenciosa e eficiente com certificação mundial Bosch para linha GM 1.4/1.8.',
      },
      {
        brand: 'Syl',
        code: 'SYL1079',
        lineOrType: 'Linha Reposição',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Excelente custo de reposição para balcão, com encaixe dimensional perfeito.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 jogo (4 pastilhas para as 2 rodas dianteiras)' },
      { label: 'Sistema de Freio', value: 'Teves / Varga (Pinça Flutuante)' },
      { label: 'Comprimento', value: '141.4 mm' },
      { label: 'Altura', value: '51.2 mm' },
      { label: 'Espessura', value: '17.0 mm (com placa)' },
      { label: 'Chapa Anti-Ruído', value: 'Inclusa (revestimento metálico/emborrachado)' },
      { label: 'Diâmetro do Disco Compatível', value: '240 mm (Disco Ventilado ou Sólido)' },
      { label: 'Código Cobreq Homologado', value: 'N-360 (Atenção: Não confundir com N-382 do Onix)' },
    ],
    applicationWarnings: [
      'ATENÇÃO CRÍTICA DE BALCÃO: Para o Corsa Geração 2 (Frente Montana 2002 a 2012) e Montana 1.4/1.8, a pastilha correta é COBREQ N-360 (Fras-le PD/58).',
      'NUNCA venda Cobreq N-382 (que é exclusiva para Onix, Prisma e Cobalt moderno).',
      'NUNCA venda Cobreq N-325 (que é para Corsa Classic modelo B antigo e Celta).',
    ],
    complementaryParts: [
      {
        name: 'Discos de Freio Dianteiros 240mm',
        reason: 'Conferir rebarbas ou espessura mínima de segurança (mínimo 18.0 mm para ventilados).',
        referenceCodes: 'Fremax BD-5002 • Hipper Freios HF-24 • TRW RCDI08560',
      },
      {
        name: 'Fluido de Freio DOT 4',
        reason: 'Substituição preventiva recomendada a cada 10.000km ou 12 meses.',
        referenceCodes: 'Bosch 0 986 BF0 001 • Varga RCCR00050',
      },
    ],
    quickSalesPitch: 'Trabalhamos com a pastilha Cobreq N-360 e Fras-le PD/58, que é a aplicação exata para o Corsa Frente Montana e Montana 1.4.',
    whatsappMessage: `Orçamento de Roncoli - Chevrolet Corsa Frente Montana 1.4 2012\n\nOlá! Segue a especificação da pastilha de freio dianteira para o seu veículo:\n\nOpção 1\n✅ Peça: Jogo de Pastilhas de Freio Dianteiras (1 jogo com 4 peças)\n✅ Marca Recomendada: Cobreq (Original de montadora)\n✅ Código: N-360\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Jogo de Pastilhas de Freio Dianteiras (1 jogo com 4 peças)\n✅ Marca Recomendada: Fras-le\n✅ Código: PD/58\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: No Corsa Frente Montana e Montana, a pastilha correta é a Cobreq N-360 (não serve a N-382 do Onix). Conferir a espessura do disco de freio na troca.\n\nQualquer dúvida, estou à disposição!`,
  },

  // 5. Chevrolet Onix / Prisma - Pastilha Dianteira
  {
    partKeywords: ['pastilha', 'freio', 'dianteira', 'dianteiro'],
    vehicleKeywords: ['onix', 'prisma', 'spin', 'cobalt', 'joy'],
    yearRange: [2012, 2021],
    carSummary: 'Chevrolet Onix / Prisma 1.0 e 1.4 (Geração 1 / Joy 2012 a 2021)',
    partSummary: 'Pastilha de Freio Dianteira (Jogo 4 peças)',
    category: 'Freios',
    quantityUsedInVehicle: '1 jogo (contém 4 pastilhas para as 2 rodas dianteiras)',
    oemCodes: [
      { code: '94748949', brandOrOrigin: 'Chevrolet Genuine Parts', notes: 'Sistema Teves / ATE' },
      { code: '52062771', brandOrOrigin: 'GM Original', notes: 'Para veículos com ABS' },
    ],
    aftermarketCodes: [
      {
        brand: 'Cobreq',
        code: 'N-382',
        lineOrType: 'Linha Standard Anti-Ruído',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Lâmina anti-ruído emborrachada de fábrica e composto semimetálico de resposta rápida na frenagem.',
      },
      {
        brand: 'Fras-le',
        code: 'PD/1446',
        lineOrType: 'Linha Macia Confort',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Massa de atrito premium de longa vida útil; alta dissipação térmica e preservação do disco.',
      },
      {
        brand: 'Bosch',
        code: '0 986 BB0 780',
        lineOrType: 'Fórmula Cerâmica Premium',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Composto cerâmico livre de amianto com certificação global Bosch e rodas sempre limpas sem fuligem.',
      },
      {
        brand: 'Nakata',
        code: 'NKF1223P',
        lineOrType: 'Linha Segura',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Chanfros laterais e placa de amortecimento que eliminam ressonâncias e vibrações na pinça.',
      },
      {
        brand: 'Tecpads',
        code: 'T-1446',
        lineOrType: 'Linha Econômica',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '3ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Composto orgânico convencional para reposição padrão; menor investimento para frotistas.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 jogo (4 pastilhas para as 2 rodas dianteiras)' },
      { label: 'Sistema de Freio', value: 'Teves / GM Original' },
      { label: 'Posição / Lado', value: 'Dianteiro (Roda Direita e Esquerda)' },
      { label: 'Comprimento', value: '140.2 mm' },
      { label: 'Altura', value: '50.8 mm' },
      { label: 'Espessura', value: '16.5 mm' },
      { label: 'Chapa Anti-Ruído', value: 'Inclusa com revestimento emborrachado' },
      { label: 'Compatibilidade ABS', value: 'Compatível com veículos com ou sem freios ABS' },
    ],
    applicationWarnings: [
      'Aplica-se ao Onix Geração 1 e Joy (2012 a 2021). Não serve no Novo Onix Plus Turbo (a partir de 2020) que usa PD/2230.',
    ],
    complementaryParts: [
      {
        name: 'Disco de freio dianteiro',
        reason: 'O uso de pastilhas novas em discos com sulcos ou empenados reduz a eficiência da frenagem e causa ruídos.',
        referenceCodes: 'Fremax BD-5298 • Hipper Freios HF-24A • TRW RCDI09780 • Nakata NKF6030',
      },
      {
        name: 'Fluido de freio DOT 4',
        reason: 'Recomendado realizar a sangria e troca do fluido para garantir a pressão correta no sistema ABS.',
        referenceCodes: 'ACDelco 93386518 • Bosch 0 986 BF0 001 • Varga / TRW RCCR00050',
      },
      {
        name: 'Pasta lubrificante para pinças',
        reason: 'Evita o travamento dos pinos deslizantes e elimina ruídos de vibração (chiado).',
        referenceCodes: 'Wurth Graxa Cerâmica 08931102 • Cobreq Silenciador de Freios • Tirreno Pastas',
      },
    ],
    quickSalesPitch: 'Temos as pastilhas dianteiras Fras-le PD/1446 e Cobreq N-382 para o Onix 1.0 e 1.4, pronta entrega.',
    whatsappMessage: `Olá! Cotação das *Pastilhas de Freio Dianteiras* para *Chevrolet Onix / Prisma 1.0 / 1.4*:\n\n• *OEM GM:* 94748949\n• *Fras-le:* PD/1446\n• *Cobreq:* N-382\n• *Bosch:* 0986BB0780\n\n✅ Em estoque no balcão!`,
  },

  // 5. Chevrolet Onix / Celta / Corsa - Bomba d'água
  {
    partKeywords: ['bomba', 'agua', 'arrefecimento'],
    vehicleKeywords: ['onix', 'prisma', 'celta', 'corsa', 'classic', 'agile', 'montana'],
    variantKeywords: ['1.0', '1.4', 'vhc', 'vhce', 'spe/4', '19 dentes'],
    carSummary: 'Chevrolet Onix / Prisma / Celta / Classic 1.0 e 1.4 8V (SPE/4 e VHC-E)',
    partSummary: "Bomba d'água do Motor",
    category: 'Arrefecimento',
    quantityUsedInVehicle: '1 unidade',
    oemCodes: [
      { code: '93385834', brandOrOrigin: 'Chevrolet Genuine Parts', notes: 'Polia de 19 dentes' },
      { code: '93339182', brandOrOrigin: 'GM Original', notes: 'Código tradicional' },
    ],
    aftermarketCodes: [
      {
        brand: 'Urba',
        code: 'UB0155',
        lineOrType: 'Com polia de 19 dentes',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Polia de 19 dentes com rotor estampado de 8 pás e anel de vedação nitrílico incluso.',
      },
      {
        brand: 'Nakata',
        code: 'NKBA02834',
        lineOrType: 'Rotor metálico reforçado',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Rolamento blindado de dupla vedação e carcaça usinada em alumínio de alta densidade.',
      },
      {
        brand: 'Schadek',
        code: '20.082',
        lineOrType: 'Qualidade OEM',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '2ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Padrão montadora de alta vazão volumétrica com menor esforço sobre a correia dentada.',
      },
      {
        brand: 'Indisa',
        code: '154001',
        lineOrType: 'Linha leve reposição',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
        technicalDetails: 'Opção de reposição comercial com garantia e custo equilibrado para manutenção periódica.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade' },
      { label: 'Número de Dentes', value: '19 dentes na polia de tração' },
      { label: 'Acionamento', value: 'Pelo dorso da correia dentada' },
      { label: 'Rotor', value: 'Metálico estampado de 8 pás' },
      { label: 'Junta de Vedação', value: 'Anel O-Ring circular de alta vedação incluso' },
      { label: 'Sentido de Giro', value: 'Horário' },
      { label: 'Aplicação do Motor', value: 'GM Família 1 SPE/4 e VHC-E 1.0 e 1.4 8V' },
    ],
    applicationWarnings: [
      'Atenção ao número de dentes da polia: a linha moderna usa 19 dentes. Modelos muito antigos (Corsa até 1995) usavam 21 dentes.',
    ],
    complementaryParts: [
      {
        name: 'Correia Dentada Gates KS201',
        reason: 'Substituição conjunta obrigatória para garantia.',
        referenceCodes: 'Gates KS201 • Contitech CT874K1 • Dayco KTB287',
      },
      {
        name: 'Válvula Termostática',
        reason: 'Evita superaquecimento comum nos motores GM Família 1.',
        referenceCodes: 'MTE-Thomson VT248.92 • Wahler 4148.92 • Magneti Marelli MMVT248',
      },
    ],
    quickSalesPitch: 'Temos a bomba Urba UB0155 e Nakata com 19 dentes para a linha GM 1.0 e 1.4 Flex.',
    whatsappMessage: `Olá! Cotação da *Bomba d'água* para *GM Onix / Prisma / Celta 1.0 e 1.4*:\n\n• *OEM GM:* 93385834\n• *Urba:* UB0155 (19 dentes)\n• *Nakata:* NKBA02834\n• *Schadek:* 20.082\n\n✅ Com o-ring de vedação incluso!`,
  },

  // 6. Fiat Palio / Strada / Uno / Siena 1.4 Fire - Amortecedor Dianteiro
  {
    partKeywords: ['amortecedor', 'dianteiro', 'suspensao'],
    vehicleKeywords: ['strada', 'palio', 'siena', 'weekend'],
    variantKeywords: ['working', 'fire', '1.4', '1.0'],
    carSummary: 'Fiat Strada / Palio / Siena 1.4 e 1.0 Fire Flex',
    partSummary: 'Amortecedor Dianteiro Pressurizado Turbogás',
    category: 'Suspensão',
    quantityUsedInVehicle: '2 unidades (1 dianteiro direito + 1 dianteiro esquerdo - recomenda-se trocar o par)',
    oemCodes: [
      { code: '51842858', brandOrOrigin: 'Fiat Original Genuine', notes: 'Par dianteiro esquerdo/direito' },
      { code: '51842859', brandOrOrigin: 'Fiat OEM', notes: 'Linha Strada Working' },
    ],
    aftermarketCodes: [
      {
        brand: 'Cofap',
        code: 'GP30132',
        lineOrType: 'Turbogás Pressurizado',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Mais Procurada',
        technicalDetails: 'Tecnologia Turbogás com gás nitrogênio sob pressão; elimina aeração do óleo e garante estabilidade.',
      },
      {
        brand: 'Nakata',
        code: 'HG33008',
        lineOrType: 'Pressurizado HG',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Haste cromada retificada de 20mm e batente hidráulico que absorve solavancos em estradas de terra.',
      },
      {
        brand: 'Monroe',
        code: 'SP038',
        lineOrType: 'Monroe Gás Premium',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Válvula de amortecimento proporcional em vários estágios; máximo conforto de rodagem.',
      },
      {
        brand: 'Kayaba (KYB)',
        code: '333742',
        lineOrType: 'Importado Japonês',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Construção japonesa de altíssima precisão com retentor multilábio reforçado.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '2 unidades (1 lado direito + 1 lado esquerdo)' },
      { label: 'Tipo de Estrutura', value: 'Telescópico Pressurizado Turbogás / Gás Nitrogênio' },
      { label: 'Lado de Montagem', value: 'Bilateral (serve tanto LE quanto LD)' },
      { label: 'Posição', value: 'Suspensão Dianteira' },
      { label: 'Fixação Inferior', value: '2 furos na manga de eixo' },
      { label: 'Fixação Superior', value: 'Espiga com rosca M12 e chave sextavada' },
      { label: 'Diâmetro da Haste', value: '20.0 mm temperada e retificada' },
      { label: 'Curso Útil', value: '168 mm' },
    ],
    applicationWarnings: [
      'Atenção para Strada Adventure / Locker: a versão Adventure usa o amortecedor mais longo (Cofap GP32297). Para Strada comum/working é o GP30132.',
    ],
    complementaryParts: [
      {
        name: 'Kit Batente e Coifa Dianteiro (Axios ou Sampel)',
        reason: 'Protege a haste do amortecedor contra sujeira e impactos.',
        referenceCodes: 'Sampel SK101S • Monroe Axios 044.0837 • Nakata NK0137',
      },
      {
        name: 'Coxim com Rolamento Dianteiro',
        reason: 'Elimina barulhos e travamentos na direção ao esterçar.',
        referenceCodes: 'Sampel 1007 • Monroe Axios 041.1352 • Nakata NK0138',
      },
    ],
    quickSalesPitch: 'Trabalhamos com o Cofap Turbogás GP30132 e Nakata HG para a Strada Fire, pressurizado a gás.',
    whatsappMessage: `Olá! Cotação do *Amortecedor Dianteiro* para *Fiat Strada / Palio 1.4 Fire*:\n\n• *OEM Fiat:* 51842858\n• *Cofap Turbogás:* GP30132 (Líder de mercado)\n• *Nakata:* HG33008\n• *Monroe:* SP038\n\n✅ Pressurizado a gás com garantia de fábrica. Pronta entrega!`,
  },

  // 7. Hyundai HB20 1.0 12V 3cc - Kit Correia e Velas
  {
    partKeywords: ['correia', 'dentada', 'acessorios', 'alternador', 'poly-v'],
    vehicleKeywords: ['hb20', 'hb20s'],
    variantKeywords: ['1.0', '12v', 'kappa', '3 cilindros', '3cc'],
    carSummary: 'Hyundai HB20 1.0 12V 3 Cilindros Flex (Motor Kappa)',
    partSummary: 'Correia de Acessórios / Alternador Poly-V',
    category: 'Motor',
    quantityUsedInVehicle: '1 unidade',
    oemCodes: [
      { code: '25212-04000', brandOrOrigin: 'Hyundai Genuine Parts', notes: 'Correia do alternador e bomba' },
      { code: '25212-04020', brandOrOrigin: 'Hyundai Mobis', notes: 'Para veículos com ar condicionado' },
    ],
    aftermarketCodes: [
      {
        brand: 'Gates',
        code: '6PK1255',
        lineOrType: 'Micro-V EPDM Original',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Construção em elastômero EPDM resistente a altas temperaturas (140°C) e ozônio.',
      },
      {
        brand: 'Contitech',
        code: '6PK1255',
        lineOrType: 'Continental Multi V',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Cordonéis de poliéster de alta estabilidade e dorso com revestimento têxtil anti-ruído.',
      },
      {
        brand: 'Dayco',
        code: '6PK1255',
        lineOrType: 'Correia Estriada Poly-V',
        popularInBrazil: true,
        salesVolume: 'Menos vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Desenho das nervuras de precisão para acionamento simultâneo do alternador e ar-condicionado.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade' },
      { label: 'Perfil de Estrias', value: '6PK (6 ranhuras / nervuras paralelas)' },
      { label: 'Comprimento Efetivo', value: '1255 mm' },
      { label: 'Material', value: 'Borracha sintética EPDM (resistente a 140°C e ozônio)' },
      { label: 'Acionamento', value: 'Alternador, Bomba d\'água e Compressor do Ar' },
      { label: 'Sincronismo do Motor', value: 'Corrente de aço interna (não usa correia dentada)' },
      { label: 'Espessura da Correia', value: '4.5 mm' },
    ],
    applicationWarnings: [
      'IMPORTANTE: O motor 1.0 12V Kappa do HB20 usa CORRENTE DE SINCRONISMO de aço (não usa correia dentada para o comando de válvulas). A correia que se troca externamente é a Poly-V 6PK1255 dos acessórios!',
    ],
    complementaryParts: [
      {
        name: 'Rolamento Tensor da Poly-V (Ina 534 0432 10)',
        reason: 'Evita chiados e soltura da correia.',
        referenceCodes: 'Ina 534 0432 10 • Gates T39281 • Dayco APV3230',
      },
      {
        name: 'Jogo de Velas Iridium NGK SILZKR6B10E',
        reason: 'Vela específica de 3 eletrodos/iridium recomendada a cada 40.000 km.',
        referenceCodes: 'NGK SILZKR6B10E • Denso IXUH22I • Bosch YR7NE',
      },
    ],
    quickSalesPitch: 'O motor Kappa do HB20 usa corrente interna; a correia externa é a Poly-V Gates 6PK1255, temos pronta entrega.',
    whatsappMessage: `Olá! Cotação da *Correia de Acessórios* para *Hyundai HB20 1.0 12V (3cc)*:\n\n💡 *Dica técnica:* Este motor utiliza *corrente de distribuição* interna. A correia externa é a de acessórios:\n• *OEM Hyundai:* 25212-04000\n• *Gates:* 6PK1255\n• *Dayco:* 6PK1255\n• *Contitech:* 6PK1255\n\n✅ Pronta entrega!`,
  },

  // 8. Toyota Corolla 2.0 16V - Velas de Ignição Iridium
  {
    partKeywords: ['vela', 'velas', 'ignicao', 'iridium'],
    vehicleKeywords: ['corolla'],
    variantKeywords: ['2.0', '1.8', 'altis', 'xei', 'gli', 'vvt', 'vvti'],
    yearRange: [2008, 2020],
    carSummary: 'Toyota Corolla 1.8 e 2.0 16V Dual VVT-i Flex (2008 a 2019)',
    partSummary: 'Jogo de Velas de Ignição Iridium (4 unidades)',
    category: 'Elétrica / Ignição',
    quantityUsedInVehicle: '4 unidades (1 vela por cilindro - vendido o jogo com 4)',
    oemCodes: [
      { code: '90919-01253', brandOrOrigin: 'Toyota Genuine Parts', notes: 'Ponta Laser Iridium original' },
      { code: 'SC20HR11', brandOrOrigin: 'Denso OEM Japan', notes: 'Fabricante fornecedor da linha de montagem' },
    ],
    aftermarketCodes: [
      {
        brand: 'Denso',
        code: 'SC20HR11',
        lineOrType: 'Iridium Original Toyota',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Eletrodo central patenteado de 0.4mm em Iridium puro; fornecedora original da linha de montagem Toyota.',
      },
      {
        brand: 'NGK',
        code: 'ILKAR7B11',
        lineOrType: 'Laser Iridium Premium',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Ponta de Laser Iridium soldada a laser com pastilha de platina no eletrodo de massa; dura até 100.000 km.',
      },
      {
        brand: 'Bosch',
        code: 'YR7NE',
        lineOrType: 'Double Iridium',
        popularInBrazil: false,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Dois pinos de Iridium para queima precisa em altas rotações e menor tensão exigida da bobina.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '4 unidades (1 vela por cilindro - vendido o jogo com 4)' },
      { label: 'Tipo de Eletrodo', value: 'Laser Iridium ultrafino 0.6 mm com pastilha de platina' },
      { label: 'Gap (Folga do Eletrodo)', value: '1.1 mm (calibrado de fábrica)' },
      { label: 'Diâmetro da Rosca', value: '12 mm' },
      { label: 'Passo da Rosca', value: '1.25 mm' },
      { label: 'Comprimento da Rosca', value: '26.5 mm (Rosca Longa)' },
      { label: 'Tamanho da Chave', value: 'Sextavada 14 mm longa (Bi-sextavada)' },
      { label: 'Grau Térmico', value: '7 (Grau Térmico Médio/Frio)' },
      { label: 'Resistência Elétrica', value: 'Resistiva 5 kOhms (anti-ruído eletromagnético)' },
      { label: 'Durabilidade Estimada', value: 'Até 100.000 km' },
    ],
    applicationWarnings: [
      'Atenção ao tamanho da chave: exige chave de vela longa sextavada fina de 14mm. Nunca use velas comuns de cobre no Corolla Dual VVT-i para não queimar as bobinas individuais.',
    ],
    complementaryParts: [
      {
        name: 'Bobina de Ignição Denso / Delphi',
        reason: 'Conferir se não há trincas ou vazamento de centelha no cachimbo.',
        referenceCodes: 'Denso 099700-2500 • Delphi GN10314 • Magneti Marelli BI0082MM',
      },
      {
        name: 'Filtro de Combustível Mahle KL582',
        reason: 'Preserva a injeção eletrônica e a vida útil das velas.',
        referenceCodes: 'Mahle KL582 • Tecfil GI50/7 • Wega FCI1660',
      },
    ],
    quickSalesPitch: 'Temos o jogo de velas Laser Iridium original Denso SC20HR11 e NGK para o Corolla 2.0, durabilidade de até 100 mil km.',
    whatsappMessage: `Olá! Cotação do *Jogo de Velas Iridium* para *Toyota Corolla 1.8 e 2.0 Dual VVT-i*:\n\n• *OEM Toyota:* 90919-01253\n• *Denso (Original da montadora):* SC20HR11\n• *NGK:* ILKAR7B11 (Laser Iridium)\n\n⚡ Rosca 12mm / Chave 14mm | Durabilidade até 100.000 km\n✅ Pronta entrega no balcão!`,
  },

  // 9. Ford Ka 1.0 12V 3cc - Correia Dentada Banhada a Óleo
  {
    partKeywords: ['correia', 'dentada', 'oleo', 'banhada'],
    vehicleKeywords: ['ka'],
    variantKeywords: ['1.0', '3cc', '12v', 'ti-vct', 'sedan', 'hatch'],
    yearRange: [2014, 2022],
    carSummary: 'Ford Ka 1.0 12V 3 Cilindros Ti-VCT Flex (Correia Banhada a Óleo)',
    partSummary: 'Correia Dentada de Distribuição Banhada a Óleo',
    category: 'Motor',
    quantityUsedInVehicle: '1 unidade (correia interna do comando)',
    oemCodes: [
      { code: 'E3BG-6K288-AA', brandOrOrigin: 'Ford Motorcraft Genuine', notes: 'Correia dentada banhada a óleo' },
      { code: 'CM5G-6K288-AA', brandOrOrigin: 'Ford Original', notes: 'Linha Ti-VCT' },
    ],
    aftermarketCodes: [
      {
        brand: 'Dayco',
        code: 'BIO001',
        lineOrType: 'Belt-in-Oil (Banhada a Óleo)',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Mais Procurada',
        technicalDetails: 'Desenvolvida em polímero resistente ao ataque químico de óleos detergentes quentes; patente original Dayco BIO.',
      },
      {
        brand: 'Gates',
        code: '5680XS',
        lineOrType: 'PowerGrip BIO Especial',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Tecido de poliamida com alta adesão e perfil de dente curvilíneo para funcionamento silencioso.',
      },
      {
        brand: 'Contitech',
        code: 'CT1187',
        lineOrType: 'Linha Óleo Especial',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Construção Continental alemã para durabilidade estendida e tolerância a variações térmicas severas.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade (correia interna do comando)' },
      { label: 'Tecnologia', value: 'Belt-in-Oil (BIO - resistente a óleo quente do motor)' },
      { label: 'Número de Dentes', value: '116 dentes' },
      { label: 'Largura da Correia', value: '16.0 mm' },
      { label: 'Perfil do Dente', value: 'Curvilíneo HNBR especial' },
      { label: 'Lubrificação Exigida', value: 'Óleo homologado Ford 5W20 WSS-M2C948-B' },
      { label: 'Posição', value: 'Interna sob a tampa frontal sincronizada' },
    ],
    applicationWarnings: [
      'ALERTA CRÍTICO: Utilizar OBRIGATORIAMENTE o óleo correto homologado pela Ford (5W20 WSS-M2C948-B). O uso de óleo errado degrada a borracha da correia e entope o pescador da bomba de óleo, fundindo o motor!',
      'Trocar sempre o tensor específico e limpar o pescador do cárter na troca.',
    ],
    complementaryParts: [
      {
        name: 'Tensor da Correia Dayco ATB2635',
        reason: 'Substituição obrigatória junto com a correia.',
        referenceCodes: 'Dayco ATB2635 • Ford Original E3BG-6K245-AA • Gates T43254',
      },
      {
        name: 'Óleo Motorcraft 5W20 100% Sintético',
        reason: 'Único especificado que não dissolve a correia.',
        referenceCodes: 'Motorcraft 5W20 Sintético WSS-M2C948-B • Castrol Magnatec Professional E 5W-20',
      },
      {
        name: 'Filtro de Óleo Ford Motorcraft G3MJ6714AA',
        reason: 'Retém resíduos durante o assentamento da nova correia.',
        referenceCodes: 'Ford Motorcraft G3MJ6714AA • Fram PH10044 • Tecfil PSL146',
      },
    ],
    quickSalesPitch: 'Temos a correia banhada a óleo original Dayco BIO001 e Gates para o Ford Ka 1.0 3cc.',
    whatsappMessage: `Olá! Cotação da *Correia Dentada Banhada a Óleo* para *Ford Ka 1.0 12V 3cc*:\n\n• *OEM Ford:* E3BG6K288AA\n• *Dayco:* BIO001 (Belt in Oil)\n• *Gates:* 5680XS\n\n⚠️ *Aviso importante:* Utilize exclusivamente óleo 5W20 WSS-M2C948-B para proteger a correia.\n✅ Produto original certificado!`,
  },
];

function normalizeText(str: string): string {
  return (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function hasWordToken(haystackNorm: string, tokenRaw: string): boolean {
  const token = normalizeText(tokenRaw);
  if (!token) return false;
  const regex = new RegExp(`(?:^|\\s)${escapeRegex(token)}(?:$|\\s)`);
  return regex.test(haystackNorm);
}

export function findOfflinePart(
  part: string,
  model: string,
  engine?: string,
  notes?: string,
  year?: string,
  transmission?: string
): OfflinePartRecord | null {
  const pNorm = normalizeText(part);
  const modelOnlyNorm = normalizeText(model);
  const fullContextNorm = normalizeText(`${model} ${year || ''} ${engine || ''} ${transmission || ''} ${notes || ''}`);

  const userWantsSemAr =
    /\b(sem ar|s ar|sem ac)\b/.test(fullContextNorm);
  const userWantsComAr =
    /\b(com ar|c ar|com ac|ar condicionado)\b/.test(fullContextNorm) && !userWantsSemAr;
  const userWantsAutomatic =
    /\b(automatico|automatica|cvt|tiptronic|easytronic)\b/.test(fullContextNorm);
  const userWantsManual =
    /\b(manual|mecanico)\b/.test(fullContextNorm) && !userWantsAutomatic;

  const yearMatch = (year || '').match(/\b(19\d{2}|20\d{2})\b/);
  const parsedYear = yearMatch ? parseInt(yearMatch[1], 10) : null;

  let bestMatch: OfflinePartRecord | null = null;
  let highestScore = 0;

  for (const record of OFFLINE_CATALOG) {
    // 1. Strict Part Keyword Match
    let partMatches = 0;
    for (const kw of record.partKeywords) {
      if (hasWordToken(pNorm, kw) || pNorm.includes(normalizeText(kw))) {
        partMatches++;
      }
    }
    if (partMatches === 0) continue;

    // Prevent cross-part mismatch (e.g. disco de embreagem vs pastilha de freio)
    if (pNorm.includes('radiador') && !record.partKeywords.some((k) => normalizeText(k).includes('radiador'))) {
      continue;
    }

    // 2. Strict Model Name Word-Boundary Match (ONLY against vehicleKeywords on the model field)
    let modelMatches = 0;
    for (const kw of record.vehicleKeywords) {
      if (hasWordToken(modelOnlyNorm, kw)) {
        modelMatches++;
      }
    }
    if (modelMatches === 0) continue;

    // 3. AC Compatibility Check
    if (record.requiresAc === false && userWantsComAr) continue;
    if (record.requiresAc === true && userWantsSemAr) continue;

    // 4. Transmission Compatibility Check
    if (record.requiresTransmission === 'manual' && userWantsAutomatic) continue;
    if (record.requiresTransmission === 'automatico' && userWantsManual) continue;

    // 5. Year Range Check (allow +/- 1 year tolerance for model-year transitions)
    if (parsedYear && record.yearRange) {
      const [minY, maxY] = record.yearRange;
      if (parsedYear < minY - 1 || parsedYear > maxY + 1) continue;
    }

    // 6. Variant Scoring Bonus
    let variantScore = 0;
    if (record.variantKeywords) {
      for (const vkw of record.variantKeywords) {
        if (hasWordToken(fullContextNorm, vkw)) {
          variantScore += vkw.includes(' ') ? 4 : 2;
        }
      }
    }
    if (record.requiresAc === false && userWantsSemAr) variantScore += 10;
    if (record.requiresAc === true && userWantsComAr) variantScore += 10;
    if (record.requiresTransmission === 'manual' && userWantsManual) variantScore += 5;

    const score = partMatches * 4 + modelMatches * 10 + variantScore;
    if (score > highestScore) {
      highestScore = score;
      bestMatch = record;
    }
  }

  return bestMatch;
}


