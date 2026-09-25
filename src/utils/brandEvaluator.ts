import { CrossReference } from '../types';
import { getOfficialBrandCatalogUrl } from '../data/officialBrandRules';

export interface EvaluatedAftermarketItem extends CrossReference {
  tier: '1ª Linha' | '2ª Linha' | '3ª Linha';
  tierDescription: string;
  salesVolume: 'Mais vendida' | 'Média saída' | 'Menos vendida';
  verdictBadge: 'Melhor em Qualidade' | 'Melhor Custo-Benefício' | 'Melhor em Durabilidade' | 'Opção Econômica' | 'Mais Procurada';
  technicalDetails: string;
  persuasiveDetails: string;
  warrantyInfo: string;
  partCategoryType: string;
}

// Lista oficial das principais marcas automotivas brasileiras (solicitada pelo usuário):
// LUK, Valeo, Sachs, Nakata, Monroe, Bosch, NGK, SKF, DS, COFAP, CONTINENTAL, DAYCO, DISAUTO, FAMA, FANIA, GATES,
// FLORIO, IGUAÇU, IMA, JAHU, MOBENSANI, KYB, MAHLE, THOMSON, VISCONDE, TSA, URBA, VALCLEI, ZF AFTERMARKET,
// VETOR, SCHADEK, BROSOL, JAMAICA, NOVO KIT, NK, DPL, TECFIL, SABO, TARANTO, MAGNETI MARELLI, SYL, COBREQ, TECPADS, WAHLER.

const FIRST_TIER_BRANDS = [
  'luk',
  'valeo',
  'sachs',
  'zf aftermarket',
  'zf',
  'nakata',
  'bosch',
  'ngk',
  'skf',
  'cofap',
  'continental',
  'contitech',
  'dayco',
  'gates',
  'kyb',
  'monroe',
  'mahle',
  'metal leve',
  'thomson',
  'mte-thomson',
  'visconde',
  'rv visconde',
  'urba',
  'valclei',
  'wahler',
  'sabo',
  'sabó',
  'magneti marelli',
  'marelli',
  'cobreq',
  'fras-le',
  'frasle',
  'delphi',
  'denso',
  'ate',
  'varga',
  'trw',
];

const SECOND_TIER_BRANDS = [
  'ds',
  'disauto',
  'fama',
  'fania',
  'florio',
  'iguacu',
  'iguaçu',
  'ima',
  'jahu',
  'mobensani',
  'tsa',
  'vetor',
  'schadek',
  'brosol',
  'jamaica',
  'novo kit',
  'nk',
  'dpl',
  'tecfil',
  'taranto',
  'fremax',
  'hipper freios',
  'indisa',
  'sampel',
  'monroe axios',
  'axios',
  'takao',
  'perfect',
  'viemar',
  'spicer',
  'wega',
];

const THIRD_TIER_BRANDS = [
  'syl',
  'tecpads',
  'willtec',
  'danidrea',
  'allen',
  'frontier',
  'importado',
  'generico',
  'genérico',
  'chines',
];

