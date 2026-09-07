import React from 'react';
import { Info, Sparkles, Loader2 } from 'lucide-react';

export default function Step11MateriaisRecursos({ data, onChange, onSuggest, loadingSuggest }) {
  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            11
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(11) Materiais e Recursos Tecnológicos</h3>
            <p className="text-sm text-slate-500">Hardwares, softwares, equipamentos e ambientes necessários para a realização da UC.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(11)}
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
          <strong className="font-semibold">Infraestrutura e Meios:</strong> Liste os laboratórios, equipamentos multimídia, softwares e plataformas necessários para as práticas profissionais da UC.
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="materiais_tecnologicos" className="block text-sm font-semibold text-slate-700">
            Materiais e Recursos Tecnológicos <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {data.materiais_tecnologicos?.length || 0} caracteres
          </span>
        </div>
        <textarea
          id="materiais_tecnologicos"
          name="materiais_tecnologicos"
          value={data.materiais_tecnologicos}
          onChange={(e) => onChange('materiais_tecnologicos', e.target.value)}
          rows="6"
          placeholder={`Ex:\nLaboratório de informática com computadores conectados à internet.\nEquipamento multimídia (projetor e caixas de som).\nAmbiente de desenvolvimento integrado (IDE) configurado.\nAcesso à biblioteca virtual e documentações técnicas oficiais.`}
          className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
