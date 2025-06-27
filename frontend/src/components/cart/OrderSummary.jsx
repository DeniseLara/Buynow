import { RiErrorWarningLine } from 'react-icons/ri';

function OrderSummary({ total, onCheckoutClick, isDisabled }) {
  return (
    <section className="cart-summary">
        <h2 className="cart-summary-subtitle">Order Summary</h2>
        <p>Total: <strong className="cart-total">${total.toFixed(2)}</strong></p> 
      
      <div className="checkout">
        <button className="checkout-button"
            onClick={onCheckoutClick}
            disabled={isDisabled}
            aria-label="proceed to payment button"
            type="button">
            Proceed to Payment
        </button>
      </div>
      
    <p className="demo-warning" role="alert" aria-live="assertive">
      <span><RiErrorWarningLine className='warning-icon'/> </span>
      This platform is for demonstration purposes only. No real payments are processed.
    </p>
    </section>
  );
}

export default OrderSummary;
