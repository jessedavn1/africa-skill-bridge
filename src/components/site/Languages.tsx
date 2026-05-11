import { T } from "@/lib/auto-i18n";

const languages = [
  { name: "English", native: "Hello", flag: "🇬🇧" },
  { name: "Français", native: "Bonjour", flag: "🇫🇷" },
  { name: "Kiswahili", native: "Karibu", flag: "🇰🇪" },
  { name: "Kinyarwanda", native: "Muraho", flag: "🇷🇼" },
  { name: "Kirundi", native: "Bite", flag: "🇧🇮" },
  { name: "العربية", native: "مرحبا", flag: "🇸🇦" },
  { name: "Deutsch", native: "Hallo", flag: "🇩🇪" },
  { name: "Español", native: "Hola", flag: "🇪🇸" },
  { name: "isiZulu", native: "Sawubona", flag: "🇿🇦" },
  { name: "Yorùbá", native: "Ẹ n lẹ", flag: "🇳🇬" },
  { name: "Igbo", native: "Ndewo", flag: "🇳🇬" },
  { name: "Lingala", native: "Mbote", flag: "🇨🇩" },
];

export function Languages() {
  return (
    <section id="languages" className="container mx-auto px-4 sm:px-6 py-24">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="text-sm text-accent font-medium mb-3 uppercase tracking-widest"><T>Multilingual</T></div>
        <h2 className="font-display text-4xl sm:text-5xl font-bold">
          <T>Learn in the language</T> <span className="text-gradient"><T>you think in</T></span>
        </h2>
        <p className="text-muted-foreground mt-4">
          <T>12 languages — from across Africa, Europe and the Arab world. Switch anytime, mid-sentence.</T>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {languages.map((l) => (
          <div
            key={l.name}
            className="group glass rounded-2xl p-5 flex items-center gap-4 hover:border-primary/50 transition cursor-pointer"
          >
            <div className="text-3xl">{l.flag}</div>
            <div>
              <div className="font-display text-lg font-semibold leading-tight">{l.name}</div>
              <div className="text-xs text-muted-foreground">{l.native}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
