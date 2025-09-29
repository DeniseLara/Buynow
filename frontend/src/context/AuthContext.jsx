import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { getUserProfile, registerUser, loginUser, logoutUser } from '../services/authService'
import { auth } from "../services/firebaseConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      
  const [userData, setUserData] = useState(null); 
  const [loading, setLoading] = useState(true); 

  const userName = userData?.name || "Guest";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userId) => {
      setLoading(true); // Establece loading como true cuando se cambia de usuario

      if (userId) {
        setUser(userId);
      
        try {
          const profile = await getUserProfile(userId.uid); // Obtiene los datos del perfil
          setUserData(profile);
        } catch (error) {
          setUserData(null);
        }
      } else {
        setUser(null); 
        setUserData(null); 
      }
      setLoading(false);  
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []); 


  // Función para registrar usuario
  const signup = async (email, password, name) => {
    const newUser = await registerUser(email, password, name);
      if (newUser) {
        const profile = await getUserProfile(newUser.uid);
        setUser(newUser);
        setUserData(profile);
      }
    return newUser;
  };


  // Función para login
  const login = async (email, password) => {
    const loggedUser = await loginUser(email, password);
      if (loggedUser) {
        const profile = await getUserProfile(loggedUser.uid);
        setUser(loggedUser);
        setUserData(profile);
      }
    return loggedUser;
  };

  
  // Función para logout
  const logout = async () => {
    await logoutUser();
    setUser(null);
    setUserData(null);
  };

  
  return (
    <AuthContext.Provider value={{ 
      user, 
      userData,
      userName, 
      loading, 
      setUserData,
      signup,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
