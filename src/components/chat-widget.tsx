import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Widget de chat de CreatuAgente. El propio script se inyecta el boton
 * flotante (abajo a la derecha) y el panel, asi que aqui solo se carga.
 */
export function ChatWidget() {
  if (!SITE.chatWidget) return null;

  return <Script src={SITE.chatWidget} strategy="afterInteractive" />;
}
