import { getCurrentUserId, saveCartToFirebase, saveUserOrder } from "../firebase/firebase";
import { useCart } from "../context/CartContext";

export async function handleOrderSuccess(cart, clearCart, setShowPaymentForm, setShowSuccessModal) {
  const userId = await getCurrentUserId();
  if (userId) {
    await saveUserOrder(userId, cart);
    clearCart();
    await saveCartToFirebase(userId, { items: [] });
  }
  setShowPaymentForm(false);
  setShowSuccessModal(true);
}
