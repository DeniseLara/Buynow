import { useState, useEffect } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((p) => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    fetchProducts();
  }, []);

  return { products, categories };
};

