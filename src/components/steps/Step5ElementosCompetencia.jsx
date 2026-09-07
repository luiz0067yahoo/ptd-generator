import React from 'react';
import { Info, Sparkles, Loader2, BookOpen, Settings, Heart } from 'lucide-react';

export default function Step5ElementosCompetencia({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            5
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(3) Elementos da Competência</h3>
            <p className="text-sm text-slate-500">Conhecimentos (Saber), Habilidades (Saber Fazer) e Atitudes/Valores (Saber Ser/Conviver).</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(5)}
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
          <strong className="font-semibold">Tríade da Competência Senac:</strong> A competência se materializa na mobilização articulada de saberes conceituais, procedimentais e socioemocionais no contexto profissional.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Conhecimentos */}
        <div>
          <label htmlFor="conhecimentos" className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-senac-blue" />
            <span>Conhecimentos</span>
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="conhecimentos"
            name="conhecimentos"
            value={data.conhecimentos}
            onChange={(e) => onChange('conhecimentos', e.target.value)}
            rows="8"
            placeholder="Conceitos, teorias, princípios, normas e vocabulário técnico aplicáveis à competência..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>

        {/* Habilidades */}
        <div>
          <label htmlFor="habilidades" className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Settings className="w-4 h-4 text-senac-orange" />
            <span>Habilidades</span>
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="habilidades"
            name="habilidades"
            value={data.habilidades}
            onChange={(e) => onChange('habilidades', e.target.value)}
            rows="8"
            placeholder="Ações práticas, procedimentos operacionais, uso de instrumentos e métodos..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>

        {/* Atitudes e Valores */}
        <div>
          <label htmlFor="atitudes_valores" className="block text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
            <Heart className="w-4 h-4 text-emerald-600" />
            <span>Atitudes e Valores</span>
            <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="atitudes_valores"
            name="atitudes_valores"
            value={data.atitudes_valores}
            onChange={(e) => onChange('atitudes_valores', e.target.value)}
            rows="8"
            placeholder="Posturas profissionais, ética, zelo, cordialidade, flexibilidade e colaboração..."
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
