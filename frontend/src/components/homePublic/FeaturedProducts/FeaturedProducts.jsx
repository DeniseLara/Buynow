import styles from './FeaturedProducts.module.css'
import { Link } from 'react-router-dom';
import { FaArrowRight } from "react-icons/fa";

import { useFeaturedProducts } from '../../../hooks/useFeaturedProducts';

function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts();  

  return (
    <section className={styles.container} aria-labelledby="featured-products-title">
      <h2 id="featured-products-title" className={styles.title}>
        Exclusive Product Highlights
      </h2>

      <ul className={styles.productList}>
        {products.slice(0, 8).map((product) => {
          const hasDiscount = product.discountPercentage > 0;
          const discountedPrice = hasDiscount
          ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
          : null;
          return (
            <li key={product.id} className={styles.productCard}>
              <article 
                className={styles.cardDetails} 
                aria-labelledby={`product-title-${product.id}`}
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className={styles.productImage}
                  loading="lazy"
                />
                <h3 className={styles.productTitle}>{product.title}</h3>

              <div className={styles.productInfo}>
                {hasDiscount ? (
                  <div className={styles.priceWrapper}>
                    <strong className={styles.discountedPrice}>
                      ${discountedPrice}
                    </strong>
                    <span className={styles.originalPrice}>
                      ${product.price.toFixed(2)}
                    </span>
                    <span className={styles.discountLabel}>
                      - {product.discountPercentage.toFixed(0)}%
                    </span>
                  </div>
                ) : (
                  <strong className={styles.price}>
                    ${product.price.toFixed(2)}
                  </strong>
                )}

                <Link
                  to="/products/details"
                  state={{ product, allProducts: products }}
                  className={styles.button}
                  aria-label={`View details of ${product.title}`}
                >
                  View product <span className={styles.arrowIcon}><FaArrowRight /></span>
                </Link>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className={styles.viewAll}>
        <Link to="/products" aria-label="view all products">
          <span className={styles.viewAllLink}>View all products</span>
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;