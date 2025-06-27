import { IoIosAdd } from "react-icons/io";

function PaymentSummary({ total, shippingCost }) {
  const finalTotal = total + shippingCost / 100;
  
  return (
    <>
      <div className="total-summary">
        <span>Total:</span>
        ${total.toFixed(2)}
      </div>

      <div className="shipping-summary">
        <span>Shipping cost:</span>
        <strong className="shipping-price">
          <IoIosAdd />
          ${ (shippingCost / 100).toFixed(2) }
        </strong>
      </div>

      <div className="final-total">
        <span>Total amount:</span>
        <strong>${finalTotal.toFixed(2)}</strong>
      </div>
    </>
  );
}

export default PaymentSummary;
