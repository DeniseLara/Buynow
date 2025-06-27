import ProductList from "../products/ProductList";

function RelatedProducts({ relatedProducts }) {
    return (
    <>
        <h3 className='related-products-title'>See more in this category</h3>
            {relatedProducts.length > 0 && (
        <div className="related-products-section">
            <ProductList products={relatedProducts} />
        </div>
        )}
    </>
    );
}

export default RelatedProducts;