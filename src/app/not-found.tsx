import Link from "next/link";
import { getDict } from "@/i18n";
import { readLocale } from "@/lib/locale";

export default async function NotFound() {
  const locale = await readLocale();
  const dict = getDict(locale);

  return (
    <section className="wrap page-hero" style={{ paddingBottom: 120, textAlign: "center" }}>
      <p className="eyebrow" style={{ justifyContent: "center" }}>
        <span className="dot" />
        404
      </p>
      <h1>{dict.notFound.title}</h1>
      <p style={{ margin: "0 auto" }}>{dict.notFound.text}</p>
      <Link className="button" href="/" style={{ marginTop: 24 }}>
        {dict.notFound.cta}
      </Link>
    </section>
  );
}
