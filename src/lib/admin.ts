import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";

const COOKIE = "crotulus_admin";

export function adminEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function secret(): string {
  return process.env.ADMIN_PASSWORD || "";
}

/** Firma simple: el panel no necesita sesiones persistentes ni usuarios. */
function token(): string {
  return createHmac("sha256", "crotulus-panel").update(secret()).digest("hex");
}

export function passwordOk(candidate: string): boolean {
  if (!adminEnabled()) return false;
  const a = Buffer.from(candidate);
  const b = Buffer.from(secret());
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdmin(): Promise<boolean> {
  if (!adminEnabled()) return false;
  const store = await cookies();
  return store.get(COOKIE)?.value === token();
}

export const ADMIN_COOKIE = COOKIE;
export const adminToken = token;
