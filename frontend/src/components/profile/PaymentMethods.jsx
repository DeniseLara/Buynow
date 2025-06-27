import { IoIosAdd, IoIosRemoveCircleOutline } from "react-icons/io";

function PaymentMethods({
  editMode,
  selectedCard,
  fakeTestCards,
  setSelectedCard,
  handleAddPaymentMethod,
  paymentMethods,
  removePaymentMethod
}) {
  
  return (
    <div className="profile-section">
          <h3>Payment Methods</h3>

          {editMode ? (
            <>
          <div className="card-filter">
          {fakeTestCards.map((card) => (
          <button
          type="button"
            key={card.id}
            className={`card-option ${selectedCard === card.id ? 'selected' : ''}`}
            onClick={() => setSelectedCard(card.id)}
            aria-label="select card"
            >
            <img src={card.logo} alt={card.brand} className="card-logo" />
          </button>
          ))}
          </div>


            {selectedCard !== null && (
                <button 
                type="button"
                className="add-payment-button" 
                onClick={handleAddPaymentMethod}
                aria-label="add card"
                >
                 <strong><IoIosAdd/></strong>
                 <p className="add-payment-text">Add</p> 
                </button>
             )}

              {paymentMethods.map((method, index) => (
                <div className="payment-card" key={index}>
                <p>{method.brand} **** {method.last4}</p> 
                  <button 
                  type="button"
                  aria-label="remove card"
                  className="remove-card"
                  onClick={() => removePaymentMethod(index)} 
                  >
                    <IoIosRemoveCircleOutline/>
                  </button>
                </div>
              ))}
            </>
          ) : (
            <div>
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method, index) => (
                <div key={index} className="payment-method-display">
                  <img src={method.logo} alt={method.brand} className="card-logo-display" />
                  <p>{method.brand} **** {method.last4}</p>
                </div>
              ))
            ) : (
              "You don't have any saved payment methods."
            )}
        </div>
        )}
    </div>
  );
}

export default PaymentMethods;
