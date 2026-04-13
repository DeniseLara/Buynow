import "./MyOrders.css";
import { useOrders } from "../../context/OrdersContext";
import OrderCard from "../../components/orders/OrderCard";
import Loading from '../../components/ui/Loading'
import { useState } from "react";

function MyOrders() {
  const { orders, loadingOrders } = useOrders();
  const [filterStatus, setFilterStatus] = useState("all");
  
  if (loadingOrders) return <Loading/>

  // Filtrar órdenes
  const filteredOrders = filterStatus === "all" 
    ? orders 
    : filterStatus === "pending"
    ? orders.filter(order => order.status === "pending" || order.status === "processing")
    : orders.filter(order => order.status === filterStatus);

  // Ordenar por fecha (más reciente primero)
  const sortedOrders = [...filteredOrders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <section className="my-orders section">
      <div className="container">
        <div className="orders-header">
          <div className="orders-header-content">
            <h1 className="orders-title">
              <span className="orders-icon">📦</span>
              My Orders
              <span className="orders-count">({orders.length})</span>
            </h1>
            <p className="orders-subtitle">All your purchases in one place</p>
          </div>
          
          <div className="orders-stats">
            <div className="stat-card">
              <span className="stat-label">Total Orders</span>
              <span className="stat-value">{orders.length}</span>
            </div>
            <div className="stat-card">
              <span className="stat-label">Total Spent</span>
              <span className="stat-value">
                ${orders.reduce((total, order) => total + (order.totalPaid || 0), 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="orders-filters">
          <button 
            className={`filter-btn ${filterStatus === "all" ? "active" : ""}`}
            onClick={() => setFilterStatus("all")}
          >
            All Orders
          </button>
          <button 
            className={`filter-btn ${filterStatus === "pending" ? "active" : ""}`}
            onClick={() => setFilterStatus("pending")}
          >
            Processing
          </button>
          <button 
            className={`filter-btn ${filterStatus === "canceled" ? "active" : ""}`}
            onClick={() => setFilterStatus("canceled")}
          >
            Canceled
          </button>
        </div>

        {sortedOrders.length === 0 ? (
          <div className="orders-empty-state">
            <div className="empty-icon">📭</div>
            <h3>No orders found</h3>
            <p>
              {filterStatus === "all" 
                ? "Start shopping to see your orders here!"
                : `You don't have any ${filterStatus} orders.`
              }
            </p>
            {filterStatus !== "all" && (
              <button 
                className="view-all-btn"
                onClick={() => setFilterStatus("all")}
              >
                View All Orders
              </button>
            )}
          </div>
        ) : ( 
          <div className="orders-grid">
            {sortedOrders.map((order) => (
              <OrderCard 
                key={order.id}
                order={order}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyOrders;