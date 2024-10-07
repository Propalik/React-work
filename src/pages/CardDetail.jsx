import { useParams } from "react-router-dom"; // Импортируйте useLocation
import { Link } from "react-router-dom";
import useProductsStore from "../Store/useProductsStore";
import Alert from "../components/ui/Alert/Alert";
import { useState, useEffect } from "react";

const CardDetail = () => {
  const { id } = useParams();
  const { products, getFavoriteProducts, setFavorite, addToCart } = useProductsStore(); // Добавьте addToCart
  const favoriteProducts = getFavoriteProducts(); // Получаем текущие избранные товары
  const [alert, setAlert] = useState({ isOpen: false, title: "", message: "", variant: "" });

  // Приведение id к числу для сопоставления с продуктами.
  const product = products?.find((product) => product?.id === id);

  if (!product) {
    return <p className="text-center text-gray-700">Product not found</p>; // Обработка случая, когда продукта с таким id нет
  }

  // Проверка, находится ли товар в избранном
  const isFavorite = favoriteProducts.some((favProduct) => favProduct.id === product.id);

  // Обработчик добавления/удаления товара из избранного
  const handleToggleFavorite = () => {
    setFavorite(product.id);
    setAlert({
      isOpen: true,
      title: isFavorite ? "Удалено из избранного" : "Добавлено в избранное",
      message: isFavorite ? `${product.name} удален из избранного` : `${product.name} добавлен в избранное`,
      variant: "success",
    });
  };

  // Обработчик добавления товара в корзину
  const handleAddToCart = () => {
    addToCart(product.id, 1); // Добавляем товар в корзину с количеством 1
    setAlert({
      isOpen: true,
      title: "Товар добавлен в корзину",
      message: `${product.name} был успешно добавлен в корзину.`,
      variant: "success",
    });
  };

  // Закрытие алерта и автоматическое его скрытие через секунду
  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (alert.isOpen) {
      const timer = setTimeout(() => {
        handleCloseAlert();
      }, 2000); // Устанавливаем таймер на 1 секунду
      return () => clearTimeout(timer); // Чистим таймер при размонтировании компонента
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert.isOpen]); // Запускаем эффект, когда состояние alert изменяется

  return (
    <section className="card-details py-8">
      <div className="container mx-auto p-4">
        <Link
          to="/cards"
          className="text-gray-600 hover:text-gray-900 mb-8 inline-flex items-center text-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Вернуться назад
        </Link>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Изображение карточки */}
          <div className="relative h-96 bg-gray-200 rounded-t-lg overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={product?.imgSrc}
              alt={product?.name}
            />
            <button
              className={`absolute top-2 left-2 p-2 rounded-full ${
                isFavorite ? "text-red-500" : "text-white"
              }`}
              onClick={handleToggleFavorite} // Добавлен обработчик клика
            >
              <svg
                className="w-8 h-8 fill-current"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
              </svg>
            </button>
          </div>
          {/* Детали карточки */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
              {product?.name}
            </h1>
            <p className="text-gray-600 text-lg mb-4 text-center">
              {product?.description}
            </p>
            <p className="text-gray-600 text-md mb-2 text-center">
              Категория: {product?.category}
            </p>
            {/* Рейтинг товара */}
            <div className="flex justify-center mb-4">
              <span className="text-yellow-500">
                {`★`.repeat(Math.round(product?.rating))}
              </span>
              <span className="text-gray-600 ml-2">
                ({product?.rating}/5)
              </span>
            </div>
            {/* Статус наличия */}
            <div className="flex justify-center mb-4">
              {product?.price && product?.price > 0 ? (
                <span className="uppercase text-sm bg-green-100 px-2 py-1 border-green-500 border rounded text-green-700 font-medium select-none">
                  В наличии
                </span>
              ) : (
                <span className="uppercase text-sm bg-red-100 px-2 py-1 border-red-500 border rounded text-red-700 font-medium select-none">
                  Нет в наличии
                </span>
              )}
            </div>
            {/* Цена */}
            <p className="text-2xl font-bold text-gray-800 text-center mb-4">
              {product?.price && product?.price > 0
                ? `$${product.price}`
                : "Не доступно"}
            </p>
            {/* Кнопка добавления в корзину */}
            <div className="flex justify-center">
              <button
                className={`${
                  !product?.price || product?.price <= 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-700 to-gray-500 hover:from-gray-600 hover:to-gray-400"
                } text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 flex items-center`}
                disabled={!product?.price || product?.price <= 0}
                onClick={handleAddToCart} // Добавлен обработчик клика
              >
                Add to Cart
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-2 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
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

export default CardDetail;
