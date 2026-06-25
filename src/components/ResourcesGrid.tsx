import Link from "next/link";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const resources = [
  {
    category: "RFQ Preparation",
    title: "What to include in an industrial sourcing request",
    explanation:
      "A useful RFQ gives the sourcing team enough information to check supplier fit, pricing feasibility, packing, and export handling before discussing commercial terms.",
    checklist: [
      "Product name or technical description",
      "Grade, standard, material type, or specification",
      "Required quantity and frequency",
      "Destination country and port",
      "Packing preference",
      "Inspection requirement",
      "Target timeline",
      "Incoterm preference if known",
    ],
    why:
      "Incomplete RFQs usually delay quotation because supplier availability, packing, and logistics cannot be checked properly.",
  },
  {
    category: "Export Documentation",
    title: "Documents buyers usually review before shipment",
    explanation:
      "Documentation requirements depend on product type, destination country, and buyer import process. The required list should be confirmed before shipment planning.",
    checklist: [
      "Commercial invoice",
      "Packing list",
      "Bill of lading or airway bill",
      "Certificate of origin",
      "Inspection report if required",
      "Product certificate or test report if applicable",
      "Photos or loading evidence when needed",
    ],
    why:
      "Clear document expectations reduce clearance delays and avoid last-minute shipment disputes.",
  },
  {
    category: "Pre-Shipment Inspection",
    title: "How verification supports procurement teams",
    explanation:
      "Inspection scope should be agreed before loading. For many industrial orders, inspection can include product condition, quantity, packing, marking, and loading checks.",
    checklist: [
      "Inspection type required",
      "Quantity or sampling method",
      "Product condition checks",
      "Packing and labeling checks",
      "Loading photos or videos",
      "Third-party inspection request if needed",
    ],
    why:
      "Inspection protects both buyer and supplier by confirming that agreed requirements are checked before shipment.",
  },
  {
    category: "Packing & Loading",
    title: "Packing details buyers should confirm early",
    explanation:
      "Packing affects freight cost, handling safety, container use, and customs documentation. It should be discussed before final quotation whenever possible.",
    checklist: [
      "Packing method: loose, bundled, palletized, crated, bagged, or boxed",
      "Container type: 20 ft, 40 ft, LCL, FCL, or break-bulk",
      "Labeling or marking requirements",
      "Moisture protection or wrapping",
      "Loading supervision requirement",
      "Destination handling limitations",
    ],
    why:
      "Wrong packing assumptions can change total cost, shipment safety, and delivery timelines.",
  },
  {
    category: "Trade Terms",
    title: "Commercial terms to clarify before quotation",
    explanation:
      "Before a formal quotation, the buyer and sourcing team should align on basic trade terms so pricing can be prepared accurately.",
    checklist: [
      "Incoterm preference such as FOB, CIF, CFR, or EXW",
      "Currency",
      "Payment terms expectation",
      "Destination port",
      "Validity period needed",
      "Inspection responsibility",
      "Freight inclusion or exclusion",
    ],
    why:
      "A price without trade terms is incomplete. Terms affect risk, freight, insurance, documentation, and responsibility.",
  },
  {
    category: "Sourcing Scope",
    title: "How to define a custom sourcing requirement",
    explanation:
      "For custom or non-standard industrial requirements, the buyer should describe the application and acceptable alternatives, not only the product name.",
    checklist: [
      "Product application",
      "Technical drawings or photos if available",
      "Acceptable material alternatives",
      "Required certification or standard",
      "Minimum and target quantity",
      "Country restrictions if any",
      "Timeline and repeat order potential",
    ],
    why:
      "Clear sourcing scope helps identify suitable suppliers faster and avoids quoting the wrong product.",
  },
];

export default function ResourcesGrid() {
  return (
    <div className="resources-guide">
      <div className="resources-grid">
        {resources.map((item) => (
          <article key={item.title} className="resource-card">
            <span className="resource-label">{item.category}</span>
            <h2>{item.title}</h2>
            <p>{item.explanation}</p>

            <div className="resource-checklist-block">
              <h3>What to prepare</h3>
              <ul className="resource-checklist">
                {item.checklist.map((detail) => (
                  <li key={detail}>
                    <Check size={16} aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="resource-note">
              <h3>Why it matters</h3>
              <p>{item.why}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="resource-cta">
        <div>
          <span className="resource-label">Next step</span>
          <h2>Prepared your requirement? Request a quotation.</h2>
          <p>
            Send the product details, quantity, destination, and timeline so Safar Exports
            can review sourcing feasibility.
          </p>
        </div>
        <div className="resource-cta-actions">
          <Link href="/contact" className="btn btn-primary">
            Request Quote
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <a
            href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
            className="btn btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Discuss on WhatsApp
            <MessageCircle size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
