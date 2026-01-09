import './ProductDetails.css'
import { useState } from 'react';
import { useLocation } from "react-router-dom";

import BackButton from '../../components/ui/BackButton';
import ProductActions from '../../components/productsDetails/ProductActions/ProductActions';
import RelatedProducts from '../../components/productsDetails/RelatedProducts/RelatedProducts';
import ProductInfo from '../../components/productsDetails/ProductInfo/ProductInfo';

function ProductDetails() {
  const location = useLocation();
  const product = location.state?.product;
  const allProducts = location.state?.allProducts || [];
  const [quantity, setQuantity] = useState(1); 
  
  if (!product) return <p>Producto no encontrado</p>; 
    
  // Filtrar productos de la misma categoría (excepto el actual)
  const relatedProducts = allProducts.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  const handleQuantityChange = (e) => {
  const value = Number(e.target.value);
    setQuantity(!isNaN(value) && value > 0 ? value : 1);
  };
  
  const productImage = product.thumbnail || "https://via.placeholder.com/150";

  return (
    <article className="product-details section">
      <div className="container">
        <BackButton/>

        <div className="product-details-content">
          <figure className="image-container">
            <img 
              src={productImage} 
              alt={`Image of ${product.title}`}
              className='product-image'
            />
          </figure>

          <section className="product-text">
            <ProductInfo product={product}/>

            <ProductActions
              product={product}
              quantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
          </section>
        </div>

        <RelatedProducts relatedProducts={relatedProducts}/>
      </div>
    </article>
 );
};

export default ProductDetails;
