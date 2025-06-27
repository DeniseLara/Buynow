import ProductCard from "./ProductCard";


function ProductList({ products = [] }) {
  if (!Array.isArray(products)) return null;

  return (
    <div className="products-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard 
          key={product.id} 
          product={product} 
          allProducts={products}/>
        ))
        
      ) : (
        <div role="status" className="no-products-message">
          <p className="products-message">There are no products in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
