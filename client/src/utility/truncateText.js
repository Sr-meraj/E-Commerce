/**
 * The `truncateText` function shortens a given `title` to a specified `length` and appends an `end`
 * string if the title exceeds the length.
 * @param title - The `title` parameter is the text or string that you want to truncate if its length
 * exceeds a certain limit.
 * @param length - The `length` parameter in the `truncateText` function represents the maximum length
 * of the text you want to display. If the `title` is longer than this specified `length`, it will be
 * truncated to fit within the limit.
 * @param end - The `end` parameter in the `truncateText` function represents the text that will be
 * appended to the truncated `title` if its length exceeds the specified `length`. It is used to
 * indicate that the `title` has been truncated.
 * @returns The `truncateText` function is being returned.
 */
export function truncateText(title, length, end) {
  return title.length > length ? title.substr(0, length - end.length) + end : title;
}
