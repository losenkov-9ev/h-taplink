/**
 * Formats a number by adding a custom delimiter.
 *
 * @remarks
 * This function uses the `toLocaleString` method to convert the number to a string with commas as the default delimiter.
 * It then replaces the commas with the specified delimiter.
 *
 * @param num - The number to be formatted.
 * @param delimiter - The custom delimiter to be used.
 *
 * @returns The formatted number as a string.
 *
 * @example
 * ```typescript
 * const formattedNumber = formatNumberWithDelimiter(123456789, '.');
 * console.log(formattedNumber); // Output: "123.456.789"
 * ```
 */
export function formatNumberWithDelimiter(num: number, delimiter: string = ' '): string {
  return num.toLocaleString('en-US').replace(/,/g, delimiter);
}
