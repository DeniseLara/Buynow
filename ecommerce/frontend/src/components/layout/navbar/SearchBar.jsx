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
      <button 
        type='button'
        onClick={toggleSearch} 
        className="icon-link"
        aria-label={isSearchOpen ? "Close search" : "Open search"}
        aria-expanded={isSearchOpen}
        aria-controls="search-input"
      >
        <BiSearch aria-hidden="true"/>
      </button>

      {isSearchOpen && (
        <form className="search-container" role="search" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="search" 
            name="search"
            placeholder="Search products..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={handleKeyDown}
            aria-describedby="search-description"
          />
          <button
            type='button'
            className="close-search"
            aria-label="close search"
            onClick={toggleSearch}
          >
            <IoCloseOutline aria-hidden="true"/>
          </button>
        </form>
      )}
    </div>
  );
}

export default SearchBar;