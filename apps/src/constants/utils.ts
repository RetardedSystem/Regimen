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

/**
 * Format a Date object into a SQL-compatible date string.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} The formatted SQL date string.
 */

function formatSqlDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
export { formatDateTime, formatSqlDate };
