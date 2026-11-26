"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { Dict, Lang } from "@/lib/content";

const NAV = [
  ["about", "#sobre"],
  ["stack", "#arsenal"],
  ["projects", "#projetos"],
  ["journey", "#trajetoria"],
  ["contact", "#contato"],
] as const;

const EASE = [0.76, 0, 0.24, 1] as const;

export function Header({ t, lang, onLang, ready }: { t: Dict; lang: Lang; onLang: (l: Lang) => void; ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setHidden(self.direction === 1 && self.scroll() > 260),
    });
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <motion.header
        className="hdr"
        initial={{ y: "-100%" }}
        animate={{ y: !ready || (hidden && !open) ? "-100%" : "0%" }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        <a className="hdr__logo" href="#inicio" aria-label="Felipe Estrela">
          <span className="hdr__mark" aria-hidden="true">
            <svg viewBox="0 0 48 28" width="34" height="20" fill="none" stroke="currentColor" strokeWidth="5.4" strokeLinecap="butt" strokeLinejoin="miter">
              <path d="M15 4L5 14l10 10" />
              <path d="M29 2L20 26" />
              <path d="M33 4l10 10-10 10" />
            </svg>
          </span>
          <span className="hdr__name mono">Felipe Estrela</span>
        </a>

        <nav className="hdr__nav" aria-label="Principal">
          {NAV.map(([k, href], i) => (
            <a key={k} className="hdr__link mono" href={href}>
              <span className="hdr__idx">0{i + 1}</span>
              {t.nav[k]}
            </a>
          ))}
        </nav>

        <div className="hdr__tools">
          <LayoutGroup id="lang">
            <div className="lang" role="group" aria-label="Idioma / Language">
              {(["pt", "en", "es"] as const).map((l) => (
                <button key={l} type="button" className={`lang__btn mono${lang === l ? " is-on" : ""}`} aria-pressed={lang === l} onClick={() => onLang(l)}>
                  {lang === l && <motion.span layoutId="lang-pill" className="lang__pill" transition={{ type: "spring", stiffness: 520, damping: 36 }} />}
                  <span className="lang__txt">{l.toUpperCase()}</span>
                </button>
              ))}
            </div>
          </LayoutGroup>

          <button
            type="button"
            className="burger"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? t.nav.close : t.nav.menu}
            onClick={() => setOpen((v) => !v)}
          >
            <motion.span className="burger__line" animate={{ y: open ? 6 : 0, rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease: EASE }} />
            <motion.span className="burger__line" animate={{ opacity: open ? 0 : 1, scaleX: open ? 0 : 1 }} transition={{ duration: 0.2 }} />
            <motion.span className="burger__line" animate={{ y: open ? -6 : 0, rotate: open ? -45 : 0 }} transition={{ duration: 0.3, ease: EASE }} />
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu"
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.nav.menu}
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <ul className="menu__list">
              {NAV.map(([k, href], i) => (
                <li className="menu__mask" key={k}>
                  <motion.a
                    className="menu__link display"
                    href={href}
                    onClick={() => setOpen(false)}
                    initial={{ y: "115%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-115%" }}
                    transition={{ delay: 0.18 + i * 0.07, duration: 0.65, ease: EASE }}
                  >
                    <span className="menu__idx mono">0{i + 1}</span>
                    {t.nav[k]}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
