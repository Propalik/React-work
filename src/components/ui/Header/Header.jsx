import { useState } from "react";
import useForm from "../../../hooks/useForm";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useProductsStore from "../../../Store/useProductsStore";
import { Modal } from "../Modal/Modal";
import Input from "../Input/Input";
import { useAuth } from "../../../hooks/useAuth";

const navItems = [
  { name: "Главная", path: "/" },
  { name: "Товары", path: "/cards" },
  { name: "Admin", path: "/admin" },
];

const Header = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { formValues, formErrors, handleInput, resetForm } = useForm({
    login: "",
    password: "",
    email: "",
    phone: "",
  });

  const { user, onRegister, onLogin, onLogout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { getFavoriteProducts, getCartProducts } = useProductsStore();
  const favoriteProducts = getFavoriteProducts();
  const cartProducts = getCartProducts();

  const isActiveLink = (path) => {
    return (
      location?.pathname === path ||
      (path === "/cards" && location?.pathname?.startsWith("/cards"))
    );
  };

  const handleRegisterForm = (event) => {
    event.preventDefault();
    onRegister(formValues);
    setShowRegisterModal(false);
    resetForm();
  };

  const handleLoginFormSubmit = (event) => {
    event.preventDefault();
    onLogin(formValues);
    setShowLoginModal(false);
    resetForm();
  };

  const closeLoginModalAndResetForm = () => {
    setShowLoginModal(false);
    resetForm();
  };

  const closeRegisterModalAndResetForm = () => {
    setShowRegisterModal(false);
    resetForm();
  };

  return (
    <header className="bg-gray-800 text-white shadow fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16 items-center">
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
                className="text-yellow-500 mr-2"
              >
                <path d="M12 2L2 7h20L12 2z" />
                <path d="M2 7l10 5 10-5v10l-10 5-10-5V7z" />
              </svg>
              <span className="text-xl font-bold">React Shop</span>
            </NavLink>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navItems.map((item) => {
                if (item.name === "Admin" && (!user || user.role !== "admin")) {
                  return null;
                }
                return (
                  <NavLink
                    to={item.path}
                    key={item.path}
                    className={`text-gray-200 inline-flex items-center px-1 pt-1 text-sm ${
                      isActiveLink(item.path)
                        ? "text-indigo-300 border-b-2 border-indigo-300"
                        : "hover:text-indigo-300"
                    }`}
                  >
                    {item.name}
                  </NavLink>
                );
              })}
            </div>
          </nav>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-5">
            {/* Favorite button */}
            <button
              type="button"
              className="relative bg-transparent p-1 rounded-full text-gray-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate("/favorites")}
            >
              <svg fill="currentColor" width="24" height="24" viewBox="0 0 32 32">
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
            {/* Cart button */}
            <button
              type="button"
              className="relative bg-transparent p-1 rounded-full text-gray-400 hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => navigate('/order')}
            >
              {cartProducts.length > 0 && (
                <span className="w-4 h-4 flex items-center justify-center bg-yellow-500 rounded-full absolute -top-2 -right-2 text-white text-xs font-bold">
                  {cartProducts.length}
                </span>
              )}
              <svg
                fill="currentColor"
                width="24"
                height="24"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M28,11h-6V7c0-1.7-1.3-3-3-3h-6c-1.7,0-3,1.3-3,3v4H4c-0.6,0-1,0.4-1,1c0,0.1,0,0.1,0,0.2l1.9,12.1c0.1,1,1,1.7,2,1.7H15v-2H6.9L5.2,13H28V11z M12,7c0-0.6,0.4-1,1-1h6c0.6,0,1,0.4,1,1v4h-8V7z"></path>
              </svg>
            </button>

            {/* Login/Register buttons */}
            <div id="buttons-wrapper" className="inline-flex items-center">
              {user ? (
                <button
                  type="button"
                  className="border-2 text-gray-200 border-gray-300 bg-transparent font-medium py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                  onClick={onLogout}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    className="border-2 text-gray-200 border-gray-300 bg-transparent font-medium py-2 px-4 rounded hover:bg-red-500  transition duration-200"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="ml-3 border-2 border-gray-300 bg-gray-600 text-white font-medium py-2 px-4 rounded hover:bg-yellow-500 transition duration-200"
                    onClick={() => setShowRegisterModal(true)}
                  >
                    Register
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showRegisterModal && (
        <Modal
          title="Registration form"
          isOpen={showRegisterModal}
          onClose={closeRegisterModalAndResetForm}
        >
          <form onSubmit={handleRegisterForm}>
            <Input
              label="Login"
              name="login"
              type="text"
              value={formValues?.login}
              onInput={handleInput}
              placeholder="Enter your login"
              error={formErrors?.login}
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              value={formValues?.email}
              onInput={handleInput}
              placeholder="Enter your email"
              error={formErrors?.email}
              required
            />
            <Input
              label="Phone"
              name="phone"
              type="tel"
              value={formValues?.phone}
              onInput={handleInput}
              placeholder="Enter your phone number"
              error={formErrors?.phone}
              required
            />
            <Input
              label="Password"
              type="password"
              name="password"
              value={formValues?.password}
              onInput={handleInput}
              placeholder="Enter your password"
              error={formErrors?.password}
              required
            />
            <button
              className="bg-indigo-500 text-white font-medium py-2 px-4 rounded"
              type="submit"
            >
              Submit data
            </button>
          </form>
        </Modal>
      )}

{showLoginModal && (
  <Modal
    title="Login Form"
    isOpen={showLoginModal}
    onClose={closeLoginModalAndResetForm}
  >
    <form onSubmit={handleLoginFormSubmit}>
      <Input
        label="Login"
        name="login" // Исправлено на "login"
        type="text"
        value={formValues?.login}
        onInput={handleInput}
        placeholder="Enter your login"
        error={formErrors?.login}
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={formValues?.password}
        onInput={handleInput}
        placeholder="Enter your password"
        error={formErrors?.password}
        required
      />
      <button
        className="bg-indigo-500 text-white font-medium py-2 px-4 rounded"
        type="submit"
      >
        Submit
      </button>
    </form>
  </Modal>
)}

    </header>
  );
};

export default Header;