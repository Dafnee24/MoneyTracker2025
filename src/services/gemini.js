// Gemini service wrapper
const API_KEY = 'AIzaSyAxvvInAlh9x7ZGYOiQpsgj5VPdGrbiQEs';
const MODEL = 'gemini-2.5-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

// Retry helpers to mitigate transient overload (503) or rate limits (429)
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);
const DEFAULT_TIMEOUT_MS = 15000;
const sleep = ms => new Promise(res => setTimeout(res, ms));

async function fetchWithRetry(url, options = {}, retries = 3, backoffMs = 800) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    const controller =
      typeof AbortController !== 'undefined' ? new AbortController() : null;
    const timeout = setTimeout(
      () => controller?.abort(),
      options.timeout || DEFAULT_TIMEOUT_MS,
    );
    try {
      const res = await fetch(url, {...options, signal: controller?.signal});
      clearTimeout(timeout);
      if (res.ok) {
        return res;
      }

      if (attempt < retries && RETRYABLE_STATUS.has(res.status)) {
        const jitter = Math.floor(Math.random() * 250);
        await sleep(backoffMs + jitter);
        backoffMs *= 2;
        continue;
      }

      const text = await res.text().catch(() => '');
      let friendly = `Gemini API error: ${res.status}`;
      try {
        const j = JSON.parse(text);
        const msg = j?.error?.message || j?.message;
        if (msg) {
          friendly += ` ${msg}`;
        }
        if (res.status === 503 || /overload|unavailable/i.test(msg || '')) {
          friendly = 'Model sedang sibuk (overloaded). Coba lagi sebentar.';
        }
      } catch (_) {
        if (res.status === 503) {
          friendly = 'Model sedang sibuk (overloaded). Coba lagi sebentar.';
        }
      }
      throw new Error(friendly);
    } catch (err) {
      clearTimeout(timeout);
      const isAbort = err?.name === 'AbortError';
      if (attempt < retries && (isAbort || !('status' in (err || {})))) {
        await sleep(backoffMs);
        backoffMs *= 2;
        continue;
      }
      if (isAbort) {
        throw new Error('Koneksi timeout. Coba lagi.');
      }
      throw err;
    }
  }
}

// prompt -> string balasan (<= 200 kata, markdown friendly)
export async function askGemini(prompt) {
  if (!API_KEY) {
    throw new Error(
      'GEMINI_API_KEY tidak ditemukan. Pastikan sudah menaruh di .env dan rebuild app.',
    );
  }

  const body = {
    contents: [
      {
        role: 'user',
        parts: [{text: prompt}],
      },
    ],
    systemInstruction: {
      role: 'system',
      parts: [
        {
          text:
            'You are an AI Healthy Care Assistant. ' +
            'Provide helpful, empathetic, and informative answers related to health, fitness, nutrition, and mental well-being. ' +
            'Always use simple and friendly language, suitable for general users. ' +
            'You are not a doctor, so you must remind users that your advice is not a medical diagnosis and they should consult a professional for serious conditions. ' +
            'Use concise Markdown when helpful and keep answers under ~200 words unless asked for longer.',
        },
      ],
    },
    generationConfig: {
      maxOutputTokens: 512,
      temperature: 0.7,
    },
  };

  const res = await fetchWithRetry(ENDPOINT, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(body),
  });
  // fetchWithRetry throws on non-OK after retries

  const data = await res.json();

  // Ambil teks dari kandidat pertama
  const candidate = data?.candidates?.[0];
  const parts = candidate?.content?.parts;
  let answer = parts
    ?.map(p => p.text)
    .join('\n')
    .trim();

  // Batasi 200 kata sebagai pengaman tambahan
  const limitWords = (text, max = 200) => {
    if (!text) {
      return text;
    }
    const words = text.split(/\s+/).filter(Boolean);
    if (words.length <= max) {
      return text;
    }
    return words.slice(0, max).join(' ') + '...';
  };

  answer = limitWords(answer, 200);
  return answer || '(Kosong)';
}
