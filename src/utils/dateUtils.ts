/**
 * Date utility helpers.
 * All dates stored in ISO 8601 format for persistence compatibility.
 */

/**
 * Formats an ISO date string into a human-readable label.
 * Returns 'Today', 'Tomorrow', 'Yesterday', or a locale date string.
 */
export function formatDueDate(isoDate: string | null): string {
  if (!isoDate) return '';

  const date = new Date(isoDate + 'T00:00:00'); // Treat as local date
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.getTime() === today.getTime()) return 'Today';
  if (date.getTime() === tomorrow.getTime()) return 'Tomorrow';
  if (date.getTime() === yesterday.getTime()) return 'Yesterday';

  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Returns true if the given ISO date string is strictly before today.
 */
export function isOverdue(isoDate: string | null): boolean {
  if (!isoDate) return false;
  const date = new Date(isoDate + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

/**
 * Returns true if the given ISO date string is today.
 */
export function isToday(isoDate: string | null): boolean {
  if (!isoDate) return false;
  const date = new Date(isoDate + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date.getTime() === today.getTime();
}

/**
 * Converts a JavaScript Date object to an ISO date string (YYYY-MM-DD).
 * Used when storing the result of a date picker.
 */
export function dateToISOString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats a timestamp for display (e.g. "Jul 21, 2026 at 9:00 AM").
 */
export function formatTimestamp(isoTimestamp: string): string {
  return new Date(isoTimestamp).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
