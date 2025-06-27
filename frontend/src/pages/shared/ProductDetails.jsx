import './ProductDetails.css'
import { useState } from 'react';
import { useLocation } from "react-router-dom";

import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

import BackButton from '../../components/ui/BackButton';
import ProductPurchaseActions from '../../components/productsDetails/ProductPurchaseActions';
import RelatedProducts from '../../components/productsDetails/RelatedProducts';
import ProductInfo from '../../components/productsDetails/ProductInfo';

function ProductDetails() {
  const location = useLocation();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const product = location.state?.product;
  const allProducts = location.state?.allProducts || [];
  const [quantity, setQuantity] = useState(1); 
  

  if (!product) return <p>Producto no encontrado</p>; 
  
  const rating = Math.round(product.rating.rate);
  // Filtrar productos de la misma categoría (excepto el actual)
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const favorite = isFavorite(product.id);

  // función para manejar el botón de favoritos
  const handleFavoriteClick = () => {
    favorite ? removeFromFavorites(product.id) : addToFavorites(product);
  };


  const handleQuantityChange = (e) => {
  const value = parseInt(e.target.value);
    setQuantity(value > 0 ? value : 1);
  };

  return (
      <div className="product-details">
        <BackButton/>

        <div className="product-details-content">
        <div className="image-container">
          <img src={product.image} alt={product.title} className='product-image'/>
        </div>

        <section className="product-text">
          <ProductInfo 
          product={product}
          handleFavoriteClick={handleFavoriteClick}
          isFavorite={favorite}
          rating={rating}
          />

          <ProductPurchaseActions
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          onAddToCart={() => addToCart(product, quantity)}
          productTitle={product.title}
          />
        </section>
        </div>

          <RelatedProducts relatedProducts={relatedProducts}/>
    </div>
 );
};

export default ProductDetails;
