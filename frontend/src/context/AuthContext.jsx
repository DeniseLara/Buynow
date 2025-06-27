import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, getUserProfile, registerUser, loginUser, logoutUser } from '../firebase/firebase'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // usuario autenticado
  const [userData, setUserData] = useState(null); // datos extras (name, address, etc)
  const [loading, setLoading] = useState(true); // para saber cuándo ya terminó la carga inicial

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (userId) => {
    setLoading(true); // Establece loading como true cuando se cambia de usuario
    if (userId) {
      setUser(userId);
      
      try {
        const profile = await getUserProfile(userId.uid); // Obtiene los datos del perfil
        setUserData(profile);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setUserData(null);
        }
      } else {
        setUser(null); // Si no hay usuario, limpiar el estado de usuario
        setUserData(null); // Limpiar también los datos del usuario
      }
      setLoading(false);  // Termina de cargar después de que se actualizan los datos
    });

  return () => unsubscribe(); // Limpia el listener al desmontar
}, []); // Solo se ejecuta una vez cuando el componente se monta


// Función para registrar usuario (con nombre, dirección y tarjetas si quieres)
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

// Custom hook para acceder al contexto fácilmente
export const useAuth = () => useContext(AuthContext);
