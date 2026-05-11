import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant", "system"]),
    content: z.string(),
  })),
  language: z.string().default("English"),
  subject: z.string().optional(),
});

export const askTutor = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const system = `You are Akili, a patient multilingual AI tutor for African learners specialized in ${data.subject ?? "general learning"}. Your mission: take the student from ZERO to HERO in this subject.

Rules:
- Respond in ${data.language}.
- First, briefly assess the student's current level by asking 1 short question (only if unknown).
- Teach in small, clear steps. After each concept, give a tiny example, then ask one check-for-understanding question before moving on.
- Use real-world African contexts (agriculture, markets, mobile money, daily life).
- Build a progressive learning path: fundamentals → core concepts → applications → mastery challenges.
- Celebrate progress, encourage curiosity, and never shame mistakes.
- Keep messages concise and use bullet points or numbered steps when helpful.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: system }, ...data.messages],
      }),
    });

    if (res.status === 429) throw new Error("Rate limit reached. Please try again shortly.");
    if (res.status === 402) throw new Error("AI credits required. Please add credits in your workspace.");
    if (!res.ok) throw new Error(`AI error: ${res.status}`);

    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "";
    return { content };
  });

const quizSchema = z.object({
  topic: z.string().min(2),
  level: z.string().default("Secondary"),
  language: z.string().default("English"),
  count: z.number().int().min(3).max(10).default(5),
});

export const generateQuiz = createServerFn({ method: "POST" })
  .inputValidator((data) => quizSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY missing");

    const prompt = `Generate ${data.count} multiple-choice questions in ${data.language} for ${data.level} students on the topic: "${data.topic}". Tie examples to African contexts when possible. Return ONLY valid JSON of the form {"questions":[{"q":"...","options":["A","B","C","D"],"answer":0,"explanation":"..."}]}.`;

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: "You output strictly valid JSON." },
          { role: "user", content: prompt },
        ],
      }),
    });
    if (res.status === 429) throw new Error("Rate limit reached.");
    if (res.status === 402) throw new Error("AI credits required.");
    if (!res.ok) throw new Error(`AI error: ${res.status}`);
    const json = await res.json();
    const text: string = json.choices?.[0]?.message?.content ?? "{}";
    const cleaned = text.replace(/```json|```/g, "").trim();
    try { return JSON.parse(cleaned); } catch { return { questions: [], raw: text }; }
  });
