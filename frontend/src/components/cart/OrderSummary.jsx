import styles from './OrderSummary.module.css'
import { RiErrorWarningLine } from 'react-icons/ri';

function OrderSummary({ total, onCheckoutClick, isDisabled }) {
  return (
    <aside className={styles.container}>
      <h2 className={styles.subtitle}>Order Summary</h2>
      <p>Total: <strong className={styles.totalValue}>${total.toFixed(2)}</strong></p> 
      
      <div className={styles.checkout}>
        <button className={styles.button}
          onClick={onCheckoutClick}
          disabled={isDisabled}
          aria-label="proceed to payment button"
          type="button"
        >
          Proceed to Payment
        </button>
      </div>
      
      <p className={styles.warning} role="alert" aria-live="assertive">
        <span><RiErrorWarningLine className={styles.warningIcon}/></span>
        This platform is for demonstration purposes only. 
        No real payments are processed.
      </p>
    </aside>
  );
}

export default OrderSummary;
