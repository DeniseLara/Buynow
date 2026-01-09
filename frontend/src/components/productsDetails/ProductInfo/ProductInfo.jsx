import styles from './ProductInfo.module.css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from '../../../context/FavoritesContext';

function ProductInfo({ product }) {
    const { removeFromFavorites, addToFavorites, isFavorite } = useFavorites();
    const favorite = isFavorite(product.id);
    const rating = Math.round(product.rating);

    // función para manejar el botón de favoritos
    const handleFavoriteClick = () => {
        favorite 
        ? removeFromFavorites(product.id) 
        : addToFavorites(product);
    };

    return (
        <section aria-labelledby="product-title">
            <div className={styles.headerLine}>
                <p className={styles.category}>{product.category}</p>
                <button 
                    className={styles.button}
                    type='button'
                    onClick={handleFavoriteClick} 
                    aria-label={favorite 
                    ? `Remove ${product.title} from favorites` 
                    : `Add ${product.title} to favorites`
                }>
                {favorite ? (
                    <MdFavorite className={styles.favoriteIconFilled}/>
                ) : (
                    <MdFavoriteBorder />
                )}
                </button>
            </div>
        
        
            <h1 id="product-title">{product.title}</h1>
            <p className={styles.price}>${product.price}</p>
        
            <div className={styles.ratingContainer}>
                <div className={styles.rating}>
                {[...Array(5)].map((_, i) =>
                    i < rating ?(
                        <AiFillStar key={i} color="#facc15" />
                    ) : (
                        <AiOutlineStar key={i} color="#facc15" />
                    )
                )}
                </div>
            </div>   
        
            <p className={styles.description}>{product.description}</p>
        </section>
    );
}

export default ProductInfo;