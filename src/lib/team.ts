import { DEFAULT_LOCALE, type Locale } from "@/i18n";
import { prisma } from "./prisma";

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

/** "Ana Perez" -> "ana-perez". Se usa como ancla dentro de /equipo. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Miembros del equipo desde la base de datos. Si la tabla esta vacia (o la
 * base de datos no responde) la pagina muestra su estado vacio, nunca un error.
 */
export async function getTeamMembers(locale: Locale = DEFAULT_LOCALE): Promise<TeamMember[]> {
  try {
    const rows = await prisma.teamMember.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    });
    return rows.map((row) => ({
      id: row.id,
      slug: slugify(row.name),
      name: row.name,
      // El nombre propio no se traduce; el puesto y la biografia si, con
      // respaldo al texto en espanol cuando falta la traduccion.
      role: pick(locale, row.role, row.roleEn, row.rolePt),
      bio: pick(locale, row.bio, row.bioEn, row.bioPt),
      photoUrl: row.photo,
      linkedin: row.linkedin,
      email: row.email,
      order: row.order,
    }));
  } catch (err) {
    console.error("[team] no se pudo leer la base de datos:", err);
    return [];
  }
}

function pick(locale: Locale, es: string, en?: string | null, pt?: string | null) {
  if (locale === "en") return en || es;
  if (locale === "pt") return pt || es;
  return es;
}
