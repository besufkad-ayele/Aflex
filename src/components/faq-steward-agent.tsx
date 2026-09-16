"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

const SUGGESTIONS = [
  "Who can enroll in AFLEX programs?",
  "How do ministries nominate delegates?",
  "How do I get to Sululta campus?",
  "Are there scholarships for African candidates?",
  "How do I apply for a research fellowship?",
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatReply(text: string) {
  // Light markdown-ish: links like /contact become anchors
  const parts = text.split(/(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)/gi);
  return parts.map((part, index) => {
    if (/^\/[a-z0-9-]+/i.test(part)) {
      return (
        <Link key={`${part}-${index}`} href={part} className="steward-inline-link">
          {part}
        </Link>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export function FaqStewardAgent() {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "I am the Sululta Steward — AFLEX’s highland knowledge guide. Ask about admissions, campus life, LMS access, scholarships, or careers. I answer from Academy guidance.",
    },
  ]);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;
    node.scrollTop = node.scrollHeight;
  }, [messages, busy, open]);

  const send = async (raw: string) => {
    const question = raw.trim();
    if (!question || busy) return;

    setError(null);
    setInput("");
    const userMessage: ChatMessage = { id: uid(), role: "user", content: question };
    setMessages((prev) => [...prev, userMessage]);
    setBusy(true);

    try {
      const history = [...messages, userMessage]
        .filter((m) => m.id !== "welcome")
        .slice(-6)
        .map(({ role, content }) => ({ role, content }));

      const response = await fetch("/api/faq-agent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || "Unable to reach the Steward.");
      }

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: data.reply as string },
      ]);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content:
            "I could not reach Gemini just now. Browse the FAQs below, or continue at /contact — admissions usually replies within two business days.",
        },
      ]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="steward-section" aria-labelledby="steward-heading">
      <div className="container steward-shell">
        <div className="steward-intro">
          <span className="eyebrow steward-eyebrow">AI ACADEMY GUIDE · GEMINI</span>
          <h2 id="steward-heading">
            Ask the
            <br />
            <em>Sululta Steward.</em>
          </h2>
          <p>
            A creative institutional agent grounded in AFLEX FAQs — admissions, campus protocol,
            LMS, scholarships, and careers. Prefer a human? Jump to Contact anytime.
          </p>
          <ul className="steward-traits">
            <li>Grounded in published Academy guidance</li>
            <li>Suggests the right next portal</li>
            <li>Available while you browse FAQs</li>
          </ul>
          <Link href="/contact" className="text-link steward-human-link">
            <span>Prefer a counselor?</span>
            <span>→</span>
          </Link>
        </div>

        <div className={`steward-console ${open ? "is-open" : ""}`}>
          <div className="steward-console-chrome">
            <div className="steward-identity">
              <span className="steward-avatar" aria-hidden="true">
                <img src="/images/aflex-icon.png" alt="" />
              </span>
              <div>
                <strong>Sululta Steward</strong>
                <small>{busy ? "Consulting the highlands…" : "Online · AFLEX Knowledge"}</small>
              </div>
            </div>
            <button
              type="button"
              className="steward-toggle"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
            >
              {open ? "Minimize" : "Expand"}
            </button>
          </div>

          {open && (
            <>
              <div className="steward-messages" ref={scrollerRef} role="log" aria-live="polite">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`steward-bubble steward-bubble-${message.role}`}
                  >
                    <span className="steward-bubble-label">
                      {message.role === "assistant" ? "Steward" : "You"}
                    </span>
                    <p>{formatReply(message.content)}</p>
                  </div>
                ))}
                {busy && (
                  <div className="steward-bubble steward-bubble-assistant steward-typing">
                    <span className="steward-dot" />
                    <span className="steward-dot" />
                    <span className="steward-dot" />
                  </div>
                )}
              </div>

              <div className="steward-suggestions" aria-label="Suggested questions">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    className="steward-chip"
                    disabled={busy}
                    onClick={() => send(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <form
                className="steward-composer"
                onSubmit={(event) => {
                  event.preventDefault();
                  void send(input);
                }}
              >
                <label htmlFor="steward-input" className="sr-only">
                  Ask the Sululta Steward
                </label>
                <input
                  id="steward-input"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about admissions, campus, LMS, scholarships…"
                  disabled={busy}
                  maxLength={1200}
                  autoComplete="off"
                />
                <button type="submit" className="button button-primary" disabled={busy || !input.trim()}>
                  Ask <span>↗</span>
                </button>
              </form>

              {error ? <p className="steward-error">{error}</p> : null}
              <p className="steward-disclaimer">
                AI guidance only — confirm critical enrollment or protocol details with AFLEX staff.
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
