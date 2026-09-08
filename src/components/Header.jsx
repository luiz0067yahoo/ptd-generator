import React, { useState } from 'react';
import { SENAC_LOGO_BASE64 } from '../assets/logoSenac';
import { 
  Key, 
  Eye, 
  EyeOff, 
  Trash2, 
  Sparkles, 
  Check, 
  ExternalLink,
  HelpCircle,
  X,
  Wifi,
  Loader2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  testGeminiConnection, 
  SUPPORTED_MODELS, 
  getSelectedModel, 
  setSelectedModel as saveSelectedModel, 
  getLastSuccessfulModel 
} from '../services/geminiService';

export default function Header({
  geminiKey,
  setGeminiKey,
  onResetForm,
  onOpenFullAiModal,
  autosaved,
  onShowToast
}) {
  const [showKeyDrawer, setShowKeyDrawer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [tempKey, setTempKey] = useState(geminiKey || '');
  const [testingAi, setTestingAi] = useState(false);
  const [aiStatus, setAiStatus] = useState(null); // 'connected' | 'error' | null
  const [selectedModel, setSelectedModel] = useState(() => getSelectedModel());
  const [activeModelName, setActiveModelName] = useState(() => getLastSuccessfulModel());
  const [modelList, setModelList] = useState(SUPPORTED_MODELS);

  const handleSaveKey = () => {
    setGeminiKey(tempKey.trim());
    saveSelectedModel(selectedModel);
    setShowKeyDrawer(false);
  };

  const handleModelChange = (e) => {
    const newModel = e.target.value;
    setSelectedModel(newModel);
    saveSelectedModel(newModel);
    if (newModel !== 'auto') {
      setActiveModelName(newModel);
    }
  };

  const handleTestConnection = async () => {
    const keyToTest = (tempKey || geminiKey || '').trim();
    if (!keyToTest) {
      if (onShowToast) {
        onShowToast('Cole a sua chave Gemini no campo antes de testar a comunicação.', 'warning');
      }
      return;
    }

    setTestingAi(true);
    setAiStatus(null);
    if (onShowToast) {
      onShowToast('Enviando requisição de teste para o Google Gemini...', 'info');
    }

    try {
      const response = await testGeminiConnection(keyToTest, selectedModel);
      setAiStatus('connected');
      const used = response.usedModel || getLastSuccessfulModel();
      setActiveModelName(used);
      
      if (response.availableModels && response.availableModels.length > 0) {
        setModelList([
          { id: 'auto', name: '⚡ Automático (Recomendado)' },
          ...response.availableModels
        ]);
      }

      // Salva a chave automaticamente se estiver válida
      setGeminiKey(keyToTest);
      if (onShowToast) {
        onShowToast(`✅ Conexão estabelecida com sucesso via [${used}]! "${response.text || response}"`, 'success');
      }
    } catch (err) {
      console.error('Falha no teste de conexão Gemini:', err);
      setAiStatus('error');
      const msg = err?.message || 'Falha na requisição';
      if (onShowToast) {
        if (msg.includes('429') || msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('resource_exhausted')) {
          onShowToast('Erro 429: Cota esgotada nesta chave. Abra o Google AI Studio com um @gmail pessoal e crie a chave em "Novo Projeto".', 'error');
        } else if (msg.includes('503') || msg.toLowerCase().includes('high demand')) {
          onShowToast('Servidores do Gemini em alta demanda temporária (503). O sistema tentou 3 vezes. Aguarde alguns segundos e clique novamente.', 'warning');
        } else if (msg.includes('400') || msg.includes('403') || msg.toLowerCase().includes('key not valid') || msg.toLowerCase().includes('api_key_invalid')) {
          onShowToast('Erro: Chave de API inválida. Confira o código da chave copiado no AI Studio.', 'error');
        } else {
          onShowToast(`Erro ao testar comunicação com Gemini: ${msg}`, 'error');
        }
      }
    } finally {
      setTestingAi(false);
    }
  };

  return (
    <>
      <header className="bg-gradient-to-r from-senac-navy to-senac-blue text-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center">
              <img 
                src={`data:image/png;base64,${SENAC_LOGO_BASE64}`} 
                alt="Senac" 
                className="h-8 sm:h-9 w-auto object-contain" 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
                  Gerador Inteligente de PTD
                </h1>
                <span className="hidden md:inline-block bg-senac-orange text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
                  Padrão Técnico Senac
                </span>
              </div>
              <p className="text-xs text-slate-200 hidden sm:block">
                Plano de Trabalho Docente com Assistência IA, Visualização e Exportação DOC (Word 97-2003) / PDF
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Autosave Status */}
            <div 
              className={`flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-emerald-300 border border-white/10 transition-opacity ${
                autosaved ? 'opacity-100' : 'opacity-70'
              }`}
              title="Salvo automaticamente na sessão"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle"></span>
              <span className="hidden sm:inline font-medium">Salvo na sessão</span>
            </div>

            {/* Clear Form Button */}
            <button
              type="button"
              onClick={onResetForm}
              className="bg-white/15 hover:bg-rose-500/30 text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
              title="Limpar todos os campos do formulário"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-300" />
              <span className="hidden md:inline">Limpar</span>
            </button>

            {/* Gerar Tudo com IA Button */}
            <button
              type="button"
              onClick={onOpenFullAiModal}
              className="bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm hover:shadow transition flex items-center gap-1.5 border border-white/20 active:scale-95 cursor-pointer"
              title="Preencher todos os 12 passos do PTD de uma vez via IA"
            >
              <Sparkles className="w-3.5 h-3.5 text-yellow-200" />
              <span className="hidden sm:inline">Gerar Tudo com IA</span>
              <span className="sm:hidden">IA Total</span>
            </button>

            {/* Gemini API Key Toggle */}
            <button
              type="button"
              onClick={() => setShowKeyDrawer(!showKeyDrawer)}
              className="bg-senac-orange hover:bg-senac-orange-hover text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition flex items-center gap-1.5"
            >
              <Key className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Chave Gemini</span>
              <span className={`w-2 h-2 rounded-full ${geminiKey ? 'bg-emerald-400' : 'bg-slate-300'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Gemini Drawer */}
      {showKeyDrawer && (
        <section className="bg-slate-900 text-white border-b border-slate-700 transition-all p-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-white">IA Gemini • Nível Gratuito (Free Tier)</h2>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-medium">
                  15 req/min sem custos
                </span>
                <span className="bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                  Modelo: <strong className="text-white font-semibold">{activeModelName || 'gemini-1.5-flash'}</strong>
                </span>
                {aiStatus === 'connected' && (
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Conexão Ativa
                  </span>
                )}
                {aiStatus === 'error' && (
                  <span className="bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Erro na Chave
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Utilize sua chave gratuita gerada no Google AI Studio. Em caso de alta demanda (503), o sistema <strong>desce automaticamente</strong> para o próximo modelo estável.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Seletor de Modelo / Cascata */}
              <select
                value={selectedModel}
                onChange={handleModelChange}
                className="px-2.5 py-1.5 text-xs bg-slate-800 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-senac-orange cursor-pointer"
                title="Selecione o modelo do Gemini ou deixe em Automático para descer em cascata caso haja instabilidade"
              >
                {modelList.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>

              <div className="relative flex-1 sm:w-64">
                <input
                  type={showPassword ? "text" : "password"}
                  value={tempKey}
                  onChange={(e) => setTempKey(e.target.value)}
                  placeholder="Cole sua chave Gemini..."
                  className="w-full pl-3 pr-9 py-1.5 text-xs bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-senac-orange"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Botão Testar Comunicação com a IA */}
              <button
                type="button"
                onClick={handleTestConnection}
                disabled={testingAi}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition border border-emerald-500/40 flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-sm"
                title="Testar requisição e resposta direta com a IA Gemini"
              >
                {testingAi ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Testando...</span>
                  </>
                ) : (
                  <>
                    <Wifi className="w-3.5 h-3.5" />
                    <span>Testar IA</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleSaveKey}
                className="bg-senac-blue hover:bg-senac-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition border border-white/10 flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Check className="w-3.5 h-3.5" />
                Aplicar Chave
              </button>

              <button
                type="button"
                onClick={() => setShowTutorialModal(true)}
                className="text-amber-300 hover:text-amber-200 text-xs font-semibold flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 transition"
                title="Ver passo a passo de como obter a chave Gemini"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Tutorial</span>
              </button>

              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white text-xs underline flex items-center justify-center gap-1 px-1"
              >
                Obter chave <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Tutorial Modal */}
      {showTutorialModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 text-slate-800 relative animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-lg flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-senac-orange" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 leading-tight">
                    Como Obter a Chave da API Gemini
                  </h3>
                  <p className="text-xs text-slate-500">
                    Guia passo a passo para gerar sua chave gratuita no Google AI Studio
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowTutorialModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps */}
            <div className="space-y-4 text-xs text-slate-600 max-h-[65vh] overflow-y-auto pr-1.5">
              
              {/* Passo 1 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    1
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">Acesse o Google AI Studio e Aceite os Termos</p>
                    <p className="text-slate-500 mt-0.5">
                      Abra o link oficial{' '}
                      <a
                        href="https://aistudio.google.com/app/apikey"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-senac-blue font-semibold hover:underline inline-flex items-center gap-0.5"
                      >
                        aistudio.google.com/app/apikey <ExternalLink className="w-3 h-3 inline" />
                      </a>{' '}
                      com sua conta Google. Se for seu primeiro acesso, marque a caixinha dos termos de desenvolvedor e clique em <strong>Continue</strong>.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <img 
                    src="/tutorial/step2_terms.png" 
                    alt="Tela de Termos do Google AI Studio" 
                    className="w-full h-auto max-h-44 object-cover object-top hover:max-h-none transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Passo 2 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    2
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">Clique em "Create API key"</p>
                    <p className="text-slate-500 mt-0.5">
                      No painel de chaves (API Keys), clique no botão destacado no canto superior direito: <strong>Create API key</strong>.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <img 
                    src="/tutorial/step3_dashboard.png" 
                    alt="Botão Create API Key no Painel" 
                    className="w-full h-auto max-h-44 object-cover object-top hover:max-h-none transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Passo 3 */}
              <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-300 space-y-2.5 shadow-sm">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-senac-orange text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-amber-950 text-sm flex items-center gap-1.5">
                      <span>Escolha o Projeto Correto</span>
                      <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">Crucial</span>
                    </p>
                    <p className="text-amber-900/85 mt-0.5">
                      Na janela que abrir, dê um nome (ex: <em>Gemini API Key</em>) e selecione o projeto padrão ou <strong>novo projeto</strong> para ter a cota gratuita oficial de 15 requisições/minuto liberada. Clique no botão azul <strong>Create key</strong>.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-amber-200 shadow-sm bg-white">
                  <img 
                    src="/tutorial/step4_create_modal.png" 
                    alt="Janela Create a new key" 
                    className="w-full h-auto max-h-44 object-cover object-top hover:max-h-none transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Passo 4 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    4
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">Copie a Chave Gerada</p>
                    <p className="text-slate-500 mt-0.5">
                      Na tela com os detalhes da chave, clique no botão <strong>Copy key</strong> (Copiar chave) no rodapé da janela.
                    </p>
                  </div>
                </div>
                <div className="rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
                  <img 
                    src="/tutorial/step5_key_details.png" 
                    alt="Janela com o botão Copy Key" 
                    className="w-full h-auto max-h-44 object-cover object-top hover:max-h-none transition-all duration-300"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Passo 5 */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    5
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm">Cole no Gerador de PTD Senac</p>
                    <p className="text-slate-500 mt-0.5">
                      Volte aqui no Gerador de PTD, cole o código copiado no campo da gaveta <strong>Chave Gemini</strong> e clique em <strong>Aplicar Chave</strong>.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-xs font-semibold bg-senac-blue hover:bg-senac-navy text-white rounded-xl shadow transition flex items-center gap-1.5"
              >
                <span>Ir para Google AI Studio</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={() => setShowTutorialModal(false)}
                className="px-4 py-2 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition"
              >
                Entendi, Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
