export function kstToday(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Seoul' }).format(now);
}
export function publicationDates(start = '', end = '', today = kstToday()) {
  if (!start && !end) return [today];
  const valid = date => /^\d{4}-\d{2}-\d{2}$/.test(date) && !Number.isNaN(Date.parse(date)) && new Date(date).toISOString().slice(0, 10) === date;
  if (!valid(start) || !valid(end) || start > end || end > today) throw new Error('Backfill requires valid ordered dates, not in the future');
  const count = (Date.parse(end) - Date.parse(start)) / 86400000 + 1;
  if (count > 14) throw new Error('Backfill is limited to 14 days per run');
  return Array.from({ length: count }, (_, i) => new Date(Date.parse(start) + i * 86400000).toISOString().slice(0, 10));
}
export const missingDates = (dates, posts) => dates.filter(date => !posts.some(p => p.date === date && p.published === true && p.automated === true));
