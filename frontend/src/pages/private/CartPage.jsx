import './CartPage.css';
import { useState } from "react";
import { useCart } from '../../context/CartContext'; 

import Cart from "../../components/cart/Cart";
import PaymentForm from '../../components/payment/PaymentForm/PaymentForm'
import Modal from "../../components/payment/ModalForm/ModalForm";
import PaymentSuccessModal from "../../components/payment/PaymentSuccessModal/PaymentSuccessModal";
import OrderSummary from "../../components/cart/OrderSummary";
import BackButton from '../../components/ui/BackButton';


function CartPage() {  
  const { cart, checkout } = useCart();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  return (
    <div className="cart-page section">
      <div className="container">
        <header>
          <BackButton/>
          <h1 className="cart-title">Your cart</h1>
        </header>

        <section className='cart-page-content'>
        {cart.length === 0 ? (
          <p role="alert">Your cart is empty</p>
        ) : (
          <>
            <Cart />
        
            <OrderSummary
              onCheckoutClick={() => setShowPaymentForm(true)}
              isDisabled={cart.length === 0}
            />
          </>
        )}
        </section>

        <Modal 
          isOpen={showPaymentForm}
        >
          <PaymentForm
            onClose={() => setShowPaymentForm(false)}
            onSuccess={() => checkout(setShowPaymentForm, setShowSuccessModal)}
          />
        </Modal>

        {showSuccessModal && (
          <PaymentSuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
      </div>
    </div>
  );
}

export default CartPage;
