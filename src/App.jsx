import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import StepNavigator from './components/StepNavigator';
import Step1Identificacao from './components/steps/Step1Identificacao';
import Step2UnidadeCurricular from './components/steps/Step2UnidadeCurricular';
import Step3SituacaoAprendizagem from './components/steps/Step3SituacaoAprendizagem';
import Step4Indicadores from './components/steps/Step4Indicadores';
import Step5ElementosCompetencia from './components/steps/Step5ElementosCompetencia';
import Step6MetodologiasAtivas from './components/steps/Step6MetodologiasAtivas';
import Step7MomentosDidaticos from './components/steps/Step7MomentosDidaticos';
import Step8ProcedimentosAvaliativos from './components/steps/Step8ProcedimentosAvaliativos';
import Step9InstrumentosAvaliacao from './components/steps/Step9InstrumentosAvaliacao';
import Step10MarcasFormativas from './components/steps/Step10MarcasFormativas';
import Step11MateriaisRecursos from './components/steps/Step11MateriaisRecursos';
import Step12ReferenciasConclusao from './components/steps/Step12ReferenciasConclusao';
import FullAiGeneratorModal from './components/FullAiGeneratorModal';

import { OFFLINE_PRESETS, getOfflineSuggestion, generateFullInstitutionalPtd } from './services/offlineDatabase';
import { generateWithGemini, generateFullPtdWithGemini, cleanMarkdown, parseJsonSafely } from './services/geminiService';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import './styles/wizard.css';

