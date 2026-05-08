import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
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
      { title: "AkiliAI — Multilingual AI Learning for Africa" },
      { name: "description", content: "AI-powered multilingual education platform bridging theory and practice for African learners. Learn math, science, and languages in English, French, Swahili, and Kirundi." },
      { property: "og:title", content: "AkiliAI — Multilingual AI Learning for Africa" },
      { property: "og:description", content: "AI tutoring, practical projects, and career guidance for every African learner." },
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
