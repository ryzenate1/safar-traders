import Link from "next/link";
import RFQWizardLauncher from "@/components/RFQWizardLauncher";

export default function NotFound() {
  return (
    <section className="hero-section">
      <div className="container-site" style={{ maxWidth: "760px" }}>
        <span className="tag tag-accent">404</span>
        <h1 className="hero-title" style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}>Page not found.</h1>
        <p className="hero-copy">
          The page may have moved during the Safar Traders site restructure. Use the links below to continue to sourcing capabilities or submit an RFQ.
        </p>
        <div className="hero-actions">
          <Link href="/products" className="btn btn-secondary">View capabilities</Link>
          <RFQWizardLauncher label="Request a Quote" className="btn btn-primary" />
        </div>
      </div>
    </section>
  );
}
