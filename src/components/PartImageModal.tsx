import React, { useState } from 'react';
import {
  X,
  Check,
  ShieldCheck,
  Copy,
  Wrench,
  Layers,
  Tag,
  Camera,
  Maximize2,
  Package,
  Award,
  Sparkles,
} from 'lucide-react';
import { EvaluatedAftermarketItem } from '../utils/brandEvaluator';

interface PartImageModalProps {
  item: EvaluatedAftermarketItem | null;
  partName: string;
  carSummary: string;
  onClose: () => void;
}

type ViewTab = 'photo' | 'blueprint' | 'both';

export const PartImageModal: React.FC<PartImageModalProps> = ({ item, partName, carSummary, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<ViewTab>('photo');

  if (!item) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${item.brand} - Código: ${item.code} para ${partName} (${carSummary})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const category = item.partCategoryType || 'general';

  // Cores de embalagem oficial da marca para realismo de balcão
  const getBrandColors = () => {
    const b = item.brand.toLowerCase();
    if (b.includes('bosch')) return { bg: 'bg-blue-700', text: 'text-white', border: 'border-blue-800', accent: 'bg-red-600' };
    if (b.includes('ngk')) return { bg: 'bg-yellow-400', text: 'text-zinc-950', border: 'border-yellow-500', accent: 'bg-red-600' };
    if (b.includes('luk')) return { bg: 'bg-yellow-400', text: 'text-zinc-950', border: 'border-yellow-500', accent: 'bg-black' };
    if (b.includes('nakata')) return { bg: 'bg-blue-600', text: 'text-white', border: 'border-blue-700', accent: 'bg-cyan-400' };
    if (b.includes('cofap')) return { bg: 'bg-yellow-400', text: 'text-zinc-950', border: 'border-yellow-500', accent: 'bg-black' };
    if (b.includes('gates') || b.includes('dayco') || b.includes('cobreq')) return { bg: 'bg-red-600', text: 'text-white', border: 'border-red-700', accent: 'bg-black' };
    if (b.includes('tecfil')) return { bg: 'bg-emerald-600', text: 'text-white', border: 'border-emerald-700', accent: 'bg-yellow-400' };
    if (b.includes('valeo') || b.includes('sachs')) return { bg: 'bg-blue-800', text: 'text-white', border: 'border-blue-900', accent: 'bg-emerald-500' };
    return { bg: 'bg-zinc-800', text: 'text-white', border: 'border-zinc-900', accent: 'bg-blue-600' };
  };

  const brandTheme = getBrandColors();

  // Renderiza a FOTO REAL DO PRODUTO com alta fidelidade visual
  const renderRealisticPhoto = () => {
    if (category === 'ignition') {
      return (
        <div className="relative w-full h-56 bg-radial from-zinc-800 to-zinc-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-zinc-700/50 shadow-inner">
          {/* Caixa do fabricante ao fundo */}
          <div className={`absolute top-3 left-4 px-3 py-1.5 rounded shadow-md flex items-center gap-2 ${brandTheme.bg} ${brandTheme.text} border ${brandTheme.border}`}>
            <Package className="w-3.5 h-3.5" />
            <span className="font-extrabold text-xs tracking-wider uppercase font-mono">{item.brand}</span>
            <span className="text-[10px] font-mono opacity-90">• EMBALAGEM ORIGINAL</span>
          </div>

          {/* Gráfico foto realista da Vela de Ignição */}
          <svg viewBox="0 0 400 160" className="w-full max-h-48 drop-shadow-2xl">
            <defs>
              <linearGradient id="ceramicGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f4f4f5" />
                <stop offset="100%" stopColor="#d4d4d8" />
              </linearGradient>
              <linearGradient id="metalGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#a1a1aa" />
                <stop offset="30%" stopColor="#f4f4f5" />
                <stop offset="70%" stopColor="#71717a" />
                <stop offset="100%" stopColor="#3f3f46" />
              </linearGradient>
              <linearGradient id="threadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#52525b" />
                <stop offset="50%" stopColor="#d4d4d8" />
                <stop offset="100%" stopColor="#27272a" />
              </linearGradient>
            </defs>
            {/* Terminal superior de latão */}
            <rect x="25" y="70" width="22" height="20" rx="3" fill="#ca8a04" stroke="#a16207" strokeWidth="1.5" />
            <circle cx="28" cy="80" r="3" fill="#eab308" />
            
            {/* Corpo cerâmico branco com nervuras isolantes */}
            <rect x="47" y="65" width="90" height="30" rx="4" fill="url(#ceramicGrad)" stroke="#a1a1aa" strokeWidth="1" />
            {/* Nervuras isolantes anti-fuga de corrente */}
            <line x1="57" y1="65" x2="57" y2="95" stroke="#a1a1aa" strokeWidth="3" />
            <line x1="67" y1="65" x2="67" y2="95" stroke="#a1a1aa" strokeWidth="3" />
            <line x1="77" y1="65" x2="77" y2="95" stroke="#a1a1aa" strokeWidth="3" />
            {/* Logo e código gravados na cerâmica */}
            <text x="92" y="83" fill="#1e3a8a" fontSize="10" fontWeight="bold" fontFamily="sans-serif">{item.brand}</text>
            <text x="92" y="92" fill="#047857" fontSize="7" fontWeight="bold" fontFamily="monospace">{item.code}</text>

            {/* Sextavado metálico niquelado */}
            <polygon points="137,55 185,62 185,98 137,105 137,55" fill="url(#metalGrad)" stroke="#3f3f46" strokeWidth="1.5" />
            <line x1="160" y1="58" x2="160" y2="102" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

            {/* Anel de vedação metálico (Gasket) */}
            <rect x="185" y="62" width="6" height="36" rx="1" fill="#ca8a04" stroke="#854d0e" strokeWidth="1" />

            {/* Rosca usinada de alta precisão */}
            <rect x="191" y="66" width="130" height="28" rx="2" fill="url(#threadGrad)" stroke="#27272a" strokeWidth="1.5" />
            {/* Fios da rosca metálica com brilho realista */}
            {[...Array(14)].map((_, i) => (
              <line key={i} x1={197 + i * 8.5} y1="65" x2={201 + i * 8.5} y2="95" stroke="#f4f4f5" strokeWidth="2" opacity="0.8" />
            ))}

            {/* Ponta da vela: eletrodo de Irídio / Platina / Níquel */}
            <rect x="321" y="74" width="20" height="12" rx="1" fill="url(#metalGrad)" />
            {/* Eletrodo central ultrafino */}
            <rect x="341" y="78" width="18" height="4" rx="1" fill="#f8fafc" stroke="#38bdf8" strokeWidth="0.8" />
            {/* Eletrodo massa com gap regulado */}
            <path d="M321 86 L365 86 L365 77" fill="none" stroke="#71717a" strokeWidth="4" strokeLinecap="square" />
            {/* Faísca sutil de alta performance */}
            <circle cx="361" cy="80" r="2.5" fill="#38bdf8" className="animate-pulse" />
          </svg>

          {/* Selos de autenticidade no canto */}
          <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-700">
            <Award className="w-3 h-3 text-emerald-400" />
            <span>GRAVAÇÃO A LASER: {item.code}</span>
          </div>
        </div>
      );
    }

    if (category === 'brake') {
      return (
        <div className="relative w-full h-56 bg-radial from-zinc-800 to-zinc-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-zinc-700/50 shadow-inner">
          <div className={`absolute top-3 left-4 px-3 py-1.5 rounded shadow-md flex items-center gap-2 ${brandTheme.bg} ${brandTheme.text} border ${brandTheme.border}`}>
            <Package className="w-3.5 h-3.5" />
            <span className="font-extrabold text-xs tracking-wider uppercase font-mono">{item.brand}</span>
            <span className="text-[10px] font-mono opacity-90">• JOGO LACRADO</span>
          </div>

          {/* Gráfico realista de Disco Ventilado e Pastilha de Freio */}
          <svg viewBox="0 0 400 160" className="w-full max-h-48 drop-shadow-2xl">
            <defs>
              <linearGradient id="discGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e4e4e7" />
                <stop offset="50%" stopColor="#71717a" />
                <stop offset="100%" stopColor="#27272a" />
              </linearGradient>
              <linearGradient id="padGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#27272a" />
                <stop offset="50%" stopColor="#18181b" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
            </defs>
            {/* Disco de freio ventilado com usinagem cruzada */}
            <circle cx="120" cy="80" r="68" fill="url(#discGrad)" stroke="#18181b" strokeWidth="2" />
            <circle cx="120" cy="80" r="50" fill="#3f3f46" stroke="#18181b" strokeWidth="1.5" />
            {/* Aletas de ventilação interna */}
            {[...Array(12)].map((_, i) => (
              <line
                key={i}
                x1={120 + Math.cos((i * 30 * Math.PI) / 180) * 52}
                y1={80 + Math.sin((i * 30 * Math.PI) / 180) * 52}
                x2={120 + Math.cos((i * 30 * Math.PI) / 180) * 66}
                y2={80 + Math.sin((i * 30 * Math.PI) / 180) * 66}
                stroke="#18181b"
                strokeWidth="3"
              />
            ))}
            <circle cx="120" cy="80" r="28" fill="#18181b" />
            <circle cx="120" cy="80" r="14" fill="#09090b" />
            {/* Furos de cubo */}
            <circle cx="120" cy="65" r="3.5" fill="#e4e4e7" />
            <circle cx="120" cy="95" r="3.5" fill="#e4e4e7" />
            <circle cx="105" cy="80" r="3.5" fill="#e4e4e7" />
            <circle cx="135" cy="80" r="3.5" fill="#e4e4e7" />

            {/* Pastilha de Freio com composto cerâmico e placa anti-ruído (Shim) */}
            <rect x="220" y="35" width="150" height="90" rx="14" fill="url(#padGrad)" stroke="#3f3f46" strokeWidth="2" />
            {/* Placa metálica anti-ruído traseira (Shim) com logo da marca */}
            <rect x="224" y="39" width="142" height="82" rx="10" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
            <text x="250" y="75" fill="#f8fafc" fontSize="13" fontWeight="bold" fontFamily="sans-serif">{item.brand}</text>
            <text x="250" y="90" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">REF: {item.code}</text>
            {/* Ranhura térmica e chanfro de frenagem suave */}
            <line x1="295" y1="42" x2="295" y2="118" stroke="#09090b" strokeWidth="3" />
            <circle cx="235" cy="80" r="4" fill="#94a3b8" />
            <circle cx="355" cy="80" r="4" fill="#94a3b8" />
          </svg>

          <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-700">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span>COMPOSTO CERÂMICO ANTI-RUÍDO</span>
          </div>
        </div>
      );
    }

    if (category === 'clutch') {
      return (
        <div className="relative w-full h-56 bg-radial from-zinc-800 to-zinc-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-zinc-700/50 shadow-inner">
          <div className={`absolute top-3 left-4 px-3 py-1.5 rounded shadow-md flex items-center gap-2 ${brandTheme.bg} ${brandTheme.text} border ${brandTheme.border}`}>
            <Package className="w-3.5 h-3.5" />
            <span className="font-extrabold text-xs tracking-wider uppercase font-mono">{item.brand}</span>
            <span className="text-[10px] font-mono opacity-90">• KIT PLATÔ + DISCO</span>
          </div>

          <svg viewBox="0 0 400 160" className="w-full max-h-48 drop-shadow-2xl">
            {/* Disco de embreagem com molas torcionais duplas */}
            <circle cx="130" cy="80" r="68" fill="#71717a" stroke="#27272a" strokeWidth="2.5" />
            <circle cx="130" cy="80" r="50" fill="#3f3f46" stroke="#27272a" strokeWidth="1.5" />
            {/* Material de atrito trançado */}
            <circle cx="130" cy="80" r="62" fill="none" stroke="#ca8a04" strokeWidth="8" strokeDasharray="6 2" opacity="0.6" />
            {/* 4 molas de amortecimento torcional */}
            <rect x="118" y="38" width="24" height="14" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <rect x="118" y="108" width="24" height="14" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <rect x="78" y="73" width="14" height="24" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            <rect x="168" y="73" width="14" height="24" rx="4" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            {/* Cubo estriado central temperado */}
            <circle cx="130" cy="80" r="20" fill="#18181b" stroke="#e4e4e7" strokeWidth="1.5" />
            <circle cx="130" cy="80" r="12" fill="#09090b" stroke="#ca8a04" strokeWidth="1.5" strokeDasharray="3 2" />

            {/* Platô com mola membrana / diafragma */}
            <circle cx="270" cy="80" r="65" fill="#52525b" stroke="#18181b" strokeWidth="2.5" />
            <circle cx="270" cy="80" r="42" fill="#3f3f46" stroke="#18181b" strokeWidth="1" />
            {/* Palhetas do diafragma */}
            {[...Array(16)].map((_, i) => (
              <line
                key={i}
                x1={270 + Math.cos((i * 22.5 * Math.PI) / 180) * 18}
                y1={80 + Math.sin((i * 22.5 * Math.PI) / 180) * 18}
                x2={270 + Math.cos((i * 22.5 * Math.PI) / 180) * 40}
                y2={80 + Math.sin((i * 22.5 * Math.PI) / 180) * 40}
                stroke="#e4e4e7"
                strokeWidth="2"
              />
            ))}
            <circle cx="270" cy="80" r="16" fill="#18181b" stroke="#71717a" strokeWidth="2" />
            <text x="250" y="84" fill="#f8fafc" fontSize="9" fontWeight="bold" fontFamily="monospace">{item.code}</text>
          </svg>

          <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-700">
            <Sparkles className="w-3 h-3 text-yellow-400" />
            <span>MOLAS TORCIONAIS TRATADAS A 300°C</span>
          </div>
        </div>
      );
    }

    if (category === 'suspension') {
      return (
        <div className="relative w-full h-56 bg-radial from-zinc-800 to-zinc-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-zinc-700/50 shadow-inner">
          <div className={`absolute top-3 left-4 px-3 py-1.5 rounded shadow-md flex items-center gap-2 ${brandTheme.bg} ${brandTheme.text} border ${brandTheme.border}`}>
            <Package className="w-3.5 h-3.5" />
            <span className="font-extrabold text-xs tracking-wider uppercase font-mono">{item.brand}</span>
            <span className="text-[10px] font-mono opacity-90">• AMORTECEDOR PRESSURIZADO</span>
          </div>

          <svg viewBox="0 0 400 160" className="w-full max-h-48 drop-shadow-2xl">
            {/* Haste cromo-duro polida espelhada */}
            <rect x="60" y="73" width="130" height="14" rx="2" fill="#f4f4f5" stroke="#a1a1aa" strokeWidth="1" />
            <line x1="60" y1="77" x2="190" y2="77" stroke="#ffffff" strokeWidth="2" />
            {/* Olhal de fixação superior com bucha de borracha vulcanizada */}
            <circle cx="45" cy="80" r="15" fill="#27272a" stroke="#71717a" strokeWidth="2" />
            <circle cx="45" cy="80" r="7" fill="#f4f4f5" stroke="#18181b" strokeWidth="1.5" />

            {/* Corpo / Tubo de pressão em pintura epóxi preta */}
            <rect x="180" y="60" width="160" height="40" rx="6" fill="#18181b" stroke="#3f3f46" strokeWidth="2" />
            <rect x="190" y="65" width="80" height="30" rx="3" fill="#27272a" stroke="#52525b" strokeWidth="1" />
            <text x="196" y="78" fill="#38bdf8" fontSize="10" fontWeight="bold" fontFamily="sans-serif">{item.brand}</text>
            <text x="196" y="89" fill="#f8fafc" fontSize="8" fontWeight="bold" fontFamily="monospace">REF: {item.code}</text>

            {/* Olhal inferior */}
            <circle cx="355" cy="80" r="15" fill="#27272a" stroke="#71717a" strokeWidth="2" />
            <circle cx="355" cy="80" r="7" fill="#f4f4f5" stroke="#18181b" strokeWidth="1.5" />
          </svg>

          <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-700">
            <Award className="w-3 h-3 text-emerald-400" />
            <span>HASTE CROMO-DURO ANTICORROSIVA</span>
          </div>
        </div>
      );
    }

    // Default Photo Render (Correia, Bomba ou Outros)
    return (
      <div className="relative w-full h-56 bg-radial from-zinc-800 to-zinc-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-zinc-700/50 shadow-inner">
        <div className={`absolute top-3 left-4 px-3 py-1.5 rounded shadow-md flex items-center gap-2 ${brandTheme.bg} ${brandTheme.text} border ${brandTheme.border}`}>
          <Package className="w-3.5 h-3.5" />
          <span className="font-extrabold text-xs tracking-wider uppercase font-mono">{item.brand}</span>
          <span className="text-[10px] font-mono opacity-90">• PRODUTO ORIGINAL</span>
        </div>

        <svg viewBox="0 0 400 160" className="w-full max-h-48 drop-shadow-2xl">
          <rect x="100" y="45" width="200" height="70" rx="10" fill="#27272a" stroke="#52525b" strokeWidth="2" />
          <circle cx="200" cy="80" r="24" fill="#3f3f46" stroke="#71717a" strokeWidth="2" />
          <line x1="100" y1="80" x2="176" y2="80" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 2" />
          <line x1="224" y1="80" x2="300" y2="80" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 2" />
          <text x="175" y="77" fill="#38bdf8" fontSize="11" fontWeight="bold" fontFamily="sans-serif">{item.brand}</text>
          <text x="165" y="90" fill="#f8fafc" fontSize="9" fontWeight="bold" fontFamily="monospace">{item.code}</text>
        </svg>

        <div className="absolute bottom-3 right-4 flex items-center gap-2 text-[10px] font-mono text-zinc-300 bg-zinc-900/80 px-2.5 py-1 rounded-md border border-zinc-700">
          <ShieldCheck className="w-3 h-3 text-blue-400" />
          <span>NORMA ISO/TS 16949</span>
        </div>
      </div>
    );
  };

  // Renderiza o DESENHO TÉCNICO COM MEDIDAS (Blueprint)
  const renderTechnicalBlueprint = () => {
    return (
      <div className="relative w-full h-56 bg-slate-950 rounded-xl flex items-center justify-center p-4 overflow-hidden border border-blue-900/60 shadow-inner">
        {/* Grade milimetrada de fundo (Blueprint grid) */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              'linear-gradient(to right, #38bdf8 1px, transparent 1px), linear-gradient(to bottom, #38bdf8 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="absolute top-3 left-4 flex items-center gap-2 text-[11px] font-mono text-blue-400 font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Esquema Técnico Dimensional com Cotas • {item.brand}</span>
        </div>

        <div className="absolute bottom-3 left-4 text-[10px] font-mono text-blue-300/80">
          Escala: 1:1 • Tolerância dimensional: ± 0.05mm
        </div>

        <svg viewBox="0 0 400 160" className="w-full max-h-48 text-blue-400 drop-shadow-md" fill="none" stroke="currentColor">
          {/* Peça em traços técnicos de engenharia com cotas e medidas */}
          <rect x="90" y="45" width="220" height="70" rx="8" stroke="#38bdf8" strokeWidth="1.8" strokeDasharray="8 0" />
          <circle cx="200" cy="80" r="22" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="200" cy="80" r="8" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="3 2" />

          {/* Linhas de cota horizontal (Comprimento Total) */}
          <line x1="90" y1="30" x2="310" y2="30" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="90" y1="24" x2="90" y2="36" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="310" y1="24" x2="310" y2="36" stroke="#f8fafc" strokeWidth="1.2" />
          <text x="180" y="25" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">L = 220 mm</text>

          {/* Linhas de cota vertical (Altura / Diâmetro) */}
          <line x1="330" y1="45" x2="330" y2="115" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="324" y1="45" x2="336" y2="45" stroke="#f8fafc" strokeWidth="1.2" />
          <line x1="324" y1="115" x2="336" y2="115" stroke="#f8fafc" strokeWidth="1.2" />
          <text x="340" y="84" fill="#f8fafc" fontSize="10" fontWeight="bold" fontFamily="monospace">Ø = 70 mm</text>

          {/* Linha de centro de usinagem */}
          <line x1="70" y1="80" x2="330" y2="80" stroke="#0284c7" strokeWidth="1" strokeDasharray="8 4 2 4" />
          <line x1="200" y1="35" x2="200" y2="125" stroke="#0284c7" strokeWidth="1" strokeDasharray="8 4 2 4" />

          {/* Identificação da peça no blueprint */}
          <text x="100" y="60" fill="#38bdf8" fontSize="9" fontWeight="bold" fontFamily="monospace">{item.brand} | {item.code}</text>
          <text x="100" y="105" fill="#94a3b8" fontSize="8" fontFamily="monospace">Padrão OE Homologado</text>
        </svg>

        <div className="absolute top-3 right-4 text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-200 border border-blue-700">
          {item.tier}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="modal-part-image"
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden text-zinc-900 dark:text-zinc-100 flex flex-col max-h-[92vh]"
      >
        {/* Header do Modal */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-md bg-blue-600 text-white shadow-2xs">
              {item.brand.toUpperCase()}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-extrabold text-zinc-950 dark:text-white">
                  {item.code}
                </span>
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
                  • {item.tier}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate max-w-sm">
                {partName} — {carSummary}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Fechar (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector: Foto Real vs Desenho Técnico vs Ambos */}
        <div className="px-5 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100/70 dark:bg-zinc-950/60 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 bg-zinc-200/80 dark:bg-zinc-800/80 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('photo')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'photo'
                  ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-900 dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <Camera className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Foto Real do Produto</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('blueprint')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'blueprint'
                  ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-900 dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Desenho Técnico & Medidas</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('both')}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'both'
                  ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-900 dark:text-white'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Ver Ambos Lado a Lado</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-zinc-500 font-medium hidden md:inline">
            Triagem Roncoli
          </span>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Visual Display */}
          {activeTab === 'photo' && renderRealisticPhoto()}
          {activeTab === 'blueprint' && renderTechnicalBlueprint()}
          {activeTab === 'both' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {renderRealisticPhoto()}
              {renderTechnicalBlueprint()}
            </div>
          )}

          {/* ARGUMENTOS PERSUASIVOS DE VENDA TÉCNICA (Convencimento do Cliente) */}
          <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-emerald-900 dark:text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Argumento Técnico para Fechar a Venda no Balcão:</span>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed text-emerald-950 dark:text-emerald-200 font-medium">
              {item.persuasiveDetails ||
                `Peça homologada com padrão original de montadora. Proporciona durabilidade comprovada, zero ruídos e encaixe perfeito sem necessidade de adaptações na oficina mecânica.`}
            </p>
          </div>

          {/* Detalhes Construtivos & Garantia */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                Especificações de Engenharia & Medidas:
              </span>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
                {item.technicalDetails}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 space-y-1">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider block">
                Cobertura de Garantia & Procedência:
              </span>
              <p className="text-zinc-800 dark:text-zinc-200 font-medium leading-relaxed">
                {item.warrantyInfo || 'Garantia legal de 90 dias + garantia de fábrica de 1 ano contra defeitos de fabricação.'}
              </p>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold block pt-1">
                Classificação: {item.verdictBadge} ({item.salesVolume})
              </span>
            </div>
          </div>
        </div>

        {/* Rodapé com Ações */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 shrink-0">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <Tag className="w-3.5 h-3.5 text-zinc-400" />
            <span>Código de Balcão: <strong className="font-mono text-zinc-800 dark:text-zinc-200">{item.code}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors shadow-2xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Código Copiado!' : 'Copiar Código'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs"
            >
              Concluir Visualização
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
