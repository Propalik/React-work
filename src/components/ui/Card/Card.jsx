/**
 * Компонент карточка
 * @property {string} props.title - Название карточки
 * @property {string} props.category - Категория карточки
 * @property {string} props.description - Описание карточки
 * @property {string} props.price - Цена карточки
 * @property {number} props.rating - Рейтинг карточки
 * @property {string} props.imgSrc - Путь к изображению
 * @returns {JSX.Element} Элемент JSX
  * @param {function} props.onClick - Обработчик клика по карточке 
 */

export const Card = (props) => {
  // eslint-disable-next-line react/prop-types
  const {title, category, description, price, imgSrc, isFavorite, id, cartQuantity } = props.details;
 
 
  // eslint-disable-next-line react/prop-types
  const { onBtnClick } = props;
  //обработчик клика
  const handleBtnClick = () => onBtnClick(id);

  

  return (
    <div className="w-80 bg-white shadow rounded">
      <div
        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="flex justify-between">
          {/* Favorite Button */}
          <button
            className={` ${isFavorite ? "text-red-500" : "text-white"}`}
          >
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path>
            </svg>
          </button>
          {/* Add Button */}
          <button onClick={handleBtnClick} className="text-white hover:text-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
        {/* Stock Status */}
        <div>
          {price && price > 0 ? (
            <div>
              <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
                in stock
              </span>
            </div>
          ) : (
            <div>
              <span className="uppercase text-xs bg-red-50 p-0.5 border-red-500 border rounded text-red-700 font-medium select-none">
                out of stock
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        {/* Category */}
        {category && (
          <p className="text-gray-400 font-light text-xs text-center">{category}</p>
        )}
        {/* Title */}
        {title && (
          <h1 className="text-gray-800 text-center mt-1">{title}</h1>
        )}
        {/* Description */}
        {description && (
          <p className="text-gray-600 text-sm text-center mt-1">{description}</p>
        )}
        {/* Price */}
        <p className="text-center text-gray-800 mt-1">
          {price && price > 0 ? `$${price}` : "Out of stock"}
        </p>
        {/* Cart Quantity */}
        {cartQuantity !== undefined && (
          <div className="inline-flex items-center mt-2">
            <button className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
            <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
              {cartQuantity}
            </div>
            <button className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>
        )}
        {/* Add to Order Button */}
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center"
          disabled={!price || price <= 0}
        >
          Add to order
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2"
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
  );
  
  
};
