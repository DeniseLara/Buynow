import styles from './PaymentForm.module.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";

import { saveUserOrder } from '../../../services/ordersService';
import { useCart } from '../../../context/CartContext';
import { useAuthContext } from '../../../context/AuthContext';
import { processPayment } from '../../../services/paymentService';
import fakeTestCards from '../../../data/fakeTestCards'

function PaymentForm({ onSuccess, onClose }) {
    const { user, userData, updateProfile } = useAuthContext();
    const { cart, totals } = useCart();

    // Extraemos los datos de userData
    const paymentMethods = userData?.paymentMethods || [];
    const savedAddress = userData?.address || '';

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isSubmitting },
        setValue,
        reset
    } = useForm({
        defaultValues: {
            address: savedAddress,
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
        //updateAddress(e.target.value);
        setValue('address', e.target.value);
    };    

    const onSubmit = async (data) => {
        try {
            if (data.address !== userData?.address) {
                await updateProfile({ address: data.address });
            }

            // Guardar la orden 
            const orderId = await saveUserOrder(user.uid, cart, totals);
            
            // Procesar pago pasando solo los IDs necesarios
            const paymentData = await processPayment(user.uid, orderId);

            if (paymentData.clientSecret) {
                await onSuccess(); 
                reset();
            }
        } catch (error) {
            alert(error.message);
        }
    };

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
                        className={`${styles.shippingInput} ${errors.savedAddress ? styles.errorInput : ''}`}
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
                    {errors.savedAddress && (
                        <div className={styles.error} role="alert">
                            {errors.savedAddress.message}
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