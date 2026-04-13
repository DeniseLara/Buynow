import { createContext, useContext } from "react";
import { useUserProfile } from "../hooks/useUserProfile";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const profile = useUserProfile();
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
