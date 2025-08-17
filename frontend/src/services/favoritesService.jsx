import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

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