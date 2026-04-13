import { useOrders } from '../../context/OrdersContext';
import styles from './OrderCard.module.css';

function OrderCard({ order }) {
  const { cancelingOrders, handleCancelOrder } = useOrders();
  const isCanceling = Array.isArray(cancelingOrders) && cancelingOrders.includes(order.id);

  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  const totalPaid = order.totalPaid !== undefined && order.totalPaid !== null
    ? `$${order.totalPaid.toFixed(2)}`
    : "$0.00";

  return (
    <div className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div className={styles.orderIdSection}>
          <div className={styles.orderId}>
            <span className={styles.orderIcon}>📦</span>
            <h3>Order #{order.id.slice(0, 8)}</h3>
          </div>
          <time className={styles.orderDate} dateTime={order.date}>
            {formattedDate}
          </time>
        </div>
        
        <div className={`${styles.orderStatus} ${styles[order.status]}`}>
          {order.status}
        </div>
      </div>

      <div className={styles.orderItems}>
        {order.items.slice(0, 3).map((item) => (
          <div key={item.id} className={styles.orderItem}>
            <div className={styles.itemImage}>
              {item.image || item.thumbnail ? (
                <img 
                  src={item.image || item.thumbnail} 
                  alt={item.title}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/80x80/2563eb/ffffff?text=Product";
                    e.target.onerror = null;
                  }}
                />
              ) : (
                <div className={styles.imagePlaceholder}>
                  {item.title.charAt(0).toUpperCase()}
                </div>
              )}
              {item.quantity > 1 && (
                <span className={styles.quantityBadge}>×{item.quantity}</span>
              )}
            </div>
            <div className={styles.itemInfo}>
              <h4 className={styles.itemTitle}>{item.title}</h4>
              {item.price && (
                <p className={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</p>
              )}
            </div>
          </div>
        ))}
        
        {order.items.length > 3 && (
          <div className={styles.moreItems}>
            <span>+{order.items.length - 3} more items</span>
          </div>
        )}
      </div>

      <div className={styles.orderFooter}>
        <div className={styles.orderTotal}>
          <span className={styles.totalLabel}>Order Total</span>
          <span className={styles.totalAmount}>{totalPaid}</span>
        </div>
        
        <div className={styles.orderActions}>
          {order.status === "processing" && (
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => handleCancelOrder(order.id)}
              disabled={isCanceling}
            >
              {isCanceling ? (
                <>
                  <span className={styles.spinner}></span>
                  Canceling...
                </>
              ) : (
                "Cancel Order"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;