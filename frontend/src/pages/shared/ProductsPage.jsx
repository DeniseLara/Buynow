import "./ProductsPage.css";
import { useState } from "react";
import { FaThLarge } from 'react-icons/fa';
import { useProducts } from "../../hooks/useProducts";

import getCategoryIcon from "../../utils/getCategoryIcon";
import ProductList from "../../components/products/ProductList";

function ProductsPage() {
  const { products, categories, CATEGORY_MAP, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("");

  const formatCategoryName = (category) => {
    return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <section className="products section" aria-label="Product catalog">
      <div className="container">
        <header className="products-content">
          <h1 className="products-title">
            Welcome to Buynow
          </h1>
          <p className="products-description">
            Fashion, technology, and style, all in one place.
          </p>
        </header>
      
        <nav className="category-scroll-wrapper" aria-label="Product categories">
          <div className="category-filters">
            <button
              className={`category-button ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
              aria-label="Filter products by all categories"
            >
              <span className="category-icon"><FaThLarge /></span> All
            </button>

            {categories.map((category) => (
              <button
                key={category}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                aria-label={`Filter products by ${formatCategoryName(category)}`}
              >
                {getCategoryIcon(category)} 
                {category}
              </button>
            ))}
          </div>
        </nav>
     
        <ProductList 
          products={products}
          selectedCategory={selectedCategory}
          CATEGORY_MAP={CATEGORY_MAP}
          loading={loading}
        />
      </div>
    </section>
  );
}

export default ProductsPage;
