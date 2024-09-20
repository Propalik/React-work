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
        <h3 className="flex mb-3">Сохраненные ранее товары</h3>
        <Link
          to="/cards"
          className="text-indigo-500 hover:text-indigo-600 border-b-2 border-b-indigo-500 mb-8 inline-flex"
        >
          Вернуться карточкам
        </Link>

        <div className="flex flex-wrap justify-between gap-10">
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
