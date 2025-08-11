import { format, getTime, formatDistanceToNow, parseISO } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat, config) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm, { ...config }) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function convertToDate(date) {
  if (typeof date === 'string') {
    return parseISO(date);
  }
  return date;
}

export function isDateisToday(date) {
  const today = new Date();
  const dateObj = new Date(date);

  return today.getDate() === dateObj.getDate();
}

export function fDateRange(date) {
  const { startDate, endDate } = date;

  if (!startDate || !endDate) return undefined;

  const fm = 'dd MMM';

  const start = fDate(startDate, fm);
  const end = fDate(endDate, fm);

  return start + ' - ' + end;
}

export function isPastDate(date) {
  const today = new Date();
  const dateObj = new Date(date);

  // Reset hours, minutes, seconds, and milliseconds for an accurate comparison
  today.setHours(0, 0, 0, 0);
  dateObj.setHours(0, 0, 0, 0);

  // Compare the full date (year, month, day)
  return dateObj < today;
}
