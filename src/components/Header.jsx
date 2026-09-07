import React, { useState } from 'react';
import { SENAC_LOGO_BASE64 } from '../assets/logoSenac';
import { 
  FolderOpen, 
  Key, 
  Eye, 
  EyeOff, 
  Trash2, 
  Sparkles, 
  Check, 
  ExternalLink,
  Brain,
  Code,
  Briefcase
} from 'lucide-react';

export default function Header({
  geminiKey,
  setGeminiKey,
  onLoadPreset,
  onResetForm,
  autosaved
}) {
  const [showKeyDrawer, setShowKeyDrawer] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPresets, setShowPresets] = useState(false);
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

            {/* Presets Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowPresets(!showPresets)}
                className="bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5"
              >
                <FolderOpen className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden md:inline">Modelos Prontos</span>
              </button>

              {showPresets && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 z-50 p-2 divide-y divide-slate-100 text-slate-700"
                  onClick={() => setShowPresets(false)}
                >
                  <div className="py-1">
                    <span className="text-[11px] uppercase font-bold text-slate-400 px-3 tracking-wider block mb-1">
                      Carregar Exemplo Real
                    </span>
                    <button
                      onClick={() => onLoadPreset('ia')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-senac-soft hover:text-senac-blue flex items-center gap-2 transition"
                    >
                      <Brain className="w-4 h-4 text-senac-orange flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Técnico em Inteligência Artificial</p>
                        <p className="text-[10px] text-slate-500">Fundamentos de IA (Oficial Senac)</p>
                      </div>
                    </button>
                    <button
                      onClick={() => onLoadPreset('ds')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-senac-soft hover:text-senac-blue flex items-center gap-2 transition"
                    >
                      <Code className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Desenvolvimento de Sistemas</p>
                        <p className="text-[10px] text-slate-500">Desenvolver Aplicações Web</p>
                      </div>
                    </button>
                    <button
                      onClick={() => onLoadPreset('adm')}
                      className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-senac-soft hover:text-senac-blue flex items-center gap-2 transition"
                    >
                      <Briefcase className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <div>
                        <p className="font-semibold">Técnico em Administração</p>
                        <p className="text-[10px] text-slate-500">Planejamento e Gestão de Pessoas</p>
                      </div>
                    </button>
                  </div>
                  <div className="pt-1.5">
                    <button
                      onClick={onResetForm}
                      className="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition font-medium"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Limpar Todos os Campos
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                Insira sua chave para geração em tempo real com Gemini. Se deixar em branco, o sistema funciona 100% offline com o banco de dados pedagógico Senac!
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
    </>
  );
}
