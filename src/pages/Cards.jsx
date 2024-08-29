import { Card } from "../components/ui/Card/Card.jsx";
import { initialProducts } from "../../data.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();

  // Стейт для продуктов (начальное значение из data.js)
  const [products, setProducts] = useState(initialProducts);

  // useEffect(() => {
  //   // Получаем данные из localStorage
  //   const storedFavoriteProducts = localStorage.getItem("favorite");

  //   // Если данные есть в localStorage, устанавливаем начальное состояние продуктов
  //   if (storedFavoriteProducts) {
  //     const favoriteProducts = JSON.parse(storedFavoriteProducts);

  //     const updatedProducts = initialProducts?.map((product) => {
  //       return {
  //         ...product,
  //         isFavorite: favoriteProducts?.includes(product?.id),
  //       };
  //     });
  //     setProducts(updatedProducts);
  //   } else {
  //     // Иначе, используем начальные данные из data.js
  //     setProducts(initialProducts);
  //   }
  // }, []);

  const handleCardBtnClick = (id) =>{
    navigate(`/cards/${id}`);
    
  }

  const handleToggleFavorite = (id) => {
    // Создании поверхностной копии массива
    const currentProducts = [...products];

    // Находим товара по id
    const product = currentProducts?.find((product) => product?.id === id);

    if (product) {
      // Обновляем значение isFavorite у найденного товара
      product.isFavorite = !product?.isFavorite;

      // Обновляем стейт
      setProducts(currentProducts);

      // Получаем список избранных товаров
      const favoriteProducts = currentProducts
        ?.filter((product) => product?.isFavorite)
        ?.map((product) => product?.id);

      // Записываем избранные товары в localStorage
      localStorage.setItem("favorite", JSON.stringify(favoriteProducts));
    }

    console.log("сохраненки", products);
  };

/**
 * 
 * @param {string} id /айди карточки 
 * @param {string} newValue / новое значение степпера
 */
  const handleStepperUppdate = (id, newValue) => {
    const updateProducts = initialProducts?.map((product) => {
      if (product?.id === id) {
        return {...product, cartQuantity: newValue };
      }
      return product
    })
    console.log(updateProducts);
    
  }

 

  return ( 
      <section className="products">
    <div className="container">
      <div className="flex flex-wrap justify-between gap-10">
        {!!products &&
          products.map((product) => (
            <Card
            key={product?.id} 
            details={product}
            onBtnClick={handleCardBtnClick}
            onStepperUpdate={handleStepperUppdate}
            onToggleFavorite={handleToggleFavorite} />
          ))}
      </div>
    </div>
  </section>
  )
  
}


export default Cards