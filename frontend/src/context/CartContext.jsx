import { createContext, useState, useContext, useEffect } from 'react';
import { loadCartFromFirebase, saveCartToFirebase }  from '../services/cartService'
import { saveUserOrder } from '../services/ordersService'
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user,loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);

  // Escuchar cambios de autenticación y cargar carrito solo una vez por usuario
  useEffect(() => {
    if (!authLoading) {
      (async () => {
        if (!user) {
          setCart([]);
          setLoading(false);
          return;
      }

    try {
      const cartData = await loadCartFromFirebase(user.uid);
      setCart(cartData?.items || []);
    } catch (error) {
      setCart([]);
    } finally {
      setLoading(false); // Solo se llama una vez se completan los intentos
    }
      })();
    }     
  }, [user, authLoading]);


  // Guardar el carrito en Firebase solo cuando cambia
  useEffect(() => {
    if (user?.uid) {
      const timeout = setTimeout(() => {
      saveCartToFirebase(user.uid, { items: cart });
    }, 1000); 

      return () => clearTimeout(timeout); // cancela si cambia antes de tiempo
    }
  }, [cart, user]);


  // Agregar un producto al carrito
  const addToCart = (item, quantity = 1) => {
    if (!user) {
      alert('Debes iniciar sesión para agregar productos al carrito');
      return;
    }

    setCart((prevCart) => {
    // buscamos si el producto ya está en el carrito
    const existingItem = prevCart.find((product) => product.id === item.id);

    if (existingItem) {
      // Si el producto ya existe, solo incrementamos la cantidad
      return prevCart.map((product) =>
        product.id === item.id 
      ? { ...product, quantity: product.quantity + quantity } // sumamos la cantidad nueva
      : product
      );
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      return [...prevCart, { ...item, quantity }];
      }
    });
  };


  const checkout = async (setShowPaymentForm, setShowSuccessModal) => {
    if (!user) {
      alert("Debes iniciar sesión para finalizar la compra");
      return;
    }

    try {
      await saveUserOrder(user.uid, cart); 
      clearCart(); // Limpia el estado local
      await saveCartToFirebase(user.uid, { items: [] }); // Limpia el carrito en Firebase
      setShowPaymentForm(false);
      setShowSuccessModal(true);
    } catch (error) {
      setErrorMessage("Ocurrió un error al completar la orden. Intenta nuevamente.");
    }
  };


  // Eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  

  // Limpiar el carrito
  const clearCart = () => setCart([]);


  if (loading || authLoading) {
    return null;
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, checkout, errorMessage }}>
      {children}
    </CartContext.Provider>
  );
};
