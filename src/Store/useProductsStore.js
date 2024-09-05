import { create } from "zustand";
import { initialProducts } from "../../data.js";

/**
 * Стор для управления продуктами и состоянием сохраненных продуктов.
 */
const useProductsStore = create((set) => {
  // Загрузка избранных продуктов из localStorage.
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

  // Инициализация продуктов с учетом сохраненных состояний
  const products = initialProducts?.map((product) => ({
    ...product,
    isFavorite: storedFavorites?.includes(product?.id),
  }));

  /**
    Находит продукт по id.
    @param {string} id - id продукта.
    @returns {Object|null} Возвращает найденный продукт или null.
    */
  const getProductById = id => products?.find(product => product?.id === id) || null;

  /**
   * Переключает состояние сохраненного продукта по id.
   * @param {string} id - id продукта.
   */
  const setFavorite = (id) => {
    // Обновляем продукты на странице, переключая состояние сохраненного продукта
    const updatedProducts = products?.map((product) => {
      if (product?.id === id) {
        product.isFavorite = !product?.isFavorite;
      }
      return product;
    });

    // Обновляем id сохраненок для записи в localStorage
    const updatedFavorites = updatedProducts
      ?.filter(product => product?.isFavorite)
      ?.map(product => product?.id);

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

    // Обновляем состояние.
    set({ products: updatedProducts });
  }

  /**
   * Получает все сохраненные продукты.
   * @returns {Array} Массив всех сохраненных продуктов.
   */
  const getFavoriteProducts = () => products?.filter(product => product?.isFavorite);

  return {
    products,
    getProductById,
    setFavorite,
    getFavoriteProducts,
  };
});

export default useProductsStore;
