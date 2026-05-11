import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  texts: z.array(z.string()).min(1).max(80),
  language: z.string().min(2),
});

export const translateBatch = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    if (data.language === "English") return { translations: data.texts };
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const prompt = `Translate the following UI strings from English into ${data.language}.
- Preserve meaning, tone, brevity and any punctuation/emoji.
- Keep brand name "AkiliAI" untranslated.
- Do NOT translate proper nouns or code-like tokens.
- Return ONLY a JSON array of strings in the SAME ORDER as the input. No extra keys.

Input JSON:
${JSON.stringify(data.texts)}`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          { role: "system", content: "You output strictly valid JSON arrays of strings." },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (res.status === 429) throw new Error("Rate limit reached.");
    if (res.status === 402) throw new Error("AI credits required.");
    if (!res.ok) throw new Error(`AI error: ${res.status}`);
    const json = await res.json();
    const text: string = json.choices?.[0]?.message?.content ?? "[]";
    const cleaned = text.replace(/```json|```/g, "").trim();
    let parsed: unknown;
    try { parsed = JSON.parse(cleaned); } catch { parsed = data.texts; }
    const arr = Array.isArray(parsed) ? parsed : data.texts;
    const translations = data.texts.map((src, i) =>
      typeof arr[i] === "string" && arr[i].trim() ? (arr[i] as string) : src
    );
    return { translations };
  });
