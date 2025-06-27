import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import CartPage from "./pages/private/CartPage";

// Cargar Stripe fuera del componente
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CartPageWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CartPage />
    </Elements>
  );
};

export default CartPageWrapper;
