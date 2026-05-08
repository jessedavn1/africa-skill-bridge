export function Mission() {
  return (
    <section id="mission" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      <div className="absolute inset-0 pattern-african opacity-30" />
      <div className="container mx-auto px-4 sm:px-6 py-32 relative text-center">
        <div className="text-sm text-accent font-medium mb-4 uppercase tracking-widest">Our mission</div>
        <h2 className="font-display text-4xl sm:text-6xl font-bold max-w-4xl mx-auto leading-[1.1]">
          Empowering the next generation of African
          <span className="text-gradient"> problem solvers.</span>
        </h2>
        <p className="text-lg text-muted-foreground mt-8 max-w-2xl mx-auto">
          We believe education must do more than transfer knowledge — it must build the curiosity, creativity, and practical skill needed to solve real African challenges. Akili is that bridge.
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
              <div className="text-xs text-muted-foreground mt-2">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
