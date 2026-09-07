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
  X
} from 'lucide-react';

export default function Header({
  geminiKey,
  setGeminiKey,
  onResetForm,
  autosaved
}) {
  const [showKeyDrawer, setShowKeyDrawer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showTutorialModal, setShowTutorialModal] = useState(false);
  const [tempKey, setTempKey] = useState(geminiKey || '');

  const handleSaveKey = () => {
    setGeminiKey(tempKey.trim());
    setShowKeyDrawer(false);
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
                Plano de Trabalho Docente com Assistência IA, Visualização e Exportação DOCX / PDF
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
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h2 className="text-sm font-semibold text-white">Configuração Opcional de IA (Google Gemini)</h2>
                <span className="bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-medium">Opcional</span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                Insira sua chave para geração em tempo real com o Gemini. Se deixar em branco, o sistema gerará as sugestões institucionais do Senac.
              </p>
            </div>

            <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <div className="relative flex-1 sm:w-80">
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

              <button
                type="button"
                onClick={handleSaveKey}
                className="bg-senac-blue hover:bg-senac-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition border border-white/10 flex items-center justify-center gap-1.5"
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
            <div className="space-y-3.5 text-xs text-slate-600 max-h-[60vh] overflow-y-auto pr-1">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  1
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Acesse o Google AI Studio</p>
                  <p className="text-slate-500 mt-0.5">
                    Abra o portal oficial de desenvolvedores do Google pelo link{' '}
                    <a
                      href="https://aistudio.google.com/app/apikey"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-senac-blue font-semibold hover:underline inline-flex items-center gap-0.5"
                    >
                      aistudio.google.com/app/apikey <ExternalLink className="w-3 h-3 inline" />
                    </a>{' '}
                    e faça login com sua conta Google (Gmail).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  2
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Clique em "Create API Key" (Criar Chave)</p>
                  <p className="text-slate-500 mt-0.5">
                    No canto superior ou na lista de chaves, clique no botão azul <strong>+ Create API key</strong>.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200">
                <span className="w-6 h-6 rounded-full bg-senac-orange text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  3
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-amber-950 flex items-center gap-1.5">
                    <span>Atenção: Selecione "Novo Projeto"</span>
                    <span className="bg-amber-200 text-amber-900 text-[10px] px-1.5 py-0.2 rounded font-bold uppercase">Crucial</span>
                  </p>
                  <p className="text-amber-900/80 mt-0.5">
                    Escolha <strong>"Create API key in new project"</strong> (Criar chave em um novo projeto). Isso ativa automaticamente a <strong>cota gratuita oficial (15 requisições/minuto)</strong> sem bloqueios ou erro de cota 429.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  4
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Copie o Código da Chave</p>
                  <p className="text-slate-500 mt-0.5">
                    Na janela "API key details", clique em <strong>Copy key</strong> (Copiar chave) ou clique no ícone de cópia ao lado do código.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <span className="w-6 h-6 rounded-full bg-senac-blue text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                  5
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-900">Cole na Aplicação</p>
                  <p className="text-slate-500 mt-0.5">
                    Cole o código copiado no campo "Chave Gemini" no topo da página e clique em <strong>"Aplicar Chave"</strong>.
                  </p>
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
