/** "2026-08-31" -> "31.8.2026": Finnish order, no leading zeros */
export function formatIsoDate(isoDate: string): string {
  const [year, month, day] = isoDate.split("-").map(Number);
  return `${day}.${month}.${year}`;
}
