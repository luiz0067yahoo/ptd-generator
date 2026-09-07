import React from 'react';
import { Info, Sparkles, Loader2, CheckCircle } from 'lucide-react';

const SENAC_MARCAS = [
  'Domínio técnico-científico',
  'Visão crítica',
  'Colaboração e comunicação',
  'Criatividade e atitude empreendedora',
  'Autonomia digital',
  'Atitude sustentável'
];

export default function Step10MarcasFormativas({ data, onChange, onSuggest, loadingSuggest }) {
  const toggleMarca = (marca) => {
    let lines = (data.marcas_formativas || '').split('\n').map(l => l.trim()).filter(Boolean);
    const index = lines.findIndex(l => l.toLowerCase().includes(marca.toLowerCase()));

    if (index >= 0) {
      lines.splice(index, 1);
    } else {
      lines.push(`${marca}.`);
    }
    onChange('marcas_formativas', lines.join('\n'));
  };

  const textLower = (data.marcas_formativas || '').toLowerCase();

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">
            10
          </div>
          <div>
            <h3 className="text-xl font-heading font-bold text-slate-900">(10) Marcas Formativas</h3>
            <p className="text-sm text-slate-500">Atributos que caracterizam o perfil profissional dos egressos formados pelo Senac.</p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onSuggest(10)}
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

      <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-3.5 mb-4 text-xs text-blue-900 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="font-semibold">Seleção Rápida de Marcas Senac:</strong> Clique nas etiquetas abaixo para adicionar ou remover as marcas institucionais diretamente no texto.
        </div>
      </div>

      {/* Quick Tag Selectors */}
      <div className="flex flex-wrap gap-2 mb-4">
        {SENAC_MARCAS.map(marca => {
          const selected = textLower.includes(marca.toLowerCase());
          return (
            <button
              key={marca}
              type="button"
              onClick={() => toggleMarca(marca)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition flex items-center gap-1.5 ${
                selected 
                  ? 'bg-senac-soft text-senac-blue border-senac-blue font-semibold' 
                  : 'bg-white border-slate-300 text-slate-700 hover:border-senac-blue hover:text-senac-blue'
              }`}
            >
              <CheckCircle className={`w-3.5 h-3.5 ${selected ? 'text-senac-blue' : 'text-slate-400'}`} />
              <span>{marca}</span>
            </button>
          );
        })}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label htmlFor="marcas_formativas" className="block text-sm font-semibold text-slate-700">
            Marcas Formativas a serem trabalhadas <span className="text-rose-500">*</span>
          </label>
          <span className="text-xs text-slate-400">
            {data.marcas_formativas?.length || 0} caracteres
          </span>
        </div>
        <textarea
          id="marcas_formativas"
          name="marcas_formativas"
          value={data.marcas_formativas}
          onChange={(e) => onChange('marcas_formativas', e.target.value)}
          rows="6"
          placeholder={`Ex:\nDomínio técnico-científico.\nVisão crítica.\nColaboração e comunicação.\nCriatividade e atitude empreendedora.`}
          className="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
