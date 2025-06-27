import { createContext, useContext, useState, useEffect } from "react";
import { updateUserProfileImage } from '../firebase/firebase'
import { useAuth } from "./AuthContext";

import Perfil from '../assets/profile.png'

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user, userData, loading: authLoading, setUserData } = useAuth();
  const [profileImage, setProfileImage] = useState(Perfil); // Usa la foto predeterminada por defecto
  const [userName, setUserName] = useState(null); 
  const [userEmail, setUserEmail] = useState(null); 

  
useEffect(() => {
  if (authLoading) return;

    if (user && userData) {
      setProfileImage(userData.profileImage || Perfil);
      setUserName(userData.name || "Guest");
      setUserEmail(user.email);      
    } else {
      setProfileImage(Perfil);
      setUserName("Guest");
      setUserEmail(null);
  }

}, [user, userData, authLoading]);


// Función para actualizar la imagen de perfil en Firestore y en el contexto
const updateProfileImage = async (newImageUrl) => {
  if (!user) return;

  try {
    await updateUserProfileImage(user.uid, newImageUrl);
    setProfileImage(newImageUrl); // Actualiza el estado global
    setUserData(prev => ({ ...prev, profileImage: newImageUrl }));
  } catch (error) {
    console.error("Error al actualizar la imagen de perfil:", error);
  }
};


  return (
    <ProfileContext.Provider value={{ profileImage, userName, userEmail, updateProfileImage }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
