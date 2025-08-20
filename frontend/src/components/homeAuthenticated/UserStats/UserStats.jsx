import styles from './UserStats.module.css';
import { useOrders } from "../../../context/OrdersContext";
import { useFavorites } from "../../../context/FavoritesContext";
import { useCart } from "../../../context/CartContext";

function UserStats() {
  const { orders } = useOrders();
  const { favorites } = useFavorites();
  const { cart } = useCart();

  return (
    <section className={styles.container} aria-label="User statistics">
      <h2 className={styles.title}>Your Activity Summary</h2>
      <ul className={styles.grid}>
        <li className={styles.item}>
          <h3>Orders</h3>
          <p>{orders.length} orders</p>
        </li>
        <li className={styles.item}>
          <h3>Favorites</h3>
          <p>{favorites.length} saved items</p>
        </li>
        <li className={styles.item}>
          <h3>In Cart</h3>
          <p>{cart.length} products</p>
        </li>
      </ul>
    </section>
  );
}

export default UserStats;
