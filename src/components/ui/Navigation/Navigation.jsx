/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

const Navigation = ({ items }) => {
  // Хук для получения роли пользователя
  // По хорошему вынести на страницу (бизнес-логика)
  const { user } = useAuth();

  /**
   * Определяет, активна ли ссылка.
   * По хорошему вынести на страницу (бизнес-логика)
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
    <>
      
      {items?.length > 0 &&
        items.map((item) => {
          // Скрыть пункт меню "Admin" если пользователь не администратор
          if (item?.name === "Admin" && user?.role !== "admin") {
            return null;
          }

          return (
            <NavLink
              to={item?.path}
              key={item?.path}
              className={`text-zinc-800 inline-flex items-center px-1 pt-1 leading-16  ${
                isActiveLink(item?.path)
                  ? "text-indigo-500 border-b-2 border-indigo-500"
                  : "hover:text-indigo-500"
              }`}
            >
              {item?.name}
              {item?.icon}
            </NavLink>
          );
        })}
    </>
  );
};

export default Navigation;
