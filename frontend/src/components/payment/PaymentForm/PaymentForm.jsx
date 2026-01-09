import styles from './PaymentForm.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";
import { usePayment } from '../../../context/PaymentContext';
import { useCart } from '../../../context/CartContext';
import { useAuthContext } from '../../../context/AuthContext';
import { processPayment } from '../../../services/paymentService';
import fakeTestCards from '../../../data/fakeTestCards'

function PaymentForm({ onSuccess, onClose }) {
    const { totals } = usePayment()
    const { user } = useAuthContext();
    const { cart } = useCart();
    const { 
        paymentMethods, 
        address, 
        updateAddress, 
    } = usePayment();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            address: address || '',
            cardId: ''
        }
    });

    const cardsToShow = paymentMethods.length > 0 ? paymentMethods : fakeTestCards;
    const selectedCardId = watch('cardId');
  
    // Auto-select if only one card
    useEffect(() => {
        if (cardsToShow.length === 1) {
            setValue('cardId', cardsToShow[0].id);
        }
    }, [cardsToShow, setValue]);

    // Sync address with context
    const handleAddressChange = (e) => {
        updateAddress(e.target.value);
        setValue('address', e.target.value);
    };    

    // Handle form submission
    const onSubmit = async () => {
        try {
            const paymentIntent = await processPayment(
                cart, 
                shippingCost, 
                user.uid
            );

            if (paymentIntent.status === 'succeeded') {
                onSuccess();
                reset();
            } else {
                throw new Error('El pago no fue exitoso');
            }
        } catch (error) {
            throw new Error(error.message || 'Hubo un error al procesar el pago');
        }
    };

    // Render single card view
    if (cardsToShow.length === 1) {
        const card = cardsToShow[0];
        return (
            <div className={styles.singleCard}>
                <p>
                    Your saved card: 
                    <strong>{card.brand} •••• {card.last4}</strong>
                </p>
            </div>
        );
    }

    return (
        <section className={styles.container} aria-labelledby="payment-title" role="region">
            <button 
                className={styles.closeButton} 
                onClick={onClose}
                aria-label='close window'
                type='button'
            >
                <IoMdClose/>
            </button>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <h2 id="payment-title" className={styles.title}>
                    Payment Summary
                </h2>
          
                <div className={styles.shippingContainer}>
                    <label htmlFor="address" className={styles.label}>
                        Shipping Address
                        <span className={styles.required}>*</span>
                    </label>
                    <input
                        className={`${styles.shippingInput} ${errors.address ? styles.errorInput : ''}`}
                        type="text"
                        id="address"
                        placeholder="Ingresa tu dirección de envío"
                        {...register('address', {
                            required: 'La dirección de envío es requerida',
                            minLength: {
                                value: 5,
                                message: 'La dirección debe tener al menos 5 caracteres'
                        },
                        onChange: handleAddressChange
                        })}
                    />
                    {errors.address && (
                        <div className={styles.error} role="alert">
                            {errors.address.message}
                        </div>
                    )}
                </div>

                <div className={styles.selector}>
                    <label htmlFor="cardId" className={styles.label}>
                        Select Your Card
                        <span className={styles.required}>*</span>
                    </label>
                    <select
                        id="cardId"
                        className={`${styles.dropdown} ${errors.cardId ? styles.errorInput : ''}`}
                        {...register('cardId', {
                            required: cardsToShow.length > 1 ? 'Por favor, selecciona una tarjeta' : false,
                            validate: value => cardsToShow.length <= 1 || value ? true : 'Selecciona una tarjeta'
                        })}
                    >
                        <option value="">-- Select a Card --</option>
                        {cardsToShow.map((method) => (
                            <option key={method.id} value={method.id}>
                                {method.brand} •••• {method.last4}
                            </option>
                        ))}
                    </select>
          
                    {errors.cardId && (
                        <div className={styles.error} role="alert">
                            {errors.cardId.message}
                        </div>
                    )}

                    {selectedCardId && (
                        <div className={styles.selectedCardInfo}>
                            <p>
                                Selected: {cardsToShow.find(c => c.id === selectedCardId)?.brand}
                            </p>
                        </div>
                    )}
                </div>

                <div className={`${styles.summaryItem} ${styles.finalTotal}`}>
                    <p>Total amount:</p>
                    <span>
                        ${totals.total}
                    </span>
                </div>

                <button
                    className={styles.button}
                    type="submit"
                    disabled={isSubmitting}
                    aria-label={isSubmitting ? 'Processing payment' : 'Pay now'}
                >
                    {isSubmitting ? 'Processing...' : `PAY $${totals.total}`}
                </button>
            </form>
        </section>
    );
};

export default PaymentForm;