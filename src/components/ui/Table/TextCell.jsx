
/**
 * Компонент ячейка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {string} props.value - Содержимое ячейки.
 * @returns {JSX.Element} Элемент JSX.
 */
// eslint-disable-next-line react/prop-types
const TextCell = ({ value }) => (
  <div className="flex items-center border border-gray-400 flex-grow w-2 leading-10 px-2">
    {value}
  </div>
);

export default TextCell;
