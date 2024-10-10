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
            const response = await fetch("http://localhost:3000/items");
            const data = await response?.json();

            console.log("Fetched items:", data);
            set({ items: data });
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    /**
     * Асинхронная функция для добавления нового товара в список.
     */
    const addItem = async (newItem) => {
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

    /**
     * Функция для удаления товара из списка.
     */
    const deleteItem = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/items/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response?.status}`);
            }

            console.log("Deleted item with id:", id);
            set((state) => ({
                items: state.items.filter(item => item.id !== id),
            }));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    return {
        items,
        fetchItems,
        addItem,
        deleteItem,
    };
});

export default useItemsStore;
