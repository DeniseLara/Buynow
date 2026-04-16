import './CartPage.css';
import { useState } from "react";
import { useCart } from '../../context/CartContext'; 
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import Loading from '../../components/ui/Loading'
import Cart from "../../components/cart/Cart";
import PaymentForm from '../../components/payment/PaymentForm/PaymentForm'
import Modal from "../../components/payment/ModalForm/ModalForm";
import PaymentSuccessModal from "../../components/payment/PaymentSuccessModal/PaymentSuccessModal";
import OrderSummary from "../../components/cart/OrderSummary";
import BackButton from '../../components/ui/BackButton';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CartPage() {  
  const { cart, checkout, loading } = useCart();
  const { user } = useAuthContext();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleCheckoutClick = () => {
    if (!user) {
      // Si no hay usuario, lo mandamos al login
      navigate('/login', { state: { from: location.pathname } });
    } else {
      // Si hay usuario, mostramos el formulario de pago
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSuccess = async () => {
    // Cerramos el formulario primero
    setShowPaymentForm(false);
    
    // Limpiamos el carrito 
    await checkout(); 
    
    // Mostramos éxito
    setShowSuccessModal(true);
};

  if (loading) {
    return <Loading/>
  }
  
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
              isDisabled={cart.length === 0}
              onCheckoutClick={handleCheckoutClick}
            />
          </>
        )}
        </section>

        <Modal 
          isOpen={showPaymentForm}
        >
          <Elements stripe={stripePromise}>
          <PaymentForm
            onClose={() => setShowPaymentForm(false)}
            onSuccess={handlePaymentSuccess}
          />
          </Elements>
        </Modal>

        {showSuccessModal && (
          <PaymentSuccessModal onClose={() => setShowSuccessModal(false)} />
        )}
      </div>
    </div>
  );
}

export default CartPage;
