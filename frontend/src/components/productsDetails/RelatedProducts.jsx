import ProductList from "../products/ProductList";

function RelatedProducts({ relatedProducts }) {
    return (
        <aside aria-labelledby="related-products-heading">
            <h3 id="related-products-heading" className='related-products-title'>
                See more in this category
            </h3>
        
        <div className="related-products-section">
            {relatedProducts.length > 0 ? (
                <ProductList products={relatedProducts} />
            ) : (
                <p>No related products found.</p>
            )}
        </div>
        </aside>
    );
}

export default RelatedProducts;