import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { askTutor } from "@/lib/tutor.functions";
import { analyzeTalents } from "@/lib/talent.functions";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Send, User, Flame, Trophy, BookOpen, LogOut, Lightbulb, Rocket, Award } from "lucide-react";
import { toast } from "sonner";
import { useI18n, LANGUAGES, type LangCode } from "@/lib/i18n";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — AkiliAI" },
      { name: "description", content: "Your personalized AkiliAI learning dashboard with AI tutor, progress, and goals." },
    ],
  }),
  component: Dashboard,
});

const SUBJECTS = ["Mathematics", "Chemistry", "Physics", "Biology", "Computer Science", "Languages", "Career"];

type Msg = { role: "user" | "assistant"; content: string };

function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const ask = useServerFn(askTutor);
  const { t, lang, setLang } = useI18n();

  const [subject, setSubject] = useState("Mathematics");
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: t("dash.tutor.greeting") },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState<{ subject: string; xp: number; lessons_completed: number; streak: number }[]>([]);
  const [talentProfile, setTalentProfile] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const analyze = useServerFn(analyzeTalents);

  // Re-greet on language change (only if conversation hasn't started)
  useEffect(() => {
    setMessages((m) => (m.length === 1 && m[0].role === "assistant" ? [{ role: "assistant", content: t("dash.tutor.greeting") }] : m));
  }, [lang]);


  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("progress").select("subject,xp,lessons_completed,streak").then(({ data }) => {
      setProgress(data ?? []);
    });
    supabase.from("talent_profiles").select("*").eq("user_id", user.id).maybeSingle().then(({ data }) => {
      setTalentProfile(data);
    });
  }, [user]);

  function subjectToCategory(s: string): string {
    const m: Record<string, string> = {
      Mathematics: "problem_solving", Chemistry: "innovation", Physics: "engineering",
      Biology: "innovation", "Computer Science": "programming", Languages: "communication", Career: "entrepreneurship",
    };
    return m[s] ?? "creativity";
  }

  async function runAnalysis() {
    if (!user) return;
    setAnalyzing(true);
    try {
      const { data: signals } = await supabase.from("talent_signals").select("category,weight").eq("user_id", user.id);
      const result = await analyze({ data: { signals: signals ?? [], language: lang } });
      await supabase.from("talent_profiles").upsert({
        user_id: user.id,
        summary: result.summary ?? null,
        top_talents: result.top_talents ?? [],
        growth_areas: result.growth_areas ?? [],
        career_paths: result.career_paths ?? [],
      }, { onConflict: "user_id" });
      const { data } = await supabase.from("talent_profiles").select("*").eq("user_id", user.id).maybeSingle();
      setTalentProfile(data);
      toast.success(t("dash.talents.updated"));
    } catch (e: any) { toast.error(e.message); } finally { setAnalyzing(false); }
  }

  async function send() {
    if (!input.trim() || sending) return;
    const next: Msg[] = [...messages, { role: "user", content: input }];
    setMessages(next);
    setInput("");
    setSending(true);
    try {
      const r = await ask({ data: { messages: next, language: lang, subject } });
      setMessages([...next, { role: "assistant", content: r.content }]);
      // bump xp
      if (user) {
        const existing = progress.find((p) => p.subject === subject);
        const xp = (existing?.xp ?? 0) + 10;
        const lessons = (existing?.lessons_completed ?? 0) + 1;
        await supabase.from("progress").upsert({
          user_id: user.id, subject, xp, lessons_completed: lessons,
          streak: existing?.streak ?? 1,
        }, { onConflict: "user_id,subject" });
        const { data } = await supabase.from("progress").select("subject,xp,lessons_completed,streak");
        setProgress(data ?? []);
        await supabase.from("talent_signals").insert({
          user_id: user.id, category: subjectToCategory(subject), signal_type: "tutor_question", weight: 2,
        });
      }
    } catch (e: any) {
      toast.error(e.message ?? "Failed to reach AI tutor");
    } finally { setSending(false); }
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  }

  const totalXp = progress.reduce((a, p) => a + p.xp, 0);
  const totalLessons = progress.reduce((a, p) => a + p.lessons_completed, 0);
  const maxStreak = progress.reduce((a, p) => Math.max(a, p.streak), 0);

  if (loading || !user) {
    return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="text-sm text-accent uppercase tracking-widest">{t("dash.title")}</div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{t("dash.welcome")}, {user.email?.split("@")[0]} 👋</h1>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Link to="/innovation"><Button variant="outline" className="glass border-primary/30"><Rocket className="h-4 w-4 mr-2" />{t("dash.innovationHub")}</Button></Link>
            <Link to="/teacher"><Button variant="outline" className="glass border-primary/30">{t("dash.teacher")}</Button></Link>
            <Link to="/parent"><Button variant="outline" className="glass border-primary/30">{t("dash.parent")}</Button></Link>
            <Button variant="ghost" onClick={signOut}><LogOut className="h-4 w-4 mr-2" />{t("dash.signout")}</Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <StatCard icon={<Trophy className="h-5 w-5 text-accent" />} label={t("dash.totalXp")} value={totalXp} />
          <StatCard icon={<BookOpen className="h-5 w-5 text-primary" />} label={t("dash.lessons")} value={totalLessons} />
          <StatCard icon={<Flame className="h-5 w-5" style={{ color: "var(--sunset)" }} />} label={t("dash.streak")} value={maxStreak} />
        </div>

        <Tabs defaultValue="tutor" className="w-full">
          <TabsList>
            <TabsTrigger value="tutor">{t("dash.tab.tutor")}</TabsTrigger>
            <TabsTrigger value="talents">{t("dash.tab.talents")}</TabsTrigger>
            <TabsTrigger value="progress">{t("dash.tab.progress")}</TabsTrigger>
            <TabsTrigger value="goals">{t("dash.tab.goals")}</TabsTrigger>
          </TabsList>

          <TabsContent value="tutor">
            <div className="glass rounded-3xl p-6 space-y-4">
              <div className="flex flex-wrap gap-3">
                <Select value={lang} onValueChange={(v) => setLang(v as LangCode)}>
                  <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                  <SelectContent>{LANGUAGES.map((l) => <SelectItem key={l.code} value={l.code}>{l.flag} {l.label}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
                  <SelectContent>{SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>

              <div className="space-y-3 max-h-[480px] overflow-y-auto pr-2">
                {messages.map((m, i) => (
                  <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                    {m.role === "assistant" && (
                      <div className="h-8 w-8 rounded-lg bg-gradient-hero grid place-items-center shrink-0">
                        <Sparkles className="h-4 w-4 text-primary-foreground" />
                      </div>
                    )}
                    <div className={`rounded-2xl px-4 py-3 text-sm max-w-[85%] whitespace-pre-wrap ${m.role === "user" ? "bg-primary/15 border border-primary/20" : "bg-card border border-border"}`}>
                      {m.content}
                    </div>
                    {m.role === "user" && (
                      <div className="h-8 w-8 rounded-lg bg-secondary grid place-items-center shrink-0">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                {sending && <div className="text-xs text-muted-foreground">{t("dash.tutor.thinking")}</div>}
              </div>

              <form onSubmit={(e) => { e.preventDefault(); send(); }} className="flex items-center gap-2 pt-2 border-t border-border">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={`${t("dash.tutor.placeholder")} ${lang}…`}
                  className="border-0 bg-transparent focus-visible:ring-0"
                />
                <Button type="submit" disabled={sending} className="bg-gradient-hero text-primary-foreground border-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </TabsContent>

          <TabsContent value="talents">
            <div className="glass rounded-3xl p-6 space-y-5">
              <div className="flex items-end justify-between flex-wrap gap-3">
                <div>
                  <h3 className="font-display text-xl font-bold">Your AI talent profile</h3>
                  <p className="text-xs text-muted-foreground">Built from how you learn, ask, and create. Re-analyze any time.</p>
                  <p className="text-[10px] text-muted-foreground mt-1">Account ID (share with parent): <span className="font-mono">{user.id}</span></p>
                </div>
                <Button onClick={runAnalysis} disabled={analyzing} className="bg-gradient-hero text-primary-foreground border-0">
                  <Sparkles className="h-4 w-4 mr-2" />{analyzing ? "Analyzing…" : "Analyze my talents"}
                </Button>
              </div>

              {!talentProfile && <p className="text-sm text-muted-foreground inline-flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Engage with the tutor and Innovation Hub, then run analysis.</p>}

              {talentProfile && (
                <div className="space-y-4">
                  {talentProfile.summary && <p className="italic text-muted-foreground">{talentProfile.summary}</p>}
                  <div className="grid md:grid-cols-3 gap-3">
                    <TalentCard icon={<Award className="h-4 w-4" />} title="Top talents" items={talentProfile.top_talents} render={(x: any) => <><b>{x.category}</b> — {x.summary}</>} />
                    <TalentCard icon={<Lightbulb className="h-4 w-4" />} title="Growth areas" items={talentProfile.growth_areas} render={(x: any) => <><b>{x.category}</b>: {x.why}</>} />
                    <TalentCard icon={<Rocket className="h-4 w-4" />} title="Future careers" items={talentProfile.career_paths} render={(x: any) => <><b>{x.title}</b> — {x.tech_link}</>} />
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="progress">
            <div className="glass rounded-3xl p-6">
              {progress.length === 0 ? (
                <p className="text-muted-foreground">No progress yet — chat with the tutor to start earning XP.</p>
              ) : (
                <div className="grid sm:grid-cols-2 gap-3">
                  {progress.map((p) => (
                    <div key={p.subject} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{p.subject}</div>
                        <div className="text-xs text-muted-foreground">{p.lessons_completed} lessons</div>
                      </div>
                      <div className="text-2xl font-display font-bold text-gradient">{p.xp} XP</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="glass rounded-3xl p-6 space-y-3">
              {["Complete 1 tutor session", "Practice for 15 minutes", "Review yesterday's lesson"].map((g) => (
                <div key={g} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
                  <span className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-sm">{g}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="glass rounded-2xl p-5 flex items-center gap-4">
      <div className="h-11 w-11 rounded-xl bg-card grid place-items-center">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-2xl font-display font-bold">{value}</div>
      </div>
    </div>
  );
}

function TalentCard({ icon, title, items, render }: { icon: React.ReactNode; title: string; items: any; render: (x: any) => React.ReactNode }) {
  const arr = Array.isArray(items) ? items : [];
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="text-xs uppercase tracking-widest text-accent mb-2 inline-flex items-center gap-2">{icon}{title}</div>
      <ul className="text-sm space-y-1">
        {arr.length === 0 && <li className="text-muted-foreground">—</li>}
        {arr.map((x, i) => <li key={i}>{render(x)}</li>)}
      </ul>
    </div>
  );
}
