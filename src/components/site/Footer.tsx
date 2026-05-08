import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 mt-12">
      <div className="container mx-auto px-4 sm:px-6 py-12 grid md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-hero grid place-items-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">Akili<span className="text-gradient">AI</span></span>
          </div>
          <p className="text-sm text-muted-foreground mt-4 leading-relaxed">
            Multilingual AI learning, built in Africa, for Africa.
          </p>
        </div>

        {[
          { title: "Discover", items: ["Talents", "Innovation Hub", "Future Skills", "AI Tutor"] },
          { title: "For", items: ["Students", "Teachers", "Parents", "Schools"] },
          { title: "Languages", items: ["English · Français", "Kiswahili · Kinyarwanda", "Kirundi · Lingala", "Yorùbá · isiZulu · Igbo"] },
        ].map((col) => (
          <div key={col.title}>
            <div className="text-sm font-semibold mb-4">{col.title}</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {col.items.map((i) => <li key={i} className="hover:text-foreground transition cursor-pointer">{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/50 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} AkiliAI · Empowering African learners
      </div>
    </footer>
  );
}
