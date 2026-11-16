import { SearchRequest } from '../types';

export interface PrecisionQuestionOption {
  id: string;
  label: string;
  description?: string;
  badge?: string;
  appliesToNotes: string;
  recommendedFor?: string[];
}

export interface PrecisionQuestion {
  id: string;
  title: string;
  subtitle: string;
  iconType: 'ac' | 'transmission' | 'brake' | 'engine' | 'position' | 'body' | 'fuel';
  impactExplanation: string; // Explica por que essa pergunta evita inconsistência no catálogo
  options: PrecisionQuestionOption[];
  required: boolean;
  defaultSelectedId?: string;
}

export function detectPrecisionQuestions(request: SearchRequest): PrecisionQuestion[] {
  const part = (request.part || '').toLowerCase().trim();
  const model = (request.model || '').toLowerCase().trim();
  const notes = (request.notes || '').toLowerCase().trim();
  const trans = (request.transmission || '').toLowerCase().trim();

  const questions: PrecisionQuestion[] = [];

  // ==========================================
  // 1. RADIADORES & ARREFECIMENTO
  // ==========================================
  if (
    part.includes('radiador') ||
    part.includes('colmeia') ||
    part.includes('resfriamento') ||
    part.includes('intercooler')
  ) {
    // Pergunta 1: Ar Condicionado
    const hasAcInNotes =
      notes.includes('sem ar') ||
      notes.includes('s/ ar') ||
      notes.includes('com ar') ||
      notes.includes('c/ ar') ||
      notes.includes('ar condicionado');

    questions.push({
      id: 'radiator_ac',
      title: 'O veículo possui Ar Condicionado de fábrica ou instalado?',
      subtitle: 'A presença de ar condicionado altera a espessura da colmeia, os bocais e os suportes do condensador.',
      iconType: 'ac',
      impactExplanation:
        'Modelos SEM ar e COM ar utilizam especificações distintas nos catálogos (Visconde, Valeo, Magneti Marelli, Mahle). Inverter causa superaquecimento ou incompatibilidade física de montagem.',
      required: true,
      defaultSelectedId:
        notes.includes('sem ar') || notes.includes('s/ ar')
          ? 'sem_ar'
          : notes.includes('com ar') || notes.includes('c/ ar') || notes.includes('ar condicionado')
          ? 'com_ar'
          : undefined,
      options: [
        {
          id: 'sem_ar',
          label: 'SEM Ar Condicionado',
          description: 'Sistema sem condensador frontal; colmeia e fixação padrão.',
          badge: 'Sem Ar',
          appliesToNotes: 'SEM Ar Condicionado',
        },
        {
          id: 'com_ar',
          label: 'COM Ar Condicionado',
          description: 'Colmeia preparada para maior carga térmica e fixação do condensador/ventoinha.',
          badge: 'Com Ar',
          appliesToNotes: 'COM Ar Condicionado',
        },
      ],
    });

    // Pergunta 2: Câmbio Manual ou Automático
    questions.push({
      id: 'radiator_trans',
      title: 'Qual é o tipo de Câmbio / Transmissão do veículo?',
      subtitle: 'Veículos automáticos possuem serpentina metálica embutida para refrigerar o óleo da transmissão.',
      iconType: 'transmission',
      impactExplanation:
        'Radiadores para câmbio automático possuem conexões roscadas na caixa lateral para o óleo ATF. Se o carro for manual e colocar o de automático (ou vice-versa), não encaixa corretamente.',
      required: true,
      defaultSelectedId:
        trans.includes('aut') || notes.includes('autom')
          ? 'automatica'
          : trans.includes('man') || notes.includes('manual')
          ? 'manual'
          : undefined,
      options: [
        {
          id: 'manual',
          label: 'Câmbio Manual (Mecânico)',
          description: 'Caixas laterais lisas, sem trocador de calor de óleo de câmbio.',
          badge: 'Manual',
          appliesToNotes: 'Câmbio Manual',
        },
        {
          id: 'automatica',
          label: 'Câmbio Automático / Automatizado',
          description: 'Possui conexões roscadas integradas para as mangueiras de óleo ATF da transmissão.',
          badge: 'Automático (Trocador ATF)',
          appliesToNotes: 'Câmbio Automático com Trocador de Óleo',
        },
      ],
    });
  }

  // ==========================================
  // 2. FREIOS (Pastilhas, Discos, Sapatas, Lonas)
  // ==========================================
  else if (
    part.includes('pastilha') ||
    part.includes('freio') ||
    part.includes('disco') ||
    part.includes('sapata') ||
    part.includes('lona') ||
    part.includes('pinça')
  ) {
    // Pergunta: Submodelo e Sistema de Freio
    if (model.includes('corsa') || model.includes('montana') || model.includes('meriva') || model.includes('onix') || model.includes('celta')) {
      questions.push({
        id: 'gm_brake_generation',
        title: 'Qual é o modelo exato da carroceria / geração?',
        subtitle: 'A GM utiliza 3 pastilhas totalmente diferentes que costumam ser confundidas no balcão.',
        iconType: 'brake',
        impactExplanation:
          'No Corsa Frente Montana (2002 a 2012) e Montana a pastilha correta é Cobreq N-360 / Fras-le PD/58. No Onix/Prisma moderno é Cobreq N-382. No Celta e Corsa Classic antigo é Cobreq N-325. Vender a errada não encaixa na pinça!',
        required: true,
        defaultSelectedId:
          notes.includes('frente montana') || model.includes('montana')
            ? 'frente_montana'
            : model.includes('onix')
            ? 'onix_moderno'
            : 'celta_classic',
        options: [
          {
            id: 'frente_montana',
            label: 'Corsa G2 "Frente Montana" (2002-2012) / Montana 1.4/1.8',
            description: 'Sistema Teves com disco 240mm. Código Cobreq N-360 / Fras-le PD/58.',
            badge: 'Cobreq N-360',
            appliesToNotes: 'Corsa Frente Montana / Montana (Pinça Teves Cobreq N-360)',
          },
          {
            id: 'celta_classic',
            label: 'Celta / Corsa Classic (Carroceria B Antiga até 2016)',
            description: 'Pinça Varga antiga com disco 239mm. Código Cobreq N-325 / Fras-le PD/60.',
            badge: 'Cobreq N-325',
            appliesToNotes: 'Celta / Corsa Classic antigo (Cobreq N-325)',
          },
          {
            id: 'onix_moderno',
            label: 'Onix / Prisma G1 / Cobalt / Spin',
            description: 'Pinça moderna GM. Código Cobreq N-382 / Fras-le PD/1446.',
            badge: 'Cobreq N-382',
            appliesToNotes: 'Linha Onix / Prisma moderna (Cobreq N-382)',
          },
        ],
      });
    }

    // Pergunta Geral de Freios: Disco Sólido vs Ventilado e Diâmetro
    questions.push({
      id: 'brake_disc_type',
      title: 'Qual é o tipo de disco e sistema de freio?',
      subtitle: 'Discos sólidos e ventilados possuem espessuras e alojamentos de pastilhas diferentes.',
      iconType: 'brake',
      impactExplanation:
        'Pastilhas para disco sólido possuem espessura maior de atrito; se montadas em disco ventilado, a pinça não fecha sobre o disco.',
      required: true,
      defaultSelectedId: 'ventilado',
      options: [
        {
          id: 'ventilado',
          label: 'Disco Ventilado (Duas pistas com aletas no meio)',
          description: 'Geralmente 240mm, 256mm ou 280mm de diâmetro. Mais comum em veículos 1.4, 1.6 e 1.0 com ar.',
          badge: 'Ventilado',
          appliesToNotes: 'Disco Dianteiro Ventilado',
        },
        {
          id: 'solido',
          label: 'Disco Sólido (Pista única inteiriça)',
          description: 'Geralmente 236mm ou 239mm. Muito comum em veículos 1.0 de entrada sem ar.',
          badge: 'Sólido',
          appliesToNotes: 'Disco Dianteiro Sólido',
        },
      ],
    });

    // Pergunta Eixo Dianteiro vs Traseiro (Freios)
    questions.push({
      id: 'brake_axle',
      title: 'A peça é para o eixo Dianteiro ou Traseiro?',
      subtitle: 'Pastilhas, discos, sapatas e lonas variam completamente conforme o eixo de aplicação.',
      iconType: 'position',
      impactExplanation:
        'Evita cruzar código dianteiro com traseiro (ou pastilha traseira com sistema de sapata/tambor).',
      required: true,
      defaultSelectedId:
        part.includes('traseir') || notes.includes('traseir')
          ? 'traseiro'
          : 'dianteiro',
      options: [
        {
          id: 'dianteiro',
          label: 'Eixo Dianteiro',
          description: 'Rodas dianteiras.',
          badge: 'Dianteiro',
          appliesToNotes: 'Eixo Dianteiro',
        },
        {
          id: 'traseiro',
          label: 'Eixo Traseiro',
          description: 'Rodas traseiras (verificar se usa disco ou tambor).',
          badge: 'Traseiro',
          appliesToNotes: 'Eixo Traseiro',
        },
      ],
    });

    // Pergunta Freio ABS
    questions.push({
      id: 'brake_abs',
      title: 'O veículo possui Sistema de Freio ABS?',
      subtitle: 'Sistemas com ABS podem possuir sensores integrados, pastilhas com chapa anti-ruído reforçada ou cubos magnéticos.',
      iconType: 'brake',
      impactExplanation: 'Importante principalmente para cubos de roda, rolamentos, discos e sapatas traseiras.',
      required: false,
      defaultSelectedId: notes.includes('sem abs') ? 'sem_abs' : 'com_abs',
      options: [
        {
          id: 'com_abs',
          label: 'COM Freio ABS',
          description: 'Possui módulo eletrônico e luz de ABS no painel.',
          appliesToNotes: 'COM freio ABS',
        },
        {
          id: 'sem_abs',
          label: 'SEM Freio ABS',
          description: 'Sistema puramente hidráulico convencional.',
          appliesToNotes: 'SEM freio ABS',
        },
      ],
    });
  }

  // ==========================================
  // 3. BOMBA D'ÁGUA & ARREFECIMENTO
  // ==========================================
  else if (part.includes('bomba') && (part.includes('agua') || part.includes('água') || part.includes('arrefecimento'))) {
    if (model.includes('corsa') || model.includes('celta') || model.includes('prisma') || model.includes('onix') || model.includes('palio') || model.includes('gol') || model.includes('astra')) {
      questions.push({
        id: 'water_pump_teeth',
        title: 'Quantos dentes possui a polia da bomba d\'água?',
        subtitle: 'Algumas famílias de motor possuem variações de dentes na polia acionada pela correia dentada.',
        iconType: 'engine',
        impactExplanation:
          'Na linha GM Família 1 (Celta, Prisma, Corsa, Onix 1.0/1.4), a polia correta geralmente tem 19 dentes. Nos motores 1.8 e 2.0 (ex: Astra/Vectra/Zafira) a polia possui 21, 23 ou 25 dentes. Se colocar errada, a correia não encaixa.',
        required: true,
        defaultSelectedId: model.includes('astra') || (request.engine || '').includes('2.0') || (request.engine || '').includes('1.8') ? '21_23_dentes' : '19_dentes',
        options: [
          {
            id: '19_dentes',
            label: '19 Dentes na Polia (Motores 1.0 e 1.4 8V)',
            description: 'Padrão mais comum para linha compacta 1.0/1.4.',
            badge: '1.0 / 1.4 Flex',
            appliesToNotes: 'Polia de 19 dentes',
          },
          {
            id: '21_23_dentes',
            label: '21, 23 ou 25 Dentes na Polia (Motores 1.6, 1.8 ou 2.0)',
            description: 'Conferir na peça antiga para motores médios/grandes.',
            badge: '1.6 / 1.8 / 2.0',
            appliesToNotes: 'Polia com 21/23/25 dentes',
          },
        ],
      });
    }
  }

  // ==========================================
  // 4. EMBREAGEM (Kits, Platô, Disco, Atuador)
  // ==========================================
  else if (
    part.includes('embreagem') ||
    part.includes('plato') ||
    part.includes('platô') ||
    part.includes('disco') ||
    part.includes('atuador')
  ) {
    questions.push({
      id: 'clutch_type',
      title: 'Qual é o sistema de acionamento da embreagem?',
      subtitle: 'O kit pode vir com rolamento mecânico tradicional ou atuador hidráulico concêntrico.',
      iconType: 'transmission',
      impactExplanation:
        'Kits com atuador hidráulico (ex: LUK 620 3020 33) são mais caros e completos. Kits com rolamento simples (ex: LUK 620 3020 00) usam cabo. Comprar o kit com rolamento para um carro que usa atuador hidráulico impede a instalação.',
      required: true,
      defaultSelectedId: 'atuador_hidraulico',
      options: [
        {
          id: 'atuador_hidraulico',
          label: 'Com Atuador Hidráulico Concêntrico (CSC)',
          description: 'Pedal macio acionado por fluido de freio. O atuador vai dentro da caixa de câmbio.',
          badge: 'Kit Completo com Atuador',
          appliesToNotes: 'Com Atuador Hidráulico de Embreagem',
        },
        {
          id: 'rolamento_mecanico',
          label: 'Com Rolamento Mecânico (Acionamento por Cabo)',
          description: 'Alavanca de garfo externa acionada por cabo de aço.',
          badge: 'Com Rolamento Tradicional',
          appliesToNotes: 'Com Rolamento Mecânico (Cabo)',
        },
      ],
    });
  }

  // ==========================================
  // 5. AMORTECEDORES E SUSPENSÃO
  // ==========================================
  else if (
    part.includes('amortecedor') ||
    part.includes('mola') ||
    part.includes('pivo') ||
    part.includes('pivô') ||
    part.includes('bandeja') ||
    part.includes('terminal') ||
    part.includes('bucha')
  ) {
    questions.push({
      id: 'suspension_position',
      title: 'Qual é a posição no veículo a ser cotada?',
      subtitle: 'Amortecedores dianteiros e traseiros possuem códigos e pressões completamente distintas.',
      iconType: 'position',
      impactExplanation:
        'Amortecedores dianteiros trabalham como colunas estruturais MacPherson com suporte para bieleta. Os traseiros são telescópicos independentes.',
      required: true,
      defaultSelectedId: 'dianteiro_par',
      options: [
        {
          id: 'dianteiro_par',
          label: 'Dianteiro (Par - Lado Direito + Lado Esquerdo)',
          description: 'Recomenda-se trocar sempre o par para estabilidade perfeita.',
          badge: 'Par Dianteiro',
          appliesToNotes: 'Posição Dianteira (Troca do Par)',
        },
        {
          id: 'traseiro_par',
          label: 'Traseiro (Par - Lado Direito + Lado Esquerdo)',
          description: 'Amortecedores traseiros de absorção de carga.',
          badge: 'Par Traseiro',
          appliesToNotes: 'Posição Traseira (Troca do Par)',
        },
        {
          id: 'dianteiro_esquerdo',
          label: 'Apenas Dianteiro Esquerdo (Lado Motorista)',
          description: 'Peça individual LE.',
          appliesToNotes: 'Lado Esquerdo Dianteiro',
        },
        {
          id: 'dianteiro_direito',
          label: 'Apenas Dianteiro Direito (Lado Passageiro)',
          description: 'Peça individual LD.',
          appliesToNotes: 'Lado Direito Dianteiro',
        },
      ],
    });
  }

  // ==========================================
  // 6. VÁLVULA TERMOSTÁTICA & SENSORES
  // ==========================================
  else if (
    part.includes('termostat') ||
    part.includes('cebolao') ||
    part.includes('cebolão') ||
    part.includes('temperatura') ||
    part.includes('carcaca') ||
    part.includes('carcaça')
  ) {
    questions.push({
      id: 'thermostat_housing',
      title: 'Precisa da Carcaça Completa ou apenas do Refil / Válvula?',
      subtitle: 'Em muitos motores brasileiros a carcaça plástica original empena e racha, necessitando substituição do conjunto.',
      iconType: 'engine',
      impactExplanation:
        'Marcas como Valclei e MTE fornecem tanto o refil metálico quanto a carcaça completa em alumínio ou plástico com sensor já acoplado.',
      required: true,
      defaultSelectedId: 'carcaca_completa',
      options: [
        {
          id: 'carcaca_completa',
          label: 'Válvula Termostática COM Carcaça Completa e Sensores',
          description: 'Solução definitiva para vazamentos comuns nas conexões do motor.',
          badge: 'Mais Recomendada no Balcão',
          appliesToNotes: 'Com Carcaça Completa e Junta/Sensor',
        },
        {
          id: 'apenas_refil',
          label: 'Apenas o Refil / Termostato Interno',
          description: 'Para quem já tem a carcaça em perfeito estado de vedação.',
          badge: 'Econômica',
          appliesToNotes: 'Apenas Refil do Termostato',
        },
      ],
    });
  }

  // ==========================================
  // 7. CORREIAS E TENSIONADORES
  // ==========================================
  else if (part.includes('correia') || part.includes('tensor') || part.includes('poly')) {
    questions.push({
      id: 'belt_kit_scope',
      title: 'Deseja cotar o Kit Completo com Tensor ou apenas a Correia avulsa?',
      subtitle: 'Mais de 85% dos mecânicos e fabricantes exigem a troca conjunta do tensor para garantir a correia.',
      iconType: 'engine',
      impactExplanation:
        'Kits de distribuição (ex: Continental CT1049K2 / Gates KS201) incluem o rolamento tensor balanceado de fábrica, eliminando retrabalho de desmontagem do motor.',
      required: true,
      defaultSelectedId: 'kit_completo',
      options: [
        {
          id: 'kit_completo',
          label: 'Kit Completo (Correia Dentada + Tensor Automático)',
          description: 'Garantia total de fábrica Continental / Gates / Dayco.',
          badge: 'Recomendação de Fábrica',
          appliesToNotes: 'Kit Correia Dentada e Tensor',
        },
        {
          id: 'apenas_correia',
          label: 'Apenas a Correia Sincronizadora Avulsa',
          description: 'Caso o tensor já tenha sido trocado recentemente.',
          badge: 'Correia Avulsa',
          appliesToNotes: 'Apenas Correia Sincronizadora',
        },
      ],
    });
  }

  // ==========================================
  // CASO GERAL: Se for peça não mapeada, verificar Ar Condicionado e Direção
  // ==========================================
  else {
    questions.push({
      id: 'general_ac_steering',
      title: 'O veículo possui Ar Condicionado e Direção Hidráulica?',
      subtitle: 'Configurações de correias de acessórios, suportes e radiadores variam conforme os opcionais.',
      iconType: 'ac',
      impactExplanation: 'Garante que os códigos de correias poly-v, alternador e suportes estejam 100% corretos.',
      required: false,
      defaultSelectedId: 'completo',
      options: [
        {
          id: 'completo',
          label: 'Com Ar Condicionado e Direção Hidráulica (Completo)',
          appliesToNotes: 'Com Ar Condicionado e Direção Hidráulica',
        },
        {
          id: 'sem_ar_com_dh',
          label: 'Sem Ar Condicionado, com Direção Hidráulica',
          appliesToNotes: 'Sem Ar Condicionado, com Direção Hidráulica',
        },
        {
          id: 'basico',
          label: 'Básico (Sem Ar Condicionado e Sem Direção)',
          appliesToNotes: 'Básico (Sem Ar e Sem Direção Hidráulica)',
        },
      ],
    });
  }

  return questions;
}

