import { IoIosAdd } from "react-icons/io";

function PaymentSummary({ total, shippingCost }) {
  const finalTotal = total + shippingCost / 100;
  
  return (
    <section>

      <dl className="summary-list">
        <div className="total-summary">
          <dt>Total:</dt>
          <dd>${total.toFixed(2)}</dd>
        </div>

        <div className="shipping-summary">
          <dt>Shipping cost:</dt>
          <dd className="shipping-price">
            <IoIosAdd />
            ${ (shippingCost / 100).toFixed(2) }
          </dd>
        </div>

        <div className="final-total">
          <dt>Total amount:</dt>
          <dd><strong>${finalTotal.toFixed(2)}</strong></dd>
        </div>
      </dl>
    </section>
  );
}

export default PaymentSummary;
