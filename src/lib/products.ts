import type { StaticImageData } from "next/image";
import constructionImage from "@/images/construction.png";
import engineeringImage from "@/images/engineering.png";
import industrialMaterialsImage from "@/images/industrialmaterial.png";
import industrialScrapImage from "@/images/industrialscrap.png";
import customSourcingImage from "@/images/industrialsourcing.png";
import machineryImage from "@/images/machine.png";
import metalsAlloysImage from "@/images/metalandalloy.png";
import packagingImage from "@/images/packing.png";

export type ProductSubcategory = {
  slug: string;
  name: string;
  description: string;
  examples: string[];
  rfqNote: string;
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
  image: StaticImageData;
  imageAlt: string;
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
    slug: "metals-alloys",
    title: "Metals & Alloys",
    shortTitle: "Metals & Alloys",
    seoTitle: "Metals & Alloys Sourcing & Export from India | Safar Exports",
    metaDescription:
      "Source ferrous metals, non-ferrous metals, stainless steel, aluminium, copper, brass, and nickel alloys from India with full export documentation support.",
    description:
      "Ferrous and non-ferrous metals, stainless steel, aluminium, copper, brass, and nickel alloys sourced to buyer specification from India.",
    longDescription:
      "Safar Exports coordinates procurement of industrial metals and alloys for international buyers. We handle supplier identification, specification matching, packing, documentation, and shipment planning based on your required grade, quantity, and destination. From standard steel grades to speciality nickel alloys, each requirement is reviewed for sourcing feasibility before a quotation is issued.",
    buyerIntent:
      "For procurement teams sourcing bulk metals, recurring metal supply, or buyers establishing a verified export partner for metals and alloys from India.",
    subcategories: [
      {
        slug: "ferrous-metals",
        name: "Ferrous Metals",
        description:
          "Steel and iron in standard industrial grades sourced from Indian mills and stockists. Suitable for manufacturing, construction, fabrication, and general industrial use.",
        examples: ["Mild steel", "Structural steel sections", "Steel sheets", "Steel coils", "Steel plates", "HR/CR coils", "Cast iron"],
        rfqNote: "Include grade, form (sheet / coil / plate / bar), thickness, and required quantity.",
      },
      {
        slug: "non-ferrous-metals",
        name: "Non-Ferrous Metals",
        description:
          "Aluminium, copper, brass, bronze, zinc, and lead sourced in industrial quantities. Available in standard forms — ingots, sheets, rods, coils, and scrap grades where applicable.",
        examples: ["Aluminium ingots", "Copper wire bars", "Zinc ingots", "Lead ingots", "Bronze billets"],
        rfqNote: "Specify alloy grade, purity level, form, and destination port for accurate feasibility review.",
      },
      {
        slug: "stainless-steel",
        name: "Stainless Steel",
        description:
          "Stainless steel in various grades and forms sourced from Indian mills and processors for industrial, food-grade, and engineering applications.",
        examples: ["SS 304 sheets", "SS 316 coils", "SS pipes and tubes", "SS bars", "SS plates", "SS fasteners"],
        rfqNote: "Specify grade (304 / 316 / 202 etc.), form, surface finish, and dimensions.",
      },
      {
        slug: "aluminum",
        name: "Aluminum",
        description:
          "Aluminium in primary and secondary grades — ingots, billets, sheets, extrusions, and coils sourced to buyer specification from Indian suppliers and processors.",
        examples: ["Aluminium ingots", "Aluminium sheets", "Aluminium coils", "Aluminium extrusions", "Aluminium billets", "Aluminium alloy rods"],
        rfqNote: "Provide alloy grade (e.g. 6061, 1100), temper, form, and dimensions required.",
      },
      {
        slug: "copper",
        name: "Copper",
        description:
          "Electrolytic copper and copper products sourced for industrial, electrical, and manufacturing requirements — cathodes, rods, wires, sheets, and tubes.",
        examples: ["Copper cathodes", "Copper rods", "Copper wire bars", "Copper sheets", "Copper tubes", "Copper strips"],
        rfqNote: "Specify purity grade, form, dimensions, and quantity. Certifications available on request.",
      },
      {
        slug: "brass",
        name: "Brass",
        description:
          "Brass alloys in rods, sheets, tubes, and fittings sourced from Indian manufacturers for plumbing, engineering, and decorative applications.",
        examples: ["Brass rods", "Brass sheets", "Brass tubes", "Brass fittings", "Brass extrusions", "Brass forgings"],
        rfqNote: "State alloy composition (e.g. 60/40, 70/30), form, and application.",
      },
      {
        slug: "nickel-alloys",
        name: "Nickel Alloys",
        description:
          "Nickel and nickel-based alloys for high-temperature, corrosion-resistant, and speciality engineering applications sourced from verified Indian suppliers.",
        examples: ["Nickel 200 / 201 rounds", "Inconel plates", "Monel rods", "Hastelloy sheets", "Nickel alloy pipes", "Nickel strips"],
        rfqNote: "Specify alloy designation, form, dimensions, and any applicable standards (ASTM, ASME).",
      },
    ],
    packing: ["20 ft / 40 ft FCL", "Palletized", "Baled", "Bundled", "Loose or bulk where suitable"],
    documentation: standardDocuments,
    image: metalsAlloysImage,
    imageAlt: "Industrial metal coils, pipes, brass rods, copper sheets, and alloy stock",
  },
  {
    slug: "industrial-scrap-recyclable-materials",
    title: "Industrial Scrap & Recyclable Materials",
    shortTitle: "Industrial Scrap",
    seoTitle: "Industrial Scrap & Recyclable Materials | Safar Exports",
    metaDescription:
      "Source metal scrap, plastic scrap, paper and cardboard, rubber scrap, and electronic scrap from India with export coordination and documentation support.",
    description:
      "Metal scrap, plastic scrap, paper and cardboard, rubber scrap, and electronic scrap sourced to buyer specification from India.",
    longDescription:
      "Safar Exports supports international buyers sourcing industrial scrap and recyclable materials from India. We coordinate supplier identification, grade verification, packing, and export documentation for metal, plastic, paper, rubber, and electronic scrap requirements. Each requirement is reviewed for feasibility and grade compliance before a quotation is issued.",
    buyerIntent:
      "For recyclers, reprocessors, and trading houses sourcing classified industrial scrap and recyclable feedstock from India.",
    subcategories: [
      {
        slug: "metal-scrap",
        name: "Metal Scrap",
        description:
          "Ferrous and non-ferrous metal scrap sourced to buyer grade classification from Indian industrial and processing sources.",
        examples: ["HMS 1 & 2", "Zorba", "Aluminium scrap", "Copper scrap", "Brass scrap", "Cast iron scrap", "Stainless steel scrap"],
        rfqNote: "Specify metal type, grade/classification, purity expectation, quantity, and destination port.",
      },
      {
        slug: "plastic-scrap",
        name: "Plastic Scrap",
        description:
          "Post-industrial plastic scrap and regrind in classified grades — sourced from Indian manufacturing facilities for reprocessing use.",
        examples: ["PET bottle scrap", "HDPE scrap", "PP regrind", "PVC scrap", "LDPE film scrap", "ABS regrind", "Mixed plastic scrap"],
        rfqNote: "Provide polymer type, grade, contamination tolerance, form (baled/loose), and quantity.",
      },
      {
        slug: "paper-cardboard",
        name: "Paper & Cardboard",
        description:
          "Paper and cardboard recyclable materials sourced from Indian industrial and commercial sources — for pulp mills and paper recyclers.",
        examples: ["OCC (Old Corrugated Cartons)", "ONP (Old Newsprint)", "Mixed paper", "Kraft scrap", "White ledger", "Cardboard bales"],
        rfqNote: "Include ISRI grade classification, baling method, moisture tolerance, and quantity (MT).",
      },
      {
        slug: "rubber-scrap",
        name: "Rubber Scrap",
        description:
          "Rubber scrap and secondary rubber materials sourced from Indian industrial and tyre-related sources for recycling and reprocessing.",
        examples: ["Tyre scrap (TDF)", "Rubber crumb feedstock", "Industrial rubber off-cuts", "EPDM scrap", "Natural rubber scrap"],
        rfqNote: "Specify rubber type, intended use, particle size requirement if any, and quantity.",
      },
      {
        slug: "electronic-scrap",
        name: "Electronic Scrap",
        description:
          "Electronic waste and e-scrap materials sourced from verified Indian industrial sources — for licensed recyclers and precious metal recovery operations.",
        examples: ["PCB boards", "Motherboards", "RAM and processors", "Mixed e-scrap", "Hard drive scraps", "Cable wire scrap"],
        rfqNote: "Provide required material type, purity expectation, and any regulatory compliance requirements for your destination.",
      },
    ],
    packing: ["Baled", "Loose bulk in containers", "Big bags / jumbo bags", "20 ft / 40 ft FCL"],
    documentation: standardDocuments,
    image: industrialScrapImage,
    imageAlt: "Baled industrial scrap and recyclable materials in a warehouse",
  },
  {
    slug: "machinery-equipment",
    title: "Machinery & Equipment",
    shortTitle: "Machinery & Equipment",
    seoTitle: "Industrial Machinery & Equipment Sourcing from India | Safar Exports",
    metaDescription:
      "Source manufacturing machinery, processing equipment, industrial tools, heavy equipment, and automation equipment from India for international procurement requirements.",
    description:
      "Manufacturing machinery, processing equipment, industrial tools, heavy equipment, and automation equipment sourced through Indian supplier networks.",
    longDescription:
      "Safar Exports helps buyers source industrial machinery and equipment through verified Indian supplier networks. Requirements can include new or used machinery, processing equipment, automation assets, heavy equipment, and industrial tools. Each requirement is reviewed against specification, condition, packing suitability, and export feasibility before a quotation is issued.",
    buyerIntent:
      "For buyers who need a sourcing partner to identify equipment, coordinate inspection, and manage export movement from India.",
    subcategories: [
      {
        slug: "manufacturing-machinery",
        name: "Manufacturing Machinery",
        description:
          "Production machines, fabrication equipment, and plant machinery sourced from Indian manufacturers and dealers — new, refurbished, and used equipment reviewed to specification.",
        examples: ["CNC machines", "Hydraulic press machines", "Lathe machines", "Milling machines", "Press brakes", "Injection moulding machines", "Cutting machines"],
        rfqNote: "Provide machine type, capacity or tonnage, condition preference (new / used), and destination port.",
      },
      {
        slug: "processing-equipment",
        name: "Processing Equipment",
        description:
          "Industrial processing machinery for food, chemical, pharmaceutical, and material processing applications sourced from Indian manufacturers.",
        examples: ["Mixing equipment", "Dryers", "Conveyors", "Cooling towers", "Air handling units", "Industrial fans", "Compressors"],
        rfqNote: "Include capacity, power specification, and any standards or certifications required.",
      },
      {
        slug: "industrial-tools",
        name: "Industrial Tools",
        description:
          "Cutting tools, dies, fixtures, and industrial hand and power tools sourced for specific manufacturing and production requirements.",
        examples: ["Carbide cutting tools", "Press dies", "Jigs and fixtures", "Industrial drill bits", "Tool holders", "Grinding tools"],
        rfqNote: "Reference the machine model and provide drawing or specification where applicable.",
      },
      {
        slug: "heavy-equipment",
        name: "Heavy Equipment",
        description:
          "Construction and industrial heavy equipment sourced from India — new and used units reviewed for condition, certification, and export feasibility.",
        examples: ["Excavators", "Forklifts", "Cranes", "Loaders", "Compactors", "Generators", "Diesel engines"],
        rfqNote: "Provide equipment type, capacity, make/model preference, condition, and destination port.",
      },
      {
        slug: "automation-equipment",
        name: "Automation Equipment",
        description:
          "Industrial automation components and systems sourced for manufacturing, assembly, and material handling applications.",
        examples: ["PLCs", "Servo motors", "Conveyor systems", "Robotic arms", "Sensors and actuators", "HMI panels", "VFDs"],
        rfqNote: "Provide brand preference, model number where available, and application context.",
      },
    ],
    packing: ["Wooden crate", "Palletized", "Containerized (20ft / 40ft)", "Flat rack for OOG cargo", "Unit-specific packing"],
    documentation: standardDocuments,
    image: machineryImage,
    imageAlt: "Industrial machinery, pumps, motors, and manufacturing equipment",
  },
  {
    slug: "construction-building-materials",
    title: "Construction & Building Materials",
    shortTitle: "Construction Materials",
    seoTitle: "Construction & Building Materials Export from India | Safar Exports",
    metaDescription:
      "Source granite, marble, natural stone, tiles, and building materials from India with export documentation and procurement coordination support.",
    description:
      "Granite, marble, natural stone, tiles, and industrial building materials sourced from India for construction and infrastructure projects.",
    longDescription:
      "Safar Exports supports international buyers sourcing construction and building materials from India. We coordinate procurement of stone products, tiles, and building inputs from verified Indian quarries and manufacturers. Each requirement is reviewed for specification, quality, packing suitability, and export handling before a quotation is issued.",
    buyerIntent:
      "For construction companies, project developers, and trading houses sourcing Indian stone and building materials for domestic or export use.",
    subcategories: [
      {
        slug: "granite",
        name: "Granite",
        description:
          "Indian granite in polished, honed, and flamed finishes sourced from quarries across South India and Rajasthan — available in slabs, tiles, and cut-to-size formats.",
        examples: ["Black Galaxy granite", "Absolute Black", "Kashmir White", "Multi-colour red", "Granite slabs", "Granite tiles", "Granite kerbs"],
        rfqNote: "Specify colour / variety, finish, dimensions, thickness, and quantity (sqm or MT).",
      },
      {
        slug: "marble",
        name: "Marble",
        description:
          "Indian marble in standard and premium varieties sourced from Rajasthan and other marble-producing regions — slabs, tiles, and custom cut pieces.",
        examples: ["Makrana white", "Rainforest marble", "Onyx marble", "Marble slabs", "Marble tiles", "Marble flooring blocks"],
        rfqNote: "Specify variety, finish, slab size or tile dimensions, thickness, and quantity.",
      },
      {
        slug: "natural-stone",
        name: "Natural Stone",
        description:
          "Sandstone, limestone, slate, and other natural stone products sourced from Indian quarries for cladding, paving, and landscaping applications.",
        examples: ["Sandstone cladding", "Slate tiles", "Limestone blocks", "Cobblestones", "Paving slabs", "Quartzite tiles"],
        rfqNote: "Provide stone type, application (cladding / paving / flooring), finish, and dimensions.",
      },
      {
        slug: "tiles",
        name: "Tiles",
        description:
          "Ceramic, vitrified, and porcelain tiles sourced from Indian manufacturers for residential, commercial, and industrial flooring and wall applications.",
        examples: ["Vitrified floor tiles", "Wall tiles", "Porcelain tiles", "Mosaic tiles", "Anti-skid tiles", "Large format tiles"],
        rfqNote: "Include size, finish, grade (AAA / AA), intended application, and quantity (boxes or sqm).",
      },
      {
        slug: "building-materials",
        name: "Building Materials",
        description:
          "Structural and auxiliary building materials sourced from Indian manufacturers and suppliers for construction and infrastructure projects.",
        examples: ["Cement bags", "TMT steel bars", "AAC blocks", "Roof tiles", "Plywood sheets", "PVC pipes", "Waterproofing materials"],
        rfqNote: "Provide product type, grade / standard, and quantity per shipment.",
      },
    ],
    packing: ["Wooden crates for stone slabs", "Palletized", "Containerized (20ft / 40ft)", "Sea-worthy packing", "Carton packing for tiles"],
    documentation: standardDocuments,
    image: constructionImage,
    imageAlt: "Construction and building materials including cement, bricks, pipes, steel, and glass",
  },
  {
    slug: "industrial-raw-materials",
    title: "Industrial Raw Materials",
    shortTitle: "Industrial Raw Materials",
    seoTitle: "Industrial Raw Materials Sourcing from India | Safar Exports",
    metaDescription:
      "Source plastics and polymers, packaging materials, industrial chemicals, minerals, and engineering materials from India with procurement and export support.",
    description:
      "Plastics and polymers, packaging materials, industrial chemicals, minerals, and engineering materials sourced from India to buyer specification.",
    longDescription:
      "Safar Exports sources industrial raw materials and manufacturing inputs for buyers who need reliable procurement support from India. This category covers plastic polymers, packaging materials, industrial chemicals, minerals, and speciality engineering materials. We focus on specification clarity, grade verification, packing suitability, and export documentation throughout.",
    buyerIntent:
      "For importers and manufacturers sourcing bulk industrial raw materials, recurring supply, or custom-grade inputs from India.",
    subcategories: [
      {
        slug: "plastics-polymers",
        name: "Plastics & Polymers",
        description:
          "Industrial plastic raw materials — virgin and reprocessed polymer grades sourced from Indian manufacturers and compounders to buyer specification.",
        examples: ["PET flakes / granules", "HDPE granules", "PP granules", "PVC compound", "LDPE film grade", "Plastic regrind", "Engineering polymers"],
        rfqNote: "Specify polymer type, grade (virgin / reprocessed), MFI if applicable, form, and destination.",
      },
      {
        slug: "packaging-materials",
        name: "Packaging Materials",
        description:
          "Bulk packaging raw materials and semi-finished packaging inputs sourced for industrial manufacturers and packaging converters.",
        examples: ["Kraft paper rolls", "BOPP film rolls", "Aluminium foil rolls", "PE stretch film", "Corrugated board rolls", "Liner board"],
        rfqNote: "Include GSM, width, core size, grade, and quantity (MT or rolls).",
      },
      {
        slug: "industrial-chemicals",
        name: "Industrial Chemicals",
        description:
          "Industrial chemicals and chemical compounds sourced from Indian manufacturers — subject to regulatory compliance and export approval where applicable.",
        examples: ["Soda ash", "Caustic soda flakes", "Titanium dioxide", "Carbon black", "Silica gel", "Sodium silicate", "Chemical intermediates"],
        rfqNote: "Provide chemical name, grade / purity, required quantity, SDS, and destination country for compliance review.",
      },
      {
        slug: "minerals",
        name: "Minerals",
        description:
          "Industrial minerals and mineral-based materials sourced from Indian mines and processors for manufacturing, construction, and processing use.",
        examples: ["Silica sand", "Calcium carbonate", "Talc powder", "Feldspar", "Barite", "Dolomite", "Kaolin clay"],
        rfqNote: "Specify mineral type, grade, mesh size / fineness, quantity, and end application.",
      },
      {
        slug: "engineering-materials",
        name: "Engineering Materials",
        description:
          "Speciality engineering materials including composites, industrial rubber, seals, and technical materials sourced from Indian manufacturers.",
        examples: ["Rubber sheets", "EPDM strips", "PTFE sheets", "Fibreglass panels", "Industrial belting", "Conveyor rubber", "Composite boards"],
        rfqNote: "Specify material type, hardness or grade, dimensions, and application.",
      },
    ],
    packing: ["Bales", "Big bags / jumbo bags", "Palletized", "20 ft / 40 ft FCL", "Packing as per material type"],
    documentation: standardDocuments,
    image: industrialMaterialsImage,
    imageAlt: "Industrial raw materials and manufacturing inputs for export sourcing",
  },
  {
    slug: "engineering-components-hardware",
    title: "Engineering Components & Hardware",
    shortTitle: "Engineering Components",
    seoTitle: "Engineering Components & Hardware Sourcing from India | Safar Exports",
    metaDescription:
      "Source mechanical parts, fabricated components, industrial hardware, fasteners, and custom manufactured parts from India for engineering and industrial applications.",
    description:
      "Mechanical parts, fabricated components, industrial hardware, fasteners, and custom manufactured parts sourced from India to buyer specification.",
    longDescription:
      "Safar Exports coordinates procurement of engineering components and industrial hardware for international buyers. We support sourcing of standard mechanical parts, fabricated assemblies, fasteners, and custom-manufactured components from verified Indian suppliers. Each requirement is reviewed against specification, tolerance, material, and export feasibility before a quotation is issued.",
    buyerIntent:
      "For engineering firms, OEM buyers, and procurement teams sourcing components, parts, and hardware from Indian manufacturers.",
    subcategories: [
      {
        slug: "mechanical-parts",
        name: "Mechanical Parts",
        description:
          "Pumps, motors, bearings, valves, gears, shafts, and related mechanical parts sourced from Indian manufacturers and authorised distributors.",
        examples: ["Centrifugal pumps", "Electric motors", "Industrial bearings", "Gate valves", "Gear boxes", "Drive shafts", "Hydraulic cylinders"],
        rfqNote: "Provide part number, make / model reference, technical specification, and quantity.",
      },
      {
        slug: "fabricated-components",
        name: "Fabricated Components",
        description:
          "Structural and machined fabricated components manufactured to buyer drawing or specification from Indian fabrication and machining shops.",
        examples: ["Welded assemblies", "Machined parts", "Structural frames", "Sheet metal fabrications", "Precision turned parts", "Casting and forgings"],
        rfqNote: "Provide engineering drawing, material specification, tolerances, and order quantity.",
      },
      {
        slug: "industrial-hardware",
        name: "Industrial Hardware",
        description:
          "Industrial hardware and fittings including clamps, brackets, hinges, locks, and general mechanical hardware sourced from Indian manufacturers.",
        examples: ["Pipe clamps", "Steel brackets", "Industrial hinges", "Door hardware sets", "Spring clips", "Wire rope clips", "Cable glands"],
        rfqNote: "Specify product type, material grade, finish, dimensions, and quantity.",
      },
      {
        slug: "fasteners",
        name: "Fasteners",
        description:
          "Industrial fasteners — bolts, nuts, screws, washers, studs, and anchors — sourced from Indian fastener manufacturers in standard and custom grades.",
        examples: ["Hex bolts", "Stainless steel screws", "Anchor bolts", "High tensile nuts", "Spring washers", "Threaded rods", "Self-drilling screws"],
        rfqNote: "Provide standard (ISO / DIN / ANSI), material grade, size, and quantity.",
      },
      {
        slug: "custom-manufactured-parts",
        name: "Custom Manufactured Parts",
        description:
          "Buyer-specified parts and components manufactured to drawing or sample — coordinated through Indian manufacturers with quality checks and export handling.",
        examples: ["OEM replacement parts", "Drawing-based machined parts", "Custom castings", "Injection moulded parts", "Custom forgings", "Prototype components"],
        rfqNote: "Provide drawing, sample, or specification. Include material, quantity, and target delivery timeline.",
      },
    ],
    packing: ["Export cartons", "Palletized", "Wooden crates for heavy parts", "20 ft / 40 ft FCL", "Custom packing per requirement"],
    documentation: standardDocuments,
    image: engineeringImage,
    imageAlt: "Engineering components, bearings, fasteners, and mechanical hardware",
  },
  {
    slug: "packaging-commercial-supplies",
    title: "Packaging & Commercial Supplies",
    shortTitle: "Packaging & Supplies",
    seoTitle: "Packaging & Commercial Supplies Sourcing from India | Safar Exports",
    metaDescription:
      "Source cartons and corrugated packaging, plastic packaging, industrial packing materials, bulk handling supplies, and commercial supply requirements from India.",
    description:
      "Cartons and corrugated packaging, plastic packaging, industrial packing materials, bulk handling supplies, and commercial supply requirements sourced from India.",
    longDescription:
      "Safar Exports sources packaging and commercial supply requirements for buyers who need reliable, scalable sourcing from India. We coordinate procurement of corrugated packaging, plastic containers, industrial packing materials, and bulk handling supplies. Each requirement is reviewed for material specification, print and finish requirements, and export feasibility.",
    buyerIntent:
      "For distributors, manufacturers, and commercial buyers sourcing bulk packaging and supply materials from India.",
    subcategories: [
      {
        slug: "cartons-corrugated-packaging",
        name: "Cartons & Corrugated Packaging",
        description:
          "Corrugated cartons, boxes, and packaging board sourced from Indian packaging manufacturers — standard and custom sizes, including print-ready options.",
        examples: ["RSC corrugated cartons", "Die-cut boxes", "Heavy-duty cartons", "Corrugated sheets", "Master cartons", "Archive boxes"],
        rfqNote: "Provide internal dimensions, wall spec (3-ply / 5-ply / 7-ply), print requirement, and quantity.",
      },
      {
        slug: "plastic-packaging",
        name: "Plastic Packaging",
        description:
          "Plastic containers, drums, bottles, bags, and packaging films sourced from Indian manufacturers for industrial and commercial packing use.",
        examples: ["HDPE drums (200L)", "Jerry cans", "Plastic pallets", "Stretch wrap rolls", "BOPP bags", "Plastic bottles", "IBC containers"],
        rfqNote: "Specify container type, volume / capacity, material, colour, and quantity.",
      },
      {
        slug: "industrial-packing-materials",
        name: "Industrial Packing Materials",
        description:
          "Consumable packing materials for industrial and export packing operations — strapping, tape, foam, bubble wrap, and void fill.",
        examples: ["Strapping rolls (PP / PET)", "Carton sealing tape", "Foam rolls", "Bubble wrap", "Edge guards", "Desiccant packets", "Stretch film"],
        rfqNote: "State material type, width, roll length, and required quantity.",
      },
      {
        slug: "bulk-handling-supplies",
        name: "Bulk Handling Supplies",
        description:
          "Bulk material handling and storage supplies — jumbo bags, woven sacks, bulk containers, and intermediate bulk packaging sourced from India.",
        examples: ["FIBC jumbo bags", "PP woven sacks", "Liner bags", "Bulk containers", "Open-top bags", "Anti-static bags", "Flexible containers"],
        rfqNote: "Provide SWL (safe working load), dimensions, UV treatment, and quantity per order.",
      },
      {
        slug: "commercial-supply-requirements",
        name: "Commercial Supply Requirements",
        description:
          "General commercial supply requirements outside standard packaging categories — sourced through India on a buyer-led requirement basis.",
        examples: ["Stationery supplies", "Cleaning materials", "Safety consumables", "Office supplies", "Janitorial supplies", "General merchandise"],
        rfqNote: "Describe the supply requirement in detail. We will assess sourcing feasibility and respond with options.",
      },
    ],
    packing: ["20 ft / 40 ft FCL", "Palletized", "Baled", "As per product specification"],
    documentation: standardDocuments,
    image: packagingImage,
    imageAlt: "Packaging and commercial supply materials for industrial buyers",
  },
  {
    slug: "custom-sourcing",
    title: "Custom Sourcing",
    shortTitle: "Custom Sourcing",
    seoTitle: "Custom Industrial Sourcing Support from India | Safar Exports",
    metaDescription:
      "Safar Exports supports buyer-led sourcing, supplier identification, procurement coordination, non-standard product requests, and domestic and export supply from India.",
    description:
      "A structured sourcing route for buyer-led requirements outside standard categories — handled through RFQ review, supplier identification, and procurement coordination.",
    longDescription:
      "Many international buyers need a procurement partner for products that fall outside a standard catalogue. Safar Exports reviews custom industrial sourcing requirements — covering supplier identification, procurement coordination, export documentation, and buyer-specific specifications. Submit your requirement and we will assess feasibility, supplier availability, and export handling.",
    buyerIntent:
      "For procurement teams with non-standard industrial requirements, multi-product orders, or buyers establishing a new supply relationship from India.",
    subcategories: [
      {
        slug: "buyer-led-requirements",
        name: "Buyer-Led Requirements",
        description:
          "For requirements outside standard categories — multi-product sourcing, buyer-specified materials, or products requiring individual feasibility review.",
        examples: ["Buyer-specified products", "Multi-category orders", "Specification-based sourcing", "Non-catalogue requirements"],
        rfqNote: "Describe your requirement as specifically as possible. We will review feasibility and revert with sourcing options.",
      },
      {
        slug: "supplier-identification",
        name: "Supplier Identification",
        description:
          "Finding suitable manufacturers or suppliers based on product, grade, quantity, and destination — including initial qualification check and sample coordination.",
        examples: ["Vendor search", "Manufacturer identification", "Supplier qualification", "Sample coordination", "Factory shortlisting"],
        rfqNote: "Provide product specification and target price if available. We will shortlist viable suppliers.",
      },
      {
        slug: "procurement-coordination",
        name: "Procurement Coordination",
        description:
          "Managing the quotation cycle, order follow-up, supplier communication, and shipment readiness review on behalf of the buyer.",
        examples: ["Quotation management", "Order follow-up", "Quality document review", "Shipment readiness check", "Pre-shipment coordination"],
        rfqNote: "Share existing supplier details or product details and we will manage the procurement workflow.",
      },
      {
        slug: "non-standard-product-requests",
        name: "Non-Standard Product Requests",
        description:
          "Sourcing products with non-standard specifications, unusual grade requirements, or combination requirements across multiple product types.",
        examples: ["Custom dimension products", "Mixed grade orders", "Products with special certifications", "Combination supply requirements"],
        rfqNote: "Provide full specification details. Complex requirements are reviewed for feasibility before a quotation is prepared.",
      },
      {
        slug: "domestic-export-supply-support",
        name: "Domestic and Export Supply Support",
        description:
          "Supply support for both domestic delivery within India and international export — including documentation, logistics coordination, and buyer-agent communication.",
        examples: ["Domestic supply", "Export supply", "Documentation support", "Logistics coordination", "Certificate of origin", "BL coordination"],
        rfqNote: "Describe the shipment and destination. We will confirm supply route, documents, and timeline.",
      },
    ],
    packing: ["Determined by product", "Export packing review included", "Containerized where applicable"],
    documentation: standardDocuments,
    image: customSourcingImage,
    imageAlt: "Industrial sourcing and procurement coordination for custom requirements",
  },
];

export function getProductCategory(slug: string) {
  return productCategories.find((c) => c.slug === slug);
}

// legacy sub-type for any code that used the old shape
export type ProductSubCategory = { name: string; items: string[] };
