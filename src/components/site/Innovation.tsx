import { Rocket, Users, Trophy, Lightbulb } from "lucide-react";

export function Innovation() {
  return (
    <section id="innovation" className="relative overflow-hidden">
      <div className="absolute inset-0 pattern-african opacity-20 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Innovation Hub</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
              From idea to <span className="text-gradient">launched startup.</span>
            </h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              A creator space where students prototype, share, and ship real projects — coached by an AI mentor that turns talent into traction.
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              {[
                { i: Lightbulb, t: "AI Idea Generator", d: "Spark startup ideas from your interests" },
                { i: Rocket, t: "Build sprints", d: "Step-by-step project guidance" },
                { i: Users, t: "Creator collabs", d: "Team up with other African builders" },
                { i: Trophy, t: "Innovation challenges", d: "Hackathons, prizes, recognition" },
              ].map((c) => (
                <div key={c.t} className="glass rounded-2xl p-4 flex gap-3">
                  <div className="h-10 w-10 rounded-lg bg-gradient-hero grid place-items-center shrink-0">
                    <c.i className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{c.t}</div>
                    <div className="text-xs text-muted-foreground">{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6 space-y-4">
            <div className="text-xs uppercase tracking-widest text-accent">Live challenge</div>
            <div className="text-2xl font-display font-bold">Build something that helps your village.</div>
            <p className="text-sm text-muted-foreground">Open to all African students. Submit a prototype, idea, or story. AI judges, community votes.</p>
            <div className="flex items-center gap-3 pt-2">
              <div className="flex -space-x-2">
                {["#0fb4a8","#e6a83a","#d96a3a"].map((c) => (
                  <div key={c} className="h-8 w-8 rounded-full border-2 border-background" style={{ background: c }} />
                ))}
              </div>
              <div className="text-xs text-muted-foreground">324 builders joined this week</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
