export function getDaysUntilInactive(deletionDateStr: Date): string {
  const deletionDate = new Date(deletionDateStr);
  if (isNaN(deletionDate.getTime())) {
    throw new Error('Некорректный формат даты');
  }

  const currentDate = new Date();

  // Устанавливаем текущую дату на полночь UTC
  const currentUTCMidnight = Date.UTC(
    currentDate.getUTCFullYear(),
    currentDate.getUTCMonth(),
    currentDate.getUTCDate(),
  );

  // Устанавливаем дату удаления на полночь UTC
  const deletionUTCMidnight = Date.UTC(
    deletionDate.getUTCFullYear(),
    deletionDate.getUTCMonth(),
    deletionDate.getUTCDate(),
  );

  // Добавляем 7 дней к дате удаления для получения даты неактивности
  const inactiveUTCMidnight = deletionUTCMidnight + 7 * 24 * 60 * 60 * 1000;

  // Вычисляем разницу в миллисекундах между датой неактивности и текущей датой
  const diffMs = inactiveUTCMidnight - currentUTCMidnight;

  // Переводим разницу в дни с округлением вниз и добавлением 1 дня
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays <= 0) {
    // Если дата неактивности прошла или сегодня, ссылка не активна
    return 'Сегодня';
  } else if (diffDays === 1) {
    return '1 д.';
  } else {
    return `${diffDays} дн.`;
  }
}
