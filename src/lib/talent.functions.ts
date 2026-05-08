import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const CATEGORIES = [
  "art","music","leadership","entrepreneurship","storytelling","communication",
  "design","technology","innovation","programming","business","public_speaking",
  "writing","engineering","creativity","problem_solving",
] as const;

async function callAI(messages: any[], json = false) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY missing");
  const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages,
      ...(json ? { response_format: { type: "json_object" } } : {}),
    }),
  });
  if (res.status === 429) throw new Error("Rate limit reached.");
  if (res.status === 402) throw new Error("AI credits required.");
  if (!res.ok) throw new Error(`AI error: ${res.status}`);
  const j = await res.json();
  return j.choices?.[0]?.message?.content ?? "";
}

const analyzeSchema = z.object({
  signals: z.array(z.object({ category: z.string(), weight: z.number() })),
  language: z.string().default("English"),
  studentName: z.string().optional(),
});

export const analyzeTalents = createServerFn({ method: "POST" })
  .inputValidator((d) => analyzeSchema.parse(d))
  .handler(async ({ data }) => {
    const totals = new Map<string, number>();
    for (const s of data.signals) totals.set(s.category, (totals.get(s.category) ?? 0) + s.weight);
    const ranked = [...totals.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);

    const prompt = `You are an AI talent discovery coach for African students. Based on these engagement scores: ${JSON.stringify(ranked)} (categories from: ${CATEGORIES.join(", ")}). Identify the student's top 3 talents, 2 growth areas, and 4 future-fit career paths blending creativity + technology + Africa context. Respond in ${data.language}. Return STRICT JSON: {"summary":"...","top_talents":[{"category":"","score":0,"summary":""}],"growth_areas":[{"category":"","why":""}],"career_paths":[{"title":"","why":"","tech_link":""}]}`;

    const text = await callAI(
      [{ role: "system", content: "Output strictly valid JSON only." }, { role: "user", content: prompt }],
      true,
    );
    try { return JSON.parse(text); } catch { return { summary: text, top_talents: [], growth_areas: [], career_paths: [] }; }
  });

const ideaSchema = z.object({
  interest: z.string().min(2),
  language: z.string().default("English"),
});

export const generateProjectIdea = createServerFn({ method: "POST" })
  .inputValidator((d) => ideaSchema.parse(d))
  .handler(async ({ data }) => {
    const prompt = `Generate ONE innovative project idea for an African student passionate about: "${data.interest}". Tie it to a real local problem (agriculture, health, climate, education, commerce, culture). Show how technology amplifies the talent. Respond in ${data.language}. Return JSON: {"title":"","problem":"","solution":"","tech_used":["..."],"first_steps":["..."],"impact":""}`;
    const text = await callAI(
      [{ role: "system", content: "Output strictly valid JSON only." }, { role: "user", content: prompt }],
      true,
    );
    try { return JSON.parse(text); } catch { return { title: data.interest, problem: "", solution: text, tech_used: [], first_steps: [], impact: "" }; }
  });

const reviewSchema = z.object({
  title: z.string(),
  description: z.string(),
  language: z.string().default("English"),
});

export const reviewProject = createServerFn({ method: "POST" })
  .inputValidator((d) => reviewSchema.parse(d))
  .handler(async ({ data }) => {
    const prompt = `As an AI innovation mentor, review this student project. Title: "${data.title}". Description: "${data.description}". Reply in ${data.language}. Give: 3 strengths, 3 improvements, 1 next milestone, and a one-line motivational message. Use markdown.`;
    const content = await callAI([
      { role: "system", content: "You are a warm, encouraging African innovation coach." },
      { role: "user", content: prompt },
    ]);
    return { content };
  });
