import React from 'react';
import { Info, Sparkles, Loader2 } from 'lucide-react';

export default function Step4Indicadores({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            4
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(2) Indicadores e Carga Horária</h3>
            <p className="text-sm text-slate-500">Indicadores trabalhados e carga horária dedicada à Situação de Aprendizagem.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(4)}
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
          <strong className="font-semibold">Indicadores de Competência:</strong> Evidências observáveis de que o aluno atingiu o desempenho esperado, com sua respectiva distribuição de horas.
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="indicadores" className="block text-sm font-semibold text-slate-700">
              Indicador(es) trabalhados na Situação de Aprendizagem: <span className="text-rose-500">*</span>
            </label>
            <span className="text-xs text-slate-400">
              {data.indicadores?.length || 0} caracteres
            </span>
          </div>
          <textarea
            id="indicadores"
            name="indicadores"
            value={data.indicadores}
            onChange={(e) => onChange('indicadores', e.target.value)}
            rows="6"
            placeholder={`Ex:\nO aluno desenvolverá habilidades para aplicar funções de data, texto, matemáticas e financeiras...`}
            className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label htmlFor="ch_situacao" className="block text-sm font-semibold text-slate-700 mb-1">
            C.H da Situação de aprendizagem: <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="ch_situacao"
            name="ch_situacao"
            value={data.ch_situacao}
            onChange={(e) => onChange('ch_situacao', e.target.value)}
            placeholder="Ex: 22/04/2024 a 26/04/2024 – segunda à sexta – 19:00 as 22:00h (15 horas)"
            className="w-full sm:w-96 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
