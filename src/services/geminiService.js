// Serviço de Integração Direta com Google Gemini

export const PRIMARY_MODEL = 'gemini-3.6-flash';
const API_VERSION = 'v1beta';

export const SUPPORTED_MODELS = [
  { id: 'auto', name: '⚡ Automático (Recomendado)' },
  { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash (Oficial Free Tier)' }
];

// Modelos conhecidos com suporte a generateContent
export const FALLBACK_ORDER = [
  'gemini-3.6-flash'
];

let lastSuccessfulModel = 'gemini-3.6-flash';
let discoveredModelsCache = null;

export function getSelectedModel() {
  try {
    return sessionStorage.getItem('gemini_selected_model') || 'auto';
  } catch {
    return 'auto';
  }
}

export function setSelectedModel(model) {
  try {
    sessionStorage.setItem('gemini_selected_model', model);
  } catch {}
}

export function getLastSuccessfulModel() {
  return lastSuccessfulModel;
}

/**
 * Consulta a API do Google (ModelService.ListModels) para descobrir
 * os modelos reais disponíveis para a chave do usuário que suportam generateContent.
 */
export async function discoverAvailableModels(apiKey) {
  if (!apiKey || !apiKey.trim()) return [];
  const cleanKey = apiKey.trim();
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/${API_VERSION}/models?key=${cleanKey}`);
    if (!res.ok) {
      console.warn('Não foi possível listar modelos via ListModels:', res.status);
      return [];
    }
    const data = await res.json();
    const available = (data.models || [])
      .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
      .map(m => ({
        id: m.name.replace('models/', ''),
        name: `${m.displayName || m.name.replace('models/', '')}`
      }));

    console.info('Modelos oficiais retornados pelo Google para esta chave:', available);
    if (available.length > 0) {
      discoveredModelsCache = available;
    }
    return available;
  } catch (err) {
    console.warn('Erro ao consultar ListModels:', err);
    return [];
  }
}

export async function testGeminiConnection(apiKey, preferredModel) {
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Chave da API do Google Gemini não informada.');
  }

  // Descobre modelos disponíveis para a chave
  const available = await discoverAvailableModels(apiKey);

  const prompt = 'Responda apenas: "Conexão com Google Gemini estabelecida com sucesso!"';
  const text = await generateWithGemini(prompt, apiKey.trim(), { 
    maxTokens: 100,
    preferredModel: preferredModel || getSelectedModel()
  });
  
  return {
    text,
    usedModel: lastSuccessfulModel,
    availableModels: available,
    toString: () => text
  };
}

export async function generateWithGemini(promptText, apiKey, options = {}) {
  const { jsonMode = false, maxTokens = 4096, preferredModel } = options;
  if (!apiKey || !apiKey.trim()) {
    throw new Error('Chave da API do Google Gemini não informada.');
  }

  const cleanKey = apiKey.trim();
  const chosenModel = preferredModel || getSelectedModel();

  // Constrói a lista de modelos a tentar:
  // Se houver cache de modelos descobertos da chave, usa-os; caso contrário, usa gemini-3.6-flash
  let candidateList = [];
  if (discoveredModelsCache && discoveredModelsCache.length > 0) {
    candidateList = discoveredModelsCache.map(m => m.id);
  } else {
    candidateList = [PRIMARY_MODEL, ...FALLBACK_ORDER];
  }

  // Remove duplicados preservando a ordem
  candidateList = Array.from(new Set(candidateList));

  let modelsToTry = [];
  if (chosenModel && chosenModel !== 'auto' && candidateList.includes(chosenModel)) {
    modelsToTry = [chosenModel, ...candidateList.filter(m => m !== chosenModel)];
  } else if (chosenModel && chosenModel !== 'auto') {
    // Modelo escolhido manualmente pelo usuário
    modelsToTry = [chosenModel, ...candidateList];
  } else {
    // Modo automático: prioriza gemini-3.6-flash ou o último bem-sucedido
    modelsToTry = candidateList.includes(lastSuccessfulModel)
      ? [lastSuccessfulModel, ...candidateList.filter(m => m !== lastSuccessfulModel)]
      : candidateList;
  }

  let lastError = null;

  for (const model of modelsToTry) {
    const endpoint = `https://generativelanguage.googleapis.com/${API_VERSION}/models/${model}:generateContent?key=${cleanKey}`;

    const generationConfig = {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: maxTokens
    };

    if (jsonMode) {
      generationConfig.responseMimeType = 'application/json';
    }

    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      generationConfig
    };

    // Retry com backoff inteligente para 503 (High Demand)
    const MAX_503_RETRIES = 3;
    let attempt = 0;
    let success = false;
    let responseText = null;

    while (attempt < MAX_503_RETRIES) {
      attempt++;
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (res.ok) {
          const json = await res.json();
          const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (text) {
            lastSuccessfulModel = model;
            console.info(`✅ Resposta recebida com sucesso via [${model}]`);
            return text.trim();
          }
        }

        const errJson = await res.json().catch(() => ({}));
        const detailedMsg = errJson.error?.message || res.statusText || 'Erro desconhecido';
        const reason = errJson.error?.details?.[0]?.reason || '';

        // Se for 503 (High demand / temporariamente sobrecarregado), aguarda e tenta de novo o mesmo modelo
        if (res.status === 503) {
          const waitSecs = attempt * 2; // 2s, 4s, 6s
          console.warn(`[${model}] 503 Alta demanda temporária (tentativa ${attempt}/${MAX_503_RETRIES}). Aguardando ${waitSecs}s para nova tentativa automática...`);
          if (attempt < MAX_503_RETRIES) {
            await new Promise(resolve => setTimeout(resolve, waitSecs * 1000));
            continue;
          }
          lastError = new Error(`[${model}] Erro 503: Servidores do Gemini em alta demanda temporária. Tente novamente em instantes.`);
          break; // sai do while para tentar o próximo modelo se houver
        }

        // Se for erro de autenticação ou chave inexistente/inválida, para imediatamente
        if (res.status === 401 || reason === 'ACCESS_TOKEN_TYPE_UNSUPPORTED' || detailedMsg.includes('authentication credentials')) {
          throw new Error('Erro 401 (Não Autorizado): Chave não reconhecida pelo Google Gemini. Verifique a chave informada.');
        }
        if (res.status === 400 && (detailedMsg.toLowerCase().includes('api key not valid') || detailedMsg.toLowerCase().includes('key invalid'))) {
          throw new Error(`Erro 400: Chave de API inválida (${detailedMsg}).`);
        }
        if (res.status === 429) {
          lastError = new Error(`Erro 429: Cota esgotada nesta chave (${detailedMsg}).`);
          break;
        }

        lastError = new Error(`[${model}] Erro ${res.status}: ${detailedMsg}`);
        break; // Outros erros (ex: 404), vai para o próximo modelo
      } catch (err) {
        if (err.message?.includes('401') || err.message?.includes('400')) {
          throw err;
        }
        lastError = err;
        break;
      }
    }
  }

  throw lastError || new Error('Nenhum modelo respondeu com sucesso. Tente novamente em instantes.');
}

