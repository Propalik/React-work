/* eslint-disable react/prop-types */
import { useState, } from "react";
import { Stepper } from "../Stepper/Stepper";
import useProductsStore from "../../../Store/useProductsStore";

/**
 * Компонент карточка
 * @param {object} props - Свойства компонента.
 * @returns {JSX.Element} Элемент JSX.
 */
export const Card = (props) => {
  const { title, category, description, price, imgSrc, isFavorite, id, cartQuantity } = props.details;
  const { onBtnClick, onStepperUpdate, onToggleFavorite } = props;

  const addToCart = useProductsStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(cartQuantity || 1);
  const [showAlert, setShowAlert] = useState(false);

  const handleBtnClick = () => onBtnClick(id);
  const handleFavorite = (event) => {
    event.stopPropagation();
    onToggleFavorite(id);
  };

  const handleAddToCart = () => {
    addToCart(id, quantity); // Добавляем товар в корзину
    setShowAlert(true); // Показать алерт
    setTimeout(() => setShowAlert(false), 2000); // Скрыть алерт через 2 секунды
  };
  
  const handleQuantityUpdate = (value) => {
    setQuantity(value);
    onStepperUpdate(id, value);
  };

  const totalPrice = price ? (quantity * price).toFixed(2) : 0;

  return (
    <div className="w-80 bg-gray-100 shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform">
      <div
        className="h-48 w-full flex flex-col justify-between p-4 relative"
        style={{
          backgroundImage: `url(${imgSrc})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.85)',
          borderRadius: '10px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-0 rounded-lg"></div>
        <div className="relative z-10 flex justify-between items-start">
          <button
            onClick={handleFavorite}
            className={`text-2xl ${isFavorite ? "text-red-600" : "text-gray-300"} hover:text-red-500 transition-all`}
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 32 32">
              <path d="M16 28C7 23.267 0 18 0 11c0-1.792.683-3.583 2.05-4.95C3.417 4.683 5.208 4 7 4s3.583.683 4.95 2.05l4.05 4.05 4.05-4.05C21.417 4.683 23.208 4 25 4s3.583.683 4.95 2.05C31.317 7.417 32 9.208 32 11c0 7-7 12.267-14 17z"></path>
            </svg>
          </button>
          <button onClick={handleBtnClick} className="text-white hover:text-teal-400 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
        <div className="relative z-10 text-white text-sm font-semibold">
          {price && price > 0 ? (
            <span className="px-2 py-1 bg-green-700 rounded-md">In Stock</span>
          ) : (
            <span className="px-2 py-1 bg-red-700 rounded-md">Out of Stock</span>
          )}
        </div>
      </div>
      <div className="p-6 bg-gray-50 rounded-b-lg">
        {category && <p className="text-sm text-gray-600">{category}</p>}
        {title && <h2 className="text-xl font-bold text-gray-800 mt-1">{title}</h2>}
        {description && <p className="text-sm text-gray-700 mt-2 line-clamp-1">{description}</p>}
        <p className="text-lg font-semibold text-gray-900 mt-3">
          {price && price > 0 ? `$${totalPrice}` : "Out of stock"}
        </p>
        {cartQuantity !== undefined && (
          <Stepper
            minValue={1}
            maxValue={10}
            value={quantity}
            onQuantityUpdate={handleQuantityUpdate}
          />
        )}
       <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-gradient-to-r from-gray-700 to-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gradient-to-l transition-all flex items-center justify-center disabled:opacity-50"
          disabled={!price || price <= 0}
        >
          Add to order
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
      </div>
      {showAlert && (
        <div className="absolute top-2 right-2 bg-green-500 text-white py-1 px-2 rounded flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2l2 8h8l-6 4 2 8-6-4-6 4 2-8-6-4h8z" />
          </svg>
          <span>Товар добавлен в корзину!</span>
        </div>
      )}
    </div>
  );
};
