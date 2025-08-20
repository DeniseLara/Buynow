import styles from './PaymentSummary.module.css'
import { IoIosAdd } from "react-icons/io";

function PaymentSummary({ total, shippingCost }) {
  const finalTotal = total + shippingCost / 100;
  
  return (
    <section>
      <ul className={styles.summaryList}>
        <li className={styles.summaryItem}>
          <p>Price:</p>
          <span>${total.toFixed(2)}</span>
        </li>

        <li className={styles.summaryItem}>
          <p>Shipping cost:</p>
          <span className={styles.value}>
            <IoIosAdd />
            ${ (shippingCost / 100).toFixed(2) }
          </span>
        </li>

        <li className={`${styles.summaryItem} ${styles.finalTotal}`}>
          <p>Total amount:</p>
          <span><strong>${finalTotal.toFixed(2)}</strong></span>
        </li>
      </ul>
    </section>
  );
}

export default PaymentSummary;
