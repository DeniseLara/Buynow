import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Función para cargar el carrito desde Firestore
export const loadCartFromFirebase = async (userId) => {
  const cartRef = doc(db, "users",userId, "cart", "data");
  const cartSnap = await getDoc(cartRef);
  
  if (cartSnap.exists()) {
    return cartSnap.data(); // Devuelve los datos del carrito
  } else {
    return { items: [], total: 0 }; // Si no hay carrito, retorna un carrito vacío
  }
};


// Función para guardar el carrito en Firestore
export const saveCartToFirebase = async (userId, cart) => {
  const cartRef = doc(db, "users", userId, "cart", "data");
  await setDoc(cartRef, cart);
};