import { createContext, useState, useContext, useEffect } from 'react';
import { loadCartFromFirebase, saveCartToFirebase } from '../firebase/firebase';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const { user,loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Agregar estado de carga

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
      console.error('Error cargando carrito:', error);
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
    }, 1000); // espera 1 segundo antes de guardar

    return () => clearTimeout(timeout); // cancela si cambia antes de tiempo
  }
}, [cart, user]);


// Agregar un producto al carrito
const addToCart = (item, quantity = 1) => {
  if (!user) {
    alert('Debes iniciar sesión para agregar productos al carrito');
    return;
  }

  console.log('Producto agregado al carrito:', item);

  setCart((prevCart) => {
    // Primero, buscamos si el producto ya está en el carrito
    const existingItem = prevCart.find((product) => product.id === item.id);

    if (existingItem) {
      console.log('Producto ya existe en el carrito, cantidad anterior:', existingItem.quantity);

      // Si el producto ya existe, solo incrementamos la cantidad
      return prevCart.map((product) =>
        product.id === item.id 
      ? { ...product, quantity: product.quantity + quantity } // 👈 sumamos la cantidad nueva
      : product
      );
    } else {
      // Si el producto no existe, lo agregamos con cantidad 1
      console.log('Producto no existe en el carrito, agregando al carrito...');
      return [...prevCart, { ...item, quantity }];
    }
  });
};


// Eliminar un producto del carrito
const removeFromCart = (id) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
};
  

// Limpiar el carrito
const clearCart = () => setCart([]);


if (loading || authLoading) {
  return null; // O mostrar un loader si estás cargando el carrito
}

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
