import type { Dict, Locale } from "@/i18n";

export type SearchEntryType = "page" | "section" | "team" | "faq";

export type SearchEntry = {
  type: SearchEntryType;
  title: string;
  subtitle: string;
  href: string;
  keywords: string;
};

export type TeamEntry = {
  name: string;
  role: string;
  slug: string;
};

const strip = (s: string) =>
  s
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/**
 * Construye el indice del buscador a partir del diccionario del idioma activo,
 * las personas del equipo (base de datos) y las rutas del sitio. Se ejecuta en
 * el servidor y el resultado viaja al cliente como prop.
 */
export function buildSearchIndex(
  dict: Dict,
  locale: Locale,
  team: TeamEntry[],
): SearchEntry[] {
  const entries: SearchEntry[] = [];

  entries.push({
    type: "page",
    title: locale === "es" ? "Inicio" : locale === "en" ? "Home" : "Início",
    subtitle: strip(dict.hero.lead).slice(0, 90),
    href: "/",
    keywords: `${dict.hero.titleLine1} ${dict.hero.titleAccent} ${dict.hero.eyebrow}`,
  });

  entries.push({
    type: "page",
    title: dict.nav.team,
    subtitle: strip(dict.team.lead).slice(0, 90),
    href: "/equipo",
    keywords: `${dict.team.title} ${dict.team.valuesTitle}`,
  });

  entries.push({
    type: "section",
    title: dict.nav.solutions,
    subtitle: strip(dict.solutions.lead).slice(0, 90),
    href: "/#soluciones",
    keywords: `${strip(dict.solutions.title)} ${dict.solutions.tabs
      .map((t) => `${t.title} ${t.sub}`)
      .join(" ")}`,
  });

  entries.push({
    type: "section",
    title: dict.nav.process,
    subtitle: strip(dict.process.title),
    href: "/#como",
    keywords: dict.process.steps.map((s) => `${s.title} ${s.text}`).join(" "),
  });

  entries.push({
    type: "section",
    title: dict.nav.faq,
    subtitle: strip(dict.faq.title),
    href: "/#preguntas",
    keywords: dict.faq.items.map((f) => f.q).join(" "),
  });

  entries.push({
    type: "section",
    title: dict.cta.title.replace(/<[^>]+>/g, " ").trim(),
    subtitle: dict.cta.text,
    href: "/#contacto",
    keywords: `${dict.nav.contact} ${dict.contact.title} contacto`,
  });

  dict.faq.items.forEach((item) => {
    entries.push({
      type: "faq",
      title: item.q,
      subtitle: strip(item.a).slice(0, 110),
      href: "/#preguntas",
      keywords: `${item.q} ${strip(item.a)}`,
    });
  });

  team.forEach((person) => {
    entries.push({
      type: "team",
      title: person.name,
      subtitle: person.role,
      href: `/equipo#${person.slug}`,
      keywords: `${person.name} ${person.role}`,
    });
  });

  return entries;
}

/** Normaliza para comparar sin acentos ni mayusculas. */
export function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function scoreEntry(entry: SearchEntry, query: string): number {
  const q = normalize(query);
  if (!q) return 0;
  const title = normalize(entry.title);
  const subtitle = normalize(entry.subtitle);
  const keywords = normalize(entry.keywords);

  let score = 0;
  if (title === q) score += 100;
  if (title.startsWith(q)) score += 60;
  else if (title.includes(q)) score += 35;
  if (subtitle.includes(q)) score += 18;
  if (keywords.includes(q)) score += 12;

  // Coincidencia por palabras sueltas (todas deben aparecer).
  const words = q.split(/\s+/).filter((w) => w.length > 2);
  if (words.length > 1 && words.every((w) => title.includes(w) || keywords.includes(w))) {
    score += 20;
  }
  return score;
}

export function searchEntries(entries: SearchEntry[], query: string, limit = 12) {
  return entries
    .map((entry) => ({ entry, score: scoreEntry(entry, query) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.entry);
}
