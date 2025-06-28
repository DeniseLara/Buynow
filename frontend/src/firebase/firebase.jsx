import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { setDoc, doc, getFirestore, collection, addDoc, getDoc, serverTimestamp, updateDoc, query, getDocs, orderBy, limit, onSnapshot } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Agregar esta línea
const storage = getStorage(app); // Inicializar Firebase Storage


// Función para registrar un nuevo usuario con email y contraseña
export const registerUser = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

  // Guardar datos adicionales en Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    email: user.email,
    address: "",
    paymentMethods: [],
  });

    return user; // El objeto del usuario registrado
  } catch (error) {
    console.error("Error al registrar usuario:", error.message);
    return null;
  }
};


// Función para iniciar sesión con email y contraseña
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // El objeto del usuario logueado
  } catch (error) {
    console.error("Error al iniciar sesión:", error.code);
    throw error; 
  }
};


// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("Usuario desconectado");
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
  }
};


// Función para obtener el usuario actual
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      resolve(user); // Devuelve el usuario autenticado (si existe)
    }, reject);
        
    return unsubscribe;
  });
};


// Función para obtener el ID del usuario actual
export const getCurrentUserId = async () => {
  const user = await getCurrentUser();
  return user ? user.uid : null;
};

  
export const getUserProfile = async (userId) => {
  const userDoc = await getDoc(doc(db, "users", userId));
  if (userDoc.exists()) {
    return userDoc.data(); // Devuelve {name, email, ...}
  } else {
    return null;
  }
};


export const updateUserProfileImage = async (userId, newImageUrl) => {
  await updateDoc(doc(db, "users", userId), { profileImage: newImageUrl });
};


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
      console.error("Error al escuchar órdenes:", error);
      callback([]); // Opcional: enviar array vacío en error
    }
  );
};
  

// Guardar órdenes del usuario como una lista plana de productos
export const saveUserOrder = async (userId, newItems, status = "processing") => {
  const ordersCollection = collection(db, "users", userId, "orders"); // plural "orders"

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
    console.log("Orden cancelada con éxito");
  } catch (error) {
    console.error("Error al cancelar la orden:", error);
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


// Obtener favoritos desde Firestore
export const getFavoritesFromFirestore = async (userId) => {
  const favRef = doc(db, "users", userId, "favorite", "data");
  const favSnap = await getDoc(favRef);
  return favSnap.exists() ? favSnap.data().items || [] : [];
};

  
// Guardar favoritos en Firestore
export const saveFavoritesToFirestore = async (userId, items) => {
  const favRef = doc(db, "users", userId, "favorite", "data");
  await setDoc(favRef, {items});
};


export const updateUserData = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};


export { auth, db, storage };