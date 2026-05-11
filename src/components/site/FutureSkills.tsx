import { T } from "@/lib/auto-i18n";

const skills = [
  "AI Literacy", "Digital Literacy", "Coding", "Entrepreneurship",
  "Financial Literacy", "Communication", "Leadership", "Content Creation",
  "Branding", "Public Speaking", "Graphic Design", "Problem Solving",
  "Critical Thinking", "Productivity",
];

export function FutureSkills() {
  return (
    <section id="future-skills" className="container mx-auto px-4 sm:px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest"><T>Future Skills Center</T></div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          <T>Learn what school</T> <span className="text-gradient"><T>forgot to teach.</T></span>
        </h2>
        <p className="text-muted-foreground mt-4">
          <T>The skills that build careers, companies, and confidence in the AI era.</T>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        {skills.map((s) => (
          <div key={s} className="glass rounded-full px-4 py-2 text-sm hover:border-primary/50 transition cursor-default">
            <T>{s}</T>
          </div>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
        {[
          { t: "Math → Finance, AI, Engineering", d: "Numbers become startups, models, and bridges." },
          { t: "Art → Branding, Animation, Media", d: "Creativity becomes income and influence." },
          { t: "Writing → Storytelling, Marketing", d: "Words shape products and movements." },
          { t: "Science → Health, Agriculture, Climate", d: "Curiosity solves real African problems." },
        ].map((c) => (
          <div key={c.t} className="bg-gradient-card border border-border rounded-2xl p-6">
            <div className="font-semibold"><T>{c.t}</T></div>
            <p className="text-sm text-muted-foreground mt-2"><T>{c.d}</T></p>
          </div>
        ))}
      </div>
    </section>
  );
}
