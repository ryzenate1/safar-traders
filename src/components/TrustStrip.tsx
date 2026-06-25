import { Shield, FileText, Globe, Package, Truck, CheckCircle } from "lucide-react";

const signals = [
  { icon: Shield,       label: "Specification-matched supply", detail: "Every order sourced against your confirmed specification" },
  { icon: CheckCircle,  label: "Pre-shipment inspection",      detail: "Third-party inspection available on request" },
  { icon: FileText,     label: "Complete documentation",       detail: "BL, packing list, certificate of origin & more" },
  { icon: Package,      label: "Flexible packing",             detail: "FCL, LCL, crated, palletized, or break-bulk" },
  { icon: Truck,        label: "Containerized loading",        detail: "20′ & 40′ FCL, supervised and photographed" },
  { icon: Globe,        label: "Global logistics",             detail: "Coordinated freight to major ports worldwide" },
];

export default function TrustStrip() {
  return (
    <section style={{
      backgroundColor: "var(--color-bg)",
      borderBottom: "1px solid var(--color-border-light)",
      paddingTop: "3.5rem",
      paddingBottom: "3.5rem",
    }}>
      <div className="container-site">
        <p style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-tertiary)",
          letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center",
          marginBottom: "2.5rem" }}>
          How we operate
        </p>
        <div className="trust-grid">
          {signals.map(({ icon: Icon, label, detail }) => (
            <div key={label} style={{ display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
              <Icon size={20} style={{ color: "var(--color-accent)", flexShrink: 0, marginTop: "0.0625rem" }} strokeWidth={1.5} />
              <div>
                <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "0.2rem" }}>
                  {label}
                </p>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trust-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem 2rem;
        }
        @media (min-width: 600px)  { .trust-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .trust-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>
    </section>
  );
}
