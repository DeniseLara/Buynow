function ShippingAddress({ editMode, address, formData, handleChange }) {
  return (
    <section className="profile-section" aria-labelledby="shipping-address-title">
      <h3 id="shipping-address-title">Shipping Address</h3>
        {editMode ? (
          <input
            type="text"
            name="address"
            className="profile-input"
            value={formData.address}
            onChange={handleChange}
            placeholder="Ingresa tu dirección"
          />
          ) : (
            <p>{address || "No especificada"}</p>
          )}
    </section>
  );
}

export default ShippingAddress;
