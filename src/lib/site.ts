/** Datos de contacto y direccion del sitio (una sola fuente de verdad). */
export const SITE = {
  name: "C-ROTULUS IA",
  legalName: "C-ROTULUS S.U.R.L.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://crotulus.ai").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "crotulus.mipyme@gmail.com",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "",
  /** Widget de chat de CreatuAgente (vacio = no se carga). */
  chatWidget:
    process.env.NEXT_PUBLIC_CHAT_WIDGET_URL ||
    "https://api.creatuagente.io/widget/cmv8ia68j0f3j0bs6190merf8/widget-profile.js",
} as const;

export function whatsappHref(message: string): string | null {
  const digits = SITE.whatsapp.replace(/[^\d]/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
