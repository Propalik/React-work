/* eslint-disable react/prop-types */
import TableRow from "./TableRow";

/**
 * Компонент таблицы.
 * @param {object} props - Свойства компонента.
 * @param {Array} props.headerData - Массив объектов (названия столбцов в шапке таблицы).
 * @param {Array} props.data - Массив объектов (содержимое таблицы).
 * @param {function} props.onRowDoubleClick - Функция для обработки двойного клика на строку.
 * @returns {JSX.Element} Элемент JSX.
 */
// eslint-disable-next-line react/prop-types
const Table = ({ data, headers, onRowDoubleClick }) => {

  return (
    
    <div className="w-full">
      
      <div className="flex flex-row">
     
        {headers?. map((header) => (
          
          <div
            key={header?.key}
            className="leading-10 px-2 font-semibold bg-gray-300 flex items-center border border-gray-400 flex-grow w-2"
          >
            {header?.title}
          </div>
        ))}
      </div>
      {data?.length > 0 ? (
        data?.map((item) => (
          <TableRow
            onDoubleClick={onRowDoubleClick}
            key={crypto.randomUUID()}
            rowData={item}
          />
        ))
      ) : (
        <div className="flex flex-row py-2 px-4  border">
          Данные в таблице отсутствуют.
        </div>
      )}
    </div>
  );
};

export default Table;
