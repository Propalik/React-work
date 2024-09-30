import { useEffect, } from "react";
import { Card } from "../components/ui/Card/Card.jsx";
import useProductsStore from "../Store/useProductsStore.js";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate(); // хук для роутинга

  // Стор для работы с продуктами
  const { products, getProducts, setFavorite, } = useProductsStore();

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  // Обработчик клика по карточке (для открытия сайдбара, например)
  const handleCardBtnClick = (id) => {
    navigate(`/cards/${id}`);
  };

  /**
   * 
   * @param {string} id - ID карточки 
   * @param {number} newValue - новое значение степпера
   */
  const handleStepperUpdate = (id, newValue) => {
    // eslint-disable-next-line no-undef
    set((state) => {
      const updatedProducts = state?.products?.map((product) => {
        if (product?.id === id) {
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
        <div className="flex flex-wrap justify-between gap-10">
          {!!products &&
            products.map((product) => (
              <Card
                key={product?.id}
                details={product}
                onBtnClick={handleCardBtnClick}
                onToggleFavorite={() => setFavorite(product?.id)}
                onStepperUpdate={(newValue) => handleStepperUpdate(product?.id, newValue)}
              />
            ))}
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default Cards;
