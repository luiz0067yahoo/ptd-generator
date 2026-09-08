import React from 'react';
import { Lightbulb, Sparkles, Loader2 } from 'lucide-react';

export default function Step3SituacaoAprendizagem({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            3
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(1) Situação de Aprendizagem</h3>
            <p className="text-sm text-slate-500">Conjunto de passos articulados que garantem o exercício prático da competência.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(3)}
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

      <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3.5 mb-6 text-xs text-amber-900 flex items-start gap-2.5">
        <Lightbulb className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Como estruturar:</strong> Contextualize um cenário desafiador do mundo do trabalho em que o estudante atuará em etapas claras (análise, planejamento, execução e entrega).
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="situacao_aprendizagem" className="block text-sm font-semibold text-slate-700">
            SITUAÇÃO DE APRENDIZAGEM: <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {data.situacao_aprendizagem?.length || 0} caracteres
          </span>
        </div>
        <textarea
          id="situacao_aprendizagem"
          name="situacao_aprendizagem"
          value={data.situacao_aprendizagem}
          onChange={(e) => onChange('situacao_aprendizagem', e.target.value)}
          rows="7"
          placeholder="Descreva o desafio pedagógico, a problematização profissional e as atividades principais..."
          className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
