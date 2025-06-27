import { useState } from 'react';
import { BiSearch } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../../context/SearchContext';

function SearchBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { searchQuery, setSearchText } = useSearch();
  const navigate = useNavigate();

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      navigate('/products');
      setIsSearchOpen(false);
    }
  };

  return (
    <div className="icon-wrapper">
        <span onClick={toggleSearch} className="icon-link">
            <BiSearch />
        </span>
        {isSearchOpen && (
    <div className="search-container">
        <input 
            type="text" 
            name="search bar"
            placeholder="Buscar productos..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
        />
            <IoCloseOutline className="close-search" onClick={toggleSearch} />
    </div>
    )}
    </div>
  );
}

export default SearchBar;