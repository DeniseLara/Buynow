import styles from './Hero.module.css'
import { Link } from 'react-router-dom';
import { MdArrowOutward } from "react-icons/md";

function Hero() {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <div className={styles.heroContent}>
          <h1 id="hero-title" className={styles.title}>
            Find the best products for you
          </h1>
          <p className={styles.description}>
            Explore our wide range of products at unbeatable prices.
          </p>
          <Link 
            to="/products" 
            className={styles.button}
            aria-label='explore products'
          >
            Explore products <span className={styles.arrowIcon}><MdArrowOutward/></span>
          </Link> 
        </div>

        <ul className={styles.stats} aria-label="Site statistics">
          <li className={styles.statItem}>
            <h3>10K+</h3>
            <p>Satisfied Customers</p>
          </li>
  
          <li className={styles.statItem}>
            <h3>5K+</h3>
            <p>Positive Reviews</p>
          </li>

          <li className={styles.statItem}>
            <h3>100%</h3>
            <p>Always Available</p>
          </li>
        </ul>
      </div>
  </section>
  );
};

export default Hero;