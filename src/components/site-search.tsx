"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  searchEntries,
  type SearchEntry,
  type SearchEntryType,
} from "@/lib/search";
import { IconArrowUpRight, IconClose, IconSearch } from "./icons";

type Labels = {
  placeholder: string;
  hint: string;
  empty: string;
  tryOther: string;
  search: string;
  close: string;
  groupPages: string;
  groupSections: string;
  groupTeam: string;
  groupFaq: string;
};

const GROUP_ORDER: SearchEntryType[] = ["page", "section", "team", "faq"];

export function SiteSearch({ entries, labels }: { entries: SearchEntry[]; labels: Labels }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(open);
  const router = useRouter();

  const results = useMemo(
    () => (query.trim() ? searchEntries(entries, query) : []),
    [entries, query],
  );

  /** Cierra el panel y devuelve el foco al boton que lo abrio. */
  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  const grouped = useMemo(() => {
    const map = new Map<SearchEntryType, SearchEntry[]>();
    results.forEach((entry) => {
      const list = map.get(entry.type) ?? [];
      list.push(entry);
      map.set(entry.type, list);
    });
    return GROUP_ORDER.filter((type) => map.has(type)).map((type) => ({
      type,
      items: map.get(type) as SearchEntry[],
    }));
  }, [results]);

  const flat = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Atajo de teclado: "/" o Ctrl/Cmd+K abren el buscador.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setOpen(true);
        requestAnimationFrame(() => inputRef.current?.focus());
      }
      // Solo devolvemos el foco si el panel estaba abierto: si no, Escape
      // robaba el foco desde cualquier parte de la pagina.
      if (e.key === "Escape" && openRef.current) close();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) close();
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  function go(entry: SearchEntry) {
    setOpen(false);
    triggerRef.current?.blur();
    setQuery("");
    const [path, hash] = entry.href.split("#");
    if (path && path !== window.location.pathname) {
      router.push(entry.href);
    } else if (hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${hash}`);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!flat.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % flat.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + flat.length) % flat.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = flat[active];
      if (entry) go(entry);
    }
  }

  const groupLabel: Record<SearchEntryType, string> = {
    page: labels.groupPages,
    section: labels.groupSections,
    team: labels.groupTeam,
    faq: labels.groupFaq,
  };

  let index = -1;

  return (
    <div className="search" ref={wrapRef}>
      <button
        ref={triggerRef}
        type="button"
        className="icon-btn"
        onClick={() => {
          setOpen((v) => !v);
          requestAnimationFrame(() => inputRef.current?.focus());
        }}
        aria-label={labels.search}
        title={labels.search}
        aria-expanded={open}
      >
        {open ? <IconClose /> : <IconSearch />}
      </button>

      {open && (
        <div className="search__panel" role="dialog" aria-label={labels.search}>
          <div className="search__field">
            <IconSearch />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={labels.placeholder}
              aria-label={labels.search}
              autoComplete="off"
            />
          </div>

          {!query.trim() && <p className="search__hint">{labels.hint}</p>}

          {query.trim() && !flat.length && (
            <p className="search__empty">
              {labels.empty} <strong>“{query}”</strong>. {labels.tryOther}
            </p>
          )}

          {flat.length > 0 && (
            <div className="search__results">
              {grouped.map((group) => (
                <div key={group.type}>
                  <div className="search__group-label">{groupLabel[group.type]}</div>
                  {group.items.map((entry) => {
                    index += 1;
                    const isActive = index === active;
                    return (
                      <button
                        key={`${entry.type}-${entry.href}-${entry.title}`}
                        type="button"
                        className="search__item"
                        data-active={isActive}
                        onMouseEnter={() => setActive(flat.indexOf(entry))}
                        onClick={() => go(entry)}
                      >
                        <span className="search__icon">
                          <IconArrowUpRight />
                        </span>
                        <span className="search__body">
                          <span className="search__title">{entry.title}</span>
                          <span className="search__meta">
                            {groupLabel[entry.type]} · {entry.subtitle}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
