import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCategories } from "@/lib/products";

export default function ProductsGrid() {
  return (
    <div className="products-page-grid">
      {productCategories.map((cat) => (
        <Link
          key={cat.slug}
          href={`/products/${cat.slug}`}
          className="product-list-card"
          aria-label={`View ${cat.shortTitle} sourcing capability`}
        >
          <div className="product-list-media">
            <div className="placeholder-img-block" aria-hidden="true">
              <span className="placeholder-img-label">{cat.shortTitle}</span>
            </div>
          </div>
          <div className="product-list-body">
            <span className="eyebrow">{cat.shortTitle}</span>
            <h2>{cat.title}</h2>
            <p>{cat.description}</p>
            <div className="subcat-row">
              {cat.subcategories.slice(0, 3).map((sub) => (
                <span key={sub.slug}>{sub.name}</span>
              ))}
              {cat.subcategories.length > 3 && (
                <span className="subcat-more">+{cat.subcategories.length - 3} more</span>
              )}
            </div>
            <div className="text-link">
              View capability <ArrowRight size={14} aria-hidden="true" />
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
