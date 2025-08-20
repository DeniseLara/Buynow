import styles from './Benefits.module.css'
import { FaGem, FaLock, FaHeadset } from 'react-icons/fa'; 


function Benefits() {
  return (
    <section className={styles.container} aria-labelledby="benefits-title">
      <h2 id="benefits-title" className={styles.title}>
        Why choose us?
      </h2>

      <div className={styles.cards}>
        <article className={styles.card}>
          <FaGem className={styles.icon}/>
          <h3 className={styles.subtitle}>Quality Products</h3>
          <p className={styles.description}>
            We only offer the best products for you, ensuring quality and durability.
          </p>
        </article>

        <article className={styles.card}>
          <FaLock className={styles.icon}/>
          <h3 className={styles.subtitle}>Fast and Secure Purchase</h3>
          <p className={styles.description}>
            Enjoy a simple and secure shopping process with multiple payment methods.
          </p>
        </article>

        <article className={styles.card}>
          <FaHeadset className={styles.icon}/>
          <h3 className={styles.subtitle}>24/7 Support</h3>
          <p className={styles.description}>
            We’re always here to help you anytime, your satisfaction is our top priority!
          </p>
        </article>
      </div>
    </section>
    );
  }
  
  export default Benefits;
  