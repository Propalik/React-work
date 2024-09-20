import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import useProductsStore from "../Store/useProductsStore";

const CardDetail = () => {
  const { id } = useParams();
  const { products, setFavorite } = useProductsStore();

  // Находим карточку по id.
  const product = products?.find((product) => product?.id === id);

  return (
    <section className="card-details py-8">
      <div className="container mx-auto p-4">
        <Link
          to="/cards"
          className="text-gray-600 hover:text-gray-900 mb-8 inline-flex text-lg"
        >
          Вернуться назад
        </Link>
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg relative">
          {/* Изображение карточки */}
          <div className="relative h-96 bg-gray-200 rounded-t-lg overflow-hidden">
            <img
              className="object-cover w-full h-full"
              src={product?.imgSrc}
              alt={product?.title}
            />
            <button
              className={`absolute top-2 left-2 p-2 rounded-full ${
                product?.isFavorite ? "text-red-500" : "text-white"
              }`}
              onClick={() => setFavorite(id)}
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
              {product?.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4 text-center">
              {product?.description}
            </p>
            <p className="text-gray-600 text-md mb-2 text-center">
              Категория: {product?.category}
            </p>
            {/* Статус наличия */}
            <div className="flex justify-center mb-4">
              {product?.price && product?.price > 0 ? (
                <span className="uppercase text-sm bg-green-100 px-2 py-1 border-green-500 border rounded text-green-700 font-medium select-none">
                  In Stock
                </span>
              ) : (
                <span className="uppercase text-sm bg-red-100 px-2 py-1 border-red-500 border rounded text-red-700 font-medium select-none">
                  Out of Stock
                </span>
              )}
            </div>
            {/* Цена */}
            <p className="text-2xl font-bold text-gray-800 text-center mb-4">
              {product?.price && product?.price > 0 ? `$${product.price}` : "Not available"}
            </p>
            {/* Кнопка добавления в корзину */}
            <div className="flex justify-center">
            <button
  className={`${
    !product?.price || product?.price <= 0
      ? "bg-gray-400 cursor-not-allowed"
      : "bg-blue-500 hover:bg-blue-600"
  } text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300`}
  disabled={!product?.price || product?.price <= 0}
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
    </section>
  );
};

export default CardDetail;
