import { Card } from "../components/ui/Card/Card";
import useProductsStore from "../Store/useProductsStore";
import { Link } from "react-router-dom";

const FavoritesList = () => {
  // Достаем функцию для работы с сохраненками
  const { getFavoriteProducts, setFavorite } = useProductsStore();

  // Вызываем эту функцию
  const favoritesProducts = getFavoriteProducts();


  //Вызов аллерта
  const handleToggleFavorite = (id) => {
    const confirmDeletion = window.confirm("Вы уверены, что хотите удалить этот товар из избранного?");
    
    if (confirmDeletion) {
      setFavorite(id); // Удаляем товар из избранного
    }
  };

  return (
    <section className="favorites">
      <div className="container mx-auto px-4">
        <h3 className="flex mb-3">Сохраненные ранее товары</h3>
        <Link
          to="/cards"
          className=" text-indigo-500 hover:text-indigo-600 border-b-2 border-b-indigo-500 mb-8 inline-flex"
        >
          Вернуться карточкам
        </Link>
        <div className="flex flex-wrap justify-between">
          {!!favoritesProducts &&
            favoritesProducts.map((product) => (
              <Card
                key={product?.id}
                details={product}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FavoritesList;
