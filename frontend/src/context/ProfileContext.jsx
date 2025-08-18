import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { user, userData, loading: authLoading, setUserData } = useAuth();
  const [userName, setUserName] = useState(null); 
  const [userEmail, setUserEmail] = useState(null); 

  
  useEffect(() => {
    if (authLoading) return;

    if (user && userData) {
      setUserName(userData.name || "Guest");
      setUserEmail(user.email);      
    } else {
      setUserName("Guest");
      setUserEmail(null);
    }
  }, [user, userData, authLoading]);


  return (
    <ProfileContext.Provider value={{ userName, userEmail }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
