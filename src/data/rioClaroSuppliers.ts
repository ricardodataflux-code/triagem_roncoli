import { SupplierRioClaro } from '../types';

export const RIO_CLARO_SUPPLIERS: SupplierRioClaro[] = [
  {
    name: 'Castelo Autopeças Rio Claro',
    category: 'Distribuidora & Varejo de Autopeças',
    address: 'Rua 14, 1850',
    neighborhood: 'Consolação',
    phone: '(19) 3522-8000',
    specialty: 'Amortecedores (Cofap, Nakata, Monroe), freios (Cobreq, Fras-le), filtros (Tecfil) e correias (Continental, Gates).',
  },
  {
    name: 'Autopeças Central Rio Claro',
    category: 'Autopeças Linha Leve e Média',
    address: 'Avenida 1, 480',
    neighborhood: 'Centro',
    phone: '(19) 3524-1000',
    specialty: 'Embreagens (LUK, Valeo, Sachs), bombas d\'água (Urba, Schadek), arrefecimento e suspensão.',
  },
  {
    name: 'Uniauto Autopeças Rio Claro',
    category: 'Distribuidora de Peças e Acessórios',
    address: 'Av. Conde Francisco Matarazzo Jr, 450',
    neighborhood: 'Vila Paulista',
    phone: '(19) 3526-7000',
    specialty: 'Injeção eletrônica (Bosch, Magneti Marelli, DS), ignição (NGK), rolamentos (SKF, IMA) e sensores (Thomson, TSA).',
  },
  {
    name: 'Camilo Autopeças e Distribuição',
    category: 'Distribuidora Mecânica e Balcão',
    address: 'Rua 6, 2100',
    neighborhood: 'Santana',
    phone: '(19) 3534-4455',
    specialty: 'Linha pesada e leve: juntas de motor (Sabó, Taranto), componentes de motor (Mahle), bombas e tubos.',
  },
  {
    name: 'Varejão das Peças Rio Claro',
    category: 'Varejo Especializado em Reposição Rápida',
    address: 'Rua 1, 980',
    neighborhood: 'Bairro Saúde',
    phone: '(19) 3533-9000',
    specialty: 'Discos e pastilhas de freio, borrachas e coxins (Mobensani, Jahu), cabos de comando (Fania).',
  },
  {
    name: 'Cidade Azul Autopeças & Distribuição',
    category: 'Distribuidora Regional Rio Claro',
    address: 'Avenida Brasil, 1150',
    neighborhood: 'Vila Martins',
    phone: '(19) 3523-5500',
    specialty: 'Distribuição direta para oficinas: kits de correia dentada (Dayco, Gates), tensores e iluminação.',
  },
  {
    name: 'Elétrica & Injeção Rio Claro',
    category: 'Especializada em Elétrica e Injeção',
    address: 'Av. Visconde do Rio Claro, 2300',
    neighborhood: 'Centro',
    phone: '(19) 3534-7700',
    specialty: 'Bombas elétricas (Bosch, DS), bobinas de ignição (NGK, Vetor), atuadores, alternadores e relés.',
  },
  {
    name: 'Fort Peças Linha Leve Rio Claro',
    category: 'Peças de Reposição e Mecânica Geral',
    address: 'Rua 9, 320',
    neighborhood: 'Alto do Santana',
    phone: '(19) 3525-3300',
    specialty: 'Termostáticas (Valclei, Wahler, Iguaçu), mangueiras (Jamaica), reservatórios (Florio) e kits de suspensão (Novo Kit).',
  },
];

export function getRioClaroSuppliersForPart(partName?: string, category?: string): SupplierRioClaro[] {
  // Retorna os melhores fornecedores e distribuidoras de Rio Claro-SP (máximo 6 lojas)
  const p = (partName || '').toLowerCase() + ' ' + (category || '').toLowerCase();

  // Ordena os fornecedores trazendo primeiro aqueles com especialidade relacionada
  const sorted = [...RIO_CLARO_SUPPLIERS].sort((a, b) => {
    const aMatch = a.specialty.toLowerCase().split(' ').some(word => word.length > 3 && p.includes(word));
    const bMatch = b.specialty.toLowerCase().split(' ').some(word => word.length > 3 && p.includes(word));
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return sorted.slice(0, 6);
}
