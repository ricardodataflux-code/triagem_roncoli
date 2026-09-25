import React, { useState, useMemo } from 'react';
import {
  Check,
  Copy,
  ExternalLink,
  AlertTriangle,
  Wrench,
  MessageSquare,
  ShieldCheck,
  Globe,
  Tag,
  PhoneCall,
  Boxes,
  Barcode,
  Image as ImageIcon,
  MapPin,
  Phone,
  Building2,
  Search,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { SearchResult } from '../types';
import { evaluateAftermarketList, EvaluatedAftermarketItem } from '../utils/brandEvaluator';
import { getRioClaroSuppliersForPart } from '../data/rioClaroSuppliers';
import { PartImageModal } from './PartImageModal';
import { WhatsAppQuoteModal } from './WhatsAppQuoteModal';

interface PartResultCardProps {
  result: SearchResult;
  darkMode: boolean;
}

export const PartResultCard: React.FC<PartResultCardProps> = ({ result, darkMode }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedWhatsapp, setCopiedWhatsapp] = useState(false);
  const [showSources, setShowSources] = useState(false);
  const [selectedItemForImage, setSelectedItemForImage] = useState<EvaluatedAftermarketItem | null>(null);
  const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

  const evaluatedAftermarketCodes = useMemo(() => {
    return evaluateAftermarketList(
      result.aftermarketCodes,
      result.category,
      result.partSummary
    );
  }, [result.aftermarketCodes, result.category, result.partSummary]);

  // Fornecedores de Rio Claro-SP
  const suppliersRioClaro = useMemo(() => {
    if (result.suppliersRioClaro && result.suppliersRioClaro.length > 0) {
      return result.suppliersRioClaro;
    }
    return getRioClaroSuppliersForPart(result.partSummary, result.category);
  }, [result.suppliersRioClaro, result.partSummary, result.category]);

  // Avisos críticos de aplicação filtrados (apenas alertas técnicos genuínos da peça)
  const filteredWarnings = useMemo(() => {
    return (result.applicationWarnings || []).filter(
      (warn) =>
        !warn.toLowerCase().includes('catálogo de balcão') &&
        !warn.toLowerCase().includes('vercel') &&
        !warn.toLowerCase().includes('gemini_api_key')
    );
  }, [result.applicationWarnings]);

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    if (identifier === 'ALL') {
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } else if (identifier === 'WHATSAPP') {
      setCopiedWhatsapp(true);
      setTimeout(() => setCopiedWhatsapp(false), 2000);
    } else {
      setCopiedCode(identifier);
      setTimeout(() => setCopiedCode(null), 2000);
    }
  };

  const getAllCodesFormatted = () => {
    const qtyStr = result.quantityUsedInVehicle ? `Quantidade no Veículo: ${result.quantityUsedInVehicle}\n` : '';
    const oemStr = result.oemCodes.map((o) => `[OEM ${o.brandOrOrigin}]: ${o.code}`).join(' | ');
    const afterStr = evaluatedAftermarketCodes
      .map(
        (a) =>
          `• [${a.brand} - ${a.tier || 'Linha Reposição'} | ${a.verdictBadge || a.salesVolume}]: ${a.code}${
            a.technicalDetails ? ` - ${a.technicalDetails}` : ''
          }`
      )
      .join('\n');
    return `${result.partSummary} - ${result.carSummary}\n${qtyStr}${oemStr}\n\nOpções de Mercado (Aftermarket):\n${afterStr}`;
  };

  const getWhatsappUrl = () => {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(result.whatsappMessage)}`;
  };

  const isQuantityLabel = (label: string) => {
    const l = label.toLowerCase();
    return l.includes('quantidade') || l.includes('qtd') || l.includes('unidade no carro');
  };

  const detailedSpecs = (result.technicalSpecs || []).filter(
    (spec) => !isQuantityLabel(spec.label)
  );

  return (
    <>
      <div
        id={`result-card-${result.id}`}
        className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
          darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-md'
        }`}
      >
        {/* Top Banner: Identified Vehicle & Part */}
        <div className="bg-zinc-950 text-white p-5 sm:p-7 border-b border-zinc-800 relative">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-[10px] font-mono uppercase tracking-widest font-semibold px-2.5 py-0.5 rounded-md bg-zinc-800 text-zinc-300 border border-zinc-700/80">
                  {result.category || 'Autopeças'}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest font-medium px-2 py-0.5 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Pesquisa em Todas as Fontes da Web & Google
                </span>
                <span className="text-[10px] font-mono uppercase tracking-widest font-medium px-2 py-0.5 rounded-md bg-zinc-900 text-zinc-400 border border-zinc-800 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                  Catálogo Homologado
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                {result.partSummary}
              </h1>
              <p className="text-zinc-400 text-xs sm:text-sm mt-1.5 font-medium flex items-center gap-2 flex-wrap">
                <span className="text-zinc-200 font-bold">{result.carSummary}</span>
                {result.query.notes && (
                  <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-blue-950/80 border border-blue-800 text-blue-300 font-semibold flex items-center gap-1">
                    <span>🔍 Refinamento:</span>
                    <span>{result.query.notes}</span>
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-7 space-y-7">
          {/* Fast Action Bar for Counter Salesman (Executive Palette: Zinc & Slate) */}
          <div
            className={`flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl border transition-colors ${
              darkMode ? 'bg-zinc-900/80 border-zinc-800' : 'bg-zinc-50 border-zinc-200/90 shadow-2xs'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
                Ações Rápidas:
              </span>
              <button
                id="btn-copy-all-codes"
                type="button"
                onClick={() => copyToClipboard(getAllCodesFormatted(), 'ALL')}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-2xs ${
                  copiedAll
                    ? 'bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                }`}
              >
                {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedAll ? 'Todos Códigos Copiados!' : 'Copiar Todos os Códigos'}
              </button>
            </div>

            <div className="flex items-center gap-2">
              {/* WhatsApp Quote Builder with Multiple Choice Brands (Verde Palette) */}
              <button
                id="btn-open-whatsapp-modal"
                type="button"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-all shadow-2xs active:scale-95"
                title="Personalizar marcas e valores para enviar no WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Orçamento WhatsApp (Opções)</span>
              </button>

              <button
                id="btn-send-whatsapp"
                type="button"
                onClick={() => setIsWhatsAppModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border border-emerald-600/30 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 transition-all shadow-2xs"
                title="Abrir cotação formatada"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Enviar Cotação</span>
              </button>
            </div>
          </div>

          {/* SECTION 1: OEM GENUINE / ORIGINAL CODES */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-zinc-950 dark:text-white">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                Códigos Originais de Montadora (OEM / Genuíno):
              </h2>
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                Padrão da Linha de Montagem
              </span>
            </div>

            {result.oemCodes && result.oemCodes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {result.oemCodes.map((oem, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      darkMode
                        ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                        : 'bg-zinc-50/80 border-zinc-200 hover:border-zinc-300 shadow-2xs'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block mb-1">
                        {oem.brandOrOrigin}
                      </span>
                      <div className="font-mono text-base font-bold text-zinc-950 dark:text-white tracking-wider select-all">
                        {oem.code}
                      </div>
                      {oem.notes && (
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
                          {oem.notes}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(oem.code, `OEM-${idx}`)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        copiedCode === `OEM-${idx}`
                          ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                          : darkMode
                          ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                          : 'bg-white hover:bg-zinc-100 text-zinc-700 border-zinc-200 shadow-2xs'
                      }`}
                      title="Copiar código OEM"
                    >
                      {copiedCode === `OEM-${idx}` ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`p-4 rounded-xl border text-xs font-medium text-zinc-500 dark:text-zinc-400 ${
                  darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}
              >
                Código original direto não listado. Consulte as referências de reposição abaixo.
              </div>
            )}
          </div>

          {/* SECTION 2: AFTERMARKET CODES WITH CONVINCING TECHNICAL DETAILS & IMAGE BUTTON */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div>
                <h2 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-zinc-950 dark:text-white">
                  <Tag className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  Opções no Mercado Brasileiro (Aftermarket & Equivalências):
                </h2>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Marcas líderes recomendadas com especificações persuasivas e visualização de foto/desenho técnico
                </p>
              </div>
              <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400 self-start sm:self-auto">
                {evaluatedAftermarketCodes.length} opções disponíveis
              </span>
            </div>

            {evaluatedAftermarketCodes && evaluatedAftermarketCodes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {evaluatedAftermarketCodes.map((item, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                      darkMode
                        ? 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                        : 'bg-white border-zinc-200/90 hover:border-zinc-400 shadow-2xs'
                    }`}
                  >
                    <div>
                      {/* Top Row: Brand + Tier Badge + Image Button + Copy Button */}
                      <div className="flex items-center justify-between gap-1.5 mb-2.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {/* Brand Badge */}
                          <span className="font-extrabold text-xs tracking-tight px-2.5 py-0.5 rounded-md bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                            {item.brand}
                          </span>

                          {/* Tier Badge */}
                          <span
                            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md border tracking-wider ${
                              item.tier === '1ª Linha'
                                ? 'bg-zinc-950 text-white border-zinc-950 dark:bg-zinc-100 dark:text-zinc-950 dark:border-white'
                                : item.tier === '2ª Linha'
                                ? 'bg-zinc-100 text-zinc-800 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-200 dark:border-zinc-700'
                                : 'border border-dashed border-zinc-300 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400'
                            }`}
                            title={item.tierDescription}
                          >
                            {item.tier}
                          </span>
                        </div>

                        {/* Actions on Card: View Photo / Schematic & Copy Code */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedItemForImage(item)}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors shadow-2xs"
                            title={`Visualizar foto e dimensões da peça ${item.brand}`}
                          >
                            <ImageIcon className="w-3 h-3 text-zinc-500" />
                            <span>Foto</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.code, `AFTER-${idx}`)}
                            className={`p-1.5 rounded-md border shrink-0 transition-all ${
                              copiedCode === `AFTER-${idx}`
                                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-zinc-100 dark:text-zinc-900'
                                : darkMode
                                ? 'bg-zinc-800 hover:bg-zinc-700 text-zinc-300 border-zinc-700'
                                : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-700 border-zinc-200 shadow-2xs'
                            }`}
                            title={`Copiar código ${item.brand}`}
                          >
                            {copiedCode === `AFTER-${idx}` ? (
                              <Check className="w-3.5 h-3.5" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Part Code */}
                      <div className="font-mono text-base sm:text-lg font-bold text-zinc-950 dark:text-white tracking-wider truncate select-all mb-1">
                        {item.code}
                      </div>

                      {/* Commercial Line / Type */}
                      {item.lineOrType && (
                        <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 truncate mb-2">
                          {item.lineOrType}
                        </p>
                      )}

                      {/* Badges Row: Sales Volume & Buying Verdict (3-color palette discipline) */}
                      <div className="flex items-center gap-1.5 flex-wrap mb-3">
                        <span className="text-[11px] font-semibold text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded-md bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 flex items-center gap-1.5">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.salesVolume === 'Mais vendida'
                                ? 'bg-zinc-950 dark:bg-zinc-100'
                                : item.salesVolume === 'Média saída'
                                ? 'bg-zinc-500'
                                : 'bg-zinc-400'
                            }`}
                          />
                          {item.salesVolume}
                        </span>

                        {item.verdictBadge && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 tracking-tight">
                            {item.verdictBadge}
                          </span>
                        )}
                      </div>

                      {/* PERSUASIVE SELLING ARGUMENT TO CONVINCE THE CUSTOMER */}
                      {item.persuasiveDetails && (
                        <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 text-xs mb-2.5 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3 text-zinc-500" />
                            Argumento de Venda Técnica:
                          </span>
                          <p className="text-[11px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                            {item.persuasiveDetails}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Technical details and warranty footer */}
                    <div
                      className={`pt-2 border-t text-[11px] leading-relaxed space-y-1 ${
                        darkMode ? 'border-zinc-800 text-zinc-400' : 'border-zinc-100 text-zinc-600'
                      }`}
                    >
                      <div className="flex items-start gap-1">
                        <Wrench className="w-3 h-3 text-zinc-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">
                          <strong className="font-semibold text-zinc-800 dark:text-zinc-200">Detalhe: </strong>
                          {item.technicalDetails}
                        </span>
                      </div>
                      {item.warrantyInfo && (
                        <div className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                          • {item.warrantyInfo}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`p-4 rounded-xl border text-xs font-medium text-zinc-500 dark:text-zinc-400 ${
                  darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                }`}
              >
                Nenhum código cruzado identificado automaticamente. Consulte o resumo técnico abaixo.
              </div>
            )}
          </div>

          {/* SECTION 3: APPLICATION WARNINGS (Semantic Amarelo for Atenção) */}
          {filteredWarnings.length > 0 && (
            <div
              className={`p-4 sm:p-5 rounded-xl border flex items-start gap-3.5 ${
                darkMode
                  ? 'bg-amber-950/30 border-amber-800 text-amber-200'
                  : 'bg-amber-50 border-amber-300 text-amber-950 shadow-2xs'
              }`}
            >
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="space-y-1.5">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                  ⚠️ Atenção Crítica de Balcão (Evite Trocas & Devoluções):
                </h3>
                <ul className="text-xs space-y-1 list-disc list-inside font-medium leading-relaxed opacity-95">
                  {filteredWarnings.map((warn, i) => (
                    <li key={i}>{warn}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* SECTION 4: ESPECIFICAÇÕES TÉCNICAS DE CONFERÊNCIA */}
          {((result.technicalSpecs && result.technicalSpecs.length > 0) || result.quantityUsedInVehicle) && (
            <div
              id="section-technical-specs"
              className={`p-4 sm:p-5 rounded-xl border ${
                darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50/70 border-zinc-200/90'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-zinc-200 dark:border-zinc-800">
                <h3 className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-zinc-950 dark:text-white">
                  <Wrench className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  Especificações Técnicas de Conferência:
                </h3>
                <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                  Confira medidas, estrias e diâmetro antes de faturar
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
                {/* QUANTIDADE QUE VAI NO CARRO */}
                {result.quantityUsedInVehicle && (
                  <div
                    id="spec-quantity-used-in-vehicle"
                    className={`p-3.5 rounded-xl border flex flex-col justify-between col-span-2 sm:col-span-2 lg:col-span-2 ${
                      darkMode
                        ? 'bg-zinc-900 border-zinc-700 text-white'
                        : 'bg-white border-zinc-300 text-zinc-900 shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <Boxes className="w-3.5 h-3.5 text-zinc-500" />
                        <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-bold tracking-wider">
                          Quantidade aplicada no veículo:
                        </span>
                      </div>
                      <span className="font-bold text-zinc-950 dark:text-white text-base sm:text-lg leading-tight">
                        {result.quantityUsedInVehicle}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-1.5 block">
                      Dica: confirme com o cliente se precisa do par (LE + LD) ou jogo completo.
                    </span>
                  </div>
                )}

                {/* Demais Especificações Técnicas */}
                {detailedSpecs.map((spec, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-xl border flex flex-col justify-between ${
                      darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-2xs'
                    }`}
                  >
                    <span className="text-zinc-500 dark:text-zinc-400 block text-[10px] uppercase font-bold tracking-wide mb-1">
                      {spec.label}
                    </span>
                    <span className="font-semibold text-zinc-900 dark:text-white text-sm leading-snug">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4B: QUICK PHONE SCRIPT */}
          {result.quickSalesPitch && (
            <div
              className={`p-4 rounded-xl border ${
                darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50/70 border-zinc-200'
              }`}
            >
              <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 flex items-center gap-1.5 text-zinc-900 dark:text-white">
                <PhoneCall className="w-3.5 h-3.5 text-zinc-400" />
                Argumentação Rápida para o Vendedor ao Telefone:
              </h3>
              <p className="text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed italic">
                "{result.quickSalesPitch}"
              </p>
            </div>
          )}

          {/* SECTION 5: COMPLEMENTARY PARTS / VENDA CASADA */}
          {result.complementaryParts && result.complementaryParts.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5 text-zinc-950 dark:text-white">
                <Tag className="w-3.5 h-3.5 text-zinc-400" />
                Itens Complementares de Troca Conjunta (Venda Casada / Revisão Completa):
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {result.complementaryParts.map((item, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-xl border text-xs flex flex-col justify-between ${
                      darkMode ? 'bg-zinc-900/40 border-zinc-800' : 'bg-zinc-50/70 border-zinc-200/90'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-zinc-950 dark:text-zinc-100 block mb-1 text-xs">
                        + {item.name}
                      </span>
                      <span className="text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed block">
                        {item.reason}
                      </span>
                    </div>

                    {item.referenceCodes && (
                      <div
                        className={`mt-2.5 pt-2 border-t flex flex-col gap-1 ${
                          darkMode ? 'border-zinc-800' : 'border-zinc-200'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                            <Barcode className="w-3 h-3 text-zinc-400" />
                            Códigos de Busca:
                          </span>
                          <button
                            type="button"
                            onClick={() => copyToClipboard(item.referenceCodes!, `COMP_${i}`)}
                            className="text-[10px] font-semibold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white flex items-center gap-0.5"
                            title="Copiar referências"
                          >
                            {copiedCode === `COMP_${i}` ? (
                              <>
                                <Check className="w-2.5 h-2.5 text-zinc-900 dark:text-white" />
                                <span className="text-zinc-900 dark:text-white">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-2.5 h-2.5" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>
                        <div
                          className={`font-mono text-[11px] font-medium px-2.5 py-1.5 rounded-md border leading-snug select-all ${
                            darkMode
                              ? 'bg-zinc-900 border-zinc-800 text-zinc-300'
                              : 'bg-white border-zinc-200 text-zinc-900'
                          }`}
                        >
                          {item.referenceCodes}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: PESQUISA EM TODAS AS FONTES DA WEB & CATÁLOGOS DOS FABRICANTES */}
          <div
            id="section-web-sources-catalogs"
            className={`p-5 rounded-2xl border transition-all ${
              darkMode ? 'bg-zinc-900/60 border-zinc-800' : 'bg-slate-50/80 border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                    <span>Pesquisa em Todas as Fontes da Web & Catálogos Fabricantes</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-300 dark:border-emerald-800">
                      Google Search Ativo
                    </span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                    Consulta profunda realizada na internet em busca de especificações idênticas às dos catálogos de fábrica.
                  </p>
                </div>
              </div>

              {result.groundingSources && result.groundingSources.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowSources(!showSources)}
                  className="text-xs px-2.5 py-1 rounded-md border font-semibold text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shrink-0 self-start sm:self-auto"
                >
                  {showSources ? 'Ocultar links consultados' : `Ver ${result.groundingSources.length} fontes consultadas`}
                </button>
              )}
            </div>

            {/* Direct Verification Links to Google and Manufacturer Catalogs */}
            {result.directLinks && result.directLinks.length > 0 && (
              <div className="mb-3">
                <p className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Search className="w-3 h-3 text-zinc-400" />
                  Links de Consulta Direta nos Catálogos Oficiais & Google:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {result.directLinks.map((link, idx) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-2.5 py-2 rounded-lg border text-[11px] font-semibold flex items-center justify-between gap-1.5 transition-all hover:scale-[1.01] ${
                        link.type === 'google'
                          ? darkMode
                            ? 'bg-blue-950/40 border-blue-800 text-blue-300 hover:bg-blue-900/60'
                            : 'bg-blue-50 border-blue-200 text-blue-900 hover:bg-blue-100'
                          : darkMode
                          ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700'
                          : 'bg-white border-zinc-200 text-zinc-800 hover:text-black hover:border-zinc-300 shadow-2xs'
                      }`}
                    >
                      <span className="truncate">{link.label}</span>
                      <ExternalLink className="w-3 h-3 text-zinc-400 shrink-0" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Expanded List of Visited Web Sources and Snippets */}
            {showSources && result.groundingSources && result.groundingSources.length > 0 && (
              <div
                className={`mt-3 p-3.5 rounded-xl border space-y-2 text-xs ${
                  darkMode ? 'bg-zinc-950/60 border-zinc-800' : 'bg-white border-zinc-200 shadow-2xs'
                }`}
              >
                <p className="font-bold text-zinc-800 dark:text-zinc-300 text-[10px] uppercase tracking-wider">
                  Páginas e Catálogos Rastreamento na Web:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.groundingSources.map((src, i) => (
                    <a
                      key={i}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-lg border flex flex-col justify-between gap-1 hover:underline transition-colors ${
                        darkMode
                          ? 'bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:text-white'
                          : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:text-black'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate font-semibold text-[11px]">{src.title}</span>
                        <ExternalLink className="w-3 h-3 text-zinc-400 shrink-0" />
                      </div>
                      {src.snippet && (
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {src.snippet}
                        </p>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SECTION 7: ONDE ENCONTRAR (se não tiver em loja) - RIO CLARO - SP (OBRIGATÓRIO: ULTIMA INFORMAÇÃO) */}
          <div
            id="section-onde-encontrar-rio-claro"
            className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              darkMode
                ? 'bg-zinc-950/60 border-zinc-800 text-zinc-100'
                : 'bg-zinc-50/90 border-zinc-200 text-zinc-900 shadow-2xs'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-zinc-950 dark:text-white">
                    ONDE ENCONTRAR (se não tiver em loja)
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    Sugestões de fornecedores e distribuidoras de autopeças localizadas exclusivamente em <strong className="text-zinc-800 dark:text-zinc-200 font-bold">Rio Claro - SP</strong>
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 self-start sm:self-auto">
                Exclusivo Rio Claro - SP
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {suppliersRioClaro.slice(0, 6).map((supplier, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                    darkMode
                      ? 'bg-zinc-900/70 border-zinc-800 hover:border-zinc-700'
                      : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-2xs'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div>
                        <span className="text-xs font-bold text-zinc-950 dark:text-white block leading-snug">
                          {supplier.name}
                        </span>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 dark:text-zinc-400">
                          {supplier.category} • {supplier.neighborhood}
                        </span>
                      </div>

                      <a
                        href={`tel:${supplier.phone.replace(/[^0-9]/g, '')}`}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono font-bold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 transition-colors"
                        title="Ligar para o fornecedor"
                      >
                        <Phone className="w-3 h-3 text-zinc-500" />
                        <span>{supplier.phone}</span>
                      </a>
                    </div>

                    <div className="text-[11px] text-zinc-600 dark:text-zinc-400 flex items-center gap-1 mb-2">
                      <Building2 className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span>{supplier.address} - Rio Claro, SP</span>
                    </div>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed bg-zinc-50 dark:bg-zinc-950/40 p-2 rounded-md border border-zinc-100 dark:border-zinc-800/80">
                      <strong className="font-semibold text-zinc-700 dark:text-zinc-300">Especialidade: </strong>
                      {supplier.specialty}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3.5 pt-3 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center justify-between flex-wrap gap-2">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                Alternativas locais em Rio Claro-SP para atendimento imediato de oficina sem custo de frete interestadual.
              </span>
              <span className="font-mono text-[10px] text-zinc-500">
                Polo de Distribuição • Rio Claro - SP
              </span>
            </div>
          </div>

          {/* Fallback raw explanation if available */}
          {result.rawAiExplanation && (
            <div
              className={`p-4 rounded-xl border text-xs whitespace-pre-wrap leading-relaxed ${
                darkMode ? 'bg-zinc-900/30 border-zinc-800 text-zinc-400' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
              }`}
            >
              <div className="font-bold mb-1 uppercase tracking-wider text-zinc-800 dark:text-zinc-300">
                Detalhamento Adicional da IA:
              </div>
              {result.rawAiExplanation}
            </div>
          )}
        </div>
      </div>

      {/* Part Image & Technical Details Modal */}
      {selectedItemForImage && (
        <PartImageModal
          item={selectedItemForImage}
          partName={result.partSummary}
          carSummary={result.carSummary}
          onClose={() => setSelectedItemForImage(null)}
        />
      )}

      {/* WhatsApp Multi-Choice Quote Modal */}
      <WhatsAppQuoteModal
        isOpen={isWhatsAppModalOpen}
        onClose={() => setIsWhatsAppModalOpen(false)}
        result={result}
        evaluatedAftermarketCodes={evaluatedAftermarketCodes}
        darkMode={darkMode}
      />
    </>
  );
};
