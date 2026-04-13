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
export const saveUserOrder = async (userId, newItems, totals, status = "processing") => {
  const ordersCollection = collection(db, "users", userId, "orders"); 

  // Usamos los totales que ya vienen calculados del contexto para evitar discrepancias
  const docRef = await addDoc(ordersCollection, {
    items: newItems,
    date: Date.now(),
    createdAt: serverTimestamp(),
    subtotal: totals.subtotal,
    totalPaid: totals.total, 
    status // Lo guardamos como "pending" inicialmente
  });

  return docRef.id; // <--- ESTO ES VITAL: Retornar el ID del nuevo documento
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
