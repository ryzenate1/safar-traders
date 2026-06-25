import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import metalsImage from "@/images/industrialmetals.png";
import machineryImage from "@/images/machinery.png";
import materialsImage from "@/images/industrialmaterial.png";
import sourcingImage from "@/images/industrialsourcing.png";

const capabilities = [
  {
    slug: "industrial-metals",
    label: "Industrial Metals",
    title: "Industrial Metals Sourcing & Export",
    description:
      "Ferrous and non-ferrous metals sourced against buyer specification, including steel, aluminium, copper, brass, and recyclable metal materials.",
    chips: ["Ferrous Metals", "Non-Ferrous Metals", "Metal Forms & Stock"],
    image: metalsImage,
    imageAlt: "Steel and metal materials for industrial export",
  },
  {
    slug: "machinery-equipment",
    label: "Machinery & Equipment",
    title: "Machinery & Equipment Sourcing",
    description:
      "Industrial machinery, manufacturing equipment, mechanical components, and tools sourced for international buyers through verified supplier networks.",
    chips: ["Industrial Machinery", "Manufacturing Equipment", "Mechanical Components"],
    image: machineryImage,
    imageAlt: "Industrial machinery and manufacturing equipment",
  },
  {
    slug: "industrial-materials",
    label: "Industrial Materials",
    title: "Industrial Materials & Raw Inputs",
    description:
      "Plastic materials, paper, cardboard, rubber, packaging materials, and secondary industrial inputs sourced according to buyer requirements.",
    chips: ["Plastic Materials", "Paper & Cardboard", "Packaging Materials"],
    image: materialsImage,
    imageAlt: "Industrial raw materials including plastics and paper",
  },
  {
    slug: "general-sourcing",
    label: "General Sourcing",
    title: "Custom Industrial Sourcing",
    description:
      "For requirements outside standard categories, Safar Exports helps identify suitable suppliers and coordinate quotation-ready procurement.",
    chips: ["Custom Requirements", "Supplier Identification", "Export Coordination"],
    image: sourcingImage,
    imageAlt: "Industrial sourcing and export coordination",
  },
];

export default function ProductCategories() {
  return (
    <section className="section-pad bg-white section-border">
      <div className="container-site">

        <div className="section-heading-row">
          <div>
            <span className="eyebrow">Capabilities</span>
            <h2 className="section-title small">Industrial sourcing across four categories.</h2>
          </div>
          <Link href="/products" className="btn btn-secondary">
            All capabilities <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        <div className="cap-list">
          {capabilities.map((cap) => (
            <Link
              key={cap.slug}
              href={`/products/${cap.slug}`}
              className="cap-card"
              aria-label={`${cap.title} — view sourcing capability`}
            >
              <div className="cap-media">
                <Image
                  src={cap.image}
                  alt={cap.imageAlt}
                  fill
                  sizes="(min-width: 900px) 36vw, 100vw"
                  style={{ objectFit: "cover" }}
                  className="cap-media-img"
                />
              </div>
              <div className="cap-body">
                <span className="cap-label">{cap.label}</span>
                <h3 className="cap-title">{cap.title}</h3>
                <p className="cap-desc">{cap.description}</p>
                <ul className="cap-chips" aria-label="Subcategories">
                  {cap.chips.map((chip) => (
                    <li key={chip}>{chip}</li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
