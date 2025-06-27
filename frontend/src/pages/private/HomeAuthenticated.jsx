import "./HomeAuthenticated.css";
import { Link } from "react-router-dom";

import { useProfile } from "../../context/ProfileContext";
import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";
import ProductCard from '../../components/products/ProductCard'

function HomeAuthenticated() {
  const { userName } = useProfile(); 
  const { products, loading } = useFeaturedProducts();

  return (
    <div className="home-authenticated">
      <div className="hero-authenticated">
        <div className="hero-authenticated-content">
        <h1 className="home-authenticated-title">
        Welcome back, {userName || 'Guest'}!
        </h1>
        <p className="home-authenticated-description">Find the best of our products.</p>
        <Link 
        to="/products" 
        className="explore-btn"
        aria-label="explore our products collection">
          Explore products
        </Link>
        </div>
      </div>

      <section className="featured-products">
        <h2 className="home-authenticated-subtitle">Featured Products</h2>
        {loading ? (
          <p>Loading products...</p> 
        ) : (
          <div className="product-list">
           {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default HomeAuthenticated;
