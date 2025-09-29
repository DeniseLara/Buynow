import { useState, useEffect } from 'react';
import { usePayment } from '../context/PaymentContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { processPayment } from '../utils/paymentService';
import fakeTestCards from '../data/fakeTestCards';

export function usePaymentForm(total, onSucces) {
  const { user } = useAuth();
  const { cart } = useCart();
  const { paymentMethods, address, updateAddress, shippingCost, calculateShippingCost } = usePayment();

  const [selectedCard, setSelectedCard] = useState('');
  const [cardError, setCardError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [addressError, setAddressError] = useState(null);

  const cardsToShow = paymentMethods.length > 0 ? paymentMethods : fakeTestCards;

  useEffect(() => {
    if (cardsToShow.length === 1) {
      setSelectedCard(cardsToShow[0].id);
    }
  }, [cardsToShow]);

  useEffect(() => {
    calculateShippingCost(total);
  }, [total, calculateShippingCost]);

  const handleCardChange = (e) => setSelectedCard(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      setAddressError('Por favor, ingresa una dirección de envío.');
      return;
    }

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

  return {
    selectedCard,
    cardError,
    addressError,
    isProcessing,
    cardsToShow,
    address,
    updateAddress,
    handleCardChange,
    handleSubmit,
    shippingCost,
  };
}
