import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

function CartIcon({ user }) {
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const cartLabel = user
  ? cartItemsCount > 0
    ? `Go to cart. You have ${cartItemsCount} product${cartItemsCount > 1 ? 's' : ''}`
    : "Go to cart. You have no products"
  : "Log in to view your cart";


  return (
   <div className="icon-wrapper">
      <Link 
        to={user ? "/cart" : "/login"} 
        className="icon-link cart-icon"
        aria-label={cartLabel}
      >
            
        <AiOutlineShoppingCart aria-hidden="true"/>

        {user && cartItemsCount > 0 && (
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