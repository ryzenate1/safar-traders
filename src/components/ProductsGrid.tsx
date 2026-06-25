import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Boxes } from "lucide-react";
import { productCategories } from "@/lib/products";

export default function ProductsGrid() {
  return (
    <div className="products-page-grid">
      {productCategories.map((cat) => (
        <Link key={cat.slug} href={`/products/${cat.slug}`} className="product-list-card">
          <div className="product-list-media">
            {cat.image ? (
              <Image
                src={cat.image}
                alt={`${cat.shortTitle} export sourcing capability`}
                fill
                sizes="(min-width: 900px) 30vw, (min-width: 640px) 50vw, 100vw"
                style={{ objectFit: "cover" }}
              />
            ) : (
              <Boxes size={34} strokeWidth={1.5} aria-hidden="true" />
            )}
          </div>
          <div className="product-list-body">
            <span className="eyebrow">{cat.shortTitle}</span>
            <h2>{cat.title}</h2>
            <p>{cat.description}</p>
            <div className="subcat-row">
              {cat.subcategories.slice(0, 3).map((sub) => <span key={sub.name}>{sub.name}</span>)}
            </div>
            <div className="text-link">Review capability <ArrowRight size={14} aria-hidden="true" /></div>
          </div>
        </Link>
      ))}
    </div>
  );
}
