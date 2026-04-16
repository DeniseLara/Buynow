import styles from './PaymentForm.module.css';
import { useForm } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import { saveUserOrder } from '../../../services/ordersService';
import { useCart } from '../../../context/CartContext';
import { useAuthContext } from '../../../context/AuthContext';
import { processPayment } from '../../../services/paymentService';

function PaymentForm({ onSuccess, onClose }) {
    const stripe = useStripe();
    const elements = useElements();
    const { user, userData, updateProfile } = useAuthContext();
    const { cart, totals } = useCart();

    // Extraemos los datos de userData
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

    // Sync address with context
    const handleAddressChange = (e) => {
        setValue('address', e.target.value);
    };    

    const onSubmit = async (data) => {
        if (!stripe || !elements) return; // Stripe no ha cargado

        try {
            // Crear la orden en tu base de datos
            const orderId = await saveUserOrder(user.uid, cart, totals);
            
            // Obtener el clientSecret del backend 
            const { clientSecret } = await processPayment(user.uid, orderId);

            // CONFIRMAR EL PAGO CON STRIPE
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName || 'Customer',
                        address: { line1: data.address }
                    },
                },
            });

            if (result.error) {
                alert(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    // Si todo sale bien, ejecutamos el éxito
                    await onSuccess(); 
                }
            }
        } catch (error) {
            alert("Error en el proceso: " + error.message);
        }
    };

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
                            }
                        })}
                        onChange={handleAddressChange}
                    />
                    {errors.address && (
                        <div className={styles.error} role="alert">
                            {errors.address.message}
                        </div>
                    )}
                </div>
 
                <div className={styles.stripeElementContainer}>
                    <label className={styles.label}>
                        Payment Information
                        <span className={styles.required}>*</span>
                    </label>
                    
                    <div className={styles.testCardHelper}>
                        <p>
                            <strong>🔒 Modo de Prueba</strong><br/>
                            No ingrese datos reales. Use <code>4242 4242 4242 4242</code>
                        </p>
                    </div>
 
                    <div className={styles.stripeCardWrapper}>
                        <CardElement 
                            options={{
                                style: {
                                    base: { 
                                        fontSize: '16px', 
                                        color: '#111827',
                                        fontFamily: '"Open Sans", sans-serif',
                                        '::placeholder': {
                                            color: '#6b7280',
                                        },
                                    },
                                    invalid: { 
                                        color: '#ef4444',
                                        iconColor: '#ef4444'
                                    },
                                },
                            }} 
                        />
                    </div>
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
                    disabled={!stripe || isSubmitting}
                    aria-label={isSubmitting ? 'Processing payment' : 'Pay now'}
                >
                    {isSubmitting ? 'Processing...' : `PAY $${totals.total}`}
                </button>
            </form>
        </section>
    );
};
 
export default PaymentForm;
 