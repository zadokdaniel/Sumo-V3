export function parseTime(timeStr: string): Date | null {
  if (!timeStr) return null;

  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;

  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function formatTime(time: string | Date): string {
  if (!time) return '--:--';

  const date = typeof time === 'string' ? parseTime(time) : time;
  if (!date) return '--:--';

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export function addMinutes(date: Date, minutes: number): Date {
  const newDate = new Date(date);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
}

export function generateTimeOptions(
  interval: number = 15,
  minTime?: string
): string[] {
  const times: string[] = [];
  const start = minTime ? parseTime(minTime) : new Date().setHours(0, 0, 0, 0);
  const end = new Date().setHours(23, 59, 59, 999);

  if (!start) return times;

  let current = new Date(start);
  while (current.getTime() <= end) {
    times.push(formatTime(current));
    current = addMinutes(current, interval);
  }

  return times;
}