import { useState, useEffect } from "react";
import { CATEGORY_MAP } from "../utils/getCategoryIcon";

const API_URL = import.meta.env.VITE_API_URL;

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}?limit=250`);
        const data = await response.json();
        setProducts(data.products);

        const uniqueCategories = new Set(); data.products.forEach(product => {
          for (const group in CATEGORY_MAP) {
            if (CATEGORY_MAP[group].includes(product.category)) {
              uniqueCategories.add(group);
            }
          }
        });

        setCategories(Array.from(uniqueCategories));
      } catch (error) {
        setError('No se pudieron cargar los productos. Intenta nuevamente más tarde.');
      } finally {
        setLoading(false); 
      }
    };
    
    fetchProducts();
  }, []);

  return { products, categories, CATEGORY_MAP, error, loading };
};

