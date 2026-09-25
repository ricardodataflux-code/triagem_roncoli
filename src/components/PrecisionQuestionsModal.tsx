import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Info,
  Car,
  Wrench,
  X,
} from 'lucide-react';
import { SearchRequest } from '../types';
import {
  PrecisionQuestion,
  applyAnswersToSearchRequest,
} from '../data/precisionQuestions';

interface PrecisionQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (finalRequest: SearchRequest) => void;
  originalRequest: SearchRequest;
  questions: PrecisionQuestion[];
  darkMode: boolean;
}

export const PrecisionQuestionsModal: React.FC<PrecisionQuestionsModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  originalRequest,
  questions,
  darkMode,
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  // Initialize default answers whenever questions change
  useEffect(() => {
    if (questions && questions.length > 0) {
      const initial: Record<string, string> = {};
      for (const q of questions) {
        if (q.defaultSelectedId) {
          initial[q.id] = q.defaultSelectedId;
        } else if (q.options.length > 0) {
          initial[q.id] = q.options[0].id;
        }
      }
      setAnswers(initial);
    }
  }, [questions]);

  if (!isOpen || !questions || questions.length === 0) return null;

  const handleSelectOption = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleFinalSubmit = () => {
    const perfected = applyAnswersToSearchRequest(originalRequest, answers, questions);
    onConfirm(perfected);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className={`relative w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden transition-all my-auto ${
          darkMode ? 'bg-zinc-950 border-zinc-800 text-white' : 'bg-white border-zinc-200 text-zinc-900'
        }`}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-zinc-900 p-5 sm:p-6 text-white border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0">
                <HelpCircle className="w-5 h-5 text-blue-300" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded bg-blue-500/30 text-blue-200 font-semibold border border-blue-400/40">
                  Pré-Verificação Técnica de Balcão
                </span>
                <h2 className="text-lg sm:text-xl font-extrabold tracking-tight mt-1 text-white flex items-center gap-2">
                  Perguntas Necessárias para Precisão de Catálogo
                </h2>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Fechar e cancelar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Context Badge */}
          <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-zinc-200">
              <Car className="w-4 h-4 text-blue-400" />
              <span>Veículo: <strong className="text-white font-bold">{originalRequest.model} {originalRequest.year || ''} {originalRequest.engine || ''}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-zinc-200">
              <Wrench className="w-4 h-4 text-emerald-400" />
              <span>Peça: <strong className="text-white font-bold">{originalRequest.part}</strong></span>
            </div>
          </div>
        </div>

        {/* Informative Alert explaining why this eliminates brand reference inconsistencies */}
        <div
          className={`px-5 py-3 border-b flex items-start gap-2.5 text-xs ${
            darkMode
              ? 'bg-amber-950/30 border-amber-900/50 text-amber-300'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Por que responder estas perguntas?</strong> As montadoras e os fabricantes (ex: Visconde, Valeo, Cobreq, Mahle) possuem variações críticas de códigos conforme a climatização (com/sem ar), câmbio ou pinça de freio. Respondendo abaixo, eliminamos 100% das inconsistências entre marcas!
          </p>
        </div>

        {/* Scrollable Questions Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          {questions.map((q, idx) => {
            const selectedOptId = answers[q.id];

            return (
              <div
                key={q.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  darkMode
                    ? 'bg-zinc-900/50 border-zinc-800'
                    : 'bg-zinc-50/70 border-zinc-200/90'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-start gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white">
                        {q.title}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {q.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Impact Explanation */}
                <div
                  className={`mb-3 p-2.5 rounded-lg text-[11px] leading-relaxed flex items-start gap-1.5 ${
                    darkMode
                      ? 'bg-blue-950/30 text-blue-300 border border-blue-900/50'
                      : 'bg-blue-50/70 text-blue-900 border border-blue-200'
                  }`}
                >
                  <Info className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Impacto no Catálogo:</strong> {q.impactExplanation}
                  </span>
                </div>

                {/* Options Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt) => {
                    const isSelected = selectedOptId === opt.id;

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(q.id, opt.id)}
                        className={`text-left p-3.5 rounded-xl border transition-all relative flex flex-col justify-between gap-1.5 ${
                          isSelected
                            ? darkMode
                              ? 'bg-blue-950/60 border-blue-500 ring-2 ring-blue-500/30 text-white'
                              : 'bg-blue-50 border-blue-600 ring-2 ring-blue-500/20 text-blue-950 shadow-xs'
                            : darkMode
                            ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-850'
                            : 'bg-white border-zinc-200 text-zinc-800 hover:border-zinc-300 hover:bg-zinc-50'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-bold text-xs sm:text-sm">
                            {opt.label}
                          </span>
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : darkMode
                                ? 'border border-zinc-700'
                                : 'border border-zinc-300'
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                          </div>
                        </div>

                        {opt.description && (
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                            {opt.description}
                          </p>
                        )}

                        {opt.badge && (
                          <span
                            className={`self-start text-[10px] font-mono px-2 py-0.5 rounded font-semibold mt-1 ${
                              isSelected
                                ? 'bg-blue-200 dark:bg-blue-900 text-blue-900 dark:text-blue-100'
                                : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-400'
                            }`}
                          >
                            {opt.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div
          className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 ${
            darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
          }`}
        >
          <button
            type="button"
            onClick={onClose}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl border text-xs font-semibold transition-colors ${
              darkMode
                ? 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                : 'border-zinc-300 text-zinc-700 hover:bg-zinc-100'
            }`}
          >
            Voltar e Ajustar Manualmente
          </button>

          <button
            type="button"
            onClick={handleFinalSubmit}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Concluir Pesquisa com Referência Correta</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
