import type { ReactNode } from "react";
import Link from "next/link";
import Image, { type StaticImageData } from "next/image";
import { ChevronRight } from "lucide-react";

type Breadcrumb = { label: string; href?: string };

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  cta?: ReactNode;
  image?: StaticImageData;
}

export default function PageHero({ eyebrow, title, description, breadcrumbs, cta, image }: PageHeroProps) {
  return (
    <section className="page-hero" style={{
      backgroundColor: "var(--color-bg)",
      paddingTop: "8rem",
      paddingBottom: "4rem",
      borderBottom: "1px solid var(--color-border-light)",
    }}>
      <div className="container-site">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="page-hero-breadcrumbs" style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
            <Link href="/" style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", textDecoration: "none" }}>
              Home
            </Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                <ChevronRight size={12} style={{ color: "var(--color-text-tertiary)" }} />
                {crumb.href ? (
                  <Link href={crumb.href} style={{ fontSize: "0.8125rem", color: "var(--color-text-tertiary)", textDecoration: "none" }}>
                    {crumb.label}
                  </Link>
                ) : (
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <span className="eyebrow" style={{ marginBottom: "0.875rem", display: "block" }}>{eyebrow}</span>
        )}
        <h1 className="page-hero-title" style={{
          fontSize: "clamp(2rem, 4vw, 3.25rem)",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          color: "var(--color-text-primary)",
          maxWidth: "760px",
          marginBottom: description ? "1.25rem" : "0",
        }}>
          {title}
        </h1>
        {description && (
          <p className="page-hero-copy" style={{
            fontSize: "1.0625rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.7,
            maxWidth: "580px",
            marginBottom: cta ? "2rem" : "0",
          }}>
            {description}
          </p>
        )}
        {cta && <div>{cta}</div>}

        {image && (
          <div className="page-hero-image" style={{
            position: "relative", width: "100%", aspectRatio: "16 / 6",
            overflow: "hidden", borderRadius: "var(--radius-lg)",
            marginTop: "2.5rem", border: "1px solid var(--color-border-light)",
          }}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="100vw"
              priority
              style={{ objectFit: "cover", filter: "grayscale(0.15) contrast(1.02) brightness(0.97)" }}
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, rgba(0,0,0,0.16) 100%)",
            }} />
          </div>
        )}
      </div>
    </section>
  );
}
