import { useCart } from "../context/CartContext";

export function useCartTotal() {
  const { cart } = useCart();
  return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
}
