type DebounceFunction<T extends (...args: any[]) => any> = ((...args: Parameters<T>) => void) & {
  cancel: () => void;
};

/**
 * Создаёт дебаунс для указанной функции.
 * @param func - Функция, которую нужно дебаунсить.
 * @param delay - Время задержки в миллисекундах.
 * @returns Дебаунсированная версия функции с методом `cancel`.
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): DebounceFunction<T> {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const debounced = function (this: unknown, ...args: Parameters<T>) {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
      timeoutId = null;
    }
  };

  return debounced as DebounceFunction<T>;
}
