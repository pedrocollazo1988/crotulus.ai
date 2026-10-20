"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALE_LABEL, LOCALE_SHORT, LOCALES, type Locale } from "@/i18n";
import { Flag } from "./flag";
import { IconGlobe } from "./icons";

/**
 * Selector de idioma con banderas. Guarda la preferencia en una cookie para
 * que el servidor pueda renderizar en ese idioma y recarga la pagina.
 */
export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function choose(next: Locale) {
    document.cookie = `crotulus_lang=${next};path=/;max-age=31536000;samesite=lax`;
    document.documentElement.lang = next;
    window.location.reload();
  }

  return (
    <div className="lang" ref={ref}>
      <button
        type="button"
        className="icon-btn"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${label}: ${LOCALE_LABEL[locale]}`}
        title={label}
      >
        <IconGlobe />
      </button>
      {open && (
        <ul className="lang__menu" role="listbox" aria-label={label}>
          {LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                className="lang__opt"
                role="option"
                aria-selected={code === locale}
                aria-current={code === locale}
                onClick={() => choose(code)}
              >
                <Flag locale={code} />
                <span>{LOCALE_LABEL[code]}</span>
                <span className="lang__code">{LOCALE_SHORT[code]}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
