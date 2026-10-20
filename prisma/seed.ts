import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Equipo inicial. El propietario puede editar estos datos en la base de datos
 * (o en Prisma Studio) sin tocar el codigo.
 */
const TEAM = [
  {
    name: "Pedro Collazo",
    role: "Fundador y dirección",
    bio: "Define la estrategia de cada proyecto y mantiene la conversación con el negocio: qué problema resolvemos, para qué y cómo lo mediremos.",
    roleEn: "Founder and direction",
    bioEn:
      "Sets the strategy for every project and keeps the conversation with the business: which problem we solve, what for and how we will measure it.",
    rolePt: "Fundador e direção",
    bioPt:
      "Define a estratégia de cada projeto e mantém a conversa com o negócio: que problema resolvemos, para quê e como o vamos medir.",
    order: 1,
  },
  {
    name: "Equipo de agentes",
    role: "Diseño e ingeniería de IA",
    bio: "Diseñamos, construimos y probamos los agentes: qué hacen, con qué herramientas se conectan y cuándo deben pedir ayuda a una persona.",
    roleEn: "AI design and engineering",
    bioEn:
      "We design, build and test the agents: what they do, which tools they connect to and when they must ask a person for help.",
    rolePt: "Desenho e engenharia de IA",
    bioPt:
      "Desenhamos, construímos e testamos os agentes: o que fazem, com que ferramentas se ligam e quando devem pedir ajuda a uma pessoa.",
    order: 2,
  },
  {
    name: "Acompañamiento",
    role: "Puesta en marcha y soporte",
    bio: "Acompañamos la implantación, formamos a tu equipo y revisamos los resultados para que la solución siga encajando con tu día a día.",
    roleEn: "Rollout and support",
    bioEn:
      "We support the rollout, train your team and review the results so the solution keeps fitting your day-to-day work.",
    rolePt: "Implementação e suporte",
    bioPt:
      "Acompanhamos a implementação, formamos a tua equipa e revemos os resultados para que a solução continue a encaixar no teu dia a dia.",
    order: 3,
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
