import { createContext, useState, useContext } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen); 
  };

  const setSearchText = (text) => {
    setSearchQuery(text); 
  };

  return (
    <SearchContext.Provider value={{ 
      isSearchOpen, 
      toggleSearch, 
      searchQuery, 
      setSearchText 
    }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
