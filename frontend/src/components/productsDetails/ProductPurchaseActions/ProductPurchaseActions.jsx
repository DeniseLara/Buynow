import styles from './ProductPurchaseActions.module.css'
import PropTypes from 'prop-types';

function ProductPurchaseActions({ quantity, onQuantityChange, onAddToCart, productTitle }) {   
   // Para manejar + / – sin input directo, pero aquí sólo llamamos onQuantityChange con el nuevo valor
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
        onClick={onAddToCart}
        aria-label={`Add ${quantity} of ${productTitle} to cart`}
        type='button'
      >
        Add to Cart
      </button>
    </section>
  );
}

ProductPurchaseActions.propTypes = {
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  productTitle: PropTypes.string.isRequired,
};

export default ProductPurchaseActions;
