import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-hero p-10 sm:p-16 text-center">
        <div className="absolute inset-0 pattern-african opacity-20" />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight">
            Ready to learn what truly matters?
          </h2>
          <p className="text-primary-foreground/80 mt-4 text-lg">
            Join thousands of African learners building practical skills with AI.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button size="lg" className="bg-background text-foreground hover:bg-background/90 border-0 group">
              Create free account
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              For teachers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
