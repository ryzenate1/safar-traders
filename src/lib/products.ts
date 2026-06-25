import type { StaticImageData } from "next/image";
import metalsImage from "@/images/industrialmetals.png";
import machineryImage from "@/images/machinery.png";
import materialsImage from "@/images/industrialmaterial.png";
import sourcingImage from "@/images/industrialsourcing.png";
import ferrousImage from "@/images/ferrous.avif";
import nonFerrousImage from "@/images/industrialmetals.png";
import plasticImage from "@/images/plastic.jpg";
import paperImage from "@/images/paper.webp";

export type ProductSubcategory = {
  slug: string;
  name: string;
  description: string;
  examples: string[];
  rfqNote: string;
  image?: StaticImageData;
};

export type ProductCategory = {
  slug: string;
  title: string;
  shortTitle: string;
  seoTitle: string;
  metaDescription: string;
  description: string;
  longDescription: string;
  buyerIntent: string;
  subcategories: ProductSubcategory[];
  packing: string[];
  documentation: string[];
  image?: StaticImageData;
};

const standardDocuments = [
  "Commercial invoice",
  "Packing list",
  "Bill of lading",
  "Certificate of origin (when required)",
  "Inspection or test report (when applicable)",
];

export const productCategories: ProductCategory[] = [
  {
    slug: "industrial-metals",
    title: "Industrial Metals Sourcing & Export",
    shortTitle: "Industrial Metals",
    seoTitle: "Industrial Metals Sourcing & Export from India | Safar Exports",
    metaDescription:
      "Source ferrous and non-ferrous metals, metal forms, and recyclable metal materials from India with export documentation and RFQ-based procurement support.",
    description:
      "Ferrous and non-ferrous metals sourced to buyer specification — steel, aluminium, copper, brass, and industrial metal materials from India.",
    longDescription:
      "Safar Exports supports international buyers sourcing ferrous and non-ferrous metals from India. We coordinate supplier identification, specification matching, packing, documentation, and shipment planning based on the buyer's required grade, quantity, and destination. Industrial metal scrap and recyclable metal materials are available as one sourcing subsection within this category.",
    buyerIntent:
      "For procurement teams looking for bulk metal supply, repeat sourcing, or a verified export partner for metal and metal material requirements.",
    subcategories: [
      {
        slug: "ferrous-metals",
        name: "Ferrous Metals",
        description:
          "Steel and iron in standard industrial grades — sourced from Indian mills and stockists against your specification. Suitable for manufacturing, construction, fabrication, and industrial applications.",
        examples: ["Mild steel", "Stainless steel", "Cast iron", "Structural steel sections", "Steel sheets", "Steel coils", "Steel plates", "HR/CR coils"],
        rfqNote: "Include grade, form (sheet/coil/plate/bar), thickness, and quantity in your requirement.",
        image: ferrousImage,
      },
      {
        slug: "non-ferrous-metals",
        name: "Non-Ferrous Metals",
        description:
          "Aluminium, copper, brass, bronze, zinc, and lead sourced in industrial quantities. Available in standard forms — ingots, sheets, rods, coils, and scrap grades where applicable.",
        examples: ["Aluminium ingots", "Copper wire bars", "Brass rods", "Zinc ingots", "Lead ingots", "Bronze billets", "Aluminium sheets"],
        rfqNote: "Specify alloy grade, purity level, form, and destination port for accurate feasibility review.",
        image: nonFerrousImage,
      },
      {
        slug: "metal-forms-stock",
        name: "Metal Forms & Stock",
        description:
          "Metal in specific forms for manufacturing or project use — sheets, plates, rods, pipes, tubes, coils, and billets. Sourced from Indian stockists and processors.",
        examples: ["Steel pipes", "Aluminium sheets", "Copper tubes", "MS rods", "Structural profiles", "Metal billets", "Plate cut-to-size"],
        rfqNote: "Provide dimensions, grade, and quantity. Cut-to-size and custom tolerance requirements can be reviewed.",
        image: metalsImage,
      },
      {
        slug: "recyclable-metal-materials",
        name: "Recyclable Metal Materials",
        description:
          "Industrial metal scrap and secondary metal materials sourced against buyer specification. This is one subsection within our industrial metals category — not the core business.",
        examples: ["Ferrous scrap", "Non-ferrous scrap", "Aluminium scrap", "Copper scrap", "Mixed metal scrap", "HMS 1&2", "Zorba"],
        rfqNote: "Specify metal type, grade/classification, purity expectation, quantity, and destination port.",
        image: ferrousImage,
      },
    ],
    packing: ["20 ft / 40 ft FCL", "Palletized", "Baled", "Bundled", "Loose or bulk where suitable"],
    documentation: standardDocuments,
    image: metalsImage,
  },
  {
    slug: "machinery-equipment",
    title: "Machinery & Equipment Sourcing",
    shortTitle: "Machinery & Equipment",
    seoTitle: "Machinery & Equipment Sourcing from India | Safar Exports",
    metaDescription:
      "Source industrial machinery, manufacturing equipment, mechanical components, tools, and machine parts from India for international procurement requirements.",
    description:
      "Industrial machinery, manufacturing equipment, mechanical components, and tools sourced for international buyers through Indian supplier networks.",
    longDescription:
      "We help buyers source machinery and industrial equipment through Indian supplier networks. Requirements can include new or used machinery, manufacturing tools, mechanical components, or production-line equipment. Each inquiry is reviewed against specification, condition, packing, and export feasibility before a quotation is issued.",
    buyerIntent:
      "For buyers who need a sourcing partner to identify equipment, verify condition, coordinate inspection, and manage export movement.",
    subcategories: [
      {
        slug: "industrial-machinery",
        name: "Industrial Machinery",
        description:
          "Production machines, processing machines, fabrication equipment, and plant machinery sourced from Indian manufacturers and dealers. New, refurbished, and used equipment reviewed to specification.",
        examples: ["Hydraulic press machines", "CNC machines", "Cutting machines", "Lathe machines", "Milling machines", "Press brakes", "Injection moulding machines"],
        rfqNote: "Provide machine type, capacity or tonnage, condition preference (new/used), and destination port.",
        image: machineryImage,
      },
      {
        slug: "manufacturing-equipment",
        name: "Manufacturing Equipment",
        description:
          "Workshop equipment, packaging machinery, material handling equipment, and production-line support assets sourced for international buyers.",
        examples: ["Packaging machines", "Conveyors", "Compressors", "Generators", "Air handling units", "Cooling towers", "Industrial fans"],
        rfqNote: "Include capacity, power specification, and any relevant standards or certifications required.",
        image: machineryImage,
      },
      {
        slug: "mechanical-components",
        name: "Mechanical Components",
        description:
          "Pumps, motors, bearings, valves, compressors, gears, shafts, and related mechanical parts sourced from Indian manufacturers and authorised distributors.",
        examples: ["Centrifugal pumps", "Electric motors", "Industrial bearings", "Gate valves", "Gear boxes", "Drive shafts", "Hydraulic cylinders"],
        rfqNote: "Provide part number, make/model reference, technical specification, and quantity.",
        image: machineryImage,
      },
      {
        slug: "tools-machine-parts",
        name: "Tools & Machine Parts",
        description:
          "Cutting tools, dies, fixtures, spares, replacement parts, and custom industrial tools sourced for specific machine types and production requirements.",
        examples: ["Carbide cutting tools", "Press dies", "Jigs and fixtures", "OEM replacement parts", "Industrial drill bits", "Tool holders"],
        rfqNote: "Reference the machine model and provide drawing or specification where applicable.",
        image: machineryImage,
      },
    ],
    packing: ["Wooden crate", "Palletized", "Containerized (20ft/40ft)", "Flat rack for OOG cargo", "Unit-specific packing"],
    documentation: standardDocuments,
    image: machineryImage,
  },
  {
    slug: "industrial-materials",
    title: "Industrial Materials & Raw Inputs",
    shortTitle: "Industrial Materials",
    seoTitle: "Industrial Materials & Raw Inputs Sourcing from India | Safar Exports",
    metaDescription:
      "Source plastic materials, paper, cardboard, packaging materials, rubber, and industrial raw inputs from India with export coordination.",
    description:
      "Plastic materials, paper, cardboard, rubber, packaging materials, and secondary industrial inputs sourced against buyer specification.",
    longDescription:
      "Safar Exports sources industrial raw materials and secondary manufacturing inputs for buyers who need reliable procurement support from India. This category covers plastic polymers, paper-based materials, rubber, and packaging materials. We focus on specification clarity, packing suitability, and export documentation throughout.",
    buyerIntent:
      "For importers and manufacturers looking for bulk industrial materials, recurring supply, or custom-grade sourcing from India.",
    subcategories: [
      {
        slug: "plastic-materials",
        name: "Plastic Materials",
        description:
          "Industrial plastic raw materials sourced from Indian manufacturers and processors — including virgin and reprocessed polymer grades to buyer specification.",
        examples: ["PET flakes / granules", "HDPE granules", "PP granules", "PVC compound", "LDPE film grade", "Plastic regrind", "Engineering polymers"],
        rfqNote: "Specify polymer type, grade (virgin/reprocessed), MFI if applicable, form, and destination.",
        image: plasticImage,
      },
      {
        slug: "paper-cardboard",
        name: "Paper & Cardboard",
        description:
          "Industrial paper and cardboard materials sourced from Indian mills — paper rolls, kraft paper, cardboard, and corrugated board in standard and custom grades.",
        examples: ["Kraft paper rolls", "Corrugated board", "Cardboard sheets", "Newsprint", "Liner board", "Tissue jumbo rolls", "Mixed paper grades"],
        rfqNote: "Include GSM, width, core size, grade, and quantity (MT or rolls).",
        image: paperImage,
      },
      {
        slug: "packaging-materials",
        name: "Packaging Materials",
        description:
          "Bulk packaging materials for industrial and export use — corrugated board, cartons, plastic drums, industrial bags, and export-grade packing supplies.",
        examples: ["Corrugated cartons", "HDPE woven bags", "Plastic drums (200L)", "Stretch wrap", "Strapping rolls", "Industrial bubble wrap", "PP sacks"],
        rfqNote: "Provide product dimensions, load capacity, and intended application for accurate specification review.",
        image: materialsImage,
      },
      {
        slug: "rubber-industrial-inputs",
        name: "Rubber & Other Industrial Inputs",
        description:
          "Rubber sheets, industrial polymers, composite materials, and buyer-specific raw material inputs sourced from Indian suppliers.",
        examples: ["Rubber sheets", "SBR rubber", "EPDM rubber", "Industrial belting", "Conveyor rubber", "Polymer compounds", "Secondary raw materials"],
        rfqNote: "Specify rubber type, hardness (Shore A), dimensions, and application.",
        image: materialsImage,
      },
    ],
    packing: ["Bales", "Big bags / jumbo bags", "Palletized", "20 ft / 40 ft FCL", "Packing as per material type"],
    documentation: standardDocuments,
    image: materialsImage,
  },
  {
    slug: "general-sourcing",
    title: "General Industrial Sourcing",
    shortTitle: "General Sourcing",
    seoTitle: "Custom Industrial Sourcing & Procurement Support | Safar Exports",
    metaDescription:
      "Safar Exports supports custom industrial sourcing, supplier identification, procurement coordination, and export documentation for international buyers.",
    description:
      "A sourcing route for industrial requirements outside standard categories — handled through a structured RFQ and feasibility process.",
    longDescription:
      "Many international buyers need a procurement partner for products that are not listed in a standard catalogue. Safar Exports reviews custom industrial sourcing requirements covering supplier identification, procurement coordination, export documentation, and buyer-specific specifications. Submit your requirement and we will assess feasibility, supplier availability, and export handling.",
    buyerIntent:
      "For procurement teams with non-standard industrial requirements, multi-product orders, or buyers building a new supply relationship with India.",
    subcategories: [
      {
        slug: "custom-industrial-requirements",
        name: "Custom Industrial Requirements",
        description:
          "For requirements outside standard categories — multi-product sourcing, buyer-specified materials, or products requiring individual feasibility review.",
        examples: ["Buyer-specified products", "Multi-category orders", "Specification-based sourcing", "Non-catalogue requirements"],
        rfqNote: "Describe your requirement as specifically as possible. We will review feasibility and revert with sourcing options.",
        image: sourcingImage,
      },
      {
        slug: "supplier-identification",
        name: "Supplier Identification",
        description:
          "Finding suitable manufacturers or suppliers based on product, grade, quantity, and destination. Includes initial qualification check and sample coordination where required.",
        examples: ["Vendor search", "Manufacturer identification", "Supplier qualification", "Sample coordination"],
        rfqNote: "Provide product specification and target price if available. We will shortlist viable suppliers.",
        image: sourcingImage,
      },
      {
        slug: "procurement-coordination",
        name: "Procurement Coordination",
        description:
          "Managing the quotation cycle, order follow-up, supplier communication, and shipment readiness review on behalf of the buyer.",
        examples: ["Quotation management", "Order follow-up", "Quality document review", "Shipment readiness check"],
        rfqNote: "Share existing supplier details or product details and we will manage the procurement workflow.",
        image: sourcingImage,
      },
      {
        slug: "export-documentation-support",
        name: "Export Documentation Support",
        description:
          "Preparation and coordination of export documents — commercial invoice, packing list, certificate of origin, bill of lading, and inspection documents.",
        examples: ["Commercial invoice", "Certificate of origin", "Packing list", "BL coordination", "Inspection certificate"],
        rfqNote: "Describe the shipment and destination. We will confirm which documents are required for clearance.",
        image: sourcingImage,
      },
    ],
    packing: ["Determined by product", "Export packing review included", "Containerized where applicable"],
    documentation: standardDocuments,
    image: sourcingImage,
  },
];

export function getProductCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}

// legacy sub-type for any code that used the old shape
export type ProductSubCategory = { name: string; items: string[] };
