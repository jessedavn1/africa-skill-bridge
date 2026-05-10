import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { generateProjectIdea, reviewProject } from "@/lib/talent.functions";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Lightbulb, Rocket, Sparkles, Eye, EyeOff } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/innovation")({
  head: () => ({ meta: [{ title: "Innovation Hub — AkiliAI" }, { name: "description", content: "Build, ship, and share student projects with an AI innovation mentor." }] }),
  component: InnovationPage,
});

type Project = {
  id: string; title: string; description: string | null; category: string | null;
  status: string; is_public: boolean; ai_feedback: string | null; user_id: string;
};

function InnovationPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const ideaFn = useServerFn(generateProjectIdea);
  const reviewFn = useServerFn(reviewProject);
  const { t, lang } = useI18n();

  const [projects, setProjects] = useState<Project[]>([]);
  const [publicProjects, setPublicProjects] = useState<Project[]>([]);
  const [interest, setInterest] = useState("");
  const [idea, setIdea] = useState<any>(null);
  const [working, setWorking] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [loading, user, navigate]);

  async function load() {
    if (!user) return;
    const { data: mine } = await supabase.from("innovation_projects").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    const { data: pub } = await supabase.from("innovation_projects").select("*").eq("is_public", true).neq("user_id", user.id).limit(12);
    setProjects(mine ?? []);
    setPublicProjects(pub ?? []);
  }
  useEffect(() => { load(); }, [user]);

  async function generate() {
    if (!interest.trim()) return;
    setWorking(true);
    try { setIdea(await ideaFn({ data: { interest, language: lang } })); }
    catch (e: any) { toast.error(e.message); }
    finally { setWorking(false); }
  }

  async function createProject() {
    if (!user || !title.trim()) return;
    const { data, error } = await supabase.from("innovation_projects").insert({
      user_id: user.id, title, description: desc, category: "tech", status: "idea",
    }).select().single();
    if (error) return toast.error(error.message);
    await supabase.from("talent_signals").insert({ user_id: user.id, category: "innovation", signal_type: "project_built", weight: 5 });
    setTitle(""); setDesc(""); toast.success(t("inno.created"));
    load();
  }

  async function aiReview(p: Project) {
    setWorking(true);
    try {
      const r = await reviewFn({ data: { title: p.title, description: p.description ?? "", language: lang } });
      await supabase.from("innovation_projects").update({ ai_feedback: r.content }).eq("id", p.id);
      load();
    } catch (e: any) { toast.error(e.message); } finally { setWorking(false); }
  }

  async function togglePublic(p: Project) {
    await supabase.from("innovation_projects").update({ is_public: !p.is_public }).eq("id", p.id);
    load();
  }

  if (loading || !user) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-10">
        <div className="flex justify-between items-end flex-wrap gap-3">
          <div>
            <div className="text-sm text-accent uppercase tracking-widest">{t("inno.title")}</div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">{t("inno.headline1")} <span className="text-gradient">{t("inno.headline2")}</span></h1>
          </div>
          <Link to="/dashboard"><Button variant="outline" className="glass">{t("inno.back")}</Button></Link>
        </div>

        <section className="glass rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2"><Lightbulb className="h-5 w-5 text-accent" /><h2 className="font-semibold">{t("inno.idea")}</h2></div>
          <div className="flex gap-2">
            <Input placeholder={t("inno.ideaPlaceholder")} value={interest} onChange={(e) => setInterest(e.target.value)} />
            <Button onClick={generate} disabled={working} className="bg-gradient-hero text-primary-foreground border-0">
              <Sparkles className="h-4 w-4 mr-2" /> {t("inno.spark")}
            </Button>
          </div>
          {idea && (
            <div className="bg-card border border-border rounded-2xl p-5 space-y-2">
              <div className="text-lg font-display font-bold text-gradient">{idea.title}</div>
              {idea.problem && <p className="text-sm"><b>{t("inno.problem")}:</b> {idea.problem}</p>}
              {idea.solution && <p className="text-sm"><b>{t("inno.solution")}:</b> {idea.solution}</p>}
              {Array.isArray(idea.tech_used) && <p className="text-sm"><b>{t("inno.tech")}:</b> {idea.tech_used.join(", ")}</p>}
              {Array.isArray(idea.first_steps) && (
                <ul className="text-sm list-disc pl-5">{idea.first_steps.map((s: string, i: number) => <li key={i}>{s}</li>)}</ul>
              )}
              {idea.impact && <p className="text-sm text-muted-foreground italic">{idea.impact}</p>}
            </div>
          )}
        </section>

        <section className="glass rounded-3xl p-6 space-y-4">
          <div className="flex items-center gap-2"><Rocket className="h-5 w-5 text-primary" /><h2 className="font-semibold">{t("inno.yours")}</h2></div>
          <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2">
            <Input placeholder={t("inno.projTitle")} value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder={t("inno.projDesc")} value={desc} onChange={(e) => setDesc(e.target.value)} />
            <Button onClick={createProject} className="bg-gradient-hero text-primary-foreground border-0">{t("inno.add")}</Button>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {projects.map((p) => (
              <div key={p.id} className="bg-card border border-border rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{p.title}</div>
                  <button onClick={() => togglePublic(p)} className="text-xs text-muted-foreground inline-flex items-center gap-1">
                    {p.is_public ? <><Eye className="h-3 w-3" /> {t("inno.public")}</> : <><EyeOff className="h-3 w-3" /> {t("inno.private")}</>}
                  </button>
                </div>
                <div className="text-sm text-muted-foreground">{p.description}</div>
                {p.ai_feedback && <div className="text-xs whitespace-pre-wrap bg-background/40 rounded-lg p-3 border border-border">{p.ai_feedback}</div>}
                <Button size="sm" variant="outline" onClick={() => aiReview(p)} disabled={working}>{t("inno.review")}</Button>
              </div>
            ))}
            {projects.length === 0 && <p className="text-sm text-muted-foreground">{t("inno.empty")}</p>}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="font-semibold">{t("inno.community")}</h2>
          <div className="grid md:grid-cols-3 gap-3">
            {publicProjects.map((p) => (
              <div key={p.id} className="glass rounded-2xl p-4">
                <div className="font-semibold">{p.title}</div>
                <div className="text-xs text-muted-foreground mt-1">{p.description}</div>
              </div>
            ))}
            {publicProjects.length === 0 && <p className="text-sm text-muted-foreground">{t("inno.communityEmpty")}</p>}
          </div>
        </section>
      </main>
    </div>
  );
}
