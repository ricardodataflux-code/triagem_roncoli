import React, { useState, useMemo } from 'react';
import { X, Check, Copy, PhoneCall, MessageSquare, AlertTriangle, ShieldCheck, CheckSquare, Square } from 'lucide-react';
import { SearchResult } from '../types';
import { EvaluatedAftermarketItem } from '../utils/brandEvaluator';

interface WhatsAppQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SearchResult;
  evaluatedAftermarketCodes: EvaluatedAftermarketItem[];
  darkMode: boolean;
}

interface QuoteOptionState {
  id: string;
  brand: string;
  code: string;
  tier: string;
  partName: string;
  quantityStr: string;
  unitType: string;
  selected: boolean;
  manualPrice: string;
}

export const WhatsAppQuoteModal: React.FC<WhatsAppQuoteModalProps> = ({
  isOpen,
  onClose,
  result,
  evaluatedAftermarketCodes,
  darkMode,
}) => {
  const [copied, setCopied] = useState(false);
  const [customerPhone, setCustomerPhone] = useState('');

  // Quantidade e tipo de venda (ex: o jogo, a unidade, o par, o kit)
  const unitSuffix = useMemo(() => {
    const p = (result.partSummary + ' ' + (result.quantityUsedInVehicle || '')).toLowerCase();
    if (p.includes('vela') || p.includes('pastilha') || p.includes('jogo')) {
      return 'o jogo';
    }
    if (p.includes('par') || p.includes('amortecedor') || p.includes('disco') || p.includes('mola')) {
      return 'o par';
    }
    if (p.includes('kit') || p.includes('embreagem') || p.includes('correia')) {
      return 'o kit';
    }
    return 'a peça';
  }, [result.partSummary, result.quantityUsedInVehicle]);

  // Montar lista de opções selecionáveis
  const [options, setOptions] = useState<QuoteOptionState[]>(() => {
    const list: QuoteOptionState[] = [];

    // Adicionar opções Aftermarket
    evaluatedAftermarketCodes.forEach((item, idx) => {
      list.push({
        id: `after-${idx}`,
        brand: item.brand,
        code: item.code,
        tier: item.tier === '1ª Linha' ? 'Original de montadora / 1ª Linha' : item.tier,
        partName: result.partSummary,
        quantityStr: result.quantityUsedInVehicle || '1 unidade',
        unitType: unitSuffix,
        selected: idx < 2, // Seleciona as primeiras 2 por padrão
        manualPrice: '',
      });
    });

    // Se houver código OEM genuíno e poucas opções aftermarket, adicionar OEM também
    if (result.oemCodes && result.oemCodes.length > 0) {
      result.oemCodes.forEach((oem, idx) => {
        list.push({
          id: `oem-${idx}`,
          brand: `${oem.brandOrOrigin} (Genuíno Montadora)`,
          code: oem.code,
          tier: 'Original de Fábrica (OEM)',
          partName: result.partSummary,
          quantityStr: result.quantityUsedInVehicle || '1 unidade',
          unitType: unitSuffix,
          selected: list.length === 0,
          manualPrice: '',
        });
      });
    }

    return list;
  });

  const toggleOption = (id: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, selected: !opt.selected } : opt))
    );
  };

  const handlePriceChange = (id: string, price: string) => {
    setOptions((prev) =>
      prev.map((opt) => (opt.id === id ? { ...opt, manualPrice: price } : opt))
    );
  };

  const selectAll = (select: boolean) => {
    setOptions((prev) => prev.map((opt) => ({ ...opt, selected: select })));
  };

  // Dica técnica do especialista
  const specialistTip = useMemo(() => {
    const validWarnings = (result.applicationWarnings || []).filter(
      (w) =>
        !w.toLowerCase().includes('catálogo de balcão') &&
        !w.toLowerCase().includes('vercel') &&
        !w.toLowerCase().includes('gemini_api_key')
    );
    if (validWarnings.length > 0) {
      return validWarnings[0];
    }
    return `Recomendamos sempre a conferência das medidas da peça antiga e a substituição por profissional qualificado para preservar a garantia.`;
  }, [result.applicationWarnings]);

  // Gerar o corpo da mensagem exatamente no padrão solicitado pelo cliente
  const generatedMessage = useMemo(() => {
    const selectedOptions = options.filter((o) => o.selected);

    let text = `Orçamento de Roncoli - ${result.carSummary}\n\n`;
    text += `Olá! Segue a especificação de ${result.partSummary.toLowerCase()} para o seu veículo:\n\n`;

    if (selectedOptions.length === 0) {
      text += `(Nenhuma marca selecionada no momento. Selecione ao menos uma opção acima).\n\n`;
    } else {
      selectedOptions.forEach((opt, index) => {
        const optionNumber = index + 1;
        const qtyLabel = opt.quantityStr ? ` (${opt.quantityStr})` : '';
        const priceText = opt.manualPrice.trim()
          ? `R$ ${opt.manualPrice.trim()} ${opt.unitType}.`
          : `R$ [Inserir Preço] ${opt.unitType}.`;

        text += `Opção ${optionNumber}\n`;
        text += `✅ Peça: ${opt.partName}${qtyLabel}\n`;
        text += `✅ Marca Recomendada: ${opt.brand} (${opt.tier})\n`;
        text += `✅ Código: ${opt.code}\n`;
        if (!opt.manualPrice.trim()) {
          text += `✅ Preço: (deixar vazio para preenchimento manual)\n`;
        }
        text += `💰 Valor: ${priceText}\n\n`;
      });
    }

    text += `⚠️ Dica do Especialista: ${specialistTip}\n\n`;
    text += `Qualquer dúvida, estou à disposição!`;

    return text;
  }, [options, result.carSummary, result.partSummary, specialistTip]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsappSendUrl = () => {
    const cleanPhone = customerPhone.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(generatedMessage);
    if (cleanPhone) {
      // Se não tiver código de país, adiciona 55 (Brasil)
      const fullPhone = cleanPhone.length <= 11 ? `55${cleanPhone}` : cleanPhone;
      return `https://api.whatsapp.com/send?phone=${fullPhone}&text=${encoded}`;
    }
    return `https://api.whatsapp.com/send?text=${encoded}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-zinc-950/70 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        id="modal-whatsapp-quote"
        className="w-full max-w-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-zinc-900 dark:text-zinc-100"
      >
        {/* Header (Azul & Verde Palette) */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-zinc-950 dark:text-white tracking-tight">
                Orçamento de Roncoli para WhatsApp
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                Selecione as marcas para enviar ao cliente • {result.carSummary}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
            title="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          {/* Controls Bar: Multi-choice Selection */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Marcas Disponíveis para Cotação:
            </span>
            <div className="flex items-center gap-2 text-xs">
              <button
                type="button"
                onClick={() => selectAll(true)}
                className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
              >
                Marcar todas
              </button>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <button
                type="button"
                onClick={() => selectAll(false)}
                className="text-[11px] font-semibold text-zinc-500 hover:underline"
              >
                Desmarcar todas
              </button>
            </div>
          </div>

          {/* List of Checkbox Options */}
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {options.map((opt) => (
              <div
                key={opt.id}
                onClick={() => toggleOption(opt.id)}
                className={`p-2.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                  opt.selected
                    ? 'bg-blue-50/60 border-blue-300 dark:bg-blue-950/30 dark:border-blue-700 text-zinc-950 dark:text-white shadow-2xs'
                    : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="text-blue-600 dark:text-blue-400 shrink-0">
                    {opt.selected ? (
                      <CheckSquare className="w-4 h-4 fill-blue-600 text-white dark:fill-blue-500 dark:text-zinc-950" />
                    ) : (
                      <Square className="w-4 h-4 text-zinc-400" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-zinc-950 dark:text-white truncate">
                        {opt.brand}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                        {opt.tier}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 block truncate">
                      Cód: {opt.code}
                    </span>
                  </div>
                </div>

                {/* Preço Manual Opcional */}
                <div
                  className="flex items-center gap-1 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs font-mono text-zinc-500 font-bold">R$</span>
                  <input
                    type="text"
                    placeholder="[Preço Loja]"
                    value={opt.manualPrice}
                    onChange={(e) => handlePriceChange(opt.id, e.target.value)}
                    className="w-24 px-2 py-1 text-xs font-mono rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-hidden focus:border-blue-500 placeholder-zinc-400"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Dica de Especialista / Atenção */}
          <div className="p-3 rounded-xl border bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block uppercase text-[10px] tracking-wider text-amber-800 dark:text-amber-300">
                Dica do Especialista (incluída no orçamento):
              </span>
              <p className="mt-0.5 leading-relaxed text-[11px]">
                {specialistTip}
              </p>
            </div>
          </div>

          {/* Preview da Mensagem Formatada */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Visualização da Mensagem:
              </span>
              <span className="text-[10px] text-zinc-500 font-medium">
                Padrão Triagem Roncoli
              </span>
            </div>
            <div className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/70 font-mono text-xs whitespace-pre-wrap leading-relaxed max-h-52 overflow-y-auto text-zinc-800 dark:text-zinc-200 select-all shadow-inner">
              {generatedMessage}
            </div>
          </div>

          {/* WhatsApp Phone Number for Direct Send (Opcional) */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs font-medium text-zinc-500 shrink-0">
              Enviar direto p/ WhatsApp nº:
            </span>
            <input
              type="tel"
              placeholder="(19) 99999-9999 (opcional)"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:outline-hidden focus:border-blue-500 placeholder-zinc-400 font-mono"
            />
          </div>
        </div>

        {/* Modal Footer with Actions (Verde & Azul) */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 px-5 py-3.5 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/90 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
          >
            Fechar
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                copied
                  ? 'bg-emerald-700 text-white'
                  : 'bg-zinc-900 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copiado para WhatsApp!' : 'Copiar Mensagem'}</span>
            </button>

            <a
              href={getWhatsappSendUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-200" />
              <span>Abrir no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
