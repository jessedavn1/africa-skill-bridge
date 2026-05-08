import { Link } from "@tanstack/react-router";
import { Sparkles, Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { label: "Features", href: "#features" },
  { label: "Subjects", href: "#subjects" },
  { label: "AI Tutor", href: "#tutor" },
  { label: "Mission", href: "#mission" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/40 blur-md rounded-full group-hover:bg-primary/70 transition" />
            <div className="relative h-9 w-9 rounded-xl bg-gradient-hero grid place-items-center">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            Akili<span className="text-gradient">AI</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90 border-0 shadow-warm">
            Start learning
          </Button>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden p-2" aria-label="Menu">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/50 px-4 py-4 space-y-3 bg-background/95">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block text-sm text-muted-foreground">
              {n.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2">
            <Button variant="ghost" size="sm" className="flex-1">Sign in</Button>
            <Button size="sm" className="flex-1 bg-gradient-hero text-primary-foreground border-0">Start</Button>
          </div>
        </div>
      )}
    </header>
  );
}
