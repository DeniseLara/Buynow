import { IoIosAdd } from "react-icons/io";

function PaymentSummary({ total, shippingCost }) {
  const finalTotal = total + shippingCost / 100;
  
  return (
    <section>
      <ul className="summary-list">
        <li className="total-summary">
          <p>Price:</p>
          <span>${total.toFixed(2)}</span>
        </li>

        <li className="shipping-summary">
          <p>Shipping cost:</p>
          <span className="shipping-price">
            <IoIosAdd />
            ${ (shippingCost / 100).toFixed(2) }
          </span>
        </li>

        <li className="final-total">
          <p>Total amount:</p>
          <span><strong>${finalTotal.toFixed(2)}</strong></span>
        </li>
      </ul>
    </section>
  );
}

export default PaymentSummary;
