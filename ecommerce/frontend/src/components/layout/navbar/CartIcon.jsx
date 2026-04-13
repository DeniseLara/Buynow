import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

function CartIcon() {
  const { cartItemsCount } = useCart();

  const cartLabel = cartItemsCount > 0
    ? `Go to cart. You have ${cartItemsCount} product${cartItemsCount > 1 ? 's' : ''}`
    : "Go to cart. You have no products"


  return (
   <div className="icon-wrapper">
      <Link 
        to="/cart"
        className="icon-link cart-icon"
        aria-label={cartLabel}
      >
            
        <AiOutlineShoppingCart aria-hidden="true"/>

        {cartItemsCount > 0 && (
          <span 
            className="cart-count"  
            aria-label={`${cartItemsCount} artículo${cartItemsCount > 1 ? 's' : ''} en el carrito`}
            aria-live="polite"
          >
            {cartItemsCount}
          </span>
        )}
        </Link>
    </div>
  );
}

export default CartIcon;