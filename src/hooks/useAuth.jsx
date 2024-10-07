/* eslint-disable react/prop-types */
// import { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";

// /**
//  * Хук для доступа к контексту аутентификации
//  * @returns {object} - Значение контекста
//  */
// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context)
//     throw new Error("useAuth должен использоваться внутри AuthProvider");

//   // Для отладки
//   // const { user } = context;

//   // useEffect(() => {
//   //   if (user !== null) {
//   //     console.log("useAuth: User changed", user);
//   //   }
//   // }, [user]);
//   // Конец отладки

//   return context;
// };

import { createContext, useContext, useState, useEffect } from "react";

/**
 * Контекст для управления состоянием  аутентификации пользователя
 * @type {React.Context}
 */
const AuthContext = createContext();

/**
 * Компонент для управления состоянием аутентификации пользователя
 * @param {object} props - Свойства компонента
 * @param {React.ReactNode} props.children - Дочерние элементы
 * @returns {JSX.Element} - Компонент
 */
export const AuthProvider = ({ children }) => {
  /**
   * Состояние для хранения информации об аутентификации пользователя
   * @type {object | null}
   */
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверка аутентификации при загрузке страницы
    const userFromLocalStorage = localStorage.getItem("user");

    // Установка пользователя в состояние (если проверка пройдена)
    userFromLocalStorage && setUser(JSON.parse(userFromLocalStorage));
  }, []);

  /**
   * Функция для регистрации нового пользователя
   * @param {object} userData - Данные пользователя
   * @returns {Promise<void>}
   */
  const onRegister = async (userData) => {
    try {
      // Получение всех пользователей
      const response = await fetch("http://localhost:3000/users");

      const users = await response?.json();

      if (!response.ok) {
        throw new Error("Ошибка при запросе на сервер");
      }

      // Проверяем, существует ли уже суперпользователь
      const adminExists = users?.some((user) => user?.role === "admin");

      // Определяем роль нового пользователя
      const newUser = {
        ...userData,
        role: adminExists ? "user" : "admin",
      };

      // Отправка запроса на создание нового пользователя
      const createResponse = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON?.stringify(newUser),
      });

      if (!createResponse?.ok) {
        throw new Error("Ошибка регистрации пользователя");
      }

      const createdUser = await createResponse?.json();

      onLogin(createdUser); // Выполняем вход после регистрации ?

      localStorage.setItem("user", JSON.stringify(createdUser));
    } catch (error) {
      console.error("Ошибка при регистрации пользователя:", error);
    }
  };

  /**
   * Функция для входа пользователя
   * @param {object} userData - Данные пользователя
   * @returns {void}
   */
  /**
   * Функция для входа пользователя
   * @param {object} userData - Данные пользователя, включающие текст и пароль
   * @returns {Promise<void>}
   */
  const onLogin = async (userData) => {
    try {
      const { login, password } = userData;

      // Отправка запроса на сервер для поиска пользователя с указанным логином
      // encodeURIComponent() — кодирует спец. символы в строке login, для безопасного использования в URL
      const response = await fetch(
        `http://localhost:3000/users?login=${encodeURIComponent(login)}`
      );

      if (!response.ok) {
        throw new Error("Ошибка при запросе на сервер");
      }

      const users = await response?.json();

      // Проверка наличия пользователя и совпадения пароля
      if (users?.length === 1 && users[0]?.password === password) {
        // Пользователь найден и пароль совпадает
        const user = users[0];

        setUser(user);

        localStorage.setItem("user", JSON.stringify(user));
      } else {
        // Пользователь не найден или данные неверны
        console.error("Неверное имя пользователя или пароль");
        // Можно добавить логику для отображения ошибки пользователю
      }
    } catch (error) {
      console.error("Ошибка при входе пользователя:", error);
    }
  };

  /**
   * Функция для выхода пользователя
   * @returns {void}
   */
  const onLogout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  const contextValue = { user, onRegister, onLogin, onLogout };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Хук для доступа к контексту вутентификации
 * @returns {object} - Значение контекста
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProiver");
  }

  // Для отладки
  // const { user } = context;

  // useEffect(() => {
  //   if (user !== null) {
  //     console.log("useAuth: User changed", user);
  //   }
  // }, [user]);
  // Конец отладки

  return context;
};
