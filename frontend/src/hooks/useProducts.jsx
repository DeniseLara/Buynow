import { useState, useEffect } from "react";

const CATEGORY_MAP = {
  Women: [
    "womens-dresses",
    "womens-shoes",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "tops"
  ],
  Men: [
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
  ],
  Fragrances: ["fragrances"],
  Skincare: ["skincare"],
  Electronics: ["smartphones", "laptops"],
  Home: ["home-decoration", "furniture"],
  Groceries: ["groceries"],
  Accessories: ["sunglasses"]
};


export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=250");
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
        setLoading(false); // 👈 asegurarse de apagar loading siempre
      }
    };
    
    fetchProducts();
  }, []);

  return { products, categories, CATEGORY_MAP, error, loading };
};