export function cleanMarkdown(text) {
  if (!text) return '';
  return text.replace(/^```[a-z]*\n?/im, '').replace(/\n?```$/m, '').trim();
}

export function parseJsonSafely(str) {
  if (!str) return null;
  // 1. Limpeza de blocos de markdown
  let text = str
    .replace(/^```json\s*/im, '')
    .replace(/^```\s*/im, '')
    .replace(/\s*```$/m, '')
    .trim();

  // 2. Tentativa direta
  try {
    return JSON.parse(text);
  } catch {}

  // 3. Extrai entre a primeira { e a última }
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start !== -1 && end !== -1 && end > start) {
    const substr = text.substring(start, end + 1);
    try {
      return JSON.parse(substr);
    } catch {}

    // 4. Limpa vírgulas extras antes de fechamento de chave/colchete
    try {
      const sanitized = substr
        .replace(/,\s*([\}\]])/g, '$1')
        .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, '');
      return JSON.parse(sanitized);
    } catch {}
  }

  return null;
}

export async function generateFullPtdWithGemini({ curso, uc, chUc, ch_uc, instrutor, formato }, apiKey) {
  const cargaHoraria = ch_uc || chUc || '80 Horas';
  const prompt = `Você é um Especialista Sênior em Design Pedagógico e Coordenador Técnico do Senac.
Gere um Plano de Trabalho Docente (PTD) COMPLETO e PROFISSIONAL no Modelo Pedagógico Senac para:
- Curso Técnico: "${curso}"
- Unidade Curricular (UC): "${uc}"
- Carga Horária da UC: "${cargaHoraria}"
${instrutor ? `- Instrutor: "${instrutor}"` : ''}
${formato ? `- Formato: "${formato}"` : ''}

Diretrizes Obrigatórias Senac:
1. Situação de Aprendizagem articulada ao mercado de trabalho, com contexto autêntico e desafio profissional instigante.
2. Indicadores mensuráveis com distribuição de carga horária para a situação (a soma das horas dos indicadores deve respeitar a carga horária de "${cargaHoraria}").
3. Elementos da Competência (Conhecimentos técnicos, Habilidades operacionais, Atitudes e valores).
4. Metodologias ativas contextualizadas (PBL, estudo de caso, oficinas práticas, simulações).
5. 3 Momentos Pedagógicos (Ação Inicial, Reflexão, Ação Final) integrados a procedimentos de avaliação formativa.
6. Instrumentos de avaliação e marcas formativas Senac.
7. Materiais e recursos tecnológicos específicos para ${curso}.
8. 3 a 5 Referências bibliográficas rigorosamente nas normas ABNT NBR 6023.

Retorne EXCLUSIVAMENTE um JSON estrito com as seguintes chaves:
{
  "situacao_aprendizagem": "texto detalhado da situação de aprendizagem...",
  "indicadores": "linha 1... 8 H\\nlinha 2... 12 H\\nlinha 3... 12 H",
  "ch_situacao": "${cargaHoraria}",
  "conhecimentos": "itens essenciais...",
  "habilidades": "habilidades técnicas...",
  "atitudes_valores": "atitudes profissionais...",
  "metodologias_ativas": "parágrafo de metodologias ativas...",
  "acao_inicial": "descrição do momento inicial...",
  "reflexao": "descrição da reflexão...",
  "acao_final": "descrição da ação final...",
  "proc_inicial": "procedimento inicial...",
  "proc_reflexao": "procedimento de reflexão...",
  "proc_final": "procedimento final...",
  "instrumentos_avaliacao": "lista dos instrumentos...",
  "marcas_formativas": "marcas formativas trabalhadas...",
  "materiais_tecnologicos": "materiais e softwares...",
  "referencias": "referências nas normas ABNT NBR 6023..."
}`;

  const raw = await generateWithGemini(prompt, apiKey, { jsonMode: true, maxTokens: 8192 });
  const parsed = parseJsonSafely(raw);
  if (!parsed) {
    console.error('Resposta que falhou no parse JSON:', raw);
    throw new Error('A resposta da IA não pôde ser convertida em formato estruturado. Tente novamente.');
  }

  // Normalização flexível das chaves
  const situacao = parsed.situacao_aprendizagem || parsed.situacaoAprendizagem || parsed.situacao || parsed.desafio || '';
  if (!situacao && !parsed.conhecimentos && !parsed.metodologias_ativas) {
    throw new Error('A resposta do Gemini não continha a estrutura completa do PTD.');
  }

  return {
    situacao_aprendizagem: situacao,
    indicadores: parsed.indicadores || parsed.indicadores_trabalhados || '',
    ch_situacao: parsed.ch_situacao || parsed.carga_horaria_situacao || cargaHoraria,
    conhecimentos: parsed.conhecimentos || '',
    habilidades: parsed.habilidades || '',
    atitudes_valores: parsed.atitudes_valores || parsed.atitudes || '',
    metodologias_ativas: parsed.metodologias_ativas || '',
    acao_inicial: parsed.acao_inicial || '',
    reflexao: parsed.reflexao || '',
    acao_final: parsed.acao_final || '',
    proc_inicial: parsed.proc_inicial || '',
    proc_reflexao: parsed.proc_reflexao || '',
    proc_final: parsed.proc_final || '',
    instrumentos_avaliacao: parsed.instrumentos_avaliacao || '',
    marcas_formativas: parsed.marcas_formativas || '',
    materiais_tecnologicos: parsed.materiais_tecnologicos || '',
    referencias: parsed.referencias || ''
  };
}
