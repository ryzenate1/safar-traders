"use client";

import { useState, type CSSProperties } from "react";
import { ArrowRight, ArrowLeft, Check, Loader2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { productCategories } from "@/lib/products";

const PRODUCTS = [
  ...productCategories.map((category) => category.shortTitle),
  "Other industrial requirement",
];

type FormState = {
  product: string;
  quantity: string;
  destinationPort: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  country: string;
};

const TOTAL_STEPS = 5;

const initialState: FormState = {
  product: "",
  quantity: "",
  destinationPort: "",
  company: "",
  name: "",
  email: "",
  phone: "",
  country: "",
};

function StepDots({ step }: { step: number }) {
  return (
    <div style={{ display: "flex", gap: "6px", marginBottom: "1.5rem" }}>
      {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
        <div
          key={i}
          style={{
            height: "4px",
            flex: 1,
            borderRadius: "2px",
            backgroundColor: i < step ? "var(--color-accent)" : "var(--color-border-light)",
            transition: "background-color 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      ))}
    </div>
  );
}

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "var(--color-text-secondary)",
  marginBottom: "0.375rem",
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "0.75rem 0.875rem",
  fontSize: "1rem",
  border: "1px solid var(--color-border)",
  borderRadius: "0.5rem",
  outline: "none",
  fontFamily: "inherit",
  color: "var(--color-text-primary)",
  backgroundColor: "var(--color-bg)",
  minHeight: "44px",
  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
};

const stepVariants = {
  enter: { opacity: 0, x: 16 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -16 },
};

export default function RFQWizard({ onClose }: { onClose?: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const update = (key: keyof FormState, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const canProceed = () => {
    switch (step) {
      case 1: return !!form.product;
      case 2: return !!form.quantity.trim();
      case 3: return !!form.destinationPort.trim();
      case 4: return !!form.company.trim() && !!form.name.trim();
      case 5: return !!form.email.trim() || !!form.phone.trim();
      default: return true;
    }
  };

  const next = () => {
    if (!canProceed()) return;
    if (step < TOTAL_STEPS) setStep(step + 1);
    else submit();
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "rfq-wizard",
          product: form.product,
          quantity: form.quantity,
          destinationPort: form.destinationPort,
          company: form.company,
          name: form.name,
          email: form.email,
          phone: form.phone,
          country: form.country,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Submission failed");
      }
      setDone(true);
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Something went wrong. Please try WhatsApp or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border-light)",
        borderRadius: "var(--radius-lg)",
        padding: "clamp(1.5rem, 5vw, 2rem)",
        position: "relative",
        maxWidth: "480px",
        width: "100%",
        maxHeight: "calc(100vh - 2rem)",
        overflowY: "auto",
      }}
    >
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--color-text-secondary)",
            padding: "0.375rem",
            minWidth: "36px",
            minHeight: "36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <X size={18} />
        </button>
      )}

      {done ? (
        <div style={{ textAlign: "center", padding: "2.5rem 0.5rem" }}>
          <div style={{
            width: "56px", height: "56px", borderRadius: "50%",
            backgroundColor: "var(--color-accent-muted)",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 1.25rem",
          }}>
            <Check size={24} style={{ color: "var(--color-accent)" }} />
          </div>
          <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "0.75rem" }}>
            Request received
          </h3>
          <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.65 }}>
            The Safar Exports team will review your requirement before commercial follow-up.
          </p>
        </div>
      ) : (
        <>
          <h3 style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "1.25rem" }}>
            Request a Quote
          </h3>
          <StepDots step={step} />

          <div style={{ position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step}
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                {step === 1 && (
                  <div>
                    <label style={labelStyle}>What do you need to source? *</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {PRODUCTS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => update("product", p)}
                          style={{
                            textAlign: "left",
                            padding: "0.75rem 1rem",
                            borderRadius: "0.5rem",
                            border: `1px solid ${form.product === p ? "var(--color-accent)" : "var(--color-border-light)"}`,
                            backgroundColor: form.product === p ? "var(--color-accent-muted)" : "var(--color-bg)",
                            cursor: "pointer",
                            fontSize: "0.9375rem",
                            color: "var(--color-text-primary)",
                            transition: "border-color 0.15s ease, background-color 0.15s ease",
                            minHeight: "44px",
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <label style={labelStyle}>Quantity required *</label>
                    <input
                      style={inputStyle}
                      type="text"
                      placeholder="e.g. 500 MT, 2 containers, or monthly supply"
                      value={form.quantity}
                      onChange={(e) => update("quantity", e.target.value)}
                      autoFocus
                    />
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <label style={labelStyle}>Destination port *</label>
                    <input
                      style={inputStyle}
                      type="text"
                      placeholder="e.g. Port Klang, Malaysia"
                      value={form.destinationPort}
                      onChange={(e) => update("destinationPort", e.target.value)}
                      autoFocus
                    />
                  </div>
                )}

                {step === 4 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Company name *</label>
                      <input
                        style={inputStyle}
                        type="text"
                        value={form.company}
                        onChange={(e) => update("company", e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Contact person *</label>
                      <input
                        style={inputStyle}
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Country</label>
                      <input
                        style={inputStyle}
                        type="text"
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                      />
                    </div>
                  </div>
                )}

                {step === 5 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <div>
                      <label style={labelStyle}>Email</label>
                      <input
                        style={inputStyle}
                        type="email"
                        placeholder="trade@company.com"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        autoFocus
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Phone / WhatsApp</label>
                      <input
                        style={inputStyle}
                        type="tel"
                        placeholder="+1 000 000 0000"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                      />
                    </div>
                    <p style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)" }}>
                      Provide at least one — email or phone.
                    </p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {error && (
            <p style={{ color: "#B42318", fontSize: "0.8125rem", marginTop: "0.75rem" }}>{error}</p>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1.75rem" }}>
            <button
              type="button"
              onClick={back}
              disabled={step === 1}
              style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                padding: "0.625rem 1rem",
                fontSize: "0.875rem",
                color: step === 1 ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
                background: "none",
                border: "none",
                cursor: step === 1 ? "default" : "pointer",
                minHeight: "44px",
              }}
            >
              <ArrowLeft size={15} /> Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canProceed() || submitting}
              style={{
                display: "flex", alignItems: "center", gap: "0.5rem",
                padding: "0.625rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "#FFFFFF",
                backgroundColor: canProceed() ? "var(--color-accent)" : "var(--color-text-tertiary)",
                border: "none",
                borderRadius: "0.5rem",
                cursor: canProceed() && !submitting ? "pointer" : "default",
                minHeight: "44px",
                transition: "background-color 0.15s ease",
              }}
            >
              {submitting ? (
                <Loader2 size={15} className="animate-spin" />
              ) : step === TOTAL_STEPS ? (
                <>Submit <ArrowRight size={15} /></>
              ) : (
                <>Next <ArrowRight size={15} /></>
              )}
            </button>
          </div>
        </>
      )}
    </motion.div>
  );
}
