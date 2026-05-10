import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/site/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Heart, Trophy, BookOpen, Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/parent")({
  head: () => ({ meta: [{ title: "Parent Insights — AkiliAI" }, { name: "description", content: "Discover your child's natural talents and growth journey." }] }),
  component: ParentPage,
});

type Link = { id: string; student_id: string };
type Profile = { id: string; full_name: string | null };
type Progress = { subject: string; xp: number; lessons_completed: number; streak: number; user_id: string };
type Talent = { user_id: string; summary: string | null; top_talents: any; growth_areas: any; career_paths: any };

function ParentPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [links, setLinks] = useState<Link[]>([]);
  const [profiles, setProfiles] = useState<Record<string, Profile>>({});
  const [progress, setProgress] = useState<Progress[]>([]);
  const [talents, setTalents] = useState<Record<string, Talent>>({});
  const [studentId, setStudentId] = useState("");

  useEffect(() => { if (!loading && !user) navigate({ to: "/auth" }); }, [loading, user, navigate]);

  async function load() {
    if (!user) return;
    const { data: l } = await supabase.from("parent_links").select("*").eq("parent_id", user.id);
    const list = (l ?? []) as Link[];
    setLinks(list);
    if (list.length) {
      const ids = list.map((x) => x.student_id);
      const [{ data: pr }, { data: tp }, { data: pf }] = await Promise.all([
        supabase.from("progress").select("*").in("user_id", ids),
        supabase.from("talent_profiles").select("*").in("user_id", ids),
        supabase.from("profiles").select("id,full_name").in("id", ids),
      ]);
      setProgress((pr ?? []) as Progress[]);
      const tm: Record<string, Talent> = {};
      for (const t of (tp ?? []) as Talent[]) tm[t.user_id] = t;
      setTalents(tm);
      const pm: Record<string, Profile> = {};
      for (const p of (pf ?? []) as Profile[]) pm[p.id] = p;
      setProfiles(pm);
    }
  }
  useEffect(() => { load(); }, [user]);

  async function linkStudent() {
    if (!user || !studentId.trim()) return;
    const { error } = await supabase.from("parent_links").insert({ parent_id: user.id, student_id: studentId.trim() });
    if (error) return toast.error(error.message);
    setStudentId(""); toast.success("Student linked");
    load();
  }

  if (loading || !user) return <div className="min-h-screen grid place-items-center text-muted-foreground">Loading…</div>;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-10 space-y-8">
        <div>
          <div className="text-sm text-accent uppercase tracking-widest">Parent insights</div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold">What is your child <span className="text-gradient">naturally gifted at?</span></h1>
        </div>

        <div className="glass rounded-3xl p-6 space-y-3">
          <div className="text-sm font-semibold flex items-center gap-2"><Heart className="h-4 w-4 text-accent" /> Link a student</div>
          <p className="text-xs text-muted-foreground">Ask your child to share their AkiliAI account ID (visible in their dashboard URL or profile).</p>
          <div className="flex gap-2">
            <Input placeholder="Student account ID (UUID)" value={studentId} onChange={(e) => setStudentId(e.target.value)} />
            <Button onClick={linkStudent} className="bg-gradient-hero text-primary-foreground border-0">Link</Button>
          </div>
        </div>

        {links.length === 0 ? (
          <p className="text-muted-foreground">No students linked yet.</p>
        ) : (
          <div className="space-y-6">
            {links.map((l) => {
              const t = talents[l.student_id];
              const studentProgress = progress.filter((p) => p.user_id === l.student_id);
              const xp = studentProgress.reduce((a, p) => a + p.xp, 0);
              const lessons = studentProgress.reduce((a, p) => a + p.lessons_completed, 0);
              const name = profiles[l.student_id]?.full_name ?? l.student_id.slice(0, 8);
              return (
                <div key={l.id} className="glass rounded-3xl p-6 space-y-4">
                  <div className="flex items-end justify-between flex-wrap gap-2">
                    <h2 className="font-display text-2xl font-bold">{name}</h2>
                    <div className="flex gap-3 text-sm">
                      <span className="inline-flex items-center gap-1"><Trophy className="h-4 w-4 text-accent" /> {xp} XP</span>
                      <span className="inline-flex items-center gap-1"><BookOpen className="h-4 w-4 text-primary" /> {lessons} lessons</span>
                    </div>
                  </div>

                  {t?.summary ? (
                    <div className="space-y-3">
                      <div className="text-sm text-muted-foreground italic">{t.summary}</div>
                      <div className="grid md:grid-cols-3 gap-3">
                        <Card title="Top talents" items={t.top_talents} render={(x: any) => `${x.category} — ${x.summary ?? ""}`} />
                        <Card title="Growth areas" items={t.growth_areas} render={(x: any) => `${x.category}: ${x.why ?? ""}`} />
                        <Card title="Career paths" items={t.career_paths} render={(x: any) => `${x.title} — ${x.tech_link ?? ""}`} />
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground inline-flex items-center gap-2"><Sparkles className="h-4 w-4" /> Talent profile builds as your child engages with the platform.</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

function Card({ title, items, render }: { title: string; items: any; render: (x: any) => string }) {
  const arr = Array.isArray(items) ? items : [];
  return (
    <div className="bg-card border border-border rounded-2xl p-4">
      <div className="text-xs uppercase tracking-widest text-accent mb-2">{title}</div>
      <ul className="text-sm space-y-1">
        {arr.length === 0 && <li className="text-muted-foreground">—</li>}
        {arr.map((x, i) => <li key={i}>{render(x)}</li>)}
      </ul>
    </div>
  );
}
