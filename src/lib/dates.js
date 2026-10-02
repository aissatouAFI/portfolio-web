const MONTHS = [
  'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
  'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre',
];

export function formatMonthYear(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDateRange(start, end) {
  const startLabel = formatMonthYear(start);
  const endLabel = end ? formatMonthYear(end) : "Aujourd'hui";
  return `${startLabel} — ${endLabel}`;
}