export function applyAnswersToSearchRequest(
  originalRequest: SearchRequest,
  selectedAnswers: Record<string, string>,
  questions: PrecisionQuestion[]
): SearchRequest {
  const existingNotes = (originalRequest.notes || '')
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);

  // Remove stale contradicting AC / transmission tokens before re-applying user selections
  const hasAcSelection = Boolean(selectedAnswers['radiator_ac']);
  const hasTransSelection = Boolean(selectedAnswers['radiator_trans']);

  const filteredNotes = existingNotes.filter((token) => {
    const low = token.toLowerCase();
    if (hasAcSelection && (low.includes('sem ar') || low.includes('com ar') || low.includes('ar condicionado'))) {
      return false;
    }
    if (hasTransSelection && (low.includes('câmbio manual') || low.includes('cambio manual') || low.includes('câmbio automático') || low.includes('cambio automatico'))) {
      return false;
    }
    return true;
  });

  let finalTransmission = originalRequest.transmission || '';

  for (const q of questions) {
    const chosenOptionId = selectedAnswers[q.id];
    if (!chosenOptionId) continue;

    const opt = q.options.find((o) => o.id === chosenOptionId);
    if (!opt) continue;

    // Check transmission
    if (q.id === 'radiator_trans') {
      if (chosenOptionId === 'automatica') {
        finalTransmission = 'Automático';
      } else if (chosenOptionId === 'manual') {
        finalTransmission = 'Manual';
      }
    }

    if (opt.appliesToNotes) {
      const optNoteLower = opt.appliesToNotes.toLowerCase();
      const alreadyIncluded = filteredNotes.some((t) => t.toLowerCase().includes(optNoteLower));
      if (!alreadyIncluded) {
        filteredNotes.push(opt.appliesToNotes);
      }
    }
  }

  return {
    ...originalRequest,
    notes: filteredNotes.join(', '),
    transmission: finalTransmission,
  };
}
