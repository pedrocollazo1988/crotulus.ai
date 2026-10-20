import { PrismaClient } from "@prisma/client";

// En desarrollo Next recarga los modulos en caliente: sin cachear el cliente en
// globalThis se abriria un pool de conexiones nuevo en cada recarga.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
