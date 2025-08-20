import { Link } from "react-router-dom";
import styles from './PromoSection.module.css'; 

function PromoSection() {
  return (
    <section className={styles.container} aria-label="Personalized offers">
      <h2 className={styles.title}>Just for You</h2>
      <div className={styles.promo}>
        <p>🔥 20% off on your next order!</p>
        <Link to="/products" className={styles.button}>Shop Now</Link>
      </div>
    </section>
  );
}

export default PromoSection;
