export interface SearchRequest {
  part: string;
  model: string;
  year: string;
  engine: string;
  notes?: string;
  transmission?: string;
  vinOrPlate?: string;
}

export interface OemCode {
  code: string;
  brandOrOrigin: string;
  notes?: string;
}

export interface CrossReference {
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
  imageUrl?: string;
  catalogUrl?: string;
  officialBrandMatch?: boolean;
  codeSyntax?: string;
}

export interface TechnicalSpec {
  label: string;
  value: string;
}

export interface ComplementaryPart {
  name: string;
  reason: string;
  suggestedAction?: string;
  referenceCodes?: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface SupplierRioClaro {
  name: string;
  category: string;
  address: string;
  phone: string;
  neighborhood: string;
  specialty: string;
}

export interface SearchResult {
  id: string;
  timestamp: number;
  query: SearchRequest;
  carSummary: string;
  partSummary: string;
  category?: string;
  quantityUsedInVehicle?: string;
  oemCodes: OemCode[];
  aftermarketCodes: CrossReference[];
  technicalSpecs: TechnicalSpec[];
  applicationWarnings: string[];
  complementaryParts: ComplementaryPart[];
  priceRangeBRL?: string;
  quickSalesPitch: string;
  whatsappMessage: string;
  groundingSources: GroundingSource[];
  searchQueries: string[];
  rawAiExplanation?: string;
  suppliersRioClaro?: SupplierRioClaro[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
