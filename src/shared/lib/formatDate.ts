export function formatDate(isoDate: Date): string {
  const date = new Date(isoDate);

  // Получение дня, месяца и года с добавлением ведущих нулей
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
  const year = date.getFullYear();

  // Форматирование строки
  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
}
