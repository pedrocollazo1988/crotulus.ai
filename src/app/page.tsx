import { getDict } from "@/i18n";
import { readLocale } from "@/lib/locale";
import { SITE } from "@/lib/site";
import { CtaBand, Faq, Process } from "@/components/home-bottom";
import { Hero, Problems, Strip } from "@/components/home-top";
import { SolutionsDemo } from "@/components/solutions-demo";

export default async function HomePage() {
  const locale = await readLocale();
  const dict = getDict(locale);

  // JSON-LD: ayuda a Google a entender la organizacion y las preguntas.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE.legalName,
        alternateName: SITE.name,
        url: SITE.url,
        email: SITE.email,
      },
      {
        "@type": "FAQPage",
        mainEntity: dict.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero dict={dict} />
      <Strip dict={dict} />
      <Problems dict={dict} />
      <SolutionsDemo dict={dict} />
      <Process dict={dict} />
      <Faq dict={dict} />
      <CtaBand dict={dict} />
    </>
  );
}
