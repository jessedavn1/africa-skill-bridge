import { T } from "@/lib/auto-i18n";

const items = [
  {
    name: "Aïcha M.",
    role: "Lycéenne, Dakar",
    quote: "Akili m'explique les maths en français comme un grand frère patient. J'ai enfin compris les fonctions !",
  },
  {
    name: "Daniel O.",
    role: "University student, Nairobi",
    quote: "The career roadmap showed me data science fits my strengths — and gave me free certifications to start.",
  },
  {
    name: "Mr. Niyongabo",
    role: "Teacher, Bujumbura",
    quote: "I generate a week of lesson plans in 10 minutes. My students now see how chemistry applies to farming.",
  },
];

export function Testimonials() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-24">
      <div className="text-center mb-16">
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest"><T>Voices</T></div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          <T>Loved across the</T> <span className="text-gradient"><T>continent</T></span>
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {items.map((t) => (
          <figure key={t.name} className="bg-gradient-card rounded-2xl p-6 border border-border">
            <blockquote className="text-foreground/90 leading-relaxed">"<T>{t.quote}</T>"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-hero grid place-items-center font-semibold text-primary-foreground">
                {t.name[0]}
              </div>
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-muted-foreground"><T>{t.role}</T></div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
