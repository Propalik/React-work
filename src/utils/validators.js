/**
 * Валидаторы для полей формы.
 * @property {function(string): string|null} text - Валидатор для текстового поля.
 * @property {function(string): string|null} email - Валидатор для электронной почты.
 * @property {function(string): string|null} phone - Валидатор для телефона.
 * @property {function(string): string|null} password - Валидатор для пароля.
 * @property {function(string): string|null} number - Валидатор для числовых полей.
 */
const validators = {
  /**
   * Валидатор для текстового поля.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  text: (value) => {
    if (!value) return "field is required";

    const regexText = /^[^!>?<_\-$№#@]+$/;

    if (!regexText.test(value))
      return "Text should not contain !>?<_-$№#@ symbols";

    return null;
  },
  /**
   * Валидатор для электронной почты.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  email: (value) => {
    if (!value) return "field is required";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value))
      return "Invalid email";

    return null;
  },
  /**
   * Валидатор для телефона.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  phone: (value) => {
    if (!value) return "field is required";

    if (!/^\+?[0-9-]+$/.test(value)) return "Invalid phone number";

    return null;
  },
  /**
   * Валидатор для пароля.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  password: (value) => {
    if (!value) return "field is required";

    if (value.length < 8) return "Password must be at least 8 characters long";

    return null;
  },
  /**
   * Валидатор для числовых полей.
   * @param {string} value - Значение поля.
   * @returns {string|null} - Сообщение об ошибке или null, если валидация прошла успешно.
   */
  number: (value) => {
    if (!value) return "field is required";

    if (isNaN(value)) return "Must be a number";

    return null;
  },
};

/**
 * Функция для валидации формы на основе предоставленных валидаторов.
 *
 * @param {Object} formData - Данные формы, представленные в виде объекта.
 * @returns {Object} - Объект с сообщениями об ошибках для каждого поля формы.
 */
export function validateForm(formData) {
  // Объект для хранения сообщений об ошибках
  const validationErrors = {};

  // Итерация по каждому полю формы
  Object.entries(formData).forEach(([type, value]) => {
    // Получение валидатора для текущего типа поля
    const validator = validators[type];

    // Если валидатор существует, выполняем проверку
    if (validator) {
      // Вызов валидатора для текущего значения поля
      const errorMessage = validator(value);

      // Если есть сообщение об ошибке, добавляем его в объект ошибок
      if (errorMessage) {
        validationErrors[type] = errorMessage;
      }
    }
  });

  // Возвращаем объект с сообщениями об ошибках
  return validationErrors;
}
