import { 
  doc, 
  collection, 
  addDoc, 
  serverTimestamp, 
  updateDoc, 
  query, 
  getDocs, 
  orderBy, 
  limit, 
  onSnapshot 
} from "firebase/firestore";
import { db } from "./firebaseConfig";

// Función para cargar las órdenes del usuario desde Firestore en tiempo real
export const loadUserOrders = (userId, callback) => {
  const ordersCollection = collection(db, "users", userId, "orders");
  
  const ordersQuery = query(
    ordersCollection,
    orderBy("createdAt", "desc"),
    limit(20)
  );

  // Retornamos el unsubscribe para poder limpiar luego
  return onSnapshot(
    ordersQuery,
    (querySnapshot) => {
      const orders = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(orders); // Llamamos el callback con los datos actualizados
    },
    (error) => {
      callback([]); 
    }
  );
};


// Guardar órdenes del usuario como una lista plana de productos
export const saveUserOrder = async (userId, newItems, status = "processing") => {
  const ordersCollection = collection(db, "users", userId, "orders"); 

  // Calcular el total de la orden (precio de los productos + costo de envío)
  const calculateTotal = (items) => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };
  
  const subtotal = calculateTotal(newItems); // Calcular el subtotal
  const shippingCost =  subtotal >= 50 ? 0 : 5.99;
  const totalPaid = subtotal + shippingCost; // Calcular el total final con el costo de envío


  await addDoc(ordersCollection, {
    items: newItems,
    date: Date.now(),
    createdAt: serverTimestamp(),
    subtotal,
    totalPaid, 
    status
  });
};


// Función para cancelar la orden
export const cancelOrder = async (userId, orderId) => {
  const orderRef = doc(db, "users", userId, "orders", orderId);

  try {
    await updateDoc(orderRef, {
      status: "canceled", // Cambia el estado a "canceled"
      canceledAt: serverTimestamp(), // Guarda la fecha de cancelación
    });
  } catch (_) {
    throw new Error("Error al cancelar la orden");
  }
};


export const fetchUserOrdersOnce = async (userId) => {
  const ordersCollection = collection(db, "users", userId, "orders");
  const ordersQuery = query(ordersCollection, orderBy("createdAt", "desc"), limit(20));
  const snapshot = await getDocs(ordersQuery);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};


// Función para actualizar el estado de la orden
export const updateOrderStatus = async (userId, orderId, newStatus) => {
  const orderRef = doc(db, "users", userId, "orders", orderId);

  // Actualizar el estado en Firestore
  await updateDoc(orderRef, {
    status: newStatus,
    updatedAt: serverTimestamp(),
  });
};
