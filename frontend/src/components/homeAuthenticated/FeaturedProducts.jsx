import { useFeaturedProducts } from "../../hooks/useFeaturedProducts";
import ProductCard from "../products/ProductCard";

function FeaturedProducts() {
  const { products, loading } = useFeaturedProducts();
    
  return(
    <section className="featured-products" aria-labelledby="featured-products-title">
      <h2 
        className="home-authenticated-subtitle" 
        id="featured-products-title"
      >
        Featured Products
      </h2>
        {loading ? (
          <p>Loading products...</p> 
        ) : (
          <ul className="product-list">
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