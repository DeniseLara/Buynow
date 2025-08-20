import styles from './PaymentMethods.module.css'
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
    <section className={styles.container} aria-labelledby="payment-methods-title">
      <h3 id="payment-methods-title">Payment Methods</h3>

        {editMode ? (
          <>
            <div className={styles.cardFilter}>
              {fakeTestCards.map((card) => (
                <button
                  type="button"
                  key={card.id}
                  className={`${styles.cardOption} ${selectedCard === card.id ? styles.selected : ''}`}
                  onClick={() => setSelectedCard(card.id)}
                  aria-label="select card"
                >
                  <img src={card.logo} alt={card.brand} className={styles.cardLogo} />
                </button>
              ))}
            </div>


            {selectedCard !== null && (
              <button 
                type="button"
                className={styles.addButton} 
                onClick={handleAddPaymentMethod}
                aria-label="add card"
              >
                <strong><IoIosAdd/></strong>
                <p className={styles.text}>Add</p> 
              </button>
             )}
              
            <ul className={styles.cardList}>
              {paymentMethods.map((method, index) => (
                <li key={index} className={styles.card}>
                <p className={styles.cardText}>{method.brand} **** {method.last4}</p> 
                  <button 
                    type="button"
                    aria-label="remove card"
                    className={styles.removeCard}
                    onClick={() => removePaymentMethod(index)} 
                  >
                    <IoIosRemoveCircleOutline/>
                  </button>
                </li>
              ))}
            </ul>
          </>
          ) : (
            <ul className={styles.cardListDisplay}>
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method, index) => (
                  <li key={index} className={styles.paymentMethod}>
                    <img 
                      src={method.logo} 
                      alt={method.brand} 
                      className={styles.cardLogo} 
                    />
                    <p className={styles.cardbrand}>{method.brand} **** {method.last4}</p>
                  </li>
                ))
              ) : (
                <p className={styles.infoText}>You don't have any saved payment methods.</p>
              )}
            </ul>
          )}
    </section>
  );
}

export default PaymentMethods;
