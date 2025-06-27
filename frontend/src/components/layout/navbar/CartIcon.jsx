import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

function CartIcon({ user }) {
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
   <div className="icon-wrapper">
        <Link 
        to={user ? "/cart" : "/login"} 
        className="icon-link cart-icon"
        aria-label='go to cart page'
        >
            
        <AiOutlineShoppingCart />
        {user && cartItemsCount > 0 && (
        <span className="cart-count">{cartItemsCount}</span>
        )}
        </Link>
    </div>
  );
}

export default CartIcon;