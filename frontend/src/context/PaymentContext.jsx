import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { updateUserData } from "../services/authService";
import { useAuthContext } from "./AuthContext";
import { useCart } from "./CartContext";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { user, userData, loading: authLoading, setUserData } = useAuthContext();
  const { cart } = useCart()

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [address, setAddress] = useState(""); 
  const [shippingCost, setShippingCost] = useState(599); 
  const [loading, setLoading] = useState(true);

  // PRIMERO calcular subtotal SOLO (sin shipping)
  const subtotalInCents = useMemo(() => {
    return cart.reduce((acc, item) => 
      acc + (Math.round(item.price * 100) * item.quantity), 0
    );
  }, [cart]); // Solo depende de cart

  // LUEGO calcular shipping basado en subtotal
  useEffect(() => {
    const subtotalDollars = subtotalInCents / 100;
    const newShippingCost = subtotalDollars >= 50 ? 0 : 5.99;
    setShippingCost(newShippingCost * 100);
  }, [subtotalInCents]);

  // FINALMENTE calcular totals (esto puede usar shippingCost)
  const { totalInCents, totals } = useMemo(() => {
    const totalCents = subtotalInCents + shippingCost;
    
    const totalsObj = {
      subtotal: subtotalInCents / 100,        
      shipping: shippingCost / 100,         
      total: totalCents / 100,              
      subtotalInCents: subtotalInCents,       
      totalInCents: totalCents,            
    };
    
    return {
      totalInCents: totalCents,
      totals: totalsObj
    };
  }, [subtotalInCents, shippingCost]);

  useEffect(() => {
    if (authLoading) return;

    if (user && userData) {
      setPaymentMethods(userData.paymentMethods || []);
      setAddress(userData.address || "");
    } else {
      setPaymentMethods([]);
      setAddress("");
    }
   
    setLoading(false);
  }, [user, userData, authLoading]);

  const addPaymentMethod = async (newCard) => {
    const cardWithId = {
      ...newCard,
      id: newCard.id || `${newCard.brand}-${newCard.last4}` 
    };

    const updated = [...paymentMethods, cardWithId];
    setPaymentMethods(updated);

    if (user) {
      await updateUserData(user.uid, { paymentMethods: updated });
      setUserData(prev => ({ ...prev, paymentMethods: updated }));
    }
  }
  
  const removePaymentMethod = async (indexToRemove) => {
    const updated = paymentMethods.filter((_, i) => i !== indexToRemove);
    setPaymentMethods(updated);
    if (user) {
      await updateUserData(user.uid, { paymentMethods: updated });
      setUserData(prev => ({ ...prev, paymentMethods: updated }));
    }
  };

  const updateAddress = async (newAddress) => {
    setAddress(newAddress);
    if (user) {
      await updateUserData(user.uid, { address: newAddress });
      setUserData(prev => ({ ...prev, address: newAddress }));
    }
  };
  
  return (
    <PaymentContext.Provider 
      value={{ 
        paymentMethods, 
        addPaymentMethod, 
        removePaymentMethod, 
        address,
        updateAddress,
        shippingCost,
        totals,
        subtotalInCents,
        totalInCents
      }}>
        {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