export function normalizeBrand(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function detectBrandTier(brandName: string): { tier: '1ª Linha' | '2ª Linha' | '3ª Linha'; desc: string } {
  const norm = normalizeBrand(brandName);

  if (FIRST_TIER_BRANDS.some((b) => norm.includes(b))) {
    return { tier: '1ª Linha', desc: '1ª Linha - Padrão Original de Montadora (OEM)' };
  }
  if (THIRD_TIER_BRANDS.some((b) => norm.includes(b))) {
    return { tier: '3ª Linha', desc: '3ª Linha - Reposição Econômica de Entrada' };
  }
  if (SECOND_TIER_BRANDS.some((b) => norm.includes(b))) {
    return { tier: '2ª Linha', desc: '2ª Linha - Reposição Tradicional Consolidada' };
  }

  return { tier: '2ª Linha', desc: '2ª Linha - Reposição Qualificada de Mercado' };
}

function detectVerdictBadge(
  brandName: string,
  tier: '1ª Linha' | '2ª Linha' | '3ª Linha',
  index: number
): 'Melhor em Qualidade' | 'Melhor Custo-Benefício' | 'Melhor em Durabilidade' | 'Opção Econômica' | 'Mais Procurada' {
  const norm = normalizeBrand(brandName);

  if (tier === '3ª Linha' || norm.includes('tecpads') || norm.includes('syl')) {
    return 'Opção Econômica';
  }

  if (
    norm.includes('bosch') ||
    norm.includes('luk') ||
    norm.includes('ngk') ||
    norm.includes('valeo') ||
    norm.includes('sachs') ||
    norm.includes('zf') ||
    norm.includes('continental') ||
    norm.includes('wahler')
  ) {
    return 'Melhor em Qualidade';
  }

  if (
    norm.includes('skf') ||
    norm.includes('mahle') ||
    norm.includes('monroe') ||
    norm.includes('sabo') ||
    norm.includes('taranto') ||
    norm.includes('kyb')
  ) {
    return 'Melhor em Durabilidade';
  }

  if (
    norm.includes('nakata') ||
    norm.includes('cofap') ||
    norm.includes('cobreq') ||
    norm.includes('urba') ||
    norm.includes('tecfil') ||
    norm.includes('gates') ||
    norm.includes('dayco')
  ) {
    return index === 0 ? 'Mais Procurada' : 'Melhor Custo-Benefício';
  }

  if (tier === '1ª Linha') {
    return 'Melhor em Qualidade';
  }

  return 'Melhor Custo-Benefício';
}

// Argumentos técnicos de venda altamente convincentes para fechar o pedido no balcão
export function generatePersuasiveSalesDetails(
  brandName: string,
  partCategory?: string,
  partSummary?: string
): { technicalDetails: string; persuasiveDetails: string; warrantyInfo: string; categoryType: string } {
  const norm = normalizeBrand(brandName);
  const pNorm = ((partSummary || '') + ' ' + (partCategory || '')).toLowerCase();

  // 1. EMBREAGEM / CÂMBIO (LUK, Valeo, Sachs, ZF)
  if (pNorm.includes('embreagem') || pNorm.includes('plato') || pNorm.includes('disco de embreagem') || pNorm.includes('atuador')) {
    if (norm.includes('luk')) {
      return {
        technicalDetails: 'Platô balanceado eletronicamente com tecnologia de compensação de desgaste e disco orgânico de alto coeficiente de atrito.',
        persuasiveDetails: 'Peça idêntica à que sai de fábrica na montadora. Reduz em até 40% o peso no pedal, elimina qualquer risco de trepidação em rampas e oferece o dobro da durabilidade das marcas paralelas.',
        warrantyInfo: 'Garantia de fábrica: 1 ano ou 30.000 km com suporte técnico Schaeffler.',
        categoryType: 'clutch',
      };
    }
    if (norm.includes('sachs') || norm.includes('zf')) {
      return {
        technicalDetails: 'Revestimento de fricção reforçado com molas helicoidais em aço mola alemão temperado e cubo estriado usinado em CNC.',
        persuasiveDetails: 'Conforto incomparável de engate e pedal macio. Testada para suportar regimes severos de trânsito urbano com ar-condicionado sem perder pressão.',
        warrantyInfo: 'Garantia ZF Aftermarket: 12 meses direto no balcão.',
        categoryType: 'clutch',
      };
    }
    if (norm.includes('valeo')) {
      return {
        technicalDetails: 'Molas amortecedoras progressivas integradas e chapa de amortecimento térmico contra vitrificação.',
        persuasiveDetails: 'Fornecedora original de grandes montadoras mundiais. Proporciona engates precisos, sem ruídos e com resposta imediata na embreagem.',
        warrantyInfo: 'Garantia Valeo Service: 12 meses de cobertura total.',
        categoryType: 'clutch',
      };
    }
    return {
      technicalDetails: 'Kit completo com platô, disco balanceado e rolamento/atuador nas medidas originais.',
      persuasiveDetails: 'Excelente relação custo por quilômetro rodado, ideal para quem precisa de manutenção imediata com encaixe garantido.',
      warrantyInfo: 'Garantia de 6 meses contra defeitos de fabricação.',
      categoryType: 'clutch',
    };
  }

  // 2. FREIOS (Cobreq, Fras-le, Bosch, Syl, Tecpads, Nakata)
  if (pNorm.includes('pastilha') || pNorm.includes('freio') || pNorm.includes('disco') || pNorm.includes('sapata') || pNorm.includes('lona')) {
    if (norm.includes('cobreq')) {
      return {
        technicalDetails: 'Composto cerâmico semi-metálico com chapa anti-ruído metálica revestida em elastômero vulcanizado.',
        persuasiveDetails: 'A marca mais confiada pelos mecânicos no Brasil. Frenagem progressiva e 100% silenciosa desde o primeiro assentamento, preservando a vida útil do disco de freio sem soltar pó preto nas rodas.',
        warrantyInfo: 'Certificação INMETRO e Garantia TMD Friction de 1 ano.',
        categoryType: 'brake',
      };
    }
    if (norm.includes('bosch')) {
      return {
        technicalDetails: 'Massa de atrito isenta de amianto com chanfros angulares de ventilação e sensor/chapa acústica integrada.',
        persuasiveDetails: 'Engenharia alemã com máxima segurança em frenagens bruscas e pista molhada. Resposta imediata com menor esforço no pedal.',
        warrantyInfo: 'Garantia Nacional Bosch: 12 meses.',
        categoryType: 'brake',
      };
    }
    if (norm.includes('nakata')) {
      return {
        technicalDetails: 'Chapa de aço de alta resistência com pintura eletrostática e composto de atrito com ranhura central dissipadora de calor.',
        persuasiveDetails: 'Excelente custo-benefício de marca líder no mercado. Garante frenagem firme e segura sem danificar a superfície dos discos.',
        warrantyInfo: 'Garantia Nakata: 12 meses ou 20.000 km.',
        categoryType: 'brake',
      };
    }
    if (norm.includes('syl') || norm.includes('tecpads')) {
      return {
        technicalDetails: 'Composto orgânico convencional para reposição standard com chanfros de assentamento.',
        persuasiveDetails: 'A melhor opção para quem busca economia imediata no balcão sem abrir mão da segurança essencial de tráfego urbano.',
        warrantyInfo: 'Certificado INMETRO com 6 meses de garantia.',
        categoryType: 'brake',
      };
    }
    return {
      technicalDetails: 'Material de atrito de coeficiente de frenagem estável em temperaturas de até 350°C.',
      persuasiveDetails: 'Encaixe direto nas pinças originais sem necessidade de limagem ou adaptações na oficina.',
      warrantyInfo: 'Certificado INMETRO e garantia de 6 a 12 meses.',
      categoryType: 'brake',
    };
  }

  // 3. AMORTECEDORES E SUSPENSÃO (Cofap, Nakata, Monroe, KYB, Mobensani, Jahu, Fama, Novo Kit)
  if (pNorm.includes('amortecedor') || pNorm.includes('suspensao') || pNorm.includes('pivo') || pNorm.includes('terminal') || pNorm.includes('coxim') || pNorm.includes('batente')) {
    if (norm.includes('cofap')) {
      return {
        technicalDetails: 'Tecnologia Turbogás pressurizada com nitrogênio, haste superacabada em aço cromo e batente hidráulico interno.',
        persuasiveDetails: 'O amortecedor mais vendido e líder absoluto de montadoras no Brasil. Mantém os 4 pneus 100% colados ao asfalto, reduz a distância de frenagem em curvas e absorve os impactos das ruas brasileiras.',
        warrantyInfo: 'Garantia Nacional Cofap: 2 anos para linha leve.',
        categoryType: 'suspension',
      };
    }
    if (norm.includes('monroe')) {
      return {
        technicalDetails: 'Válvula de controle de compressão proporcional OESpectrum com fluido sintético de alto índice de viscosidade.',
        persuasiveDetails: 'Tecnologia mundial de primeira linha. Elimina o balanço da carroceria e garante máxima estabilidade em rodovias e curvas em alta velocidade.',
        warrantyInfo: 'Garantia Monroe: 2 anos de tranquilidade.',
        categoryType: 'suspension',
      };
    }
    if (norm.includes('kyb')) {
      return {
        technicalDetails: 'Tubo sem costura em aço trefilado japonês e retentor de vedação multi-lábio de alta durabilidade.',
        persuasiveDetails: 'Fornecedora original de 1 a cada 4 carros fabricados no mundo (líder em montadoras asiáticas). Durabilidade extrema e precisão cirúrgica de suspensão.',
        warrantyInfo: 'Garantia KYB: 2 anos.',
        categoryType: 'suspension',
      };
    }
    if (norm.includes('nakata')) {
      return {
        technicalDetails: 'Haste cromada e micro-polida com retentor especial resistente a poeira e alta carga dinâmica.',
        persuasiveDetails: 'Líder em confiança mecânica no mercado de reposição brasileiro. Robusto para estradas esburacadas e com suporte técnico nota 10.',
        warrantyInfo: 'Garantia Nakata: 2 anos ou 50.000 km.',
        categoryType: 'suspension',
      };
    }
    if (norm.includes('mobensani') || norm.includes('jahu')) {
      return {
        technicalDetails: 'Borracha vulcanizada em matriz de alta densidade com dureza Shore calibrada nas especificações OEM.',
        persuasiveDetails: 'Absorve as vibrações harmônicas do motor e do solo, eliminando barulhos secos no volante e na cabine do veículo.',
        warrantyInfo: 'Garantia de 12 meses direto de fábrica.',
        categoryType: 'suspension',
      };
    }
    if (norm.includes('novo kit')) {
      return {
        technicalDetails: 'Kit completo com batente de poliuretano microcelular, coifa de proteção em termoplástico e rolamento blindado.',
        persuasiveDetails: 'Evita contaminação da haste por terra e detritos, dobrando a vida útil do amortecedor novo.',
        warrantyInfo: 'Garantia de 1 ano.',
        categoryType: 'suspension',
      };
    }
    return {
      technicalDetails: 'Componente dimensionado rigorosamente conforme geometria e cargas da montadora.',
      persuasiveDetails: 'Restaura o alinhamento original e a estabilidade de rodagem do veículo.',
      warrantyInfo: 'Garantia de 12 a 24 meses.',
      categoryType: 'suspension',
    };
  }

  // 4. ARREFECIMENTO & BOMBAS (Urba, Schadek, Brosol, Valclei, Wahler, Florio, Iguaçu, Jamaica, Visconde)
  if (pNorm.includes('bomba') && (pNorm.includes('agua') || pNorm.includes('oleo') || pNorm.includes('combustivel')) || pNorm.includes('termostatica') || pNorm.includes('arrefecimento') || pNorm.includes('radiador')) {
    if (norm.includes('urba') || norm.includes('brosol')) {
      return {
        technicalDetails: 'Rotor metálico reforçado anti-cavitação e rolamento duplo vedado de alta velocidade com selo mecânico cerâmico.',
        persuasiveDetails: 'A marca sinônimo de bomba d\'água no Brasil há mais de 60 anos. Vazão constante mesmo em marcha lenta no trânsito pesado, protegendo o motor contra superaquecimento e queima de junta.',
        warrantyInfo: 'Garantia Urba-Brosol: 12 meses.',
        categoryType: 'cooling',
      };
    }
    if (norm.includes('schadek')) {
      return {
        technicalDetails: 'Engrenagens usinadas com tolerâncias micrométricas e válvula de alívio calibrada com precisão.',
        persuasiveDetails: 'Pressão de óleo instantânea desde a primeira partida a frio. Protege bronzinas e comando de válvulas contra desgaste prematuro.',
        warrantyInfo: 'Garantia Schadek: 12 meses.',
        categoryType: 'cooling',
      };
    }
    if (norm.includes('valclei') || norm.includes('wahler') || norm.includes('iguacu')) {
      return {
        technicalDetails: 'Elemento termostático calibrado a laser com carcaça anticorrosiva reforçada e anel o-ring de vedação térmica.',
        persuasiveDetails: 'Abre e fecha na temperatura exata recomendada pela montadora. Garante aquecimento rápido do motor, economia de combustível e fim da oscilação de temperatura.',
        warrantyInfo: 'Garantia de 1 ano com certificação ISO9001.',
        categoryType: 'cooling',
      };
    }
    if (norm.includes('visconde')) {
      return {
        technicalDetails: 'Colmeia de alumínio brasado com aletas de alta condutividade térmica e caixas em poliamida reforçada com fibra.',
        persuasiveDetails: 'Qualidade original de montadora. Máxima eficiência na troca de calor com resistência garantida contra picos de pressão.',
        warrantyInfo: 'Garantia RV Visconde: 12 meses.',
        categoryType: 'cooling',
      };
    }
    if (norm.includes('florio') || norm.includes('jamaica')) {
      return {
        technicalDetails: 'Polímero virgem injetado de alta resistência térmica e mangueiras reforçadas com trama têxtil vulcanizada.',
        persuasiveDetails: 'Suporta a pressão contínua do sistema de arrefecimento sem ressecar ou trincar com o tempo.',
        warrantyInfo: 'Garantia de 12 meses.',
        categoryType: 'cooling',
      };
    }
    return {
      technicalDetails: 'Vedações e tolerâncias térmicas rigorosamente testadas sob ciclos de pressão severos.',
      persuasiveDetails: 'Mantém o motor operando na temperatura ideal de projeto sem riscos de vazamento.',
      warrantyInfo: 'Garantia de fábrica de 1 ano.',
      categoryType: 'cooling',
    };
  }

  // 5. CORREIAS E SINCRONISMO (Continental, Dayco, Gates, SKF)
  if (pNorm.includes('correia') || pNorm.includes('tensor') || pNorm.includes('sincronismo') || pNorm.includes('dentada')) {
    if (norm.includes('continental') || norm.includes('contitech')) {
      return {
        technicalDetails: 'Composto sintético HNBR resistente a óleo e altas temperaturas (até 150°C) com cordonéis internos de fibra de vidro.',
        persuasiveDetails: 'A correia original das montadoras alemãs e mundiais. Máxima resistência contra fadiga e dentes que não saltam nem espanam, garantindo 100% de segurança para o cabeçote do motor.',
        warrantyInfo: 'Garantia Continental Contitech de 1 ano ou quilometragem indicada pelo fabricante.',
        categoryType: 'belt',
      };
    }
    if (norm.includes('gates')) {
      return {
        technicalDetails: 'Perfil de dente curvo com revestimento em tecido de náilon autolubrificante e estiramento próximo a zero.',
        persuasiveDetails: 'Líder global absoluta em sistemas de sincronismo automotivo. Reduz o atrito com as polias, roda em silêncio absoluto e oferece confiabilidade máxima.',
        warrantyInfo: 'Garantia Gates: 12 meses.',
        categoryType: 'belt',
      };
    }
    if (norm.includes('dayco')) {
      return {
        technicalDetails: 'Estrutura moldada com dentes de precisão micrométrica e compostos de borracha de alta rigidez torsional.',
        persuasiveDetails: 'Fornecedora original de montadoras líderes. Suporta acelerações rápidas e mantém o ponto de ignição perfeitamente sincronizado.',
        warrantyInfo: 'Garantia Dayco: 12 meses.',
        categoryType: 'belt',
      };
    }
    return {
      technicalDetails: 'Polímeros reforçados para tração severa contínua com dentes de precisão mecânica.',
      persuasiveDetails: 'Substituição preventiva ideal para manter o motor protegido contra colisão de válvulas.',
      warrantyInfo: 'Garantia de 1 ano.',
      categoryType: 'belt',
    };
  }

  // 6. IGNIÇÃO, INJEÇÃO E ELÉTRICA (Bosch, NGK, Magneti Marelli, DS, Thomson, TSA, Vetor)
  if (pNorm.includes('vela') || pNorm.includes('bobina') || pNorm.includes('injecao') || pNorm.includes('sensor') || pNorm.includes('sonda') || pNorm.includes('modulo')) {
    if (norm.includes('ngk')) {
      return {
        technicalDetails: 'Eletrodo central com liga especial de níquel/irídio e isolador cerâmico de altíssima pureza com anéis corrugados anti-flashover.',
        persuasiveDetails: 'A vela e bobina número 1 do mundo, equipando a imensa maioria dos veículos novos. Proporciona queima perfeita do combustível, resposta imediata no acelerador e menor emissão de poluentes.',
        warrantyInfo: 'Garantia NGK Niterra de 1 ano.',
        categoryType: 'ignition',
      };
    }
    if (norm.includes('bosch')) {
      return {
        technicalDetails: 'Circuitos integrados blindados contra interferência eletromagnética (RFI) e bicos de vazão estequiométrica.',
        persuasiveDetails: 'Pioneira e líder mundial em injeção eletrônica. Partida rápida pela manhã, marcha lenta suave e economia real no bolso em cada abastecimento.',
        warrantyInfo: 'Garantia Nacional Bosch de 12 meses.',
        categoryType: 'ignition',
      };
    }
    if (norm.includes('magneti marelli')) {
      return {
        technicalDetails: 'Sensores de alta precisão piezoelétrica e corpos de borboleta com resposta rápida a milissegundos.',
        persuasiveDetails: 'Fornecedora original oficial das maiores montadoras nacionais (Fiat, VW, Renault). Diagnóstico limpo no scanner sem luz de injeção acesa no painel.',
        warrantyInfo: 'Garantia Magneti Marelli de 1 ano.',
        categoryType: 'ignition',
      };
    }
    if (norm.includes('ds') || norm.includes('tsa')) {
      return {
        technicalDetails: 'Placa resistiva cerâmica com contatos em ouro e boia de vedação em polímero sintético anti-álcool.',
        persuasiveDetails: 'Especialista brasileira em medição de combustível. Leitura 100% precisa no painel do carro tanto com álcool quanto com gasolina.',
        warrantyInfo: 'Garantia de 12 meses.',
        categoryType: 'ignition',
      };
    }
    if (norm.includes('thomson')) {
      return {
        technicalDetails: 'Sonda planar com elemento de zircônia e aquecedor cerâmico ultra-rápido.',
        persuasiveDetails: 'Ajusta a mistura ar-combustível em segundos após a partida, evitando motor engasgando e alto consumo.',
        warrantyInfo: 'Garantia MTE-Thomson de 1 ano.',
        categoryType: 'ignition',
      };
    }
    return {
      technicalDetails: 'Calibração eletrônica idêntica aos parâmetros da injeção original do veículo.',
      persuasiveDetails: 'Compatibilidade garantida com a central eletrônica (ECU) sem acusar falhas.',
      warrantyInfo: 'Garantia de 12 meses.',
      categoryType: 'ignition',
    };
  }

  // 7. VEDAÇÃO E JUNTAS (Sabó, Taranto)
  if (pNorm.includes('junta') || pNorm.includes('retentor') || pNorm.includes('vedacao')) {
    if (norm.includes('sabo') || norm.includes('sabó')) {
      return {
        technicalDetails: 'Lábio de vedação em elastômero fluoro-carbonado (Viton) com mola helicoidal de aço inox e retentor de carcaça reforçada.',
        persuasiveDetails: 'Líder absoluta de vedação em montadoras no Brasil. Suporta temperaturas extremas e óleos sintéticos modernos sem endurecer, acabando de vez com vazamentos que mancham a garagem.',
        warrantyInfo: 'Garantia Sabó de 1 ano.',
        categoryType: 'gasket',
      };
    }
    if (norm.includes('taranto')) {
      return {
        technicalDetails: 'Tecnologia Multi-Layer Steel (MLS) com camadas de aço mola revestidas em elastômero antiaderente.',
        persuasiveDetails: 'Veda com perfeição mesmo se houver micro-ondulações no cabeçote retificado. Suporta altíssimas pressões de compressão sem queimar.',
        warrantyInfo: 'Garantia Taranto de 12 meses.',
        categoryType: 'gasket',
      };
    }
  }

  // 8. FILTROS (Tecfil, Mahle)
  if (pNorm.includes('filtro')) {
    if (norm.includes('tecfil')) {
      return {
        technicalDetails: 'Papel de microfibra resinado plissado de alta densidade com eficiência de filtragem superior a 99,5%.',
        persuasiveDetails: 'A maior fabricante de filtros da América Latina. Retém microimpurezas que arranham cilindros e bicos injetores, prolongando a vida do motor.',
        warrantyInfo: 'Garantia Tecfil de 12 meses.',
        categoryType: 'filter',
      };
    }
    if (norm.includes('mahle')) {
      return {
        technicalDetails: 'Elemento filtrante com retenção microporosa graduada e carcaça metálica com válvula anti-retorno de silicone.',
        persuasiveDetails: 'Fornecedora original das marcas mais exigentes do mundo. Mantém o óleo puro e lubrificação instantânea nos primeiros segundos de partida.',
        warrantyInfo: 'Garantia Mahle Metal Leve de 1 ano.',
        categoryType: 'filter',
      };
    }
  }

  // 9. ROLAMENTOS E CUBOS (SKF, IMA)
  if (pNorm.includes('rolamento') || pNorm.includes('cubo')) {
    if (norm.includes('skf')) {
      return {
        technicalDetails: 'Aço cromo 100Cr6 temperado por indução com esferas/roletes de precisão ISO P6 e graxa sintética permanente.',
        persuasiveDetails: 'A referência mundial número 1 em rolamentos. Rodagem silenciosa, sem folgas e com vida útil superior a 100.000 km mesmo em condições severas.',
        warrantyInfo: 'Garantia SKF de 1 ano.',
        categoryType: 'bearing',
      };
    }
    if (norm.includes('ima')) {
      return {
        technicalDetails: 'Cubo de roda forjado e usinado em CNC com pista de rolamento temperada e furação balanceada.',
        persuasiveDetails: 'Alta resistência a impactos e furação milimétrica que evita empenamento e vibração nos discos de freio.',
        warrantyInfo: 'Garantia IMA de 12 meses.',
        categoryType: 'bearing',
      };
    }
  }

  // Padrão Geral
  return {
    technicalDetails: 'Desenvolvida rigorosamente nas especificações dimensionais e mecânicas da montadora.',
    persuasiveDetails: 'Peça de qualidade comprovada que garante montagem perfeita, sem retrabalho para o mecânico e com durabilidade assegurada para o cliente.',
    warrantyInfo: 'Garantia de 12 meses direto com o fabricante.',
    categoryType: 'general',
  };
}

export function evaluateAftermarketList(
  items: CrossReference[],
  partCategory?: string,
  partSummary?: string
): EvaluatedAftermarketItem[] {
  if (!items || items.length === 0) return [];

  const total = items.length;

  return items.map((item, index) => {
    // 1. Detectar Tier
    let tier = item.tier as '1ª Linha' | '2ª Linha' | '3ª Linha' | undefined;
    let tierDesc = '';
    if (!tier || !['1ª Linha', '2ª Linha', '3ª Linha'].includes(tier)) {
      const detected = detectBrandTier(item.brand);
      tier = detected.tier;
      tierDesc = detected.desc;
    } else {
      tierDesc =
        tier === '1ª Linha'
          ? '1ª Linha - Padrão Original de Montadora (OEM)'
          : tier === '2ª Linha'
          ? '2ª Linha - Reposição Tradicional Consolidada'
          : '3ª Linha - Reposição Econômica de Entrada';
    }

    // 2. Avaliação Relativa de Giro de Balcão (Mais vendida / Média saída / Menos vendida)
    let salesVolume = item.salesVolume as 'Mais vendida' | 'Média saída' | 'Menos vendida' | undefined;
    const allHaveSameVolume = items.every((x) => x.salesVolume === items[0]?.salesVolume);

    if (!salesVolume || !['Mais vendida', 'Média saída', 'Menos vendida'].includes(salesVolume) || (items.length > 2 && allHaveSameVolume)) {
      if (tier === '3ª Linha') {
        salesVolume = 'Menos vendida';
      } else if (index === 0 || (index === 1 && total >= 4 && tier === '1ª Linha')) {
        salesVolume = 'Mais vendida';
      } else if (index === total - 1 && total >= 3) {
        salesVolume = 'Menos vendida';
      } else {
        salesVolume = 'Média saída';
      }
    }

    // 3. Avaliação de Perfil de Compra
    let verdictBadge = item.verdictBadge as
      | 'Melhor em Qualidade'
      | 'Melhor Custo-Benefício'
      | 'Melhor em Durabilidade'
      | 'Opção Econômica'
      | 'Mais Procurada'
      | undefined;

    if (!verdictBadge) {
      verdictBadge = detectVerdictBadge(item.brand, tier, index);
    }

    // 4. Detalhes persuasivos e técnicos
    const generated = generatePersuasiveSalesDetails(item.brand, partCategory, partSummary);
    const technicalDetails = item.technicalDetails && item.technicalDetails.length > 15 ? item.technicalDetails : generated.technicalDetails;
    const persuasiveDetails = item.persuasiveDetails && item.persuasiveDetails.length > 15 ? item.persuasiveDetails : generated.persuasiveDetails;
    const warrantyInfo = item.warrantyInfo || generated.warrantyInfo;
    const catalogUrl = item.catalogUrl || getOfficialBrandCatalogUrl(item.brand);

    return {
      ...item,
      tier,
      tierDescription: tierDesc,
      salesVolume,
      verdictBadge,
      technicalDetails,
      persuasiveDetails,
      warrantyInfo,
      catalogUrl,
      officialBrandMatch: true,
      partCategoryType: generated.categoryType,
    };
  });
}
