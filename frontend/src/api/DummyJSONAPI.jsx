const API_URL = 'https://dummyjson.com/products';

// Función para obtener todos los productos
export const fetchProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    const data = await response.json();
    return data.products; // Acceder a la propiedad 'products' del JSON
  } catch (error) {
    console.error(error);
    return [];
  }
};

// Función para obtener un solo producto por ID
export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
};
