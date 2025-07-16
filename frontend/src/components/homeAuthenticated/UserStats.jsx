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
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Orders</h3>
          <p>{orders.length} orders</p>
        </div>
        <div className="stat-card">
          <h3>Favorites</h3>
          <p>{favorites.length} saved items</p>
        </div>
        <div className="stat-card">
          <h3>In Cart</h3>
          <p>{cart.length} products</p>
        </div>
      </div>
    </section>
  );
}

export default UserStats;
