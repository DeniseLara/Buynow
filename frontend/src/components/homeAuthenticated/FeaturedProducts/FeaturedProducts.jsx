import styles from './FeaturedProducts.module.css'
import { useFeaturedProducts } from '../../../hooks/useFeaturedProducts';
import ProductCard from "../../products/ProductCard";

function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts();
    
  return(
    <section className={styles.container} aria-labelledby="featured-products-title">
      <h2 className={styles.subtitle} id="featured-products-title">
        Featured Products
      </h2>
        {loading ? (
          <p>Loading products...</p> 
        ) : (
          <ul className={styles.list}>
            {products.slice(0, 8).map((product) => (
              <li key={product.id}>
                <ProductCard product={product}/>
              </li>
            ))}
          </ul>
        )}
    </section>
    );
}

export default FeaturedProducts;