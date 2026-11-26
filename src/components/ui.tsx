"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ICONS } from "@/lib/icons";

/** Seta diagonal com pontas retas (sem arredondar). */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" focusable="false">
      <path d="M5 19 19 5M8 5h11v11" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

/** Icone de tecnologia a partir do caminho local (simple-icons). */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const d = ICONS[name];
  if (!d) {
    return (
      <span className={className} aria-hidden="true">
        {name.slice(0, 2)}
      </span>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d={d} fill="currentColor" />
    </svg>
  );
}

/** Divide um texto em letras para animar com GSAP. */
export function Letters({ text, className }: { text: string; className: string }) {
  return (
    <>
      {Array.from(text).map((c, i) => (
        <span key={i} className={className} aria-hidden="true">
          {c === " " ? " " : c}
        </span>
      ))}
    </>
  );
}

type ButtonProps = {
  variant?: "lime" | "white" | "ghost";
  href?: string;
  external?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  children: ReactNode;
};

const press = {
  whileHover: { x: 7, y: 7 },
  whileTap: { x: 11, y: 11 },
  transition: { type: "spring", stiffness: 520, damping: 32 },
} as const;

/** Botao quadrado com sombra dura: ao passar o mouse ele "afunda" sobre a sombra. */
export function SquareButton({ variant = "lime", href, external, onClick, type = "button", disabled, children }: ButtonProps) {
  const inner = (
    <>
      <span className="sqbtn__label">{children}</span>
      <ArrowIcon className="sqbtn__icon" />
    </>
  );
  return (
    <span className={`sqwrap sqwrap--${variant}`}>
      {href ? (
        <motion.a
          className={`sqbtn sqbtn--${variant}`}
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...press}
        >
          {inner}
        </motion.a>
      ) : (
        <motion.button className={`sqbtn sqbtn--${variant}`} type={type} onClick={onClick} disabled={disabled} {...press}>
          {inner}
        </motion.button>
      )}
    </span>
  );
}

/** Faixa infinita inclinada. Usa so transform, sem reflow. */
export function Marquee({
  items,
  tone = "lime",
  tilt = 0,
  speed = 34,
  reverse = false,
}: {
  items: string[];
  tone?: "lime" | "white" | "black";
  tilt?: number;
  speed?: number;
  reverse?: boolean;
}) {
  const row = items.map((w, i) => (
    <span className="marq__item" key={i}>
      {w}
      <i className="marq__sq" aria-hidden="true" />
    </span>
  ));
  return (
    <div
      className={`marq marq--${tone}`}
      style={{ transform: `rotate(${tilt}deg)`, ["--speed" as string]: `${speed}s` }}
      aria-hidden="true"
    >
      <div className={`marq__track${reverse ? " is-reverse" : ""}`}>
        <div className="marq__row">{row}{row}</div>
        <div className="marq__row">{row}{row}</div>
      </div>
    </div>
  );
}
