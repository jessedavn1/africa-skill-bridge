import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

const subjects = [
  { name: "Mathematics", key: "Mathematics", icon: "∑", tag: "Step-by-step solving" },
  { name: "Chemistry", key: "Chemistry", icon: "⚗", tag: "Lab simulations" },
  { name: "Physics", key: "Physics", icon: "⚛", tag: "Real-world models" },
  { name: "Biology", key: "Biology", icon: "🧬", tag: "Visual learning" },
  { name: "Computer Science", key: "Computer Science", icon: "{ }", tag: "Code & logic" },
  { name: "English", key: "Languages", icon: "Aa", tag: "Speaking partner" },
  { name: "Français", key: "Languages", icon: "Éé", tag: "Conversation" },
  { name: "Kiswahili", key: "Languages", icon: "Sw", tag: "Mother tongue" },
];

export function Subjects() {
  return (
    <section id="subjects" className="container mx-auto px-4 sm:px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Subjects · AI Tutor</div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          From <span className="text-gradient">zero</span> to <span className="text-gradient">hero</span>
        </h2>
        <p className="text-muted-foreground mt-4">Every subject has its own AI tutor that teaches you step-by-step — at your pace, in your language.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((s) => (
          <Link
            key={s.name}
            to="/dashboard"
            search={{ subject: s.key }}
            className="group relative aspect-square rounded-2xl glass p-5 flex flex-col justify-between hover:border-primary/50 transition cursor-pointer overflow-hidden"
          >
            <div className="absolute -bottom-8 -right-8 text-[7rem] font-display font-bold text-primary/10 group-hover:text-primary/20 transition">
              {s.icon}
            </div>
            <div className="relative flex items-center justify-between">
              <div className="text-xs text-muted-foreground">{s.tag}</div>
              <Sparkles className="h-3.5 w-3.5 text-accent opacity-0 group-hover:opacity-100 transition" />
            </div>
            <div className="relative">
              <div className="font-display text-xl font-semibold">{s.name}</div>
              <div className="text-[11px] text-accent mt-1 opacity-0 group-hover:opacity-100 transition">Start with AI tutor →</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
