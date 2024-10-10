// import { clsx } from "clsx";
// import { twMerge } from "tailwind-merge";

// /**
//  * Функция объединяет массив классов, используя clsx,
//  * и сопоставляет полученные имена классов с классами Tailwind.
//  *
//  * @param {...string} inputs - Массив строк с классами.
//  * @returns {string} - Объединенные классы с учетом стилей Tailwind.
//  */
// export function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

/**
 * Функция объединяет массив классов, удаляя дубликаты и объединяя их.
 *
 * @param {...string} inputs - Массив строк с классами.
 * @returns {string} - Объединенные классы.
 */
export function cn(...inputs) {
  // Объединяем все строки в один массив, предварительно фильтруя undefined и пустые строки
  const allClasses = inputs
    .filter(Boolean) // Удаляем undefined, null, и пустые строки
    .flatMap((input) => input.split(/\s+/)); // Разделяем строки на отдельные классы

  // Удаляем дубликаты, используя Set
  const uniqueClasses = [...new Set(allClasses)];

  // Возвращаем объединенные классы, соединенные пробелами
  return uniqueClasses.join(" ");
}
