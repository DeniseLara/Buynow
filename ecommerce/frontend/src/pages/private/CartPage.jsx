import './CartPage.css';
import { useState } from "react";
import { useCart } from '../../context/CartContext'; 
import { useNavigate, useLocation } from 'react-router-dom';

import Cart from "../../components/cart/Cart";
import PaymentForm from '../../components/payment/PaymentForm/PaymentForm'
import Modal from "../../components/payment/ModalForm/ModalForm";
import PaymentSuccessModal from "../../components/payment/PaymentSuccessModal/PaymentSuccessModal";
import OrderSummary from "../../components/cart/OrderSummary";
import BackButton from '../../components/ui/BackButton';
import { useAuthContext } from '../../context/AuthContext';


function CartPage() {  
  const { cart, checkout } = useCart();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleCheckoutClick = () => {
    if (!user) {
      // Si no hay usuario, lo mandamos al login
      // 'from' le dice al login de dónde venía el usuario
      navigate('/login', { state: { from: location.pathname } });
    } else {
      // Si hay usuario, mostramos el formulario de pago
      setShowPaymentForm(true);
    }
  };

  const handlePaymentSuccess = async () => {
    // 1. Limpiamos el carrito en la base de datos y estado (vía Contexto)
    const cleared = await checkout();
    
    if (cleared) {
        // 2. Cerramos el formulario de pago
        setShowPaymentForm(false);
        // 3. Mostramos el modal de éxito
        setShowSuccessModal(true);
    }
};
  
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
              //onCheckoutClick={() => setShowPaymentForm(true)}
              isDisabled={cart.length === 0}
              onCheckoutClick={handleCheckoutClick}
            />
          </>
        )}
        </section>

        <Modal 
          isOpen={showPaymentForm}
        >
          <PaymentForm
            onClose={() => setShowPaymentForm(false)}
            onSuccess={handlePaymentSuccess}
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
