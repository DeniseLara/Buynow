import styles from './Cart.module.css'
import { RiDeleteBin6Line } from "react-icons/ri";

function Cart({ items, onRemoveFromCart, onClearCart }) {

  return (
    <article className={styles.container}>
      <h2 className={styles.subtitle}>Shopping Cart</h2>

      {items.length === 0 ? (
        <p className={styles.message}>Tu carrito está vacío</p>
      ) : ( 
        <>
      <ul className={styles.list}>  
        {items.map((item) => (
        <li key={item.id} className={styles.item}>
          <p>{item.title} - ${item.price} x {item.quantity}</p>
          <button 
            className={styles.deleteButton} 
            onClick={() => onRemoveFromCart(item.id)} 
            aria-label="delete product from the cart button"
            type="button">
            <RiDeleteBin6Line />
          </button>
        </li>
      ))}
      </ul>

      <button 
        className={styles.clearButton} 
        onClick={onClearCart}
        aria-label="empty cart button"
        type="button"
      >
        Empty Cart
      </button>
      </>
      )}
    </article>
  );
};

export default Cart;
