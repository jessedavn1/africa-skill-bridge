import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useServerFn } from "@tanstack/react-start";
import { generateQuiz } from "@/lib/tutor.functions";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "Teacher tools — AkiliAI" },
      { name: "description", content: "AI quiz and lesson plan generators for African educators in 12 languages." },
    ],
  }),
  component: TeacherPage,
});

const LANGS = ["English", "Français", "Kiswahili", "Kinyarwanda", "Kirundi", "العربية", "Deutsch", "Español", "isiZulu", "Yorùbá", "Igbo", "Lingala"];

type Q = { q: string; options: string[]; answer: number; explanation: string };

function TeacherPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const gen = useServerFn(generateQuiz);

  const [topic, setTopic] = useState("Photosynthesis");
  const [level, setLevel] = useState("Secondary");
  const [language, setLanguage] = useState("English");
  const [count, setCount] = useState(5);
  const [questions, setQuestions] = useState<Q[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [loading, user, navigate]);

  async function run() {
    setBusy(true);
    try {
      const r = await gen({ data: { topic, level, language, count } });
      setQuestions(r.questions ?? []);
      if (!r.questions?.length) toast.message("AI returned no questions, try another topic.");
    } catch (e: any) {
      toast.error(e.message ?? "Failed");
    } finally { setBusy(false); }
  }

  if (loading || !user) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm text-accent uppercase tracking-widest">Teacher tools</div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Generate a quiz in seconds</h1>
          </div>
          <Link to="/dashboard"><Button variant="ghost">← Dashboard</Button></Link>
        </div>

        <div className="glass rounded-3xl p-6 grid md:grid-cols-4 gap-3">
          <div className="md:col-span-2">
            <Label>Topic</Label>
            <Input value={topic} onChange={(e) => setTopic(e.target.value)} />
          </div>
          <div>
            <Label>Level</Label>
            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{["Primary","Secondary","University"].map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{LANGS.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div>
            <Label>Questions</Label>
            <Input type="number" min={3} max={10} value={count} onChange={(e) => setCount(parseInt(e.target.value || "5"))} />
          </div>
          <div className="md:col-span-4">
            <Button onClick={run} disabled={busy} className="bg-gradient-hero text-primary-foreground border-0">
              <Sparkles className="h-4 w-4 mr-2" />
              {busy ? "Generating…" : "Generate quiz"}
            </Button>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="space-y-4">
            {questions.map((q, i) => (
              <div key={i} className="glass rounded-2xl p-5">
                <div className="font-semibold mb-3">{i + 1}. {q.q}</div>
                <ul className="space-y-2">
                  {q.options.map((o, j) => (
                    <li key={j} className={`text-sm rounded-lg px-3 py-2 border ${j === q.answer ? "border-accent bg-accent/10" : "border-border"}`}>
                      {String.fromCharCode(65 + j)}. {o}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-muted-foreground mt-3"><strong>Why:</strong> {q.explanation}</div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
