import { Brain, Languages, FlaskConical, Compass, GraduationCap, Wifi } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Multilingual Tutor",
    desc: "Adaptive explanations in your language — step-by-step reasoning that builds critical thinking, not just answers.",
  },
  {
    icon: FlaskConical,
    title: "Theory → Practice",
    desc: "Every lesson links to real applications: business, agriculture, medicine, engineering. Learn it, use it.",
  },
  {
    icon: Languages,
    title: "Made for Africa",
    desc: "English, French, Swahili — and Kirundi NLP coming soon. Built for the languages we actually speak.",
  },
  {
    icon: Compass,
    title: "Career Guidance",
    desc: "AI maps your strengths to careers, certifications, and scholarships across the continent and beyond.",
  },
  {
    icon: GraduationCap,
    title: "Teacher Toolkit",
    desc: "Generate quizzes, lesson plans, and assignments in seconds. Track student progress with insight.",
  },
  {
    icon: Wifi,
    title: "Low-Bandwidth Ready",
    desc: "Optimized for 3G, mobile-first, with offline-ready architecture for rural and remote learners.",
  },
];

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 sm:px-6 py-24">
      <div className="max-w-2xl mb-16">
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest">Core capabilities</div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          A complete learning <span className="text-gradient">ecosystem</span>
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <div
            key={f.title}
            className="group relative bg-gradient-card rounded-2xl p-6 border border-border hover:border-primary/40 transition-all hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-5 rounded-2xl transition" />
            <div className="relative">
              <div className="h-12 w-12 rounded-xl glass grid place-items-center mb-5 group-hover:scale-110 transition">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
