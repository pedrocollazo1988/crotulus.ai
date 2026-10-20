import { es, type Dict } from "./es";
import { en } from "./en";
import { pt } from "./pt";

export const LOCALES = ["es", "en", "pt"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "es";
export const LOCALE_COOKIE = "crotulus_lang";

const DICTS: Record<Locale, Dict> = { es, en, pt };

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function getDict(locale: Locale): Dict {
  return DICTS[locale] ?? es;
}

/**
 * Lee un texto por ruta ("hero.lead", "faq.items.0.q"). Pensado para los
 * componentes de servidor (metadatos, JSON-LD), donde no hay contexto React.
 */
export function t(locale: Locale, path: string): string {
  const value = path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, getDict(locale));
  return typeof value === "string" ? value : "";
}

export const LOCALE_LABEL: Record<Locale, string> = {
  es: "Español",
  en: "English",
  pt: "Português",
};

export const LOCALE_SHORT: Record<Locale, string> = { es: "ES", en: "EN", pt: "PT" };

export const LOCALE_HTML_LANG: Record<Locale, string> = { es: "es", en: "en", pt: "pt" };

export { es, en, pt };
export type { Dict };
