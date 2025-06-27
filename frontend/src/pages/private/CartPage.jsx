import './CartPage.css';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

import { useCart } from '../../context/CartContext'; 
import { useCartTotal } from "../../hooks/useCartTotal";
import { handleOrderSuccess } from "../../utils/handleOrder";

import Cart from "../../components/cart/Cart";
import PaymentForm from '../../components/payment/PaymentForm'
import Modal from "../../components/payment/ModalForm";
import PaymentSuccessModal from "../../components/payment/PaymentSuccessModal";
import OrderSummary from "../../components/cart/OrderSummary";
import BackButton from '../../components/ui/BackButton';


function CartPage() {  
  // Usar el contexto para acceder al carrito y las funciones
  const { cart, removeFromCart, clearCart } = useCart();
  const total = useCartTotal();
  const loadedRef = useRef(false); // Evitar recargar el carrito
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  

  return (
    <section className="cart-page">
      <BackButton/>
      
      <h1 className="cart-title">Your cart</h1>

      {cart.length === 0 ? (
        <p role="alert">Your cart is empty</p>
      ) : (
        <>
        <article>
          <Cart 
            items={cart} 
            onRemoveFromCart={removeFromCart} 
            onClearCart={clearCart} 
          />
        </article>

          <OrderSummary
          total={total}
          onCheckoutClick={() => setShowPaymentForm(true)}
          isDisabled={cart.length === 0}
          />
        </>
      )}

       <Modal isOpen={showPaymentForm} onClose={() => setShowPaymentForm(false)}>
       <PaymentForm
            total={total}
            cart={cart}
            onSucces={() =>
            handleOrderSuccess(cart, clearCart, setShowPaymentForm, setShowSuccessModal)}
          />
      </Modal>

    {showSuccessModal && (
      <PaymentSuccessModal onClose={() => setShowSuccessModal(false)} />
    )}
  </section>
  );
}

export default CartPage;
