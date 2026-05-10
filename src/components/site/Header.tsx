import { Link } from "@tanstack/react-router";
import { Sparkles, Menu, Globe } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useI18n, LANGUAGES, type LangCode } from "@/lib/i18n";

export function Header() {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useI18n();

  const nav = [
    { label: t("nav.talents"), href: "#talents" },
    { label: t("nav.innovation"), href: "#innovation" },
    { label: t("nav.future"), href: "#future-skills" },
    { label: t("nav.languages"), href: "#languages" },
    { label: t("nav.tutor"), href: "#tutor" },
  ];

  const LangPicker = (
    <Select value={lang} onValueChange={(v) => setLang(v as LangCode)}>
      <SelectTrigger className="h-9 w-[150px] glass border-border/60" aria-label={t("nav.language")}>
        <Globe className="h-4 w-4 mr-1 opacity-70" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {LANGUAGES.map((l) => (
          <SelectItem key={l.code} value={l.code}>
            <span className="mr-2">{l.flag}</span>{l.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/60 border-b border-border/50">
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-4 gap-3">
        <Link to="/" className="flex items-center gap-2 group shrink-0">
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

        <nav className="hidden lg:flex items-center gap-6">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          {LangPicker}
          <Link to="/auth"><Button variant="ghost" size="sm">{t("nav.signin")}</Button></Link>
          <Link to="/dashboard">
            <Button size="sm" className="bg-gradient-hero text-primary-foreground hover:opacity-90 border-0 shadow-warm">
              {t("nav.start")}
            </Button>
          </Link>
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
          <div>{LangPicker}</div>
          <div className="flex gap-2 pt-2">
            <Link to="/auth" className="flex-1"><Button variant="ghost" size="sm" className="w-full">{t("nav.signin")}</Button></Link>
            <Link to="/dashboard" className="flex-1"><Button size="sm" className="w-full bg-gradient-hero text-primary-foreground border-0">{t("nav.start")}</Button></Link>
          </div>
        </div>
      )}
    </header>
  );
}
