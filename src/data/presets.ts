import { SearchRequest } from '../types';

export interface CarPreset {
  title: string;
  subtitle: string;
  data: SearchRequest;
}

export const POPULAR_PRESETS: CarPreset[] = [
  {
    title: "Corsa Frente Montana 1.4 2012",
    subtitle: "Pastilha de freio dianteira (Cobreq N-360)",
    data: {
      part: "Pastilha de freio dianteira",
      model: "Chevrolet Corsa Hatch / Sedan",
      year: "2012",
      engine: "1.4 8V Econoflex",
      notes: "Frente Montana, Sistema Teves / Varga, Disco ventilado 240mm",
    },
  },
  {
    title: "VW Gol 1.0 Flex 2015",
    subtitle: "Bomba d'água",
    data: {
      part: "Bomba d'água",
      model: "Volkswagen Gol G6",
      year: "2015",
      engine: "1.0 8V Total Flex (EA111)",
      notes: "Com ar condicionado e direção hidráulica",
    },
  },
  {
    title: "Chevrolet Onix 1.0 2018",
    subtitle: "Pastilha de freio dianteira",
    data: {
      part: "Pastilha de freio dianteira",
      model: "Chevrolet Onix",
      year: "2018",
      engine: "1.0 8V SPE/4 Flex",
      notes: "Com freio ABS",
    },
  },
  {
    title: "Hyundai HB20 1.0 12V 2019",
    subtitle: "Kit Correia Dentada / Tensor",
    data: {
      part: "Kit Correia Dentada e Tensor",
      model: "Hyundai HB20",
      year: "2019",
      engine: "1.0 12V Kappa 3 Cilindros Flex",
      notes: "Verificar se é corrente ou correia de acessórios",
    },
  },
  {
    title: "Fiat Strada 1.4 2017",
    subtitle: "Amortecedor Dianteiro",
    data: {
      part: "Amortecedor Dianteiro",
      model: "Fiat Strada Working / Hard Working",
      year: "2017",
      engine: "1.4 8V Fire Flex",
      notes: "Par dianteiro, com mola standard",
    },
  },
  {
    title: "Toyota Corolla 2.0 2016",
    subtitle: "Jogo de Velas de Ignição",
    data: {
      part: "Jogo de Velas de Ignição",
      model: "Toyota Corolla GLi / XEi / Altis",
      year: "2016",
      engine: "2.0 16V Dual VVT-i Flex",
      transmission: "Automático CVT",
      notes: "Preferência Iridium",
    },
  },
  {
    title: "Ford Ka 1.0 2019",
    subtitle: "Correia Dentada Banhada a Óleo",
    data: {
      part: "Correia Dentada",
      model: "Ford Ka Sedan / Hatch",
      year: "2019",
      engine: "1.0 12V 3 Cilindros Ti-VCT Flex (Banhada a óleo)",
      notes: "Kit correia e tensor para substituição preventiva",
    },
  },
];

export const POPULAR_PARTS_SUGGESTIONS = [
  "Bomba d'água",
  "Pastilha de freio dianteira",
  "Kit Correia Dentada",
  "Amortecedor dianteiro",
  "Amortecedor traseiro",
  "Jogo de velas de ignição",
  "Bobina de ignição",
  "Sonda Lambda (Sensor de Oxigênio)",
  "Sensor de temperatura da água",
  "Cilindro mestre de freio",
  "Disco de freio dianteiro ventilado",
  "Kit de Embreagem (Platô, Disco e Rolamento)",
  "Radiador de água",
  "Filtro de óleo",
  "Filtro de combustível",
  "Pivô da suspensão dianteira",
  "Terminal de direção",
  "Bieleta da barra estabilizadora",
  "Rolamento de roda dianteiro com ABS",
  "Junta do cabeçote",
];
