import React from 'react';
import { X, Check, ShieldCheck, Copy, Wrench, Layers, Tag } from 'lucide-react';
import { EvaluatedAftermarketItem } from '../utils/brandEvaluator';

interface PartImageModalProps {
  item: EvaluatedAftermarketItem | null;
  partName: string;
  carSummary: string;
  onClose: () => void;
}

export const PartImageModal: React.FC<PartImageModalProps> = ({ item, partName, carSummary, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.brand} - Código: ${item.code} para ${partName} (${carSummary})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper visual blueprint svg conforme categoria da peça
  const renderVisualIllustration = () => {
    const category = item.partCategoryType || 'general';

    // SVG técnicos limpos e estilizados em monocromático técnico (sem cores berrantes)
    if (category === 'clutch') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-44 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor">
          <circle cx="110" cy="100" r="75" strokeWidth="2.5" className="stroke-zinc-400 dark:stroke-zinc-600" />
          <circle cx="110" cy="100" r="55" strokeWidth="1.5" strokeDasharray="4 3" />
          <circle cx="110" cy="100" r="28" strokeWidth="2" />
          {/* Molas do disco */}
          <rect x="98" y="55" width="24" height="12" rx="3" strokeWidth="1.5" className="fill-zinc-200 dark:fill-zinc-800" />
          <rect x="98" y="133" width="24" height="12" rx="3" strokeWidth="1.5" className="fill-zinc-200 dark:fill-zinc-800" />
          <rect x="55" y="94" width="12" height="24" rx="3" strokeWidth="1.5" className="fill-zinc-200 dark:fill-zinc-800" />
          <rect x="153" y="94" width="12" height="24" rx="3" strokeWidth="1.5" className="fill-zinc-200 dark:fill-zinc-800" />
          {/* Platô / diafragma */}
          <circle cx="230" cy="100" r="65" strokeWidth="2" />
          <circle cx="230" cy="100" r="35" strokeWidth="1.5" />
          <path d="M230 45 L230 155 M175 100 L285 100 M190 60 L270 140 M190 140 L270 60" strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="230" cy="100" r="18" strokeWidth="2" className="stroke-zinc-500" />
        </svg>
      );
    }

    if (category === 'brake') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-44 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor">
          {/* Pastilha de freio */}
          <rect x="50" y="50" width="140" height="95" rx="14" strokeWidth="2" className="fill-zinc-100 dark:fill-zinc-900" />
          <path d="M50 80 Q120 70 190 80" strokeWidth="1.5" />
          <rect x="70" y="65" width="100" height="65" rx="8" strokeWidth="1.5" strokeDasharray="5 3" />
          <circle cx="70" cy="97" r="4" fill="currentColor" />
          <circle cx="170" cy="97" r="4" fill="currentColor" />
          <line x1="120" y1="65" x2="120" y2="130" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Disco de freio ventilado */}
          <circle cx="240" cy="100" r="60" strokeWidth="2" />
          <circle cx="240" cy="100" r="40" strokeWidth="1" strokeDasharray="4 2" />
          <circle cx="240" cy="100" r="20" strokeWidth="1.5" />
          <circle cx="240" cy="90" r="2.5" fill="currentColor" />
          <circle cx="240" cy="110" r="2.5" fill="currentColor" />
          <circle cx="230" cy="100" r="2.5" fill="currentColor" />
          <circle cx="250" cy="100" r="2.5" fill="currentColor" />
        </svg>
      );
    }

    if (category === 'suspension') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-44 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor">
          {/* Amortecedor telescópico */}
          <rect x="145" y="25" width="30" height="25" rx="4" strokeWidth="2" className="fill-zinc-200 dark:fill-zinc-800" />
          <rect x="155" y="50" width="10" height="60" strokeWidth="2" />
          <rect x="140" y="100" width="40" height="75" rx="5" strokeWidth="2.5" className="fill-zinc-100 dark:fill-zinc-900" />
          {/* Olhal inferior */}
          <circle cx="160" cy="185" r="10" strokeWidth="2" />
          {/* Mola espiral ao redor */}
          <path d="M125 55 Q160 45 195 55 Q160 68 125 78 Q160 90 195 100 Q160 112 125 124 Q160 135 195 145" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    }

    if (category === 'cooling') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-44 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor">
          {/* Bomba dágua / Carcaça */}
          <path d="M80 120 C80 60 140 40 200 60 C240 75 250 120 230 150 C210 175 140 175 100 160 Z" strokeWidth="2" className="fill-zinc-100 dark:fill-zinc-900" />
          <circle cx="170" cy="110" r="38" strokeWidth="2" />
          <circle cx="170" cy="110" r="14" strokeWidth="2" />
          {/* Aletas da turbina */}
          <path d="M170 72 L170 96 M170 124 L170 148 M132 110 L156 110 M184 110 L208 110" strokeWidth="2.5" />
          {/* Furos de fixação */}
          <circle cx="105" cy="75" r="5" strokeWidth="2" />
          <circle cx="230" cy="80" r="5" strokeWidth="2" />
          <circle cx="115" cy="150" r="5" strokeWidth="2" />
          <circle cx="215" cy="155" r="5" strokeWidth="2" />
        </svg>
      );
    }

    if (category === 'belt') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-44 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor">
          {/* Correia sincronizadora com polias */}
          <circle cx="95" cy="80" r="35" strokeWidth="2" />
          <circle cx="225" cy="125" r="45" strokeWidth="2" />
          <circle cx="150" cy="130" r="16" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M95 45 L225 80 M95 115 L140 145 M165 140 L225 170" strokeWidth="3" className="stroke-zinc-600 dark:stroke-zinc-300" />
          {/* Dentes da correia ilustrados */}
          <path d="M105 47 L115 50 M125 53 L135 56 M145 59 L155 62 M165 65 L175 68" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    if (category === 'ignition') {
      return (
        <svg viewBox="0 0 320 200" className="w-full h-44 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor">
          {/* Vela de ignição */}
          <rect x="70" y="90" width="30" height="20" rx="3" strokeWidth="2" />
          <rect x="100" y="85" width="55" height="30" rx="4" strokeWidth="2" className="fill-zinc-100 dark:fill-zinc-900" />
          <path d="M110 85 L110 115 M125 85 L125 115 M140 85 L140 115" strokeWidth="1" strokeDasharray="2 2" />
          {/* Hexágono da rosca */}
          <polygon points="155,75 180,85 180,115 155,125 155,75" strokeWidth="2" />
          {/* Rosca usinada */}
          <rect x="180" y="85" width="50" height="30" strokeWidth="2" />
          <line x1="190" y1="85" x2="190" y2="115" strokeWidth="1.5" />
          <line x1="200" y1="85" x2="200" y2="115" strokeWidth="1.5" />
          <line x1="210" y1="85" x2="210" y2="115" strokeWidth="1.5" />
          <line x1="220" y1="85" x2="220" y2="115" strokeWidth="1.5" />
          {/* Eletrodo */}
          <path d="M230 100 L250 100 L250 94" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    }

    // Default técnico
    return (
      <svg viewBox="0 0 320 200" className="w-full h-44 text-zinc-400 dark:text-zinc-500" fill="none" stroke="currentColor">
        <rect x="70" y="50" width="180" height="100" rx="10" strokeWidth="2" className="fill-zinc-100 dark:fill-zinc-900" />
        <circle cx="160" cy="100" r="30" strokeWidth="2" />
        <path d="M160 50 L160 70 M160 130 L160 150 M70 100 L130 100 M190 100 L250 100" strokeWidth="1.5" strokeDasharray="4 3" />
        <circle cx="95" cy="75" r="4" fill="currentColor" />
        <circle cx="225" cy="75" r="4" fill="currentColor" />
        <circle cx="95" cy="125" r="4" fill="currentColor" />
        <circle cx="225" cy="125" r="4" fill="currentColor" />
      </svg>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="modal-part-image"
        className="w-full max-w-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl overflow-hidden text-zinc-900 dark:text-zinc-100"
      >
        {/* Header do modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
              {item.brand.toUpperCase()}
            </span>
            <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
              {item.code}
            </span>
            <span className="text-xs text-zinc-500 font-sans">
              • {item.tier}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com visualização esquemática e dados técnicos */}
        <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Caixa de visualização técnica da peça */}
          <div className="relative border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 bg-zinc-50/70 dark:bg-zinc-950/60 flex flex-col items-center justify-center overflow-hidden">
            {/* Marca d'água técnica */}
            <div className="absolute top-2.5 left-3 flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500 text-[10px] font-mono uppercase tracking-wider">
              <Layers className="w-3 h-3" />
              <span>Esquema Técnico Dimensional • {item.brand}</span>
            </div>

            <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              Ref: {item.code}
            </div>

            <div className="my-2 py-2 flex items-center justify-center w-full">
              {renderVisualIllustration()}
            </div>

            <div className="w-full flex items-center justify-between pt-2 border-t border-zinc-200 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1">
                <Wrench className="w-3.5 h-3.5 text-zinc-400" />
                Conferência visual de encaixes, estrias e furações
              </span>
              <span className="font-mono text-zinc-600 dark:text-zinc-400 font-medium">
                Padrão Montadora
              </span>
            </div>
          </div>

          {/* Dados e aplicação */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {partName} - {item.brand}
              </h3>
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                {carSummary}
              </span>
            </div>
            
            {/* Argumento de venda convincente */}
            <div className="p-3 rounded-lg bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                <ShieldCheck className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
                <span>Argumento Técnico de Venda para o Cliente:</span>
              </div>
              <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
                {item.persuasiveDetails}
              </p>
            </div>

            {/* Especificação técnica e garantia */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/40">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-0.5">
                  Detalhes Construtivos
                </span>
                <span className="text-zinc-700 dark:text-zinc-300 leading-snug">
                  {item.technicalDetails}
                </span>
              </div>
              <div className="p-2.5 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/40">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider block mb-0.5">
                  Cobertura & Garantia
                </span>
                <span className="text-zinc-700 dark:text-zinc-300 leading-snug">
                  {item.warrantyInfo}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Rodapé com botões de ação */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Tag className="w-3.5 h-3.5 text-zinc-400" />
            <span>Classificação: <strong className="font-semibold text-zinc-700 dark:text-zinc-300">{item.verdictBadge}</strong> ({item.salesVolume})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-zinc-950 dark:text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copiado!' : 'Copiar Referência'}
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md text-xs font-medium bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
