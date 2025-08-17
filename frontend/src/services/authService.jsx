import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { setDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

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
    throw new Error('Error al registrar usuario: ' + (error.message || 'Error desconocido'));
  }
};


// Función para iniciar sesión con email y contraseña
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user; // El objeto del usuario logueado
  } catch (error) {
    throw new Error('Error al iniciar sesión: ' + (error.message || 'Error desconocido'));
  }
};


// Función para cerrar sesión
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    throw new Error('Error al cerrar sesión: ' + (error.message || 'Error desconocido'));
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


export const updateUserData = async (uid, data) => {
  await setDoc(doc(db, "users", uid), data, { merge: true });
};