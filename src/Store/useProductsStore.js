import { create } from "zustand";

const useProductsStore = create((set) => {
  let products = []; // Инициализируем products как пустой массив
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const storedCart = JSON.parse(localStorage.getItem("cart")) || []; // Получаем данные корзины из localStorage

  const getProducts = async () => {
    if (products.length) return; // Предотвращаем повторную загрузку, если продукты уже загружены

    try {
      const response = await fetch("http://localhost:3000/products/");
      if (!response.ok) throw new Error("Failed to fetch products");

      const data = await response.json();
      products = data.map((product) => ({
        ...product,
        isFavorite: storedFavorites.includes(product.id),
        cartQuantity: storedCart.find(item => item.id === product.id)?.cartQuantity || 0 // Загружаем количество из корзины
      }));

      set({ products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addToCart = (id, quantity) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        product.cartQuantity += quantity; // Добавляем количество в корзину
      }
      return product;
    });
    set({ products: updatedProducts });
    localStorage.setItem("cart", JSON.stringify(updatedProducts)); // Сохраняем корзину в localStorage
  };

  const removeFromCart = (id) => {
    const updatedProducts = products.map((product) => {
      if (product.id === id) {
        product.cartQuantity = 0; // Обнуляем количество при удалении из корзины
      }
      return product;
    });
    set({ products: updatedProducts });
    localStorage.setItem("cart", JSON.stringify(updatedProducts)); // Обновляем данные корзины в localStorage
  };

  const clearCart = () => {
    const updatedProducts = products.map((product) => {
      product.cartQuantity = 0; // Обнуляем все количества
      return product;
    });
    set({ products: updatedProducts });
    localStorage.setItem("cart", JSON.stringify(updatedProducts)); // Обновляем данные корзины в localStorage
  };

  const getCartProducts = () => products.filter(product => product.cartQuantity > 0); // Получаем товары в корзине

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
    addToCart,
    removeFromCart,
    clearCart,
    getCartProducts // Добавлено
  };
});

export default useProductsStore;
