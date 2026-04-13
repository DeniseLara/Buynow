import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { loadCartFromFirebase, saveCartToFirebase }  from '../services/cartService'
import { saveUserOrder } from '../services/ordersService'
import { useAuthContext } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);

  // Escuchar cambios de autenticación y cargar carrito solo una vez por usuario
  useEffect(() => {
    if (!authLoading) {
      (async () => {
        if (!user) {
          // Si no hay usuario, buscamos si dejó algo en el navegador (localStorage)
          const localCart = JSON.parse(localStorage.getItem('guest_cart')) || [];
          setCart(localCart);
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
    const timeout = setTimeout(() => {
      if (user?.uid) {
        saveCartToFirebase(user.uid, { items: cart });
      } else {

        // Si es invitado, guardamos en el navegador
        localStorage.setItem('guest_cart', JSON.stringify(cart));
      }
    }, 1000);

    return () => clearTimeout(timeout);
  }, [cart, user]);


  // Agregar un producto al carrito
  const addToCart = (item, quantity = 1) => {
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
      clearCart(); 
      await saveCartToFirebase(user.uid, { items: [] }); 
      return true;
    } catch (error) {
      setErrorMessage("Ocurrió un error al completar la orden. Intenta nuevamente.");
      return false
    }
  };


  // Eliminar un producto del carrito
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };
  

  // Limpiar el carrito
  const clearCart = () => setCart([]);

  const cartItemsCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart])

  if (loading || authLoading) {
    return null;
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartItemsCount,
      addToCart, 
      removeFromCart, 
      clearCart, 
      checkout, 
      errorMessage, 
      loading 
    }}>
      {children}
    </CartContext.Provider>
  );
};
