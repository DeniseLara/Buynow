import "./ProductsPage.css";
import { useState } from "react";
import { FaThLarge } from 'react-icons/fa';

import { useCart } from "../../context/CartContext"; 
import { useSearch } from "../../context/SearchContext";
import { useProducts } from "../../hooks/useProducts";

import getCategoryIcon from "../../utils/getCategoryIcon";
import ProductList from "../../components/products/ProductList";

function ProductsPage() {
  const { products, categories } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("");
  
  const { addToCart } = useCart();
  const { searchQuery } = useSearch(); // Obtener el texto del buscador

  // Filtro por categoría y por búsqueda
  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  return (
    <div className="products">
      <div className="products-content">
      <h1 className="products-title">Welcome to Buynow</h1>
      <p className="products-description">Fashion, technology, and style, all in one place.</p>
    </div>
      
    <div className="category-scroll-wrapper">
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
        aria-label={`Filter products by ${category.charAt(0).toUpperCase() + category.slice(1)}`}
        >
          {getCategoryIcon(category)} {
          category === "men's clothing" ? "Men" :
          category === "women's clothing" ? "Women" :
          category.charAt(0).toUpperCase() + category.slice(1)
         }
        </button>
      ))}
    </div>
  </div>

      {products.length === 0 ? (
        <p>Loading products...</p>
      ) : (
        <ProductList products={filteredProducts} onAddToCart={addToCart} />
      )}
    </div>
  );
}

export default ProductsPage;
