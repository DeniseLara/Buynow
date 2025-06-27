import PropTypes from 'prop-types';

function ProductPurchaseActions({ quantity, onQuantityChange, onAddToCart, productTitle }) {    
  return (
    <div className="product-purchase-actions">
     <div className="product-actions">
        <label className='quantity' htmlFor="quantity">Quantity:</label>
        <input
        id="quantity"
        type="number"
        min="1"
        value={quantity}
        onChange={onQuantityChange}
        className="product-quantity-input"
         />
     </div>

        <button 
        className='add-to-cart' 
        onClick={onAddToCart}
        aria-label={`Add ${quantity} of ${productTitle} to cart`}
        type='button'>
            Add to Cart
        </button>
    </div>
  );
}

ProductPurchaseActions.propTypes = {
  quantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  productTitle: PropTypes.string.isRequired,
};

export default ProductPurchaseActions;
