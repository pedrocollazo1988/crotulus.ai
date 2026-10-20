import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Equipo inicial. Refleja las fichas que la web muestra en la portada y en
 * /equipo. Las fotos viven en `public/team` (retrato 4:5, 800x1000).
 */
const TEAM = [
  {
    name: "Pedro Luis Collazo Abreu",
    role: "CEO",
    bio: "Dirige la estrategia de cada proyecto y mantiene la conversación con el negocio: qué problema resolvemos, para qué y cómo lo mediremos.",
    roleEn: "CEO",
    bioEn:
      "Sets the strategy for every project and keeps the conversation with the business: which problem we solve, what for and how we will measure it.",
    rolePt: "CEO",
    bioPt:
      "Define a estratégia de cada projeto e mantém a conversa com o negócio: que problema resolvemos, para quê e como o vamos medir.",
    photo: "/team/pedro-luis-collazo-abreu.jpg",
    order: 1,
  },
  {
    name: "Olga Lidia Romero Fernández",
    role: "Especialista en IA",
    bio: "Diseña y prueba los agentes de IA: qué hacen, con qué datos trabajan y cuándo deben pedir ayuda a una persona.",
    roleEn: "AI specialist",
    bioEn:
      "Designs and tests the AI agents: what they do, which data they work with and when they must ask a person for help.",
    rolePt: "Especialista em IA",
    bioPt:
      "Desenha e testa os agentes de IA: o que fazem, com que dados trabalham e quando devem pedir ajuda a uma pessoa.",
    photo: "/team/olga-lidia-romero-fernandez.jpg",
    order: 2,
  },
  {
    name: "Rogelio Alejandro Crespo Romero",
    role: "Especialista en IA",
    bio: "Conecta los agentes con las herramientas del negocio y cuida de que la información circule de forma segura.",
    roleEn: "AI specialist",
    bioEn:
      "Connects the agents to the business tools and makes sure information flows safely.",
    rolePt: "Especialista em IA",
    bioPt:
      "Liga os agentes às ferramentas do negócio e garante que a informação circula de forma segura.",
    photo: "/team/rogelio-alejandro-crespo-romero.jpg",
    order: 3,
  },
  {
    name: "Manuel Alejandro Porteiro Fernández",
    role: "Especialista en IA",
    bio: "Pone las soluciones en marcha y ajusta los detalles para que encajen en el día a día del equipo.",
    roleEn: "AI specialist",
    bioEn:
      "Puts the solutions live and fine-tunes the details so they fit the team's day-to-day work.",
    rolePt: "Especialista em IA",
    bioPt:
      "Põe as soluções em funcionamento e ajusta os detalhes para que encaixem no dia a dia da equipa.",
    photo: "/team/manuel-alejandro-porteiro-fernandez.jpg",
    order: 4,
  },
];

async function main() {
  const count = await prisma.teamMember.count();
  if (count > 0) {
    // Rellena las traducciones que falten sin tocar los textos ya editados.
    for (const member of TEAM) {
      const { name, roleEn, bioEn, rolePt, bioPt } = member;
      const filled = await prisma.teamMember.updateMany({
        where: { name, roleEn: null },
        data: { roleEn, bioEn, rolePt, bioPt },
      });
      if (filled.count > 0) {
        console.log(`[seed] traducciones añadidas a "${name}".`);
      }
    }
    console.log(`[seed] ya hay ${count} miembros del equipo; no se duplican.`);
    return;
  }
  for (const member of TEAM) {
    await prisma.teamMember.create({ data: member });
  }
  console.log(`[seed] ${TEAM.length} miembros del equipo creados.`);
}

main()
  .catch((err) => {
    console.error("[seed] error:", err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
