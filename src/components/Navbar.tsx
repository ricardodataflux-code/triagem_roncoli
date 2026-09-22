import React from 'react';
import { Sparkles, PhoneCall, History, Moon, Sun, RotateCcw, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  onNewSearch: () => void;
  historyCount: number;
  onToggleHistory: () => void;
  isHistoryOpen: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  darkMode,
  setDarkMode,
  onNewSearch,
  historyCount,
  onToggleHistory,
  isHistoryOpen,
}) => {
  return (
    <header
      id="main-app-header"
      className={`border-b sticky top-0 z-40 backdrop-blur-md transition-colors ${
        darkMode
          ? 'bg-zinc-950/90 border-zinc-800/80 text-zinc-100'
          : 'bg-white/95 border-zinc-200/90 text-zinc-900 shadow-2xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center border border-zinc-800 dark:border-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-zinc-950 dark:text-white">
                Busca Peças IA
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-semibold uppercase tracking-widest px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 dark:bg-zinc-400"></span>
                CATÁLOGO AUTOMOTIVO
              </span>
            </div>
            <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 tracking-tight">
              OEM & Referências Cruzadas para Balcão e Televendas
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* New Search Button */}
          <button
            id="btn-new-inquiry"
            type="button"
            onClick={onNewSearch}
            className={`hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              darkMode
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700/80 hover:border-zinc-600'
                : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200 hover:border-zinc-300 shadow-2xs'
            }`}
            title="Limpar formulário para nova consulta"
          >
            <RotateCcw className="w-3.5 h-3.5 text-zinc-500" />
            Nova Consulta
          </button>

          {/* History Toggle */}
          <button
            id="btn-toggle-history"
            type="button"
            onClick={onToggleHistory}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              isHistoryOpen
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-950 dark:border-white'
                : darkMode
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700/80 hover:border-zinc-600'
                : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200 hover:border-zinc-300 shadow-2xs'
            }`}
          >
            <History className="w-3.5 h-3.5 text-zinc-500" />
            <span className="hidden md:inline">Histórico</span>
            {historyCount > 0 && (
              <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono font-bold ${
                isHistoryOpen
                  ? 'bg-white/20 text-white dark:bg-black/20 dark:text-zinc-900'
                  : 'bg-zinc-200 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200'
              }`}>
                {historyCount}
              </span>
            )}
          </button>

          {/* Counter Service Badge */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border ${
              darkMode ? 'bg-zinc-900/80 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200/80 text-zinc-600'
            }`}
          >
            <PhoneCall className="w-3 h-3 text-zinc-400" />
            <span className="text-[11px] font-medium tracking-tight">Atendimento Balcão</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            id="btn-toggle-dark-mode"
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-lg border transition-all ${
              darkMode
                ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-800 hover:text-white'
                : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border-zinc-200/90 shadow-2xs hover:text-black'
            }`}
            aria-label="Alternar tema escuro/claro"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};

