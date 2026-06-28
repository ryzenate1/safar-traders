"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MessageCircle, X, Send, Loader2, Check } from "lucide-react";

type ChatMessage = { role: "user" | "assistant"; content: string };

const QUOTE_INTENT_PATTERNS = [
  /need\s+(\d+\s?(mt|tons?|units?|pieces?))/i,
  /\bmt\b/i,
  /bulk (order|requirement|supply)/i,
  /export to/i,
  /sourcing|procure|procurement/i,
  /looking for (a |)(supplier|sourcing partner)/i,
  /price|quote|quotation|rfq/i,
];

function looksLikeBuyingIntent(text: string) {
  return QUOTE_INTENT_PATTERNS.some((re) => re.test(text));
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Welcome to Safar Exports. We support buyers across markets with non-perishable industrial and commercial sourcing requirements. What can we help you source?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, showLeadForm]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    if (looksLikeBuyingIntent(text)) {
      setShowLeadForm(true);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (data.ok && data.reply) {
        setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
      } else {
        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content:
              data.error ||
              "Please submit your requirement and our sourcing team will provide a formal quotation.",
          },
        ]);
      }
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection issue. Please try the Request a Quote form instead." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        style={{
          position: "fixed",
          bottom: "max(6.5rem, calc(env(safe-area-inset-bottom) + 6rem))",
          right: "1.25rem",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          backgroundColor: "var(--color-dark-bg)",
          color: "var(--color-dark-text)",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
          zIndex: 1000,
          transition: "transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.2s ease",
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1.06)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <div
        role="dialog"
        aria-label="Sourcing and trade assistant chat"
        aria-hidden={!open}
        style={{
          position: "fixed",
          bottom: "max(10.5rem, calc(env(safe-area-inset-bottom) + 10rem))",
          right: "1.25rem",
          width: "min(360px, calc(100vw - 2rem))",
          height: "min(520px, calc(100vh - 8rem))",
          background: "rgba(255,255,255,0.82)",
          backdropFilter: "saturate(180%) blur(20px)",
          WebkitBackdropFilter: "saturate(180%) blur(20px)",
          border: "1px solid var(--color-border-light)",
          borderRadius: "var(--radius-lg)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          boxShadow: "0 16px 40px rgba(0,0,0,0.16)",
          zIndex: 1000,
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0) scale(1)" : "translateY(8px) scale(0.98)",
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s cubic-bezier(0.22, 1, 0.36, 1), transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
          <div style={{
            padding: "0.875rem 1rem",
            backgroundColor: "var(--color-dark-bg)",
            color: "var(--color-dark-text)",
          }}>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, margin: 0 }}>Sourcing Desk</p>
            <p style={{ fontSize: "0.6875rem", color: "var(--color-dark-muted)", margin: 0 }}>For RFQ details, use the quote form</p>
          </div>

          <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "0.625rem 0.875rem",
                  borderRadius: "0.625rem",
                  fontSize: "0.8125rem",
                  lineHeight: 1.5,
                  backgroundColor: m.role === "user" ? "var(--color-dark-bg)" : "var(--color-bg-secondary)",
                  color: m.role === "user" ? "var(--color-dark-text)" : "var(--color-text-primary)",
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: "var(--color-text-secondary)" }} aria-live="polite" aria-label="Assistant is typing">
                <Loader2 size={16} className="animate-spin" />
              </div>
            )}

            {showLeadForm && !leadSent && (
              <LeadMiniForm onSent={() => setLeadSent(true)} />
            )}
            {leadSent && (
              <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "0.375rem", color: "var(--color-text-secondary)", fontSize: "0.75rem" }}>
                <Check size={14} /> Sent to the sourcing team.
              </div>
            )}
          </div>

          <div style={{ display: "flex", borderTop: "1px solid var(--color-border-light)", padding: "0.625rem" }}>
            <label htmlFor="chat-input" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)" }}>
              Type your message
            </label>
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type your message..."
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: "1rem",
                padding: "0.5rem",
                background: "transparent",
                color: "var(--color-text-primary)",
              }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: input.trim() ? "var(--color-text-primary)" : "var(--color-text-tertiary)",
                padding: "0.5rem",
                minWidth: "40px",
                minHeight: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Send size={18} />
            </button>
          </div>
      </div>
    </>
  );
}

function LeadMiniForm({ onSent }: { onSent: () => void }) {
  const [company, setCompany] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    if (!company.trim() || !contact.trim() || (!email.trim() && !phone.trim())) {
      setError("Company, contact person, and email or phone are required.");
      return;
    }
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "chatbot",
          company,
          name: contact,
          email,
          phone,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Failed");
      onSent();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        alignSelf: "stretch",
        backgroundColor: "var(--color-bg-secondary)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "0.625rem",
        padding: "0.75rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <p style={{ fontSize: "0.75rem", color: "var(--color-text-secondary)", margin: 0 }}>
        Please share a few details so our sourcing team can follow up:
      </p>
      <label style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }} htmlFor="mf-company">Company name</label>
      <input id="mf-company" placeholder="Company name" value={company} onChange={(e) => setCompany(e.target.value)} style={miniInput} autoComplete="organization" />
      <label style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }} htmlFor="mf-contact">Contact person</label>
      <input id="mf-contact" placeholder="Contact person" value={contact} onChange={(e) => setContact(e.target.value)} style={miniInput} autoComplete="name" />
      <label style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }} htmlFor="mf-email">Email</label>
      <input id="mf-email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={miniInput} autoComplete="email" />
      <label style={{ position: "absolute", width: 1, height: 1, overflow: "hidden" }} htmlFor="mf-phone">Phone / WhatsApp</label>
      <input id="mf-phone" type="tel" placeholder="Phone / WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} style={miniInput} autoComplete="tel" />
      {error && <p role="alert" style={{ fontSize: "0.6875rem", color: "#B42318", margin: 0 }}>{error}</p>}
      <button
        onClick={submit}
        disabled={submitting}
        style={{
          fontSize: "0.8125rem",
          fontWeight: 600,
          color: "var(--color-dark-text)",
          backgroundColor: "var(--color-dark-bg)",
          border: "none",
          borderRadius: "0.375rem",
          padding: "0.625rem",
          cursor: "pointer",
          minHeight: "40px",
          transition: "opacity 0.2s ease",
          opacity: submitting ? 0.7 : 1,
        }}
      >
        {submitting ? "Sending..." : "Send to sourcing team"}
      </button>
    </div>
  );
}

const miniInput: CSSProperties = {
  fontSize: "1rem",
  padding: "0.625rem 0.75rem",
  border: "1px solid var(--color-border-light)",
  borderRadius: "0.375rem",
  outline: "none",
  background: "var(--color-bg)",
  color: "var(--color-text-primary)",
  minHeight: "40px",
};
