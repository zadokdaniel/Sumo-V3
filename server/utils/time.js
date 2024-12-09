export function parseTime(timeStr) {
  if (!timeStr) return null;
  const [hours, minutes] = timeStr.split(':').map(Number);
  if (isNaN(hours) || isNaN(minutes)) return null;
  return { hours, minutes };
}

export function validateTimeRange(startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  
  if (!start || !end) return false;
  
  const startMinutes = start.hours * 60 + start.minutes;
  const endMinutes = end.hours * 60 + end.minutes;
  
  return endMinutes > startMinutes;
}

export function calculateDuration(startTime, endTime) {
  const start = parseTime(startTime);
  const end = parseTime(endTime);
  
  if (!start || !end) return 0;
  
  const startMinutes = start.hours * 60 + start.minutes;
  const endMinutes = end.hours * 60 + end.minutes;
  
  return (endMinutes - startMinutes) / 60;
}