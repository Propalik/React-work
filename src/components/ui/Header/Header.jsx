import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useProductsStore from "../../../Store/useProductsStore";
/** Массив пунктов меню */
const navItems = [
  { name: "Главная", path: "/" },
  { name: "Товары", path: "/cards" },
  { name: "Admin", path: "/admin" },
];

/**
 * Компонент Шапка.
 * @returns {JSX.Element} Элемент header.
 */
const Header = () => {
  const location = useLocation();

  const navigate = useNavigate(); // хук для роутинга

  // Достаем функцию, которая показывает сохраненки
  const { getFavoriteProducts } = useProductsStore();

  const favoriteProducts = getFavoriteProducts();

  // Показ страницы с сохраненками
  const handleOpenFavorites = () => {
    navigate(`/favorites`);
  };

  /**
   * Определяет, активна ли ссылка.
   * @param {string} path - Путь ссылки.
   * @returns {boolean} ссылка активна или нет.
   */
  const isActiveLink = (path) => {
    return (
      location?.pathname === path ||
      (path === "/cards" && location?.pathname?.startsWith("/cards"))
    );
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16">
          <nav className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <NavLink to="/" className="flex-shrink-0 flex items-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-indigo-500 mr-2"
              >
                <path d="M12 2L2 7h20L12 2z" />
                <path d="M2 7l10 5 10-5v10l-10 5-10-5V7z" />
              </svg>
              <span className="text-xl font-bold text-gray-800">React Shop</span>
            </NavLink>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems?.map((item) => (
                <NavLink
                  to={item?.path}
                  key={item?.path}
                  className={`text-gray-600 inline-flex items-center px-1 pt-1 text-sm ${
                    isActiveLink(item?.path)
                      ? "text-indigo-500 border-b-2 border-indigo-500"
                      : "hover:text-indigo-500"
                  }`}
                >
                  {item?.name}
                </NavLink>
              ))}
            </div>
          </nav>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          <button
  type="button"
  onClick={handleOpenFavorites}
  className="relative bg-transparent p-1 mr-3 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
>
  <svg
    fill="currentColor"
    width="24"
    height="24"
    viewBox="0 0 32 32"
  >
    <path d="M27.303,12a2.6616,2.6616,0,0,0-1.9079.8058l-.3932.4054-.397-.4054a2.6615,2.6615,0,0,0-3.8157,0,2.7992,2.7992,0,0,0,0,3.8964L25.0019,21l4.2089-4.2978a2.7992,2.7992,0,0,0,0-3.8964A2.6616,2.6616,0,0,0,27.303,12Z" />
    <path d="M2,30H4V25a5.0059,5.0059,0,0,1,5-5h6a5.0059,5.0059,0,0,1,5,5v5h2V25a7.0082,7.0082,0,0,0-7-7H9a7.0082,7.0082,0,0,0-7,7Z" />
    <path d="M12,4A5,5,0,1,1,7,9a5,5,0,0,1,5-5m0-2a7,7,0,1,0,7,7A7,7,0,0,0,12,2Z" />
    <rect className="fill-none" width="32" height="32" />
  </svg>
  {!!favoriteProducts?.length && (
    <span className="w-4 h-4 flex items-center justify-center bg-red-500 rounded-full absolute -top-2 -right-2 text-white text-xs font-bold">
      {favoriteProducts.length}
    </span>
  )}
</button>

            <button
              type="button"
              className="bg-transparent p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <svg
                fill="currentColor"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M17 24H21V28H17zM24 24H28V28H24zM17 17H21V21H17zM24 17H28V21H24z"></path>
                <path d="M28,11h-6V7c0-1.7-1.3-3-3-3h-6c-1.7,0-3,1.3-3,3v4H4c-0.6,0-1,0.4-1,1c0,0.1,0,0.1,0,0.2l1.9,12.1c0.1,1,1,1.7,2,1.7H15v-2	H6.9L5.2,13H28V11z M12,7c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v4h-8V7z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
