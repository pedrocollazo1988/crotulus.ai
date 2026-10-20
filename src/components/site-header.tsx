"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/i18n";
import type { SearchEntry } from "@/lib/search";
import { BrandMark } from "./brand-mark";
import { ContactButton } from "./contact-provider";
import { IconClose, IconMenu } from "./icons";
import { LocaleSwitcher } from "./locale-switcher";
import { SiteSearch } from "./site-search";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader({
  dict,
  locale,
  entries,
}: {
  dict: Dict;
  locale: Locale;
  entries: SearchEntry[];
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const links = [
    { href: "/#soluciones", label: dict.nav.solutions },
    { href: "/#como", label: dict.nav.process },
    { href: "/#preguntas", label: dict.nav.faq },
    { href: "/equipo", label: dict.nav.team },
  ];

  return (
    <header className="site-header">
      <nav className="wrap nav" aria-label={dict.a11y.mainNav}>
        <Link className="brand" href="/" aria-label={dict.a11y.logoAlt}>
          <span className="brand__mark">
            <BrandMark />
          </span>
          <span className="brand__text">
            <span className="brand__name">{dict.brand.name}</span>
            <span className="brand__sub">{dict.brand.sub}</span>
          </span>
        </Link>

        <div className={`nav__links${menuOpen ? " open" : ""}`} id="nav-links">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <ContactButton className="button button--sm">{dict.nav.contact}</ContactButton>
        </div>

        <div className="nav__tools">
          <SiteSearch
            entries={entries}
            labels={{
              placeholder: dict.search.placeholder,
              hint: dict.search.hint,
              empty: dict.search.empty,
              tryOther: dict.search.tryOther,
              search: dict.a11y.search,
              close: dict.a11y.searchClose,
              groupPages: dict.search.groupPages,
              groupSections: dict.search.groupSections,
              groupTeam: dict.search.groupTeam,
              groupFaq: dict.search.groupFaq,
            }}
          />
          <LocaleSwitcher locale={locale} label={dict.a11y.langLabel} />
          <ThemeToggle labels={{ light: dict.a11y.themeLight, dark: dict.a11y.themeDark }} />
          <button
            type="button"
            className="icon-btn mobile-toggle"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
            aria-label={menuOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </nav>
      <div
        className={`menu-backdrop${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />
    </header>
  );
}
