"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { gsap, useGSAP } from "@/lib/gsap";
import { LINKS, type Dict } from "@/lib/content";
import { ArrowIcon, SquareButton, TechIcon } from "./ui";

/**
 * O e-mail so entra no HTML depois da hidratacao. Se ele viesse no HTML do servidor, o Cloudflare
 * (ofuscacao de e-mail) trocaria o texto por "[email protected]" e o React acusaria erro de hidratacao.
 */
const noopSubscribe = () => () => {};
function useEmail() {
  return useSyncExternalStore(noopSubscribe, () => LINKS.email, () => "");
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  multiline?: boolean;
  type?: "text" | "email";
  autoComplete?: string;
};

/** Campo totalmente proprio: sem borda nativa, sem outline, com estado de foco desenhado. */
function Field({ label, value, onChange, error, multiline, type = "text", autoComplete }: FieldProps) {
  const id = useId();
  const [focus, setFocus] = useState(false);
  const shared = {
    id,
    value,
    autoComplete,
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-err` : undefined,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    className: "field__input",
  };
  return (
    <div className={`field${focus ? " is-focus" : ""}${value ? " is-filled" : ""}${error ? " has-error" : ""}`}>
      <label className="field__label mono" htmlFor={id}>
        {label}
      </label>
      {multiline ? (
        <textarea {...shared} rows={4} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input {...shared} type={type} onChange={(e) => onChange(e.target.value)} />
      )}
      <span className="field__bar" aria-hidden="true" />
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            role="alert"
            className="field__error mono"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 16 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Contact({ t }: { t: Dict }) {
  const siteEmail = useEmail();
  const hydrated = useSyncExternalStore(noopSubscribe, () => true, () => false);
  const root = useRef<HTMLElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [opening, setOpening] = useState(false);
  const [via, setVia] = useState<"email" | "whatsapp">("email");
  const f = t.contact.form;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".contact__word",
          { yPercent: 115 },
          { yPercent: 0, duration: 1, stagger: 0.09, ease: "power4.out", scrollTrigger: { trigger: ".contact__title", start: "top 85%", once: true } },
        );
        gsap.fromTo(
          ".contact__giant",
          { xPercent: 0 },
          { xPercent: -35, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } },
        );
      });
    },
    { scope: root },
  );

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = f.errName;
    // O e-mail do visitante so e necessario quando o envio e por e-mail.
    if (via === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = f.errEmail;
    if (message.trim().length < 10) next.message = f.errMessage;
    setErrors(next);
    if (Object.keys(next).length) return;

    if (via === "email") {
      if (!LINKS.email) return;
      setOpening(true);
      const subject = encodeURIComponent(`${f.subject}: ${name.trim()}`);
      const hello = f.greeting.replace("{name}", name.trim());
      const body = encodeURIComponent(`${hello}\n\n${message.trim()}\n\n${email.trim()}`);
      window.location.href = `mailto:${LINKS.email}?subject=${subject}&body=${body}`;
    } else {
      setOpening(true);
      const text = encodeURIComponent(`${f.greeting.replace("{name}", name.trim())}\n\n${message.trim()}`);
      window.open(`${LINKS.whatsapp}?text=${text}`, "_blank", "noopener,noreferrer");
    }
    window.setTimeout(() => setOpening(false), 4000);
  };

  const chooseVia = (v: "email" | "whatsapp") => {
    setVia(v);
    setErrors((e) => ({ ...e, email: undefined }));
  };

  return (
    <section className="sec contact" id="contato" ref={root}>
      <div className="contact__giant display" aria-hidden="true">
        {t.contact.kicker.split("/")[1]?.trim()} {t.contact.kicker.split("/")[1]?.trim()} {t.contact.kicker.split("/")[1]?.trim()}
      </div>
      <div className="wrap">
        <p className="kicker mono">{t.contact.kicker}</p>
        <h2 className="contact__title display" aria-label={t.contact.title}>
          {t.contact.title.split(" ").map((w, i) => (
            <span className="contact__mask" key={`${w}-${i}`} aria-hidden="true">
              <span className="contact__word">{w}&nbsp;</span>
            </span>
          ))}
        </h2>

        <div className="contact__grid">
          <div className="contact__side">
            <p className="contact__text">{t.contact.text}</p>

            {siteEmail || !hydrated ? (
              <a className="contact__mail display" href={siteEmail ? `mailto:${siteEmail}` : "#contato"} data-cursor>
                <span className="contact__mail-txt">{siteEmail || "········"}</span>
                <ArrowIcon className="contact__mail-icon" />
              </a>
            ) : (
              <p className="mono contact__missing">{t.contact.emailMissing}</p>
            )}

            <a
              className="contact__mail contact__phone display"
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp ${LINKS.phone}`}
              data-cursor
            >
              <span className="contact__mail-txt">{LINKS.phone}</span>
              <TechIcon name="WhatsApp" className="contact__mail-icon" />
            </a>

            <ul className="social">
              <li>
                <a className="social__link mono" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
                  <span className="social__box"><TechIcon name="LinkedIn" className="social__icon" /></span>
                  LinkedIn
                </a>
              </li>
              <li>
                <a className="social__link mono" href={LINKS.github} target="_blank" rel="noopener noreferrer">
                  <span className="social__box"><TechIcon name="GitHub" className="social__icon" /></span>
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="via" role="radiogroup" aria-label={f.viaLabel}>
              <span className="via__label mono">{f.viaLabel}</span>
              <LayoutGroup id="via">
                <div className="via__opts">
                  {(
                    [
                      ["email", f.viaEmail],
                      ["whatsapp", f.viaWhatsapp],
                    ] as const
                  ).map(([key, label]) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={via === key}
                      className={`via__opt mono${via === key ? " is-on" : ""}`}
                      onClick={() => chooseVia(key)}
                    >
                      {via === key && (
                        <motion.span layoutId="via-pill" className="via__pill" transition={{ type: "spring", stiffness: 520, damping: 38 }} />
                      )}
                      <span className="via__txt">{label}</span>
                    </button>
                  ))}
                </div>
              </LayoutGroup>
            </div>

            <Field label={f.name} value={name} onChange={setName} error={errors.name} autoComplete="name" />
            <AnimatePresence initial={false}>
              {via === "email" && (
                <motion.div
                  key="email-field"
                  className="form__collapse"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Field label={f.email} value={email} onChange={setEmail} error={errors.email} type="email" autoComplete="email" />
                </motion.div>
              )}
            </AnimatePresence>
            <Field label={f.message} value={message} onChange={setMessage} error={errors.message} multiline />
            <div className="form__foot">
              <SquareButton type="submit" disabled={opening}>
                {via === "email" ? f.sendEmail : f.sendWhatsapp}
              </SquareButton>
              <AnimatePresence>
                {opening && (
                  <motion.span className="form__status mono" role="status" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
                    {via === "email" ? f.opening : f.openingWhatsapp}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