// Todos os campos começam zerados conforme requisito estrito
const EMPTY_FORM_DATA = {
  curso: '',
  instrutor: '',
  formato: 'Presencial',
  uc: '',
  ch_uc: '',
  situacao_aprendizagem: '',
  indicadores: '',
  ch_situacao: '',
  conhecimentos: '',
  habilidades: '',
  atitudes_valores: '',
  metodologias_ativas: '',
  acao_inicial: '',
  reflexao: '',
  acao_final: '',
  proc_inicial: '',
  proc_reflexao: '',
  proc_final: '',
  instrumentos_avaliacao: '',
  marcas_formativas: '',
  materiais_tecnologicos: '',
  referencias: ''
};

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    try {
      const saved = sessionStorage.getItem('ptd_react_form');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Erro ao carregar dados salvos:', e);
    }
    return EMPTY_FORM_DATA;
  });

  const [geminiKey, setGeminiKey] = useState(() => {
    return sessionStorage.getItem('gemini_api_key') || '';
  });

  const [autosaved, setAutosaved] = useState(false);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showFullAiModal, setShowFullAiModal] = useState(false);
  const [loadingFullAi, setLoadingFullAi] = useState(false);

  // Autosave on change
  useEffect(() => {
    try {
      sessionStorage.setItem('ptd_react_form', JSON.stringify(formData));
      setAutosaved(true);
      const timer = setTimeout(() => setAutosaved(false), 1200);
      return () => clearTimeout(timer);
    } catch (e) {
      console.warn('Erro no autosave:', e);
    }
  }, [formData]);

  // Save gemini key
  const handleSetGeminiKey = (key) => {
    setGeminiKey(key);
    if (key) {
      sessionStorage.setItem('gemini_api_key', key);
      showToast('Chave Gemini salva na sessão!', 'success');
    } else {
      sessionStorage.removeItem('gemini_api_key');
      showToast('Chave Gemini removida com sucesso.', 'info');
    }
  };

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => {
      // Remove previous identical messages and limit to max 2 active toasts
      const filtered = prev.filter((t) => t.message !== message);
      return [...filtered.slice(-1), { id, message, type }];
    });
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  // Full AI PTD Generator Handler
  const handleGenerateFullPtd = async (params) => {
    if (!geminiKey || !geminiKey.trim()) {
      showToast('Chave da API Gemini não configurada. Insira sua chave no botão "Chave Gemini" no topo da página para gerar com IA.', 'error');
      return;
    }

    setLoadingFullAi(true);

    try {
      showToast('Consultando IA Google Gemini para gerar o PTD completo...', 'info');
      const aiData = await generateFullPtdWithGemini(params, geminiKey.trim());
      if (aiData && aiData.situacao_aprendizagem) {
        const fullResult = {
          ...params,
          ...aiData
        };
        setFormData((prev) => ({
          ...prev,
          ...fullResult
        }));
        setShowFullAiModal(false);
        showToast('PTD completo gerado com sucesso via IA Google Gemini!', 'success');
        setCurrentStep(1);
      } else {
        throw new Error('A IA não retornou todos os campos obrigatórios do PTD.');
      }
    } catch (err) {
      console.error('Falha na requisição Gemini completa:', err);
      const errMsg = err?.message || '';
      if (errMsg.includes('429') || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('resource_exhausted')) {
        showToast('Erro 429: Cota excedida na chave Gemini. Gere a chave em um "Novo Projeto" no AI Studio conforme o tutorial.', 'error');
      } else if (errMsg.includes('400') || errMsg.includes('403') || errMsg.toLowerCase().includes('key not valid')) {
        showToast('Erro: Chave Gemini inválida ou não autorizada. Verifique sua chave no topo da tela.', 'error');
      } else {
        showToast(`Erro na comunicação com o Google Gemini: ${errMsg}`, 'error');
      }
    } finally {
      setLoadingFullAi(false);
    }
  };

  const handleResetForm = () => {
    setShowResetModal(true);
  };

  const executeReset = () => {
    setFormData(EMPTY_FORM_DATA);
    sessionStorage.removeItem('ptd_react_form');
    setShowResetModal(false);
    showToast('Todos os campos foram zerados com sucesso!', 'info');
    setCurrentStep(1);
  };

  // AI Suggestion Dispatcher - Comunicação Direta com IA
  const handleSuggest = async (stepId) => {
    if (!geminiKey || !geminiKey.trim()) {
      showToast('Chave da API Gemini não configurada. Insira sua chave no botão "Chave Gemini" no topo para sugerir com IA.', 'error');
      return;
    }

    setLoadingSuggest(true);
    const curso = formData.curso || 'Curso Técnico';
    const uc = formData.uc || 'Prática Profissional';
    const chUc = formData.ch_uc || '80H';
    const situacao = formData.situacao_aprendizagem || '';

    try {
      showToast('Consultando IA Google Gemini...', 'info');
      const baseContext = `Você é um especialista em Design Instrucional e Pedagogia do Senac.
Contexto do PTD:
- Curso Técnico: "${curso}"
- Unidade Curricular: "${uc}"
- Carga Horária da UC: "${chUc}"
${situacao ? `- Situação de Aprendizagem: "${situacao}"` : ''}

Diretrizes: Responda em português brasileiro com rigor pedagógico do Modelo Pedagógico Senac (Competências, Metodologias Ativas, Avaliação Formativa e Processual).`;

      let generated = null;

      if (stepId === 3) {
        const p = `${baseContext}\nTarefa: Escreva a "(1) Situação de Aprendizagem" para esta UC (1 a 2 parágrafos com desafio profissional articulado). Apenas o texto direto sem introduções.`;
        const res = await generateWithGemini(p, geminiKey.trim());
        generated = { situacao_aprendizagem: cleanMarkdown(res) };
      } else if (stepId === 4) {
        const p = `${baseContext}\nTarefa: Gere os "(2) Indicadores trabalhados na Situação de Aprendizagem" com carga horária distribuída (ex: "8 H") e o total de horas da situação.\nFormato: Linhas com indicador e carga horária ao fim. Última linha: TOTAL_CH: XX horas`;
        const res = await generateWithGemini(p, geminiKey.trim());
        const lines = res.split('\n');
        let chSit = '32 horas';
        const indLines = [];
        lines.forEach((l) => {
          if (l.toUpperCase().includes('TOTAL_CH:')) {
            chSit = l.split(':')[1].trim();
          } else if (l.trim()) {
            indLines.push(l.trim().replace(/^[-*•]\s*/, ''));
          }
        });
        generated = { indicadores: indLines.join('\n'), ch_situacao: chSit };
      } else if (stepId === 5) {
        const p = `${baseContext}\nTarefa: Gere os "(3) Elementos da Competência" em JSON estrito:\n{\n  "conhecimentos": "itens...",\n  "habilidades": "itens...",\n  "atitudes_valores": "itens..."\n}`;
        const res = await generateWithGemini(p, geminiKey.trim());
        const parsed = parseJsonSafely(res);
        if (parsed?.conhecimentos) {
          generated = parsed;
        }
      } else if (stepId === 6) {
        const p = `${baseContext}\nTarefa: Escreva a abordagem de "(4) Metodologias Ativas (Geral)" para a UC (1 parágrafo denso citando PBL, estudos de caso, etc). Apenas o texto.`;
        const res = await generateWithGemini(p, geminiKey.trim());
        generated = { metodologias_ativas: cleanMarkdown(res) };
      } else if (stepId === 7) {
        const p = `${baseContext}\nTarefa: Gere os 3 momentos didáticos da Situação de Aprendizagem em JSON:\n{\n  "acao_inicial": "...",\n  "reflexao": "...",\n  "acao_final": "..."\n}`;
        const res = await generateWithGemini(p, geminiKey.trim());
        const parsed = parseJsonSafely(res);
        if (parsed?.acao_inicial) {
          generated = parsed;
        }
      } else if (stepId === 8) {
        const p = `${baseContext}\nTarefa: Gere os procedimentos de avaliação formativa correspondentes aos momentos em JSON:\n{\n  "proc_inicial": "...",\n  "proc_reflexao": "...",\n  "proc_final": "..."\n}`;
        const res = await generateWithGemini(p, geminiKey.trim());
        const parsed = parseJsonSafely(res);
        if (parsed?.proc_inicial) {
          generated = parsed;
        }
      } else if (stepId === 9) {
        const p = `${baseContext}\nTarefa: Gere a lista de "(9) Instrumentos de Avaliação" do Senac (Portfólios, rubricas, observações diretas) com justificativa. Apenas as linhas.`;
        const res = await generateWithGemini(p, geminiKey.trim());
        generated = { instrumentos_avaliacao: cleanMarkdown(res) };
      } else if (stepId === 10) {
        const p = `${baseContext}\nTarefa: Liste as Marcas Formativas Senac trabalhadas (Domínio técnico-científico, Visão crítica, etc). Apenas a lista.`;
        const res = await generateWithGemini(p, geminiKey.trim());
        generated = { marcas_formativas: cleanMarkdown(res) };
      } else if (stepId === 11) {
        const p = `${baseContext}\nTarefa: Liste os "(11) Materiais e Recursos Tecnológicos" necessários para a UC. Apenas as linhas.`;
        const res = await generateWithGemini(p, geminiKey.trim());
        generated = { materiais_tecnologicos: cleanMarkdown(res) };
      } else if (stepId === 12) {
        const p = `${baseContext}\nTarefa: Gere 3 a 5 Referências Bibliográficas formatadas nas normas ABNT NBR 6023 para a UC "${uc}". Apenas a lista alfabética.`;
        const res = await generateWithGemini(p, geminiKey.trim());
        generated = { referencias: cleanMarkdown(res) };
      }

      if (generated) {
        setFormData((prev) => ({
          ...prev,
          ...generated
        }));
        showToast('Conteúdo gerado via IA Google Gemini com sucesso!', 'success');
      } else {
        showToast('A IA não retornou conteúdo estruturado para este passo. Tente novamente.', 'warning');
      }
    } catch (err) {
      console.error('Falha na requisição Gemini:', err);
      const errMsg = err?.message || '';
      if (errMsg.includes('429') || errMsg.toLowerCase().includes('quota') || errMsg.toLowerCase().includes('resource_exhausted')) {
        showToast('Erro 429: Cota excedida na chave Gemini. Consulte o tutorial para criar a chave em um "Novo Projeto" gratuito.', 'error');
      } else if (errMsg.includes('400') || errMsg.includes('403') || errMsg.toLowerCase().includes('key not valid') || errMsg.toLowerCase().includes('api_key_invalid')) {
        showToast('Erro: Chave Gemini inválida ou não autorizada. Verifique sua chave no topo da tela.', 'error');
      } else {
        showToast(`Erro ao comunicar com a IA Gemini: ${errMsg}`, 'error');
      }
    } finally {
      setLoadingSuggest(false);
    }
  };

  const nextStep = () => {
    if (currentStep < 12) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-800">
      {/* Header */}
      <Header
        geminiKey={geminiKey}
        setGeminiKey={handleSetGeminiKey}
        onResetForm={handleResetForm}
        onOpenFullAiModal={() => setShowFullAiModal(true)}
        autosaved={autosaved}
        onShowToast={showToast}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Step Navigator with strict rule: Only previous and current step display text label */}
        <StepNavigator
          currentStep={currentStep}
          onGoToStep={(step) => {
            setCurrentStep(step);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Wizard Step Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-6 sm:p-8">
          {currentStep === 1 && (
            <Step1Identificacao
              data={formData}
              onChange={handleFieldChange}
              onOpenFullAiModal={() => setShowFullAiModal(true)}
            />
          )}
          {currentStep === 2 && (
            <Step2UnidadeCurricular data={formData} onChange={handleFieldChange} />
          )}
          {currentStep === 3 && (
            <Step3SituacaoAprendizagem
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 4 && (
            <Step4Indicadores
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 5 && (
            <Step5ElementosCompetencia
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 6 && (
            <Step6MetodologiasAtivas
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 7 && (
            <Step7MomentosDidaticos
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 8 && (
            <Step8ProcedimentosAvaliativos
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 9 && (
            <Step9InstrumentosAvaliacao
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 10 && (
            <Step10MarcasFormativas
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 11 && (
            <Step11MateriaisRecursos
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
            />
          )}
          {currentStep === 12 && (
            <Step12ReferenciasConclusao
              data={formData}
              onChange={handleFieldChange}
              onSuggest={handleSuggest}
              loadingSuggest={loadingSuggest}
              onShowToast={showToast}
            />
          )}

          {/* Navigation Controls */}
          <div className="mt-8 pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-semibold text-xs sm:text-sm transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Anterior</span>
            </button>

            {currentStep < 12 && (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 rounded-xl bg-senac-blue hover:bg-senac-navy text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2"
              >
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Reset Confirmation Modal */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center gap-3 text-rose-600 mb-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-900">
                Limpar Todos os Campos?
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 mb-5">
              Esta ação apagará todos os dados do formulário e restaurará os campos para o estado zerado inicial. Deseja continuar?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={executeReset}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow transition"
              >
                Sim, Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full AI PTD Generator Modal */}
      <FullAiGeneratorModal
        isOpen={showFullAiModal}
        onClose={() => setShowFullAiModal(false)}
        initialData={formData}
        onGenerate={handleGenerateFullPtd}
        loading={loadingFullAi}
        hasGeminiKey={!!geminiKey}
      />

      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            onClick={() => dismissToast(toast.id)}
            className={`toast-notification p-3.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2.5 transition-all duration-300 pointer-events-auto border cursor-pointer select-none ${
              toast.type === 'success'
                ? 'bg-emerald-600 text-white border-emerald-500'
                : toast.type === 'warning'
                ? 'bg-amber-500 text-white border-amber-400'
                : toast.type === 'error'
                ? 'bg-rose-600 text-white border-rose-500'
                : 'bg-slate-800 text-white border-slate-700'
            }`}
            title="Clique para fechar esta notificação"
          >
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0 pointer-events-none" />}
            {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 flex-shrink-0 pointer-events-none" />}
            {toast.type === 'error' && <XCircle className="w-4 h-4 flex-shrink-0 pointer-events-none" />}
            {toast.type === 'info' && <Info className="w-4 h-4 flex-shrink-0 pointer-events-none" />}
            <span className="flex-1 leading-snug pointer-events-none">{toast.message}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dismissToast(toast.id);
              }}
              className="w-8 h-8 -mr-1 flex items-center justify-center rounded-lg hover:bg-white/20 active:scale-90 text-white transition flex-shrink-0 cursor-pointer"
              title="Fechar mensagem"
              aria-label="Fechar mensagem"
            >
              <X className="w-4 h-4 pointer-events-none" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
