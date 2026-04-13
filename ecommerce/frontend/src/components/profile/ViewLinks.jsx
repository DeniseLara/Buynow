import styles from './ViewLinks.module.css'
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";

function ViewLinks() {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <span className={styles.text}>View order history</span> 
          <Link className={styles.link} to="/orders"> 
            <GoChevronRight/>
          </Link>
        </li>

        <li className={styles.item}>
          <span className={styles.text}>View wishlist</span> 
          <Link className={styles.link} to="/favorites">
            <GoChevronRight/>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default ViewLinks;
