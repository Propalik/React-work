import TextCell from "./TextCell";

/**
 * Компонент строка таблицы.
 * @param {object} props - Свойства компонента.
 * @param {object} props.rowData - Объект с характеристиками передавайемой сущности.
 * @param {function} props.onDoubleClick - Функция для обработки двойного клика (событие браузера).
 * @returns {JSX.Element} Элемент JSX.
 */
// eslint-disable-next-line react/prop-types
const TableRow = ({ rowData, onDoubleClick }) => {
  // Получает все ключи объекта rowData, кроме ключа id
  const rowKeys = Object.keys(rowData || {}).filter((key) => key !== "id");

  return (
    <div className="flex flex-row cursor-pointer hover:bg-gray-200" onDoubleClick={() => onDoubleClick(rowData)}>
      {rowKeys?.map((key) => (
        <TextCell key={crypto.randomUUID()} value={rowData?.[key]} />
      ))}
    </div>
  );
};

export default TableRow;
