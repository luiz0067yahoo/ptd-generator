import React from 'react';
import { Check } from 'lucide-react';
import '../styles/wizard.css';

export const STEPS_META = [
  { id: 1, title: 'Identificação Básica' },
  { id: 2, title: 'Unidade Curricular' },
  { id: 3, title: '(1) Situação de Aprendizagem' },
  { id: 4, title: '(2) Indicadores e C.H' },
  { id: 5, title: '(3) Elementos da Competência' },
  { id: 6, title: '(4) Metodologias Ativas' },
  { id: 7, title: 'Momentos Didáticos' },
  { id: 8, title: 'Procedimentos Avaliativos' },
  { id: 9, title: '(9) Instrumentos de Avaliação' },
  { id: 10, title: '(10) Marcas Formativas' },
  { id: 11, title: '(11) Materiais e Recursos' },
  { id: 12, title: 'Referências e Exportação' }
];

export default function StepNavigator({ currentStep, onGoToStep }) {
  const percentage = Math.round((currentStep / STEPS_META.length) * 100);
  const currentMeta = STEPS_META.find(s => s.id === currentStep);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 mb-6">
      {/* Top Header of the Wizard */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-senac-blue bg-senac-soft px-3 py-1 rounded-full">
            Passo {currentStep} de {STEPS_META.length}
          </span>
          <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900 mt-1">
            {currentMeta?.title}
          </h2>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Progresso Geral</span>
            <span className="text-sm font-bold text-senac-blue ml-1.5">{percentage}%</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4 shadow-inner">
        <div 
          className="bg-gradient-to-r from-senac-blue to-senac-orange h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Step Pills Bar */}
      {/* REGRA: Mostrar apenas etapa anterior e etapa atual com descrição. As demais apenas o ícone de bolinha sem descrição. */}
      <div className="overflow-x-auto pb-2 scrollbar-thin">
        <div className="flex items-center justify-between gap-1.5 min-w-[700px]">
          {STEPS_META.map(s => {
            const isDone = s.id < currentStep;
            const isActive = s.id === currentStep;
            const isPrevious = s.id === currentStep - 1;
            // Mostra descrição apenas para a etapa anterior e a etapa atual!
            const showDescription = isActive || isPrevious;

            let statusClass = 'step-pending';
            if (isDone) statusClass = 'step-done';
            if (isActive) statusClass = 'step-active';

            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onGoToStep(s.id)}
                title={`Passo ${s.id}: ${s.title}`}
                className={`step-pill flex items-center gap-2 p-1 rounded-xl text-left transition hover:bg-slate-100 group ${statusClass}`}
              >
                {/* Circle Dot Icon */}
                <div className="step-pill-circle">
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{s.id}</span>
                  )}
                </div>

                {/* Description Text: Visível APENAS para etapa anterior e etapa atual */}
                {showDescription && (
                  <div className="pr-2 animate-fadeIn transition-all">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block leading-tight">
                      {isActive ? 'Atual' : 'Anterior'}
                    </span>
                    <span className={`text-xs font-semibold block leading-tight truncate max-w-[140px] ${
                      isActive ? 'text-senac-orange' : 'text-senac-blue'
                    }`}>
                      {s.title}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
