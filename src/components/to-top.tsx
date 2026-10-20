"use client";

import { useEffect, useState } from "react";
import { IconArrowUp } from "./icons";

export function ToTop({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 600);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      className="to-top"
      data-visible={visible}
      onClick={() => window.scrollTo({ top: 0 })}
      aria-label={label}
      title={label}
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
    >
      <IconArrowUp />
    </button>
  );
}
