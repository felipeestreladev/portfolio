"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Dict, Lang } from "@/lib/content";
import { SquareButton } from "./ui";

const TONES = ["black", "lime", "white"] as const;

type SiteStatus = { url: string; online: boolean; status: number; ms: number };

/** Pergunta ao servidor (rota /api/status) se cada site responde. Repete a cada minuto. */
function useSiteStatus() {
  const [map, setMap] = useState<Record<string, SiteStatus> | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch("/api/status", { cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const list = (await res.json()) as SiteStatus[];
        if (alive) setMap(Object.fromEntries(list.map((s) => [s.url, s])));
      } catch {
        if (alive) setMap({});
      }
    };
    load();
    const id = window.setInterval(load, 60_000);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  return map;
}

/** Arte geometrica propria de cada projeto, so com formas retas. */
function Art({ kind }: { kind: number }) {
  const k = kind % 4;
  return (
    <svg className="proj__art" viewBox="0 0 200 200" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {k === 0 &&
        Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={10 + i * 11} y={10 + i * 11} width={180 - i * 22} height={180 - i * 22} fill="none" stroke="currentColor" strokeWidth="5" />
        ))}
      {k === 1 &&
        Array.from({ length: 12 }, (_, i) => <path key={i} d={`M${-20 + i * 24} 220 L${60 + i * 24} -20`} stroke="currentColor" strokeWidth="9" />)}
      {k === 2 &&
        Array.from({ length: 36 }, (_, i) => (
          <rect key={i} x={12 + (i % 6) * 30} y={12 + Math.floor(i / 6) * 30} width="18" height="18" fill="currentColor" opacity={(i * 7) % 5 === 0 ? 1 : 0.28} />
        ))}
      {k === 3 &&
        Array.from({ length: 7 }, (_, i) => <rect key={i} x={i * 28} y={200 - (i + 1) * 28} width="28" height={(i + 1) * 28} fill="currentColor" opacity={0.25 + i * 0.12} />)}
    </svg>
  );
}

export function Projects({ t, lang }: { t: Dict; lang: Lang }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const total = t.projects.items.length;
  const statuses = useSiteStatus();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;
        const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);
        const counter = root.current?.querySelector<HTMLElement>(".proj__current");

        gsap.to(el, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: ".proj__pin",
            start: "top top",
            end: () => "+=" + dist(),
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const i = Math.min(total, Math.floor(self.progress * total * 0.9999) + 1);
              if (counter) counter.textContent = String(i).padStart(2, "0");
              gsap.set(".proj__fill", { scaleX: self.progress });
            },
          },
        });

        gsap.utils.toArray<HTMLElement>(".proj__name").forEach((n) => {
          gsap.fromTo(
            n,
            { skewX: 0 },
            {
              skewX: -8,
              ease: "none",
              scrollTrigger: { trigger: ".proj__pin", start: "top top", end: () => "+=" + dist(), scrub: true },
            },
          );
        });
      });
    },
    { scope: root, dependencies: [lang] },
  );

  return (
    <section className="proj" id="projetos" ref={root}>
      <div className="proj__pin">
        <header className="proj__head">
          <p className="kicker mono">{t.projects.kicker}</p>
          <div className="proj__headrow">
            <h2 className="proj__title display">{t.projects.title}</h2>
            <div className="proj__meter mono" aria-hidden="true">
              <span className="proj__current">01</span>
              <span className="proj__bar"><i className="proj__fill" /></span>
              <span>{String(total).padStart(2, "0")}</span>
            </div>
          </div>
        </header>

        <div className="proj__track" ref={track}>
          {t.projects.items.map((p, i) => {
            const s = statuses?.[p.url];
            const state = statuses === null ? "checking" : s?.online ? "online" : "offline";
            return (
              <article className={`pcard pcard--${TONES[i % 3]}`} key={p.name} data-cursor>
                <div className="pcard__info">
                  <div className="pcard__top">
                    <span className="pcard__idx display">{String(i + 1).padStart(2, "0")}</span>
                    <span className="pcard__tags">
                      <span className={`pstatus pstatus--${state} mono`} role="status">
                        <i className="pstatus__sq" aria-hidden="true" />
                        {t.projects.status[state]}
                        {state === "online" && s ? <span className="pstatus__ms">{s.ms} ms</span> : null}
                      </span>
                      <span className="pcard__tag mono">{p.tag}</span>
                    </span>
                  </div>

                  <h3 className="pcard__name proj__name display">{p.name}</h3>

                  <div className="pcard__bottom">
                    <p className="pcard__desc">{p.desc}</p>
                    <div className="pcard__foot">
                      <span className="pcard__domain mono">{p.domain}</span>
                      <SquareButton href={p.url} external variant={TONES[i % 3] === "lime" ? "white" : "lime"}>
                        {t.projects.visit}
                      </SquareButton>
                    </div>
                  </div>
                </div>

                <div className="pcard__shot" aria-hidden="true">
                  <Art kind={i} />
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
