import React from 'react';
import { Info, Sparkles, Loader2 } from 'lucide-react';

export default function Step8ProcedimentosAvaliativos({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            8
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(8) Procedimentos Avaliativos</h3>
            <p className="text-sm text-slate-500">Critérios e procedimentos de avaliação formativa correspondentes a cada momento didático.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(8)}
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
          <strong className="font-semibold">Avaliação Formativa e Processual:</strong> No Senac, a avaliação acompanha continuamente o estudante, fornecendo feedback para o aprimoramento da competência.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="proc_inicial" className="block text-sm font-semibold text-slate-700 mb-1">
            (8) Procedimento avaliativo: Ação inicial <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="proc_inicial"
            name="proc_inicial"
            value={data.proc_inicial}
            onChange={(e) => onChange('proc_inicial', e.target.value)}
            rows="7"
            placeholder="Avaliação diagnóstica de prontidão, hipóteses iniciais e engajamento..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="proc_reflexao" className="block text-sm font-semibold text-slate-700 mb-1">
            Procedimento avaliativo: Reflexão <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="proc_reflexao"
            name="proc_reflexao"
            value={data.proc_reflexao}
            onChange={(e) => onChange('proc_reflexao', e.target.value)}
            rows="7"
            placeholder="Avaliação da capacidade analítica, autoavaliação e justificação técnica das decisões..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="proc_final" className="block text-sm font-semibold text-slate-700 mb-1">
            Procedimento avaliativo: Ação Final <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="proc_final"
            name="proc_final"
            value={data.proc_final}
            onChange={(e) => onChange('proc_final', e.target.value)}
            rows="7"
            placeholder="Avaliação do produto entregue, sustentação da proposta e aderência aos requisitos..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
