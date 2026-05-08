import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Talents } from "@/components/site/Talents";
import { Innovation } from "@/components/site/Innovation";
import { FutureSkills } from "@/components/site/FutureSkills";
import { Features } from "@/components/site/Features";
import { Subjects } from "@/components/site/Subjects";
import { Languages } from "@/components/site/Languages";
import { TutorDemo } from "@/components/site/TutorDemo";
import { Mission } from "@/components/site/Mission";
import { Testimonials } from "@/components/site/Testimonials";
import { CTA } from "@/components/site/CTA";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AkiliAI — Talent Discovery & Innovation for African Students" },
      { name: "description", content: "AI-powered talent discovery, innovation hub, and future-skills platform for African learners. From memorization to creation, theory to startups, in 12 languages." },
      { property: "og:title", content: "AkiliAI — Discover Your Gift. Build the Future." },
      { property: "og:description", content: "AI tutor, talent discovery, innovation challenges, and future-ready skills — built for every African learner." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Talents />
        <Innovation />
        <FutureSkills />
        <Features />
        <Subjects />
        <Languages />
        <TutorDemo />
        <Mission />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
