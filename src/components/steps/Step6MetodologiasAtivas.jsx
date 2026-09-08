import React from 'react';
import { Info, Sparkles, Loader2 } from 'lucide-react';

export default function Step6MetodologiasAtivas({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            6
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(4) Metodologias Ativas (Geral)</h3>
            <p className="text-sm text-slate-500">Estratégias pedagógicas ativas que orientam o processo de ensino-aprendizagem da UC.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(6)}
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
          <strong className="font-semibold">Modelo Pedagógico Senac:</strong> O estudante é protagonista de sua formação profissional. Utilize metodologias ativas como Aprendizagem Baseada em Problemas (PBL), Estudos de Caso, Gamificação e Sala de Aula Invertida.
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="metodologias_ativas" className="block text-sm font-semibold text-slate-700">
            (4) Metodologias ativas: <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {data.metodologias_ativas?.length || 0} caracteres
          </span>
        </div>
        <textarea
          id="metodologias_ativas"
          name="metodologias_ativas"
          value={data.metodologias_ativas}
          onChange={(e) => onChange('metodologias_ativas', e.target.value)}
          rows="6"
          placeholder="Ex: Aulas expositivas dialogadas integradas à resolução de estudos de caso reais. Simulações práticas individuais e em equipe. Debates estruturados sobre cenários contemporâneos..."
          className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
