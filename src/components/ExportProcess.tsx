"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    code: "01",
    title: "Inquiry & Specification",
    description:
      "You submit a sourcing requirement — product, specification, quantity, packing preference, destination port. We confirm availability and technical fit within 24 hours.",
  },
  {
    code: "02",
    title: "Quotation",
    description:
      "We issue a formal price quotation including product specification, unit price, packing, loading port, and Incoterms. Valid for a defined period.",
  },
  {
    code: "03",
    title: "Order Confirmation",
    description:
      "On agreement, you issue a Purchase Order. We confirm the order and begin material sourcing, procurement, and preparation for your shipment.",
  },
  {
    code: "04",
    title: "Inspection & Loading",
    description:
      "Material or equipment is inspected against agreed specification. Third-party inspection can be arranged. Loading is supervised and documented with loading photos.",
  },
  {
    code: "05",
    title: "Shipping & Documentation",
    description:
      "Container is sealed and shipped. We prepare Bill of Lading, Packing List, Certificate of Origin, and any additional documents required for clearance.",
  },
  {
    code: "06",
    title: "Delivery & Settlement",
    description:
      "Documents are released on agreed payment terms. We remain available for any post-shipment queries including port clearance support.",
  },
];

export default function ExportProcess() {
  return (
    <section style={{
      backgroundColor: "var(--color-bg)",
      paddingTop: "5rem",
      paddingBottom: "5rem",
      borderTop: "1px solid var(--color-border-light)",
      borderBottom: "1px solid var(--color-border-light)",
    }}>
      <div className="container-site">
        <div className="process-layout">

          {/* Sticky left heading */}
          <div className="process-heading">
            <span className="eyebrow" style={{ marginBottom: "0.75rem", display: "block" }}>Export Process</span>
            <h2 style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              lineHeight: 1.15,
              color: "var(--color-text-primary)",
              marginBottom: "1.25rem",
            }}>
              How an order moves from inquiry to port.
            </h2>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: "320px", marginBottom: "1.25rem" }}>
              Every shipment follows the same documented, six-stage process — regardless of order size or destination. Nothing moves without a confirmed specification, a formal quotation, and an inspected, photographed load.
            </p>
            <p style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.7, maxWidth: "320px", marginBottom: "2rem" }}>
              Our team coordinates sourcing, procurement, customs documentation, and freight booking directly, so buyers deal with a single point of contact from first inquiry through final settlement.
            </p>
            <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <Link href="/contact" className="btn btn-primary">
                Submit a Requirement <ArrowRight size={15} aria-hidden="true" />
              </Link>
              <Link href="/export-process" className="btn btn-secondary">
                Full export process
              </Link>
            </div>
          </div>

          {/* Steps */}
          <div style={{ position: "relative" }}>
            <div style={{
              position: "absolute",
              left: "19px",
              top: "28px",
              bottom: "28px",
              width: "1px",
              backgroundColor: "var(--color-border-light)",
            }} />

            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {steps.map((step, i) => (
                <motion.div
                  key={step.code}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    paddingBottom: i < steps.length - 1 ? "2.5rem" : "0",
                  }}
                >
                  <div style={{ flexShrink: 0, position: "relative", zIndex: 1 }}>
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "50%",
                      backgroundColor: "var(--color-bg)",
                      border: "1.5px solid var(--color-border)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "0.6875rem", fontWeight: 600,
                        color: "var(--color-accent)", letterSpacing: "0.05em",
                      }}>
                        {step.code}
                      </span>
                    </div>
                  </div>
                  <div style={{ paddingTop: "0.5rem" }}>
                    <h3 style={{
                      fontSize: "1.0625rem", fontWeight: 600,
                      color: "var(--color-text-primary)", marginBottom: "0.5rem",
                      letterSpacing: "-0.01em",
                    }}>
                      {step.title}
                    </h3>
                    <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.7 }}>
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .process-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 3rem;
        }
        @media (min-width: 900px) {
          .process-layout {
            grid-template-columns: 1fr 1.5fr;
            gap: 5rem;
            align-items: start;
          }
          .process-heading {
            position: sticky;
            top: 80px;
          }
        }
      `}</style>
    </section>
  );
}
