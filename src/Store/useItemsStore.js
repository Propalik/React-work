import { create } from "zustand";

/* Абстрактный стор */
const useItemsStore = create((set) => {
    /**
     * Состояние списка товаров.
     */
    const items = [];
  
    /**
     * Асинхронная функция для получения списка товаров и обновления состояния.
     */
    const fetchItems = async () => {
      try {
        const response = await fetch(`http://localhost:3000/items`);
        const data = await response?.json();
  
        console.log("Fetched items:", data);
        set({ items: data });
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  
    /**
     * Асинхронная функция для добавления нового товара в список.
     * Делает POST-запрос к указанному URL с данными нового товара и обновляет состояние списка товаров.
     * @param {Object} newItem - Объект с данными нового товара.
     * @param {string} newItem.name - Название товара.
     * @param {number} newItem.price - Цена товара.
     */
    const addItem = async newItem => {
      try {
        const response = await fetch("http://localhost:3000/items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        });

        if (!response?.ok) {
          throw new Error(`HTTP error! Status: ${response?.status}`);
        }
        const data = await response.json();
  
        console.log("Added item:", data);

        set((state) => ({
          items: [...state.items, data],
        }));
      } catch (error) {
        console.error("Error adding product:", error);
      }
    };

    return {
        items,
        fetchItems,
        addItem
    }
  });
  
  export default useItemsStore;
