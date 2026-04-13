import styles from './FeaturedProducts.module.css'
import { useFeaturedProducts } from '../../../hooks/useFeaturedProducts';
import ProductCard from "../../products/ProductCard";

function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts();
    
  return(
    <section className={`section ${styles.container}`} aria-labelledby="featured-products-title">
      <div className="container">
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
        </div>
    </section>
    );
}

export default FeaturedProducts;