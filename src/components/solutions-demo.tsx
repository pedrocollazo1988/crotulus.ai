"use client";

import { useState } from "react";
import type { Dict } from "@/i18n";
import { IconArrowUpRight, IconChat, IconFlow, IconGrowth, IconLink } from "./icons";

const TAB_ICONS = [IconChat, IconGrowth, IconFlow];

/**
 * Demostracion interactiva de los agentes. Solo cambia de panel en el cliente;
 * todo el texto viene ya traducido desde el servidor.
 */
export function SolutionsDemo({ dict }: { dict: Dict }) {
  const [active, setActive] = useState(0);
  const s = dict.solutions;
  const tab = s.tabs[active] ?? s.tabs[0];

  return (
    <section className="wrap section section--pale" id="soluciones">
      <div className="demo">
        <div>
          <p className="eyebrow">
            <span className="dot" />
            {s.eyebrow}
          </p>
          <h2 dangerouslySetInnerHTML={{ __html: s.title }} />
          <p className="section__lead">{s.lead}</p>

          <div className="tabs" role="tablist" aria-label={s.eyebrow}>
            {s.tabs.map((item, i) => {
              const Icon = TAB_ICONS[i] ?? IconChat;
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${item.id}`}
                  className={`tab${selected ? " active" : ""}`}
                  onClick={() => setActive(i)}
                >
                  <span>
                    <Icon />
                  </span>
                  <span>
                    <b>{item.title}</b>
                    <small>{item.sub}</small>
                  </span>
                  <span className="arrow">
                    <IconArrowUpRight />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          className="demo-panel"
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
        >
          <div className="panel-head">
            <span className="badgeicon">
              <IconSpark />
            </span>
            <span>
              <strong>{tab.panelTitle}</strong>
              <small>{s.panelBrand}</small>
            </span>
            <span className="online">{s.demoBadge}</span>
          </div>

          <div className="chat">
            <p className="bubble user">{tab.user}</p>
            <p className="bubble agent">{tab.agent}</p>
            <p className="bubble user">{tab.reply}</p>
            <p className="event">
              <IconLink /> {tab.event}
            </p>
          </div>

          <p className="demo-note">{s.note}</p>
        </div>
      </div>
    </section>
  );
}

function IconSpark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z" />
    </svg>
  );
}
