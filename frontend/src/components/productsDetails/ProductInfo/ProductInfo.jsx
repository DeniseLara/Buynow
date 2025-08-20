import styles from './ProductInfo.module.css'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function ProductInfo({ product, handleFavoriteClick, isFavorite, rating }) {
    return (
        <section aria-labelledby="product-title">
            <div className={styles.headerLine}>
                <p className={styles.category}>{product.category}</p>
                <button 
                    className={styles.button}
                    type='button'
                    onClick={handleFavoriteClick} 
                    aria-label={isFavorite 
                    ? `Remove ${product.title} from favorites` 
                    : `Add ${product.title} to favorites`
                }>
                {isFavorite ? (
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