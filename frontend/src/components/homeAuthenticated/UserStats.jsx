import './UserStats.css';
import { useOrders } from "../../context/OrdersContext";
import { useFavorites } from "../../context/FavoritesContext";
import { useCart } from "../../context/CartContext";

function UserStats() {
  const { orders } = useOrders();
  const { favorites } = useFavorites();
  const { cart } = useCart();

  return (
    <section className="user-stats" aria-label="User statistics">
      <h2 className="user-stats-title">Your Activity Summary</h2>
      <ul className="stats-grid">
        <li className="stat-card">
          <h3>Orders</h3>
          <p>{orders.length} orders</p>
        </li>
        <li className="stat-card">
          <h3>Favorites</h3>
          <p>{favorites.length} saved items</p>
        </li>
        <li className="stat-card">
          <h3>In Cart</h3>
          <p>{cart.length} products</p>
        </li>
      </ul>
    </section>
  );
}

export default UserStats;
