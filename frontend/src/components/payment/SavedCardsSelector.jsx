function SavedCardsSelector({ paymentMethods, selectedCard, onSelect, error }) {
  if (paymentMethods.length === 0) return null;

  if (paymentMethods.length === 1) {
    const card = paymentMethods[0];
    return (
      <div className="single-card-message">
        <p>Your saved card: <strong>{card.brand} •••• {card.last4}</strong></p>
      </div>
    );
  }

  return (
    <div className="saved-cards">
      <label htmlFor="saved-cards">Select Your Card</label>
      <select
        id="saved-cards"
        value={selectedCard}
        onChange={onSelect}
        className="saved-cards-dropdown"
        required
      >
        <option value="">-- Select a Card --</option>
        {paymentMethods.map((method) => (
          <option key={method.id} value={method.id}>
            {method.brand} •••• {method.last4}
          </option>
        ))}
      </select>
      {error && <div className="card-error">{error}</div>}
    </div>
  );
}

export default SavedCardsSelector;