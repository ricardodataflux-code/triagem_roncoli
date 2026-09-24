import React, { useState, useMemo } from 'react';
import { X, Search, ShieldCheck, CheckCircle2, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { OFFICIAL_CATALOG_CATEGORIES } from '../data/officialBrandRules';

interface OfficialCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
  darkMode: boolean;
}

export const OfficialCatalogModal: React.FC<OfficialCatalogModalProps> = ({
  isOpen,
  onClose,
  darkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCategories = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return OFFICIAL_CATALOG_CATEGORIES.map((cat) => {
      // If a specific category is selected and it doesn't match, return empty
      if (selectedCategory !== 'all' && cat.categoryName !== selectedCategory) {
        return { ...cat, brands: [] };
      }

      if (!term) return cat;

      const matchingBrands = cat.brands.filter((b) => {
        const brandMatch = b.brand.toLowerCase().includes(term);
        const prodMatch = b.products.some((p) => p.toLowerCase().includes(term));
        const descMatch = b.description.toLowerCase().includes(term);
        return brandMatch || prodMatch || descMatch;
      });

      return {
        ...cat,
        brands: matchingBrands,
      };
    }).filter((cat) => cat.brands.length > 0);
  }, [searchTerm, selectedCategory]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] rounded-2xl flex flex-col shadow-2xl border transition-all ${
          darkMode
            ? 'bg-zinc-950 border-zinc-800 text-zinc-100'
            : 'bg-white border-zinc-300 text-zinc-900'
        }`}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200 dark:border-blue-900/50">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight">
                  Linha de Catálogo & Marcas Homologadas
                </h2>
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Regra Oficial
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Mapeamento rigoroso de fabricantes e produtos por categoria automotiva
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Pills */}
        <div className="px-5 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 shrink-0 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por marca ou peça (ex: Sonda lambda, Cobreq, Cebolão, Bomba de água, Fania, Sabó...)"
              className={`w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm font-medium border focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                darkMode
                  ? 'bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500'
                  : 'bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400'
              }`}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : darkMode
                  ? 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                  : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-300/70'
              }`}
            >
              Todas as Categorias
            </button>
            {OFFICIAL_CATALOG_CATEGORIES.map((c) => (
              <button
                key={c.categoryName}
                type="button"
                onClick={() => setSelectedCategory(c.categoryName)}
                className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === c.categoryName
                    ? 'bg-blue-600 text-white shadow-xs'
                    : darkMode
                    ? 'bg-zinc-900 text-zinc-300 hover:bg-zinc-800 border border-zinc-800'
                    : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-300/70'
                }`}
              >
                {c.categoryName}
              </button>
            ))}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12">
              <Layers className="w-10 h-10 text-zinc-400 mx-auto mb-2 opacity-50" />
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400">
                Nenhum componente ou fabricante encontrado para "{searchTerm}"
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Tente buscar por marcas como Nakata, LUK, Bosch, Cobreq, Mahle ou peças como pastilha, embreagem, correia.
              </p>
            </div>
          ) : (
            filteredCategories.map((cat) => (
              <div key={cat.categoryName} className="space-y-3">
                <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-2">
                  <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    {cat.categoryName}
                  </h3>
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    {cat.brands.length} marcas
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {cat.brands.map((b) => (
                    <div
                      key={b.brand}
                      className={`p-3.5 rounded-xl border transition-all ${
                        darkMode
                          ? 'bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700'
                          : 'bg-zinc-50/70 border-zinc-200/90 hover:border-zinc-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-extrabold text-sm sm:text-base text-zinc-950 dark:text-white">
                              {b.brand}
                            </h4>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              {b.tier}
                            </span>
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 line-clamp-1">
                            {b.description}
                          </p>
                        </div>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                          {b.verdictBadge}
                        </span>
                      </div>

                      {/* Products List */}
                      <div className="mt-2.5 pt-2.5 border-t border-zinc-200/60 dark:border-zinc-800/60">
                        <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-zinc-400 block mb-1">
                          Peças Homologadas no Catálogo:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {b.products.map((prod, idx) => (
                            <span
                              key={idx}
                              className={`text-[11px] px-2 py-0.5 rounded-md font-medium border ${
                                darkMode
                                  ? 'bg-zinc-800/80 border-zinc-700/60 text-zinc-200'
                                  : 'bg-white border-zinc-200 text-zinc-800 shadow-2xs'
                              }`}
                            >
                              {prod}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 shrink-0 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Todas as pesquisas na plataforma seguem rigorosamente esta diretriz.</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 transition-colors"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
