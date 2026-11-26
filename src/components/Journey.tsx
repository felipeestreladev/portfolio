"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Dict, Lang } from "@/lib/content";

const rise = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -80px 0px" },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
};

export function Journey({ t, lang }: { t: Dict; lang: Lang }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".job__line").forEach((el) => {
          gsap.fromTo(
            el,
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: "left center", ease: "none", scrollTrigger: { trigger: el, start: "top 92%", end: "top 55%", scrub: true } },
          );
        });
        gsap.fromTo(
          ".journey__giant",
          { xPercent: -40 },
          { xPercent: 6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
      });
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <section className="sec journey" id="trajetoria" ref={root}>
      <div className="journey__giant display" aria-hidden="true">
        {t.journey.title} {t.journey.title} {t.journey.title}
      </div>
      <div className="wrap">
        <p className="kicker mono">{t.journey.kicker}</p>
        <h2 className="sec__title display">{t.journey.title}</h2>

        <ol className="jobs">
          {t.journey.roles.map((r) => (
            <motion.li className="job" key={`${lang}-${r.company}`} {...rise} data-cursor>
              <span className="job__line" aria-hidden="true" />
              <span className="job__period mono">{r.period}</span>
              <div className="job__main">
                <h3 className="job__role display">{r.role}</h3>
                <p className="job__company mono">{r.company}</p>
              </div>
              <ul className="job__points">
                {r.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ol>

        <div className="duo">
          <div>
            <h3 className="duo__title mono">{t.journey.educationTitle}</h3>
            <ul className="edu">
              {t.journey.education.map((e) => (
                <motion.li className="edu__item" key={`${lang}-${e.title}`} {...rise}>
                  <span className="edu__period mono">{e.period}</span>
                  <strong className="edu__title display">{e.title}</strong>
                  <span className="edu__place">{e.place}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="duo__title mono">{t.journey.languagesTitle}</h3>
            <ul className="langs">
              {t.journey.languages.map((l) => (
                <motion.li className="langs__item" key={`${lang}-${l.name}`} {...rise}>
                  <span className="langs__name display">{l.name}</span>
                  <span className="langs__meter" role="img" aria-label={`${l.label}, ${l.level} / 5`}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <i key={i} className={i < l.level ? "is-on" : ""} />
                    ))}
                  </span>
                  <span className="langs__label mono">{l.label}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
