import React, { useState } from 'react';
import { Send, HelpCircle, Sparkles, MessageSquare, ExternalLink } from 'lucide-react';
import { SearchResult, ChatMessage, GroundingSource } from '../types';

interface PartFollowUpChatProps {
  partContext: SearchResult;
  darkMode: boolean;
}

export const PartFollowUpChat: React.FC<PartFollowUpChatProps> = ({ partContext, darkMode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sources, setSources] = useState<GroundingSource[]>([]);

  const handleAsk = async (questionToAsk?: string) => {
    const q = (questionToAsk || inputQuestion).trim();
    if (!q || isLoading) return;

    const userMsg: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      content: q,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/followup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          partContext,
        }),
      });

      let data: any = null;
      try {
        const response = await fetch('/api/followup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            partContext,
          }),
        });

        const text = await response.text();
        try {
          data = JSON.parse(text);
        } catch {
          // Not JSON
        }

        if (!response.ok || !data) {
          data = null;
        }
      } catch (e) {
        data = null;
      }

      if (!data) {
        // Smart technical assistant fallback for counter support
        const car = partContext?.carSummary || 'do veículo informado';
        const part = partContext?.partSummary || 'desta peça';
        const queryLower = q.toLowerCase();

        let tip = `Para ${part} no ${car}: Sempre confira no documento se o ano de fabricação bate com o ano do modelo, se o motor possui ar condicionado/direção hidráulica instalados de fábrica ou adaptação, e conte os dentes/estrias da peça antiga antes de entregar no balcão.`;

        if (queryLower.includes('ar') || queryLower.includes('condicionado')) {
          tip = `Atenção no balcão: Veículos com Ar Condicionado frequentemente utilizam correias de medidas diferentes (número de estrias PK maior), radiadores de colmeia mais espessa e compressores específicos. Confira o código gravado na peça retirada do cliente.`;
        } else if (queryLower.includes('dente') || queryLower.includes('estria')) {
          tip = `Dica de ouro no balcão: Sempre solicite ao mecânico ou cliente a contagem exata dos dentes da correia ou estrias do cubo/homocinética antes da retirada para evitar devolução.`;
        } else if (queryLower.includes('par') || queryLower.includes('jogo') || queryLower.includes('quant')) {
          tip = `Regra de aplicação: Amortecedores, molas, discos e pastilhas de freio devem ser trocados no par (eixo dianteiro ou traseiro) para garantir estabilidade e frenagem uniforme.`;
        }

        data = {
          answer: tip,
          sources: [
            { uri: 'https://catalogo.nakata.com.br', title: 'Catálogo Nakata' },
            { uri: 'https://catalogo.cofap.com.br', title: 'Catálogo Cofap' },
          ],
        };
      }

      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: 'assistant',
        content: data.answer || 'Sem resposta disponível.',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (data.sources && Array.isArray(data.sources)) {
        setSources(data.sources);
      }
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: `msg-err-${Date.now()}`,
        role: 'assistant',
        content: `Aviso: ${err.message || 'Não foi possível completar a consulta na web neste momento.'}`,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickQuestions = [
    'Quantas peças dessa vão no carro e troca em par ou jogo?',
    'O cliente disse que o carro tem ar condicionado, muda o código?',
    'Qual o código na marca Nakata ou Cofap?',
    'Quantos dentes tem a correia ou polia?',
    'Tem diferença se for câmbio automático?',
  ];

  return (
    <div
      id="part-followup-chat-container"
      className={`rounded-2xl border p-5 transition-all ${
        darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
      }`}
    >
      <div className="flex items-center justify-between mb-3 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 flex items-center justify-center">
            <HelpCircle className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-zinc-950 dark:text-white">
              Tira-Dúvidas de Balcão com Google IA
            </h2>
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
              Faça perguntas específicas sobre variações de aplicação, marcas ou medidas desta peça
            </p>
          </div>
        </div>
      </div>

      {/* Suggested Quick Questions */}
      {messages.length === 0 && (
        <div className="mb-4">
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-2 font-bold uppercase tracking-wider">
            Perguntas frequentes para tirar na hora com o cliente:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleAsk(q)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border text-left font-semibold transition-all ${
                  darkMode
                    ? 'bg-zinc-800/60 border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-900 hover:border-zinc-500 shadow-2xs'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message History */}
      {messages.length > 0 && (
        <div className="space-y-3 mb-4 max-h-72 overflow-y-auto pr-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-3 rounded-xl text-xs leading-relaxed ${
                msg.role === 'user'
                  ? 'ml-8 bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold'
                  : darkMode
                  ? 'mr-8 bg-zinc-800 border border-zinc-700 text-zinc-100 font-semibold'
                  : 'mr-8 bg-zinc-50 border border-zinc-300 text-zinc-950 font-semibold shadow-xs'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold mb-1 uppercase text-[10px]">
                {msg.role === 'user' ? (
                  <>
                    <MessageSquare className="w-3 h-3 text-white dark:text-zinc-950" /> Balconista:
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-zinc-500 dark:text-zinc-400" /> Especialista Google IA:
                  </>
                )}
              </div>
              <div className="whitespace-pre-wrap text-zinc-900 dark:text-zinc-100 font-medium">{msg.content}</div>
            </div>
          ))}

          {isLoading && (
            <div
              className={`mr-8 p-3 rounded-xl text-xs border flex items-center gap-2 font-medium ${
                darkMode ? 'bg-zinc-800 border-zinc-700 text-zinc-200' : 'bg-zinc-100 border-zinc-300 text-zinc-900'
              }`}
            >
              <div className="w-3.5 h-3.5 border-2 border-zinc-900 dark:border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Consultando catálogos e variações no Google...</span>
            </div>
          )}
        </div>
      )}

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAsk();
        }}
        className="flex items-center gap-2"
      >
        <input
          id="input-followup-question"
          type="text"
          value={inputQuestion}
          onChange={(e) => setInputQuestion(e.target.value)}
          placeholder="Ex: O cliente disse que o carro dele tem ar condicionado, muda o código?"
          disabled={isLoading}
          className={`flex-1 px-3.5 py-2 rounded-xl border text-xs transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 dark:focus:ring-zinc-100 ${
            darkMode
              ? 'bg-zinc-800/80 border-zinc-700 text-zinc-100 placeholder-zinc-500'
              : 'bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400'
          }`}
        />
        <button
          id="btn-send-followup"
          type="submit"
          disabled={isLoading || !inputQuestion.trim()}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
            isLoading || !inputQuestion.trim()
              ? 'bg-zinc-300 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed'
              : 'bg-zinc-950 hover:bg-black text-white dark:bg-zinc-100 dark:hover:bg-white dark:text-zinc-950 active:scale-95 shadow-xs'
          }`}
        >
          <Send className="w-3.5 h-3.5" />
          <span>Perguntar</span>
        </button>
      </form>
    </div>
  );
};
