import './PaymentForm.css';
import { useState, useEffect } from 'react';

import { processPayment } from '../../utils/paymentService';
import { usePayment } from '../../context/PaymentContext';
import { useAuth } from '../../context/AuthContext';

import fakeTestCards from '../../data/fakeTestCards';
import ShippingAddressInput from './ShippingAddressInput'
import PaymentSummary from './PaymentSummary'
import SavedCardsSelector from './SavedCardsSelector'


function PaymentForm({ total, cart, onSucces }) {
  const { user } = useAuth();
  const { 
    paymentMethods, 
    address, 
    updateAddress, 
    shippingCost, 
    calculateShippingCost 
  } = usePayment();

  // Usar las tarjetas del usuario si hay, si no, las fake
  const cardsToShow = paymentMethods.length > 0 ? paymentMethods : fakeTestCards;

  const [selectedCard, setSelectedCard] = useState('');
  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addressError, setAddressError] = useState(null);
  
  useEffect(() => {
    if (cardsToShow.length === 1) {
      setSelectedCard(cardsToShow[0].id);
    }
  }, [cardsToShow]);


  useEffect(() => {
    calculateShippingCost(total);
  }, [total, calculateShippingCost]);


  const handleCardChange = (e) => {
    setSelectedCard(e.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      setAddressError('Por favor, ingresa una dirección de envío.');
      return;
    }

    // Verificar que se haya seleccionado una tarjeta si hay más de una
    if (cardsToShow.length > 1 && !selectedCard) {
      setCardError('Por favor, selecciona una tarjeta para realizar el pago.');
      return;
    }

    setIsProcessing(true);
    setCardError(null);
    setAddressError(null);

    try {
      const paymentIntent = await processPayment(cart, shippingCost, user.uid);

      if (paymentIntent.status === 'succeeded') {
        onSucces();
      } else {
        setCardError('El pago no fue exitoso. Inténtalo nuevamente.');
      }
    } catch (error) {
      setCardError(error.message || 'Hubo un error al procesar el pago.');
    } finally {
      setIsProcessing(false);
    }
  };
  

  return (
    <div className="payment-container">
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2 className="payment-title">Payment Summary</h2>
          
        <ShippingAddressInput
          address={address}
          onChange={updateAddress}
          error={addressError}
        />

        <SavedCardsSelector
          paymentMethods={cardsToShow}
          selectedCard={selectedCard}
          onSelect={handleCardChange}
          error={cardError}
        />

        <PaymentSummary total={total} shippingCost={shippingCost} />

        <button
          className="payment-button"
          type="submit"
          disabled={isProcessing}
          aria-label={isProcessing ? 'Processing payment' : 'Pay now'}>
          {isProcessing ? 'Processing...' : `PAY`}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
