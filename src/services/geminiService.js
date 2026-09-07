// Serviço de Integração Opcional com Google Gemini

export async function generateWithGemini(promptText, apiKey) {
  if (!apiKey) {
    throw new Error('Chave da API do Google Gemini não informada.');
  }

  const models = [
    'gemini-1.5-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-1.5-pro'
  ];

  let lastError = null;
  for (const model of models) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [{ text: promptText }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(`[${model}] Erro ${res.status}: ${errJson.error?.message || res.statusText}`);
      }

      const json = await res.json();
      const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text.trim();
      }
      throw new Error('Formato de resposta inesperado do Gemini.');
    } catch (err) {
      console.warn(`Tentativa Gemini com ${model} falhou:`, err.message);
      lastError = err;
    }
  }

  throw lastError || new Error('Não foi possível se comunicar com o Google Gemini.');
}

export function cleanMarkdown(text) {
  if (!text) return '';
  return text.replace(/^```[a-z]*\n/i, '').replace(/\n```$/i, '').trim();
}

export function parseJsonSafely(str) {
  if (!str) return null;
  try {
    const cleaned = cleanMarkdown(str);
    return JSON.parse(cleaned);
  } catch {
    const match = str.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return JSON.parse(match[0]);
      } catch {}
    }
    return null;
  }
}
