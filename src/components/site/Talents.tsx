import { Palette, Music, Megaphone, Rocket, BookOpen, Lightbulb, Code2, Mic, PenTool, Users, Wrench, Brain } from "lucide-react";

const talents = [
  { icon: Palette, label: "Art & Design" },
  { icon: Music, label: "Music" },
  { icon: Megaphone, label: "Leadership" },
  { icon: Rocket, label: "Entrepreneurship" },
  { icon: BookOpen, label: "Storytelling" },
  { icon: Lightbulb, label: "Innovation" },
  { icon: Code2, label: "Programming" },
  { icon: Mic, label: "Public Speaking" },
  { icon: PenTool, label: "Writing" },
  { icon: Users, label: "Communication" },
  { icon: Wrench, label: "Engineering" },
  { icon: Brain, label: "Problem Solving" },
];

export function Talents() {
  return (
    <section id="talents" className="container mx-auto px-4 sm:px-6 py-24">
      <div className="max-w-2xl mb-12">
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Talent Discovery</div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          Every learner has a <span className="text-gradient">unique gift.</span>
        </h2>
        <p className="text-muted-foreground mt-4 leading-relaxed">
          Our AI quietly observes how you learn, create, and engage — then reveals the talents you didn't know you had, and shows how technology can turn them into careers, businesses, and impact.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {talents.map((t) => (
          <div key={t.label} className="glass rounded-2xl p-5 text-center hover:border-primary/40 transition group">
            <div className="h-11 w-11 rounded-xl bg-gradient-hero grid place-items-center mx-auto mb-3 group-hover:scale-110 transition">
              <t.icon className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-sm font-medium">{t.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {[
          { t: "Memorization → Creativity", d: "Move from reciting facts to inventing solutions." },
          { t: "Theory → Innovation", d: "Apply every concept to real African problems." },
          { t: "Consumer → Creator", d: "Build, ship, and lead — not just scroll." },
        ].map((s) => (
          <div key={s.t} className="bg-gradient-card border border-border rounded-2xl p-6">
            <div className="text-lg font-semibold text-gradient">{s.t}</div>
            <p className="text-sm text-muted-foreground mt-2">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
