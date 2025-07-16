import ProductCard from "./ProductCard";
import SkeletonCard from "../ui/SkeletonCard";

function ProductList({ products = [], loading }) {
  if (!Array.isArray(products)) return null;

  return (
    <section className="products-container" aria-label="Product results">
       {loading ? (
    <ul className="product-list">
      {Array.from({ length: 12 }).map((_, index) => (
        <li key={index} className="product-item">
          <SkeletonCard />
        </li>
      ))}
    </ul>
      ) : products.length > 0 ? (
        <ul className="product-list">
          {products.map((product) => (
            <li key={product.id} className="product-item">
              <ProductCard  
                product={product} 
                allProducts={products}
              />
            </li>
          ))}
        </ul> 
      ) : (
        <div role="status" aria-live="polite" className="no-products-message">
          <p className="products-message">There are no products in this category.</p>
        </div>
      )}
    </section>
  );
};

export default ProductList;
