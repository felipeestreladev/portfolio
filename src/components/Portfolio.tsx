"use client";

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { CONTENT, HTML_LANG, type Lang } from "@/lib/content";
import { Cursor, Preloader, ScrollProgress } from "./Chrome";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { About } from "./About";
import { Stack } from "./Stack";
import { Projects } from "./Projects";
import { Journey } from "./Journey";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

/* Idioma escolhido: guardado no navegador como conveniencia, sem quebrar se o
   armazenamento estiver bloqueado (janela privada, por exemplo). */
const listeners = new Set<() => void>();
let memoryLang: Lang | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}
function getSnapshot(): Lang {
  if (memoryLang) return memoryLang;
  try {
    const saved = window.localStorage.getItem("lang");
    return saved === "en" || saved === "es" ? saved : "pt";
  } catch {
    return "pt";
  }
}
function getServerSnapshot(): Lang {
  return "pt";
}
function saveLang(l: Lang) {
  memoryLang = l;
  try {
    window.localStorage.setItem("lang", l);
  } catch {
    /* sem armazenamento: vale so nesta visita */
  }
  listeners.forEach((fn) => fn());
}

export function Portfolio() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [ready, setReady] = useState(false);
  const t = CONTENT[lang];

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang];
    document.title = t.meta.title;
  }, [lang, t.meta.title]);

  const onDone = useCallback(() => setReady(true), []);

  return (
    <>
      <a className="skip mono" href="#main">
        {t.skip}
      </a>
      <Cursor />
      <ScrollProgress />
      <Preloader label={t.preloader} onDone={onDone} />
      <Header t={t} lang={lang} onLang={saveLang} ready={ready} />
      <main id="main">
        <Hero t={t} ready={ready} />
        <About t={t} lang={lang} />
        <Stack t={t} />
        <Projects t={t} lang={lang} />
        <Journey t={t} lang={lang} />
        <Contact t={t} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
