import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminEnabled, adminToken, passwordOk } from "@/lib/admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!adminEnabled()) {
    return NextResponse.json({ error: "El panel está deshabilitado." }, { status: 404 });
  }

  const form = await request.formData();
  const password = String(form.get("password") || "");
  if (!passwordOk(password)) {
    return NextResponse.redirect(new URL("/admin/contactos?error=1", request.url), 303);
  }

  const response = NextResponse.redirect(new URL("/admin/contactos", request.url), 303);
  response.cookies.set(ADMIN_COOKIE, adminToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return response;
}
