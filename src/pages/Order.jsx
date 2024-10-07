import useProductsStore from "../Store/useProductsStore"; // Хук для работы с состоянием продуктов
import { Link } from "react-router-dom"; // Хук для навигации
import Alert from "../components/ui/Alert/Alert"; // Компонент для отображения уведомлений
import { useState } from "react";

const Order = () => {
  const { getCartProducts, removeFromCart } = useProductsStore(); // Получаем товары из корзины и функцию удаления
  const cartProducts = getCartProducts(); // Получаем список товаров в корзине
  const [alert, setAlert] = useState({ isOpen: false, title: "", message: "", variant: "" });

  const totalPrice = cartProducts.reduce((total, product) => total + (product.price * (product.cartQuantity || 1)), 0).toFixed(2);

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
    setAlert({ isOpen: true, title: "Товар удалён", message: "Товар успешно удалён из корзины.", variant: "success" });
  };

  return (
    <section className="cart container mx-auto px-6 py-8 bg-gray-200 rounded-lg shadow-lg">
      <h3 className="mb-6 text-center text-3xl font-semibold text-gray-800">
        {cartProducts.length ? "Товары в корзине" : "Ваша корзина пуста."}
      </h3>

      {cartProducts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {cartProducts.map((product) => (
              <div key={product.id} className="relative border rounded-lg bg-gray-100 shadow-md hover:shadow-lg transition-shadow duration-300">
                <Link to={`/cards/${product.id}`}>
                  <img className="h-48 w-full object-cover rounded-t-lg" src={product.imgSrc} alt={product.name} />
                </Link>

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h2>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <p className="text-lg font-semibold text-gray-800 mb-1">
                    Количество: <span className="text-gray-600">{product.cartQuantity || 1}</span>
                  </p>
                  <p className="text-lg font-semibold text-gray-800 mb-4">
                    Цена: ${(product.price * (product.cartQuantity || 1)).toFixed(2)}
                  </p>

                  {/* Кнопка для удаления товара из корзины */}
                  <button
                    className="w-full py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition-colors"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    Удалить из корзины
                  </button>
                </div>

                {/* Иконка для просмотра детальной информации */}
                <div className="absolute top-2 right-2 z-10">
                  <Link to={`/cards/${product.id}`} className="text-indigo-500 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Блок общей стоимости */}
          <div className="mt-8 p-4 rounded-md shadow-md bg-gray-100 flex justify-between items-center">
            <h4 className="text-2xl font-bold text-gray-800">Общая стоимость: ${totalPrice}</h4>
            <Link to="/" className="inline-flex items-center justify-center px-6 py-2 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 transition duration-200 ease-in-out">
              Вернуться на главную
            </Link>
          </div>
        </div>
      ) : (
        <Link to="/" className="inline-flex items-center justify-center mt-4 px-6 py-2 bg-gray-700 text-white font-semibold rounded-md shadow-md hover:bg-gray-600 transition duration-200 ease-in-out">
          Вернуться на главную
        </Link>
      )}

      <Alert
        isOpen={alert.isOpen}
        variant={alert.variant}
        onClose={handleCloseAlert}
        title={alert.title}
      >
        <p>{alert.message}</p>
      </Alert>
    </section>
  );
};

export default Order;
