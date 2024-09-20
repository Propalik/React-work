// components/FavoritesList/FavoritesList.jsx
import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../Store/useProductsStore";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/ui/Alert/Alert";
import { useState } from "react";

const FavoritesList = () => {
  const navigate = useNavigate();
  const { getFavoriteProducts, setFavorite } = useProductsStore();
  const favoritesProducts = getFavoriteProducts();

  // Состояние для отображения Alert
  const [alert, setAlert] = useState({
  });

  // Обработчик клика по карточке
  const handleCardBtnClick = (id) => {
    navigate(`/cards/${id}`);
  };

  // Обработчик удаления из избранного
  const handleToggleFavorite = (id) => {
    const confirmDeletion = window.confirm("Вы уверены, что хотите удалить этот товар из избранного?");
    
    if (confirmDeletion) {
      setFavorite(id);
      setAlert({
        isOpen: true,
        title: "Товар удален",
        message: "Товар был удален из избранного.",
        variant: "success"
      });
    }
  };

  // Закрытие Alert
  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  return (
    <section className="favorites">
      <div className="container mx-auto px-4">
        <h3 className="flex mb-3 justify-center py-2 font-bold ">{favoritesProducts?.length ? "Сохраненные ранее товары." : "У вас нет сохраненных товаров."}</h3>
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-500 text-white font-semibold rounded-md shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition duration-200 ease-in-out"
          >
            Вернуться на главную
          </Link>
        </div>

        <div className="flex flex-wrap gap-9">
          {!!favoritesProducts &&
            favoritesProducts.map((product) => (
              <Card
                key={product?.id}
                details={product}
                onBtnClick={handleCardBtnClick}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
        </div>

        <Alert
          isOpen={alert.isOpen}
          variant={alert.variant}
          onClose={handleCloseAlert}
          title={alert.title}
        >
          <p>{alert.message}</p>
        </Alert>
      </div>
    </section>
  );
};

export default FavoritesList;
