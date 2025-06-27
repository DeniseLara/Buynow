import "./MyOrders.css";
import { useOrders } from "../../context/OrdersContext";
import OrderCard from "../../components/orders/OrderCard";

function MyOrders() {
  const { orders, loadingOrders, refreshOrders, cancelingOrders, handleCancelOrder } =  useOrders();
  
  if (loadingOrders) return <p className="orders-loading">Cargando órdenes...</p>;

  if (orders.length === 0) {
    return <p className="orders-empty">No tienes órdenes aún.</p>;
  }

  return (
    <div className="orders-container">
      <h2>My orders</h2>
      {orders.map((order) => (
      <OrderCard 
        key={order.id}
        order={order}
        cancelingOrders={cancelingOrders}
        handleCancelOrder={handleCancelOrder}
      />
      ))}
    </div>
  );
};

export default MyOrders;
