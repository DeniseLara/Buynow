import { createContext, useContext, useEffect, useState } from 'react';
import { getFavoritesFromFirestore, saveFavoritesToFirestore } from '../firebase/firebase';
import { useAuth } from './AuthContext';

const FavoritesContext = createContext();
export const useFavorites = () => useContext(FavoritesContext);


export const FavoritesProvider = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

// Cargar favoritos al iniciar sesión
useEffect(() => {
  if (authLoading) return;
  
  (async () => {
    if (user) { 
      try {
        const items = await getFavoritesFromFirestore(user.uid);
        setFavorites(items);
      } catch (error) {
        setFavorites([]);
        }
      } else {
        const localFavs = localStorage.getItem('favorites');
        setFavorites(localFavs ? JSON.parse(localFavs) : []);
      }
      setLoading(false);
  })();

}, [user, authLoading]);


useEffect(() => {
  if (loading || authLoading) return;

  const timeout = setTimeout(() => {
    if (user?.uid){
      saveFavoritesToFirestore(user.uid, favorites)
      .catch(() => {
    });
  } else {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }, 1000); 

    return () => clearTimeout(timeout);
}, [favorites, user, loading, authLoading]);
  

const addToFavorites = (item) => {
  setFavorites((prev) => {
    if (prev.some((fav) => fav.id === item.id)) return prev;
      return [...prev, item];
  });
};


const removeFromFavorites = (id) => {
  setFavorites((prev) => prev.filter((item) => item.id !== id));
};

const isFavorite = (id) => favorites.some((item) => item.id === id);


if (loading || authLoading) return null;

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
