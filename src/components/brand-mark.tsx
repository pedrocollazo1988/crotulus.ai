import type { SVGProps } from "react";

/**
 * Marca de C-ROTULUS: la "C" con el punto turquesa.
 * El trazo usa `currentColor` para heredar el color de `.brand__mark`; el punto
 * mantiene el turquesa de marca. Las coordenadas son las del `favicon.svg`, así
 * que el dibujo coincide con el icono de la pestaña del navegador.
 */
export function BrandMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path
        d="M40 16 A17 17 0 1 0 40 48"
        fill="none"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="24" cy="32" r="3.2" fill="#5FA8C9" />
    </svg>
  );
}
