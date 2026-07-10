import Link from "next/link";
import { ArrowLeft, Check, MessageCircle, X } from "lucide-react";
import { resourceGuides, type ResourceGuide } from "@/lib/resources";
import { siteConfig } from "@/lib/site-config";
import RFQWizardLauncher from "./RFQWizardLauncher";

export default function ResourceGuidePage({ guide }: { guide: ResourceGuide }) {
  const related = resourceGuides.filter((g) => g.slug !== guide.slug).slice(0, 3);
  const guideUrl = `${siteConfig.url}/resources/${guide.slug}`;
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    mainEntityOfPage: guideUrl,
    datePublished: guide.datePublished,
    dateModified: guide.dateModified,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Resources", item: `${siteConfig.url}/resources` },
      { "@type": "ListItem", position: 3, name: guide.title, item: guideUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="guide-hero">
        <div className="container-site">
          <Link href="/resources" className="guide-back">
            <ArrowLeft size={14} aria-hidden="true" /> All buyer resources
          </Link>
          <span className="eyebrow">{guide.category}</span>
          <h1 className="guide-title">{guide.title}</h1>
          <p className="guide-summary">{guide.summary}</p>
          <span className="guide-readtime">{guide.readTime}</span>
        </div>
      </section>

      <section className="section-pad-sm bg-white">
        <div className="container-site guide-layout">
          <article className="guide-article">
            {guide.intro.map((para, i) => (
              <p key={i} className="guide-intro-p">{para}</p>
            ))}

            {guide.sections.map((section) => (
              <div key={section.heading} className="guide-section">
                <h2>{section.heading}</h2>
                {section.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            ))}

            <div className="guide-checklist-block">
              <h2>{guide.checklist.heading}</h2>
              <ul className="guide-checklist">
                {guide.checklist.items.map((item) => (
                  <li key={item}>
                    <Check size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="guide-mistakes-block">
              <h2>{guide.mistakes.heading}</h2>
              <ul className="guide-mistakes">
                {guide.mistakes.items.map((item) => (
                  <li key={item}>
                    <X size={16} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="guide-why-block">
              <span className="guide-why-label">Why it matters</span>
              <p>{guide.why}</p>
            </div>
          </article>

          <aside className="guide-sidebar">
            <div className="sidebar-info-card">
              <p className="sidebar-info-heading">Ready to request a quote?</p>
              <p className="sidebar-info-copy">
                Send your product, quantity, destination, and timeline — we&apos;ll review feasibility before discussing terms.
              </p>
              <RFQWizardLauncher label="Request Quote" className="btn btn-primary" />
              <a
                href={`https://wa.me/${siteConfig.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ width: "100%", marginTop: ".6rem" }}
              >
                Discuss on WhatsApp <MessageCircle size={15} aria-hidden="true" />
              </a>
            </div>

            <div className="sidebar-info-card">
              <p className="sidebar-info-heading">More buyer guides</p>
              <ul className="sidebar-related-list">
                {related.map((g) => (
                  <li key={g.slug}>
                    <Link href={`/resources/${g.slug}`}>
                      <span className="sidebar-related-cat">{g.category}</span>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
