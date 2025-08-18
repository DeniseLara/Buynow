import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

import { useFeaturedProducts } from '../../hooks/useFeaturedProducts';

function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts();  

  return (
    <section className="featured-products" aria-labelledby="featured-products-title">
      <h2 id="featured-products-title" className="featured-products-title">
        Exclusive Product Highlights
      </h2>

      <ul className="product-list-public">
        {products.slice(0, 8).map((product) => {
          const hasDiscount = product.discountPercentage > 0;
          const discountedPrice = hasDiscount
          ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
          : null;
          return (
            <li key={product.id} className="product-card-public">
              <article 
                className="product-card-public-details" 
                aria-labelledby={`product-title-${product.id}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="product-image-public"
                  loading="lazy"
                />
                <h3 className="featured-products-subtitle">{product.title}</h3>

              <div className="featured-info">
                {hasDiscount ? (
                  <div className="price-discount-wrapper">
                    <strong className="discounted-price-public">
                      ${discountedPrice}
                    </strong>
                    <span className="original-price-public">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="discount-label">
                      - {product.discountPercentage.toFixed(0)}%
                    </span>
                  </div>
                ) : (
                  <strong className="featured-products-description">
                    ${product.price.toFixed(2)}
                  </strong>
                )}

                <Link
                  to="/products/details"
                  state={{ product, allProducts: products }}
                  className="cta-btn-product-public"
                  aria-label={`View details of ${product.title}`}
                >
                  View product <span className="arrow-icon-public"><FaArrowRight /></span>
                </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="view-all-container">
        <Link to="/products" aria-label="view all products">
          <span className="view-all-products">View all products</span>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;