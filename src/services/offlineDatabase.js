// Banco de Dados Pedagógico Offline (Padrão Senac) & Sintetizador Heurístico

export const OFFLINE_PRESETS = {
  ia: {
    curso: "Técnico em Inteligência Artificial",
    instrutor: "Prof. Luiz Fernando Brogliatto Ferreira",
    formato: "Presencial",
    uc: "Evidenciar fundamentos e conceitos de Inteligência Artificial",
    ch_uc: "32H",
    situacao_aprendizagem: "Os alunos desenvolverão uma análise conceitual e prática dos fundamentos de Inteligência Artificial, explorando sua taxonomia, evolução histórica, métodos de aprendizado (supervisionado, não supervisionado e por reforço) e os impactos éticos e sociais associados ao uso da tecnologia em cenários reais.",
    indicadores: "Identifica conceitos e fundamentos de Inteligência Artificial. 8 H\nClassifica diferentes métodos, algoritmos e técnicas utilizadas em Inteligência Artificial. 8 H\nCompreende e utiliza resultados supervisionados e não supervisionados por reforço. 8 H\nCompreende e aplica questões éticas e impactos sociais relacionados ao uso de Inteligência Artificial. 8 H",
    ch_situacao: "32 horas",
    conhecimentos: "Conceitos e fundamentos de IA (definições, objetivos, limitações e aplicações);\nTaxonomia e técnicas (aprendizado supervisionado, não supervisionado e técnicas de busca);\nHistória da IA e Teste de Turing;\nFrameworks e bibliotecas (TensorFlow, Scikit-Learn);\nÉtica em IA (viés, privacidade e impactos sociais).",
    habilidades: "Identificar e classificar diferentes técnicas de IA;\nUtilizar frameworks e bibliotecas para implementar soluções conceituais simples;\nAnalisar casos práticos e discutir implicações éticas;\nParticipar ativamente de debates sobre inteligência artificial.",
    atitudes_valores: "Colaboração no trabalho em equipe;\nCordialidade no trato com as pessoas;\nFlexibilidade nas situações de trabalho;\nProatividade na resolução de problemas e zelo profissional.",
    metodologias_ativas: "Aulas expositivas dialogadas para apresentação de conceitos fundamentais.\nEstudos de caso reais para análise dos impactos éticos e sociais da IA.\nSimulações computacionais e uso de ferramentas interativas.\nDebates estruturados sobre cenários tecnológicos e o Teste de Turing.",
    acao_inicial: "Os alunos realizarão um diagnóstico interativo e análise diagnóstica sobre o uso cotidiano da inteligência artificial e marcos históricos.",
    reflexao: "Os alunos analisarão criticamente dilemas éticos, vieses algorítmicos e restrições de privacidade associados ao uso de soluções inteligentes.",
    acao_final: "Os alunos estruturarão um protótipo de solução algorítmica e defenderão uma proposta técnica documentada com foco em aderência ética.",
    proc_inicial: "Portfólios: para acompanhar o desenvolvimento e evolução do aluno.\nObservações diretas: para avaliar a participação e engajamento dos alunos.\nProjetos práticos: avaliação do briefing, protótipo e documentação do projeto.\nApresentações finais: os alunos compartilharão sua solução e justificarão suas escolhas técnicas.",
    proc_reflexao: "A avaliação considerará a capacidade do aluno em revisar criticamente seu próprio trabalho, identificando melhorias e justificando suas escolhas técnicas.",
    proc_final: "Os alunos serão avaliados pela apresentação do protótipo final e pelo documento técnico, verificando a aderência da solução aos requisitos levantados.",
    instrumentos_avaliacao: "Portfólios: para acompanhar o desenvolvimento e evolução do aluno.\nObservações diretas: para avaliar a participação e engajamento dos alunos.\nProjetos práticos: avaliação do briefing, protótipo e documentação do projeto.\nApresentações finais: os alunos compartilharão sua solução e justificarão suas escolhas técnicas.",
    marcas_formativas: "Domínio técnico-científico.\nVisão crítica.\nColaboração e comunicação.\nCriatividade e atitude empreendedora.",
    materiais_tecnologicos: "Computadores com acesso à internet.\nEquipamento multimídia (projetor e caixas de som).\nAmbiente de Desenvolvimento Google Colab / VS Code.\nDocumentações técnicas de frameworks de IA (TensorFlow e Scikit-Learn).",
    referencias: "EIBEN, Agoston E.; SMITH, James E. Introduction to evolutionary computing. 2. ed. Berlim: Springer, 2015. (Natural Computing Series).\nGOOGLE. Gemini API documentation and developer guides. Google Developers, 2026. Disponível em: https://ai.google.dev. Acesso em: 31 ago. 2026.\nPYTHON Software Foundation. Python documentation. Disponível em: https://docs.python.org/3/. Acesso em: 31 ago. 2026.\nW3SCHOOLS. Python tutorial. Refsnes Data, 2026. Disponível em: https://www.w3schools.com/python/. Acesso em: 31 ago. 2026."
  },
  ds: {
    curso: "Técnico em Desenvolvimento de Sistemas",
    instrutor: "Prof. Henrique Silveira Soares",
    formato: "Presencial",
    uc: "Desenvolver aplicações web interativas e responsivas",
    ch_uc: "100H",
    situacao_aprendizagem: "Em uma simulação profissional de Software House, os alunos serão organizados em squads ágeis para conceber, desenvolver e publicar uma aplicação web responsiva para gestão de pedidos locais, aplicando padrões de arquitetura cliente-servidor, versionamento de código e boas práticas de usabilidade.",
    indicadores: "Desenvolve interfaces gráficas interativas aplicando padrões de acessibilidade e responsividade. 25 H\nImplementa lógica cliente integrada a serviços assíncronos e APIs RESTful. 35 H\nVersiona código-fonte utilizando Git e fluxos colaborativos de branches. 20 H\nTesta e publica a aplicação em ambiente de hospedagem estática ou em nuvem. 20 H",
    ch_situacao: "100 horas",
    conhecimentos: "Estrutura semântica HTML5, estilização moderna CSS3 (Flexbox e Grid), manipulação do DOM e Javascript ES6+;\nConceitos de consumo assíncrono de APIs (Fetch API / JSON);\nSistemas de versionamento distribuído (Git / GitHub);\nFundamentos de UI/UX e boas práticas de segurança no front-end.",
    habilidades: "Codificar layouts responsivos com CSS modular;\nManipular eventos e dados reativos no navegador;\nIntegrar endpoints de APIs externas;\nRealizar depuração de scripts no DevTools e publicar o projeto no GitHub Pages.",
    atitudes_valores: "Rigor técnico e atenção aos detalhes de código;\nComunicação transparente nas reuniões de alinhamento (daily meetings);\nEmpatia com as necessidades do usuário final;\nAutonomia na pesquisa de documentações e resolução de bugs.",
    metodologias_ativas: "Aprendizagem Baseada em Projetos (PBL) com simulação do framework Scrum.\nSessões de programação em pares (Pair Programming).\nRevisões de código entre pares (Peer Code Review).\nOficinas práticas de prototipação rápida.",
    acao_inicial: "Apresentação do briefing do cliente com requisitos do sistema e realização de tempestade de ideias (brainstorming) para o backlog inicial.",
    reflexao: "Retrospectivas semanais de sprint para analisar entraves técnicos de codificação, usabilidade e organização do repositório compartilhado.",
    acao_final: "Demonstração pública da aplicação em funcionamento (Sprint Review) com publicação em servidor de hospedagem e entrega do repositório documentado.",
    proc_inicial: "Avaliação do entendimento dos requisitos técnicos e da modelagem preliminar dos componentes do sistema.",
    proc_reflexao: "Acompanhamento do engajamento no pair programming, qualidade dos commits no Git e participação nas retrospectivas ágeis.",
    proc_final: "Avaliação da aderência aos requisitos funcionais do sistema, responsividade nos diferentes dispositivos e limpeza do código-fonte entregue.",
    instrumentos_avaliacao: "Checklist de critérios técnicos de responsividade e código limpo.\nRubricas de avaliação de desempenho em equipe ágil.\nRepositório Git com histórico de commits e pull requests documentados.\nApresentação e demonstração funcional em banca simulada.",
    marcas_formativas: "Domínio técnico-científico.\nColaboração e comunicação.\nAutonomia digital.\nCriatividade e atitude empreendedora.",
    materiais_tecnologicos: "Computadores com processadores modernos e memória adequada.\nVisual Studio Code com extensões recomendadas.\nNavegadores modernos com DevTools.\nConta no GitHub e conexão estável com a internet.",
    referencias: "FLANAGAN, David. JavaScript: o guia definitivo. 7. ed. Porto Alegre: Bookman, 2021.\nMDN Web Docs. Mozilla Developer Network: documentação web para desenvolvedores. 2026. Disponível em: https://developer.mozilla.org/. Acesso em: 10 fev. 2026.\nW3C. Web Content Accessibility Guidelines (WCAG) 2.2. W3C, 2023. Disponível em: https://www.w3.org/TR/WCAG22/. Acesso em: 15 mar. 2026."
  },
  adm: {
    curso: "Técnico em Administração",
    instrutor: "Profa. Mariana Albuquerque Mendes",
    formato: "Presencial",
    uc: "Estruturar planos de gestão operacional e financeira",
    ch_uc: "80H",
    situacao_aprendizagem: "Diante de um estudo de caso de uma média empresa com gargalos em seu fluxo operacional e endividamento de curto prazo, os estudantes elaborarão um plano completo de reestruturação de processos e readequação orçamentária, apresentando soluções sustentáveis à diretoria.",
    indicadores: "Analisa relatórios contábeis e demonstrativos financeiros para identificar indicadores de liquidez. 20 H\nMapeia e redesenha fluxogramas de processos operacionais com redução de desperdícios. 20 H\nElabora projeções de fluxo de caixa e orçamento operacional para tomada de decisão. 20 H\nApresenta relatório executivo com propostas viáveis de reestruturação empresarial. 20 H",
    ch_situacao: "80 horas",
    conhecimentos: "Estrutura do Balanço Patrimonial e DRE;\nGestão de Fluxo de Caixa e Capital de Giro;\nMetodologias de mapeamento de processos (BPMN e ciclo PDCA);\nFerramentas da qualidade (Diagrama de Ishikawa e Matriz GUT).",
    habilidades: "Interpretar relatórios e índices de liquidez e rentabilidade;\nConstruir planilhas analíticas de projeção orçamentária;\nElaborar diagnósticos operacionais fundamentados em dados;\nSustentar propostas executivas para tomadores de decisão.",
    atitudes_valores: "Ética e confidencialidade no trato com dados organizacionais;\nVisão estratégica e sistêmica do negócio;\nResponsabilidade socioambiental na gestão de recursos;\nProatividade e negociação empática.",
    metodologias_ativas: "Estudo de Caso realístico baseado em incidentes críticos de gestão.\nSimulação empresarial com papéis executivos e tomada de decisões sob incerteza.\nDinâmicas de painel consultivo e júri simulado.",
    acao_inicial: "Imersão no diagnóstico situacional da empresa problema e identificação preliminar das principais causas de ineficiência financeira e operacional.",
    reflexao: "Debate estruturado sobre impactos das escolhas financeiras nos colaboradores, fornecedores e na sustentabilidade do negócio a longo prazo.",
    acao_final: "Apresentação de um pitch executivo com o plano de ação detalhado (5W2H) e planilha de projeção orçamentária para a banca avaliadora.",
    proc_inicial: "Avaliação do levantamento de hipóteses e identificação dos nós críticos na fase diagnóstica.",
    proc_reflexao: "Acompanhamento da fundamentação teórica utilizada nas tomadas de decisão e na priorização de problemas.",
    proc_final: "Avaliação da viabilidade técnica e financeira da proposta final consolidada no relatório executivo.",
    instrumentos_avaliacao: "Ficha de avaliação de relatórios executivos.\nRubrica de apresentação oral e poder de síntese.\nPlanilha de controle financeiro auditada.\nAutoavaliação e avaliação de pares sobre cooperação em equipe.",
    marcas_formativas: "Visão crítica.\nDomínio técnico-científico.\nCriatividade e atitude empreendedora.\nAtitude sustentável.",
    materiais_tecnologicos: "Laboratório de informática com suíte de escritório (planilhas eletrônicas e apresentações).\nCalculadoras financeiras ou emuladores.\nSistema ERP educacional ou simulador gerencial online.\nProjetor multimídia.",
    referencias: "CHIAVENATO, Idalberto. Introdução à teoria geral da administração. 10. ed. São Paulo: Atlas, 2021.\nGITMAN, Lawrence J.; ZUTTER, Chad J. Princípios de administração financeira. 14. ed. São Paulo: Pearson, 2018.\nSEBRAE. Gestão financeira: conceitos e ferramentas práticas para pequenas e médias empresas. Brasília: Sebrae, 2024."
  }
};

