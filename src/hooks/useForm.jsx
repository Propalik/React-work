import { useState } from "react";

/**
 * Хук для управления обработки, обновления и отправки данных формы.
 *
 * @param {Object} initialState - Начальное состояние формы (Объект).
 * @param {Function} setNewState - Функция для обновления ссостояния.
 * @returns {formData} - Объект с состоянием формы.
 * @returns {handleInputChange} - Функция обработчик при смене данных в инпуте.
 * @returns {handleSubmit} - Функция обработчик при отправке формы.
 * @returns {resetForm} - Функция сброса состояния формы.
 */
export function useForm(initialState, setNewState) {
  // Состояние формы, хранит значения полей
  const [formData, setFormData] = useState(initialState);

  // Обработчик при смене данных на элементе формы
  const handleInputChange = (event) => {
    // Извлекаем имя поля и его новое значение из события
    const { name, value } = event.target;

    // Обновляем state формы
    setFormData({
      ...formData,
      [name]: value, // Обновляем значение поля в state
    });
  };

  // Обработчик при отправке данных
  const handleSubmit = (event) => {
    event.preventDefault();

    // Проверка наличия пустых полей
    const isEmptyField = Object.values(formData).some(
      (value) => value.trim() === ""
    );

    if (isEmptyField) {
      console.log("Все поля обязательны к заполнению");
    } else {
      console.log("Отправленные данные:", formData);

      // Данные формы не содержат пустых полей, выполняем отправку
      setNewState && setNewState(formData);
      // Очистка формы
      resetForm();
    }
  };

  // Функция для сброса состояния формы
  const resetForm = () => setFormData(initialState);

  return {
    formData,
    handleSubmit,
    handleInputChange,
  };
}

export default useForm;
