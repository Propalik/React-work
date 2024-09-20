import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useProductsStore from "../Store/useProductsStore";

const Home = () => {
  const navigate = useNavigate();
  const { products, getFavoriteProducts } = useProductsStore();
  
  const [popularProducts, setPopularProducts] = useState(products.slice(0, 4));
  const favoriteProducts = getFavoriteProducts();

  useEffect(() => {
    const interval = setInterval(() => {
      // Генерация нового списка популярных товаров случайным образом
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);
      setPopularProducts(shuffledProducts.slice(0, 4));
    }, 15000);

    return () => clearInterval(interval);
  }, [products]);

  // Обработчик перехода по категориям
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Hero Section */}
      <section className="hero bg-gray-800 text-white py-16 rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Cozy Shop</h1>
          <p className="text-xl mb-6">Find warm and delightful products for your home.</p>
          <button
            className="bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600 transition-colors"
            onClick={() => navigate("/cards")}
          >
            Start Shopping
          </button>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories mt-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop by Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Electronics", "Fashion", "Home & Garden", "Sports"].map((category) => (
            <div
              key={category}
              className="category bg-gray-100 p-6 rounded-lg text-center hover:shadow-lg cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              <h3 className="text-xl font-bold mb-2">{category}</h3>
              <p className="text-gray-600 mb-4">Explore the latest in {category}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Products Section */}
      <section className="popular-products mt-12 p-4 bg-gray-200 border border-gray-400 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          🌟 Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {popularProducts.map((product) => (
            <div
              key={product.id}
              className="product bg-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={product.imgSrc}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">${product.price}</p>
              <button
                className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 w-full"
                onClick={() => navigate(`/cards/${product.id}`)}
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Favorite Products Section */}
      {favoriteProducts.length > 0 && (
        <section className="favorite-products mt-12 p-4 bg-gray-100 border border-gray-400 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            ❤️ Your Favorites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="product bg-white p-6 rounded-lg shadow-lg hover:shadow-xl"
              >
                <img
                  src={product.imgSrc}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <button
                  className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 w-full"
                  onClick={() => navigate(`/cards/${product.id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
