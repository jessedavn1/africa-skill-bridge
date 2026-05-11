import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from "react";
import { useServerFn } from "@tanstack/react-start";
import { useI18n } from "./i18n";
import { translateBatch } from "./translate.functions";

type CacheMap = Record<string, string>;

type Ctx = {
  tr: (text: string) => string;
};

const AutoI18nContext = createContext<Ctx | null>(null);

const STORAGE_PREFIX = "akili.tr.";

function loadCache(lang: string): CacheMap {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_PREFIX + lang);
    return raw ? (JSON.parse(raw) as CacheMap) : {};
  } catch {
    return {};
  }
}

function saveCache(lang: string, cache: CacheMap) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_PREFIX + lang, JSON.stringify(cache));
  } catch {
    /* quota — ignore */
  }
}

export function AutoI18nProvider({ children }: { children: ReactNode }) {
  const { lang } = useI18n();
  const translate = useServerFn(translateBatch);
  const [cache, setCache] = useState<CacheMap>({});
  const pendingRef = useRef<Set<string>>(new Set());
  const flushTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inFlightRef = useRef<Set<string>>(new Set());

  // Load cache when language changes
  useEffect(() => {
    if (lang === "English") {
      setCache({});
      return;
    }
    setCache(loadCache(lang));
  }, [lang]);

  const flush = useCallback(async () => {
    flushTimerRef.current = null;
    const queue = Array.from(pendingRef.current).filter((t) => !inFlightRef.current.has(t));
    pendingRef.current.clear();
    if (queue.length === 0 || lang === "English") return;
    queue.forEach((t) => inFlightRef.current.add(t));
    const targetLang = lang;
    try {
      // chunk to 40 strings per request
      const chunks: string[][] = [];
      for (let i = 0; i < queue.length; i += 40) chunks.push(queue.slice(i, i + 40));
      for (const chunk of chunks) {
        const { translations } = await translate({ data: { texts: chunk, language: targetLang } });
        if (lang !== targetLang) return; // language switched mid-flight
        setCache((prev) => {
          const next = { ...prev };
          chunk.forEach((src, i) => {
            next[src] = translations[i] ?? src;
          });
          saveCache(targetLang, next);
          return next;
        });
      }
    } catch {
      /* leave originals */
    } finally {
      queue.forEach((t) => inFlightRef.current.delete(t));
    }
  }, [lang, translate]);

  const request = useCallback(
    (text: string) => {
      if (!text || lang === "English") return;
      if (cache[text] || inFlightRef.current.has(text) || pendingRef.current.has(text)) return;
      pendingRef.current.add(text);
      if (flushTimerRef.current == null) {
        flushTimerRef.current = setTimeout(flush, 50);
      }
    },
    [cache, lang, flush]
  );

  const tr = useCallback(
    (text: string) => {
      if (!text || lang === "English") return text;
      const hit = cache[text];
      if (hit) return hit;
      // Fire request lazily; return original meanwhile
      request(text);
      return text;
    },
    [cache, lang, request]
  );

  const value = useMemo(() => ({ tr }), [tr]);

  return <AutoI18nContext.Provider value={value}>{children}</AutoI18nContext.Provider>;
}

export function useAutoT() {
  const ctx = useContext(AutoI18nContext);
  if (!ctx) {
    // Soft fallback: identity
    return (text: string) => text;
  }
  return ctx.tr;
}

export function T({ children }: { children: string }) {
  const tr = useAutoT();
  return <>{tr(children)}</>;
}
