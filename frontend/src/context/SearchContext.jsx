import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

// Crea el Provider para envolver la app
export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Estado de apertura/cierre del buscador
  const [searchQuery, setSearchQuery] = useState(''); // Estado para el texto de búsqueda

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); // Alterna la visibilidad del buscador
  };

  const setSearchText = (text) => {
    setSearchQuery(text); // Actualiza el texto de búsqueda
  };

  return (
    <SearchContext.Provider value={{ isSearchOpen, toggleSearch, searchQuery, setSearchText }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook para usar el contexto en cualquier componente
export const useSearch = () => useContext(SearchContext);
