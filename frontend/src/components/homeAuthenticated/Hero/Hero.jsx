import styles from './Hero.module.css'
import { Link } from "react-router-dom";
import { useProfile } from "../../../context/ProfileContext";

function Hero() {
    const { userName } = useProfile(); 
    
    return(
        <header className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Welcome back, {userName || 'Guest'}!
                </h1>
                <p className={styles.description}>
                    Find the best of our products.
                </p>
                <Link 
                    to="/products" 
                    className={styles.button}
                    aria-label="explore our products collection"
                >
                  Explore products
                </Link>
            </div>
        </header>
    );
}

export default Hero;