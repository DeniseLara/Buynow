import styles from './Benefits.module.css'
import { FaGem, FaLock, FaHeadset } from 'react-icons/fa'; 


function Benefits() {
  return (
    <section className={`section ${styles.container}`} aria-labelledby="benefits-title">
      <div className="container">
      <h2 id="benefits-title" className={styles.title}>
        Why choose us?
      </h2>

      <div className={styles.cards}>
        <article className={styles.card}>
          <span className={styles.iconContainer}>
            <FaGem className={styles.icon}/>
          </span>
          <h3 className={styles.subtitle}>Quality Products</h3>
          <p className={styles.description}>
            We only offer the best products for you, ensuring quality and durability.
          </p>
        </article>

        <article className={styles.card}>
          <span className={styles.iconContainer}>
            <FaLock className={styles.icon}/>
          </span>
          <h3 className={styles.subtitle}>Safe & Fast Checkout</h3>
          <p className={styles.description}>
            Enjoy a simple and secure shopping process with multiple payment methods.
          </p>
        </article>

        <article className={styles.card}>
          <span className={styles.iconContainer}>
            <FaHeadset className={styles.icon}/>
          </span>
          <h3 className={styles.subtitle}>24/7 Support</h3>
          <p className={styles.description}>
            We’re always here to help you anytime, your satisfaction is our top priority!
          </p>
        </article>
      </div>
      </div>
    </section>
    );
  }
  
  export default Benefits;
  