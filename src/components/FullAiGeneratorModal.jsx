import React, { useState, useEffect } from 'react';
import { Sparkles, X, Loader2, BookOpen, AlertCircle } from 'lucide-react';

export default function FullAiGeneratorModal({
  isOpen,
  onClose,
  initialData,
  onGenerate,
  loading,
  hasGeminiKey
}) {
  const [curso, setCurso] = useState('');
  const [uc, setUc] = useState('');
  const [chUc, setChUc] = useState('80 Horas');
  const [instrutor, setInstrutor] = useState('');
  const [formato, setFormato] = useState('Presencial');

  useEffect(() => {
    if (initialData) {
      setCurso(initialData.curso || 'Técnico em Desenvolvimento de Sistemas');
      setUc(initialData.uc || 'Desenvolver Aplicações Web');
      setChUc(initialData.ch_uc || '80 Horas');
      setInstrutor(initialData.instrutor || '');
      setFormato(initialData.formato || 'Presencial');
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate({
      curso: curso.trim() || 'Curso Técnico',
      uc: uc.trim() || 'Prática Profissional',
      ch_uc: chUc.trim() || '80 Horas',
      instrutor: instrutor.trim(),
      formato
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 text-slate-800 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center text-lg flex-shrink-0 shadow-md">
              <Sparkles className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900 leading-tight">
                Gerar PTD Completo com IA
              </h3>
              <p className="text-xs text-slate-500">
                Gere todos os 12 passos do plano pedagógico em uma única requisição
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Info banner */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 mb-3 text-xs text-amber-900 flex items-start gap-2">
          <BookOpen className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            A IA preencherá automaticamente: <strong>Situação de Aprendizagem, Indicadores, Competências (CHA), Metodologias Ativas, Momentos Didáticos, Avaliação e Referências ABNT</strong>.
          </div>
        </div>

        {!hasGeminiKey && (
          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 mb-3 text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Chave Gemini não configurada:</strong> Configure sua chave no menu <em>"Chave Gemini"</em> no cabeçalho para gerar o plano com a inteligência artificial.
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Nome do Curso Técnico <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={curso}
              onChange={(e) => setCurso(e.target.value)}
              placeholder="Ex: Técnico em Enfermagem, Técnico em Informática, etc."
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Unidade Curricular (UC) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              disabled={loading}
              value={uc}
              onChange={(e) => setUc(e.target.value)}
              placeholder="Ex: Primeiros Socorros, Banco de Dados, Planejamento Financeiro"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition disabled:bg-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Carga Horária da UC
              </label>
              <input
                type="text"
                disabled={loading}
                value={chUc}
                onChange={(e) => setChUc(e.target.value)}
                placeholder="Ex: 80 Horas"
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition disabled:bg-slate-100"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Formato da Aula
              </label>
              <select
                disabled={loading}
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition bg-white disabled:bg-slate-100"
              >
                <option value="Presencial">Presencial</option>
                <option value="EaD">EaD (Educação a Distância)</option>
                <option value="Híbrido">Híbrido</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Instrutor(a) (Opcional)
            </label>
            <input
              type="text"
              disabled={loading}
              value={instrutor}
              onChange={(e) => setInstrutor(e.target.value)}
              placeholder="Nome do docente responsável"
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition disabled:bg-slate-100"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || !curso.trim() || !uc.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-senac-orange to-amber-600 hover:from-senac-orange-hover hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Gerando PTD Completo...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Gerar Todos os Campos com IA</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
