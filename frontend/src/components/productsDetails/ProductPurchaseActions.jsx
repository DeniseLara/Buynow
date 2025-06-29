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
    <section className="product-purchase-actions">
      <div className="product-actions">
        <label className='quantity' htmlFor="quantity">Quantity:</label>

        <div className="quantity-input-wrapper">
           <button 
            type="button" 
            className="quantity-btn decrease" 
            onClick={handleDecrease} 
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >−</button>

        <input
          id="quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={onQuantityChange}
          className="product-quantity-input"
        />
        
         <button 
            type="button" 
            className="quantity-btn increase" 
            onClick={handleIncrease} 
            aria-label="Increase quantity"
          >+</button>
        </div>
      </div>

      <button 
        className='add-to-cart' 
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
