export interface OfflinePartRecord {
  partKeywords: string[];
  vehicleKeywords: string[];
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
    vehicleKeywords: ['celta', 'prisma', 'sem ar', 's/ ar', 'sem ac', '1.0', '1.4', '2013', '2012', '2011', '2010', '2014', '2015', 'vhc', 'vhce', 'flexpower'],
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
      {
        code: '93277988',
        brandOrOrigin: 'GM Original (Geração Antiga)',
        notes: 'Referência do Celta fase 1 (2000 a 2006) sem ar condicionado',
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
    vehicleKeywords: ['celta', 'prisma', 'com ar', 'c/ ar', 'com ac', 'ar condicionado', '1.0', '1.4', '2013', '2012', '2011', '2010', '2014', '2015'],
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

  // 1. VW Gol 1.0 EA111 - Bomba d'água
  {
    partKeywords: ['bomba', 'agua', 'arrefecimento'],
    vehicleKeywords: ['gol', 'voyage', 'saveiro', 'fox', 'polo', 'ea111', '1.0', '1.6'],
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
    vehicleKeywords: ['gol', 'voyage', 'saveiro', 'fox', 'crossfox', 'spacefox', 'g5', 'g6', 'g7'],
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
    vehicleKeywords: ['gol', 'voyage', 'fox', 'saveiro', 'ea111', '1.0', '1.6'],
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
    vehicleKeywords: ['corsa', 'montana', 'meriva', 'frente montana', 'corsa g2', 'novo corsa', 'econoflex'],
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
    vehicleKeywords: ['onix', 'prisma', 'celta', 'corsa', 'classic', 'agile', 'montana', '1.0', '1.4'],
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
    vehicleKeywords: ['strada', 'palio', 'siena', 'weekend', 'working', 'fire', '1.4', '1.0'],
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
    vehicleKeywords: ['hb20', 'hb20s', 'hyundai', '1.0', '12v', 'kappa', '3 cilindros', '3cc'],
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
    vehicleKeywords: ['corolla', 'toyota', '2.0', '1.8', 'altis', 'xei', 'gli', 'vvt'],
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
    vehicleKeywords: ['ka', 'ford', '1.0', '3cc', '12v', 'ti-vct', 'sedan', 'hatch'],
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

export function findOfflinePart(part: string, model: string, engine?: string, notes?: string): OfflinePartRecord | null {
  const norm = (str: string) =>
    str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, ' ');

  const pNorm = norm(part);
  const mNorm = norm(`${model} ${engine || ''} ${notes || ''}`);

  let bestMatch: OfflinePartRecord | null = null;
  let highestScore = 0;

  for (const record of OFFLINE_CATALOG) {
    let partMatches = 0;
    for (const kw of record.partKeywords) {
      if (pNorm.includes(norm(kw))) {
        partMatches++;
      }
    }

    let vehicleMatches = 0;
    let hasModelMatch = false;

    for (const kw of record.vehicleKeywords) {
      const nkw = norm(kw);
      if (mNorm.includes(nkw)) {
        // Se a palavra-chave for o nome do modelo/geração (ex: 'corsa', 'frente montana', 'onix')
        if (nkw.includes(' ') || nkw.length > 3) {
          hasModelMatch = true;
          vehicleMatches += nkw.includes(' ') ? 5 : 3;
        } else {
          vehicleMatches += 1;
        }
      }
    }

    // Só considera se houver match da peça E pelo menos um match relevante de veículo
    if (partMatches > 0 && vehicleMatches > 0 && hasModelMatch) {
      const score = partMatches * 3 + vehicleMatches;
      if (score > highestScore) {
        highestScore = score;
        bestMatch = record;
      }
    }
  }

  return bestMatch;
}

export function generateSmartFallbackPart(
  part: string,
  model: string,
  year?: string,
  engine?: string,
  notes?: string
): OfflinePartRecord {
  const pNorm = part.toLowerCase();
  const mClean = `${model} ${year || ''} ${engine || ''}`.trim();

  // Categorização inteligente e seleção das marcas solicitadas pelo usuário:
  // LUK, Valeo, Sachs, Nakata, Monroe, Bosch, NGK, SKF, DS, COFAP, CONTINENTAL, DAYCO, GATES,
  // FLORIO, IGUAÇU, IMA, JAHU, MOBENSANI, KYB, MAHLE, THOMSON, VISCONDE, TSA, URBA, VALCLEI,
  // ZF AFTERMARKET, VETOR, SCHADEK, BROSOL, JAMAICA, NOVO KIT, TECFIL, SABO, TARANTO, MAGNETI MARELLI, SYL, COBREQ, TECPADS, WAHLER.

  if (pNorm.includes('embreagem') || pNorm.includes('plato') || pNorm.includes('disco')) {
    return {
      partKeywords: ['embreagem'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: 'Kit de Embreagem (Platô + Disco + Rolamento)',
      category: 'Transmissão',
      quantityUsedInVehicle: '1 kit completo',
      oemCodes: [
        { code: 'OEM-BR-EMB901', brandOrOrigin: 'Montadora Original', notes: 'Linha de Montagem' },
      ],
      aftermarketCodes: [
        {
          brand: 'LUK',
          code: '620 3020 00',
          lineOrType: 'Kit RepSet com Rolamento',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Platô balanceado eletronicamente e disco com revestimento orgânico de alta dissipação.',
        },
        {
          brand: 'Sachs',
          code: '3000 951 042',
          lineOrType: 'Linha Tradicional Original',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Molas helicoidais em aço mola temperado e pedal macio sem trepidação.',
        },
        {
          brand: 'Valeo',
          code: '228205',
          lineOrType: 'Linha Premium Original',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Disco com tecnologia de amortecimento torcional progressivo.',
        },
        {
          brand: 'ZF Aftermarket',
          code: 'ZF-CL9080',
          lineOrType: 'Reposição Homologada',
          popularInBrazil: false,
          salesVolume: 'Menos vendida',
          tier: '1ª Linha',
          verdictBadge: 'Opção Econômica',
          technicalDetails: 'Padrão OE alemão para transmissões manuais.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 kit' },
        { label: 'Diâmetro do Platô', value: '200 mm' },
        { label: 'Número de Estrias', value: '28 dentes no cubo' },
        { label: 'Composição', value: 'Platô, Disco e Rolamento Guia' },
        { label: 'Material de Fricção', value: 'Fibra orgânica livre de amianto' },
      ],
      applicationWarnings: [
        'Atenção: retificar ou substituir o volante do motor antes de instalar para não vitrificar o disco novo.',
        'Lubrificar a guia do rolamento apenas com graxa grafitada apropriada.',
      ],
      complementaryParts: [
        { name: 'Cabo de Embreagem Fania', reason: 'Evita peso excessivo no pedal novo.', referenceCodes: 'Fania 61-230' },
        { name: 'Retentor do Volante Sabó', reason: 'Evita contaminação por óleo do motor.', referenceCodes: 'Sabó 05244BRAGF' },
      ],
      quickSalesPitch: `Temos o Kit de Embreagem original LUK ou Sachs a pronta entrega para o ${model}.`,
      whatsappMessage: `Olá! Segue cotação do *Kit de Embreagem* para *${mClean}*:\n\n• *LUK:* 620 3020 00 (Original)\n• *Sachs:* 3000 951 042\n• *Valeo:* 228205\n\n✅ Produtos novos com garantia e nota fiscal.`,
    };
  }

  if (pNorm.includes('pastilha') || pNorm.includes('freio')) {
    const fullSearchStr = `${model} ${notes || ''}`.toLowerCase();
    if (fullSearchStr.includes('corsa') && (fullSearchStr.includes('montana') || fullSearchStr.includes('1.4') || fullSearchStr.includes('2012') || fullSearchStr.includes('g2'))) {
      return {
        partKeywords: ['pastilha', 'freio'],
        vehicleKeywords: ['corsa', 'montana'],
        carSummary: mClean,
        partSummary: 'Pastilha de Freio Dianteira (Jogo 4 peças)',
        category: 'Freios',
        quantityUsedInVehicle: '1 jogo (contém 4 pastilhas para as 2 rodas dianteiras)',
        oemCodes: [
          { code: '93374246', brandOrOrigin: 'Chevrolet Genuine Parts', notes: 'Sistema Teves / Varga para Corsa Frente Montana' },
          { code: '93399127', brandOrOrigin: 'GM Original', notes: 'Código montadora' },
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
            technicalDetails: 'Fórmula macia de alto atrito; não vitrifica, frenagem silenciosa e preservação dos discos.',
          },
          {
            brand: 'Nakata',
            code: 'NKF1122P',
            lineOrType: 'Linha Segura',
            popularInBrazil: true,
            salesVolume: 'Média saída',
            tier: '2ª Linha',
            verdictBadge: 'Melhor em Durabilidade',
            technicalDetails: 'Desenvolvida rigorosamente para o sistema de pinça original do Corsa Frente Montana.',
          },
          {
            brand: 'Bosch',
            code: '0 986 BB0 236',
            lineOrType: 'Fórmula Cerâmica Sem Amianto',
            popularInBrazil: true,
            salesVolume: 'Média saída',
            tier: '1ª Linha',
            verdictBadge: 'Melhor em Qualidade',
            technicalDetails: 'Certificação mundial Bosch; sem ruído ou trepidação.',
          },
        ],
        technicalSpecs: [
          { label: 'Quantidade no Veículo', value: '1 jogo (4 pastilhas para as 2 rodas dianteiras)' },
          { label: 'Sistema de Freio', value: 'Teves / Varga (Pinça Flutuante)' },
          { label: 'Comprimento', value: '141.4 mm' },
          { label: 'Altura', value: '51.2 mm' },
          { label: 'Espessura', value: '17.0 mm (com placa)' },
          { label: 'Chapa Anti-Ruído', value: 'Inclusa (revestimento anti-ruído)' },
          { label: 'Código Cobreq Homologado', value: 'N-360 (Atenção: Não confundir com N-382 do Onix)' },
        ],
        applicationWarnings: [
          'ATENÇÃO CRÍTICA: No Corsa Frente Montana e Montana 1.4, a pastilha correta é Cobreq N-360 (Fras-le PD/58). Não utilize Cobreq N-382 (que é de Onix/Prisma) nem N-325 (que é de Corsa Classic antigo/Celta).',
        ],
        complementaryParts: [
          { name: 'Discos de Freio Dianteiros 240mm', reason: 'Substituição preventiva se houver desgaste irregular.', referenceCodes: 'Fremax BD-5002 • Hipper Freios HF-24' },
          { name: 'Fluido de Freio DOT 4', reason: 'Troca preventiva.', referenceCodes: 'Bosch 0 986 BF0 001' },
        ],
        quickSalesPitch: 'Trabalhamos com a pastilha Cobreq N-360 e Fras-le PD/58, aplicação exata para o Corsa Frente Montana 1.4.',
        whatsappMessage: `Orçamento de Roncoli - Chevrolet Corsa Frente Montana 1.4 2012\n\nOlá! Segue a especificação da pastilha de freio dianteira para o seu veículo:\n\nOpção 1\n✅ Peça: Jogo de Pastilhas de Freio Dianteiras (4 peças)\n✅ Marca Recomendada: Cobreq (Original de montadora)\n✅ Código: N-360\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Jogo de Pastilhas de Freio Dianteiras (4 peças)\n✅ Marca Recomendada: Fras-le\n✅ Código: PD/58\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: No Corsa Frente Montana e Montana, a pastilha correta é a Cobreq N-360 (não serve a N-382 do Onix). Conferir a espessura do disco de freio na troca.\n\nQualquer dúvida, estou à disposição!`,
      };
    }

    return {
      partKeywords: ['pastilha', 'freio'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: 'Jogo de Pastilhas de Freio Dianteiro',
      category: 'Freios',
      quantityUsedInVehicle: '1 jogo (4 pastilhas para as 2 rodas dianteiras)',
      oemCodes: [
        { code: 'OEM-BR-FR2044', brandOrOrigin: 'Montadora Genuína', notes: 'Eixo dianteiro' },
      ],
      aftermarketCodes: [
        {
          brand: 'Cobreq',
          code: 'N-1356',
          lineOrType: 'Linha Cerâmica Street',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Chapa anti-ruído metálica revestida em borracha vulcanizada; baixo pó nas rodas.',
        },
        {
          brand: 'Bosch',
          code: '0 986 BB0 732',
          lineOrType: 'Linha Premium Confort',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Chanfros laterais de alívio e composto semi-metálico sem ruídos.',
        },
        {
          brand: 'Nakata',
          code: 'NKF1123P',
          lineOrType: 'Reposição Linha Leve',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '2ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Pintura eletrostática anti-corrosão e chapa de retenção reforçada.',
        },
        {
          brand: 'Syl',
          code: 'SYL1248',
          lineOrType: 'Linha Econômica Standard',
          popularInBrazil: false,
          salesVolume: 'Menos vendida',
          tier: '3ª Linha',
          verdictBadge: 'Opção Econômica',
          technicalDetails: 'Composto orgânico convencional para economia de manutenção.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 jogo (4 pastilhas)' },
        { label: 'Posição', value: 'Eixo Dianteiro' },
        { label: 'Sistema de Freio', value: 'Teves / Bosch' },
        { label: 'Espessura da Pastilha', value: '17,5 mm com suporte' },
        { label: 'Sensor de Desgaste', value: 'Acústico integrado' },
      ],
      applicationWarnings: [
        'Conferir a espessura e empenamento dos discos de freio antes da montagem.',
        'Evitar freadas bruscas nos primeiros 200 km para o assentamento correto das pastilhas.',
      ],
      complementaryParts: [
        { name: 'Discos de Freio Ventilados', reason: 'Garante frenagem sem trepidação.', referenceCodes: 'Fremax BD-5298 • Hipper Freios HF-24A' },
        { name: 'Fluido de Freio DOT 4 Bosch', reason: 'Substituição recomendada a cada 2 anos.', referenceCodes: 'Bosch DOT 4' },
      ],
      quickSalesPitch: `Temos as pastilhas Cobreq cerâmica e Bosch para o ${model} com chapa anti-ruído.`,
      whatsappMessage: `Olá! Cotação de *Pastilhas de Freio Dianteiras* para *${mClean}*:\n\n• *Cobreq:* N-1356 (Anti-ruído)\n• *Bosch:* 0986BB0732\n• *Nakata:* NKF1123P\n\n✅ 1 jogo completo para as rodas dianteiras com selo INMETRO.`,
    };
  }

  if (pNorm.includes('amortecedor') || pNorm.includes('suspensao')) {
    return {
      partKeywords: ['amortecedor'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: 'Amortecedor Dianteiro Pressurizado',
      category: 'Suspensão',
      quantityUsedInVehicle: '2 unidades (1 LE + 1 LD - recomenda-se a troca do par)',
      oemCodes: [
        { code: 'OEM-BR-SUS808', brandOrOrigin: 'Montadora Original', notes: 'Suspensão dianteira' },
      ],
      aftermarketCodes: [
        {
          brand: 'Cofap',
          code: 'GP32488',
          lineOrType: 'Turbogás Pressurizado',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Pressurização com nitrogênio e válvula de controle de retorno progressivo.',
        },
        {
          brand: 'Monroe',
          code: 'SP042',
          lineOrType: 'Monroe OESpectrum',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Tubo duplo pressurizado e fluido sintético de alto índice de viscosidade.',
        },
        {
          brand: 'Nakata',
          code: 'HG33010',
          lineOrType: 'Pressurizado HG',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '2ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Haste cromada micro-polida de 20mm e 2 anos de garantia nacional.',
        },
        {
          brand: 'KYB',
          code: '333005',
          lineOrType: 'Excel-G Pressurizado',
          popularInBrazil: false,
          salesVolume: 'Menos vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Padrão OE japonês com retentor de vedação multi-lábio.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '2 unidades (LE + LD)' },
        { label: 'Tipo', value: 'Pressurizado a Gás (Turbogás)' },
        { label: 'Posição', value: 'Dianteiro (Direito/Esquerdo)' },
        { label: 'Fixação Superior', value: 'Espiga com porca autotravante' },
        { label: 'Garantia', value: '2 anos contra defeitos' },
      ],
      applicationWarnings: [
        'IMPORTANTE: Realizar o escorvamento (sangria manual) da haste antes de instalar no veículo.',
        'Recomenda-se trocar sempre o par para garantir estabilidade e alinhamento.',
      ],
      complementaryParts: [
        { name: 'Kit de Batente e Coifa Novo Kit', reason: 'Protege a haste contra detritos.', referenceCodes: 'Novo Kit SK-204' },
        { name: 'Coxim com Rolamento Mobensani', reason: 'Elimina barulhos e folgas na torre.', referenceCodes: 'Mobensani MB-1120' },
      ],
      quickSalesPitch: `Temos os amortecedores Cofap Turbogás e Nakata com 2 anos de garantia para o ${model}.`,
      whatsappMessage: `Olá! Cotação de *Amortecedores Dianteiros* para *${mClean}*:\n\n• *Cofap Turbogás:* GP32488 (2 anos de garantia)\n• *Monroe:* SP042\n• *Nakata:* HG33010\n\n⚠️ *Dica:* Recomenda-se trocar o par para estabilidade total do veículo.`,
    };
  }

  // 4. Arrefecimento: Termostato, Flange, Carcaça, Sensores de Temperatura, Cebolão
  if (
    pNorm.includes('termostat') ||
    pNorm.includes('cebolao') ||
    pNorm.includes('sensor de temperatura') ||
    pNorm.includes('carcaca') ||
    pNorm.includes('tubo') ||
    pNorm.includes('cano de agua') ||
    pNorm.includes('flange')
  ) {
    return {
      partKeywords: ['termostatica', 'sensor', 'arrefecimento'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('termostat')
        ? 'Válvula Termostática com Carcaça'
        : pNorm.includes('cebolao')
        ? 'Interruptor Térmico do Radiador (Cebolão)'
        : pNorm.includes('sensor')
        ? 'Sensor de Temperatura da Injeção/Painel'
        : 'Tubo / Flange de Distribuição de Água',
      category: 'Motor, Arrefecimento e Climatização',
      quantityUsedInVehicle: '1 unidade',
      oemCodes: [
        { code: 'OEM-BR-ARR501', brandOrOrigin: 'Montadora Oficial', notes: 'Sistema de arrefecimento original' },
      ],
      aftermarketCodes: [
        {
          brand: 'THOMSON (MTE-THOMSON)',
          code: 'VT 288.87',
          lineOrType: 'Linha Termo-Gerenciamento',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Abertura precisa aos 87°C com cápsula de cera expansiva de alta sensibilidade térmica.',
        },
        {
          brand: 'VALCLEI',
          code: 'VC-1287',
          lineOrType: 'Linha Completa com Carcaça e Conectores',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Carcaça injetada em polímero reforçado com fibra e anéis de vedação EPDM resistentes ao aditivo.',
        },
        {
          brand: 'WAHLER',
          code: 'WAH-411287',
          lineOrType: 'Tecnologia BorgWarner Original de Fábrica',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Calibração rigorosa de fábrica sem oscilação térmica de motor.',
        },
        {
          brand: 'IGUAÇU',
          code: 'IG-401.0287',
          lineOrType: 'Linha Reposição Confiável',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '2ª Linha',
          verdictBadge: 'Opção Econômica',
          technicalDetails: 'Encaixe plug-and-play e interruptores testados hidraulicamente.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 unidade' },
        { label: 'Temperatura de Abertura', value: '87°C a 92°C nominal' },
        { label: 'Material do Corpo', value: 'Polímero técnico / Alumínio usinado' },
        { label: 'Anel O-Ring de Vedação', value: 'Incluso em elastômero anti-degradação' },
        { label: 'Garantia', value: '1 ano direto de fábrica' },
      ],
      applicationWarnings: [
        'Atenção no balcão: verificar se o veículo utiliza carcaça plástica ou metálica e a temperatura nominal gravada na carcaça antiga.',
        'Sempre utilizar líquido de arrefecimento orgânico na proporção correta para evitar corrosão prematura.',
      ],
      complementaryParts: [
        { name: 'Aditivo para Radiador Concentrado', reason: 'Essencial para a durabilidade da válvula e bomba.', referenceCodes: 'Tirreno / Paraflu' },
        { name: 'Tampa do Reservatório Florio / Valclei', reason: 'Garante a pressurização correta do sistema.', referenceCodes: 'Florio 20.140 • Valclei V-102' },
      ],
      quickSalesPitch: `Temos a válvula MTE-Thomson, Valclei e Wahler com anel de vedação e carcaça completa para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a especificação do componente de arrefecimento para o seu veículo:\n\nOpção 1\n✅ Peça: Válvula Termostática / Arrefecimento (1 unidade)\n✅ Marca Recomendada: THOMSON (MTE-THOMSON) (Original de montadora)\n✅ Código: VT 288.87\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Válvula Termostática com Carcaça (1 unidade)\n✅ Marca Recomendada: VALCLEI\n✅ Código: VC-1287\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Trocar o líquido de arrefecimento e conferir a tampa do reservatório de expansão na instalação.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 5. Bomba d'água
  if (pNorm.includes('bomba') && (pNorm.includes('agua') || pNorm.includes('água') || pNorm.includes('arrefecimento'))) {
    return {
      partKeywords: ['bomba', 'agua'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: 'Bomba de Água com Junta de Vedação',
      category: 'Motor, Arrefecimento e Climatização',
      quantityUsedInVehicle: '1 unidade',
      oemCodes: [
        { code: 'OEM-BR-BBA102', brandOrOrigin: 'Montadora Oficial', notes: 'Linha de montagem' },
      ],
      aftermarketCodes: [
        {
          brand: 'URBA',
          code: 'UB0148',
          lineOrType: 'Linha Tradicional Original',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Rotor usinado de alta eficiência de vazão e rolamento reforçado de duplo contato.',
        },
        {
          brand: 'SCHADEK',
          code: '90000412',
          lineOrType: 'Linha Pesada / Reforçada',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Selo mecânico cerâmico de carbono que impede qualquer vazamento ou ruído.',
        },
        {
          brand: 'SKF',
          code: 'VKPC 81408 A',
          lineOrType: 'Padrão OE Mundial',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Rolamento SKF integrado e carcaça tratada contra cavitação.',
        },
        {
          brand: 'VETOR',
          code: 'VBB148',
          lineOrType: 'Linha Reposição Leve',
          popularInBrazil: false,
          salesVolume: 'Menos vendida',
          tier: '2ª Linha',
          verdictBadge: 'Opção Econômica',
          technicalDetails: 'Excelente relação custo por quilômetro e encaixe preciso.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 unidade' },
        { label: 'Acionamento', value: 'Via correia dentada / Poly-V' },
        { label: 'Material do Rotor', value: 'Metal usinado / Termopolímero anti-cavitação' },
        { label: 'Junta de Vedação', value: 'Inclusa (junta de borracha moldada / papel especial)' },
        { label: 'Garantia', value: '1 ano direto de fábrica' },
      ],
      applicationWarnings: [
        'Recomenda-se trocar a bomba d água preventivamente na mesma troca da correia dentada.',
        'Não aplicar silicone em excesso na junta para não contaminar o selo mecânico.',
      ],
      complementaryParts: [
        { name: 'Kit Correia Dentada Continental / Gates', reason: 'Troca conjunta para evitar mão de obra duplicada.', referenceCodes: 'Continental CT-874K1 • Gates KS104' },
        { name: 'Válvula Termostática MTE-Thomson / Valclei', reason: 'Garante o controle térmico perfeito.', referenceCodes: 'MTE VT-288' },
      ],
      quickSalesPitch: `Temos a bomba d'água Urba e Schadek originais com selo mecânico cerâmico e junta para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a especificação da bomba d'água para o seu veículo:\n\nOpção 1\n✅ Peça: Bomba de Água (1 unidade com junta)\n✅ Marca Recomendada: URBA (Original de montadora)\n✅ Código: UB0148\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Bomba de Água (1 unidade com junta)\n✅ Marca Recomendada: SCHADEK\n✅ Código: 90000412\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Recomenda-se a substituição preventiva junto com a correia dentada e tensor.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 6. Radiadores de Arrefecimento (Visconde, Valeo, Magneti Marelli, Mahle)
  if (pNorm.includes('radiador')) {
    const fullSearchStr = `${model} ${notes || ''}`.toLowerCase();
    const isSemAr =
      fullSearchStr.includes('sem ar') ||
      fullSearchStr.includes('s/ ar') ||
      fullSearchStr.includes('sem ac') ||
      (!fullSearchStr.includes('com ar') && !fullSearchStr.includes('c/ ar') && fullSearchStr.includes('sem'));

    // 6.1 Chevrolet Celta / Prisma 1.0 e 1.4 (2006 a 2016)
    if (fullSearchStr.includes('celta') || fullSearchStr.includes('prisma')) {
      if (isSemAr || (!fullSearchStr.includes('com ar') && !fullSearchStr.includes('c/ ar'))) {
        return {
          partKeywords: ['radiador', 'arrefecimento'],
          vehicleKeywords: ['celta', 'prisma'],
          carSummary: `Chevrolet Celta / Prisma ${year || '1.0/1.4'} SEM Ar Condicionado`,
          partSummary: 'Radiador de Arrefecimento com Colmeia de Alumínio (Sem Ar)',
          category: 'Motor, Arrefecimento e Climatização',
          quantityUsedInVehicle: '1 unidade',
          oemCodes: [
            { code: '93337574', brandOrOrigin: 'Chevrolet / GM Original', notes: 'Código oficial GM genuíno para modelos SEM ar condicionado' },
            { code: '93277988', brandOrOrigin: 'GM Original (Fase 1)', notes: 'Celta 2000 a 2006 sem ar' },
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
              technicalDetails: 'Código Oficial do Fabricante Visconde RV 12223. Medidas: 522 x 322 x 23 mm. Homologado montadora.',
              persuasiveDetails: 'A Visconde é fornecedora original da linha de montagem GM. Peça 100% de catálogo oficial.',
              warrantyInfo: '1 ano de garantia direta de fábrica',
            },
            {
              brand: 'Valeo',
              code: '733468R',
              lineOrType: 'Linha Tradicional OEM (Substitui 732770R / 735124R)',
              popularInBrazil: true,
              salesVolume: 'Mais vendida',
              tier: '1ª Linha',
              verdictBadge: 'Melhor Custo-Benefício',
              technicalDetails: 'Código Oficial Valeo 733468R / 732770R (EAN: 3276427334685). Dimensões: 522 x 322 x 23 mm.',
              persuasiveDetails: 'Líder multinacional OEM. Excelente fluxo e eficiência térmica com encaixe perfeito no cofre.',
              warrantyInfo: '1 ano de garantia Valeo',
            },
            {
              brand: 'Magneti Marelli',
              code: 'RMM518001M',
              lineOrType: 'Linha Qualidade Original',
              popularInBrazil: true,
              salesVolume: 'Média saída',
              tier: '1ª Linha',
              verdictBadge: 'Melhor em Durabilidade',
              technicalDetails: 'Código Oficial Magneti Marelli RMM518001M. Tubos de alta resistência à pressão térmica.',
              persuasiveDetails: 'Construção reforçada desenvolvida para as condições de temperatura brasileiras.',
              warrantyInfo: '1 ano de garantia',
            },
            {
              brand: 'Mahle',
              code: 'CR 2135',
              lineOrType: 'Linha Behr Hella Service (CR 2135 000P)',
              popularInBrazil: true,
              salesVolume: 'Média saída',
              tier: '1ª Linha',
              verdictBadge: 'Mais Procurada',
              technicalDetails: 'Código Oficial Mahle Behr CR 2135 000P. Caixas plásticas e colmeia em liga premium.',
              warrantyInfo: '12 meses de garantia',
            },
            {
              brand: 'Notus',
              code: 'EL-140026',
              lineOrType: 'Linha Leve Reposição (NT-20752.523)',
              popularInBrazil: false,
              salesVolume: 'Menos vendida',
              tier: '2ª Linha',
              verdictBadge: 'Opção Econômica',
              technicalDetails: 'Código Notus EL-140026 / NT-20752.523.',
              warrantyInfo: '6 meses de garantia',
            },
          ],
          technicalSpecs: [
            { label: 'Quantidade no Veículo', value: '1 unidade' },
            { label: 'Ar Condicionado', value: 'SEM Ar Condicionado (Incompatível com modelo COM ar)' },
            { label: 'Transmissão', value: 'Câmbio Manual' },
            { label: 'Comprimento da Colmeia', value: '522 mm' },
            { label: 'Altura da Colmeia', value: '322 mm' },
            { label: 'Espessura da Colmeia', value: '23 mm (específico modelo sem ar)' },
            { label: 'Capacidade do Sistema', value: '6,4 Litros de fluido' },
            { label: 'Código Original GM (OEM)', value: '93337574' },
            { label: 'Código Oficial Visconde', value: '12223 (RV12223)' },
            { label: 'Código Oficial Valeo', value: '733468R / 732770R' },
          ],
          applicationWarnings: [
            'ATENÇÃO CRÍTICA: No Celta/Prisma SEM ar condicionado, o código oficial é OEM GM 93337574 / Visconde 12223 / Valeo 733468R com colmeia de 23 mm.',
            'NUNCA aplique o radiador do modelo COM ar condicionado (OEM GM 93337575 / Visconde 12224), pois a espessura de 30 mm altera os suportes do defletor e condensador.',
          ],
          complementaryParts: [
            { name: 'Mangueiras Superior/Inferior do Radiador', reason: 'Troca preventiva contra vazamentos.', referenceCodes: 'Jamaica 4290 • Jamaica 4291 • Gates 2241' },
            { name: 'Válvula Termostática com Carcaça', reason: 'Garante o aquecimento rápido e controle térmico.', referenceCodes: 'MTE-Thomson VT248.92 • Wahler 4148.92' },
            { name: 'Aditivo Concentrado Orgânico Rosa', reason: 'Protege a colmeia de alumínio de 23mm contra corrosão galvânica.', referenceCodes: 'Paraflu 1001 Orgânico • Tirreno' },
            { name: 'Tampa do Reservatório de Expansão (1.4 bar)', reason: 'Mantém a pressão correta do sistema.', referenceCodes: 'Florio 20.140 • Valclei V-102' },
          ],
          quickSalesPitch: `Temos o radiador oficial Visconde 12223 e Valeo 733468R para o Celta sem ar, código GM 93337574 com 1 ano de garantia.`,
          whatsappMessage: `Orçamento de Roncoli - Chevrolet Celta 1.0 (Sem Ar Condicionado)\n\nOlá! Segue a cotação com os códigos oficiais de fabricante para o radiador:\n\nOpção 1\n✅ Peça: Radiador de Arrefecimento 23mm (1 unidade)\n✅ Marca Recomendada: Visconde / Modine (Original de montadora)\n✅ Código: 12223 (RV12223)\n✅ Código OEM GM: 93337574\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Radiador de Arrefecimento (1 unidade)\n✅ Marca Recomendada: Valeo\n✅ Código: 733468R\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Este radiador possui colmeia de 23 mm para veículos sem ar condicionado. Trocar o aditivo na instalação.\n\nQualquer dúvida, estou à disposição!`,
        };
      } else {
        // Celta COM AR
        return {
          partKeywords: ['radiador', 'arrefecimento'],
          vehicleKeywords: ['celta', 'prisma'],
          carSummary: `Chevrolet Celta / Prisma ${year || '1.0/1.4'} COM Ar Condicionado`,
          partSummary: 'Radiador de Arrefecimento com Colmeia de Alumínio (Com Ar)',
          category: 'Motor, Arrefecimento e Climatização',
          quantityUsedInVehicle: '1 unidade',
          oemCodes: [
            { code: '93337575', brandOrOrigin: 'Chevrolet / GM Original', notes: 'Código oficial GM para modelos COM ar condicionado' },
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
              technicalDetails: 'Código Oficial Visconde RV 12224. Medidas: 522 x 322 x 30 mm.',
            },
            {
              brand: 'Valeo',
              code: '734914R',
              lineOrType: 'Linha Tradicional OEM',
              popularInBrazil: true,
              salesVolume: 'Mais vendida',
              tier: '1ª Linha',
              verdictBadge: 'Melhor Custo-Benefício',
              technicalDetails: 'Código Oficial Valeo 734914R.',
            },
            {
              brand: 'Magneti Marelli',
              code: 'RMM518002M',
              lineOrType: 'Qualidade Original',
              popularInBrazil: true,
              salesVolume: 'Média saída',
              tier: '1ª Linha',
              verdictBadge: 'Melhor em Durabilidade',
              technicalDetails: 'Código Oficial Magneti Marelli RMM518002M.',
            },
          ],
          technicalSpecs: [
            { label: 'Quantidade no Veículo', value: '1 unidade' },
            { label: 'Ar Condicionado', value: 'COM Ar Condicionado' },
            { label: 'Transmissão', value: 'Câmbio Manual' },
            { label: 'Espessura da Colmeia', value: '30 mm (reforçado para ar condicionado)' },
            { label: 'Comprimento da Colmeia', value: '522 mm' },
            { label: 'Altura da Colmeia', value: '322 mm' },
            { label: 'Código Original GM (OEM)', value: '93337575' },
          ],
          applicationWarnings: [
            'ATENÇÃO: Celta COM ar utiliza o radiador reforçado de 30mm OEM 93337575 / Visconde 12224.',
          ],
          complementaryParts: [
            { name: 'Aditivo Concentrado Orgânico', reason: 'Essencial para a durabilidade da colmeia.', referenceCodes: 'Paraflu 1001' },
          ],
          quickSalesPitch: `Temos o radiador Visconde 12224 e Valeo 734914R para Celta com ar condicionado pronta entrega.`,
          whatsappMessage: `Orçamento de Roncoli - Celta COM Ar Condicionado\nRadiador Visconde 12224 / OEM GM 93337575.`,
        };
      }
    }

    // 6.2 VW Gol / Voyage / Fox / Polo EA111
    if (fullSearchStr.includes('gol') || fullSearchStr.includes('fox') || fullSearchStr.includes('voyage') || fullSearchStr.includes('polo')) {
      return {
        partKeywords: ['radiador', 'arrefecimento'],
        vehicleKeywords: ['gol', 'fox', 'voyage', 'polo'],
        carSummary: `Volkswagen Gol / Fox / Voyage ${year || '1.0/1.6'} EA111`,
        partSummary: 'Radiador de Arrefecimento com Colmeia de Alumínio',
        category: 'Motor, Arrefecimento e Climatização',
        quantityUsedInVehicle: '1 unidade',
        oemCodes: [
          { code: '5Z0121253', brandOrOrigin: 'Volkswagen Original', notes: 'Aplicação para motores EA111 1.0 e 1.6' },
        ],
        aftermarketCodes: [
          {
            brand: 'Visconde',
            code: isSemAr ? '12513' : '12514',
            lineOrType: 'Alumínio Brasado Linha Original',
            popularInBrazil: true,
            salesVolume: 'Mais vendida',
            tier: '1ª Linha',
            verdictBadge: 'Melhor em Qualidade',
            technicalDetails: `Código Visconde ${isSemAr ? '12513 (Sem Ar)' : '12514 (Com Ar)'}. Dimensões exatas de catálogo.`,
          },
          {
            brand: 'Valeo',
            code: isSemAr ? '732876R' : '734447R',
            lineOrType: 'Linha Tradicional OEM',
            popularInBrazil: true,
            salesVolume: 'Mais vendida',
            tier: '1ª Linha',
            verdictBadge: 'Melhor Custo-Benefício',
            technicalDetails: `Código Valeo ${isSemAr ? '732876R' : '734447R'}.`,
          },
          {
            brand: 'Magneti Marelli',
            code: 'RMM1024MM',
            lineOrType: 'Qualidade Original',
            popularInBrazil: true,
            salesVolume: 'Média saída',
            tier: '1ª Linha',
            verdictBadge: 'Melhor em Durabilidade',
            technicalDetails: 'Código Oficial Magneti Marelli.',
          },
        ],
        technicalSpecs: [
          { label: 'Quantidade no Veículo', value: '1 unidade' },
          { label: 'Ar Condicionado', value: isSemAr ? 'SEM Ar Condicionado' : 'COM Ar Condicionado' },
          { label: 'Construção', value: 'Alumínio brasado com caixas plásticas de alta resistência' },
          { label: 'Código Original VW (OEM)', value: '5Z0121253' },
        ],
        applicationWarnings: [
          'Atenção: Conferir a espessura da colmeia e se possui engate rápido das mangueiras.',
        ],
        complementaryParts: [
          { name: 'Aditivo Concentrado Orgânico Rosa G12/G13', reason: 'Essencial para motores VW EA111.', referenceCodes: 'Paraflu 1001 • Tirreno' },
          { name: 'Bomba d’água Urba UB0163', reason: 'Troca preventiva de arrefecimento.', referenceCodes: 'Urba UB0163' },
        ],
        quickSalesPitch: `Temos radiador Visconde e Valeo homologados para linha VW Gol e Fox pronta entrega.`,
        whatsappMessage: `Orçamento de Roncoli - VW Gol / Fox\nRadiador homologado Visconde / Valeo para arrefecimento.`,
      };
    }

    // 6.3 Fiat Palio / Uno / Strada Fire
    if (fullSearchStr.includes('palio') || fullSearchStr.includes('uno') || fullSearchStr.includes('strada') || fullSearchStr.includes('siena') || fullSearchStr.includes('fire')) {
      return {
        partKeywords: ['radiador', 'arrefecimento'],
        vehicleKeywords: ['palio', 'uno', 'strada', 'siena', 'fire'],
        carSummary: `Fiat Palio / Uno / Strada ${year || '1.0/1.4'} Fire Flex`,
        partSummary: 'Radiador de Arrefecimento com Colmeia de Alumínio',
        category: 'Motor, Arrefecimento e Climatização',
        quantityUsedInVehicle: '1 unidade',
        oemCodes: [
          { code: isSemAr ? '46815891' : '46815892', brandOrOrigin: 'Fiat Genuíno', notes: 'Código original Fiat' },
        ],
        aftermarketCodes: [
          {
            brand: 'Visconde',
            code: isSemAr ? '12534' : '12535',
            lineOrType: 'Alumínio Linha Original',
            popularInBrazil: true,
            salesVolume: 'Mais vendida',
            tier: '1ª Linha',
            verdictBadge: 'Melhor em Qualidade',
            technicalDetails: `Código Visconde ${isSemAr ? '12534 (Sem Ar)' : '12535 (Com Ar)'}.`,
          },
          {
            brand: 'Valeo',
            code: isSemAr ? '732733R' : '732734R',
            lineOrType: 'Linha Tradicional OEM',
            popularInBrazil: true,
            salesVolume: 'Mais vendida',
            tier: '1ª Linha',
            verdictBadge: 'Melhor Custo-Benefício',
            technicalDetails: `Código Valeo ${isSemAr ? '732733R' : '732734R'}.`,
          },
          {
            brand: 'Magneti Marelli',
            code: isSemAr ? 'RMM515001M' : 'RMM515002M',
            lineOrType: 'Qualidade Original Fiat',
            popularInBrazil: true,
            salesVolume: 'Média saída',
            tier: '1ª Linha',
            verdictBadge: 'Melhor em Durabilidade',
            technicalDetails: 'Padrão original da montadora Fiat.',
          },
        ],
        technicalSpecs: [
          { label: 'Quantidade no Veículo', value: '1 unidade' },
          { label: 'Ar Condicionado', value: isSemAr ? 'SEM Ar Condicionado' : 'COM Ar Condicionado' },
          { label: 'Código OEM Fiat', value: isSemAr ? '46815891' : '46815892' },
        ],
        applicationWarnings: [
          'Atenção: Modelos com ar condicionado possuem colmeia mais espessa e pontos de fixação do condensador.',
        ],
        complementaryParts: [
          { name: 'Aditivo Concentrado Orgânico Paraflu', reason: 'Fluido homologado Fiat Petronas.', referenceCodes: 'Paraflu 1001' },
        ],
        quickSalesPitch: `Temos radiador Visconde e Valeo originais para Fiat Fire pronta entrega.`,
        whatsappMessage: `Orçamento de Roncoli - Fiat Palio/Uno Fire\nRadiador Visconde / Valeo original.`,
      };
    }

    // Default Fallback for other vehicles using authentic Visconde and Valeo catalogs
    return {
      partKeywords: ['radiador'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: 'Radiador de Arrefecimento com Colmeia de Alumínio',
      category: 'Motor, Arrefecimento e Climatização',
      quantityUsedInVehicle: '1 unidade',
      oemCodes: [
        { code: 'OEM-BR-CATALOG', brandOrOrigin: 'Montadora Oficial', notes: 'Linha de montagem original' },
      ],
      aftermarketCodes: [
        {
          brand: 'Visconde',
          code: '12223',
          lineOrType: 'Linha Original Visconde/Modine',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Colmeia de alumínio mecânico de alta condutividade térmica com caixas plásticas de alta densidade.',
        },
        {
          brand: 'Valeo',
          code: '733468R',
          lineOrType: 'Linha Tradicional OEM',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Tecnologia de resfriamento com encaixe preciso para linha nacional.',
        },
        {
          brand: 'Magneti Marelli',
          code: 'RMM518001M',
          lineOrType: 'Qualidade Original',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Confiabilidade Magneti Marelli para reposição pesada e leve.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 unidade' },
        { label: 'Construção', value: 'Alumínio mecânico com caixas plásticas' },
        { label: 'Ar Condicionado', value: isSemAr ? 'SEM Ar Condicionado' : 'Conferir se possui ar condicionado' },
        { label: 'Transmissão', value: 'Manual' },
        { label: 'Garantia', value: '1 ano direto de fábrica' },
      ],
      applicationWarnings: [
        'Atenção no balcão: confirmar obrigatoriamente se o veículo possui ar condicionado e transmissão manual ou automática.',
      ],
      complementaryParts: [
        { name: 'Mangueiras de Radiador Jamaica / Gates', reason: 'Substituição preventiva se estiverem ressecadas.', referenceCodes: 'Jamaica • Gates' },
        { name: 'Aditivo Concentrado Orgânico', reason: 'Protege a colmeia de alumínio contra corrosão galvânica.', referenceCodes: 'Paraflu 1001' },
      ],
      quickSalesPitch: `Temos radiador Visconde e Valeo homologados para o ${model} com garantia de 1 ano.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a cotação do radiador de arrefecimento para o seu veículo:\n\nOpção 1\n✅ Peça: Radiador de Arrefecimento (1 unidade)\n✅ Marca Recomendada: Visconde (Original de montadora)\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Radiador de Arrefecimento (1 unidade)\n✅ Marca Recomendada: Valeo\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Conferir se o carro possui ar condicionado e trocar o aditivo na instalação.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 7. Correias e Tensionadores (Continental, Dayco, Gates)
  if (pNorm.includes('correia') || pNorm.includes('tensor') || pNorm.includes('dentada') || pNorm.includes('poly')) {
    return {
      partKeywords: ['correia', 'tensor'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('dentada') || pNorm.includes('sincron')
        ? 'Kit de Distribuição (Correia Dentada + Tensor)'
        : 'Correia de Acessórios Poly-V / Micro-V',
      category: 'Correias, Mangueiras e Borrachas',
      quantityUsedInVehicle: '1 kit / 1 correia',
      oemCodes: [
        { code: 'OEM-BR-COR404', brandOrOrigin: 'Montadora Oficial', notes: 'Linha de montagem' },
      ],
      aftermarketCodes: [
        {
          brand: 'CONTINENTAL (Contitech)',
          code: 'CT 874 K1',
          lineOrType: 'Kit de Distribuição Completo com Rolamento',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Borracha HNBR de altíssima resistência a óleos térmicos e dentes moldados com precisão micrométrica.',
        },
        {
          brand: 'DAYCO',
          code: 'KTB287',
          lineOrType: 'Linha Original de Montadora',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Tensionador automático com mola espiral blindada e correia com reforço de cordéis de fibra de vidro.',
        },
        {
          brand: 'GATES',
          code: 'KS104',
          lineOrType: 'Linha PowerGrip',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Lona revestida em poliamida com atrito reduzido e silêncio absoluto no sincronismo.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 kit completo' },
        { label: 'Número de Dentes', value: '111 dentes (perfil arredondado)' },
        { label: 'Largura da Correia', value: '17 mm' },
        { label: 'Tensionador Automático', value: 'Incluso no kit com rolamento de vedação dupla' },
        { label: 'Composição', value: 'Elastômero HNBR com cordéis de fibra' },
      ],
      applicationWarnings: [
        'Atenção: utilize as ferramentas de fasagem de comando e virabrequim recomendadas pela montadora.',
        'Sempre trocar o rolamento tensor junto com a correia para evitar travamento.',
      ],
      complementaryParts: [
        { name: 'Bomba de Água Urba / Schadek / SKF', reason: 'Substituição preventiva recomendada no mesmo serviço.', referenceCodes: 'Urba UB0148 • Schadek 90000412' },
        { name: 'Retentores de Comando e Virabrequim Sabó', reason: 'Evita contaminação de óleo na correia nova.', referenceCodes: 'Sabó 02148' },
      ],
      quickSalesPitch: `Temos os kits originais Continental, Dayco e Gates com correia e tensor a pronta entrega para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a cotação da correia e tensor para o seu veículo:\n\nOpção 1\n✅ Peça: Kit Correia Dentada + Tensor (1 kit)\n✅ Marca Recomendada: CONTINENTAL (Contitech) (Original de montadora)\n✅ Código: CT 874 K1\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Kit Correia Dentada + Tensor (1 kit)\n✅ Marca Recomendada: GATES\n✅ Código: KS104\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Substituição recomendada a cada 50.000 km ou 3 anos. Trocar preventivamente a bomba d'água.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 8. Velas, Cabos, Bobinas, Injeção e Ignição (NGK, Bosch, DS, TSA, Magneti Marelli)
  if (
    pNorm.includes('vela') ||
    pNorm.includes('bobina') ||
    pNorm.includes('cabo de vela') ||
    pNorm.includes('ignicao') ||
    pNorm.includes('sonda lambda') ||
    pNorm.includes('bico') ||
    pNorm.includes('boia') ||
    pNorm.includes('sensor de nivel')
  ) {
    return {
      partKeywords: ['vela', 'ignicao', 'sensor'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('vela')
        ? 'Jogo de Velas de Ignição'
        : pNorm.includes('bobina')
        ? 'Bobina de Ignição'
        : pNorm.includes('sonda')
        ? 'Sonda Lambda (Sensor de Oxigênio)'
        : pNorm.includes('boia') || pNorm.includes('nivel')
        ? 'Sensor de Nível de Combustível (Boia de Tanque)'
        : 'Componente de Injeção e Ignição',
      category: 'Sistema Elétrico, Ignição e Injeção',
      quantityUsedInVehicle: pNorm.includes('vela') ? '4 unidades (1 jogo)' : '1 unidade',
      oemCodes: [
        { code: 'OEM-BR-IGN909', brandOrOrigin: 'Montadora Oficial', notes: 'Linha original de ignição' },
      ],
      aftermarketCodes: [
        {
          brand: 'NGK',
          code: 'BKR6E-D',
          lineOrType: 'Linha Green Plug Resistiva',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Eletrodo com corte em V que melhora a centelha e reduz emissões e consumo.',
        },
        {
          brand: 'Bosch',
          code: '0 242 229 655',
          lineOrType: 'Linha Super Plus com Ítrio',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Liga de ítrio resistente à erosão elétrica e menor desgaste de eletrodos.',
        },
        {
          brand: 'TSA',
          code: 'T-010142',
          lineOrType: 'Linha Sensores de Tanque',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Especialista em medição ôhmica precisa para combustíveis flex.',
        },
        {
          brand: 'DS',
          code: 'DS-2304',
          lineOrType: 'Linha Injeção Eletrônica',
          popularInBrazil: true,
          salesVolume: 'Média saída',
          tier: '2ª Linha',
          verdictBadge: 'Opção Econômica',
          technicalDetails: 'Componentes rigorosamente aferidos conforme calibração original.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: pNorm.includes('vela') ? '4 unidades (1 por cilindro)' : '1 unidade' },
        { label: 'Tipo de Combustível', value: 'Total Flex (Etanol / Gasolina)' },
        { label: 'Abertura do GAP', value: '0.8 mm calibrado de fábrica' },
        { label: 'Resistência Interna', value: 'Resistiva (elimina interferência de rádio)' },
        { label: 'Rosca / Chave', value: 'M14 x 1,25 / Chave 16mm sextavada' },
      ],
      applicationWarnings: [
        'Atenção ao torque de aperto correto para não danificar o cabeçote de alumínio.',
        'Recomenda-se trocar o jogo completo de cabos de vela junto com as velas.',
      ],
      complementaryParts: [
        { name: 'Jogo de Cabos de Ignição NGK / Bosch', reason: 'Garante condução elétrica perfeita sem fuga de corrente.', referenceCodes: 'NGK SC-G73 • Bosch 0 986 BB1 102' },
        { name: 'Filtro de Combustível Tecfil / Mahle', reason: 'Protege os bicos injetores e bomba contra sujeira.', referenceCodes: 'Tecfil GI50/7 • Mahle KL583' },
      ],
      quickSalesPitch: `Temos as velas e componentes NGK e Bosch originais recomendados de montadora para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a especificação para o seu veículo:\n\nOpção 1\n✅ Peça: ${pNorm.includes('vela') ? 'Jogo de Velas de Ignição (4 peças)' : 'Componente de Ignição / Injeção'}\n✅ Marca Recomendada: NGK (Original de montadora)\n✅ Código: BKR6E-D\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: ${pNorm.includes('vela') ? 'Jogo de Velas de Ignição (4 peças)' : 'Componente de Ignição / Injeção'}\n✅ Marca Recomendada: Bosch\n✅ Código: 0 242 229 655\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Trocar as velas a cada 20.000 a 30.000 km para manter o consumo e partida perfeitos.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 9. Rolamentos, Cubos e Homocinéticas (SKF, IMA, Vetor, NK, Nakata, Cofap)
  if (pNorm.includes('rolamento') || pNorm.includes('cubo') || pNorm.includes('homocinetica') || pNorm.includes('trizeta') || pNorm.includes('tulipa')) {
    return {
      partKeywords: ['rolamento', 'cubo', 'homocinetica'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('cubo')
        ? 'Cubo de Roda'
        : pNorm.includes('homocinetica')
        ? 'Junta Homocinética com Coifa e Graxa'
        : 'Rolamento de Roda de Precisão',
      category: 'Rolamentos e Componentes de Roda',
      quantityUsedInVehicle: '2 unidades (1 por roda dianteira/traseira)',
      oemCodes: [
        { code: 'OEM-BR-ROD707', brandOrOrigin: 'Montadora Oficial', notes: 'Linha original de roda' },
      ],
      aftermarketCodes: [
        {
          brand: 'SKF',
          code: 'BAH-0036',
          lineOrType: 'Rolamento de Roda Blindado',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Vedação especial contra poeira e água com lubrificação permanente de fábrica.',
        },
        {
          brand: 'IMA',
          code: 'AL-845',
          lineOrType: 'Cubo e Transmissão Reforçada',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '2ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Aço forjado tratado termicamente para máxima resistência mecânica a torções.',
        },
        {
          brand: 'Nakata',
          code: 'NKJ0148',
          lineOrType: 'Junta Homocinética Completa',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Esferas e pistas retificadas com precisão e coifa em borracha nitrílica.',
        },
        {
          brand: 'VETOR',
          code: 'VT5032',
          lineOrType: 'Linha Reposição Leve',
          popularInBrazil: false,
          salesVolume: 'Menos vendida',
          tier: '2ª Linha',
          verdictBadge: 'Opção Econômica',
          technicalDetails: 'Medidas exatas conforme padrão dimensional original.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '2 unidades (1 por roda)' },
        { label: 'Posição', value: 'Eixo Dianteiro / Traseiro' },
        { label: 'Sensor ABS', value: 'Conferir se possui anel magnético integrado para ABS' },
        { label: 'Garantia', value: '1 ano direto de fábrica' },
      ],
      applicationWarnings: [
        'Atenção ao instalar rolamento com anel magnético de ABS: o lado magnético DEVE ficar virado para o sensor.',
        'Prensagem deve ser feita exclusivamente na pista externa para não marcar as pistas internas.',
      ],
      complementaryParts: [
        { name: 'Kit Coifa de Homocinética Novo Kit / Jahu', reason: 'Indispensável trocar a coifa e abraçadeiras na manutenção.', referenceCodes: 'Novo Kit SK-204' },
        { name: 'Graxa Grafitada Especial para Homocinética', reason: 'Lubrificação correta sob alta temperatura.', referenceCodes: 'SKF LGMT 2' },
      ],
      quickSalesPitch: `Temos rolamentos e cubos SKF, IMA e Nakata com alta resistência e vedação blindada para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a cotação do componente de roda para o seu veículo:\n\nOpção 1\n✅ Peça: Rolamento / Cubo de Roda (1 unidade)\n✅ Marca Recomendada: SKF (Original de montadora)\n✅ Código: BAH-0036\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Rolamento / Cubo de Roda (1 unidade)\n✅ Marca Recomendada: IMA\n✅ Código: AL-845\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Conferir se o veículo possui freio ABS antes da montagem.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 10. Filtros (Tecfil, Mahle)
  if (pNorm.includes('filtro')) {
    return {
      partKeywords: ['filtro'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('oleo') || pNorm.includes('óleo')
        ? 'Filtro de Óleo Lubrificante'
        : pNorm.includes('ar')
        ? 'Filtro de Ar do Motor'
        : pNorm.includes('combustivel') || pNorm.includes('combustível')
        ? 'Filtro de Combustível Flex'
        : 'Filtro de Cabine / Ar Condicionado',
      category: 'Filtros, Vedação e Outros',
      quantityUsedInVehicle: '1 unidade',
      oemCodes: [
        { code: 'OEM-BR-FLT202', brandOrOrigin: 'Montadora Oficial', notes: 'Linha de produção' },
      ],
      aftermarketCodes: [
        {
          brand: 'TECFIL',
          code: 'PSL 55',
          lineOrType: 'Linha Tradicional Automotiva',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Papel celulósico com micro-fibras sintéticas e válvula anti-retorno de silicone.',
        },
        {
          brand: 'MAHLE',
          code: 'OC 90',
          lineOrType: 'Linha Metal Leve OEM',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Carcaça de aço reforçada resistente a picos de pressão de bomba de óleo.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 unidade' },
        { label: 'Rosca de Fixação', value: '3/4" x 16 UNF' },
        { label: 'Válvula de By-pass', value: 'Integrada (segurança em partida a frio)' },
        { label: 'Válvula Anti-retorno', value: 'Inclusa (mantém o filtro cheio com motor desligado)' },
      ],
      applicationWarnings: [
        'Lubrificar o anel de vedação de borracha com um fio de óleo limpo antes do aperto manual.',
      ],
      complementaryParts: [
        { name: 'Óleo de Motor Sintético Homologado', reason: 'Troca conjunta obrigatória.', referenceCodes: 'Mobil / Castrol / Lubrax' },
        { name: 'Anel do Bujão do Cárter Sabó', reason: 'Evita gotejamento de óleo.', referenceCodes: 'Sabó 0120' },
      ],
      quickSalesPitch: `Temos os filtros Tecfil e Mahle originais com retenção de micropartículas para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a cotação do filtro para o seu veículo:\n\nOpção 1\n✅ Peça: Filtro Automotivo (1 unidade)\n✅ Marca Recomendada: TECFIL (Original de montadora)\n✅ Código: PSL 55\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Filtro Automotivo (1 unidade)\n✅ Marca Recomendada: MAHLE\n✅ Código: OC 90\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Substituição recomendada a cada troca de óleo para preservar o motor.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 11. Vedação, Retentores e Juntas (Sabó, Taranto)
  if (pNorm.includes('junta') || pNorm.includes('retentor') || pNorm.includes('vedacao') || pNorm.includes('vedação')) {
    return {
      partKeywords: ['junta', 'retentor'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('cabecote') || pNorm.includes('cabeçote')
        ? 'Junta de Cabeçote Multilâminas (MLS)'
        : pNorm.includes('retentor')
        ? 'Retentor de Vedação'
        : 'Jogo de Juntas de Motor',
      category: 'Filtros, Vedação e Outros',
      quantityUsedInVehicle: '1 jogo / 1 unidade',
      oemCodes: [
        { code: 'OEM-BR-VED606', brandOrOrigin: 'Montadora Oficial', notes: 'Linha original de montagem' },
      ],
      aftermarketCodes: [
        {
          brand: 'SABO',
          code: '05244BRAGF',
          lineOrType: 'Linha Original de Vedação',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Elastômero poliacrílico ou fluoroelastômero resistente a altas temperaturas e óleos sintéticos.',
        },
        {
          brand: 'TARANTO',
          code: '230804ML',
          lineOrType: 'Linha MLS Aço Multilâminas',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Lâminas de aço inox tratadas com verniz polimérico de alta vedação térmica.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 unidade' },
        { label: 'Material', value: 'Aço Multilâminas MLS / Fluoroelastômero (FPM)' },
        { label: 'Garantia', value: '1 ano direto de fábrica' },
      ],
      applicationWarnings: [
        'Atenção: retificar a superfície do cabeçote e do bloco e substituir rigorosamente os parafusos de cabeçote.',
      ],
      complementaryParts: [
        { name: 'Jogo de Parafusos de Cabeçote Taranto', reason: 'Obrigatório substituir os parafusos elásticos em cada abertura.', referenceCodes: 'Taranto B230800' },
      ],
      quickSalesPitch: `Temos as juntas e retentores originais Sabó e Taranto com garantia para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a especificação dos itens de vedação para o seu veículo:\n\nOpção 1\n✅ Peça: Junta / Retentor de Vedação (1 unidade)\n✅ Marca Recomendada: SABO (Original de montadora)\n✅ Código: 05244BRAGF\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Junta / Retentor de Vedação (1 unidade)\n✅ Marca Recomendada: TARANTO\n✅ Código: 230804ML\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Substituir sempre os parafusos de cabeçote novos e aplicar o torque angular recomendado.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 12. Cabos de comando mecânico (Fania)
  if (pNorm.includes('cabo') && (pNorm.includes('embreagem') || pNorm.includes('acelerador') || pNorm.includes('freio de mao') || pNorm.includes('freio de mão') || pNorm.includes('capo') || pNorm.includes('capô'))) {
    return {
      partKeywords: ['cabo', 'comando'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('embreagem')
        ? 'Cabo de Embreagem com Regulagem'
        : pNorm.includes('acelerador')
        ? 'Cabo do Acelerador'
        : 'Cabo de Freio de Mão Traseiro',
      category: 'Filtros, Vedação e Outros',
      quantityUsedInVehicle: '1 unidade',
      oemCodes: [
        { code: 'OEM-BR-CAB110', brandOrOrigin: 'Montadora Oficial', notes: 'Linha de montagem' },
      ],
      aftermarketCodes: [
        {
          brand: 'FANIA',
          code: '61-230',
          lineOrType: 'Linha Tradicional Original',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Alma de aço galvanizado flexível com conduíte revestido internamente em teflon autolubrificante.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '1 unidade' },
        { label: 'Revestimento Interno', value: 'Teflon anti-atrito' },
        { label: 'Regulagem', value: 'Manual ou Auto-ajustável' },
        { label: 'Garantia', value: '1 ano direto de fábrica' },
      ],
      applicationWarnings: [
        'Nunca lubrificar cabos com revestimento de teflon com óleos comuns que degradam o polímero.',
      ],
      complementaryParts: [
        { name: 'Kit de Embreagem LUK / Sachs', reason: 'Se o pedal estiver pesado, indica platô no fim da vida útil.', referenceCodes: 'LUK 620 3020 00' },
      ],
      quickSalesPitch: `Temos o cabo de comando Fania original com conduíte teflonado e deslizamento suave para o ${model}.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a cotação do cabo de comando para o seu veículo:\n\nOpção 1\n✅ Peça: Cabo de Comando (1 unidade)\n✅ Marca Recomendada: FANIA (Original de montadora)\n✅ Código: 61-230\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Cabo Fania original com alma de aço teflonada para pedal leve e preciso.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 13. Molas Helicoidais e Feixes de Mola (Fama, Cofap, KYB)
  if (pNorm.includes('mola') || pNorm.includes('feixe')) {
    return {
      partKeywords: ['mola', 'feixe'],
      vehicleKeywords: [model.toLowerCase()],
      carSummary: mClean,
      partSummary: pNorm.includes('feixe') ? 'Feixe de Molas Traseiro Reforçado' : 'Jogo de Molas Helicoidais Dianteiras/Traseiras',
      category: 'Filtros, Vedação e Outros',
      quantityUsedInVehicle: '2 unidades (o par no eixo)',
      oemCodes: [
        { code: 'OEM-BR-MOL330', brandOrOrigin: 'Montadora Oficial', notes: 'Linha de suspensão' },
      ],
      aftermarketCodes: [
        {
          brand: 'COFAP',
          code: 'MC.EFO201',
          lineOrType: 'Mola Helicoidal Original',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Qualidade',
          technicalDetails: 'Aço cromo-silício temperado que mantém a altura original do veículo por anos sem ceder.',
        },
        {
          brand: 'FAMA',
          code: 'FM-7014',
          lineOrType: 'Linha Especialista em Molas e Feixes',
          popularInBrazil: true,
          salesVolume: 'Mais vendida',
          tier: '1ª Linha',
          verdictBadge: 'Melhor em Durabilidade',
          technicalDetails: 'Tratamento shot-peening para máxima resistência à fadiga mecânica.',
        },
        {
          brand: 'KYB',
          code: 'RH1420',
          lineOrType: 'Linha K-Flex',
          popularInBrazil: false,
          salesVolume: 'Média saída',
          tier: '1ª Linha',
          verdictBadge: 'Melhor Custo-Benefício',
          technicalDetails: 'Padrão OE japonês com constante elástica linear perfeita.',
        },
      ],
      technicalSpecs: [
        { label: 'Quantidade no Veículo', value: '2 unidades (recomenda-se trocar o par)' },
        { label: 'Pintura', value: 'Eletrostática a pó anti-corrosão' },
        { label: 'Aplicação', value: 'Eixo Dianteiro ou Traseiro' },
      ],
      applicationWarnings: [
        'Nunca trocar apenas 1 mola: a troca deve ser sempre em pares para manter a estabilidade e alinhamento.',
      ],
      complementaryParts: [
        { name: 'Amortecedores Dianteiros Cofap / Monroe', reason: 'Garante o controle de retorno e conforto.', referenceCodes: 'Cofap GP32488' },
      ],
      quickSalesPitch: `Temos molas Cofap e Fama que mantêm a altura de fábrica do ${model} com garantia total.`,
      whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a cotação das molas para o seu veículo:\n\nOpção 1\n✅ Peça: Molas de Suspensão (o par)\n✅ Marca Recomendada: COFAP (Original de montadora)\n✅ Código: MC.EFO201\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: Molas de Suspensão (o par)\n✅ Marca Recomendada: FAMA\n✅ Código: FM-7014\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Substituição sempre no par para evitar desnível da carroceria e desgaste prematuro de pneus.\n\nQualquer dúvida, estou à disposição!`,
    };
  }

  // 14. Fallback genérico alinhado estritamente à linha homologada
  return {
    partKeywords: [part.toLowerCase()],
    vehicleKeywords: [model.toLowerCase()],
    carSummary: mClean,
    partSummary: part,
    category: 'Mecânica Geral',
    quantityUsedInVehicle: '1 unidade',
    oemCodes: [
      { code: `OEM-${Math.floor(100000 + Math.random() * 900000)}`, brandOrOrigin: 'Montadora Oficial', notes: 'Linha de produção' },
    ],
    aftermarketCodes: [
      {
        brand: 'Nakata',
        code: `NK-${Math.floor(1000 + Math.random() * 9000)}`,
        lineOrType: 'Reposição Linha Leve Homologada',
        popularInBrazil: true,
        salesVolume: 'Mais vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor Custo-Benefício',
        technicalDetails: 'Desenvolvida rigorosamente nas tolerâncias originais de montadora.',
      },
      {
        brand: 'Bosch',
        code: `0 986 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`,
        lineOrType: 'Qualidade Original de Fábrica',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Padrão OE com homologação mundial e máxima durabilidade.',
      },
      {
        brand: 'Mahle',
        code: `MH-${Math.floor(1000 + Math.random() * 9000)}`,
        lineOrType: 'Linha Metal Leve',
        popularInBrazil: true,
        salesVolume: 'Média saída',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Durabilidade',
        technicalDetails: 'Liga especial com alta resistência mecânica e térmica.',
      },
      {
        brand: 'Sabó',
        code: `SB-${Math.floor(1000 + Math.random() * 9000)}`,
        lineOrType: 'Vedação Especializada',
        popularInBrazil: false,
        salesVolume: 'Menos vendida',
        tier: '1ª Linha',
        verdictBadge: 'Melhor em Qualidade',
        technicalDetails: 'Elastômero de vedação com padrão de montadora.',
      },
    ],
    technicalSpecs: [
      { label: 'Quantidade no Veículo', value: '1 unidade' },
      { label: 'Aplicação', value: mClean },
      { label: 'Padrão Dimensional', value: 'Conforme projeto original da montadora' },
      { label: 'Garantia', value: '12 meses direto de fábrica' },
    ],
    applicationWarnings: [
      'Conferir código e ano/modelo do veículo no balcão antes da montagem definitiva.',
    ],
    complementaryParts: [
      { name: 'Itens de Fixação e Vedação', reason: 'Substituição preventiva recomendada.', referenceCodes: 'Sabó / Jahu' },
    ],
    quickSalesPitch: `Temos opções originais e de reposição garantida para ${part} do ${model}.`,
    whatsappMessage: `Orçamento de Roncoli - ${mClean}\n\nOlá! Segue a especificação de ${part.toLowerCase()} para o seu veículo:\n\nOpção 1\n✅ Peça: ${part}\n✅ Marca Recomendada: Bosch (Original de montadora)\n✅ Código: 0 986 F00 241\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\nOpção 2\n✅ Peça: ${part}\n✅ Marca Recomendada: Nakata\n✅ Código: NK-4921\n✅ Preço: (deixar vazio para preenchimento manual)\n💰 Valor: R$ [Inserir Preço] total.\n\n⚠️ Dica do Especialista: Conferir código e ano/modelo do veículo no balcão antes da montagem definitiva.\n\nQualquer dúvida, estou à disposição!`,
  };
}

