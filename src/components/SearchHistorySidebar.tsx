import React from 'react';
import { X, Trash2, Clock, Car, Wrench, ChevronRight } from 'lucide-react';
import { SearchResult } from '../types';

interface SearchHistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: SearchResult[];
  onSelectResult: (result: SearchResult) => void;
  onClearHistory: () => void;
  darkMode: boolean;
}

export const SearchHistorySidebar: React.FC<SearchHistorySidebarProps> = ({
  isOpen,
  onClose,
  history,
  onSelectResult,
  onClearHistory,
  darkMode,
}) => {
  if (!isOpen) return null;

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-2xs flex justify-end animate-fadeIn">
      <div
        className={`w-full max-w-md h-full flex flex-col shadow-2xl transition-all ${
          darkMode ? 'bg-zinc-900 text-zinc-100 border-l border-zinc-800' : 'bg-white text-zinc-900 border-l border-zinc-200'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-500" />
            <h2 className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">Histórico de Atendimentos</h2>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              {history.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="text-xs text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white p-1 flex items-center gap-1 font-medium transition-colors"
                title="Limpar histórico"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Limpar</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {history.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <Clock className="w-8 h-8 mx-auto mb-2 opacity-30 text-zinc-400" />
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-300">Nenhum atendimento recente</p>
              <p className="text-xs mt-1 text-zinc-400 max-w-xs mx-auto">
                As pesquisas de peças feitas no balcão aparecerão aqui para troca rápida
              </p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectResult(item);
                  onClose();
                }}
                className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group ${
                  darkMode
                    ? 'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                    : 'bg-zinc-50/70 border-zinc-200/90 hover:border-zinc-400 hover:bg-white shadow-2xs'
                }`}
              >
                <div className="space-y-1 overflow-hidden pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-medium text-zinc-400">
                      {formatTime(item.timestamp)}
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 truncate">
                      {item.partSummary}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 truncate">
                    <Car className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                    <span className="truncate">{item.carSummary}</span>
                  </div>

                  {item.quantityUsedInVehicle && (
                    <div className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
                      Qtd: {item.quantityUsedInVehicle}
                    </div>
                  )}

                  {/* OEM or Brand Snippet */}
                  {item.oemCodes && item.oemCodes.length > 0 ? (
                    <div className="text-xs font-mono font-bold text-zinc-950 dark:text-zinc-200 truncate">
                      OEM: {item.oemCodes[0].code}
                    </div>
                  ) : item.aftermarketCodes && item.aftermarketCodes.length > 0 ? (
                    <div className="text-xs font-mono font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                      {item.aftermarketCodes[0].brand}: {item.aftermarketCodes[0].code}
                    </div>
                  ) : null}
                </div>

                <ChevronRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-0.5 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 text-center">
          Salvo localmente no navegador deste computador
        </div>
      </div>
    </div>
  );
};
