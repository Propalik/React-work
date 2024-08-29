import { useParams } from "react-router-dom";
import { initialProducts } from "../../data.js";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const CardDetail = () => {
  const [isFavorite, setFavorite] = useState(false); // Стейт для того, чтобы пометить товар сохраненным или нет.

  const { id } = useParams();

  // Находим карточку по id.
  const product = initialProducts?.find((product) => product?.id === id);

  useEffect(() => {
    // Получаем данные из localStorage
    const storedFavoriteProducts = localStorage.getItem("favorite");

    // Если данные есть в localStorage, устанавливаем начальное состояние продуктов
    if (storedFavoriteProducts) {
      const favoriteProducts = JSON.parse(storedFavoriteProducts);

      const isProductInStorage = favoriteProducts.includes(id);

      // Обновляем стейт сохраненным товаром.
      setFavorite(isProductInStorage);
    }
  }, []);


  
  return (
    <section className="card-details">
      <div className="container mx-auto p-4">
        <Link
          to="/cards"
          className=" text-gray-600 hover:text-gray-900 mb-8 inline-flex"
        >
          Вернуться назад
        </Link>
        <div className="max-w-md rounded shadow-lg relative">
          <img 
           className="w-full" src={product?.imgSrc} alt={product?.title} />
          
          <button
            className={`absolute top-0 left-0 m-2 p-2 rounded-full ${
              isFavorite ? "text-red-500" : "text-white"
            }`}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
          </button>
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{product?.title}</div>
            <p className="text-gray-600 text-sm mb-2">{product?.description}</p>
            <p className="text-gray-600 text-sm mb-2">{product?.category}</p>
        
            <div className="text-lg font-bold mb-2">{product?.price}$</div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardDetail;
