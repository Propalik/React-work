import { create } from "zustand";

const useProductsStore = create((set) => {
  let products;

  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const getProducts = async () => {
    if (products) return; // Prevent fetching if products are already loaded

    try {
      const response = await fetch("http://localhost:3000/products/");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      products = data.map((product) => ({
        ...product,
        isFavorite: storedFavorites.includes(product.id),
      }));

      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
      // Optionally, handle the error in the UI
    }
  };

  const getProductById = (id) => products?.find(product => product.id === id) || null;

  const setFavorite = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        product.isFavorite = !product.isFavorite;
      }
      return product;
    });

    const updatedFavorites = updatedProducts
      .filter(product => product.isFavorite)
      .map(product => product.id);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    set({ products: updatedProducts });
  };

  const getFavoriteProducts = () => products?.filter(product => product.isFavorite) || [];

  return {
    products,
    getProducts,
    getProductById,
    setFavorite,
    getFavoriteProducts,
  };
});

export default useProductsStore;
