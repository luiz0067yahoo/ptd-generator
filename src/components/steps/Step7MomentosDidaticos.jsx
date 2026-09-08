import React from 'react';
import { Info, Sparkles, Loader2 } from 'lucide-react';

export default function Step7MomentosDidaticos({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            7
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">Momentos Didáticos das Metodologias Ativas</h3>
            <p className="text-sm text-slate-500">(5) Ação Inicial, (6) Reflexão e (7) Ação Final estruturadas na situação de aprendizagem.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(7)}
          disabled={loadingSuggest}
          className="btn-ai-sparkle inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition disabled:opacity-50"
        >
          {loadingSuggest ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>✨ Sugerir com IA</span>
        </button>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Ciclo de Aprendizagem Vivencial:</strong>
          Ação Inicial (sensibilização e hipóteses) &rarr; Reflexão (análise crítica e teorização) &rarr; Ação Final (aplicação, síntese e protótipo).
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="acao_inicial" className="block text-sm font-semibold text-slate-700 mb-1">
            (5) Metodologias ativas: Ação inicial <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="acao_inicial"
            name="acao_inicial"
            value={data.acao_inicial}
            onChange={(e) => onChange('acao_inicial', e.target.value)}
            rows="7"
            placeholder="Sensibilização dos estudantes, diagnóstico prévio e contextualização do desafio..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="reflexao" className="block text-sm font-semibold text-slate-700 mb-1">
            (6) Metodologias ativas: Reflexão <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="reflexao"
            name="reflexao"
            value={data.reflexao}
            onChange={(e) => onChange('reflexao', e.target.value)}
            rows="7"
            placeholder="Análise crítica, debates sobre alternativas, confrontação entre teoria e prática..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="acao_final" className="block text-sm font-semibold text-slate-700 mb-1">
            (7) Metodologias ativas: Ação Final <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="acao_final"
            name="acao_final"
            value={data.acao_final}
            onChange={(e) => onChange('acao_final', e.target.value)}
            rows="7"
            placeholder="Elaboração do produto final, execução técnica do projeto e validação dos resultados..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
