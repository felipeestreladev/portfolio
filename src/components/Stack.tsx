"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Dict } from "@/lib/content";
import { TechIcon } from "./ui";

export function Stack({ t }: { t: Dict }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".stack__giant",
          { xPercent: 4 },
          { xPercent: -42, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.utils.toArray<HTMLElement>(".group__num").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 40, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
          );
        });
      });
    },
    { scope: root },
  );

  return (
    <section className="sec stack" id="arsenal" ref={root}>
      <div className="stack__giant display" aria-hidden="true">
        {t.stack.title} {t.stack.title} {t.stack.title}
      </div>
      <div className="wrap">
        <p className="kicker mono">{t.stack.kicker}</p>
        <h2 className="sec__title display">{t.stack.title}</h2>
        <p className="sec__note mono">{t.stack.note}</p>

        <div className="groups">
          {t.stack.groups.map((g, gi) => (
            <div className="group" key={g.title}>
              <div className="group__head">
                <span className="group__num display">{String(gi + 1).padStart(2, "0")}</span>
                <h3 className="group__title display">{g.title}</h3>
                <span className="group__count mono">{g.items.length}</span>
              </div>
              <ul className="tiles">
                {g.items.map((name, i) => (
                  <motion.li
                    key={name}
                    className="tile"
                    initial={{ opacity: 0, y: 34 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                    transition={{ delay: (i % 8) * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ x: -7, y: -7 }}
                  >
                    <TechIcon name={name} className="tile__icon" />
                    <span className="tile__name mono">{name}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
