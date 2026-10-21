import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { readLocale } from "@/lib/locale";
import { SITE } from "@/lib/site";
import { ContactButton } from "@/components/contact-provider";
import { IconArrowUpRight, IconShield } from "@/components/icons";

/** Fecha de la version vigente del texto. Se muestra tal cual en la pagina. */
const LAST_UPDATED = "2026-10-21";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await readLocale();
  const dict = getDict(locale);
  return {
    title: dict.meta.privacyTitle,
    description: dict.meta.privacyDescription,
    alternates: { canonical: `${SITE.url}/privacidad` },
    openGraph: {
      title: dict.meta.privacyTitle,
      description: dict.meta.privacyDescription,
      url: `${SITE.url}/privacidad`,
      siteName: SITE.name,
      locale,
      type: "website",
    },
  };
}

/** Sustituye los huecos `{email}` de los textos por el correo real. */
function fill(html: string): string {
  return html.replace(/\{email\}/g, SITE.email);
}

export default async function PrivacyPage() {
  const locale = await readLocale();
  const dict = getDict(locale);
  const p = dict.privacy;

  const updated = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(
    new Date(LAST_UPDATED),
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: p.title.replace(/<[^>]+>/g, " ").trim(),
    url: `${SITE.url}/privacidad`,
    inLanguage: locale,
    dateModified: LAST_UPDATED,
    about: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="wrap page-hero reveal">
        <p className="eyebrow">
          <span className="dot" />
          {p.eyebrow}
        </p>
        <h1 dangerouslySetInnerHTML={{ __html: p.title }} />
        <p>{p.lead}</p>
        <p className="legal__meta">
          {p.updated}: <time dateTime={LAST_UPDATED}>{updated}</time>
        </p>
      </section>

      <section className="wrap legal" style={{ paddingBottom: 96 }}>
        <p className="legal__note">
          <IconShield /> {p.informativeNote}
        </p>

        <nav className="legal__toc" aria-label={p.tocTitle}>
          <h2 className="legal__toc-title">{p.tocTitle}</h2>
          <ol>
            {p.groups.map((group, i) => (
              <li key={group.title}>
                <a href={`#privacidad-${i + 1}`}>{group.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        {p.groups.map((group, i) => (
          <section className="legal__group" id={`privacidad-${i + 1}`} key={group.title}>
            <h2>{group.title}</h2>
            <div className="faq">
              {group.items.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p dangerouslySetInnerHTML={{ __html: fill(item.a) }} />
                </details>
              ))}
            </div>
          </section>
        ))}
      </section>

      <section className="wrap" style={{ paddingBottom: 96 }}>
        <div className="cta">
          <div>
            <p className="eyebrow">
              <span className="dot" />
              {p.eyebrow}
            </p>
            <h2>{p.contact.title}</h2>
            <p>
              {p.contact.text} <strong>{SITE.email}</strong>
            </p>
          </div>
          <ContactButton>
            {p.contact.button} <IconArrowUpRight />
          </ContactButton>
        </div>
      </section>
    </>
  );
}
