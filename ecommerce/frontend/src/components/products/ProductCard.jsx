import styles from './ProductCard.module.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useCart } from "../../context/CartContext";  
import { useFavorites } from "../../context/FavoritesContext";
import { calculateDiscountedPrice, hasValidDiscount } from '../../utils/priceHelpers';

// Función para validar la URL de la imagen
const isValidImageUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

function ProductCard({ product, allProducts, isFavoriteCard = false }) {
  const { addToCart } = useCart();
  const { removeFromFavorites } = useFavorites();
  const [menuOpen, setMenuOpen] = useState(false);

  const productImage = isValidImageUrl(product.thumbnail || product.image)
    ? product.thumbnail || product.image
    : "https://via.placeholder.com/150";
  
  
  const toggleMenu = (e) => {
    e.stopPropagation();
    e.preventDefault(); // evita navegación al hacer click en los 3 puntos
    setMenuOpen(!menuOpen);
  };
  
  const handleRemove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    removeFromFavorites(product.id);
    setMenuOpen(false);
  };

  const hasDiscount = hasValidDiscount(product.discountPercentage);
  const finalPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
  
  return (
    <article className={styles.card}>
      {isFavoriteCard && (
        <div className={styles.menuContainer}>
          <button 
            className={styles.deleteButton}
            type="button"
            aria-label="open favorite options menu" 
            onClick={toggleMenu}
          >
              <BsThreeDotsVertical size={18}/>
          </button>
          
        {menuOpen && (
          <div className={styles.dropdown}>
            <button 
              onClick={handleRemove}
              type="button"
              aria-label={`remove ${product.title} from favorites`}
            >
              Eliminar
            </button>
          </div>
        )}
        </div>
      )}

      {hasDiscount && (
        <span className={styles.discountBadge}>
          {Math.round(product.discountPercentage)}% OFF
        </span>
      )}
        
      <Link 
        to="/products/details" 
        state={{product, allProducts}}
        aria-label={`Ver detalles de ${product.title}`}
      >
      <figure className={styles.media}>
        <img
          src={productImage}
          alt={product.title}
          className={styles.image}
          loading="lazy"
        />       
      </figure>

      <div className={styles.info}>
        <h3 className={styles.title}>{product.title}</h3>
      </div>
    </Link>
   
    <footer className={styles.footer}>
        <div className={styles.priceContainer}>
          {hasDiscount ? (
            <div className={styles.priceWrapper}>
              <span className={styles.originalPrice}>${product.price.toFixed(2)}</span>
              <div className={styles.saleInfo}>
                <strong className={styles.finalPrice}>${finalPrice}</strong>
              </div>
            </div>
          ) : (
            <strong className={styles.finalPrice}>${product.price.toFixed(2)}</strong>
          )}
        </div>

        <button 
          className={styles.addButton}
          onClick={() => addToCart(product)}
          aria-label={`add ${product.title} to cart`}
        >
          <MdAddShoppingCart/>
        </button>
      </footer>
  </article>
  );
};

export default ProductCard;
