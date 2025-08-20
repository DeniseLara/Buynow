import styles from './RelatedProducts.module.css'
import ProductList from "../../products/ProductList";

function RelatedProducts({ relatedProducts }) {
    return (
        <aside aria-labelledby="related-products-heading">
            <h3 id="related-products-heading" className={styles.title}>
                See more in this category
            </h3>
        
        <div className={styles.section}>
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