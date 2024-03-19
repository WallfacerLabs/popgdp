const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});

export function formatDate(date: Date) {
  return dateFormatter.format(date);
}

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  year: "2-digit",
  month: "short",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

export function formatTime(date: Date) {
  return timeFormatter.format(date);
}

export function formatDateRange(from: Date, to: Date) {
  return `${formatDate(from)} - ${formatDate(to)}`;
}

export function getStartOfDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(date: Date, days: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
}
