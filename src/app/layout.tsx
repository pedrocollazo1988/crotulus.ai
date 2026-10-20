import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { readLocale } from "@/lib/locale";
import { buildSearchIndex } from "@/lib/search";
import { SITE } from "@/lib/site";
import { getTeamMembers } from "@/lib/team";
import { ContactProvider } from "@/components/contact-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await readLocale();
  const dict = getDict(locale);
  return {
    metadataBase: new URL(SITE.url),
    title: dict.meta.title,
    description: dict.meta.description,
    icons: { icon: "/favicon.svg" },
    alternates: { canonical: SITE.url },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: SITE.url,
      siteName: SITE.name,
      locale,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await readLocale();
  const dict = getDict(locale);
  const team = await getTeamMembers(locale);
  const entries = buildSearchIndex(dict, locale, team);

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Modo noche antes del primer pintado para evitar el destello blanco. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("crotulus_theme");var d=window.matchMedia("(prefers-color-scheme: dark)").matches;var v=t||(d?"dark":"light");if(v==="dark"){document.documentElement.classList.add("theme-dark");document.documentElement.style.colorScheme="dark";}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {dict.a11y.skip}
        </a>
        <ContactProvider dict={dict.contact} locale={locale} email={SITE.email}>
          <SiteHeader dict={dict} locale={locale} entries={entries} />
          <main id="main">{children}</main>
          <SiteFooter dict={dict} />
        </ContactProvider>
      </body>
    </html>
  );
}
