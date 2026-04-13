import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { updateUserData } from "../services/authService";
import { useAuthContext } from "./AuthContext";
import { useCart } from "./CartContext";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { userData, updateProfile } = useAuthContext();
  const { cart } = useCart()

  const paymentMethods = userData?.paymentMethods || [];
  const address = userData?.address || "";

  // PRIMERO calcular subtotal SOLO (sin shipping)
  const subtotalInCents = useMemo(() => {
    return cart.reduce((acc, item) => 
      acc + (Math.round(item.price * 100) * item.quantity), 0
    );
  }, [cart]); // Solo depende de cart

  const shippingCost = subtotalInCents > 5000 ? 0 : 599; // 5000 cents = $50
  const totalInCents = subtotalInCents + shippingCost;

  return (
    <PaymentContext.Provider 
      value={{ 
        paymentMethods, 
        address,
        totals: {
        subtotal: subtotalInCents / 100,
        shipping: shippingCost / 100,
        total: totalInCents / 100
      },
      updateProfile
      }}>
        {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
