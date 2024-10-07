import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"; 

/**
 * Компонент для защищенного роута
 * @param {object} props - Свойства компонента
 * @param {JSX.Element} props.element - Компонент для отображения
 * @param {string} props.requiredRole - Роль для доступа к роуту
 * @returns {JSX.Element} - Компонент
 */
// eslint-disable-next-line react/prop-types
const PrivateRoute = ({ element, requiredRole }) => {
  const { user } = useAuth(); 

  if (!user) {
    // Пользователь не авторизован, перенаправляем на страницу входа
    return <Navigate to="/" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Пользователь авторизован, но не имеет нужной роли, перенаправляем на другую страницу
    return <Navigate to="/unauthorized" replace />;
  }

  return element; // Пользователь авторизован и имеет нужную роль, отображаем компонент
};

export default PrivateRoute;
