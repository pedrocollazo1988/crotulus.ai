import type { Locale } from "@/i18n";

/**
 * Banderas dibujadas con CSS (sin imagenes externas: funcionan sin red y sin
 * problemas de licencia). Cada una es un <span> con un fondo.
 */
export function Flag({ locale, className = "" }: { locale: Locale; className?: string }) {
  return (
    <span
      className={`flag ${className}`}
      style={FLAG_STYLE[locale]}
      role="img"
      aria-label={ARIA[locale]}
    />
  );
}

const ARIA: Record<Locale, string> = {
  es: "España",
  en: "Reino Unido",
  pt: "Portugal",
};

const FLAG_STYLE: Record<Locale, React.CSSProperties> = {
  // Rojo-amarillo-rojo (bandas horizontales 1:2:1)
  es: {
    background:
      "linear-gradient(to bottom, #c60b1e 0 25%, #ffc400 25% 75%, #c60b1e 75% 100%)",
  },
  // Union Jack simplificado
  en: {
    background:
      "linear-gradient(45deg, transparent 45%, #fff 45% 55%, transparent 55%), linear-gradient(-45deg, transparent 45%, #fff 45% 55%, transparent 55%), linear-gradient(to bottom, #012169 0 50%, #C8102E 50% 100%)",
  },
  // Verde-rojo (bandas verticales 2:3)
  pt: {
    background:
      "linear-gradient(to right, #046A38 0 40%, #DA291C 40% 100%)",
  },
};
