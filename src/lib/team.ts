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
    role: "CEO · Estrategia y dirección de proyectos de IA",
    roleEn: "CEO · AI Strategy and Project Leadership",
    rolePt: "CEO · Estratégia e direção de projetos de IA",
    bio: "Combina estrategia comercial, dirección tecnológica y coordinación de proyectos para conectar las necesidades de cada cliente con soluciones prácticas de inteligencia artificial y automatización.",
    bioEn:
      "Combines business strategy, technology leadership and project coordination to connect each client's needs with practical AI and automation solutions.",
    bioPt:
      "Combina estratégia comercial, direção tecnológica e coordenação de projetos para ligar as necessidades de cada cliente a soluções práticas de inteligência artificial e automação.",
  },
  {
    name: "Olga Lidia Romero Fernández",
    photo: "/team/olga-lidia-romero-fernandez.jpg",
    role: "Especialista en Soluciones de IA y Automatización",
    roleEn: "AI Solutions and Automation Specialist",
    rolePt: "Especialista em Soluções de IA e Automação",
    bio: "Desarrolla agentes de inteligencia artificial, asistentes conversacionales y automatizaciones que conectan herramientas digitales para reducir tareas manuales, agilizar procesos y mejorar la atención al cliente.",
    bioEn:
      "Develops AI agents, conversational assistants and automations that connect digital tools to reduce manual work, streamline processes and improve customer service.",
    bioPt:
      "Desenvolve agentes de inteligência artificial, assistentes conversacionais e automações que ligam ferramentas digitais para reduzir tarefas manuais, agilizar processos e melhorar o atendimento ao cliente.",
  },
  {
    name: "Rogelio Alejandro Crespo Romero",
    photo: "/team/rogelio-alejandro-crespo-romero.jpg",
    role: "Especialista en Desarrollo e Implementación de Soluciones de IA",
    roleEn: "AI Solutions Development and Implementation Specialist",
    rolePt: "Especialista em Desenvolvimento e Implementação de Soluções de IA",
    bio: "Participa en el desarrollo, la integración y la implementación de soluciones tecnológicas, incluyendo su configuración, pruebas y optimización para adaptarlas a los requisitos de cada proyecto.",
    bioEn:
      "Contributes to the development, integration and implementation of technology solutions, including configuration, testing and optimization to meet each project's requirements.",
    bioPt:
      "Participa no desenvolvimento, integração e implementação de soluções tecnológicas, incluindo a sua configuração, testes e otimização para responder aos requisitos de cada projeto.",
  },
  {
    name: "Manuel Alejandro Porteiro Fernández",
    photo: "/team/manuel-alejandro-porteiro-fernandez.jpg",
    role: "Especialista en Marketing Digital y Estrategias de Crecimiento",
    roleEn: "Digital Marketing and Growth Strategy Specialist",
    rolePt: "Especialista em Marketing Digital e Estratégias de Crescimento",
    bio: "Desarrolla estrategias de marketing digital, posicionamiento de marca, contenidos y campañas para atraer clientes, incorporando herramientas de inteligencia artificial y automatización para agilizar las actividades comerciales.",
    bioEn:
      "Develops digital marketing, brand positioning, content and campaign strategies to attract customers, incorporating AI and automation tools to streamline marketing activities.",
    bioPt:
      "Desenvolve estratégias de marketing digital, posicionamento de marca, conteúdos e campanhas para atrair clientes, incorporando ferramentas de inteligência artificial e automação para agilizar as atividades comerciais.",
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
