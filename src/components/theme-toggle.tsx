"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "./icons";

type Theme = "light" | "dark";

export function ThemeToggle({ labels }: { labels: { light: string; dark: string } }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("theme-dark");
    setTheme(isDark ? "dark" : "light");
    setReady(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("theme-dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("crotulus_theme", next);
    } catch {
      /* almacenamiento no disponible */
    }
  }

  const label = theme === "dark" ? labels.dark : labels.light;

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={theme === "dark"}
    >
      {ready && theme === "dark" ? <IconSun /> : <IconMoon />}
    </button>
  );
}
