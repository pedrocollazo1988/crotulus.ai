/** Datos de contacto y direccion del sitio (una sola fuente de verdad). */
export const SITE = {
  name: "C-ROTULUS IA",
  legalName: "C-ROTULUS S.U.R.L.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://crotulus.ai").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "crotulus.mipyme@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "+5359888821",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "",
  /** Redes sociales (vacio = no se muestra el enlace). */
  social: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/comrotulussurl",
    facebook:
      process.env.NEXT_PUBLIC_FACEBOOK ||
      "https://www.facebook.com/com.rotulus.surl/?locale=es_LA",
  },
  /** Widget de chat de CreatuAgente (vacio = no se carga). */
  chatWidget:
    process.env.NEXT_PUBLIC_CHAT_WIDGET_URL ||
    "https://api.creatuagente.io/widget/cmv8ia68j0f3j0bs6190merf8/widget-profile.js",
} as const;

export function whatsappHref(message?: string): string | null {
  const digits = SITE.whatsapp.replace(/[^\d]/g, "");
  if (!digits) return null;
  const text = message?.trim();
  return text
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${digits}`;
}

/** Numero de WhatsApp en formato legible (+53 5988 8821). */
export function whatsappLabel(): string {
  const d = SITE.whatsapp.replace(/[^\d]/g, "");
  if (!d) return "";
  if (d.length === 10 && d.startsWith("53")) {
    return `+${d.slice(0, 2)} ${d.slice(2, 6)} ${d.slice(6)}`;
  }
  return SITE.whatsapp;
}
