import Link from "next/link";
import type { Dict } from "@/i18n";
import { SITE } from "@/lib/site";
import { BrandLogo } from "./brand-logo";
import { ContactButton } from "./contact-provider";
import { IconMail, IconPhone, IconPin } from "./icons";

export function SiteFooter({ dict }: { dict: Dict }) {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link className="brand" href="/" aria-label={dict.a11y.logoAlt}>
              <BrandLogo withTagline className="brand-logo brand-logo--footer" />
            </Link>
            <p>{dict.footer.tagline}</p>
          </div>

          <div className="footer__nav">
            <div className="footer__col">
              <h3>{dict.footer.linksTitle}</h3>
              <Link href="/#soluciones">{dict.nav.solutions}</Link>
              <Link href="/#como">{dict.nav.process}</Link>
              <Link href="/#preguntas">{dict.nav.faq}</Link>
              <Link href="/equipo">{dict.nav.team}</Link>
            </div>

            <div className="footer__col">
              <h3>{dict.contact.eyebrow}</h3>
              <a href={`mailto:${SITE.email}`} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <IconMail style={{ width: 15, height: 15 }} /> {SITE.email}
              </a>
              {SITE.phone && (
                <a href={`tel:${SITE.phone}`} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <IconPhone style={{ width: 15, height: 15 }} /> {SITE.phone}
                </a>
              )}
              {SITE.address && (
                <p style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <IconPin style={{ width: 15, height: 15 }} /> {SITE.address}
                </p>
              )}
              <ContactButton className="button button--sm" >
                {dict.nav.contact}
              </ContactButton>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {year} {dict.footer.legal}. {dict.footer.rights}
          </span>
          <span>{SITE.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    </footer>
  );
}
