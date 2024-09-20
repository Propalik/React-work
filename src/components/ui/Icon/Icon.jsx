/**
 * Компонент иконка.
 * @param {Object} props - Свойства компонента.
 * @param {string} props.name - Название иконки для отображения.
 * @param {string} props.className - Дополнительные классы для стилизации иконки.
 * @returns {JSX.Element} Иконка в виде элемента JSX.
 */
const Icon = ({ name, className }) => {
  const icons = {
    "information-square": (
      <svg
        id="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
        className={className}
        fill="currentColor"
      >
        <polygon points="17 22 17 14 13 14 13 16 15 16 15 22 12 22 12 24 20 24 20 22 17 22" />
        <path d="M16,8a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,8Z" />
        <path d="M26,28H6a2.0023,2.0023,0,0,1-2-2V6A2.0023,2.0023,0,0,1,6,4H26a2.0023,2.0023,0,0,1,2,2V26A2.0023,2.0023,0,0,1,26,28ZM6,6V26H26V6Z" />
        <rect fill="none" width="32" height="32" />
      </svg>
    ),
    "checkmark-outline": (
      <svg
        id="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
        className={className}
        fill="currentColor"
      >
        <polygon points="14 21.414 9 16.413 10.413 15 14 18.586 21.585 11 23 12.415 14 21.414" />
        <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z" />
        <rect fill="none" width="32" height="32" />
      </svg>
    ),
    "warning-alt": (
      <svg
        id="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 32 32"
        className={className}
        fill="currentColor"
      >
        <path d="M16,23a1.5,1.5,0,1,0,1.5,1.5A1.5,1.5,0,0,0,16,23Z" />
        <rect x="15" y="12" width="2" height="9" />
        <path d="M29,30H3a1,1,0,0,1-.8872-1.4614l13-25a1,1,0,0,1,1.7744,0l13,25A1,1,0,0,1,29,30ZM4.6507,28H27.3493l.002-.0033L16.002,6.1714h-.004L4.6487,27.9967Z" />
        <rect fill="none" width="32" height="32" />
      </svg>
    ),
    "error-rounded": (
      <svg
        width="20"
        height="20"
        viewBox="0 0 32 32"
        className={className}
        fill="currentColor"
        id="icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M2,16H2A14,14,0,1,0,16,2,14,14,0,0,0,2,16Zm23.15,7.75L8.25,6.85a12,12,0,0,1,16.9,16.9ZM8.24,25.16A12,12,0,0,1,6.84,8.27L23.73,25.16a12,12,0,0,1-15.49,0Z"
            transform="translate(0)"
          />
        </g>
        <g>
          <rect fill="none" width="32" height="32" />
        </g>
      </svg>
    ),
    "close": (
      <svg
        width="20"
        height="20"
        id="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        className={className}
      >
        <polygon points="24 9.4 22.6 8 16 14.6 9.4 8 8 9.4 14.6 16 8 22.6 9.4 24 16 17.4 22.6 24 24 22.6 17.4 16 24 9.4" />
        <rect fill="none" width="32" height="32" />
      </svg>
    ),
  };

  return icons[name] || null;
};

export default Icon;
