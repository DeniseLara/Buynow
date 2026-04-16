import styles from './FeaturedProducts.module.css'
import { Link } from 'react-router-dom';
import { useFeaturedProducts } from '../../../hooks/useFeaturedProducts';
import ProductCard from '../../products/ProductCard';

function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts();  

  return (
    <section className={`section ${styles.container}`} aria-labelledby="featured-products-title">
      <div className="container">
      <h2 id="featured-products-title" className={styles.title}>
        Exclusive Product Highlights
      </h2>

      <ul className={styles.productList}>
        {products.slice(0, 8).map((product) => (
              <ProductCard 
                key={product.id}
                product={product} 
                allProducts={products} 
              />
          ))}
      </ul>

      <div className={styles.viewAll}>
        <Link to="/products" aria-label="view all products">
          <span className={styles.viewAllLink}>View all products</span>
        </Link>
      </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;