export function getOfflineSuggestion(stepId, cursoName, ucName) {
  const c = cursoName || "Curso Técnico";
  const u = ucName || "Prática Profissional da UC";
  const cLower = c.toLowerCase();

  // Check preset match
  let match = null;
  if (cLower.includes('inteligência artificial') || cLower.includes('ia') || cLower.includes('machine learning')) {
    match = OFFLINE_PRESETS.ia;
  } else if (cLower.includes('desenvolvimento') || cLower.includes('sistemas') || cLower.includes('computação') || cLower.includes('informática') || cLower.includes('programação')) {
    match = OFFLINE_PRESETS.ds;
  } else if (cLower.includes('administração') || cLower.includes('gestão') || cLower.includes('logística') || cLower.includes('recursos humanos') || cLower.includes('finanças')) {
    match = OFFLINE_PRESETS.adm;
  }

  if (match) {
    switch (stepId) {
      case 3: return { situacao_aprendizagem: match.situacao_aprendizagem };
      case 4: return { indicadores: match.indicadores, ch_situacao: match.ch_situacao };
      case 5: return { conhecimentos: match.conhecimentos, habilidades: match.habilidades, atitudes_valores: match.atitudes_valores };
      case 6: return { metodologias_ativas: match.metodologias_ativas };
      case 7: return { acao_inicial: match.acao_inicial, reflexao: match.reflexao, acao_final: match.acao_final };
      case 8: return { proc_inicial: match.proc_inicial, proc_reflexao: match.proc_reflexao, proc_final: match.proc_final };
      case 9: return { instrumentos_avaliacao: match.instrumentos_avaliacao };
      case 10: return { marcas_formativas: match.marcas_formativas };
      case 11: return { materiais_tecnologicos: match.materiais_tecnologicos };
      case 12: return { referencias: match.referencias };
      default: return {};
    }
  }

  // Universal Heuristic Fallback
  switch (stepId) {
    case 3:
      return {
        situacao_aprendizagem: `Em um cenário simulado do mundo do trabalho contemporâneo relacionado à área de ${c}, os alunos atuarão em equipes multidisciplinares para resolver um desafio autêntico da Unidade Curricular "${u}". A situação envolve análise da demanda profissional, planejamento estratégico das ações, mobilização de ferramentas e metodologias técnicas específicas e entrega de um projeto/serviço validado segundo padrões de qualidade e sustentabilidade.`
      };
    case 4:
      return {
        indicadores: `Identifica parâmetros, conceitos e requisitos técnicos aplicáveis a "${u}". 10 H\nExecuta procedimentos práticos e operacionais com base nas normas vigentes de ${c}. 15 H\nAnalisa resultados obtidos e propõe melhorias contínuas no processo de trabalho. 15 H\nDocumenta e comunica as soluções técnicas desenvolvidas com ética e clareza. 10 H`,
        ch_situacao: "32 horas"
      };
    case 5:
      return {
        conhecimentos: `Fundamentos teóricos e conceitos essenciais de "${u}";\nNormas técnicas, procedimentos de biossegurança e padrões de qualidade do setor;\nVocabulário técnico, ferramentas de gestão e metodologias aplicáveis em ${c};\nLegislação pertinente e princípios éticos profissionais.`,
        habilidades: `Aplicar métodos técnicos e operacionais na execução das tarefas de "${u}";\nUtilizar equipamentos, softwares e instrumentos específicos com precisão;\nIdentificar problemas práticos e propor soluções viáveis fundamentadas;\nTrabalhar em equipe de forma colaborativa e articulada.`,
        atitudes_valores: `Ética e integridade no exercício das funções profissionais;\nProatividade e zelo no uso dos recursos materiais e tecnológicos;\nCordialidade, respeito à diversidade e comunicação assertiva;\nCompromisso com a sustentabilidade e melhoria contínua.`
      };
    case 6:
      return {
        metodologias_ativas: `Abordagem ativa e centrada no estudante, combinando Aprendizagem Baseada em Problemas (PBL), estudos de casos reais e oficinas práticas em laboratório. O docente atua como mediador e facilitador, estimulando a reflexão constante sobre a prática, a tomada de decisão fundamentada e a colaboração entre os pares.`
      };
    case 7:
      return {
        acao_inicial: `Sensibilização dos alunos por meio da apresentação de uma situação-problema real da área de ${c}, levantamento de conhecimentos prévios e contextualização da relevância de "${u}".`,
        reflexao: `Discussão mediada sobre os desafios encontrados, confronto de diferentes abordagens técnicas, análise crítica dos resultados parciais e correções de rota.`,
        acao_final: `Conclusão da entrega prática (produto, relatório ou protótipo), sustentação das decisões técnicas tomadas e sistematização coletiva dos aprendizados.`
      };
    case 8:
      return {
        proc_inicial: `Diagnóstico inicial de prontidão e conhecimentos prévios através de tempestade de ideias e questionamentos direcionados.`,
        proc_reflexao: `Acompanhamento contínuo da participação nos debates, autoavaliação guiada e verificação da capacidade de justificar escolhas técnicas.`,
        proc_final: `Avaliação da qualidade da solução entregue, aderência às especificações do briefing e domínio demonstrado na apresentação final.`
      };
    case 9:
      return {
        instrumentos_avaliacao: `Portfólios individuais e coletivos para acompanhamento da evolução processual.\nFichas de observação com critérios de desempenho e atitudes profissionais.\nRubricas de avaliação de produtos técnicos e entregas parciais.\nSustentação oral e relatórios técnicos finais.`
      };
    case 10:
      return {
        marcas_formativas: `Domínio técnico-científico.\nVisão crítica.\nColaboração e comunicação.\nCriatividade e atitude empreendedora.`
      };
    case 11:
      return {
        materiais_tecnologicos: `Laboratório especializado ou ambiente didático adequado para atividades práticas de ${c}.\nComputadores com acesso à internet banda larga e periféricos multimídia.\nSoftwares específicos, ferramentas digitais e materiais de consumo para experimentação.\nDocumentações técnicas de referência e acervo da biblioteca física/virtual.`
      };
    case 12:
      return {
        referencias: `BRASIL. Ministério da Educação. Diretrizes Curriculares Nacionais para a Educação Profissional e Tecnológica. Brasília: MEC, 2021.\nSENAC. Departamento Nacional. Modelo Pedagógico Senac: currículo integrado e competência profissional. Rio de Janeiro: Senac, 2023.\nLUCKESI, Cipriano Carlos. Avaliação da aprendizagem escolar: estudos e proposições. 22. ed. São Paulo: Cortez, 2018.`
      };
    default:
      return {};
  }
}
