import { createContext, useContext, useState } from 'react';

const PaymentModalContext = createContext();

export const usePaymentModal = () => useContext(PaymentModalContext);

export const PaymentModalProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPaymentModal = () => setIsModalOpen(true);
  const closePaymentModal = () => setIsModalOpen(false);

  return (
    <PaymentModalContext.Provider value={{ isModalOpen, openPaymentModal, closePaymentModal }}>
      {children}
    </PaymentModalContext.Provider>
  );
};
