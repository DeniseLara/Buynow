import './FavoritesPage.css'
import { useFavorites } from "../../context/FavoritesContext";
import ProductCard from "../../components/products/ProductCard";

function FavoritesPage() {
  const { favorites } = useFavorites();
 
  return (
      <section className="favorites-page" aria-labelledby="favorites-heading">
        <header className="favorites-header">
          <h1  id="favorites-heading" className="favorites-title">My Wishlist</h1>
        </header>

        {favorites.length === 0 ? (
          <p>You don’t have any products saved in your wishlist.</p>
        ) : (
          <ul className="favorites-grid">
            {favorites.map((product) => (
              <li key={product.id} role="listitem">
                <ProductCard product={product} isFavoriteCard={true}/>
              </li>
            ))}
          </ul>
        )}
      </section>
    );
  };
  
export default FavoritesPage;
  
