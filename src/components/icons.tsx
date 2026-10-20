import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  "aria-hidden": true,
};

export const IconSearch = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const IconSun = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const IconMoon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
  </svg>
);

export const IconGlobe = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const IconClose = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="m5 13 4.5 4.5L19 7" />
  </svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const IconArrowUp = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
);

export const IconArrowDown = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </svg>
);

export const IconChat = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M20 15a3 3 0 0 1-3 3H9l-5 3V7a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3Z" />
    <path d="M8 9h8M8 13h5" />
  </svg>
);

export const IconGrowth = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M4 19h16M6 15l5-5 4 3 6-8M16 5h5v5" />
  </svg>
);

export const IconFlow = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="3" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" />
    <path d="M10 6.5h4a3 3 0 0 1 3 3v4M14 17.5h-4a3 3 0 0 1-3-3v-4" />
  </svg>
);

export const IconScan = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m16 16 5 5M8 11h6M11 8v6" />
  </svg>
);

export const IconBuild = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="6" y="6" width="12" height="12" rx="3" />
    <path d="M10 2v4M14 2v4M10 18v4M14 18v4M2 10h4M2 14h4M18 10h4M18 14h4" />
    <path d="m9.5 12 2 2 3.5-4" />
  </svg>
);

export const IconLaunch = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M11 15 7 11c3-5 7-7 13-7 0 6-2 10-7 13l-4-4M7 11H4l-1 7 7-1M14 17v3l-7 1 1-7" />
    <circle cx="15" cy="8" r="1.6" />
  </svg>
);

export const IconUsers = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.2" />
    <path d="M3 20a6 6 0 0 1 12 0M16 5.5a3 3 0 0 1 0 5.6M17 20a5.6 5.6 0 0 0-2-4.2" />
  </svg>
);

export const IconHeart = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7-4.4-7-9.3A4.2 4.2 0 0 1 12 7.6a4.2 4.2 0 0 1 7 3.1C19 15.6 12 20 12 20Z" />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const IconTarget = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="12" cy="12" r="0.6" />
  </svg>
);

export const IconMail = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

export const IconPhone = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 5 5L15 12l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
  </svg>
);

export const IconPin = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const IconSpark = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
    <path d="M18.5 16.5 19 18l1.5.5L19 19l-.5 1.5L18 19l-1.5-.5L18 18Z" />
  </svg>
);

export const IconLink = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M10 13a5 5 0 0 0 7 0l2-2a5 5 0 0 0-7-7l-1 1" />
    <path d="M14 11a5 5 0 0 0-7 0l-2 2a5 5 0 0 0 7 7l1-1" />
  </svg>
);

export const IconDocument = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 3h8l4 4v14H6Z" />
    <path d="M14 3v4h4M9 12h6M9 16h6" />
  </svg>
);
