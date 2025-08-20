import styles from './ShippingAddress.module.css'

function ShippingAddress({ editMode, address, formData, handleChange }) {
  return (
    <section className={styles.container} aria-labelledby="shipping-address-title">
      <h3 id="shipping-address-title">Shipping Address</h3>
        {editMode ? (
          <input
            type="text"
            name="address"
            className={styles.input}
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          ) : (
            <p className={styles.infoText}>{address || "Not specified"}</p>
          )}
    </section>
  );
}

export default ShippingAddress;
