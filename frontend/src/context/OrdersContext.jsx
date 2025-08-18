import { createContext, useContext, useEffect, useState } from "react";
import { loadUserOrders, updateOrderStatus, cancelOrder, fetchUserOrdersOnce } from "../services/ordersService";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [cancelingOrders, setCancelingOrders] = useState([]); 
  const { user } = useAuth();
  
  // efecto para escuchar los cambios en las órdenes cuando el usuario cambia
  useEffect(() => {
    if (!user) {
      setOrders([]);
      setLoadingOrders(false);
      return;
    }

    setLoadingOrders(true);

    const unsubscribe = loadUserOrders(user.uid, (orders) => {
      setOrders(orders);
      setLoadingOrders(false);
    });

    return () => unsubscribe(); // Limpiar el listener al desmontar o cambiar usuario

  }, [user]); 


  // Función para cancelar la orden
  const handleCancelOrder = async (orderId) => {
    if (!user) return;
      
    setCancelingOrders((prev) => [...prev, orderId]); // Marcar la orden como en proceso de cancelación

    try {
      await cancelOrder(user.uid, orderId); // Llamar a la función de cancelación en Firebase
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: "canceled" } : order
        )
      );
    } catch (error) {
    } finally {
      setCancelingOrders((prev) => prev.filter((id) => id !== orderId)); // Eliminar de la lista de cancelación
    }
  };


  const changeOrderStatus = async (orderId, newStatus) => {
    if (user) {
      await updateOrderStatus(user.uid, orderId, newStatus);
      // Actualizar el estado local de las órdenes
      setOrders(prevOrders => 
        prevOrders.map(order => 
        order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };
  
  
  const refreshOrders = async () => {
    if (user) {
      const userOrders = await fetchUserOrdersOnce(user.uid);
      setOrders(userOrders);
    }
  };


  return (
    <OrdersContext.Provider value={{ 
      orders, 
      loadingOrders, 
      refreshOrders, 
      changeOrderStatus,
      handleCancelOrder,
      cancelingOrders,
      }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
