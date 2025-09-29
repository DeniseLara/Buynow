import { createContext, useContext, useState, useEffect } from "react";
import { updateUserData } from "../services/authService";
import { useAuth } from "./AuthContext";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const { user, userData, loading: authLoading, setUserData } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [address, setAddress] = useState(""); 
  const [shippingCost, setShippingCost] = useState(0); 
  const [loading, setLoading] = useState(true);


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


  // función para actualizar el costo de envío (en centavos)
  const updateShippingCost = (cost) => {
    setShippingCost(cost * 100);  // Guardamos el costo en centavos
  };

  
  const calculateShippingCost = (total) => {
    const cost = total >= 50 ? 0 : 5.99;
    setShippingCost(cost * 100);  // Almacenar en centavos
  };


  if (loading || authLoading) return null;
  
return (
  <PaymentContext.Provider 
    value={{ 
      paymentMethods, 
      addPaymentMethod, 
      removePaymentMethod, 
      address,
      updateAddress,
      shippingCost,
      updateShippingCost,
      calculateShippingCost
    }}>
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
