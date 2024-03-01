/**
 * Truncate a given `title` to a specified `length` and append an `end`
 * string if the title exceeds the length.
 * @param {string} title - The text or string that you want to truncate if its length
 * exceeds a certain limit.
 * @param {number} [length=30] - The maximum length of the text you want to display.
 * @param {string} end - The text that will be appended to the truncated title if its length
 * exceeds the specified length. It is used to indicate that the title has been truncated.
 * @returns {string} The truncated text.
 */
export function truncateText(title, length = 30, end) {
  if (!title) {
    return ''; // or return title; depending on your requirements
  }

  return title.length > length ? title.substr(0, length - end.length) + end : title;
}
