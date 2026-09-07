import React from 'react';
import { Info, Sparkles } from 'lucide-react';

export default function Step1Identificacao({ data, onChange, onOpenFullAiModal }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
          1
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-slate-900">Identificação Básica</h3>
          <p className="text-sm text-slate-500">Informe os dados gerais do curso técnico e do corpo docente.</p>
        </div>
      </div>

      {/* Full AI PTD Assistant Card */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50/70 border border-amber-200/90 rounded-2xl p-4 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-orange text-white flex items-center justify-center flex-shrink-0 shadow">
            <Sparkles className="w-5 h-5 text-yellow-200" />
          </div>
          <div>
            <h4 className="font-heading font-bold text-sm text-slate-900">Preencher Todo o PTD com IA</h4>
            <p className="text-xs text-slate-600">Gere todas as 12 etapas do plano pedagógico de uma única vez.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenFullAiModal}
          className="w-full sm:w-auto px-4 py-2 bg-senac-orange hover:bg-senac-orange-hover text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-2 flex-shrink-0 active:scale-95 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Gerar Tudo com IA</span>
        </button>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Diretriz Senac:</strong> O Plano de Trabalho Docente detalha a transposição didática do Plano de Curso para as atividades pedagógicas articuladas às competências profissionais.
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="curso" className="block text-sm font-semibold text-slate-700 mb-1">
            Nome do Curso <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="curso"
            name="curso"
            value={data.curso}
            onChange={(e) => onChange('curso', e.target.value)}
            placeholder="Ex: Técnico em Inteligência Artificial"
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
          <p className="text-xs text-slate-400 mt-1">
            Exemplos: Técnico em Inteligência Artificial, Técnico em Desenvolvimento de Sistemas, Técnico em Administração.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="instrutor" className="block text-sm font-semibold text-slate-700 mb-1">
              Instrutor(a) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="instrutor"
              name="instrutor"
              value={data.instrutor}
              onChange={(e) => onChange('instrutor', e.target.value)}
              placeholder="Ex: Prof. Luiz Fernando Brogliatto Ferreira"
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="formato" className="block text-sm font-semibold text-slate-700 mb-1">
              Formato da Aula <span className="text-rose-500">*</span>
            </label>
            <select
              id="formato"
              name="formato"
              value={data.formato}
              onChange={(e) => onChange('formato', e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition bg-white"
            >
              <option value="Presencial">Presencial</option>
              <option value="EaD">EaD (Educação a Distância)</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
