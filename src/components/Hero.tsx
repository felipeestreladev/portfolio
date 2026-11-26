"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Dict } from "@/lib/content";
import { Letters, Marquee, SquareButton } from "./ui";

export function Hero({ t, ready }: { t: Dict; ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const ghost = useRef<HTMLDivElement>(null);
  const squares = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(".hero__ltr", { yPercent: 125, rotate: 9, transformOrigin: "0% 100%" });
        gsap.set(".hero__rise", { y: 46, opacity: 0 });
        gsap.set(".hero__ghost", { opacity: 0 });
        gsap.set(".hero__badge", { scale: 0, rotate: -120 });
        gsap.set(".hero__sq", { scale: 0 });

        if (ready) {
          const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
          tl.to(".hero__ltr", { yPercent: 0, rotate: 0, duration: 1.15, stagger: 0.05 })
            .to(".hero__ghost", { opacity: 1, duration: 1.4, ease: "power2.out" }, 0.25)
            .to(".hero__rise", { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 }, 0.55)
            .to(".hero__badge", { scale: 1, rotate: 0, duration: 1.1, ease: "back.out(1.7)" }, 0.65)
            .to(".hero__sq", { scale: 1, duration: 0.7, stagger: 0.08, ease: "back.out(2)" }, 0.9);
        }

        // Movimento continuo dos elementos decorativos
        gsap.to(".hero__badge-spin", { rotate: 360, duration: 22, repeat: -1, ease: "none" });
        gsap.utils.toArray<HTMLElement>(".hero__sq").forEach((el, i) => {
          gsap.to(el, {
            y: i % 2 ? 26 : -26,
            rotate: i % 2 ? 90 : -90,
            duration: 3.2 + i * 0.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        // Parallax no scroll
        const st = { trigger: root.current, start: "top top", end: "bottom top", scrub: true };
        gsap.to(".hero__line--a", { xPercent: -9, ease: "none", scrollTrigger: st });
        gsap.to(".hero__line--b", { xPercent: 9, ease: "none", scrollTrigger: st });
        gsap.to(".hero__ghost-inner", { yPercent: 28, ease: "none", scrollTrigger: st });
        gsap.to(".hero__badge", { yPercent: -60, ease: "none", scrollTrigger: st });

        // Parallax com o mouse
        const g = ghost.current;
        const s = squares.current;
        if (g && s && window.matchMedia("(pointer: fine)").matches) {
          const gx = gsap.quickTo(g, "x", { duration: 0.9, ease: "power3" });
          const gy = gsap.quickTo(g, "y", { duration: 0.9, ease: "power3" });
          const sx = gsap.quickTo(s, "x", { duration: 1.2, ease: "power3" });
          const sy = gsap.quickTo(s, "y", { duration: 1.2, ease: "power3" });
          const onMove = (e: PointerEvent) => {
            const nx = e.clientX / window.innerWidth - 0.5;
            const ny = e.clientY / window.innerHeight - 0.5;
            gx(nx * -50);
            gy(ny * -34);
            sx(nx * 70);
            sy(ny * 46);
          };
          window.addEventListener("pointermove", onMove, { passive: true });
          return () => window.removeEventListener("pointermove", onMove);
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([".hero__ltr", ".hero__rise", ".hero__ghost", ".hero__badge", ".hero__sq"], { clearProps: "all" });
      });
    },
    { scope: root, dependencies: [ready] },
  );

  return (
    <section className="hero" id="inicio" ref={root}>
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__ghost" ref={ghost} aria-hidden="true">
        <span className="hero__ghost-inner display">DEV</span>
      </div>
      <div className="hero__squares" ref={squares} aria-hidden="true">
        <i className="hero__sq hero__sq--1" />
        <i className="hero__sq hero__sq--2" />
        <i className="hero__sq hero__sq--3" />
      </div>

      <div className="hero__top mono">
        <span className="hero__rise">
          <b className="hero__dot" aria-hidden="true" />
          {t.hero.eyebrow}
        </span>
        <span className="hero__rise hero__coords">{t.hero.base} / 24.71S 53.74W</span>
      </div>

      <h1 className="hero__name display" aria-label="Felipe Estrela">
        <span className="hero__line hero__line--a">
          <Letters text="FELIPE" className="hero__ltr" />
        </span>
        <span className="hero__line hero__line--b">
          <Letters text="ESTRELA" className="hero__ltr hero__ltr--lime" />
        </span>
      </h1>

      <div className="hero__badge" aria-hidden="true">
        <svg className="hero__badge-spin" viewBox="0 0 220 220">
          <defs>
            <path id="badge-path" d="M24 24H196V196H24Z" />
          </defs>
          <rect x="2" y="2" width="216" height="216" fill="#C8FF00" />
          <text className="hero__badge-text" fill="#0B0B0B">
            <textPath href="#badge-path" textLength="660" lengthAdjust="spacing">
              {t.hero.badge.repeat(2)}
            </textPath>
          </text>
          <rect x="70" y="70" width="80" height="80" fill="#0B0B0B" />
          <path d="M92 92h36v36H92z" fill="none" stroke="#C8FF00" strokeWidth="6" />
        </svg>
      </div>

      <div className="hero__bottom">
        <p className="hero__role hero__rise">{t.hero.role}</p>
        <div className="hero__cta hero__rise">
          <SquareButton href="#projetos">{t.hero.ctaProjects}</SquareButton>
          <SquareButton href="#contato" variant="white">
            {t.hero.ctaContact}
          </SquareButton>
        </div>
      </div>

      <div className="hero__scroll mono hero__rise" aria-hidden="true">
        <span>{t.hero.scroll}</span>
        <i />
      </div>

      <div className="hero__bands" aria-hidden="true">
        <Marquee items={t.marquee} tone="lime" tilt={-3} speed={30} />
        <Marquee items={t.marquee} tone="white" tilt={2} speed={38} reverse />
      </div>
    </section>
  );
}
