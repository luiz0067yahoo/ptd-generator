import React from 'react';
import { Info } from 'lucide-react';

export default function Step2UnidadeCurricular({ data, onChange }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
          2
        </div>
        <div>
          <h3 className="text-xl font-heading font-bold text-slate-900">Unidade Curricular (UC)</h3>
          <p className="text-sm text-slate-500">Defina a Unidade Curricular vigente e sua respectiva carga horária total.</p>
        </div>
      </div>

      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Organização Curricular:</strong> A UC corresponde ao módulo de competência específica ou interdisciplinar definida no plano de curso técnico.
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="uc" className="block text-sm font-semibold text-slate-700 mb-1">
            Unidade Curricular (UC) <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="uc"
            name="uc"
            value={data.uc}
            onChange={(e) => onChange('uc', e.target.value)}
            placeholder="Ex: Evidenciar fundamentos e conceitos de Inteligência Artificial"
            className="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
          <p className="text-xs text-slate-400 mt-1">
            Exemplos: Desenvolver linguagem de programação Python, Administrar processos organizacionais, etc.
          </p>
        </div>

        <div>
          <label htmlFor="ch_uc" className="block text-sm font-semibold text-slate-700 mb-1">
            Carga Horária (C.H) da UC <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            id="ch_uc"
            name="ch_uc"
            value={data.ch_uc}
            onChange={(e) => onChange('ch_uc', e.target.value)}
            placeholder="Ex: 100H ou 32H"
            className="w-full sm:w-64 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
