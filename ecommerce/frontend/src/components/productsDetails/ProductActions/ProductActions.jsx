import styles from './ProductActions.module.css'
import { useCart } from '../../../context/CartContext';

function ProductActions({ product, quantity, onQuantityChange }) {  
  const { addToCart } = useCart(); 

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleDecrease = () => {
    if (quantity > 1) onQuantityChange({ target: { value: quantity - 1 } });
  };

  const handleIncrease = () => {
    onQuantityChange({ target: { value: quantity + 1 } });
  };
  
  return (
    <section className={styles.container}>
      <div className={styles.actions}>
        <label className={styles.label} htmlFor="quantity">Quantity:</label>
        <div className={styles.quantityWrapper}>
           <button 
            type="button" 
            className={`${styles.quantityButton} ${styles.decrease}`}
            onClick={handleDecrease} 
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            >
              −
            </button>

        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
          className={styles.input}
        />
        
        <button 
          type="button" 
          className={`${styles.quantityButton} ${styles.increase}`}          
          onClick={handleIncrease} 
          aria-label="Increase quantity"
        >
          +
        </button>
        </div>
      </div>

      <button 
        className={styles.addToCart}
        onClick={handleAddToCart}
        aria-label={`Add ${quantity} of ${product.title} to cart`}
        type='button'
      >
        Add to Cart
      </button>
    </section>
  );
}

export default ProductActions;
