import { FAQ_KNOWLEDGE_BASE } from "@/lib/faq-knowledge";

export const runtime = "nodejs";
export const maxDuration = 30;

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type RequestBody = {
  message?: string;
  history?: ChatMessage[];
};

const MODEL_CANDIDATES = [
  "gemini-flash-lite-latest",
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview",
];

async function callGemini(apiKey: string, model: string, prompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      systemInstruction: {
        parts: [{ text: FAQ_KNOWLEDGE_BASE }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 700,
      },
    }),
  });

  const data = (await response.json()) as {
    error?: { message?: string; status?: string };
    candidates?: Array<{
      content?: { parts?: Array<{ text?: string }> };
    }>;
  };

  if (!response.ok) {
    const err = new Error(data.error?.message || `Gemini error (${response.status})`);
    (err as Error & { status: number }).status = response.status;
    throw err;
  }

  const text = data.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();

  if (!text) {
    throw new Error("Empty response from Gemini");
  }

  return text;
}

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    return Response.json(
      { error: "Gemini API key is not configured on the server." },
      { status: 500 }
    );
  }

  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const message = body.message?.trim();
  if (!message) {
    return Response.json({ error: "Please enter a question." }, { status: 400 });
  }

  if (message.length > 1200) {
    return Response.json({ error: "Question is too long (max 1200 characters)." }, { status: 400 });
  }

  const history = (body.history || [])
    .slice(-6)
    .filter((item) => item.content && (item.role === "user" || item.role === "assistant"));

  const transcript = history
    .map((item) => `${item.role === "user" ? "Visitor" : "Steward"}: ${item.content}`)
    .join("\n");

  const prompt = `${transcript ? `Recent conversation:\n${transcript}\n\n` : ""}Visitor question: ${message}

Reply as the Sululta Steward in 2–5 short paragraphs or bullet points max. Offer one relevant next step (link path like /contact, /programs, /vacancy, /scholarship, /campus-locator) when helpful.`;

  let lastError: unknown;

  for (const model of MODEL_CANDIDATES) {
    try {
      const reply = await callGemini(apiKey, model, prompt);
      return Response.json({ reply, model });
    } catch (error) {
      lastError = error;
      const status = (error as { status?: number }).status;
      // Try next model on not-found / rate-limit / temporary unavailability
      if (status === 404 || status === 403 || status === 429 || status === 503) continue;
      break;
    }
  }

  console.error("[faq-agent]", lastError);
  return Response.json(
    {
      error:
        "The Steward could not reach Gemini right now. Please try again or contact admissions.",
    },
    { status: 502 }
  );
}
