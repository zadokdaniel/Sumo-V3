export function calculateMinutes(start: string | null, end: string | null): number {
  if (!start || !end) return 0;
  return (new Date(end).getTime() - new Date(start).getTime()) / 60000;
}

export function calculateHoursWorked(
  start: string | null,
  end: string | null,
  breaks: number | null
): number {
  if (!start || !end) return 0;
  const workedMinutes = calculateMinutes(start, end) - (breaks || 0);
  return workedMinutes / 60;
}