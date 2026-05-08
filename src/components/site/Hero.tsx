import { ArrowRight, Globe2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 pattern-african opacity-40 pointer-events-none" />
      <div className="container mx-auto px-4 sm:px-6 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center relative">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            <span className="text-muted-foreground">AI-powered learning, built for Africa</span>
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
            Learn smarter.
            <br />
            <span className="text-gradient">Build the future.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
            A multilingual AI tutor that bridges theory and practice — turning lessons into real-world skills for every African learner. From algebra to agriculture, from chemistry to careers.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="bg-gradient-hero text-primary-foreground border-0 shadow-warm hover:opacity-95 group">
              Start learning free
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </Button>
            <Button size="lg" variant="outline" className="glass border-primary/30">
              <Globe2 className="mr-2 h-4 w-4" />
              Try AI Tutor
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-glow-pulse" />
              English · Français · Kiswahili · Kirundi
            </div>
          </div>
        </div>

        <div className="relative animate-float">
          <div className="absolute -inset-4 bg-gradient-hero opacity-30 blur-3xl rounded-[3rem]" />
          <div className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-glow">
            <img
              src={heroImg}
              alt="African students collaborating with AI learning interface"
              width={1536}
              height={1024}
              className="w-full h-auto"
            />
          </div>

          <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 max-w-[220px] hidden sm:block">
            <div className="text-xs text-muted-foreground mb-1">AI Tutor</div>
            <div className="text-sm">"Let's break this equation into 3 simple steps..."</div>
          </div>
          <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 hidden sm:block">
            <div className="text-2xl font-bold text-gradient">+12k</div>
            <div className="text-xs text-muted-foreground">learners thriving</div>
          </div>
        </div>
      </div>
    </section>
  );
}
