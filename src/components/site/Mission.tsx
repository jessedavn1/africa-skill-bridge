import { T } from "@/lib/auto-i18n";

export function Mission() {
  return (
    <section id="mission" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0 pattern-african opacity-30" />
      <div className="container mx-auto px-4 sm:px-6 py-32 relative text-center">
        <div className="text-sm text-accent font-medium mb-4 uppercase tracking-widest"><T>Our mission</T></div>
        <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-4xl mx-auto leading-[1.1]">
          <T>Empowering the next generation of African</T>
          <span className="text-gradient"> <T>problem solvers.</T></span>
        </h2>
        <p className="text-lg text-muted-foreground mt-8 max-w-2xl mx-auto">
          <T>We believe education must do more than transfer knowledge — it must build the curiosity, creativity, and practical skill needed to solve real African challenges. Akili is that bridge.</T>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { v: "4+", l: "Languages supported" },
            { v: "8", l: "Core subjects" },
            { v: "100%", l: "Mobile-first" },
            { v: "AI", l: "Powered tutoring" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-2xl p-6">
              <div className="text-3xl sm:text-4xl font-display font-bold text-gradient">{s.v}</div>
              <div className="text-xs text-muted-foreground mt-2"><T>{s.l}</T></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
