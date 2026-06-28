import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { resourceGuides } from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";

export default function ResourcesGrid() {
  return (
    <div className="resources-guide">
      <div className="resources-grid">
        {resourceGuides.map((item) => (
          <article key={item.slug} className="resource-card">
            <span className="resource-label">{item.category}</span>
            <h2>{item.title}</h2>
            <p>{item.summary}</p>
            <span className="resource-readtime">{item.readTime}</span>
            <Link href={`/resources/${item.slug}`} className="resource-readmore">
              Read more <ArrowRight size={14} aria-hidden="true" />
            </Link>
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
