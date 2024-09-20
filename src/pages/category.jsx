import { useParams, Link } from "react-router-dom";
import useProductsStore from "../Store/useProductsStore";
import { Card } from "../components/ui/Card/Card";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const { category } = useParams();
  const { products, setFavorite } = useProductsStore();
  const navigate = useNavigate();

  // Фильтруем товары по категории
  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  // Обработчик клика по карточке
  const handleCardBtnClick = (id) => {
    navigate(`/cards/${id}`);
  };

  // Обработчик изменения количества
  const handleStepperUpdate = (id, newValue) => {
    set((state) => {
      const updatedProducts = state.products.map((product) => {
        if (product.id === id) {
          return { ...product, cartQuantity: newValue };
        }
        return product;
      });
      return { products: updatedProducts };
    });
  };

  return (
    <section className="products">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">{category}</h2>
        {/* Кнопка "Вернуться назад" */}
        <Link to="/" className="inline-block mb-4 text-blue-500 hover:underline">
          Вернуться на главную
        </Link>
        <div className="flex flex-wrap justify-between gap-10">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              details={product}
              onBtnClick={handleCardBtnClick}
              onToggleFavorite={() => setFavorite(product.id)}
              onStepperUpdate={(newValue) => handleStepperUpdate(product.id, newValue)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
