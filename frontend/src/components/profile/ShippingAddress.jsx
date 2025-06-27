function ShippingAddress({ editMode, address, formData, handleChange }) {
  return (
        <div className="profile-section">
          <h3>Shipping Address</h3>
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
        </div>
  );
}

export default ShippingAddress;
