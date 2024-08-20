/**
 * Компонент карточка
 * @property {string} props.title - Название карточки
 * @property {string} props.category - Категория карточки
 * @property {string} props.description - Описание карточки
 * @property {string} props.price - Цена карточки
 * @property {number} props.rating - Рейтинг карточки
 * @property {string} props.imgSrc - Путь к изображению
 * @returns {JSX.Element} Элемент JSX
 */

export const Card = (props) => {
  // eslint-disable-next-line react/prop-types
  const { title, category, description, price, imgSrc } = props.details;

  return (
    <div className="w-80 bg-white shadow rounded">
      <div
        className="h-48 w-full bg-gray-200 flex flex-col justify-between p-4 bg-cover bg-center"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="flex justify-between ">
          <input type="checkbox" />
          <button className="text-white hover:text-blue-500">
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
        <div>
          <span className="uppercase text-xs bg-green-50 p-0.5 border-green-500 border rounded text-green-700 font-medium select-none">
            available
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center">
        <p className="text-gray-400 font-light text-xs text-center">{category}</p>
        <h1 className="text-gray-800 text-center mt-1">{title}</h1>
        <p className="text-gray-600 text-sm text-center mt-1">{description}</p>
        <p className="text-center text-gray-800 mt-1">{price}</p>
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
            0
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
        <button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50 mt-4 w-full flex items-center justify-center">
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
    // <div className="max-w-80 rounded-md overflow-hidden shadow-md hover:shadow-lg mb-4">
    //   <div className="relative">
    //     <img className="w-full max-h-44" src={imgSrc} alt={title} />
    //     <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-md text-sm font-medium">
    //       SALE
    //     </div>
    //   </div>
    //   <div className="p-4">
    //     <h3 className="text-lg font-medium mb-2">{title}</h3>
    //     <p className="text-gray-600 text-sm mb-4">{description}</p>
    //     <p className="text-gray-600 text-sm mb-4">{category}</p>
    //     <div className="flex items-center justify-between">
    //       <span className="font-bold text-lg">{price}</span>
    //       <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
    //         Buy Now
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
};
