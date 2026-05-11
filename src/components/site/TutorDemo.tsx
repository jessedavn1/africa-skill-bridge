import { Send, Sparkles, User } from "lucide-react";
import { T } from "@/lib/auto-i18n";

const messages = [
  { role: "user", text: "Explain photosynthesis like I'm 12, in Swahili." },
  { role: "ai", text: "Karibu! Photosynthesis ni jinsi mimea hutengeneza chakula chao kutoka jua, maji, na hewa (CO₂). Fikiria mti kama jiko la jua — majani ni 'sufuria', na klorofili ni 'mpishi' anayegeuza vitu hivi kuwa sukari." },
  { role: "user", text: "Give me a real-world example I can see today." },
  { role: "ai", text: "Angalia shamba la mahindi karibu nawe — mavuno makubwa hutegemea jua. Wakulima hupanda mahindi kuelekea jua ili kuongeza photosynthesis. Hivyo: jua zaidi → chakula zaidi → mavuno bora." },
];

export function TutorDemo() {
  return (
    <section id="tutor" className="container mx-auto px-4 sm:px-6 py-24">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="text-sm text-accent font-medium uppercase tracking-widest"><T>AI Tutor</T></div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold leading-tight">
            <T>A patient teacher,</T><br />
            <span className="text-gradient"><T>in your language</T></span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <T>Ask anything in English, French, or Swahili. Akili adapts to your level, encourages curiosity, and connects every concept to the world around you.</T>
          </p>
          <ul className="space-y-3 text-sm">
            {[
              "Step-by-step reasoning, not just answers",
              "Switches language mid-conversation",
              "Voice-ready (text-to-speech & speech-to-text)",
              "Encourages critical thinking & creativity",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="text-muted-foreground"><T>{item}</T></span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-hero opacity-20 blur-3xl rounded-[3rem]" />
          <div className="relative glass rounded-3xl p-6 space-y-4 shadow-glow">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
                {m.role === "ai" && (
                  <div className="h-8 w-8 rounded-lg bg-gradient-hero grid place-items-center shrink-0">
                    <Sparkles className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div className={`rounded-2xl px-4 py-3 text-sm max-w-[85%] ${
                  m.role === "user"
                    ? "bg-primary/15 text-foreground border border-primary/20"
                    : "bg-card border border-border"
                }`}>
                  {m.role === "user" ? <T>{m.text}</T> : m.text}
                </div>
                {m.role === "user" && (
                  <div className="h-8 w-8 rounded-lg bg-secondary grid place-items-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <input
                disabled
                placeholder="Ask Akili anything..."
                className="flex-1 bg-transparent text-sm outline-none px-2 py-2 placeholder:text-muted-foreground"
              />
              <button className="h-9 w-9 rounded-lg bg-gradient-hero grid place-items-center">
                <Send className="h-4 w-4 text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
