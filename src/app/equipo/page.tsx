import type { Metadata } from "next";
import { getDict } from "@/i18n";
import { readLocale } from "@/lib/locale";
import { SITE } from "@/lib/site";
import { getTeamMembers, type TeamMember } from "@/lib/team";
import { ContactButton } from "@/components/contact-provider";
import {
  IconArrowUpRight,
  IconHeart,
  IconLink,
  IconMail,
  IconShield,
  IconTarget,
  IconUsers,
} from "@/components/icons";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await readLocale();
  const dict = getDict(locale);
  return {
    title: dict.meta.teamTitle,
    description: dict.meta.teamDescription,
    alternates: { canonical: `${SITE.url}/equipo` },
    openGraph: {
      title: dict.meta.teamTitle,
      description: dict.meta.teamDescription,
      url: `${SITE.url}/equipo`,
      siteName: SITE.name,
      locale,
      type: "website",
    },
  };
}

const VALUE_ICONS = [IconHeart, IconTarget, IconShield];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function MemberCard({ person }: { person: TeamMember }) {
  return (
    <article className="member" id={person.slug}>
      <div className="member__photo">
        {person.photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={person.photoUrl} alt={person.name} loading="lazy" />
        ) : (
          <span aria-hidden="true">{initials(person.name)}</span>
        )}
      </div>
      <div className="member__body">
        <h3 className="member__name">{person.name}</h3>
        <p className="member__role">{person.role}</p>
        {(person.linkedin || person.email) && (
          <div className="member__links">
            {person.linkedin && (
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer">
                <IconLink /> LinkedIn
              </a>
            )}
            {person.email && (
              <a href={`mailto:${person.email}`}>
                <IconMail /> Email
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default async function TeamPage() {
  const locale = await readLocale();
  const dict = getDict(locale);
  const team = await getTeamMembers(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: dict.meta.teamTitle,
    url: `${SITE.url}/equipo`,
    about: {
      "@type": "Organization",
      name: SITE.legalName,
      url: SITE.url,
      member: team.map((person) => ({
        "@type": "Person",
        name: person.name,
        jobTitle: person.role,
        description: person.bio,
      })),
    },
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
          {dict.team.eyebrow}
        </p>
        <h1 dangerouslySetInnerHTML={{ __html: dict.team.title }} />
        <p>{dict.team.lead}</p>
      </section>

      <section className="wrap" style={{ paddingBottom: 96 }}>
        {team.length === 0 ? (
          <p className="section__lead" style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <IconUsers /> {dict.team.empty}
          </p>
        ) : (
          <div className="team-grid">
            {team.map((person) => (
              <MemberCard key={person.id} person={person} />
            ))}
          </div>
        )}
      </section>

      <section className="wrap section section--pale">
        <p className="eyebrow">
          <span className="dot" />
          {dict.team.valuesEyebrow}
        </p>
        <h2>{dict.team.valuesTitle}</h2>
        <div className="values">
          {dict.team.values.map((value, i) => {
            const Icon = VALUE_ICONS[i] ?? IconHeart;
            return (
              <article className="value-card" key={value.title}>
                <span className="value-card__icon">
                  <Icon />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 72, paddingBottom: 96 }}>
        <div className="fit">
          <p>
            <strong>{dict.team.joinTitle}</strong>
            <span>{dict.team.joinText}</span>
          </p>
          <a className="button button--sm" href={`mailto:${SITE.email}`}>
            {dict.team.joinCta} <IconArrowUpRight />
          </a>
        </div>

        <div className="cta" style={{ marginTop: 28 }}>
          <div>
            <p className="eyebrow">
              <span className="dot" />
              {dict.team.ctaEyebrow}
            </p>
            <h2>{dict.team.ctaTitle}</h2>
            <p>{SITE.email}</p>
          </div>
          <ContactButton>
            {dict.team.ctaButton} <IconArrowUpRight />
          </ContactButton>
        </div>
      </section>
    </>
  );
}
