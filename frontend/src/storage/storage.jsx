import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { getFirestore, doc, setDoc, updateDoc } from "firebase/firestore";
import imageCompression from 'browser-image-compression';
import Perfil from '../assets/perfil.png'

// Función para subir imagen de perfil
export const uploadProfileImage = async (file, userUid) => {
  // Validar que el archivo sea imagen
  if (!file.type.startsWith("image/")) {
    return Promise.reject(new Error("Solo se permiten archivos de imagen."));
  }

  // Validar tamaño máximo antes de subir
  const maxSizeInBytes = 3 * 1024 * 1024; // 3 MB
  
  // Opciones para comprimir
  const options = {
    maxSizeMB: 1, // intenta dejarla en 1MB
    maxWidthOrHeight: 800, // redimensiona si es más grande
    useWebWorker: true,
  };

  try {
    // Comprimir imagen
    const compressedFile = await imageCompression(file, options);

    if (compressedFile.size > maxSizeInBytes) {
      return Promise.reject(new Error("La imagen sigue siendo muy grande incluso después de comprimirla. Máximo 3MB."));
    }

  const storage = getStorage();
  const storageRef = ref(storage, `profile-images/${userUid}`);
  const uploadTask = uploadBytesResumable(storageRef, compressedFile);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            const db = getFirestore();
            const userRef = doc(db, "users", userUid);

            updateDoc(userRef, { profileImage: downloadURL })
              .then(() => resolve(downloadURL))  // Resolvemos con la URL
              .catch((error) => reject(error));
          })
          .catch((error) => reject(error));
      }
    );
  });
    } catch (error) {
    return Promise.reject(error);
  }
};


// Función para eliminar la imagen de perfil
export const removeProfileImage = async (userUid) => {
    const storage = getStorage();
    const storageRef = ref(storage, `profile-images/${userUid}`); // Obtener la referencia de la imagen
  
    try {
      // Primero, elimina la imagen de Firebase Storage
      await deleteObject(storageRef);
      
      // Luego, elimina la URL de la imagen de Firestore
      const db = getFirestore();
      const userRef = doc(db, "users", userUid);

      await updateDoc(userRef, { profileImage: Perfil }); // Establece la imagen predeterminada en Firestore
      
      console.log("Imagen eliminada correctamente.");
    } catch (error) {
      console.error("Error al eliminar la imagen de perfil:", error);
    }
  };
