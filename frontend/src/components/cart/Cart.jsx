import { useCart } from '../../context/CartContext';
import { FiTrash2, FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import styles from './Cart.module.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id, change) => {
    const item = cart.find(item => item.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(id, newQuantity);
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.subtitle}>Shopping Cart</h2>
        {cart.length > 0 && (
          <button 
            onClick={clearCart}
            className={styles.clearButton}
            aria-label="Clear entire cart"
            type="button"
          >
            <FiTrash2 /> Clear All
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className={styles.emptyMessage}>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <ul className={styles.itemsList}>
            {cart.map((item) => (
              <li key={item.id} className={styles.item}>
                <div className={styles.itemInfo}>
                  <div className={styles.itemImage}>
                    <img 
                      src={item.thumbnail || item.image} 
                      alt={item.title}
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/80x80/2563eb/ffffff?text=Product";
                      }}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                    {item.brand && (
                      <p className={styles.itemBrand}>{item.brand}</p>
                    )}
                    <p className={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                      <span className={styles.unitPrice}>
                        (${item.price.toFixed(2)} each)
                      </span>
                    </p>
                  </div>
                </div>
                
                <div className={styles.itemActions}>
                  <div className={styles.quantityControl}>
                    <button 
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className={styles.quantityButton}
                      aria-label="Decrease quantity"
                      type="button"
                    >
                      <FiMinusCircle />
                    </button>
                    <span className={styles.quantity}>{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className={styles.quantityButton}
                      aria-label="Increase quantity"
                      type="button"
                    >
                      <FiPlusCircle />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className={styles.deleteButton}
                    aria-label="Remove item from cart"
                    type="button"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          
          <div className={styles.cartFooter}>
            <div className={styles.itemsCount}>
              {cart.reduce((total, item) => total + item.quantity, 0)} items in cart
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;