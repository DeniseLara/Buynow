import PropTypes from "prop-types";

function OrderCard({ order, cancelingOrders, handleCancelOrder }) {
  const isCanceling = Array.isArray(cancelingOrders) && cancelingOrders.includes(order.id);
  const formattedDate = new Date(order.date).toLocaleDateString();
  const totalPaid = order.totalPaid !== undefined && order.totalPaid !== null
    ? `$${order.totalPaid.toFixed(2)}`
    : "Total not available";
  const status = order.status ?? "Status not available";

  return (
    <article className="order-card" aria-labelledby={`order-${order.id}-title`}>
      <header className="order-principal-text">
        <p id={`order-${order.id}-title`}>
          <strong>Order</strong> #{order.id.slice(0, 8)}
        </p>
        <time className="order-date" dateTime={order.date}>
          {formattedDate}
        </time>
      </header>

      <ul className="order-items">
        {order.items.map((item, index) => (
          <li className="orders" key={index}>
            <p className="order-detail product">{item.title}</p>
            <p className="order-detail">
              Quantity: <strong>{item.quantity}</strong>
            </p>
          </li>
        ))}
      </ul>

      <footer className="order-total-detail">
        <strong className={`order-status ${order.status}`}>
          {status}
        </strong>
        <p className="order-total">
          Total: <strong>{totalPaid}</strong>
        </p>
      </footer>

      {order.status !== "canceled" && (
        <button
          type="button"
          className="cancel-order-btn"
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
