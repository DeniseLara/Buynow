import { createContext, useState, useContext, useEffect, useMemo } from 'react';
import { loadCartFromFirebase, saveCartToFirebase }  from '../services/cartService'
import { useAuthContext } from './AuthContext';
import { saveUserOrder } from '../services/ordersService';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuthContext();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(null);

  // función para calular el total a pagar
  const totals = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 || subtotal === 0 ? 0 : 5.99;
    return {
      subtotal: Number(subtotal.toFixed(2)), 
      shipping: Number(shipping.toFixed(2)),
      total: Number((subtotal + shipping).toFixed(2))
    };
  }, [cart]);

  // Escuchar cambios de autenticación y cargar carrito solo una vez por usuario
  useEffect(() => {
    if (!authLoading) {
      (async () => {
        if (!user) {
          // Si no hay usuario, buscamos si dejó algo en el navegador 
          const localCart = JSON.parse(localStorage.getItem('guest_cart')) || [];
          setCart(localCart);
          setLoading(false);
          return;
    }

    try {
      const cartData = await loadCartFromFirebase(user.uid);
      console.log("Datos de Firebase:", cartData);
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
    if (loading) return;
    
    const timeout = setTimeout(() => {
      if (user?.uid) {
        saveCartToFirebase(user.uid, { items: cart });
      } else {

        // Si el usuario no está logueado/registrado, guardamos el carrito en el navegador
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

  const checkout = async () => {
    if (!user) {
      alert("Debes iniciar sesión para finalizar la compra");
      return;
    }

    try {
      // Creamos la orden en Firestore antes de borrar el carrito
      const orderId = await saveUserOrder(
        user.uid, 
        cart,           // Los productos actuales
        totals,         // El objeto {subtotal, total, shipping}
        "processing"    // Estado inicial
      );

      // limpiamos el carrito en local y en Firebase
      clearCart(); 
      await saveCartToFirebase(user.uid, { items: [] }); 
      return true;
    } catch (error) {
      console.error(error);
      setErrorMessage("Ocurrió un error al completar la orden.");
      return false;
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
  

  return (
    <CartContext.Provider value={{ 
      cart, 
      cartItemsCount,
      totals,
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
