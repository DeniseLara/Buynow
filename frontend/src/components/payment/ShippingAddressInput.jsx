function ShippingAddressInput({ address, onChange, error }) {
  return (
    <div className="shipping-address">
      <label htmlFor="address">Shipping Address</label>
      <input
        type="text"
        id="address"
        value={address}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Ingresa tu dirección de envío"
        className="address-input"
        required
      />
      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}
    </div>
  );
}

export default ShippingAddressInput;