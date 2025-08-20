import styles from './ProductList.module.css'
import ProductCard from "./ProductCard";
import SkeletonCard from "../ui/SkeletonCard";

function ProductList({ products = [], loading }) {
  if (!Array.isArray(products)) return null;

  return (
    <section className={styles.container} aria-label="Product results">
      {loading ? (
    <ul className={styles.list}>
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index} className={styles.item}>
          <SkeletonCard />
        </li>
      ))}
    </ul>
      ) : products.length > 0 ? (
        <ul className={styles.list}>
          {products.map((product) => (
            <li key={product.id} className={styles.item}>
              <ProductCard  
                product={product} 
                allProducts={products}
              />
            </li>
          ))}
        </ul> 
      ) : (
        <div role="status" aria-live="polite" className="no-products-message">
          <p className="products-message">
            There are no products in this category.
          </p>
        </div>
      )}
    </section>
  );
};

export default ProductList;
