import "./MyOrders.css";
import { useOrders } from "../../context/OrdersContext";
import OrderCard from "../../components/orders/OrderCard";

function MyOrders() {
  const { orders, loadingOrders, refreshOrders, cancelingOrders, handleCancelOrder } =  useOrders();
  
  if (loadingOrders) return <p className="orders-loading">Loading orders...</p>;

  if (orders.length === 0) {
    return <p className="orders-empty">You don't have any orders yet.</p>;
  }

  return (
    <section className="orders-container">
      <h1 className="orders-title">My orders</h1>

      <ul className="orders-list">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderCard 
            order={order}
            cancelingOrders={cancelingOrders}
            handleCancelOrder={handleCancelOrder}
          />
        </li>
        ))}
      </ul>
    </section>
  );
};

export default MyOrders;
