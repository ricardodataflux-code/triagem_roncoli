// Linha de Catálogo e Marcas Homologadas para Autopeças
// Base oficial estrita para pesquisas, sugestões aftermarket e cotações

export interface BrandRule {
  brand: string;
  category: string;
  products: string[];
  description: string;
  tier: '1ª Linha' | '2ª Linha' | '3ª Linha';
  verdictBadge: 'Melhor em Qualidade' | 'Melhor Custo-Benefício' | 'Melhor em Durabilidade' | 'Opção Econômica';
}

export interface CategoryCatalog {
  categoryName: string;
  iconName: string;
  brands: BrandRule[];
}

export const OFFICIAL_CATALOG_CATEGORIES: CategoryCatalog[] = [
  {
    categoryName: 'Transmissão, Embreagem e Suspensão',
    iconName: 'Wrench',
    brands: [
      {
        brand: 'LUK',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Kits de embreagem',
          'Platôs',
          'Discos de embreagem',
          'Atuadores hidráulicos',
          'Volantes de motor (bifásicos/rígidos)',
          'Bombas de direção hidráulica',
        ],
        description: 'Líder mundial em embreagens originais de montadora (RepSet).',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'Valeo',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Kits de embreagem',
          'Palhetas de limpador de para-brisa',
          'Radiadores',
        ],
        description: 'Fornecedora global de embreagens, climatização e palhetas.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'Sachs',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Kits de embreagem',
          'Platôs',
          'Discos de embreagem',
          'Rolamentos de embreagem',
        ],
        description: 'Tradição e resistência alemã em conjuntos de embreagem.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'Nakata',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Amortecedores',
          'Pivôs de suspensão',
          'Barras de direção',
          'Terminais de direção e axial',
          'Juntas homocinéticas',
          'Eixos',
          'Cubos de roda',
        ],
        description: 'Líder em suspensão e direção no mercado de reposição brasileiro.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'Monroe',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Amortecedores automotivos (Monroe OESpectrum / Monro-Matic)',
          'Pivôs',
          'Bandejas de suspensão',
          'Buchas de suspensão (Monroe Axios)',
        ],
        description: 'Referência mundial em absorção de impacto e conforto veicular.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'COFAP',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Amortecedores (Turbogás / Super)',
          'Molas helicoidais',
          'Bandejas de suspensão',
          'Juntas homocinéticas',
          'Cubos de roda',
          'Kits de reparo de suspensão (batente, coifa, coxim)',
        ],
        description: 'Líder absoluta de vendas de amortecedores e molas no Brasil.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'KYB',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Amortecedores hidráulicos e a gás (Excel-G)',
          'Molas helicoidais (K-Flex)',
          'Componentes de montagem de suspensão (kits amortecedores)',
        ],
        description: 'Fornecedora japonesa de amortecedores de altíssima precisão.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'ZF AFTERMARKET',
        category: 'Transmissão, Embreagem e Suspensão',
        products: [
          'Sistemas de direção e transmissão',
          'Eixos',
          'Componentes de suspensão e freios (consolida marcas Sachs, Lemförder e TRW)',
        ],
        description: 'Engenharia de precisão e fornecimento OEM para veículos leves e pesados.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
    ],
  },
  {
    categoryName: 'Motor, Arrefecimento e Climatização',
    iconName: 'Cpu',
    brands: [
      {
        brand: 'MAHLE',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Pistões',
          'Anéis de segmento',
          'Bronzinas (biela/mancal)',
          'Camisas de cilindro',
          'Válvulas de admissão e escape',
          'Tuchos de válvula',
          'Filtros (óleo, ar, combustível, cabine)',
          'Turbocompressores',
        ],
        description: 'Padrão ouro em força interna de motores e filtragem OEM.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'THOMSON (MTE-THOMSON)',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Sensores de temperatura',
          'Plugues eletrônicos',
          'Válvulas termostáticas',
          'Sensores MAP/MAF',
          'Sensores de detonação',
          'Sensor de velocidade',
          'Sensor de rotação',
          'Sensor de painel',
          'Sensor de partida a frio',
          'Cebolão do radiador (interruptor térmico)',
          'Interruptor de partida a frio',
          'Interruptor de ar quente',
          'Sonda lambda (sensores de oxigênio)',
        ],
        description: 'Especialista consagrada em controle de temperatura e gerenciamento eletrônico.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'VISCONDE',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Radiadores de arrefecimento',
          'Palhetas de limpador',
        ],
        description: 'Tradicional fabricante brasileira de radiadores e troca térmica.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'VALCLEI',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Válvulas termostáticas',
          'Tubos de refrigeração (canos de água)',
          'Flanges de água',
          'Conexões de água',
          'Reservatórios de expansão e tampas',
          'Carcaças de termostato',
          'Conectores e cotovelos plásticos/metálicos',
        ],
        description: 'Referência em sistema de arrefecimento e linhas completas de carcaças e tubos.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'URBA',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Bombas de água para motores de linha leve',
        ],
        description: 'Líder e pioneira em bombas de água automotivas no Brasil (Grupo Brosol/Urba).',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'SCHADEK',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Bombas de óleo',
          'Bombas de combustível mecânicas',
          'Bombas de água',
          'Componentes internos de motor',
          'Kits de engrenagem de bomba de óleo',
        ],
        description: 'Especialista em lubrificação e bombeamento mecânico de alta pressão.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'BROSOL',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Bombas de combustível (mecânicas e elétricas)',
          'Carburadores e kits de reparo',
          'Componentes de alimentação de combustível',
          'Bombas de vácuo',
          'Gicleurs',
          'Agulhas de carburador',
          'Válvulas 3 vias',
          'Boias de carburador',
          'Diafragmas',
          'Servo freio',
        ],
        description: 'Pioneira em alimentação de combustível e carburadores originais.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'FLORIO',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Reservatórios de expansão de água',
          'Tampas de reservatório de expansão (pressurizadas)',
          'Reservatórios de partida a frio e lavador',
        ],
        description: 'Especialista em termoplásticos de alta resistência para arrefecimento.',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'IGUAÇU',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Válvulas termostáticas',
          'Interruptores térmicos',
          'Sensores de temperatura',
          'Flanges e conexões de água',
          'Carcaças de válvula termostática',
          'Cebolão do radiador',
        ],
        description: 'Linha completa e confiável em componentes de arrefecimento e temperatura.',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
      },
      {
        brand: 'WAHLER',
        category: 'Motor, Arrefecimento e Climatização',
        products: [
          'Válvulas termostáticas',
          'Interruptores térmicos',
          'Tubos de refrigeração',
          'Sensores de temperatura',
          'Carcaça da válvula termostática',
          'Cebolão do radiador',
        ],
        description: 'Tecnologia BorgWarner em termostatos e termogerenciamento original de montadora.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
    ],
  },
  {
    categoryName: 'Correias, Mangueiras e Borrachas',
    iconName: 'Zap',
    brands: [
      {
        brand: 'CONTINENTAL (Contitech)',
        category: 'Correias, Mangueiras e Borrachas',
        products: [
          'Correias sincronizadoras (dentadas)',
          'Correias em V',
          'Correias Poly-V / Multi-V',
          'Tensionadores e polias tensoras',
          'Kits de distribuição completos (correia + tensor)',
        ],
        description: 'Engenharia alemã de ponta em acionamento e correias de alta durabilidade.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'DAYCO',
        category: 'Correias, Mangueiras e Borrachas',
        products: [
          'Correias automotivas (dentadas e de acessórios)',
          'Tensionadores e roletes guia',
          'Polias e dampers de virabrequim',
          'Mangueiras de radiador moldadas',
        ],
        description: 'Fornecedora OEM de correias e sistemas de sincronismo no Brasil.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'GATES',
        category: 'Correias, Mangueiras e Borrachas',
        products: [
          'Correias sincronizadoras',
          'Correias Micro-V',
          'Tensionadores e tensionadores automáticos',
          'Mangueiras extrudadas e moldadas (arrefecimento, combustível, ar)',
        ],
        description: 'Líder global em transmissão de potência e mangueiras reforçadas.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'JAHU',
        category: 'Correias, Mangueiras e Borrachas',
        products: [
          'Borrachas de vedação (portas, janelas, porta-malas)',
          'Mangueiras de água e arrefecimento',
          'Coxins de motor e câmbio',
          'Buchas de suspensão',
          'Canaletas e pestanas',
          'Grampos e fixadores plásticos de acabamento',
        ],
        description: 'Maior portfólio de borrachas automotivas, guarnições e fixações do Brasil.',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'NOVO KIT',
        category: 'Correias, Mangueiras e Borrachas',
        products: [
          'Kits de reparo de suspensão',
          'Coifas de homocinética (roda e câmbio)',
          'Batentes e coifas de amortecedor',
          'Amortecedores pressurizados de porta-malas/capô',
          'Buchas e coxins',
        ],
        description: 'Especialista em kits de proteção para amortecedores e semi-eixos.',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
      },
      {
        brand: 'JAMAICA',
        category: 'Correias, Mangueiras e Borrachas',
        products: [
          'Mangueiras automotivas de alta e baixa pressão',
          'Mangueiras de arrefecimento e radiador',
          'Mangueiras de ar quente',
          'Mangueiras de filtro de ar',
          'Mangueiras de combustível',
          'Tubos e conexões de silicone',
        ],
        description: 'Tradição na fabricação de mangueiras com tramas reforçadas.',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
    ],
  },
  {
    categoryName: 'Sistema Elétrico, Ignição e Injeção',
    iconName: 'Zap',
    brands: [
      {
        brand: 'Bosch',
        category: 'Sistema Elétrico, Ignição e Injeção',
        products: [
          'Sistemas de injeção eletrônica (bicos injetores, bombas de combustível elétricas)',
          'Velas e cabos de ignição',
          'Sensores automotivos (pressão, rotação, temperatura)',
          'Palhetas de limpador (Aerotwin)',
          'Motores de partida e alternadores',
          'Tampa de distribuição e rotor',
          'Sensor de nível de combustível',
          'Servo freio',
          'Condensador do distribuidor',
          'Sonda lambda (sensores de oxigênio)',
          'Corpo de borboleta (TBI)',
          'Válvula do cânister (purga)',
        ],
        description: 'Gigante mundial e inventora dos principais sistemas de injeção e ignição.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'NGK (Niterra / NTK)',
        category: 'Sistema Elétrico, Ignição e Injeção',
        products: [
          'Velas de ignição (G-Power, Iridium IX, Laser Platinum)',
          'Cabos de ignição (jogos resistivos)',
          'Bobinas de ignição individuais e múltiplas',
          'Velas aquecedoras (motores diesel)',
          'Sensores de oxigênio (Sonda Lambda marca NTK)',
        ],
        description: 'Líder absoluta e preferência unânime em ignição automotiva no Brasil.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'DS',
        category: 'Sistema Elétrico, Ignição e Injeção',
        products: [
          'Componentes de injeção eletrônica',
          'Medidores de combustível e sensores de nível',
          'Reguladores de pressão de combustível',
          'Sensores MAP',
          'Sensores de velocidade',
          'Atuadores de marcha lenta (IAC)',
          'Módulos e refis de bomba de combustível',
        ],
        description: 'Especialista em sensores e componentes finos de injeção no mercado de reposição.',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'TSA',
        category: 'Sistema Elétrico, Ignição e Injeção',
        products: [
          'Sensores de nível de combustível (boias de tanque)',
          'Módulos de combustível e copos',
          'Flanges de bomba de combustível',
          'Sensores de pressão e temperatura',
        ],
        description: 'Líder brasileira na fabricação de sensores de nível de tanque.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'MAGNETI MARELLI',
        category: 'Sistema Elétrico, Ignição e Injeção',
        products: [
          'Sistemas de injeção eletrônica (bicos, centrais ECU)',
          'Corpos de borboleta (TBI motorizados/mecânicos)',
          'Módulos eletrônicos',
          'Alternadores e motores de arranque',
          'Faróis e lanternas',
          'Amortecedores (divisão Cofap)',
          'Componentes de motor',
        ],
        description: 'Fornecedora original de grandes montadoras com excelência tecnológica.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
    ],
  },
  {
    categoryName: 'Rolamentos e Componentes de Roda',
    iconName: 'Wrench',
    brands: [
      {
        brand: 'SKF',
        category: 'Rolamentos e Componentes de Roda',
        products: [
          'Rolamentos de roda (gerações 1, 2 e 3 com ABS/magnético)',
          'Cubos de roda com rolamento integrado',
          'Rolamentos e atuadores de embreagem',
          'Tensionadores de correia',
          'Bombas de água',
          'Juntas homocinéticas',
          'Graxas industriais e automotivas de alto desempenho',
        ],
        description: 'Referência mundial absoluta em rolamentos de precisão e cubos.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'IMA',
        category: 'Rolamentos e Componentes de Roda',
        products: [
          'Cubos de roda',
          'Juntas homocinéticas (fixas e deslizantes)',
          'Semieixos completos',
          'Tulipas de câmbio',
          'Trizetas',
          'Rolamentos automotivos',
        ],
        description: 'Especialista consagrada em transmissão de torque, tulipas e cubos.',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'VETOR',
        category: 'Rolamentos e Componentes de Roda',
        products: [
          'Juntas homocinéticas',
          'Cubos de roda',
          'Rolamentos de roda e alternador',
          'Bombas de água',
          'Palhetas de limpador',
          'Bobinas de ignição',
          'Lâmpadas automotivas',
          'Buzinas',
        ],
        description: 'Ampla linha de rolamentos, transmissão e componentes eletromecânicos.',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
      },
      {
        brand: 'NK (Nakata / Outros)',
        category: 'Rolamentos e Componentes de Roda',
        products: [
          'Rolamentos de roda',
          'Cubos de roda',
          'Juntas homocinéticas',
          'Componentes de suspensão e direção',
        ],
        description: 'Segurança mecânica e tolerâncias dimensionais exatas para reposição.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
    ],
  },
  {
    categoryName: 'Freios',
    iconName: 'AlertCircle',
    brands: [
      {
        brand: 'COBREQ',
        category: 'Freios',
        products: [
          'Pastilhas de freio dianteiras e traseiras',
          'Lonas de freio',
          'Sapatas de freio com lona colada/rebitada',
          'Fluidos de freio (DOT 3, DOT 4, DOT 5.1)',
        ],
        description: 'Líder em materiais de fricção original no Brasil, equipando as principais montadoras.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
      {
        brand: 'SYL',
        category: 'Freios',
        products: [
          'Pastilhas de freio para veículos leves e pesados',
          'Sapatas de freio com kit de molas',
        ],
        description: 'Consagrada no mercado de reposição com alto giro e ótimo custo por quilômetro.',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
      },
      {
        brand: 'TECPADS',
        category: 'Freios',
        products: [
          'Pastilhas de freio convencionais e cerâmica',
          'Pastilhas de alta performance para veículos leves e utilitários',
        ],
        description: 'Materiais de atrito modernos com baixo desprendimento de pó e ruído zero.',
        tier: '2ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
    ],
  },
  {
    categoryName: 'Filtros, Vedação e Outros',
    iconName: 'Sliders',
    brands: [
      {
        brand: 'TECFIL',
        category: 'Filtros, Vedação e Outros',
        products: [
          'Filtros de óleo lubrificante (blindados e refil)',
          'Filtros de ar do motor',
          'Filtros de combustível',
          'Filtros de cabine / ar-condicionado',
          'Filtros ecológicos',
        ],
        description: 'Maior fabricante de filtros automotivos da América Latina.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'SABO',
        category: 'Filtros, Vedação e Outros',
        products: [
          'Retentores de virabrequim, comando e câmbio',
          'Juntas de motor e cabeçote',
          'Coifas e juntas homocinéticas',
          'Selos mecânicos e anéis de vedação',
          'Sistemas completos de vedação automotiva',
        ],
        description: 'Fornecedora mundial de sistemas de vedação para quase todas as montadoras.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'TARANTO',
        category: 'Filtros, Vedação e Outros',
        products: [
          'Juntas de cabeçote (aço multilâminas MLS e fibra)',
          'Jogos completos de juntas de motor',
          'Parafusos de cabeçote',
          'Retentores de válvulas e eixos',
          'Kits de embreagem e componentes de motor',
        ],
        description: 'Alta engenharia e precisão em juntas de vedação e parafusos de cabeçote.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'DISAUTO',
        category: 'Filtros, Vedação e Outros',
        products: [
          'Distribuidora de autopeças multimarcas (itens de motor, freio, suspensão e elétrica)',
        ],
        description: 'Distribuição e logística ágil de ampla gama de autopeças multimarcas.',
        tier: '2ª Linha',
        verdictBadge: 'Opção Econômica',
      },
      {
        brand: 'FAMA',
        category: 'Filtros, Vedação e Outros',
        products: [
          'Molas helicoidais para suspensão dianteira e traseira',
          'Feixes de molas para veículos leves, utilitários e pesados',
        ],
        description: 'Especialista tradicional em molas e feixes de mola reforçados.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
      },
      {
        brand: 'FANIA',
        category: 'Filtros, Vedação e Outros',
        products: [
          'Cabos de comando mecânico',
          'Cabos de embreagem',
          'Cabos de acelerador',
          'Cabos de freio de mão (estacionamento)',
          'Cabos de velocímetro',
          'Cabos de abertura de capô e portas',
        ],
        description: 'Líder absoluta em cabos de comando para a frota brasileira.',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
      },
      {
        brand: 'DPL',
        category: 'Filtros, Vedação e Outros',
        products: [
          'Componentes elétricos e eletrônicos',
          'Chicotes automotivos e soquetes',
          'Sensores diversos',
          'Interruptores de pressão de óleo e freio',
          'Relés automotivos',
        ],
        description: 'Especialista em conectores, chicotes de reparo e componentes elétricos de reposição.',
        tier: '2ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
      },
    ],
  },
];

// Texto formatado para injeção mandatória no prompt da IA
export const OFFICIAL_BRAND_CATALOG_GUIDE_TEXT = `
DIRETRIZ MANDATÓRIA DE MARCAS E LINHAS DE CATÁLOGO (ESTRITAMENTE OBRIGATÓRIA):
Você DEVE respeitar e priorizar com precisão absoluta as marcas e as suas respectivas linhas de produtos homologadas abaixo. NUNCA atribua a uma marca uma peça que ela não fabrica ou que esteja fora do seu escopo oficial:

1. TRANSMISSÃO, EMBREAGEM E SUSPENSÃO:
• LUK: Kits de embreagem, platôs, discos, atuadores hidráulicos, volantes de motor (bifásicos/rígidos) e bombas de direção hidráulica.
• Valeo: Kits de embreagem, palhetas de limpador de para-brisa, radiadores.
• Sachs: Kits de embreagem, platôs, discos, rolamentos de embreagem.
• Nakata: Componentes de suspensão e direção (amortecedores, pivôs, barras de direção, terminais, juntas homocinéticas, eixos, cubos de roda).
• Monroe: Amortecedores automotivos: pivôs, bandejas e buchas de suspensão.
• COFAP: Amortecedores, molas helicoidais, bandejas de suspensão, juntas homocinéticas, cubos de roda e kits de reparo de suspensão.
• KYB: Amortecedores hidráulicos e a gás, molas helicoidais e componentes de montagem de suspensão (kits amortecedores).
• ZF AFTERMARKET: Sistemas de direção e transmissão, eixos, componentes de suspensão e freios (consolida marcas como Sachs, Lemförder e TRW).

2. MOTOR, ARREFECIMENTO E CLIMATIZAÇÃO:
• MAHLE: Componentes internos de motor (pistões, anéis de segmento, bronzinas, camisas de cilindro, válvulas, tucho, anéis), filtros (óleo, ar, combustível, cabine) e turbocompressores.
• THOMSON (MTE-THOMSON): Sensores de temperatura, plugues térmicos, válvulas termostáticas, sensores MAP/MAF e sensores de detonação, sensor de velocidade, sensor de rotação, sensor painel, sensor de partida a frio, cebolão radiador, interruptor de partida a frio, interruptor de ar quente, sonda lambda.
• VISCONDE: Radiadores de arrefecimento, palhetas.
• VALCLEI: Válvulas termostáticas, tubos de refrigeração, flanges, conexões de água, reservatórios de expansão e tampas, carcaças de termostato, conectores.
• URBA: Bombas de água para motores de linhas leve.
• SCHADEK: Bombas de óleo, bombas de combustível mecânicas, bombas de água e componentes de motor, kit engrenagem.
• BROSOL: Bombas de combustível (mecânicas e elétricas), carburadores, componentes de alimentação e bombas de vácuo, gicleur, agulha carburador, válvula 3 vias, boia carburador, diafragma, servo freio.
• FLORIO: Reservatórios de expansão, tampas de reservatório.
• IGUAÇU: Componentes de arrefecimento (válvulas termostáticas, interruptores térmicos, sensores de temperatura e flanges, carcaça, sensor temperatura, cebolão radiador), carcaça válvula termostática.
• WAHLER: Válvulas termostáticas, interruptores térmicos e tubos de refrigeração (marca integrada ao grupo BorgWarner), sensor temperatura, carcaça da válvula termostática, cebolão radiador.

3. CORREIAS, MANGUEIRAS E BORRACHAS:
• CONTINENTAL: Correias sincronizadoras (dentadas), correias em V, correias Poly-V, tensionadores, polias.
• DAYCO: Correias automotivas (dentadas, acessórias), tensionadores, polias, dampers e mangueiras de radiador.
• GATES: Correias sincronizadoras, correias Micro-V, tensionadores, mangueiras extrudadas e moldadas (arrefecimento, combustível, ar).
• JAHU: Borrachas de vedação (portas, janelas, porta-malas), mangueiras, coxins, buchas, canaletas, grampos e fixadores de acabamento.
• NOVO KIT: Kits de reparo de suspensão, coifas de homocinética, batentes, amortecedores de porta-malas e buchas.
• JAMAICA: Mangueiras automotivas de alta e baixa pressão (arrefecimento, ar quente, filtros, combustível e silicone).

4. SISTEMA ELÉTRICO, IGNIÇÃO E INJEÇÃO:
• Bosch: Sistemas de injeção eletrônica (bicos, bombas de combustível), velas e cabos de ignição, sensores, palhetas, motores de partida, tampa de distribuição, sensor de nível, servo freio, condensador do distribuidor, sonda lambda, corpo de borboleta, válvula cânister.
• NGK: Velas de ignição, cabos de ignição, bobinas de ignição, velas aquecedoras e sensores de oxigênio (sob a marca NTK).
• DS: Componentes de injeção eletrônica (medidores de combustível, reguladores de pressão, sensores MAP, sensores de velocidade, atuadores de marcha lenta e módulos de bomba).
• TSA: Sensores de nível de combustível (boias de tanque), módulos de combustível, flanges e sensores de pressão.
• MAGNETI MARELLI: Sistemas de injeção, corpos de borboleta (TBI), módulos eletrônicos, alternadores, faróis, lanternas, amortecedores (Cofap) e componentes de motor.

5. ROLAMENTOS E COMPONENTES DE RODA:
• SKF: Rolamentos de roda, cubos de roda, rolamentos de embreagem, tensionadores de correia, bombas de água, juntas homocinéticas e graxas industriais/automotivas.
• IMA: Cubos de roda, juntas homocinéticas, semieixos, tulipas, trizetas e rolamentos automotivos.
• VETOR: Juntas homocinéticas, cubos de roda, rolamentos, bombas de água, palhetas, bobinas, lâmpadas e buzinas.
• NK (Nakata/Outros): Rolamentos, cubos de roda, juntas homocinéticas e componentes de suspensão.

6. FREIOS:
• SYL: Pastilhas de freio e sapatas de freio para linhas leve e pesada.
• COBREQ: Pastilhas de freio, lonas de freio, sapatas de freio e fluidos de freio para carros, motos e pesados.
• TECPADS: Pastilhas de freio de alta performance e convencionais para veículos leves.

7. FILTROS, VEDAÇÃO E OUTROS:
• TECFIL: Filtros automotivos (filtros de óleo, de ar, de combustível, de cabine/ar-condicionado e filtros ecológicos).
• SABO: Retentores, juntas de motor, juntas homocinéticas, selos mecânicos e sistemas de vedação automotiva.
• TARANTO: Juntas de cabeçote e de motor, parafusos de cabeçote, retentores, embreagens e componentes de motor.
• DISAUTO: Distribuidora de autopeças (distribuição multimarcas de itens de motor, freio e suspensão).
• FAMA: Molas helicoidais e feixes de molas para suspensão de veículos leves e pesados.
• FANIA: Cabos de comando (cabos de embreagem, acelerador, freio de mão, velocímetro, capô e abertura de portas).
• DPL: Componentes elétricos e eletrônicos, chicotes automotivos, sensores, interruptores de pressão e relés.
`;
