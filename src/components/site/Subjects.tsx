const subjects = [
  { name: "Mathematics", icon: "∑", tag: "Step-by-step solving" },
  { name: "Chemistry", icon: "⚗", tag: "Lab simulations" },
  { name: "Physics", icon: "⚛", tag: "Real-world models" },
  { name: "Biology", icon: "🧬", tag: "Visual learning" },
  { name: "Computer Science", icon: "{ }", tag: "Code & logic" },
  { name: "English", icon: "Aa", tag: "Speaking partner" },
  { name: "Français", icon: "Éé", tag: "Conversation" },
  { name: "Kiswahili", icon: "Sw", tag: "Mother tongue" },
];

export function Subjects() {
  return (
    <section id="subjects" className="container mx-auto px-4 sm:px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Subjects</div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          From <span className="text-gradient">algebra</span> to <span className="text-gradient">agriculture</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {subjects.map((s) => (
          <div
            key={s.name}
            className="group relative aspect-square rounded-2xl glass p-5 flex flex-col justify-between hover:border-primary/50 transition cursor-pointer overflow-hidden"
          >
            <div className="absolute -bottom-8 -right-8 text-[7rem] font-display font-bold text-primary/10 group-hover:text-primary/20 transition">
              {s.icon}
            </div>
            <div className="relative">
              <div className="text-xs text-muted-foreground">{s.tag}</div>
            </div>
            <div className="relative">
              <div className="font-display text-xl font-semibold">{s.name}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
