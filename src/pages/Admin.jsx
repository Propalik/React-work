import useForm from "../hooks/useForm";
import { useState } from "react";
import { Drawer } from "../components/ui/Drawer/Drawer";

// Данные карточек (продукты)
const initialProducts = [
  {
    id: "1",
    name: "Armchair",
    category: "Chair",
    rating: "4.9",
    price: "50.2",
    imgSrc:
      "https://avatars.mds.yandex.net/i?id=88bc31f0ae4d3097171b881b7a0c760f_l-5298752-images-thumbs&n=13",
  },
  {
    id: "2",
    name: "Bed",
    category: "Bed",
    rating: "3.0",
    price: "102.10",
    imgSrc:
      "https://www.pngitem.com/pimgs/m/85-852092_bed-transparent-background-black-queen-beds-ikea-hd.png",
  },
  {
    id: "3",
    name: "Bench",
    category: "Bench",
    rating: "4.9",
    price: "15",
    imgSrc:
      "https://moneystrategy.ru/wp-content/uploads/c/7/c/c7c3ca90b0e2923f1ca6673ac477ff88.jpeg",
  },
];

function Admin() {
  // Стейт для продуктов/новых продуктов
  const [products, setProducts] = useState(initialProducts);

  console.log(products);

  // Стейт для скрытия/показа компонента Drawer
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  /**
   * Функция для добавления нового продукта в список.
   *
   * @param {Object} newProduct - Данные нового продукта.
   * @param {string} newProduct.name - Название нового продукта.
   * @param {string} newProduct.description - Категория нового продукта.
   */
  const setNewProduct = ({ name, description }) => {
    const newProduct = {
      id: crypto.randomUUID(),
      name,
      description,
    };

    setProducts((initialProducts) => [...initialProducts, newProduct]);
  };

  // Использование кастомного хука для обработки данных
  const { formData, handleSubmit, handleInputChange } = useForm(
    {
      name: "",
      description: "",
    },
    setNewProduct
  );

  return (
    <section className="admin">
      <div className="max-w-7xl mx-auto px-2">
        <h2 className="mb-4 text-4xl font-bold text-zinc-800">
          Добавить новый товар
        </h2>

        <button onClick={() => setDrawerOpen(true)}>Add new product</button>

        {isDrawerOpen && (
          <Drawer
            isOpen={isDrawerOpen}
            onClose={() => setDrawerOpen(false)}
            title="Обработка формы"
          >
            <div className="w-full max-w-xs">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="taskName"
                  >
                    Название товара
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                    type="text"
                    value={formData?.name}
                    onInput={handleInputChange}
                    placeholder="Введите название"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="taskName"
                  >
                    Описание товара
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="description"
                    type="text"
                    value={formData?.description}
                    onInput={handleInputChange}
                    placeholder="Введите описание"
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Add Task
                </button>
              </form>
            </div>
          </Drawer>
        )}
      </div>
    </section>
  );
}

export default Admin;
