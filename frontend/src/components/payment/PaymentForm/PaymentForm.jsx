import styles from './PaymentForm.module.css';
import { usePaymentForm } from '../../../hooks/usePaymentForm';
import ShippingAddressInput from '../ShippingAddressInput/ShippingAddressInput'
import PaymentSummary from '../PaymentSummary/PaymentSummary'
import SavedCardsSelector from '../SavedCardsSelector/SavedCardsSelector'


function PaymentForm({ total, onSucces }) {
  const {
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
  } = usePaymentForm(total, onSucces);

  return (
    <section className={styles.container} aria-labelledby="payment-title" role="region">
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 id="payment-title" className={styles.title}>Payment Summary</h2>
          
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
          className={styles.button}
          type="submit"
          disabled={isProcessing}
          aria-label={isProcessing ? 'Processing payment' : 'Pay now'}>
          {isProcessing ? 'Processing...' : `PAY`}
        </button>
      </form>
    </section>
  );
};

export default PaymentForm;
