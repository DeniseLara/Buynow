import "./MyOrders.css";
import { useOrders } from "../../context/OrdersContext";
import OrderCard from "../../components/orders/OrderCard";

function MyOrders() {
  const { 
    orders, 
    loadingOrders, 
    cancelingOrders, 
    handleCancelOrder 
  } =  useOrders();
  
  if (loadingOrders) return <p className="orders-loading">Loading orders...</p>;


  return (
    <section className="orders-container">
      <h1 className="orders-title">My orders</h1>
      
      {orders.length === 0 ? (
        <p className="orders-empty">You don't have any orders yet.</p>
      ) : ( 
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
      )}
    </section>
  );
};

export default MyOrders;
