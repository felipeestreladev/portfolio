"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/** Tela de carregamento: contador gigante e cortinas quadradas que sobem. */
export function Preloader({ label, onDone }: { label: string; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const html = document.documentElement;
      html.classList.add("is-loading");
      const state = { v: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          html.classList.remove("is-loading");
          gsap.set(root.current, { display: "none" });
          onDone();
        },
      });

      tl.fromTo(".pre__word", { yPercent: 110 }, { yPercent: 0, duration: reduce ? 0 : 0.7, ease: "power4.out", stagger: 0.06 }, 0);
      tl.to(
        state,
        {
          v: 100,
          duration: reduce ? 0.2 : 2.3,
          ease: "power2.inOut",
          onUpdate: () => {
            const n = Math.round(state.v);
            if (counter.current) counter.current.textContent = String(n).padStart(3, "0");
            if (bar.current) bar.current.style.transform = `scaleX(${state.v / 100})`;
          },
        },
        0.1,
      );
      tl.to(".pre__content", { opacity: 0, duration: reduce ? 0 : 0.25 }, ">+0.15");
      tl.to(
        ".pre__panel",
        { yPercent: -101, duration: reduce ? 0.2 : 0.95, ease: "power4.inOut", stagger: reduce ? 0 : { each: 0.08, from: "edges" } },
        "<",
      );
    },
    { scope: root },
  );

  return (
    <div className="pre" ref={root} role="status" aria-live="polite" aria-label={label}>
      <div className="pre__panels" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span className="pre__panel" key={i} />
        ))}
      </div>
      <div className="pre__content">
        <div className="pre__top mono">
          <span className="pre__mask"><span className="pre__word">{"F</>"}</span></span>
          <span className="pre__mask"><span className="pre__word">{label}</span></span>
        </div>
        <div className="pre__bottom">
          <span className="pre__num display" ref={counter} aria-hidden="true">000</span>
          <span className="pre__bar" aria-hidden="true"><span ref={bar} /></span>
        </div>
      </div>
    </div>
  );
}

/** Cursor quadrado. So aparece em dispositivos com mouse. */
export function Cursor() {
  const box = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const b = box.current;
    const d = dot.current;
    if (!b || !d) return;
    document.body.classList.add("has-cursor");

    const bx = gsap.quickTo(b, "x", { duration: 0.45, ease: "power3" });
    const by = gsap.quickTo(b, "y", { duration: 0.45, ease: "power3" });
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "none" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "none" });

    const move = (e: PointerEvent) => {
      b.classList.add("is-on");
      d.classList.add("is-on");
      bx(e.clientX);
      by(e.clientY);
      dx(e.clientX);
      dy(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const hot = (e.target as HTMLElement | null)?.closest("a, button, input, textarea, [data-cursor]");
      b.classList.toggle("is-hot", !!hot);
    };
    const leave = () => {
      b.classList.remove("is-on");
      d.classList.remove("is-on");
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      document.body.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={box} aria-hidden="true" />
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
    </>
  );
}

/** Barra de progresso da pagina no topo. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } },
      );
    });
  });

  return <div className="progress" ref={bar} aria-hidden="true" />;
}
