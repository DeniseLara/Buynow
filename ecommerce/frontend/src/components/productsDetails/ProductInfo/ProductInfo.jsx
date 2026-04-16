import styles from './ProductInfo.module.css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useFavorites } from '../../../context/FavoritesContext';
import { calculateDiscountedPrice, hasValidDiscount } from '../../../utils/priceHelpers';

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

    // Calculamos el precio con descuento
    const discountedPrice = calculateDiscountedPrice(product.price, product.discountPercentage);
    const hasDiscount = hasValidDiscount(product.discountPercentage);

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
            <div className={styles.ratingContainer}>
                <span className={styles.ratingNumber}>{product.rating}</span>
                <div className={styles.rating}>
                    {[...Array(5)].map((_, i) =>
                        i < rating ?(
                            <AiFillStar key={i} color='#111827'/>
                        ) : (
                            <AiOutlineStar key={i} color='#111827'/>
                        )
                    )}
                </div>
                <span className={styles.reviewCount}>
                    ({product.reviews?.length || 0} reviews)
                </span>
            </div>  

            <div className={styles.priceContainer}>
                <span className={styles.currentPrice}>${discountedPrice}</span>
                {hasDiscount && (
                    <>
                        <span className={styles.originalPrice}>${product.price}</span>
                        <span className={styles.discountBadge}>
                            {Math.round(product.discountPercentage)}% OFF
                        </span>
                    </>
                )}
            </div>
        
            <div className={styles.descriptionContainer}>
                <span>Description</span>
                <p className={styles.description}>{product.description}</p>
            </div>
        </section>
    );
}

export default ProductInfo;