import type { MetadataRoute } from "next";
import { LOCALES } from "@/i18n";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/?lang=${l}`]));

  return [
    {
      url: SITE.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages },
    },
    {
      url: `${SITE.url}/equipo`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, `${SITE.url}/equipo?lang=${l}`])),
      },
    },
  ];
}
