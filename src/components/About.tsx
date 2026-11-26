"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LOCALE, type Dict, type Lang } from "@/lib/content";

export function About({ t, lang }: { t: Dict; lang: Lang }) {
  const root = useRef<HTMLElement>(null);
  const words = t.about.statement.split(" ");
  const locale = LOCALE[lang];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about__word",
          { opacity: 0.1 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: ".about__statement", start: "top 82%", end: "bottom 48%", scrub: true },
          },
        );

        gsap.utils.toArray<HTMLElement>(".stat__num").forEach((el) => {
          const to = Number(el.dataset.to);
          const group = el.dataset.group === "1";
          const suffix = el.dataset.suffix ?? "";
          const fmt = (n: number) => (group ? n.toLocaleString(locale) : String(n)) + suffix;
          const o = { v: 0 };
          el.textContent = fmt(0);
          gsap.to(o, {
            v: to,
            duration: 2.2,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
            onUpdate: () => {
              el.textContent = fmt(Math.round(o.v));
            },
          });
        });

        gsap.fromTo(
          ".about__slab",
          { xPercent: 0 },
          { xPercent: -30, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );

        gsap.from(".stat", {
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".stats", start: "top 88%", once: true },
        });
      });
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <section className="sec about" id="sobre" ref={root}>
      <div className="about__slab display" aria-hidden="true">
        SOBRE SOBRE SOBRE SOBRE
      </div>
      <div className="wrap">
        <p className="kicker mono">{t.about.kicker}</p>
        <h2 className="about__statement display" aria-label={t.about.statement}>
          {words.map((w, i) => (
            <span key={`${lang}-${i}`} className="about__word" aria-hidden="true">
              {w}{" "}
            </span>
          ))}
        </h2>

        <div className="about__cols">
          <p>{t.about.text1}</p>
          <p>{t.about.text2}</p>
        </div>

        <ul className="stats">
          {t.about.stats.map((s, i) => (
            <li className="stat" key={`${lang}-${i}`}>
              <span
                className="stat__num display"
                data-to={s.to}
                data-suffix={s.suffix}
                data-group={s.to >= 10000 ? "1" : "0"}
                suppressHydrationWarning
              >
                {s.to >= 10000 ? s.to.toLocaleString(locale) : s.to}
                {s.suffix}
              </span>
              <span className="stat__label mono">{s.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
