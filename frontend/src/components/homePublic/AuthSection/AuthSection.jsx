import styles from './AuthSection.module.css'
import { Link } from 'react-router-dom';
import Personas from '../../../assets/shop.png'

function AuthSection() {
  return (
    <section className={`section ${styles.container}`} aria-labelledby="auth-section-title">
      <div className={`container grid ${styles.authContainer}`}>
      <header className={styles.content}>
        <h2 id="auth-section-title" className={styles.title}>
          Join us and enjoy more benefits!
        </h2>
        <p className={styles.description}>
          Sign up to access your profile, view your purchase history, and much more.
        </p>
      
      <div className={styles.buttons}>
        <Link 
          to="/signup" 
          className={styles.button}
          aria-label="sign up for an account"
        >    
          Get started   
        </Link>
      </div>
      </header>

      <div className={styles.imageContainer}>
        <img 
          src={Personas} 
          alt="People enjoying shopping together" 
          loading="lazy" 
          className={styles.image}
        />
      </div>
      </div>
    </section>
  );
}

export default AuthSection;
