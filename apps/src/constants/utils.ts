/**
 * Format a date string into a more readable format.
 *
 * @param {string} dateTime - The date string to format.
 * @returns {string} The formatted date string.
 */
function formatDateTime(dateTime: string): string {
  const [datePart, timePart] = dateTime.split(" ");

  const [year, month, day] = datePart.split("-");
  const [hour, minute] = timePart.split(":");

  return `${day}/${month}/${year} ${hour}:${minute}`;
}

export { formatDateTime };
