import './ProductCard.css'
import { useState } from "react";
import { Link } from "react-router-dom";
import { MdAddShoppingCart } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useCart } from "../../context/CartContext";  
import { useFavorites } from "../../context/FavoritesContext";

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

  if (!product) return null;

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

  return (
    <article className="product-card">
      {isFavoriteCard && (
        <div className="menu-container">
          <button 
            className="dots-btn"
            type="button"
            aria-label="open favorite options menu" 
            onClick={toggleMenu}
          >
              <BsThreeDotsVertical size={18} />
          </button>
          
        {menuOpen && (
          <div className="dropdown-menu">
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
        
      <Link 
        to="/products/details" 
        state={{product, allProducts}}
        aria-label={`Ver detalles de ${product.title}`}
      >
      <figure className="product-media">
        <img
          src={productImage}
          alt={product.title}
          className="product-img"
          loading="lazy"
        /> 
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
        </div>      
      </figure>
    </Link>
   
    <footer className="card-footer">
      <p className="product-price">
        $ <strong>{product.price}</strong>
      </p>

      <button 
        onClick={() => addToCart(product)}
        aria-label={`add ${product.title} to cart`}
        type="button"
        className="product-btn"
      >
        <MdAddShoppingCart/>
      </button>
    </footer>
  </article>
  );
};

export default ProductCard;
