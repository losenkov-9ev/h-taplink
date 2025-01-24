/**
 * Удаляет протокол (http:// или https://) из URL с помощью класса URL.
 *
 * @param url - Исходный URL-ссылка.
 * @returns URL без протокола.
 * @throws {Error} Если передана некорректная ссылка.
 */
export function removeProtocol(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.host + parsedUrl.pathname + parsedUrl.search + parsedUrl.hash;
  } catch {
    throw new Error('Некорректный URL');
  }
}
