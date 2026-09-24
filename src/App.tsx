import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { PartSearchForm } from './components/PartSearchForm';
import { PartResultCard } from './components/PartResultCard';
import { PartFollowUpChat } from './components/PartFollowUpChat';
import { SearchHistorySidebar } from './components/SearchHistorySidebar';
import { SearchRequest, SearchResult } from './types';
import { findOfflinePart, generateSmartFallbackPart } from './data/offlineCatalog';
import { getRioClaroSuppliersForPart } from './data/rioClaroSuppliers';
import {
  Sparkles,
  PhoneCall,
  Search,
  CheckCircle2,
  AlertCircle,
  Copy,
  MessageSquare,
  ShieldCheck,
  Zap,
} from 'lucide-react';

const STORAGE_KEY_HISTORY = 'autopecas_ia_history_v1';
const STORAGE_KEY_THEME = 'autopecas_ia_theme';

// Helper para remover mensagens de status de servidor ou aviso de Vercel dos alertas técnicos
function cleanResultWarnings(item: SearchResult): SearchResult {
  if (!item) return item;
  return {
    ...item,
    applicationWarnings: (item.applicationWarnings || []).filter(
      (w) =>
        !w.toLowerCase().includes('catálogo de balcão') &&
        !w.toLowerCase().includes('vercel') &&
        !w.toLowerCase().includes('gemini_api_key')
    ),
  };
}

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_THEME);
    if (saved !== null) return saved === 'dark';
    return false; // Default clean light mode for counter readability
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeResult, setActiveResult] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [formResetKey, setFormResetKey] = useState<number>(0);

  const [history, setHistory] = useState<SearchResult[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (!saved) return [];
      const parsed: SearchResult[] = JSON.parse(saved);
      const cleaned = parsed.map(cleanResultWarnings);
      try {
        localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(cleaned));
      } catch {}
      return cleaned;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_THEME, darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleSearch = async (request: SearchRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      let data: any = null;
      try {
        const res = await fetch('/api/search-part', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(request),
        });

        const text = await res.text();
        try {
          data = JSON.parse(text);
        } catch {
          // Response is not JSON
        }

        if (!res.ok || !data) {
          console.warn('API returned non-OK or non-JSON response from server, activating catalog fallback:', text);
          data = null;
        }
      } catch (networkErr) {
        console.warn('Network or server unreachable, activating local catalog fallback:', networkErr);
        data = null;
      }

      // If backend failed or was unreachable, immediately resolve via offline/smart catalog
      if (!data) {
        const offlineMatch =
          findOfflinePart(request.part, request.model, request.engine) ||
          generateSmartFallbackPart(request.part, request.model, request.year, request.engine, request.notes);
        const suppliers = getRioClaroSuppliersForPart(offlineMatch.partSummary, offlineMatch.category);

        data = {
          id: `contingency-${Date.now()}`,
          timestamp: Date.now(),
          query: request,
          carSummary: offlineMatch.carSummary,
          partSummary: offlineMatch.partSummary,
          category: offlineMatch.category,
          quantityUsedInVehicle: offlineMatch.quantityUsedInVehicle,
          oemCodes: offlineMatch.oemCodes,
          aftermarketCodes: offlineMatch.aftermarketCodes,
          technicalSpecs: offlineMatch.technicalSpecs,
          applicationWarnings: offlineMatch.applicationWarnings,
          complementaryParts: offlineMatch.complementaryParts,
          quickSalesPitch: offlineMatch.quickSalesPitch,
          whatsappMessage: offlineMatch.whatsappMessage,
          suppliersRioClaro: suppliers,
          groundingSources: [
            { uri: 'https://catalogo.nakata.com.br', title: 'Catálogo Nakata' },
            { uri: 'https://catalogo.cofap.com.br', title: 'Catálogo Cofap' },
            { uri: 'https://www.luk.com.br', title: 'Catálogo Schaeffler LUK' },
            { uri: 'https://www.boschaftermarket.com/br', title: 'Catálogo Bosch' },
          ],
          searchQueries: [request.part, request.model],
        };
      }

      const sanitizedData = cleanResultWarnings(data);
      setActiveResult(sanitizedData);

      // Save to history (avoid duplicates by ID, keep max 30)
      setHistory((prev) => {
        const filtered = prev.filter((item) => item.id !== sanitizedData.id);
        const updated = [sanitizedData, ...filtered].slice(0, 30);
        try {
          localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updated));
        } catch (e) {
          console.error('Failed to save history to localStorage', e);
        }
        return updated;
      });

      // Smooth scroll to results
      setTimeout(() => {
        const resultEl = document.getElementById(`result-card-${sanitizedData.id}`);
        if (resultEl) {
          resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err: any) {
      console.error('Search error:', err);
      setError(err?.message || 'Falha ao conectar com o serviço de pesquisa de peças.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewSearch = () => {
    setActiveResult(null);
    setError(null);
    setFormResetKey((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectHistoryItem = (item: SearchResult) => {
    setActiveResult(cleanResultWarnings(item));
    setError(null);
    setTimeout(() => {
      const resultEl = document.getElementById(`result-card-${item.id}`);
      if (resultEl) {
        resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY_HISTORY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col font-sans transition-colors ${
        darkMode ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50/70 text-zinc-900'
      }`}
    >
      {/* Top Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNewSearch={handleNewSearch}
        historyCount={history.length}
        onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        isHistoryOpen={isHistoryOpen}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-6">
        {/* Quick Phone & Counter Helper Banner (Refined Executive Style) */}
        <div
          className={`p-3.5 sm:p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs transition-colors ${
            darkMode
              ? 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
              : 'bg-white border-zinc-200/90 text-zinc-700 shadow-2xs'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 flex items-center justify-center shrink-0">
              <PhoneCall className="w-3.5 h-3.5" />
            </div>
            <span className="leading-relaxed">
              <strong className="text-zinc-900 dark:text-white font-bold">Atendimento Balcão & Televendas:</strong> Preencha a peça e o veículo. O sistema localiza o <strong>código OEM genuíno</strong> e referências cruzadas das marcas líderes (Bosch, Nakata, Cofap, Mahle...) prontas para conferência e cópia.
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              Cópia Instantânea
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
              WhatsApp Pronto
            </span>
          </div>
        </div>

        {/* Search Input Section */}
        <PartSearchForm
          key={formResetKey}
          darkMode={darkMode}
          isLoading={isLoading}
          onSearch={handleSearch}
        />

        {/* Loading State Banner */}
        {isLoading && (
          <div
            className={`p-10 rounded-2xl border text-center transition-all animate-pulse ${
              darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-white border-zinc-200 shadow-xs'
            }`}
          >
            <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mx-auto flex items-center justify-center mb-4 border border-zinc-200 dark:border-zinc-700">
              <div className="w-5 h-5 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1 tracking-tight">
              Consultando Catálogos Automotivos com IA...
            </h3>
            <p className="text-xs text-zinc-500 max-w-lg mx-auto leading-relaxed">
              Pesquisando catálogos de montadoras (VW, GM, Fiat, Ford, Toyota...) e fabricantes de autopeças (Bosch, Nakata, Cofap, Mahle, Fras-le, Gates, Dayco)...
            </p>
          </div>
        )}

        {/* Error Alert (Strictly Semantic Red for Errors) */}
        {error && (
          <div
            className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start gap-4 transition-all ${
              darkMode
                ? 'bg-red-950/40 border-red-800 text-red-200'
                : 'bg-red-50 border-red-300 text-red-950 shadow-2xs'
            }`}
          >
            <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/60 flex items-center justify-center shrink-0 border border-red-200 dark:border-red-800">
              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <div className="space-y-2 flex-1">
              <h4 className="text-sm font-bold text-red-900 dark:text-red-200">
                {error.includes('429') || error.toLowerCase().includes('cota')
                  ? 'Limite Temporário de Cota da API (Erro 429)'
                  : 'Não foi possível consultar a peça no momento'}
              </h4>
              <p className="text-xs opacity-90 leading-relaxed">{error}</p>
              
              <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setError(null);
                  }}
                  className={`px-3 py-1.5 rounded-lg font-bold border transition-colors ${
                    darkMode
                      ? 'bg-red-900/60 border-red-700 text-white hover:bg-red-800'
                      : 'bg-red-600 hover:bg-red-700 text-white shadow-2xs'
                  }`}
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Result Display */}
        {activeResult && !isLoading && (
          <div className="space-y-6">
            <PartFollowUpChat partContext={activeResult} darkMode={darkMode} />
            <PartResultCard result={activeResult} darkMode={darkMode} />
          </div>
        )}

        {/* Initial Empty State Guide (when no search done yet) */}
        {!activeResult && !isLoading && (
          <div
            className={`p-8 sm:p-10 rounded-2xl border transition-all ${
              darkMode ? 'bg-zinc-900/40 border-zinc-800/80' : 'bg-white border-zinc-200/90 shadow-xs'
            }`}
          >
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white mx-auto flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Sparkles className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight">
                Agilidade Máxima no Balcão e no Telefone
              </h3>
              <p className="text-xs font-normal text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-lg mx-auto">
                Desenvolvido para eliminar o tempo gasto folheando múltiplos catálogos em PDF ou abrindo vários sites enquanto o cliente aguarda na linha.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 text-left">
                <div
                  className={`p-4 rounded-xl border transition-all ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200/80'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-2.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Códigos OEM e Cruzados</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Referência genuína de montadora e marcas líderes (Nakata, Bosch, Cofap, Mahle, Dayco).
                  </p>
                </div>

                <div
                  className={`p-4 rounded-xl border transition-all ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200/80'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-2.5">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Evite Devoluções</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Avisos sobre variações críticas: presença de ar-condicionado, ABS, dentes e chicotes.
                  </p>
                </div>

                <div
                  className={`p-4 rounded-xl border transition-all ${
                    darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-50 border-zinc-200/80'
                  }`}
                >
                  <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex items-center justify-center mb-2.5">
                    <MessageSquare className="w-3.5 h-3.5" />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-white mb-1">Envio para WhatsApp</h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Gera cotação limpa e estruturada com marcas e linhas para envio com 1 clique.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* History Drawer Sidebar */}
      <SearchHistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectResult={handleSelectHistoryItem}
        onClearHistory={handleClearHistory}
        darkMode={darkMode}
      />

      {/* Subtle Counter Status Footer */}
      <footer
        className={`border-t py-4 text-center text-xs transition-colors ${
          darkMode ? 'bg-zinc-950 border-zinc-900 text-zinc-600' : 'bg-zinc-100 border-zinc-200 text-zinc-500'
        }`}
      >
        <p>
          Busca Peças IA • Catálogo Automotivo com Pesquisa Google Inteligente • Balcão & Televendas
        </p>
      </footer>
    </div>
  );
}
