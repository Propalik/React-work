import { useState } from "react";

// eslint-disable-next-line react/prop-types
export const Stepper = ({ minValue = 1, maxValue = 10, onQuantityUpdate }) => {
    const [value, setValue] = useState(minValue);
  
    const handleBtnIncrement = () => {
      if (value < maxValue) {
       
        setValue(value + 1);
        onQuantityUpdate && onQuantityUpdate(value + 1);
      }
    };
  
    const handleBtnDecrement = () => {
      if (value > minValue) {
        setValue(value - 1);
        onQuantityUpdate && onQuantityUpdate(value - 1);
      }
    };
  
    return (
      <div className="inline-flex items-center mt-2">
        <button
          disabled={value === minValue}
          onClick={handleBtnDecrement}
          className="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200 disabled:cursor-not-allowed"
        >
          -
        </button>
        <div className="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
          {value}
        </div>
        <button
          onClick={handleBtnIncrement}
          disabled={value === maxValue}
          className="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200"
        >
          +
        </button>
      </div>
    );
  };