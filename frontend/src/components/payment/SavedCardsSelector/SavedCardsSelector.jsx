import styles from './SavedCardsSelector.module.css'

function SavedCardsSelector({ paymentMethods, selectedCard, onSelect, error }) {
  if (paymentMethods.length === 0) return null;

  if (paymentMethods.length === 1) {
    const card = paymentMethods[0];
    return (
      <div className={styles.singleCard}>
        <p>Your saved card: <strong>{card.brand} •••• {card.last4}</strong></p>
      </div>
    );
  }

  return (
    <div className={styles.selector}>
      <label htmlFor="saved-cards">Select Your Card</label>
        <select
          id="saved-cards"
          value={selectedCard}
          onChange={onSelect}
          className={styles.dropdown}
          required
        >
          <option value="">-- Select a Card --</option>
          {paymentMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.brand} •••• {method.last4}
          </option>
          ))}
        </select>

        {error && (
          <div className={styles.error} role="alert">
            {error}
          </div>
        )}
    </div>
  );
}

export default SavedCardsSelector;