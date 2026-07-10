import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import constructionMaterialsImage from "@/images/construction.jpg";
import engineeringComponentsImage from "@/images/engineering.jpg";
import industrialRawMaterialsImage from "@/images/industrialmaterial.jpg";
import industrialScrapImage from "@/images/industrialscrap.jpg";
import customSourcingImage from "@/images/industrialsourcing.jpg";
import machineryEquipmentImage from "@/images/machine.jpg";
import metalsAlloysImage from "@/images/metalandalloy.jpg";
import packagingSuppliesImage from "@/images/packing.jpg";

const capabilityPreviews = [
  { slug: "metals-alloys", label: "Metals & Alloys", desc: "Ferrous, non-ferrous, stainless steel, aluminium, copper, brass, and nickel alloys.", image: metalsAlloysImage },
  { slug: "industrial-scrap-recyclable-materials", label: "Industrial Scrap", desc: "Metal scrap, plastic scrap, paper, rubber scrap, and electronic scrap.", image: industrialScrapImage },
  { slug: "machinery-equipment", label: "Machinery & Equipment", desc: "Manufacturing machinery, processing equipment, tools, and automation equipment.", image: machineryEquipmentImage },
  { slug: "construction-building-materials", label: "Construction Materials", desc: "Granite, marble, natural stone, tiles, and building materials.", image: constructionMaterialsImage },
  { slug: "industrial-raw-materials", label: "Industrial Raw Materials", desc: "Plastics and polymers, chemicals, minerals, and engineering materials.", image: industrialRawMaterialsImage },
  { slug: "engineering-components-hardware", label: "Engineering Components", desc: "Mechanical parts, fabricated components, fasteners, and custom parts.", image: engineeringComponentsImage },
  { slug: "packaging-commercial-supplies", label: "Packaging & Supplies", desc: "Corrugated packaging, plastic packaging, bulk handling, and commercial supplies.", image: packagingSuppliesImage },
  { slug: "custom-sourcing", label: "Custom Sourcing", desc: "Buyer-led requirements, supplier identification, and procurement coordination.", image: customSourcingImage },
];

export default function ProductCategories() {
  return (
    <section className="section-pad bg-light section-border">
      <div className="container-site">

        <div className="section-heading-row">
          <div>
            <span className="eyebrow">Capabilities</span>
            <h2 className="section-title small">Sourcing and supply support across all categories.</h2>
          </div>
          <Link href="/products" className="btn btn-secondary">
            View all capabilities <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="cap-grid">
          {capabilityPreviews.map((cap) => (
            <Link
              key={cap.slug}
              href={`/products/${cap.slug}`}
              className="cap-grid-card"
              aria-label={`${cap.label} — view sourcing capability`}
            >
              <div className="cap-grid-media" aria-hidden="true">
                <Image
                  src={cap.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 25vw, (min-width: 540px) 50vw, 100vw"
                  className="cap-grid-image"
                />
              </div>
              <h3 className="cap-grid-title">{cap.label}</h3>
              <p className="cap-grid-desc">{cap.desc}</p>
              <span className="cap-grid-link">
                View <ArrowRight size={12} aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
