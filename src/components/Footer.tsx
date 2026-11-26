"use client";

import { useEffect, useState } from "react";
import { LOCALE, type Dict, type Lang } from "@/lib/content";
import { Marquee, SquareButton } from "./ui";

export function Footer({ t, lang }: { t: Dict; lang: Lang }) {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(LOCALE[lang], {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [lang]);

  return (
    <footer className="foot">
      <Marquee items={[t.footer.thanks, "Felipe Estrela", t.footer.thanks, "Node.js"]} tone="lime" speed={26} />
      <div className="foot__row wrap">
        <p className="foot__clock mono">
          <span>{t.footer.time}</span>
          <b className="foot__time">{time}</b>
        </p>
        <p className="foot__rights mono">
          &copy; 2026 Felipe Estrela. {t.footer.rights}.
        </p>
        <SquareButton variant="white" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          {t.footer.top}
        </SquareButton>
      </div>
    </footer>
  );
}
