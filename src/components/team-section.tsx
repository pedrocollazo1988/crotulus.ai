import Link from "next/link";
import type { Dict } from "@/i18n";
import type { TeamMember } from "@/lib/team";
import { IconArrowUpRight, IconUsers } from "./icons";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/**
 * Seccion "Equipo" de la portada: las mismas fichas que /equipo, en formato
 * compacto, con el ancla #equipo a la que apunta el menu.
 */
export function TeamSection({ dict, team }: { dict: Dict; team: TeamMember[] }) {
  return (
    <section className="wrap section section--pale" id="equipo">
      <p className="eyebrow">
        <span className="dot" />
        {dict.team.eyebrow}
      </p>
      <div className="heading">
        <h2 dangerouslySetInnerHTML={{ __html: dict.team.title }} />
        <p>{dict.team.lead}</p>
      </div>

      {team.length === 0 ? (
        <p className="section__lead team__empty">
          <IconUsers /> {dict.team.empty}
        </p>
      ) : (
        <div className="team-grid team-grid--compact">
          {team.map((person) => (
            <article className="member" key={person.id}>
              <div className="member__photo">
                {person.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={person.photoUrl}
                    alt={person.name}
                    width={800}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span aria-hidden="true">{initials(person.name)}</span>
                )}
              </div>
              <div className="member__body">
                <h3 className="member__name">{person.name}</h3>
                <p className="member__role">{person.role}</p>
              </div>
            </article>
          ))}
        </div>
      )}

      <p className="team__more">
        <Link className="button button--secondary button--sm" href="/equipo">
          {dict.team.more} <IconArrowUpRight />
        </Link>
      </p>
    </section>
  );
}
