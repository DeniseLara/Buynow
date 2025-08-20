import styles from './ShippingAddressInput.module.css'

function ShippingAddressInput({ address, onChange, error }) {
  return (
    <div className={styles.container}>
      <label htmlFor="address">Shipping Address</label>
      <input
        className={styles.input}
        type="text"
        id="address"
        value={address}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ingresa tu dirección de envío"
        required
      />
      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default ShippingAddressInput;