import { RiDeleteBin6Line } from "react-icons/ri";

function Cart({ items, onRemoveFromCart, onClearCart }) {
  // Si el carrito está vacío, mostrar mensaje
  if (items.length === 0) {
    return <p className="cart-message">Tu carrito está vacío</p>;
  }

  return (
    <article className="cart">
      <h2 className="cart-subtitle">Shopping Cart</h2>

      <ul className="cart-list">  
        {items.map((item) => (
        <li key={item.id} className="cart-item">
          <p>{item.title} - ${item.price} x {item.quantity}</p>
          <button 
            className="cart-delete-button" 
            onClick={() => onRemoveFromCart(item.id)} 
            aria-label="delete product from the cart button"
            type="button">
            <RiDeleteBin6Line />
          </button>
        </li>
      ))}
      </ul>

      <button 
        className="clear-button" 
        onClick={onClearCart}
        aria-label="empty cart button"
        type="button"
      >
        Empty Cart
      </button>
    </article>
  );
};

export default Cart;
