import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

function ProductInfo({ product, handleFavoriteClick, isFavorite, rating }) {
    return (
        <section aria-labelledby="product-title">
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
        
        
            <h1 id="product-title">{product.title}</h1>
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
            </div>   
        
            <p className='product-description'>{product.description}</p>
        </section>
    );
}

export default ProductInfo;