# -*- coding: utf-8 -*-
import base64

with open('logo_b64.txt', 'r', encoding='utf-8') as f:
    logo_b64 = f.read().strip()

html_template = f'''<!DOCTYPE html>
<html lang="pt-BR" class="h-full bg-slate-50">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Gerador Inteligente de PTD | Senac</title>
  <meta name="description" content="Gerador Inteligente de Plano de Trabalho Docente (PTD) no padrão institucional Senac com assistência de IA e exportação para Word (.docx).">
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- FontAwesome 6 -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
  
  <!-- Tailwind CSS via CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {{
      theme: {{
        extend: {{
          colors: {{
            senac: {{
              blue: '#004587',
              navy: '#002D59',
              orange: '#F37021',
              'orange-hover': '#E05D0D',
              light: '#F8FAFC',
              soft: '#EBF3FA',
              border: '#CBD5E1'
            }}
          }},
          fontFamily: {{
            sans: ['Inter', 'sans-serif'],
            heading: ['Outfit', 'sans-serif']
          }}
        }}
      }}
    }}
  </script>

  <!-- docx.js via CDN -->
  <script src="https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js"></script>

  <style>
    /* Custom scrollbar and animations */
    ::-webkit-scrollbar {{
      width: 8px;
      height: 8px;
    }}
    ::-webkit-scrollbar-track {{
      background: #F1F5F9;
    }}
    ::-webkit-scrollbar-thumb {{
      background: #CBD5E1;
      border-radius: 4px;
    }}
    ::-webkit-scrollbar-thumb:hover {{
      background: #94A3B8;
    }}
    @keyframes pulse-subtle {{
      0%, 100% {{ opacity: 1; }}
      50% {{ opacity: 0.5; }}
    }}
    .animate-pulse-subtle {{
      animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }}
    .step-badge-done {{
      background-color: #004587;
      color: #FFFFFF;
    }}
    .step-badge-active {{
      background-color: #F37021;
      color: #FFFFFF;
      box-shadow: 0 0 0 4px rgba(243, 112, 33, 0.25);
    }}
    .step-badge-pending {{
      background-color: #E2E8F0;
      color: #64748B;
    }}
  </style>
</head>
<body class="min-h-full flex flex-col font-sans text-slate-800 bg-slate-50 antialiased selection:bg-senac-orange selection:text-white">

  <!-- TOP INSTITUTIONAL HEADER -->
  <header class="bg-gradient-to-r from-senac-navy to-senac-blue text-white shadow-md sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
      
      <!-- Brand & Title -->
      <div class="flex items-center gap-3">
        <div class="bg-white p-1.5 rounded-lg shadow-sm flex items-center justify-center">
          <img src="data:image/png;base64,{logo_b64}" alt="Senac" class="h-8 sm:h-9 w-auto object-contain">
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-heading font-bold text-lg sm:text-xl tracking-tight text-white flex items-center gap-2">
              Gerador Inteligente de PTD
            </h1>
            <span class="hidden md:inline-block bg-senac-orange text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-sm">
              Padrão Técnico Senac
            </span>
          </div>
          <p class="text-xs text-slate-200 hidden sm:block">Plano de Trabalho Docente com Assistência IA e Exportação .DOCX</p>
        </div>
      </div>

      <!-- Quick Actions / Autosave indicator -->
      <div class="flex items-center gap-2 sm:gap-3 ml-auto">
        <!-- Autosave badge -->
        <div id="saveIndicator" class="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs text-emerald-300 border border-white/10" title="Alterações salvas automaticamente na sessão">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-subtle"></span>
          <span class="hidden sm:inline font-medium">Salvo na sessão</span>
        </div>

        <!-- Preload Demo Selector Dropdown -->
        <div class="relative inline-block text-left">
          <button id="btnPresets" type="button" class="bg-white/15 hover:bg-white/25 text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-white/20 transition flex items-center gap-1.5">
            <i class="fa-solid fa-folder-open text-amber-300"></i>
            <span class="hidden md:inline">Modelos Prontos</span>
            <i class="fa-solid fa-chevron-down text-[10px]"></i>
          </button>
          <div id="presetsMenu" class="hidden absolute right-0 mt-2 w-64 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-50 p-2 divide-y divide-slate-100 text-slate-700">
            <div class="py-1">
              <span class="text-[11px] uppercase font-bold text-slate-400 px-3 tracking-wider">Carregar Exemplo Real</span>
              <button onclick="loadTemplate('ia')" class="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-senac-soft hover:text-senac-blue flex items-center gap-2 transition">
                <i class="fa-solid fa-brain text-senac-orange"></i>
                <div>
                  <p class="font-semibold">Técnico em Inteligência Artificial</p>
                  <p class="text-[10px] text-slate-500">Fundamentos e Python (Oficial Senac)</p>
                </div>
              </button>
              <button onclick="loadTemplate('ds')" class="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-senac-soft hover:text-senac-blue flex items-center gap-2 transition">
                <i class="fa-solid fa-code text-blue-600"></i>
                <div>
                  <p class="font-semibold">Desenvolvimento de Sistemas</p>
                  <p class="text-[10px] text-slate-500">Desenvolver Aplicações Web</p>
                </div>
              </button>
              <button onclick="loadTemplate('adm')" class="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-senac-soft hover:text-senac-blue flex items-center gap-2 transition">
                <i class="fa-solid fa-briefcase text-emerald-600"></i>
                <div>
                  <p class="font-semibold">Técnico em Administração</p>
                  <p class="text-[10px] text-slate-500">Planejamento e Gestão de Pessoas</p>
                </div>
              </button>
            </div>
            <div class="pt-1.5">
              <button onclick="confirmReset()" class="w-full text-left px-3 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 transition font-medium">
                <i class="fa-solid fa-trash-can"></i>
                Limpar Todos os Campos
              </button>
            </div>
          </div>
        </div>

        <!-- Toggle Gemini API key modal / bar -->
        <button id="btnToggleApiKey" type="button" class="bg-senac-orange hover:bg-senac-orange-hover text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition flex items-center gap-1.5">
          <i class="fa-solid fa-key"></i>
          <span class="hidden sm:inline">Chave Gemini</span>
          <span id="apiKeyStatusBadge" class="w-2 h-2 rounded-full bg-slate-300"></span>
        </button>
      </div>
    </div>
  </header>

  <!-- GEMINI API KEY BANNER / DRAWER -->
  <section id="apiKeyDrawer" class="bg-slate-900 text-white border-b border-slate-700 transition-all duration-300">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <i class="fa-solid fa-wand-magic-sparkles text-amber-400 text-sm"></i>
            <h2 class="text-sm font-semibold text-white">Configuração Opcional de Inteligência Artificial (Google Gemini)</h2>
            <span class="bg-amber-400/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-medium">Opcional</span>
          </div>
          <p class="text-xs text-slate-300 mt-0.5">
            Insira sua chave para geração em tempo real com Gemini 1.5/2.0. <strong class="text-slate-100">Se deixar em branco</strong>, o sistema utilizará o banco pedagógico offline institucional do Senac sem nenhuma perda de qualidade!
          </p>
        </div>

        <div class="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div class="relative flex-1 sm:w-80">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <i class="fa-solid fa-key text-xs"></i>
            </div>
            <input type="password" id="geminiApiKey" placeholder="Cole sua chave da API do Google Gemini..." 
                   class="w-full pl-8 pr-9 py-1.5 text-xs bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-senac-orange focus:border-transparent">
            <button type="button" id="btnToggleShowKey" class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-slate-400 hover:text-white" title="Mostrar/Ocultar Chave">
              <i class="fa-solid fa-eye text-xs"></i>
            </button>
          </div>
          <button id="btnSaveApiKey" type="button" class="bg-senac-blue hover:bg-senac-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition border border-white/10 flex items-center justify-center gap-1.5">
            <i class="fa-solid fa-check"></i>
            Aplicar Chave
          </button>
          <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white text-xs underline flex items-center justify-center gap-1 px-1" title="Criar chave gratuita no Google AI Studio">
            Obter chave <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- MAIN CONTAINER -->
  <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">

    <!-- WIZARD STEP NAVIGATOR & PROGRESS BAR -->
    <div class="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-4 sm:p-5 mb-6">
      
      <!-- Progress info -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
        <div>
          <span id="wizardStepCounter" class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-senac-blue bg-senac-soft px-3 py-1 rounded-full">
            <i class="fa-solid fa-list-check"></i>
            Passo 1 de 12
          </span>
          <h2 id="wizardStepTitleHeader" class="font-heading font-bold text-lg sm:text-xl text-slate-900 mt-1">
            Identificação Básica
          </h2>
        </div>

        <div class="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div class="text-right">
            <span class="text-xs text-slate-500 font-medium">Progresso Geral</span>
            <span id="progressPercentageText" class="text-sm font-bold text-senac-blue ml-1">8%</span>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden mb-4 shadow-inner">
        <div id="progressBar" class="bg-gradient-to-r from-senac-blue to-senac-orange h-2.5 rounded-full transition-all duration-300" style="width: 8.33%;"></div>
      </div>

      <!-- Step icons / dots (Horizontal scroll on mobile, responsive grid on desktop) -->
      <div class="overflow-x-auto pb-2 scrollbar-thin">
        <div class="flex items-center justify-between min-w-[700px] gap-2" id="stepPillsContainer">
          <!-- Step 1 to 12 dynamically generated or rendered below -->
        </div>
      </div>
    </div>

    <!-- FORM CARD -->
    <form id="ptdForm" onsubmit="return false;" class="bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
      
      <!-- STEP 1: Identificação Básica -->
      <section id="step1" class="wizard-step p-6 sm:p-8">
        <div class="max-w-3xl">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">1</div>
            <div>
              <h3 class="text-xl font-heading font-bold text-slate-900">Identificação Básica</h3>
              <p class="text-sm text-slate-500">Informe os dados gerais do curso técnico e do corpo docente.</p>
            </div>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Diretriz Senac:</strong> O Plano de Trabalho Docente é o documento que detalha a transposição didática do Plano de Curso para as atividades pedagógicas articuladas às competências profissionais.
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label for="curso" class="block text-sm font-semibold text-slate-700 mb-1">
                Nome do Curso <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="curso" name="curso" data-field="curso" placeholder="Ex: Técnico em Inteligência Artificial" 
                     class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required>
              <p class="text-xs text-slate-400 mt-1">Exemplos: Técnico em Inteligência Artificial, Técnico em Desenvolvimento de Sistemas, Técnico em Administração.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label for="instrutor" class="block text-sm font-semibold text-slate-700 mb-1">
                  Instrutor(a) <span class="text-rose-500">*</span>
                </label>
                <input type="text" id="instrutor" name="instrutor" data-field="instrutor" placeholder="Ex: Prof. Luiz Fernando Brogliatto Ferreira" 
                       class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required>
              </div>

              <div>
                <label for="formato" class="block text-sm font-semibold text-slate-700 mb-1">
                  Formato da Aula <span class="text-rose-500">*</span>
                </label>
                <select id="formato" name="formato" data-field="formato" 
                        class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition bg-white" required>
                  <option value="Presencial">Presencial</option>
                  <option value="EaD">EaD (Educação a Distância)</option>
                  <option value="Híbrido">Híbrido</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 2: Unidade Curricular -->
      <section id="step2" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-3xl">
          <div class="flex items-center gap-3 mb-2">
            <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">2</div>
            <div>
              <h3 class="text-xl font-heading font-bold text-slate-900">Unidade Curricular (UC)</h3>
              <p class="text-sm text-slate-500">Defina a Unidade Curricular vigente e sua respectiva carga horária total.</p>
            </div>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Organização Curricular:</strong> A UC corresponde ao módulo de competência específica ou interdisciplinar definida no plano de curso técnico.
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label for="uc" class="block text-sm font-semibold text-slate-700 mb-1">
                Unidade Curricular (UC) <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="uc" name="uc" data-field="uc" placeholder="Ex: Evidenciar fundamentos e conceitos de Inteligência Artificial" 
                     class="w-full px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required>
              <p class="text-xs text-slate-400 mt-1">Exemplos: Desenvolver linguagem de programação Python, Administrar processos organizacionais, etc.</p>
            </div>

            <div>
              <label for="ch_uc" class="block text-sm font-semibold text-slate-700 mb-1">
                Carga Horária (C.H) da UC <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="ch_uc" name="ch_uc" data-field="ch_uc" placeholder="Ex: 100H ou 32H" 
                     class="w-full sm:w-64 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 3: (1) Situação de Aprendizagem -->
      <section id="step3" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-4xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">3</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(1) Situação de Aprendizagem</h3>
                <p class="text-sm text-slate-500">Conjunto de passos articulados que garantem o exercício prático da competência.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step3')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3.5 mb-6 text-xs text-amber-900 flex items-start gap-2.5">
            <i class="fa-solid fa-lightbulb text-amber-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Como estruturar:</strong> Contextualize um cenário desafiador do mundo do trabalho em que o estudante atuará em etapas claras (análise, planejamento, execução e entrega).
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="situacao_aprendizagem" class="block text-sm font-semibold text-slate-700">
                Descrição Detalhada da Situação de Aprendizagem <span class="text-rose-500">*</span>
              </label>
              <span id="count_situacao_aprendizagem" class="text-xs text-slate-400">0 caracteres</span>
            </div>
            <textarea id="situacao_aprendizagem" name="situacao_aprendizagem" data-field="situacao_aprendizagem" rows="7" 
                      placeholder="Descreva o desafio pedagógico, a problematização profissional e as atividades principais..."
                      class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
          </div>
        </div>
      </section>

      <!-- STEP 4: (2) Indicadores e Carga Horária -->
      <section id="step4" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-4xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">4</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(2) Indicadores e Carga Horária</h3>
                <p class="text-sm text-slate-500">Indicadores trabalhados e carga horária dedicada à Situação de Aprendizagem.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step4')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Indicadores de Competência:</strong> Evidências observáveis de que o aluno atingiu o desempenho esperado, com sua respectiva distribuição de horas.
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="indicadores" class="block text-sm font-semibold text-slate-700">
                  Indicador(es) trabalhados na Situação de Aprendizagem <span class="text-rose-500">*</span>
                </label>
                <span id="count_indicadores" class="text-xs text-slate-400">0 caracteres</span>
              </div>
              <textarea id="indicadores" name="indicadores" data-field="indicadores" rows="6" 
                        placeholder="Ex:&#10;Identifica conceitos e fundamentos de Inteligência Artificial. 8 H&#10;Classifica diferentes métodos, algoritmos e técnicas utilizadas em Inteligência Artificial. 8 H&#10;Compreende e utiliza resultados supervisionados e não supervisionados. 8 H&#10;Compreende e aplica questões éticas e impactos sociais. 8 H"
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>

            <div>
              <label for="ch_situacao" class="block text-sm font-semibold text-slate-700 mb-1">
                C.H da Situação de Aprendizagem <span class="text-rose-500">*</span>
              </label>
              <input type="text" id="ch_situacao" name="ch_situacao" data-field="ch_situacao" placeholder="Ex: 32 horas" 
                     class="w-full sm:w-64 px-3.5 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 5: (3) Elementos da Competência -->
      <section id="step5" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-5xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">5</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(3) Elementos da Competência</h3>
                <p class="text-sm text-slate-500">Conhecimentos (Saber), Habilidades (Saber Fazer) e Atitudes/Valores (Saber Ser/Conviver).</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step5')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Tríade da Competência Senac:</strong> A competência se materializa na mobilização articulada de saberes conceituais, procedimentais e socioemocionais no contexto profissional.
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="conhecimentos" class="block text-sm font-semibold text-slate-700">
                  <i class="fa-solid fa-book-bookmark text-senac-blue mr-1"></i> Conhecimentos <span class="text-rose-500">*</span>
                </label>
              </div>
              <textarea id="conhecimentos" name="conhecimentos" data-field="conhecimentos" rows="8" 
                        placeholder="Conceitos, teorias, princípios, normas e vocabulário técnico aplicáveis à competência..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="habilidades" class="block text-sm font-semibold text-slate-700">
                  <i class="fa-solid fa-gears text-senac-orange mr-1"></i> Habilidades <span class="text-rose-500">*</span>
                </label>
              </div>
              <textarea id="habilidades" name="habilidades" data-field="habilidades" rows="8" 
                        placeholder="Ações práticas, procedimentos operacionais, uso de instrumentos e métodos..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>

            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="atitudes_valores" class="block text-sm font-semibold text-slate-700">
                  <i class="fa-solid fa-heart-pulse text-emerald-600 mr-1"></i> Atitudes e Valores <span class="text-rose-500">*</span>
                </label>
              </div>
              <textarea id="atitudes_valores" name="atitudes_valores" data-field="atitudes_valores" rows="8" 
                        placeholder="Posturas profissionais, ética, zelo, cordialidade, flexibilidade e trabalho colaborativo..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 6: (4) Metodologias Ativas (Geral) -->
      <section id="step6" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-4xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">6</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(4) Metodologias Ativas (Geral)</h3>
                <p class="text-sm text-slate-500">Estratégias pedagógicas ativas que orientam o processo de ensino-aprendizagem da UC.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step6')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Modelo Pedagógico Senac:</strong> O estudante é o protagonista da sua aprendizagem. Utilize metodologias ativas como Aprendizagem Baseada em Problemas (PBL), Estudos de Caso, Gamificação, Rotação por Estações e Sala de Aula Invertida.
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="metodologias_ativas" class="block text-sm font-semibold text-slate-700">
                Abordagem Metodológica Geral da UC <span class="text-rose-500">*</span>
              </label>
              <span id="count_metodologias_ativas" class="text-xs text-slate-400">0 caracteres</span>
            </div>
            <textarea id="metodologias_ativas" name="metodologias_ativas" data-field="metodologias_ativas" rows="6" 
                      placeholder="Ex: Aulas expositivas dialogadas integradas à resolução de estudos de caso reais. Simulações práticas individuais e em equipe. Debates estruturados sobre cenários contemporâneos..."
                      class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
          </div>
        </div>
      </section>

      <!-- STEP 7: Momentos Didáticos (Ação Inicial, Reflexão, Ação Final) -->
      <section id="step7" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-5xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">7</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">Momentos Didáticos das Metodologias Ativas</h3>
                <p class="text-sm text-slate-500">(5) Ação Inicial, (6) Reflexão e (7) Ação Final estruturadas na situação de aprendizagem.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step7')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Ciclo de Aprendizagem Vivencial:</strong>
              Ação Inicial (sensibilização e levantamento de hipóteses) &rarr; Reflexão (problematização, teorização e análise crítica) &rarr; Ação Final (aplicação, síntese e prototipagem de solução).
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label for="acao_inicial" class="block text-sm font-semibold text-slate-700 mb-1">
                (5) Ação Inicial <span class="text-rose-500">*</span>
              </label>
              <textarea id="acao_inicial" name="acao_inicial" data-field="acao_inicial" rows="7" 
                        placeholder="Sensibilização dos estudantes, diagnóstico prévio, problematização e contextualização do desafio profissional..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>

            <div>
              <label for="reflexao" class="block text-sm font-semibold text-slate-700 mb-1">
                (6) Reflexão <span class="text-rose-500">*</span>
              </label>
              <textarea id="reflexao" name="reflexao" data-field="reflexao" rows="7" 
                        placeholder="Análise crítica, debates sobre alternativas, confrontação entre teoria e prática, identificação de dilemas e melhorias..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>

            <div>
              <label for="acao_final" class="block text-sm font-semibold text-slate-700 mb-1">
                (7) Ação Final <span class="text-rose-500">*</span>
              </label>
              <textarea id="acao_final" name="acao_final" data-field="acao_final" rows="7" 
                        placeholder="Elaboração do produto final, execução técnica do projeto, apresentação de soluções e validação dos resultados..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 8: Procedimentos Avaliativos -->
      <section id="step8" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-5xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">8</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(8) Procedimentos Avaliativos</h3>
                <p class="text-sm text-slate-500">Critérios e procedimentos de avaliação formativa correspondentes a cada momento didático.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step8')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Avaliação Formativa e Processual:</strong> No Senac, a avaliação acompanha continuamente o desenvolvimento do estudante, oferecendo feedback constante para a consolidação da competência.
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label for="proc_inicial" class="block text-sm font-semibold text-slate-700 mb-1">
                Procedimento Avaliativo: Ação Inicial <span class="text-rose-500">*</span>
              </label>
              <textarea id="proc_inicial" name="proc_inicial" data-field="proc_inicial" rows="7" 
                        placeholder="Avaliação diagnóstica de conhecimentos prévios, engajamento na problematização e levantamento de hipóteses..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>

            <div>
              <label for="proc_reflexao" class="block text-sm font-semibold text-slate-700 mb-1">
                Procedimento Avaliativo: Reflexão <span class="text-rose-500">*</span>
              </label>
              <textarea id="proc_reflexao" name="proc_reflexao" data-field="proc_reflexao" rows="7" 
                        placeholder="Avaliação da capacidade reflexiva, autoavaliação, participação crítica em debates e reformulação de estratégias..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>

            <div>
              <label for="proc_final" class="block text-sm font-semibold text-slate-700 mb-1">
                Procedimento Avaliativo: Ação Final <span class="text-rose-500">*</span>
              </label>
              <textarea id="proc_final" name="proc_final" data-field="proc_final" rows="7" 
                        placeholder="Avaliação somativo-formativa da entrega do projeto/protótipo, sustentação oral e aderência aos requisitos técnicos..."
                        class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
            </div>
          </div>
        </div>
      </section>

      <!-- STEP 9: (9) Instrumentos de Avaliação -->
      <section id="step9" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-4xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">9</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(9) Instrumentos de Avaliação</h3>
                <p class="text-sm text-slate-500">Recursos e ferramentas formais para registro de evidências da aprendizagem.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step9')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Instrumentos recomendados no Senac:</strong> Portfólios, rubricas de avaliação, listas de checagem (checklists), fichas de observação direta, relatórios técnicos e apresentações orais.
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="instrumentos_avaliacao" class="block text-sm font-semibold text-slate-700">
                Instrumentos de Avaliação Utilizados <span class="text-rose-500">*</span>
              </label>
              <span id="count_instrumentos_avaliacao" class="text-xs text-slate-400">0 caracteres</span>
            </div>
            <textarea id="instrumentos_avaliacao" name="instrumentos_avaliacao" data-field="instrumentos_avaliacao" rows="6" 
                      placeholder="Ex:&#10;Portfólios: para acompanhamento contínuo da evolução dos projetos.&#10;Observações diretas: registro do engajamento individual e em equipe.&#10;Projetos práticos: avaliação do briefing, protótipo funcional e documentação técnica.&#10;Apresentações finais: sustentação da solução e justificativas das escolhas adotadas."
                      class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
          </div>
        </div>
      </section>

      <!-- STEP 10: (10) Marcas Formativas -->
      <section id="step10" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-4xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">10</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(10) Marcas Formativas</h3>
                <p class="text-sm text-slate-500">Atributos que caracterizam o perfil profissional dos egressos formados pelo Senac.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step10')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-4 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Seleção Rápida de Marcas Formativas Senac:</strong> Clique nas etiquetas abaixo para adicionar ou remover as marcas institucionais diretamente no texto.
            </div>
          </div>

          <!-- Quick tag selector buttons -->
          <div class="flex flex-wrap gap-2 mb-4">
            <button type="button" onclick="toggleMarcaTag('Domínio técnico-científico')" class="marca-tag px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:border-senac-blue hover:text-senac-blue transition flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-slate-400"></i> Domínio técnico-científico
            </button>
            <button type="button" onclick="toggleMarcaTag('Visão crítica')" class="marca-tag px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:border-senac-blue hover:text-senac-blue transition flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-slate-400"></i> Visão crítica
            </button>
            <button type="button" onclick="toggleMarcaTag('Colaboração e comunicação')" class="marca-tag px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:border-senac-blue hover:text-senac-blue transition flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-slate-400"></i> Colaboração e comunicação
            </button>
            <button type="button" onclick="toggleMarcaTag('Criatividade e atitude empreendedora')" class="marca-tag px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:border-senac-blue hover:text-senac-blue transition flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-slate-400"></i> Criatividade e atitude empreendedora
            </button>
            <button type="button" onclick="toggleMarcaTag('Autonomia digital')" class="marca-tag px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:border-senac-blue hover:text-senac-blue transition flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-slate-400"></i> Autonomia digital
            </button>
            <button type="button" onclick="toggleMarcaTag('Atitude sustentável')" class="marca-tag px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-white hover:border-senac-blue hover:text-senac-blue transition flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-slate-400"></i> Atitude sustentável
            </button>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="marcas_formativas" class="block text-sm font-semibold text-slate-700">
                Marcas Formativas a serem trabalhadas <span class="text-rose-500">*</span>
              </label>
              <span id="count_marcas_formativas" class="text-xs text-slate-400">0 caracteres</span>
            </div>
            <textarea id="marcas_formativas" name="marcas_formativas" data-field="marcas_formativas" rows="6" 
                      placeholder="Ex:&#10;Domínio técnico-científico.&#10;Visão crítica.&#10;Colaboração e comunicação.&#10;Criatividade e atitude empreendedora."
                      class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
          </div>
        </div>
      </section>

      <!-- STEP 11: (11) Materiais e Recursos Tecnológicos -->
      <section id="step11" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-4xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">11</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">(11) Materiais e Recursos Tecnológicos</h3>
                <p class="text-sm text-slate-500">Hardwares, softwares, equipamentos e ambientes necessários para a realização da UC.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step11')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Sugerir com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Infraestrutura e Meios:</strong> Liste os laboratórios, equipamentos multimídia, softwares licenciados/livres e acessos a plataformas institucionais necessários para as atividades práticas.
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between mb-1">
              <label for="materiais_tecnologicos" class="block text-sm font-semibold text-slate-700">
                Materiais e Recursos Tecnológicos <span class="text-rose-500">*</span>
              </label>
              <span id="count_materiais_tecnologicos" class="text-xs text-slate-400">0 caracteres</span>
            </div>
            <textarea id="materiais_tecnologicos" name="materiais_tecnologicos" data-field="materiais_tecnologicos" rows="6" 
                      placeholder="Ex:&#10;Laboratório de informática com computadores conectados à internet banda larga.&#10;Equipamento multimídia (projetor e caixas de som).&#10;Ambiente de desenvolvimento integrado (IDE) e interpretadores configurados.&#10;Acesso à biblioteca virtual e documentações técnicas oficiais."
                      class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
          </div>
        </div>
      </section>

      <!-- STEP 12: Referências Bibliográficas (Normas ABNT) e Conclusão -->
      <section id="step12" class="wizard-step hidden p-6 sm:p-8">
        <div class="max-w-5xl">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-senac-soft text-senac-blue flex items-center justify-center text-lg font-bold">12</div>
              <div>
                <h3 class="text-xl font-heading font-bold text-slate-900">Referências Bibliográficas (Normas ABNT) & Exportação</h3>
                <p class="text-sm text-slate-500">Obras básicas, complementares e documentações formatadas nas normas ABNT.</p>
              </div>
            </div>

            <button type="button" onclick="triggerAiSuggest('step12')" class="btn-ai-suggest inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-senac-orange hover:from-amber-600 hover:to-senac-orange-hover text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition">
              <i class="fa-solid fa-wand-magic-sparkles"></i>
              <span>✨ Gerar ABNT com IA</span>
            </button>
          </div>

          <div class="bg-blue-50/60 border border-blue-100 rounded-xl p-3.5 mb-6 text-xs text-blue-900 flex items-start gap-2.5">
            <i class="fa-solid fa-circle-info text-blue-600 mt-0.5 text-sm"></i>
            <div>
              <strong class="font-semibold">Norma ABNT NBR 6023:</strong> As referências devem constar em ordem alfabética ou conforme indicação pedagógica, contendo Autor, Título, Edição, Local, Editora, Ano e Links de acesso quando aplicável.
            </div>
          </div>

          <div class="mb-6">
            <div class="flex items-center justify-between mb-1">
              <label for="referencias" class="block text-sm font-semibold text-slate-700">
                Lista de Referências Bibliográficas <span class="text-rose-500">*</span>
              </label>
              <span id="count_referencias" class="text-xs text-slate-400">0 caracteres</span>
            </div>
            <textarea id="referencias" name="referencias" data-field="referencias" rows="7" 
                      placeholder="Ex:&#10;EIBEN, Agoston E.; SMITH, James E. Introduction to evolutionary computing. 2. ed. Berlim: Springer, 2015.&#10;GOOGLE. Gemini API documentation and developer guides. Google Developers, 2026. Disponível em: https://ai.google.dev. Acesso em: 31 ago. 2026.&#10;PYTHON Software Foundation. Python documentation. Disponível em: https://docs.python.org/3/. Acesso em: 31 ago. 2026."
                      class="w-full px-3.5 py-3 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-senac-blue focus:border-transparent outline-none transition" required></textarea>
          </div>

          <!-- RESUMO E PRÉVIA DO DOCUMENTO -->
          <div class="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-6">
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2 text-senac-blue font-heading font-bold text-base">
                <i class="fa-solid fa-clipboard-check"></i>
                <span>Revisão Rápida dos Dados Preenchidos</span>
              </div>
              <span class="text-xs text-slate-500">Verifique antes de exportar</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs" id="reviewSummaryCards">
              <!-- Rendered dynamically -->
            </div>
          </div>

          <!-- ACTION GENERATE DOCX BANNER -->
          <div class="bg-gradient-to-r from-senac-navy via-senac-blue to-senac-orange p-6 rounded-2xl shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl text-amber-300 shadow-inner">
                <i class="fa-solid fa-file-word"></i>
              </div>
              <div>
                <h4 class="font-heading font-bold text-lg sm:text-xl text-white">Tudo pronto para gerar o PTD oficial!</h4>
                <p class="text-xs sm:text-sm text-slate-200 mt-0.5">O arquivo .docx será estruturado na formatação paisagem padrão Senac com tabelas e cabeçalho institucional.</p>
              </div>
            </div>

            <button type="button" id="btnExportDocx" onclick="handleGenerateDocx()" class="w-full md:w-auto px-8 py-3.5 bg-white hover:bg-slate-100 text-senac-blue font-heading font-bold text-sm sm:text-base rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3">
              <i class="fa-solid fa-download text-senac-orange"></i>
              <span>Gerar Documento .DOCX</span>
            </button>
          </div>
        </div>
      </section>

      <!-- NAVIGATION FOOTER -->
      <div class="bg-slate-50 border-t border-slate-200/80 px-6 py-4 flex flex-wrap items-center justify-between gap-3">
        <button type="button" id="btnPrevStep" onclick="prevStep()" class="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 bg-white hover:bg-slate-100 font-semibold text-xs sm:text-sm transition flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed">
          <i class="fa-solid fa-arrow-left"></i>
          <span>Anterior</span>
        </button>

        <div class="flex items-center gap-2">
          <button type="button" id="btnNextStep" onclick="nextStep()" class="px-6 py-2.5 rounded-xl bg-senac-blue hover:bg-senac-navy text-white font-semibold text-xs sm:text-sm shadow transition flex items-center gap-2">
            <span>Próximo</span>
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </form>
  </main>

  <!-- TOAST NOTIFICATION CONTAINER -->
  <div id="toastContainer" class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm pointer-events-none"></div>

  <!-- CONFIRM RESET MODAL -->
  <div id="resetModal" class="hidden fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
    <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 transform transition-all">
      <div class="flex items-center gap-3 text-rose-600 mb-3">
        <div class="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-lg">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </div>
        <h3 class="font-heading font-bold text-lg text-slate-900">Limpar Formulário?</h3>
      </div>
      <p class="text-xs sm:text-sm text-slate-600 mb-5">
        Esta ação apagará todos os dados preenchidos no formulário da sua sessão atual. Você terá que preencher os campos novamente. Deseja continuar?
      </p>
      <div class="flex items-center justify-end gap-3">
        <button type="button" onclick="closeResetModal()" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition">
          Cancelar
        </button>
        <button type="button" onclick="executeReset()" class="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-xl shadow transition">
          Sim, Limpar Tudo
        </button>
      </div>
    </div>
  </div>

  <!-- EMBEDDED JAVASCRIPT APP LOGIC -->
  <script>
    // --------------------------------------------------------------------------
    // GLOBAL CONSTANTS & LOGO ASSET
    // --------------------------------------------------------------------------
    const SENAC_LOGO_BASE64 = "{logo_b64}";
    const TOTAL_STEPS = 12;
    let currentStep = 1;

    // Step configuration metadata
    const STEPS_META = [
      {{ id: 1, title: 'Identificação Básica', icon: 'fa-id-card' }},
      {{ id: 2, title: 'Unidade Curricular', icon: 'fa-book' }},
      {{ id: 3, title: '(1) Situação de Aprendizagem', icon: 'fa-chalkboard-user' }},
      {{ id: 4, title: '(2) Indicadores e C.H', icon: 'fa-chart-pie' }},
      {{ id: 5, title: '(3) Elementos da Competência', icon: 'fa-layer-group' }},
      {{ id: 6, title: '(4) Metodologias Ativas', icon: 'fa-route' }},
      {{ id: 7, title: 'Momentos Didáticos', icon: 'fa-arrows-split-up-and-left' }},
      {{ id: 8, title: 'Procedimentos Avaliativos', icon: 'fa-list-check' }},
      {{ id: 9, title: '(9) Instrumentos de Avaliação', icon: 'fa-file-signature' }},
      {{ id: 10, title: '(10) Marcas Formativas', icon: 'fa-certificate' }},
      {{ id: 11, title: '(11) Materiais e Recursos', icon: 'fa-laptop-code' }},
      {{ id: 12, title: 'Referências e Conclusão', icon: 'fa-bookmark' }}
    ];

    // --------------------------------------------------------------------------
    // OFFLINE INSTITUTIONAL PEDAGOGICAL DATABASE (SENAC STANDARD)
    // --------------------------------------------------------------------------
    const OFFLINE_DB = {{
      ia: {{
        curso: "Técnico em Inteligência Artificial",
        instrutor: "Prof. Luiz Fernando Brogliatto Ferreira",
        formato: "Presencial",
        uc: "Evidenciar fundamentos e conceitos de Inteligência Artificial",
        ch_uc: "32H",
        situacao_aprendizagem: "Os alunos desenvolverão uma análise conceitual e prática dos fundamentos de Inteligência Artificial, explorando sua taxonomia, evolução histórica, métodos de aprendizado (supervisionado, não supervisionado e por reforço) e os impactos éticos e sociais associados ao uso da tecnologia em cenários reais.",
        indicadores: "Identifica conceitos e fundamentos de Inteligência Artificial. 8 H\\nClassifica diferentes métodos, algoritmos e técnicas utilizadas em Inteligência Artificial. 8 H\\nCompreende e utiliza resultados supervisionados e não supervisionados por reforço. 8 H\\nCompreende e aplica questões éticas e impactos sociais relacionados ao uso de Inteligência Artificial. 8 H",
        ch_situacao: "32 horas",
        conhecimentos: "Conceitos e fundamentos de IA (definições, objetivos, limitações e aplicações);\\nTaxonomia e técnicas (aprendizado supervisionado, não supervisionado e técnicas de busca);\\nHistória da IA e Teste de Turing;\\nFrameworks e bibliotecas (TensorFlow, Scikit-Learn);\\nÉtica em IA (viés, privacidade e impactos sociais).",
        habilidades: "Identificar e classificar diferentes técnicas de IA;\\nUtilizar frameworks e bibliotecas para implementar soluções conceituais simples;\\nAnalisar casos práticos e discutir implicações éticas;\\nParticipar ativamente de debates sobre inteligência artificial.",
        atitudes_valores: "Colaboração no trabalho em equipe;\\nCordialidade no trato com as pessoas;\\nFlexibilidade nas situações de trabalho;\\nProatividade na resolução de problemas e zelo profissional.",
        metodologias_ativas: "Aulas expositivas dialogadas para apresentação de conceitos fundamentais.\\nEstudos de caso reais para análise dos impactos éticos e sociais da IA.\\nSimulações computacionais e uso de ferramentas interativas.\\nDebates estruturados sobre cenários tecnológicos e o Teste de Turing.",
        acao_inicial: "Os alunos realizarão um diagnóstico interativo e análise diagnóstica sobre o uso cotidiano da inteligência artificial e marcos históricos.",
        reflexao: "Os alunos analisarão criticamente dilemas éticos, vieses algorítmicos e restrições de privacidade associados ao uso de soluções inteligentes.",
        acao_final: "Os alunos estruturarão um protótipo de solução algorítmica e defenderão uma proposta técnica documentada com foco em aderência ética.",
        proc_inicial: "Portfólios: para acompanhar o desenvolvimento e evolução do aluno.\\nObservações diretas: para avaliar a participação e engajamento dos alunos.\\nProjetos práticos: avaliação do briefing, protótipo e documentação do projeto.\\nApresentações finais: os alunos compartilharão sua solução e justificarão suas escolhas técnicas.",
        proc_reflexao: "A avaliação considerará a capacidade do aluno em revisar criticamente seu próprio trabalho, identificando melhorias e justificando suas escolhas técnicas.",
        proc_final: "Os alunos serão avaliados pela apresentação do protótipo final e pelo documento técnico, verificando a aderência da solução aos requisitos levantados.",
        instrumentos_avaliacao: "Portfólios: para acompanhar o desenvolvimento e evolução do aluno.\\nObservações diretas: para avaliar a participação e engajamento dos alunos.\\nProjetos práticos: avaliação do briefing, protótipo e documentação do projeto.\\nApresentações finais: os alunos compartilharão sua solução e justificarão suas escolhas técnicas.",
        marcas_formativas: "Domínio técnico-científico.\\nVisão crítica.\\nColaboração e comunicação.\\nCriatividade e atitude empreendedora.",
        materiais_tecnologicos: "Computadores com acesso à internet.\\nEquipamento multimídia (projetor e caixas de som).\\nAmbiente de Desenvolvimento Google Colab / VS Code.\\nDocumentações técnicas de frameworks de IA (TensorFlow e Scikit-Learn).",
        referencias: "EIBEN, Agoston E.; SMITH, James E. Introduction to evolutionary computing. 2. ed. Berlim: Springer, 2015. (Natural Computing Series).\\nGOOGLE. Gemini API documentation and developer guides. Google Developers, 2026. Disponível em: https://ai.google.dev. Acesso em: 31 ago. 2026.\\nPYTHON Software Foundation. Python documentation. Disponível em: https://docs.python.org/3/. Acesso em: 31 ago. 2026.\\nW3SCHOOLS. Python tutorial. Refsnes Data, 2026. Disponível em: https://www.w3schools.com/python/. Acesso em: 31 ago. 2026."
      }},
      ds: {{
        curso: "Técnico em Desenvolvimento de Sistemas",
        instrutor: "Prof. Henrique Silveira Soares",
        formato: "Presencial",
        uc: "Desenvolver aplicações web interativas e responsivas",
        ch_uc: "100H",
        situacao_aprendizagem: "Em uma simulação profissional de Software House, os alunos serão organizados em squads ágeis para conceber, desenvolver e publicar uma aplicação web responsiva para gestão de pedidos locais, aplicando padrões de arquitetura cliente-servidor, versionamento de código e boas práticas de usabilidade.",
        indicadores: "Desenvolve interfaces gráficas interativas aplicando padrões de acessibilidade e responsividade. 25 H\\nImplementa lógica cliente integrada a serviços assíncronos e APIs RESTful. 35 H\\nVersiona código-fonte utilizando Git e fluxos colaborativos de branches. 20 H\\nTesta e publica a aplicação em ambiente de hospedagem estática ou em nuvem. 20 H",
        ch_situacao: "100 horas",
        conhecimentos: "Estrutura semântica HTML5, estilização moderna CSS3 (Flexbox e Grid), manipulação do DOM e Javascript ES6+;\\nConceitos de consumo assíncrono de APIs (Fetch API / JSON);\\nSistemas de versionamento distribuído (Git / GitHub);\\nFundamentos de UI/UX e boas práticas de segurança no front-end.",
        habilidades: "Codificar layouts responsivos com CSS modular;\\nManipular eventos e dados reativos no navegador;\\nIntegrar endpoints de APIs externas;\\nRealizar depuração de scripts no DevTools e publicar o projeto no GitHub Pages.",
        atitudes_valores: "Rigor técnico e atenção aos detalhes de código;\\nComunicação transparente nas reuniões de alinhamento (daily meetings);\\nEmpatia com as necessidades do usuário final;\\nAutonomia na pesquisa de documentações e resolução de bugs.",
        metodologias_ativas: "Aprendizagem Baseada em Projetos (PBL) com simulação do framework Scrum.\\nSessões de programação em pares (Pair Programming).\\nRevisões de código entre pares (Peer Code Review).\\nOficinas práticas de prototipação rápida.",
        acao_inicial: "Apresentação do briefing do cliente com requisitos do sistema e realização de tempestade de ideias (brainstorming) para o backlog inicial.",
        reflexao: "Retrospectivas semanais de sprint para analisar entraves técnicos de codificação, usabilidade e organização do repositório compartilhado.",
        acao_final: "Demonstração pública da aplicação em funcionamento (Sprint Review) com publicação em servidor de hospedagem e entrega do repositório documentado.",
        proc_inicial: "Avaliação do entendimento dos requisitos técnicos e da modelagem preliminar dos componentes do sistema.",
        proc_reflexao: "Acompanhamento do engajamento no pair programming, qualidade dos commits no Git e participação nas retrospectivas ágeis.",
        proc_final: "Avaliação da aderência aos requisitos funcionais do sistema, responsividade nos diferentes dispositivos e limpeza do código-fonte entregue.",
        instrumentos_avaliacao: "Checklist de critérios técnicos de responsividade e código limpo.\\nRubricas de avaliação de desempenho em equipe ágil.\\nRepositório Git com histórico de commits e pull requests documentados.\\nApresentação e demonstração funcional em banca simulada.",
        marcas_formativas: "Domínio técnico-científico.\\nColaboração e comunicação.\\nAutonomia digital.\\nCriatividade e atitude empreendedora.",
        materiais_tecnologicos: "Computadores com processadores modernos e memória adequada.\\nVisual Studio Code com extensões recomendadas.\\nNavegadores modernos com DevTools.\\nConta no GitHub e conexão estável com a internet.",
        referencias: "FLANAGAN, David. JavaScript: o guia definitivo. 7. ed. Porto Alegre: Bookman, 2021.\\nMDN Web Docs. Mozilla Developer Network: documentação web para desenvolvedores. 2026. Disponível em: https://developer.mozilla.org/. Acesso em: 10 fev. 2026.\\nW3C. Web Content Accessibility Guidelines (WCAG) 2.2. W3C, 2023. Disponível em: https://www.w3.org/TR/WCAG22/. Acesso em: 15 mar. 2026."
      }},
      adm: {{
        curso: "Técnico em Administração",
        instrutor: "Profa. Mariana Albuquerque Mendes",
        formato: "Presencial",
        uc: "Estruturar planos de gestão operacional e financeira",
        ch_uc: "80H",
        situacao_aprendizagem: "Diante de um estudo de caso de uma média empresa com gargalos em seu fluxo operacional e endividamento de curto prazo, os estudantes elaborarão um plano completo de reestruturação de processos e readequação orçamentária, apresentando soluções sustentáveis à diretoria.",
        indicadores: "Analisa relatórios contábeis e demonstrativos financeiros para identificar indicadores de liquidez. 20 H\\nMapeia e redesenha fluxogramas de processos operacionais com redução de desperdícios. 20 H\\nElabora projeções de fluxo de caixa e orçamento operacional para tomada de decisão. 20 H\\nApresenta relatório executivo com propostas viáveis de reestruturação empresarial. 20 H",
        ch_situacao: "80 horas",
        conhecimentos: "Estrutura do Balanço Patrimonial e DRE;\\nGestão de Fluxo de Caixa e Capital de Giro;\\nMetodologias de mapeamento de processos (BPMN e ciclo PDCA);\\nFerramentas da qualidade (Diagrama de Ishikawa e Matriz GUT).",
        habilidades: "Interpretar relatórios e índices de liquidez e rentabilidade;\\nConstruir planilhas analíticas de projeção orçamentária;\\nElaborar diagnósticos operacionais fundamentados em dados;\\nSustentar propostas executivas para tomadores de decisão.",
        atitudes_valores: "Ética e confidencialidade no trato com dados organizacionais;\\nVisão estratégica e sistêmica do negócio;\\nResponsabilidade socioambiental na gestão de recursos;\\nProatividade e negociação empática.",
        metodologias_ativas: "Estudo de Caso realístico baseado em incidentes críticos de gestão.\\nSimulação empresarial com papéis executivos e tomada de decisões sob incerteza.\\nDinâmicas de painel consultivo e júri simulado.",
        acao_inicial: "Imersão no diagnóstico situacional da empresa problema e identificação preliminar das principais causas de ineficiência financeira e operacional.",
        reflexao: "Debate estruturado sobre impactos das escolhas financeiras nos colaboradores, fornecedores e na sustentabilidade do negócio a longo prazo.",
        acao_final: "Apresentação de um pitch executivo com o plano de ação detalhado (5W2H) e planilha de projeção orçamentária para a banca avaliadora.",
        proc_inicial: "Avaliação do levantamento de hipóteses e identificação dos nós críticos na fase diagnóstica.",
        proc_reflexao: "Acompanhamento da fundamentação teórica utilizada nas tomadas de decisão e na priorização de problemas.",
        proc_final: "Avaliação da viabilidade técnica e financeira da proposta final consolidada no relatório executivo.",
        instrumentos_avaliacao: "Ficha de avaliação de relatórios executivos.\\nRubrica de apresentação oral e poder de síntese.\\nPlanilha de controle financeiro auditada.\\nAutoavaliação e avaliação de pares sobre cooperação em equipe.",
        marcas_formativas: "Visão crítica.\\nDomínio técnico-científico.\\nCriatividade e atitude empreendedora.\\nAtitude sustentável.",
        materiais_tecnologicos: "Laboratório de informática com suíte de escritório (planilhas eletrônicas e apresentações).\\nCalculadoras financeiras ou emuladores.\\nSistema ERP educacional ou simulador gerencial online.\\nProjetor multimídia.",
        referencias: "CHIAVENATO, Idalberto. Introdução à teoria geral da administração. 10. ed. São Paulo: Atlas, 2021.\\nGITMAN, Lawrence J.; ZUTTER, Chad J. Princípios de administração financeira. 14. ed. São Paulo: Pearson, 2018.\\nSEBRAE. Gestão financeira: conceitos e ferramentas práticas para pequenas e médias empresas. Brasília: Sebrae, 2024."
      }}
    }};

    // --------------------------------------------------------------------------
    // HEURISTIC SYNTHESIZER (FOR ANY CUSTOM COURSE & UC)
    // --------------------------------------------------------------------------
    function generateHeuristicSuggestion(stepId, cursoName, ucName) {{
      const c = cursoName || "Curso Técnico";
      const u = ucName || "Prática Profissional";

      switch (stepId) {{
        case 'step3':
          return `Em um cenário simulado do mundo do trabalho contemporâneo relacionado à área de ${{c}}, os alunos atuarão em equipes multidisciplinares para resolver um desafio autêntico da Unidade Curricular "${{u}}". A situação envolve análise da demanda profissional, planejamento estratégico das ações, mobilização de ferramentas e metodologias técnicas específicas e entrega de um projeto/serviço validado segundo padrões de qualidade e sustentabilidade.`;
        
        case 'step4':
          return `Identifica parâmetros, conceitos e requisitos técnicos aplicáveis a "${{u}}". 10 H\\nExecuta procedimentos práticos e operacionais com base nas normas vigentes de ${{c}}. 15 H\\nAnalisa resultados obtidos e propõe melhorias contínuas no processo de trabalho. 15 H\\nDocumenta e comunica as soluções técnicas desenvolvidas com ética e clareza. 10 H`;
        
        case 'step5':
          return {{
            conhecimentos: `Fundamentos teóricos e conceitos essenciais de "${{u}}";\\nNormas técnicas, procedimentos de biossegurança e padrões de qualidade do setor;\\nVocabulário técnico, ferramentas de gestão e metodologias aplicáveis em ${{c}};\\nLegislação pertinente e princípios éticos profissionais.`,
            habilidades: `Aplicar métodos técnicos e operacionais na execução das tarefas de "${{u}}";\\nUtilizar equipamentos, softwares e instrumentos específicos com precisão;\\nIdentificar problemas práticos e propor soluções viáveis fundamentadas;\\nTrabalhar em equipe de forma colaborativa e articulada.`,
            atitudes_valores: `Ética e integridade no exercício das funções profissionais;\\nProatividade e zelo no uso dos recursos materiais e tecnológicos;\\nCordialidade, respeito à diversidade e comunicação assertiva;\\nCompromisso com a sustentabilidade e melhoria contínua.`
          }};

        case 'step6':
          return `Abordagem ativa e centrada no estudante, combinando Aprendizagem Baseada em Problemas (PBL), estudos de casos reais e oficinas práticas em laboratório. O docente atua como mediador e facilitador, estimulando a reflexão constante sobre a prática, a tomada de decisão fundamentada e a colaboração entre os pares.`;

        case 'step7':
          return {{
            acao_inicial: `Sensibilização dos alunos por meio da apresentação de uma situação-problema real da área de ${{c}}, levantamento de conhecimentos prévios e contextualização da relevância de "${{u}}".`,
            reflexao: `Discussão mediada sobre os desafios encontrados, confronto de diferentes abordagens técnicas, análise crítica dos resultados parciais e correções de rota.`,
            acao_final: `Conclusão da entrega prática (produto, relatório ou protótipo), sustentação das decisões técnicas tomadas e sistematização coletiva dos aprendizados.`
          }};

        case 'step8':
          return {{
            proc_inicial: `Diagnóstico inicial de prontidão e conhecimentos prévios através de tempestade de ideias e questionamentos direcionados.`,
            proc_reflexao: `Acompanhamento contínuo da participação nos debates, autoavaliação guiada e verificação da capacidade de justificar escolhas técnicas.`,
            proc_final: `Avaliação da qualidade da solução entregue, aderência às especificações do briefing e domínio demonstrado na apresentação final.`
          }};

        case 'step9':
          return `Portfólios individuais e coletivos para acompanhamento da evolução processual.\\nFichas de observação com critérios de desempenho e atitudes profissionais.\\nRubricas de avaliação de produtos técnicos e entregas parciais.\\nSustentação oral e relatórios técnicos finais.`;

        case 'step10':
          return `Domínio técnico-científico.\\nVisão crítica.\\nColaboração e comunicação.\\nCriatividade e atitude empreendedora.`;

        case 'step11':
          return `Laboratório especializado ou ambiente didático adequado para atividades práticas de ${{c}}.\\nComputadores com acesso à internet banda larga e periféricos multimídia.\\nSoftwares específicos, ferramentas digitais e materiais de consumo para experimentação.\\nDocumentações técnicas de referência e acervo da biblioteca física/virtual.`;

        case 'step12':
          return `BRASIL. Ministério da Educação. Diretrizes Curriculares Nacionais para a Educação Profissional e Tecnológica. Brasília: MEC, 2021.\\nSENAC. Departamento Nacional. Modelo Pedagógico Senac: currículo integrado e competência profissional. Rio de Janeiro: Senac, 2023.\\nLUCKESI, Cipriano Carlos. Avaliação da aprendizagem escolar: estudos e proposições. 22. ed. São Paulo: Cortez, 2018.`;

        default:
          return "";
      }}
    }}

    // --------------------------------------------------------------------------
    // GEMINI API INTEGRATION CALL
    // --------------------------------------------------------------------------
    async function callGeminiApi(promptText, apiKey) {{
      const modelsToTry = [
        'gemini-1.5-flash',
        'gemini-2.5-flash',
        'gemini-2.0-flash',
        'gemini-1.5-pro'
      ];

      let lastError = null;
      for (const model of modelsToTry) {{
        try {{
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${{model}}:generateContent?key=${{apiKey}}`;
          const payload = {{
            contents: [
              {{
                parts: [
                  {{
                    text: promptText
                  }}
                ]
              }}
            ],
            generationConfig: {{
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024
            }}
          }};

          const response = await fetch(endpoint, {{
            method: 'POST',
            headers: {{
              'Content-Type': 'application/json'
            }},
            body: JSON.stringify(payload)
          }});

          if (!response.ok) {{
            const errData = await response.json().catch(() => ({{}}));
            throw new Error(`[${{model}}] Status ${{response.status}}: ${{errData.error ? errData.error.message : response.statusText}}`);
          }}

          const data = await response.json();
          if (data && data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts[0]) {{
            return data.candidates[0].content.parts[0].text.trim();
          }} else {{
            throw new Error('Formato de resposta inesperado do Gemini.');
          }}
        }} catch (err) {{
          console.warn(`Tentativa com modelo ${{model}} falhou:`, err.message);
          lastError = err;
          // try next model
        }}
      }}
      throw lastError || new Error('Não foi possível obter resposta da API do Google Gemini.');
    }}

    // --------------------------------------------------------------------------
    // AI SUGGESTION DISPATCHER (HYBRID ONLINE/OFFLINE)
    // --------------------------------------------------------------------------
    async function triggerAiSuggest(stepId) {{
      const curso = document.getElementById('curso')?.value.trim() || 'Curso Técnico';
      const instrutor = document.getElementById('instrutor')?.value.trim() || '';
      const uc = document.getElementById('uc')?.value.trim() || 'Prática Profissional da UC';
      const chUc = document.getElementById('ch_uc')?.value.trim() || '80H';
      const situacao = document.getElementById('situacao_aprendizagem')?.value.trim() || '';

      const apiKey = sessionStorage.getItem('gemini_api_key') || document.getElementById('geminiApiKey')?.value.trim();
      const btn = event?.currentTarget;
      let originalBtnHtml = '';

      if (btn) {{
        originalBtnHtml = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> <span>Gerando...</span>`;
      }}

      // Check if course matches one of our rich pre-built offline databases
      let offlineMatch = null;
      const cLower = curso.toLowerCase();
      if (cLower.includes('inteligência artificial') || cLower.includes('ia') || cLower.includes('machine learning')) {{
        offlineMatch = OFFLINE_DB.ia;
      }} else if (cLower.includes('desenvolvimento') || cLower.includes('sistemas') || cLower.includes('computação') || cLower.includes('informática') || cLower.includes('programação')) {{
        offlineMatch = OFFLINE_DB.ds;
      }} else if (cLower.includes('administração') || cLower.includes('gestão') || cLower.includes('logística') || cLower.includes('recursos humanos') || cLower.includes('finanças')) {{
        offlineMatch = OFFLINE_DB.adm;
      }}

      let generatedData = null;
      let usedGemini = false;

      if (apiKey) {{
        try {{
          showToast('Consultando IA Google Gemini...', 'info');
          
          let prompt = '';
          const baseContext = `Você é um especialista em Design Instrucional e Pedagogia Institucional do Senac (Serviço Nacional de Aprendizagem Comercial).
Contexto Atual do Plano de Trabalho Docente (PTD):
- Curso Técnico: "${{curso}}"
- Unidade Curricular: "${{uc}}"
- Carga Horária da UC: "${{chUc}}"
${{situacao ? `- Situação de Aprendizagem já definida: "${{situacao}}"` : ''}}

Diretrizes: Responda em português brasileiro com rigor pedagógico do Modelo Pedagógico Senac (Educação Profissional baseada em Competências, Metodologias Ativas, Avaliação Formativa e Processual).`;

          if (stepId === 'step3') {{
            prompt = `${{baseContext}}
Tarefa: Escreva a "(1) Situação de Aprendizagem" para esta UC.
Requisitos: Um texto detalhado (1 a 2 parágrafos) apresentando uma situação desafiadora autêntica do mundo do trabalho com passos articulados que garantam o exercício prático da competência. Não use introduções ou saudações, forneça apenas o texto da situação.`;
            const text = await callGeminiApi(prompt, apiKey);
            generatedData = {{ situacao_aprendizagem: cleanMarkdown(text) }};
            usedGemini = true;

          }} else if (stepId === 'step4') {{
            prompt = `${{baseContext}}
Tarefa: Gere a lista de "(2) Indicadores trabalhados na Situação de Aprendizagem" com suas respectivas cargas horárias distribuídas (somando a carga horária da situação), e o valor total de horas da situação.
Formato de saída exato em linhas simples:
[Linhas com Indicador e carga horária ao final, ex: "Analisa requisitos de negócio... 8 H"]
Ao final, em uma linha separada identificada por "TOTAL_CH: XX horas"`;
            const text = await callGeminiApi(prompt, apiKey);
            let lines = text.split('\\n');
            let chSit = "32 horas";
            let indLines = [];
            lines.forEach(l => {{
              if (l.toUpperCase().includes('TOTAL_CH:')) {{
                chSit = l.split(':')[1].trim();
              }} else if (l.trim()) {{
                indLines.push(l.trim().replace(/^[-*•]\\s*/, ''));
              }}
            }});
            generatedData = {{
              indicadores: indLines.join('\\n'),
              ch_situacao: chSit
            }};
            usedGemini = true;

          }} else if (stepId === 'step5') {{
            prompt = `${{baseContext}}
Tarefa: Gere os "(3) Elementos da Competência" estruturados em 3 seções: Conhecimentos (saberes conceituais), Habilidades (saberes práticos/operacionais) e Atitudes e Valores (posturas socioemocionais/éticas).
Formato de saída estrito em JSON (sem markdown envolvente, apenas o JSON bruto):
{{
  "conhecimentos": "texto com itens separados por ponto e vírgula",
  "habilidades": "texto com itens de habilidades",
  "atitudes_valores": "texto com atitudes e valores"
}}`;
            const jsonRaw = await callGeminiApi(prompt, apiKey);
            const parsed = parseJsonSafely(jsonRaw);
            if (parsed && parsed.conhecimentos) {{
              generatedData = parsed;
              usedGemini = true;
            }}

          }} else if (stepId === 'step6') {{
            prompt = `${{baseContext}}
Tarefa: Escreva a abordagem de "(4) Metodologias Ativas (Geral)" para a condução desta UC.
Requisitos: 1 parágrafo denso e técnico citando estratégias como PBL, estudos de caso, simulações ou rotação por estações, focado no protagonismo do aluno no Senac. Apenas o texto direto.`;
            const text = await callGeminiApi(prompt, apiKey);
            generatedData = {{ metodologias_ativas: cleanMarkdown(text) }};
            usedGemini = true;

          }} else if (stepId === 'step7') {{
            prompt = `${{baseContext}}
Tarefa: Gere os 3 momentos didáticos da Situação de Aprendizagem:
(5) Ação Inicial (sensibilização e levantamento de hipóteses)
(6) Reflexão (problematização, análise crítica e dilemas)
(7) Ação Final (aplicação, síntese, elaboração da solução e protótipo)
Formato de saída estrito em JSON:
{{
  "acao_inicial": "descrição da ação inicial",
  "reflexao": "descrição do momento reflexivo",
  "acao_final": "descrição da ação final"
}}`;
            const jsonRaw = await callGeminiApi(prompt, apiKey);
            const parsed = parseJsonSafely(jsonRaw);
            if (parsed && parsed.acao_inicial) {{
              generatedData = parsed;
              usedGemini = true;
            }}

          }} else if (stepId === 'step8') {{
            prompt = `${{baseContext}}
Tarefa: Gere os procedimentos de avaliação formativa correspondentes aos 3 momentos didáticos:
- Procedimento avaliativo: Ação inicial
- Procedimento avaliativo: Reflexão
- Procedimento avaliativo: Ação final
Formato de saída estrito em JSON:
{{
  "proc_inicial": "como avaliar a ação inicial",
  "proc_reflexao": "como avaliar a reflexão",
  "proc_final": "como avaliar a ação final"
}}`;
            const jsonRaw = await callGeminiApi(prompt, apiKey);
            const parsed = parseJsonSafely(jsonRaw);
            if (parsed && parsed.proc_inicial) {{
              generatedData = parsed;
              usedGemini = true;
            }}

          }} else if (stepId === 'step9') {{
            prompt = `${{baseContext}}
Tarefa: Gere a lista de "(9) Instrumentos de Avaliação" do Senac (como Portfólios, Observações diretas, Projetos práticos, Apresentações finais, Rubricas) com uma breve justificativa de cada um. Apenas a lista direta formatada em linhas.`;
            const text = await callGeminiApi(prompt, apiKey);
            generatedData = {{ instrumentos_avaliacao: cleanMarkdown(text) }};
            usedGemini = true;

          }} else if (stepId === 'step10') {{
            prompt = `${{baseContext}}
Tarefa: Liste as Marcas Formativas Senac prioritárias trabalhadas nesta UC (dentre: Domínio técnico-científico, Visão crítica, Colaboração e comunicação, Criatividade e atitude empreendedora, Autonomia digital, Atitude sustentável). Apenas a lista com pontuação ao final de cada linha.`;
            const text = await callGeminiApi(prompt, apiKey);
            generatedData = {{ marcas_formativas: cleanMarkdown(text) }};
            usedGemini = true;

          }} else if (stepId === 'step11') {{
            prompt = `${{baseContext}}
Tarefa: Liste os "(11) Materiais e Recursos Tecnológicos" necessários para esta UC (laboratórios, equipamentos, softwares, links de documentação técnica, plataformas). Apenas os itens em linhas separadas.`;
            const text = await callGeminiApi(prompt, apiKey);
            generatedData = {{ materiais_tecnologicos: cleanMarkdown(text) }};
            usedGemini = true;

          }} else if (stepId === 'step12') {{
            prompt = `${{baseContext}}
Tarefa: Gere 3 a 5 Referências Bibliográficas (livros, manuais oficiais ou documentações técnicas) rigorosamente formatadas nas normas ABNT NBR 6023 para esta UC de "${{uc}}" do curso "${{curso}}". Apenas a lista alfabética das referências.`;
            const text = await callGeminiApi(prompt, apiKey);
            generatedData = {{ referencias: cleanMarkdown(text) }};
            usedGemini = true;
          }}

        }} catch (apiErr) {{
          console.error('Falha na API do Gemini, acionando fallback inteligente:', apiErr);
          showToast(`Aviso API: ${{apiErr.message.slice(0, 70)}}... Usando modelo acadêmico offline.`, 'warning');
        }}
      }}

      // If Gemini wasn't used or failed, use smart offline fallback
      if (!generatedData) {{
        if (offlineMatch) {{
          if (stepId === 'step3') generatedData = {{ situacao_aprendizagem: offlineMatch.situacao_aprendizagem }};
          else if (stepId === 'step4') generatedData = {{ indicadores: offlineMatch.indicadores, ch_situacao: offlineMatch.ch_situacao }};
          else if (stepId === 'step5') generatedData = {{ conhecimentos: offlineMatch.conhecimentos, habilidades: offlineMatch.habilidades, atitudes_valores: offlineMatch.atitudes_valores }};
          else if (stepId === 'step6') generatedData = {{ metodologias_ativas: offlineMatch.metodologias_ativas }};
          else if (stepId === 'step7') generatedData = {{ acao_inicial: offlineMatch.acao_inicial, reflexao: offlineMatch.reflexao, acao_final: offlineMatch.acao_final }};
          else if (stepId === 'step8') generatedData = {{ proc_inicial: offlineMatch.proc_inicial, proc_reflexao: offlineMatch.proc_reflexao, proc_final: offlineMatch.proc_final }};
          else if (stepId === 'step9') generatedData = {{ instrumentos_avaliacao: offlineMatch.instrumentos_avaliacao }};
          else if (stepId === 'step10') generatedData = {{ marcas_formativas: offlineMatch.marcas_formativas }};
          else if (stepId === 'step11') generatedData = {{ materiais_tecnologicos: offlineMatch.materiais_tecnologicos }};
          else if (stepId === 'step12') generatedData = {{ referencias: offlineMatch.referencias }};
        }} else {{
          // Universal heuristic synthesis based on user's entered text
          const heuristic = generateHeuristicSuggestion(stepId, curso, uc);
          if (stepId === 'step3') generatedData = {{ situacao_aprendizagem: heuristic }};
          else if (stepId === 'step4') generatedData = {{ indicadores: heuristic, ch_situacao: "32 horas" }};
          else if (stepId === 'step5') generatedData = heuristic;
          else if (stepId === 'step6') generatedData = {{ metodologias_ativas: heuristic }};
          else if (stepId === 'step7') generatedData = heuristic;
          else if (stepId === 'step8') generatedData = heuristic;
          else if (stepId === 'step9') generatedData = {{ instrumentos_avaliacao: heuristic }};
          else if (stepId === 'step10') generatedData = {{ marcas_formativas: heuristic }};
          else if (stepId === 'step11') generatedData = {{ materiais_tecnologicos: heuristic }};
          else if (stepId === 'step12') generatedData = {{ referencias: heuristic }};
        }}
      }}

      // Apply data to form fields
      if (generatedData) {{
        for (const [key, val] of Object.entries(generatedData)) {{
          const el = document.getElementById(key);
          if (el) {{
            el.value = val;
            el.classList.add('ring-2', 'ring-amber-400', 'bg-amber-50/20');
            setTimeout(() => {{
              el.classList.remove('ring-2', 'ring-amber-400', 'bg-amber-50/20');
            }}, 1500);
          }}
        }}
        saveFormData();
        updateCharacterCounters();
        if (usedGemini) {{
          showToast('Sugestão gerada com sucesso via Google Gemini!', 'success');
        }} else {{
          showToast('Sugestão pedagógica aplicada com sucesso (Modelo Offline)!', 'info');
        }}
      }}

      if (btn) {{
        btn.disabled = false;
        btn.innerHTML = originalBtnHtml;
      }}
    }}

    function cleanMarkdown(md) {{
      return md.replace(/^```[a-z]*\\n/i, '').replace(/\\n```$/i, '').trim();
    }}

    function parseJsonSafely(str) {{
      try {{
        const cleaned = str.replace(/^```json\\n/i, '').replace(/^```\\n/i, '').replace(/\\n```$/i, '').trim();
        return JSON.parse(cleaned);
      }} catch (e) {{
        // Attempt substring match
        const match = str.match(/\\{{[\\s\\S]*\\}}/);
        if (match) {{
          try {{ return JSON.parse(match[0]); }} catch (e2) {{}}
        }}
        return null;
      }}
    }}

    // --------------------------------------------------------------------------
    // WIZARD NAVIGATION & STEP LOGIC
    // --------------------------------------------------------------------------
    function renderStepPills() {{
      const container = document.getElementById('stepPillsContainer');
      if (!container) return;

      container.innerHTML = STEPS_META.map(s => {{
        let badgeClass = 'step-badge-pending';
        let iconHtml = `<span class="text-xs font-bold">${{s.id}}</span>`;
        if (s.id < currentStep) {{
          badgeClass = 'step-badge-done';
          iconHtml = `<i class="fa-solid fa-check text-[11px]"></i>`;
        }} else if (s.id === currentStep) {{
          badgeClass = 'step-badge-active';
          iconHtml = `<span class="text-xs font-bold">${{s.id}}</span>`;
        }}

        return `
          <button type="button" onclick="goToStep(${{s.id}})" class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-left transition hover:bg-slate-100 group flex-shrink-0">
            <div class="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition ${{badgeClass}}">
              ${{iconHtml}}
            </div>
            <div class="hidden xl:block">
              <span class="text-[11px] font-medium block leading-tight ${{s.id === currentStep ? 'text-senac-blue font-bold' : 'text-slate-600'}}">
                ${{s.title}}
              </span>
            </div>
          </button>
        `;
      }}).join('');
    }}

    function updateWizardUI() {{
      // Hide all steps, show current
      for (let i = 1; i <= TOTAL_STEPS; i++) {{
        const stepEl = document.getElementById(`step${{i}}`);
        if (stepEl) {{
          if (i === currentStep) {{
            stepEl.classList.remove('hidden');
          }} else {{
            stepEl.classList.add('hidden');
          }}
        }}
      }}

      // Update Header Text & Counter
      const meta = STEPS_META.find(s => s.id === currentStep);
      const stepCounter = document.getElementById('wizardStepCounter');
      const stepTitleHeader = document.getElementById('wizardStepTitleHeader');
      if (stepCounter) stepCounter.innerHTML = `<i class="fa-solid fa-list-check"></i> Passo ${{currentStep}} de ${{TOTAL_STEPS}}`;
      if (stepTitleHeader && meta) stepTitleHeader.innerText = meta.title;

      // Update Progress Bar
      const percentage = Math.round((currentStep / TOTAL_STEPS) * 100);
      const progressBar = document.getElementById('progressBar');
      const progressText = document.getElementById('progressPercentageText');
      if (progressBar) progressBar.style.width = `${{percentage}}%`;
      if (progressText) progressText.innerText = `${{percentage}}%`;

      // Navigation Buttons
      const btnPrev = document.getElementById('btnPrevStep');
      const btnNext = document.getElementById('btnNextStep');
      if (btnPrev) {{
        btnPrev.disabled = (currentStep === 1);
      }}
      if (btnNext) {{
        if (currentStep === TOTAL_STEPS) {{
          btnNext.classList.add('hidden');
        }} else {{
          btnNext.classList.remove('hidden');
        }}
      }}

      renderStepPills();
      updateCharacterCounters();

      if (currentStep === TOTAL_STEPS) {{
        renderReviewSummary();
      }}

      window.scrollTo({{ top: 0, behavior: 'smooth' }});
    }}

    function nextStep() {{
      if (currentStep < TOTAL_STEPS) {{
        currentStep++;
        updateWizardUI();
      }}
    }}

    function prevStep() {{
      if (currentStep > 1) {{
        currentStep--;
        updateWizardUI();
      }}
    }}

    function goToStep(step) {{
      if (step >= 1 && step <= TOTAL_STEPS) {{
        currentStep = step;
        updateWizardUI();
      }}
    }}

    // --------------------------------------------------------------------------
    // SUMMARY REVIEW COMPONENT (STEP 12)
    // --------------------------------------------------------------------------
    function renderReviewSummary() {{
      const container = document.getElementById('reviewSummaryCards');
      if (!container) return;

      const data = getFormData();
      const fields = [
        {{ label: 'Curso', val: data.curso || 'Não informado', icon: 'fa-graduation-cap' }},
        {{ label: 'Instrutor', val: data.instrutor || 'Não informado', icon: 'fa-user-tie' }},
        {{ label: 'Formato', val: data.formato || 'Presencial', icon: 'fa-chalkboard-user' }},
        {{ label: 'Unidade Curricular', val: data.uc || 'Não informada', icon: 'fa-book' }},
        {{ label: 'C.H da UC', val: data.ch_uc || 'Não informada', icon: 'fa-clock' }},
        {{ label: 'C.H Situação', val: data.ch_situacao || 'Não informada', icon: 'fa-stopwatch' }},
        {{ label: 'Conhecimentos', val: truncate(data.conhecimentos, 60), icon: 'fa-book-bookmark' }},
        {{ label: 'Habilidades', val: truncate(data.habilidades, 60), icon: 'fa-gears' }},
        {{ label: 'Marcas Formativas', val: truncate(data.marcas_formativas, 60), icon: 'fa-certificate' }}
      ];

      container.innerHTML = fields.map(f => `
        <div class="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs flex items-start gap-2.5">
          <div class="w-7 h-7 rounded-lg bg-senac-soft text-senac-blue flex items-center justify-center flex-shrink-0 text-xs">
            <i class="fa-solid ${{f.icon}}"></i>
          </div>
          <div class="overflow-hidden">
            <span class="text-[10px] uppercase font-bold text-slate-400 block">${{f.label}}</span>
            <span class="text-xs text-slate-700 font-medium truncate block" title="${{f.val}}">${{f.val}}</span>
          </div>
        </div>
      `).join('');
    }}

    function truncate(str, max) {{
      if (!str) return 'Não preenchido';
      return str.length > max ? str.substring(0, max) + '...' : str;
    }}

    // --------------------------------------------------------------------------
    // MARCAS FORMATIVAS QUICK TAG TOGGLE
    // --------------------------------------------------------------------------
    function toggleMarcaTag(marca) {{
      const textarea = document.getElementById('marcas_formativas');
      if (!textarea) return;
      
      let lines = textarea.value.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
      const index = lines.findIndex(l => l.toLowerCase().includes(marca.toLowerCase()));
      
      if (index >= 0) {{
        lines.splice(index, 1);
      }} else {{
        lines.push(`${{marca}}.`);
      }}
      textarea.value = lines.join('\\n');
      saveFormData();
      updateCharacterCounters();
      updateMarcaButtons();
    }}

    function updateMarcaButtons() {{
      const textarea = document.getElementById('marcas_formativas');
      if (!textarea) return;
      const text = textarea.value.toLowerCase();
      
      document.querySelectorAll('.marca-tag').forEach(btn => {{
        const btnText = btn.innerText.trim().toLowerCase();
        if (text.includes(btnText)) {{
          btn.classList.add('bg-senac-soft', 'text-senac-blue', 'border-senac-blue');
          btn.classList.remove('bg-white', 'text-slate-700');
          btn.querySelector('i').classList.remove('text-slate-400');
          btn.querySelector('i').classList.add('text-senac-blue');
        }} else {{
          btn.classList.remove('bg-senac-soft', 'text-senac-blue', 'border-senac-blue');
          btn.classList.add('bg-white', 'text-slate-700');
          btn.querySelector('i').classList.add('text-slate-400');
          btn.querySelector('i').classList.remove('text-senac-blue');
        }}
      }});
    }}

    // --------------------------------------------------------------------------
    // PERSISTENCE (SESSIONSTORAGE & AUTOSAVE)
    // --------------------------------------------------------------------------
    function getFormData() {{
      const data = {{}};
      document.querySelectorAll('[data-field]').forEach(el => {{
        const key = el.getAttribute('data-field');
        if (key) {{
          data[key] = el.value;
        }}
      }});
      return data;
    }}

    function saveFormData() {{
      try {{
        const data = getFormData();
        sessionStorage.setItem('ptd_form_data', JSON.stringify(data));
        // Mirrored to localStorage as reliable backup
        localStorage.setItem('ptd_form_data_backup', JSON.stringify(data));
        flashSaveIndicator();
      }} catch (e) {{
        console.warn('Erro ao salvar no storage:', e);
      }}
    }}

    function restoreFormData() {{
      try {{
        let raw = sessionStorage.getItem('ptd_form_data') || localStorage.getItem('ptd_form_data_backup');
        if (raw) {{
          const data = JSON.parse(raw);
          for (const [key, val] of Object.entries(data)) {{
            const el = document.getElementById(key);
            if (el && val !== undefined) {{
              el.value = val;
            }}
          }}
          updateCharacterCounters();
          updateMarcaButtons();
        }}
      }} catch (e) {{
        console.warn('Erro ao restaurar storage:', e);
      }}
    }}

    function flashSaveIndicator() {{
      const ind = document.getElementById('saveIndicator');
      if (ind) {{
        ind.classList.remove('opacity-70');
        ind.classList.add('opacity-100');
        setTimeout(() => {{
          ind.classList.add('opacity-70');
        }}, 800);
      }}
    }}

    function updateCharacterCounters() {{
      const fields = [
        'situacao_aprendizagem', 'indicadores', 'metodologias_ativas',
        'instrumentos_avaliacao', 'marcas_formativas', 'materiais_tecnologicos', 'referencias'
      ];
      fields.forEach(id => {{
        const el = document.getElementById(id);
        const count = document.getElementById(`count_${{id}}`);
        if (el && count) {{
          count.innerText = `${{el.value.length}} caracteres`;
        }}
      }});
    }}

    // --------------------------------------------------------------------------
    // PRESET LOADER & RESET
    // --------------------------------------------------------------------------
    function loadTemplate(key) {{
      const template = OFFLINE_DB[key];
      if (!template) return;

      for (const [field, val] of Object.entries(template)) {{
        const el = document.getElementById(field);
        if (el) el.value = val;
      }}
      saveFormData();
      updateCharacterCounters();
      updateMarcaButtons();
      closePresetsMenu();
      showToast(`Modelo "${{template.curso}}" carregado com sucesso!`, 'success');
      goToStep(1);
    }}

    function confirmReset() {{
      closePresetsMenu();
      document.getElementById('resetModal').classList.remove('hidden');
    }}

    function closeResetModal() {{
      document.getElementById('resetModal').classList.add('hidden');
    }}

    function executeReset() {{
      sessionStorage.removeItem('ptd_form_data');
      localStorage.removeItem('ptd_form_data_backup');
      document.getElementById('ptdForm').reset();
      updateCharacterCounters();
      updateMarcaButtons();
      closeResetModal();
      showToast('Formulário limpo com sucesso!', 'info');
      goToStep(1);
    }}

    function closePresetsMenu() {{
      document.getElementById('presetsMenu')?.classList.add('hidden');
    }}

    // --------------------------------------------------------------------------
    // TOAST NOTIFICATION UTILITY
    // --------------------------------------------------------------------------
    function showToast(message, type = 'info') {{
      const container = document.getElementById('toastContainer');
      if (!container) return;

      const toast = document.createElement('div');
      toast.className = `p-3.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2.5 transition-all duration-300 transform translate-y-2 pointer-events-auto border ${{
        type === 'success' ? 'bg-emerald-600 text-white border-emerald-500' :
        type === 'warning' ? 'bg-amber-500 text-white border-amber-400' :
        type === 'error' ? 'bg-rose-600 text-white border-rose-500' :
        'bg-slate-800 text-white border-slate-700'
      }}`;

      const icon = type === 'success' ? 'fa-circle-check' :
                   type === 'warning' ? 'fa-triangle-exclamation' :
                   type === 'error' ? 'fa-circle-xmark' : 'fa-circle-info';

      toast.innerHTML = `<i class="fa-solid ${{icon}} text-sm"></i> <span>${{message}}</span>`;
      container.appendChild(toast);

      requestAnimationFrame(() => {{
        toast.classList.remove('translate-y-2');
        toast.classList.add('translate-y-0');
      }});

      setTimeout(() => {{
        toast.classList.add('opacity-0', 'translate-x-4');
        setTimeout(() => toast.remove(), 300);
      }}, 3500);
    }}

    // --------------------------------------------------------------------------
    // DOCX.JS INSTITUTIONAL PTD GENERATION & DOWNLOAD
    // --------------------------------------------------------------------------
    async function handleGenerateDocx() {{
      const btn = document.getElementById('btnExportDocx');
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-senac-orange"></i> <span>Construindo .DOCX...</span>`;

      try {{
        if (!window.docx) {{
          throw new Error('A biblioteca docx.js não foi carregada corretamente. Verifique sua conexão com a internet.');
        }}

        const data = getFormData();
        const blob = await buildSenacDocxBlob(data);

        // Download via native browser URL - Formato: "PTD " + Nome do curso + " - " + Unidade Curricular.docx
        const cursoClean = (data.curso || 'Curso').trim();
        const ucClean = (data.uc || '').trim();
        let baseDocxName = `PTD ${{cursoClean}}`;
        if (ucClean) {{
          baseDocxName += ucClean.startsWith('-') ? ` ${{ucClean}}` : ` - ${{ucClean}}`;
        }}
        const fileName = `${{baseDocxName}}.docx`.replace(/[\\\\/:*?"<>|]/g, '');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        showToast('Documento Word .DOCX gerado e baixado com sucesso!', 'success');
      }} catch (err) {{
        console.error('Erro na exportação DOCX:', err);
        showToast('Erro ao gerar documento: ' + err.message, 'error');
      }} finally {{
        btn.disabled = false;
        btn.innerHTML = originalText;
      }}
    }}

    async function buildSenacDocxBlob(data) {{
      const {{
        Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        WidthType, BorderStyle, PageOrientation, AlignmentType, Header, ImageRun,
        VerticalAlign, ShadingType
      }} = window.docx;

      // Table Borders (Solid crisp borders matching official Senac PTD template)
      const thinBorder = {{
        style: BorderStyle.SINGLE,
        size: 4, // 0.5pt
        color: "444444"
      }};
      const cellBorders = {{
        top: thinBorder,
        bottom: thinBorder,
        left: thinBorder,
        right: thinBorder
      }};

      // Prepare official Senac header image
      let headerImageRun = null;
      try {{
        const raw = atob(SENAC_LOGO_BASE64);
        const u8 = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) {{
          u8[i] = raw.charCodeAt(i);
        }}
        headerImageRun = new ImageRun({{
          data: u8,
          transformation: {{
            width: 155,
            height: 31
          }}
        }});
      }} catch (e) {{
        console.warn('Erro ao carregar imagem no header:', e);
      }}

      // Helper function to create runs
      function pRun(text, opts = {{}}) {{
        return new Paragraph({{
          children: [
            new TextRun({{
              text: text || "",
              font: "Arial",
              size: (opts.fontSize || 10) * 2,
              bold: !!opts.bold,
              italics: !!opts.italic,
              color: opts.color || "000000"
            }})
          ],
          alignment: opts.alignment || AlignmentType.LEFT,
          spacing: {{
            before: opts.spaceBefore || 40,
            after: opts.spaceAfter || 40,
            line: 240
          }}
        }});
      }}

      // Cell builder for combined title + multiline content
      function makeCell(label, content, colSpan = 1, widthPercent = null, bgHex = null) {{
        const paragraphs = [];
        if (label) {{
          paragraphs.push(new Paragraph({{
            children: [
              new TextRun({{
                text: label,
                bold: true,
                font: "Arial",
                size: 20 // 10pt
              }})
            ],
            spacing: {{ before: 40, after: 30 }}
          }}));
        }}

        const lines = (content || "").split('\\n');
        lines.forEach(l => {{
          if (l.trim().length > 0) {{
            paragraphs.push(new Paragraph({{
              children: [
                new TextRun({{
                  text: l.trim(),
                  font: "Arial",
                  size: 20 // 10pt
                }})
              ],
              spacing: {{ before: 20, after: 20 }}
            }}));
          }}
        }});

        if (paragraphs.length === 0) {{
          paragraphs.push(new Paragraph({{ children: [new TextRun({{ text: " ", font: "Arial", size: 20 }})] }}));
        }}

        const cellProps = {{
          children: paragraphs,
          borders: cellBorders,
          margins: {{ top: 120, bottom: 120, left: 140, right: 140 }},
          verticalAlign: VerticalAlign.TOP
        }};

        if (colSpan > 1) {{
          cellProps.columnSpan = colSpan;
        }}
        if (widthPercent) {{
          cellProps.width = {{ size: widthPercent, type: WidthType.PERCENTAGE }};
        }}
        if (bgHex) {{
          cellProps.shading = {{ fill: bgHex, type: ShadingType.CLEAR }};
        }}

        return new TableCell(cellProps);
      }}

      // Header paragraph
      const headerParas = [];
      if (headerImageRun) {{
        headerParas.push(new Paragraph({{
          alignment: AlignmentType.LEFT,
          children: [headerImageRun],
          spacing: {{ after: 120 }}
        }}));
      }} else {{
        headerParas.push(new Paragraph({{
          children: [new TextRun({{ text: "SENAC - Serviço Nacional de Aprendizagem Comercial", font: "Arial", bold: true, size: 20 }})]
        }}));
      }}

      // ------------------------------------------------------------------------
      // TABLE 0: Identificação Básica, UC e Situação de Aprendizagem
      // ------------------------------------------------------------------------
      const table0 = new Table({{
        width: {{ size: 100, type: WidthType.PERCENTAGE }},
        rows: [
          // Row 0: Nome do curso
          new TableRow({{
            children: [
              makeCell("Nome do curso: ", data.curso || "", 2, 100)
            ]
          }}),
          // Row 1: Instrutor
          new TableRow({{
            children: [
              makeCell("Instrutor: ", data.instrutor || "", 2, 100)
            ]
          }}),
          // Row 2: Formato da aula
          new TableRow({{
            children: [
              makeCell("Formato da aula: ", data.formato || "Presencial", 2, 100)
            ]
          }}),
          // Row 3: Unidade Curricular & C.H da UC
          new TableRow({{
            children: [
              makeCell("Unidade Curricular: ", data.uc || "", 1, 75),
              makeCell("C.H da UC: ", data.ch_uc || "", 1, 25)
            ]
          }}),
          // Row 4: SITUAÇÃO DE APRENDIZAGEM
          new TableRow({{
            children: [
              makeCell("SITUAÇÃO DE APRENDIZAGEM:", data.situacao_aprendizagem || "", 2, 100)
            ]
          }}),
          // Row 5: Indicadores trabalhados & C.H da Situação
          new TableRow({{
            children: [
              makeCell("Indicador(es) trabalhados na Situação de Aprendizagem:", data.indicadores || "", 1, 75),
              makeCell("C.H da Situação de aprendizagem:", data.ch_situacao || "", 1, 25)
            ]
          }})
        ]
      }});

      // ------------------------------------------------------------------------
      // TABLE 1: Elementos, Metodologias, Avaliação, Marcas, Recursos, Referências
      // ------------------------------------------------------------------------
      const table1 = new Table({{
        width: {{ size: 100, type: WidthType.PERCENTAGE }},
        rows: [
          // Row 0: (3) Elementos da Competência Header
          new TableRow({{
            children: [
              new TableCell({{
                columnSpan: 3,
                width: {{ size: 100, type: WidthType.PERCENTAGE }},
                borders: cellBorders,
                shading: {{ fill: "F1F5F9", type: ShadingType.CLEAR }},
                margins: {{ top: 100, bottom: 100, left: 140, right: 140 }},
                children: [
                  new Paragraph({{
                    alignment: AlignmentType.CENTER,
                    children: [new TextRun({{ text: "(3) Elementos da Competência", font: "Arial", bold: true, size: 22 }})]
                  }})
                ]
              }})
            ]
          }}),
          // Row 1: Conhecimentos, Habilidades, Atitudes e valores
          new TableRow({{
            children: [
              makeCell("Conhecimentos", data.conhecimentos || "", 1, 33.3),
              makeCell("Habilidades", data.habilidades || "", 1, 33.3),
              makeCell("Atitudes e valores", data.atitudes_valores || "", 1, 33.4)
            ]
          }}),
          // Row 2: (4) Metodologias ativas (Geral)
          new TableRow({{
            children: [
              makeCell("(4) Metodologias ativas:", data.metodologias_ativas || "", 3, 100)
            ]
          }}),
          // Row 3: Momentos Didáticos (5) Ação Inicial, (6) Reflexão, (7) Ação Final
          new TableRow({{
            children: [
              makeCell("(5) Metodologias ativas: Ação inicial", data.acao_inicial || "", 1, 33.3),
              makeCell("(6) Metodologias ativas: Reflexão", data.reflexao || "", 1, 33.3),
              makeCell("(7) Metodologias ativas: Ação Final", data.acao_final || "", 1, 33.4)
            ]
          }}),
          // Row 4: Procedimentos Avaliativos
          new TableRow({{
            children: [
              makeCell("(8) Procedimento avaliativo: Ação inicial", data.proc_inicial || "", 1, 33.3),
              makeCell("Procedimento avaliativo: Reflexão", data.proc_reflexao || "", 1, 33.3),
              makeCell("Procedimento avaliativo: Ação Final", data.proc_final || "", 1, 33.4)
            ]
          }}),
          // Row 5: (9) Instrumentos de avaliação
          new TableRow({{
            children: [
              makeCell("(9) Instrumentos de avaliação:", data.instrumentos_avaliacao || "", 3, 100)
            ]
          }}),
          // Row 6: (10) Marcas Formativas
          new TableRow({{
            children: [
              makeCell("(10) Marcas(s) Formativas(s) a serem trabalhadas:", data.marcas_formativas || "", 3, 100)
            ]
          }}),
          // Row 7: (11) Materiais/recursos tecnológicos
          new TableRow({{
            children: [
              makeCell("(11) Materiais/recursos tecnológicos:", data.materiais_tecnologicos || "", 3, 100)
            ]
          }}),
          // Row 8: REFERÊNCIAS
          new TableRow({{
            children: [
              makeCell("REFERÊNCIAS:", data.referencias || "", 3, 100)
            ]
          }})
        ]
      }});

      // Document Construction (A4 Landscape as standard in Senac models)
      const doc = new Document({{
        sections: [{{
          properties: {{
            page: {{
              size: {{
                orientation: PageOrientation.LANDSCAPE,
                width: 16838, // 297mm in twips
                height: 11906 // 210mm in twips
              }},
              margin: {{
                top: 720,    // 0.5 in
                bottom: 720,
                left: 720,
                right: 720
              }}
            }}
          }},
          headers: {{
            default: new Header({{
              children: headerParas
            }})
          }},
          children: [
            new Paragraph({{
              alignment: AlignmentType.CENTER,
              spacing: {{ before: 100, after: 180 }},
              children: [
                new TextRun({{
                  text: "Plano de Trabalho Docente",
                  font: "Arial",
                  bold: true,
                  size: 26 // 13pt
                }})
              ]
            }}),
            table0,
            new Paragraph({{
              spacing: {{ before: 140, after: 140 }},
              children: [new TextRun({{ text: "", font: "Arial" }})]
            }}),
            table1
          ]
        }}]
      }});

      return await Packer.toBlob(doc);
    }}

    // --------------------------------------------------------------------------
    // DOM INITIALIZATION & EVENT LISTENERS
    // --------------------------------------------------------------------------
    document.addEventListener('DOMContentLoaded', () => {{
      // Restore stored API key if present
      const storedKey = sessionStorage.getItem('gemini_api_key');
      const apiKeyInput = document.getElementById('geminiApiKey');
      const apiKeyBadge = document.getElementById('apiKeyStatusBadge');
      if (storedKey && apiKeyInput) {{
        apiKeyInput.value = storedKey;
        if (apiKeyBadge) {{
          apiKeyBadge.classList.remove('bg-slate-300');
          apiKeyBadge.classList.add('bg-emerald-400');
        }}
      }}

      // Restore form data from session
      restoreFormData();

      // Autosave listener on inputs & changes
      document.getElementById('ptdForm')?.addEventListener('input', () => {{
        saveFormData();
        updateCharacterCounters();
      }});
      document.getElementById('ptdForm')?.addEventListener('change', () => {{
        saveFormData();
        updateCharacterCounters();
      }});

      // Toggle API Drawer
      document.getElementById('btnToggleApiKey')?.addEventListener('click', () => {{
        const drawer = document.getElementById('apiKeyDrawer');
        drawer?.classList.toggle('hidden');
      }});

      // Toggle Show/Hide Key
      document.getElementById('btnToggleShowKey')?.addEventListener('click', () => {{
        const input = document.getElementById('geminiApiKey');
        const icon = document.querySelector('#btnToggleShowKey i');
        if (input.type === 'password') {{
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        }} else {{
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }}
      }});

      // Save API key
      document.getElementById('btnSaveApiKey')?.addEventListener('click', () => {{
        const val = document.getElementById('geminiApiKey')?.value.trim();
        if (val) {{
          sessionStorage.setItem('gemini_api_key', val);
          if (apiKeyBadge) {{
            apiKeyBadge.classList.remove('bg-slate-300');
            apiKeyBadge.classList.add('bg-emerald-400');
          }}
          showToast('Chave Google Gemini armazenada nesta sessão com sucesso!', 'success');
        }} else {{
          sessionStorage.removeItem('gemini_api_key');
          if (apiKeyBadge) {{
            apiKeyBadge.classList.remove('bg-emerald-400');
            apiKeyBadge.classList.add('bg-slate-300');
          }}
          showToast('Chave removida. Usando banco pedagógico offline.', 'info');
        }}
      }});

      // Presets Menu Toggle
      document.getElementById('btnPresets')?.addEventListener('click', (e) => {{
        e.stopPropagation();
        document.getElementById('presetsMenu')?.classList.toggle('hidden');
      }});

      document.addEventListener('click', (e) => {{
        if (!e.target.closest('#presetsMenu') && !e.target.closest('#btnPresets')) {{
          closePresetsMenu();
        }}
      }});

      // Initial Wizard Setup
      updateWizardUI();
    }});
  </script>
</body>
</html>
'''

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_template)

print('Generated index.html successfully!')
