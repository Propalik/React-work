import { Routes, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout.jsx";
import Home from "../../pages/Home.jsx";
import Cards from "../../pages/Cards.jsx";
import CardDetail from "../../pages/CardDetail.jsx";
import FavoritesList from "../../pages/FavoritesList.jsx"; // Убедитесь, что это .jsx
import Category from "../../pages/category.jsx"; 
import Admin from "../../pages/Admin.jsx"; // Убедитесь, что это .jsx
import PrivateRoute from "./PrivateRoute";
import Order from "../../pages/Order.jsx"; // Убедитесь, что это .jsx

const routes = [
  { path: "/", element: <Home /> },
  { path: "cards", element: <Cards /> },
  { path: "cards/:id", element: <CardDetail /> },
  { path: "favorites", element: <FavoritesList /> },
  { path: "order", element: <Order /> },
  {
    path: "admin",
    element: <PrivateRoute element={<Admin />} requiredRole="admin" />,
  }, 
  { path: "category/:category", element: <Category /> },
];

const renderRoutes = (routes) => {
  return routes.map((route) => (
    <Route key={route?.path} path={route?.path} element={route?.element}>
       {route?.children && renderRoutes(route.children)} 
    </Route>
  ));
};

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<MainLayout />}>
      {renderRoutes(routes)}
    </Route>
  </Routes>
);

export default AppRoutes;
