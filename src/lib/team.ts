import { DEFAULT_LOCALE, type Locale } from "@/i18n";

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string | null;
  linkedin: string | null;
  email: string | null;
  order: number;
};

type RawMember = {
  name: string;
  photo: string;
  role: string;
  roleEn: string;
  rolePt: string;
  bio: string;
  bioEn: string;
  bioPt: string;
};

/**
 * Equipo de C-ROTULUS. Los nombres propios no se traducen; el puesto y la
 * biografia si. Las fotos viven en `public/team` (retrato 4:5, 800x1000).
 */
const TEAM: RawMember[] = [
  {
    name: "Pedro Luis Collazo Abreu",
    photo: "/team/pedro-luis-collazo-abreu.jpg",
    role: "CEO",
    roleEn: "CEO",
    rolePt: "CEO",
    bio: "Dirige la estrategia de cada proyecto y mantiene la conversación con el negocio: qué problema resolvemos, para qué y cómo lo mediremos.",
    bioEn:
      "Sets the strategy for every project and keeps the conversation with the business: which problem we solve, what for and how we will measure it.",
    bioPt:
      "Define a estratégia de cada projeto e mantém a conversa com o negócio: que problema resolvemos, para quê e como o vamos medir.",
  },
  {
    name: "Olga Lidia Romero Fernández",
    photo: "/team/olga-lidia-romero-fernandez.jpg",
    role: "Especialista en IA",
    roleEn: "AI specialist",
    rolePt: "Especialista em IA",
    bio: "Diseña y prueba los agentes de IA: qué hacen, con qué datos trabajan y cuándo deben pedir ayuda a una persona.",
    bioEn:
      "Designs and tests the AI agents: what they do, which data they work with and when they must ask a person for help.",
    bioPt:
      "Desenha e testa os agentes de IA: o que fazem, com que dados trabalham e quando devem pedir ajuda a uma pessoa.",
  },
  {
    name: "Rogelio Alejandro Crespo Romero",
    photo: "/team/rogelio-alejandro-crespo-romero.jpg",
    role: "Especialista en IA",
    roleEn: "AI specialist",
    rolePt: "Especialista em IA",
    bio: "Conecta los agentes con las herramientas del negocio y cuida de que la información circule de forma segura.",
    bioEn:
      "Connects the agents to the business tools and makes sure information flows safely.",
    bioPt:
      "Liga os agentes às ferramentas do negócio e garante que a informação circula de forma segura.",
  },
  {
    name: "Manuel Alejandro Porteiro Fernández",
    photo: "/team/manuel-alejandro-porteiro-fernandez.jpg",
    role: "Especialista en Marketing",
    roleEn: "Marketing specialist",
    rolePt: "Especialista em Marketing",
    bio: "Pone las soluciones en marcha y ajusta los detalles para que encajen en el día a día del equipo.",
    bioEn:
      "Puts the solutions live and fine-tunes the details so they fit the team's day-to-day work.",
    bioPt:
      "Põe as soluções em funcionamento e ajusta os detalhes para que encaixem no dia a dia da equipa.",
  },
];

/** "Ana Perez" -> "ana-perez". Se usa como ancla dentro de /equipo. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function pick(locale: Locale, es: string, en: string, pt: string) {
  if (locale === "en") return en;
  if (locale === "pt") return pt;
  return es;
}

/**
 * Miembros del equipo en el orden de presentacion. El contenido es estatico
 * (codigo) para que las fotos y las fichas funcionen sin depender de la base
 * de datos en el despliegue.
 */
export async function getTeamMembers(locale: Locale = DEFAULT_LOCALE): Promise<TeamMember[]> {
  return TEAM.map((member, i) => ({
    id: slugify(member.name),
    slug: slugify(member.name),
    name: member.name,
    role: pick(locale, member.role, member.roleEn, member.rolePt),
    bio: pick(locale, member.bio, member.bioEn, member.bioPt),
    photoUrl: member.photo,
    linkedin: null,
    email: null,
    order: i + 1,
  }));
}
