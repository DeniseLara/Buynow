import './FavoritesPage.css'
import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "../../components/products/ProductCard";

function FavoritesPage() {
  const { favorites } = useFavorites();
 
  return (
      <div className="favorites-page">
        <h1 className="favorites-title">My Wishlist</h1>
  
        {favorites.length === 0 ? (
          <p>No tienes productos guardados en favoritos.</p>
        ) : (
          <div className="favorites-grid">
            {favorites.map((product) => (

              <ProductCard key={product.id} product={product} isFavoriteCard={true}/>
              
            ))}
          </div>
        )}
      </div>
    );
  };
  
export default FavoritesPage;
  
