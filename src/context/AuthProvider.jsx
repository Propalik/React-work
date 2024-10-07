// import { createContext, useState, useEffect } from "react";

// /**
//  * Контекст для управления состоянием  аутентификации пользователя
//  * @type {React.Context}
//  */
// const AuthContext = createContext();

// /**
//  * Компонент для управления состоянием аутентификации пользователя
//  * @param {object} props - Свойства компонента
//  * @param {React.ReactNode} props.children - Дочерние элементы
//  * @returns {JSX.Element} - Компонент
//  */
// export const AuthProvider = ({ children }) => {
//   /**
//    * Состояние для хранения информации об аутентификации пользователя
//    * @type {object | null}
//    */
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Проверка аутентификации при загрузке страницы
//     const userFromLocalStorage = localStorage.getItem("user");

//     // Установка пользователя в состояние (если проверка пройдена)
//     userFromLocalStorage && setUser(JSON.parse(userFromLocalStorage));
//   }, []);

//   /**
//    * Функция для регистрации нового пользователя
//    * @param {object} userData - Данные пользователя
//    * @returns {Promise<void>}
//    */
//   const onRegister = async (userData) => {
//     try {
//       const response = await fetch("http://localhost:3000/users", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userData),
//       });

//       if (!response.ok) {
//         throw new Error("Ошибка регистрации пользователя");
//       }

//       const newUser = await response.json();

//       onLogin(newUser);
//     } catch (error) {
//       console.error("Ошибка при регистрации пользователя:", error);
//     }
//   };

//   /**
//    * Функция для входа пользователя
//    * @param {object} userData - Данные пользователя
//    * @returns {void}
//    */
//   const onLogin = (userData) => {
//     setUser(userData);

//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   /**
//    * Функция для выхода пользователя
//    * @returns {void}
//    */
//   const onLogout = () => {
//     setUser(null);

//     localStorage.removeItem("user");
//   };

//   const contextValue = { user, onRegister, onLogin, onLogout };

//   return (
//     <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
//   );
// };
