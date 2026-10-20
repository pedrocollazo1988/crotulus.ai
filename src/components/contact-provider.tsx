"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { Dict, Locale } from "@/i18n";
import { CONTACT_SERVICES } from "@/lib/validation";
import { IconArrowUpRight, IconCheck, IconClose, IconMail } from "./icons";

type ContactContextValue = { open: () => void; close: () => void };
const ContactContext = createContext<ContactContextValue>({
  open: () => {},
  close: () => {},
});

export function useContact() {
  return useContext(ContactContext);
}

type Status = "idle" | "sending" | "ok" | "error";

export function ContactProvider({
  children,
  dict,
  locale,
  email,
}: {
  children: React.ReactNode;
  dict: Dict["contact"];
  locale: Locale;
  email: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [fieldError, setFieldError] = useState("");

  const open = useCallback(() => {
    setStatus("idle");
    setFieldError("");
    dialogRef.current?.showModal();
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    function onClick(e: MouseEvent) {
      if (e.target !== dialog) return;
      const r = dialog!.getBoundingClientRect();
      const outside =
        e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
      if (outside) dialog!.close();
    }
    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFieldError("");
    const form = e.currentTarget;
    const data = new FormData(form);
    if (!data.get("consent")) {
      setFieldError(dict.consentRequired);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          service: data.get("service"),
          message: data.get("message"),
          consent: true,
          website: data.get("website"),
          locale,
          pageUrl: window.location.href,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(json.error || dict.errorText);
      setStatus("ok");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : dict.errorText);
    }
  }

  return (
    <ContactContext.Provider value={value}>
      {children}
      <dialog ref={dialogRef} className="modal" aria-labelledby="contact-title">
        <button type="button" className="modal__close" onClick={close} aria-label={dict.close}>
          <IconClose />
        </button>

        {status === "ok" ? (
          <div className="success-box">
            <div className="success-box__icon">
              <IconCheck />
            </div>
            <h2 id="contact-title">{dict.successTitle}</h2>
            <p className="modal__lead">{dict.successText}</p>
            <button type="button" className="button button--block" onClick={close}>
              {dict.close}
            </button>
          </div>
        ) : (
          <>
            <div className="eyebrow">{dict.eyebrow}</div>
            <h2 id="contact-title">{dict.title}</h2>
            <p className="modal__lead">{dict.lead}</p>

            <form onSubmit={onSubmit} noValidate>
              <div className="field--row">
                <div className="field">
                  <label htmlFor="c-name">{dict.name}</label>
                  <input id="c-name" name="name" required maxLength={120} placeholder={dict.namePh} />
                </div>
                <div className="field">
                  <label htmlFor="c-email">{dict.email}</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    placeholder={dict.emailPh}
                  />
                </div>
              </div>

              <div className="field--row">
                <div className="field">
                  <label htmlFor="c-phone">{dict.phone}</label>
                  <input id="c-phone" name="phone" type="tel" placeholder={dict.phonePh} />
                </div>
                <div className="field">
                  <label htmlFor="c-company">{dict.company}</label>
                  <input id="c-company" name="company" placeholder={dict.companyPh} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="c-service">{dict.service}</label>
                <select id="c-service" name="service" defaultValue={CONTACT_SERVICES[0]}>
                  {CONTACT_SERVICES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label htmlFor="c-message">{dict.message}</label>
                <textarea
                  id="c-message"
                  name="message"
                  required
                  rows={4}
                  maxLength={4000}
                  placeholder={dict.messagePh}
                />
              </div>

              <label className="check">
                <input type="checkbox" name="consent" required />
                <span>{dict.consent}</span>
              </label>

              <div className="hp" aria-hidden="true">
                <label htmlFor="c-website">Website</label>
                <input id="c-website" name="website" tabIndex={-1} autoComplete="off" />
              </div>

              {fieldError && <p className="field__error">{fieldError}</p>}

              <button
                type="submit"
                className="button button--block"
                style={{ marginTop: 20 }}
                disabled={status === "sending"}
              >
                {status === "sending" ? dict.sending : dict.submit}
                {status !== "sending" && <IconArrowUpRight />}
              </button>

              {status === "error" && (
                <div className="form-status form-status--error" role="alert">
                  <strong>{dict.errorTitle}</strong> — {message}
                </div>
              )}

              <p className="modal__lead" style={{ marginTop: 16, textAlign: "center" }}>
                {dict.orWrite}{" "}
                <a href={`mailto:${email}`} style={{ color: "var(--blue)", fontWeight: 600 }}>
                  {email}
                </a>
              </p>
            </form>
          </>
        )}
      </dialog>
    </ContactContext.Provider>
  );
}

/** Boton que abre el dialogo de contacto. */
export function ContactButton({
  children,
  className = "button",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open } = useContact();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

export { IconMail };
