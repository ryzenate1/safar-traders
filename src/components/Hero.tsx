import Link from "next/link";
import { ArrowRight, FileText, Globe2, SearchCheck } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

const proofItems = [
  { icon: SearchCheck, title: "Requirement-led sourcing", text: "We start from specification, quantity, destination, and trade terms — nothing moves without a confirmed scope." },
  { icon: FileText, title: "Export documentation", text: "Bill of Lading, Certificate of Origin, Packing List, and all clearance documents prepared and coordinated end to end." },
  { icon: Globe2, title: "International buyer focus", text: "Built for importers, manufacturers, distributors, and procurement teams sourcing from India at scale." },
];

export default function Hero() {
  const waText = encodeURIComponent("Hello Safar Exports, I would like to submit an industrial sourcing requirement.");

  return (
    <section className="hero-section">
      <div className="container-site">

        <div className="hero-content">

          <div className="hero-tag">
            <span className="tag tag-accent">Global industrial sourcing · India</span>
          </div>

          <h1 className="hero-title">
            Source industrial products from India with a serious export partner.
          </h1>

          <p className="hero-copy">
            Safar Exports helps international buyers source ferrous and non-ferrous metals,
            industrial scrap, machinery, and packaging materials — through a disciplined
            RFQ-first process with full export documentation and end-to-end logistics.
          </p>

          <div className="hero-actions">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Request a Quote <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}?text=${waText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-lg"
            >
              Discuss on WhatsApp
            </a>
          </div>

        </div>

        {/* Proof strip */}
        <div className="hero-proof-grid">
          {proofItems.map(({ icon: Icon, title, text }) => (
            <article key={title} className="quiet-card">
              <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
              <div>
                <h2>{title}</h2>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
