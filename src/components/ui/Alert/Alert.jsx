// import { useState } from "react";
import {
  IoInformationCircle,
  IoWarning,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { VscError } from "react-icons/vsc";
import { IoIosClose } from "react-icons/io";

/**
 * Компонент уведомления.
 * @param {object} props - Свойства компонента.
 * @param {string} [props.variant="info"] - Вариант уведомления (info, warning, success, error).
 * @param {boolean} props.isOpen - Компонент показан/скрыт.
 * @param {function} props.onClose - Обработчик клика по карточке (необязательно).
 * @param {React.ReactNode} props.children - Дочерние элементы компонента.
 * @returns {JSX.Element} Элемент JSX.
 */
// eslint-disable-next-line react/prop-types
const Alert = ({ variant = "info", children, isOpen }) => {
  console.log("isOpen внутри компонента", isOpen);

  // Стейт для показа/скрытия компонента.
  // const [isVisible] = useState(isOpen);

  // Стили для вариантов
  const variantClasses = {
    info: "border-l-4 border-blue-700 bg-blue-100 text-blue-800",
    warning: "border-l-4 border-yellow-700 bg-yellow-100 text-yellow-800",
    success: "border-l-4 border-green-700 bg-green-100 text-green-800",
    error: "border-l-4 border-red-700 bg-red-100 text-red-800",
  };

  // Варианты иконок
  const iconVariants = {
    info: <IoInformationCircle className="w-5 h-5" />,
    warning: <IoWarning className="w-5 h-5" />,
    success: <IoCheckmarkCircleOutline className="w-5 h-5" />,
    error: <VscError className="w-5 h-5" />,
  };

  return (
    isOpen && (
      <div
        id="Alert"
        className={`flex items-center ${variantClasses[variant]} absolute z-10 bottom-4 left-4 w-96 px-3 py-2 rounded-sm`}
        role="alert"
      >
        <div id="icon">{iconVariants[variant]}</div>
        <div className="ml-4 mr-4">{children}</div>
        <button className="absolute right-2 top-2">
          <IoIosClose className="w-5 h-5" />
        </button>
      </div>
    )
  );
};

export default Alert;
