import React from 'react';
import { Info, Sparkles, Loader2 } from 'lucide-react';

export default function Step9InstrumentosAvaliacao({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            9
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(9) Instrumentos de Avaliação</h3>
            <p className="text-sm text-slate-500">Recursos e ferramentas formais para registro de evidências da aprendizagem.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(9)}
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
          <strong className="font-semibold">Instrumentos recomendados no Senac:</strong> Portfólios, rubricas de avaliação, listas de checagem (checklists), fichas de observação direta, relatórios técnicos e apresentações orais.
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="instrumentos_avaliacao" className="block text-sm font-semibold text-slate-700">
            (9) Instrumentos de avaliação: <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {data.instrumentos_avaliacao?.length || 0} caracteres
          </span>
        </div>
        <textarea
          id="instrumentos_avaliacao"
          name="instrumentos_avaliacao"
          value={data.instrumentos_avaliacao}
          onChange={(e) => onChange('instrumentos_avaliacao', e.target.value)}
          rows="6"
          placeholder={`Ex:\nPortfólios: para acompanhamento contínuo da evolução dos projetos.\nObservações diretas: registro do engajamento individual e em equipe.\nProjetos práticos: avaliação do briefing, protótipo funcional e documentação técnica.\nApresentações finais: sustentação da solução e justificativas das escolhas adotadas.`}
          className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
