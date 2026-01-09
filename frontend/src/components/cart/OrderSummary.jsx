import { FiCreditCard, FiShield } from 'react-icons/fi';
import styles from './OrderSummary.module.css';
import { usePayment } from '../../context/PaymentContext';

function OrderSummary({ onCheckoutClick, isDisabled }) { 
  const { totals } = usePayment() 

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>
        <FiCreditCard /> Order Summary
      </h2>
      
      <div className={styles.totalSection}>
        <div className={styles.totalRow}>
          <span>Subtotal</span>
          <span>${totals.subtotal.toFixed(2)}</span>
        </div>
        <div className={styles.totalRow}>
          <span>Shipping</span>
          <span>${totals.shipping}</span>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>
            ${totals.total}
          </span>
        </div>
      </div>

      <button
        onClick={onCheckoutClick}
        disabled={isDisabled}
        className={styles.checkoutButton}
        aria-label="Proceed to secure checkout"
      >
        <FiCreditCard /> Proceed to Secure Checkout
      </button>

      <div className={styles.securityNote}>
        <FiShield className={styles.shieldIcon} />
        <div>
          <strong>Secure Payment</strong>
          <p>Your payment information is encrypted and secure.</p>
        </div>
      </div>

      <div className={styles.disclaimer}>
        <p>
          <strong>Note:</strong> This is a demo platform for demonstration purposes only. 
          No real payments are processed.
        </p>
      </div>
    </div>
  );
}

export default OrderSummary;