import styles from './ProductList.module.css'
import ProductCard from "./ProductCard";
import SkeletonCard from "../ui/SkeletonCard";
import { useSearch } from '../../context/SearchContext';

function ProductList({ 
  products, 
  loading, 
  selectedCategory, 
  CATEGORY_MAP 
}) {
  const { searchQuery } = useSearch();
  if (!Array.isArray(products)) return null;

  // Filtro por categoría y por búsqueda
  const filteredProducts = products.filter((product) => {
    const belongsToSelectedGroup = !selectedCategory
      || CATEGORY_MAP[selectedCategory]?.includes(product.category);

    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return belongsToSelectedGroup && matchesSearch;
  });

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
      ) : filteredProducts.length > 0 ? (
        <ul className={styles.list}>
          {filteredProducts.map((product) => (
            <li key={product.sku} className={styles.item}>
              <ProductCard  
                product={product} 
                allProducts={filteredProducts}
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
