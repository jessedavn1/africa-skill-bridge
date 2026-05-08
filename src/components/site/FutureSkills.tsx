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
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Future Skills Center</div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          Learn what school <span className="text-gradient">forgot to teach.</span>
        </h2>
        <p className="text-muted-foreground mt-4">
          The skills that build careers, companies, and confidence in the AI era.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
        {skills.map((s) => (
          <div key={s} className="glass rounded-full px-4 py-2 text-sm hover:border-primary/50 transition cursor-default">
            {s}
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
            <div className="font-semibold">{c.t}</div>
            <p className="text-sm text-muted-foreground mt-2">{c.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
