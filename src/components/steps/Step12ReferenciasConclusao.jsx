import React from 'react';
import { Info, Sparkles, Loader2, Eye } from 'lucide-react';
import DocumentPreview from '../DocumentPreview';
import ExportActions from '../ExportActions';

export default function Step12ReferenciasConclusao({
  data,
  onChange,
  onSuggest,
  loadingSuggest,
  onShowToast
}) {
  return (
    <div className="max-w-6xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            12
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">
              Referências Bibliográficas (Normas ABNT) & Conclusão
            </h3>
            <p className="text-sm text-slate-500">
              Obras básicas, complementares e documentações formatadas nas normas ABNT.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(12)}
          disabled={loadingSuggest}
          className="btn-ai-sparkle inline-flex items-center gap-1.5 text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition disabled:opacity-50"
        >
          {loadingSuggest ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          <span>✨ Gerar ABNT com IA</span>
        </button>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Norma ABNT NBR 6023:</strong> As referências devem constar em conformidade técnica, com Autor, Título, Edição, Local, Editora, Ano e Links de acesso quando aplicável.
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="referencias" className="block text-sm font-semibold text-slate-700">
            REFERÊNCIAS: <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {data.referencias?.length || 0} caracteres
          </span>
        </div>
        <textarea
          id="referencias"
          name="referencias"
          value={data.referencias}
          onChange={(e) => onChange('referencias', e.target.value)}
          rows="7"
          placeholder={`Ex:\nEIBEN, Agoston E.; SMITH, James E. Introduction to evolutionary computing. 2. ed. Berlim: Springer, 2015.\nGOOGLE. Gemini API documentation and developer guides. Google Developers, 2026. Disponível em: https://ai.google.dev. Acesso em: 31 ago. 2026.\nPYTHON Software Foundation. Python documentation. Disponível em: https://docs.python.org/3/. Acesso em: 31 ago. 2026.`}
          className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
        />
      </div>

      {/* EXPORT ACTIONS (DOC & PDF) */}
      <ExportActions data={data} onShowToast={onShowToast} />

      {/* DOCUMENT PREVIEW (VISUAL SIMULATION) */}
      <div className="mt-8">
        <div className="flex items-center gap-2 mb-2 text-slate-800">
          <Eye className="w-5 h-5 text-senac-blue" />
          <h4 className="font-heading font-bold text-base">
            Pré-visualização Final do Plano de Trabalho Docente
          </h4>
        </div>
        <p className="text-xs text-slate-500 mb-4">
          Confira abaixo o layout oficial estruturado que será gerado nos arquivos .doc (compatível com Word 97-2003) e .pdf.
        </p>

        <DocumentPreview data={data} />
      </div>
    </div>
  );
}
