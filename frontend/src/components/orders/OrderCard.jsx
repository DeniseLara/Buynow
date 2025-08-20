import styles from './OrderCard.module.css'
import PropTypes from "prop-types";

function OrderCard({ order, cancelingOrders, handleCancelOrder }) {
  const isCanceling = Array.isArray(cancelingOrders) && cancelingOrders.includes(order.id);

  const formattedDate = new Date(order.date).toLocaleDateString();
  
  const totalPaid = order.totalPaid !== undefined && order.totalPaid !== null
    ? `$${order.totalPaid.toFixed(2)}`
    : "Total not available";
  const status = order.status ?? "Status not available";

  return (
    <article className={styles.container} aria-labelledby={`order-${order.id}-title`}>
      <header className={styles.header}>
        <p id={`order-${order.id}-title`}>
          <strong>Order</strong> #{order.id.slice(0, 8)}
        </p>
        <time className={styles.orderDate} dateTime={order.date}>
          {formattedDate}
        </time>
      </header>

      <ul className={styles.itemsList}>
        {order.items.map((item, index) => (
          <li className={styles.item} key={index}>
            <p className={styles.itemTitle}>{item.title}</p>
            <p className={styles.itemQuantity}>
              Quantity: <strong>{item.quantity}</strong>
            </p>
          </li>
        ))}
      </ul>

      <footer className={styles.footer}>
        <strong className={`${styles.status} ${order.status}`}>
          {status}
        </strong>
        <p className={styles.total}>
          Total: <strong>{totalPaid}</strong>
        </p>
      </footer>

      {order.status !== "canceled" && (
        <button
          type="button"
          className={styles.cancelButton}
          aria-label={`Cancel order with ID ${order.id}`}
          onClick={() => handleCancelOrder(order.id)}
          disabled={isCanceling}
        >
          {isCanceling ? "Cancelings..." : "Cancel Order"} 
        </button>
      )}
    </article>
  );
};

OrderCard.propTypes = {
  order: PropTypes.object.isRequired,
  cancelingOrders: PropTypes.array,
  handleCancelOrder: PropTypes.func.isRequired,
};

export default OrderCard;
