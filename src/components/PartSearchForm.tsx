import React, { useState } from 'react';
import { Search, Car, Wrench, Calendar, Cpu, AlertCircle, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { SearchRequest } from '../types';
import { POPULAR_PRESETS, POPULAR_PARTS_SUGGESTIONS, CarPreset } from '../data/presets';

interface PartSearchFormProps {
  darkMode: boolean;
  isLoading: boolean;
  onSearch: (request: SearchRequest) => void;
  initialValues?: SearchRequest;
}

export const PartSearchForm: React.FC<PartSearchFormProps> = ({
  darkMode,
  isLoading,
  onSearch,
  initialValues,
}) => {
  const [formData, setFormData] = useState<SearchRequest>(
    initialValues || {
      part: '',
      model: '',
      year: '',
      engine: '',
      notes: '',
      transmission: '',
      vinOrPlate: '',
    }
  );

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleInputChange = (field: keyof SearchRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSelectPreset = (preset: CarPreset) => {
    setFormData(preset.data);
    onSearch(preset.data);
  };

  const handleSelectPartSuggestion = (partName: string) => {
    setFormData((prev) => ({
      ...prev,
      part: partName,
    }));
    setShowSuggestions(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.part.trim() || !formData.model.trim()) return;
    onSearch(formData);
  };

  const handleClear = () => {
    setFormData({
      part: '',
      model: '',
      year: '',
      engine: '',
      notes: '',
      transmission: '',
      vinOrPlate: '',
    });
  };

  return (
    <div
      id="part-search-container"
      className={`rounded-2xl border p-5 sm:p-7 transition-all ${
        darkMode
          ? 'bg-zinc-900/60 border-zinc-800 shadow-sm'
          : 'bg-white border-zinc-200/90 shadow-2xs'
      }`}
    >
      {/* Header of Search Form */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h2 className="text-base font-bold text-zinc-950 dark:text-white flex items-center gap-2 tracking-tight">
            <Search className="w-4 h-4 text-zinc-500" />
            Consulta de Peça & Referência Cruzada
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Localize códigos originais (OEM) e equivalências de mercado em tempo real
          </p>
        </div>

        {/* Quick Presets Dropdown / Shortcut */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleClear}
            className={`text-xs px-3 py-1.5 rounded-lg border font-semibold transition-all ${
              darkMode
                ? 'border-zinc-700/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                : 'border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 shadow-2xs'
            }`}
          >
            Limpar Campos
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Row 1: Part Name */}
        <div className="relative">
          <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center justify-between text-zinc-800 dark:text-zinc-200">
            <span className="flex items-center gap-1.5">
              <Wrench className="w-3.5 h-3.5 text-zinc-400" />
              Peça Solicitada <span className="text-zinc-400 dark:text-zinc-500">*</span>
            </span>
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white normal-case font-semibold underline underline-offset-2 transition-colors"
            >
              {showSuggestions ? 'Ocultar sugestões' : '+ Sugestões frequentes'}
            </button>
          </label>
          <div className="relative">
            <input
              id="input-part-name"
              type="text"
              required
              value={formData.part}
              onChange={(e) => handleInputChange('part', e.target.value)}
              placeholder="Ex: Bomba d'água, Pastilha de freio dianteira, Kit correia dentada, Amortecedor dianteiro..."
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
                darkMode
                  ? 'bg-zinc-900/80 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-zinc-500'
                  : 'bg-zinc-50/50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white'
              }`}
            />
          </div>

          {/* Quick Suggestions Chips */}
          {showSuggestions && (
            <div
              className={`mt-2 p-3 rounded-xl border flex flex-wrap gap-1.5 max-h-40 overflow-y-auto ${
                darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
              }`}
            >
              {POPULAR_PARTS_SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleSelectPartSuggestion(item)}
                  className={`text-xs px-2.5 py-1 rounded-md border transition-all text-left font-medium ${
                    formData.part === item
                      ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                      : darkMode
                      ? 'bg-zinc-800/80 hover:bg-zinc-800 border-zinc-700 text-zinc-300'
                      : 'bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-700 shadow-2xs'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Row 2: Car Model, Year, Engine */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
          {/* Modelo */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
              <Car className="w-3.5 h-3.5 text-zinc-400" />
              Veículo / Modelo <span className="text-zinc-400 dark:text-zinc-500">*</span>
            </label>
            <input
              id="input-car-model"
              type="text"
              required
              value={formData.model}
              onChange={(e) => handleInputChange('model', e.target.value)}
              placeholder="Ex: VW Gol G6, Chevrolet Onix, Fiat Strada"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
                darkMode
                  ? 'bg-zinc-900/80 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-zinc-500'
                  : 'bg-zinc-50/50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white'
              }`}
            />
          </div>

          {/* Ano */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
              <Calendar className="w-3.5 h-3.5 text-zinc-400" />
              Ano / Fabricação
            </label>
            <input
              id="input-car-year"
              type="text"
              value={formData.year}
              onChange={(e) => handleInputChange('year', e.target.value)}
              placeholder="Ex: 2018 ou 2014/2015"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
                darkMode
                  ? 'bg-zinc-900/80 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-zinc-500'
                  : 'bg-zinc-50/50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white'
              }`}
            />
          </div>

          {/* Motor / Combustível */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-zinc-800 dark:text-zinc-200">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              Motorização / Válvulas
            </label>
            <input
              id="input-car-engine"
              type="text"
              value={formData.engine}
              onChange={(e) => handleInputChange('engine', e.target.value)}
              placeholder="Ex: 1.0 12V 3cc, 1.6 8V EA111, 1.4 Fire"
              className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
                darkMode
                  ? 'bg-zinc-900/80 border-zinc-700/80 text-white placeholder-zinc-500 focus:border-zinc-500'
                  : 'bg-zinc-50/50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-900 focus:bg-white'
              }`}
            />
          </div>
        </div>

        {/* Collapsible: Advanced details */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white flex items-center gap-1.5 transition-colors"
          >
            {showAdvanced ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            {showAdvanced ? 'Ocultar especificações adicionais' : '+ Especificações adicionais (Câmbio, Ar, Lado, Placa)'}
          </button>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-3 pt-3 border-t border-zinc-200 dark:border-zinc-800 animate-fadeIn">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-700 dark:text-zinc-300">
                  Câmbio / Transmissão
                </label>
                <input
                  type="text"
                  value={formData.transmission || ''}
                  onChange={(e) => handleInputChange('transmission', e.target.value)}
                  placeholder="Ex: Manual 5 marchas, Automático, CVT"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
                    darkMode
                      ? 'bg-zinc-900/80 border-zinc-700/80 text-white placeholder-zinc-500'
                      : 'bg-zinc-50/50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-700 dark:text-zinc-300">
                  Placa ou Chassi
                </label>
                <input
                  type="text"
                  value={formData.vinOrPlate || ''}
                  onChange={(e) => handleInputChange('vinOrPlate', e.target.value)}
                  placeholder="Ex: ABC-1234 ou chassi"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
                    darkMode
                      ? 'bg-zinc-900/80 border-zinc-700/80 text-white placeholder-zinc-500'
                      : 'bg-zinc-50/50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-zinc-700 dark:text-zinc-300">
                  Observações de Balcão
                </label>
                <input
                  type="text"
                  value={formData.notes || ''}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Ex: Com ar condicionado, com ABS, Lado direito"
                  className={`w-full px-3 py-2 rounded-xl border text-xs font-medium transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
                    darkMode
                      ? 'bg-zinc-900/80 border-zinc-700/80 text-white placeholder-zinc-500'
                      : 'bg-zinc-50/50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
                  }`}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Button (Executive Obsidian Style) */}
        <div className="pt-2">
          <button
            id="btn-submit-search"
            type="submit"
            disabled={isLoading || !formData.part.trim() || !formData.model.trim()}
            className={`w-full py-3.5 px-6 rounded-xl font-bold text-sm tracking-wide transition-all flex items-center justify-center gap-2.5 shadow-xs ${
              isLoading || !formData.part.trim() || !formData.model.trim()
                ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed border border-transparent'
                : 'bg-zinc-950 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 active:scale-[0.99] border border-zinc-900 dark:border-white'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                <span>Consultando catálogos e referências...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Consultar Peça & Referências Cruzadas</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Presets Bar */}
      <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-2.5">
          <Zap className="w-3.5 h-3.5 text-zinc-400" />
          <span>Consultas rápidas frequentes de balcão:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {POPULAR_PRESETS.map((preset, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className={`p-2.5 rounded-xl border text-left transition-all ${
                darkMode
                  ? 'bg-zinc-900/50 border-zinc-800 hover:bg-zinc-800/80 hover:border-zinc-700'
                  : 'bg-zinc-50/70 border-zinc-200 hover:bg-white hover:border-zinc-400 shadow-2xs'
              }`}
            >
              <p className="text-xs font-bold truncate text-zinc-900 dark:text-zinc-100">
                {preset.title}
              </p>
              <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                {preset.subtitle}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
