"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/i18n";
import {
  IconArrowUpRight,
  IconChat,
  IconFlow,
  IconGrowth,
  IconLink,
} from "./icons";

type ChatMessage = {
  role: "user" | "model";
  text: string;
};

const TAB_ICONS = [IconChat, IconGrowth, IconFlow, IconLink];

export function SolutionsDemo({ dict }: { dict: Dict }) {
  const [active, setActive] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
  const storageKey = "crotulus-demo-session";
  let savedSessionId = window.localStorage.getItem(storageKey);

  if (!savedSessionId) {
    savedSessionId = window.crypto.randomUUID();
    window.localStorage.setItem(storageKey, savedSessionId);
  }

  setSessionId(savedSessionId);
}, []);

  const s = dict.solutions;
  const tab = s.tabs[active] ?? s.tabs[0];

  async function sendMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = input.trim();

    if (!message || loading) {
      if (!message) setError(s.emptyMessage);
      return;
    }

    if (message.length > 1500) {
      setError("El mensaje no puede superar los 1500 caracteres.");
      return;
    }

    const previousMessages = messages;
    const scenario = tab.id;

    setInput("");
    setError("");
    setLoading(true);

    setMessages((current) => [
      ...current,
      { role: "user", text: message },
    ]);

    try {
      const response = await fetch("/api/demo-chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scenario,
          message,
          history: previousMessages,
          sessionId,
      }),
      });

      const data = await response.json();

      if (typeof data.sessionId === "string") {
        setSessionId(data.sessionId);
        window.localStorage.setItem("crotulus-demo-session", data.sessionId);
      }

      if (!response.ok || typeof data.answer !== "string") {
          throw new Error(data.error || "No se pudo obtener una respuesta.");
      }
      setMessages((current) => [
        ...current,
        { role: "model", text: data.answer },
      ]);
    } catch (err) {
      console.error("Error en el chat de demostración:", err);
      setError(s.errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function changeScenario(index: number) {
    if (loading) return;

    setActive(index);
    setMessages([]);
    setInput("");
    setError("");
  }

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
  {s.tabs.map((item, index) => {
    const Icon = TAB_ICONS[index] ?? IconChat;
    const selected = index === active;

    return (
      <button
        key={item.id}
        type="button"
        role="tab"
        id={"tab-" + item.id}
        aria-selected={selected}
        aria-controls={"panel-" + item.id}
        className={"tab" + (selected ? " active" : "")}
        onClick={() => changeScenario(index)}
        disabled={loading}
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
          id={"panel-" + tab.id}
          aria-labelledby={"tab-" + tab.id}
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

          <div
            className="chat"
            aria-live="polite"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {messages.length === 0 && (
              <p className="bubble agent">{s.chatWelcome}</p>
            )}

            {messages.map((message, index) => (
              <p
               key={index + "-" + message.role}
                className={`bubble ${
                  message.role === "user" ? "user" : "agent"
                }`}
                style={{ whiteSpace: "pre-wrap" }}
              >
                {message.text}
              </p>
            ))}

            {loading && (
              <p className="bubble agent" role="status">
                {s.sendingLabel}
              </p>
            )}
          </div>

          <form
            onSubmit={sendMessage}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "16px",
            }}
          >
            <textarea
              className="chat-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={s.chatPlaceholder}
              aria-label={s.chatPlaceholder}
              maxLength={1500}
              rows={2}
              disabled={loading}
              style={{
                width: "100%",
                boxSizing: "border-box",
                resize: "vertical",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid #d8dce5",
                font: "inherit",
                background: "#fff",
              }}
            />

            {error && (
              <p
                className="chat-error"
                role="alert"
                style={{ margin: 0 }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              className="button button--primary"
              disabled={loading}
              style={{
                alignSelf: "flex-end",
                cursor: loading ? "wait" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? s.sendingLabel : s.sendButton}
            </button>
          </form>

          <p className="demo-note">{s.chatDisclaimer}</p>

          <p
            className="demo-note"
            style={{ marginTop: "6px" }}
          >
            {s.note}
          </p>
        </div>
      </div>
    </section>
  );
}

function IconSpark() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
      <path d="m19 14 1.1 2.4L22 17l-1.9.6L19 20l-.9-2.4L16 17l2.1-.6L19 14Z" />
    </svg>
  );
}
