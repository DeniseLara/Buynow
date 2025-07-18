import './CartPage.css';
import { useState } from "react";

import { useCart } from '../../context/CartContext'; 
import { useCartTotal } from "../../hooks/useCartTotal";

import Cart from "../../components/cart/Cart";
import PaymentForm from '../../components/payment/PaymentForm'
import Modal from "../../components/payment/ModalForm";
import PaymentSuccessModal from "../../components/payment/PaymentSuccessModal";
import OrderSummary from "../../components/cart/OrderSummary";
import BackButton from '../../components/ui/BackButton';


function CartPage() {  
  // Usar el contexto para acceder al carrito y las funciones
  const { cart, removeFromCart, clearCart, checkout } = useCart();
  const total = useCartTotal();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  

  return (
    <div className="cart-page">
      <header>
        <BackButton/>
        <h1 className="cart-title">Your cart</h1>
      </header>

      <section>
      {cart.length === 0 ? (
        <p role="alert">Your cart is empty</p>
      ) : (
        <>
          <Cart 
            items={cart} 
            onRemoveFromCart={removeFromCart} 
            onClearCart={clearCart} 
          />
        
          <OrderSummary
          total={total}
          onCheckoutClick={() => setShowPaymentForm(true)}
          isDisabled={cart.length === 0}
          />
        </>
      )}
      </section>

       <Modal isOpen={showPaymentForm} onClose={() => setShowPaymentForm(false)}>
       <PaymentForm
          total={total}
          cart={cart}
          onSucces={() => checkout(setShowPaymentForm, setShowSuccessModal)}
        />
      </Modal>

    {showSuccessModal && (
      <PaymentSuccessModal onClose={() => setShowSuccessModal(false)} />
    )}
  </div>
  );
}

export default CartPage;
