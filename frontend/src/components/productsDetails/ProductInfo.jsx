import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function ProductInfo({ product, handleFavoriteClick, isFavorite, rating }) {
    return (
        <article>
            <div className="product-line">
                <p className='product-category'>{product.category}</p>
                <button 
                 className='product-save-btn'
                 type='button'
                 onClick={handleFavoriteClick} 
                 aria-label={isFavorite 
                 ? `Remove ${product.title} from favorites` 
                 : `Add ${product.title} to favorites`
                }>
                    {isFavorite ? (
                        <MdFavorite className="favorite-icon-filled" />
                    ) : (
                        <MdFavoriteBorder />
                    )}
                </button>
                </div>
        
        
            <h2>{product.title}</h2>
                <p className='product-price'>${product.price}</p>
        
            <div className="rating">
                <div className="rate">
                {[...Array(5)].map((_, i) =>
                    i < rating ?(
                        <AiFillStar key={i} color="#facc15" />
                    ) : (
                        <AiOutlineStar key={i} color="#facc15" />
                    )
                )}
                </div>
                <span className="rating-count">{product.rating.count} reviews</span>
            </div>   
        
            <p className='product-description'>{product.description}</p>
        </article>
    );
}

export default ProductInfo;