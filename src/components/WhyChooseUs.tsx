"use client";

import { Users, FileCheck, Package, SearchCheck, Headphones } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const supportingPoints = [
  {
    icon: Users,
    title: "Supplier fit review",
    description: "We check supplier suitability, track record, and availability before any requirement moves toward quotation.",
  },
  {
    icon: SearchCheck,
    title: "Specification matching",
    description: "Every requirement is matched against confirmed product specification, grade, and application before sourcing begins.",
  },
  {
    icon: FileCheck,
    title: "Documentation awareness",
    description: "Export documentation — Bill of Lading, Certificate of Origin, packing list, and inspection reports — is planned in from the start.",
  },
  {
    icon: Package,
    title: "Packing & logistics coordination",
    description: "FCL, LCL, crated, palletized, or break-bulk — packing and freight are coordinated to match your product, port, and import requirements.",
  },
  {
    icon: Headphones,
    title: "Single point of communication",
    description: "One point of contact manages your requirement from RFQ to delivery, so nothing gets lost between sourcing and shipment.",
  },
];

type WhyChooseUsProps = {
  showHeader?: boolean;
};

export default function WhyChooseUs({ showHeader = true }: WhyChooseUsProps) {
  const prefersReducedMotion = useReducedMotion();
  const baseDelay = (i: number) => (prefersReducedMotion ? 0 : 0.06 + i * 0.07);

  return (
    <section className="why-safar-section">
      <div className="container-site">
        {showHeader && (
          <div className="why-safar-header">
            <span className="eyebrow">Why Safar Exports</span>
            <h2 className="section-title small">Why buyers work with Safar Exports.</h2>
          </div>
        )}

        <div className="why-safar-grid">
          <motion.div
            className="why-feature-card"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="why-feature-tag">Our edge</span>
            <h3>Requirement research before quotation.</h3>
            <p>
              Before quoting, we study the buyer&rsquo;s requirement, compare supplier fit, check product
              suitability, and review practical sourcing options. This helps buyers avoid wrong
              materials, unsuitable suppliers, and unclear pricing — so every quotation that follows
              is grounded in a sourcing context that actually fits the requirement.
            </p>
          </motion.div>

          <div className="why-support-grid">
            {supportingPoints.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                className="why-support-card"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: baseDelay(i), ease: [0.22, 1, 0.36, 1] }}
              >
                <Icon size={19} strokeWidth={1.6} aria-hidden="true" />
                <h4>{title}</h4>
                <p>{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
