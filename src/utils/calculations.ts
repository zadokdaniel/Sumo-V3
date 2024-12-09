import { StaffData } from '../types/staff';

export function calculateEffectiveHours(member: StaffData): number {
  if (!member.startTime || !member.endTime) return 0;
  
  const start = new Date(`2000/01/01 ${member.startTime}`);
  const end = new Date(`2000/01/01 ${member.endTime}`);
  
  let totalMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
  totalMinutes -= parseInt(member.breakDuration || '0', 10);
  const hours = totalMinutes / 60;
  
  switch (member.role) {
    case 'waiter-100': return hours;
    case 'waiter-80': return hours * 0.8;
    case 'bartender': return hours * 0.7;
    case 'trainee': return hours * 0.5;
    default: return hours;
  }
}

export function calculateDistribution(
  staff: Record<string, StaffData>,
  totalTips: string
) {
  const totalEffectiveHours = Object.values(staff).reduce(
    (sum, member) => sum + calculateEffectiveHours(member),
    0
  );

  const totalExpenses = Object.values(staff).reduce(
    (sum, member) => sum + (parseFloat(member.expenses) || 0),
    0
  );

  const tips = (parseFloat(totalTips) || 0) + totalExpenses;
  const hourlyRate = totalEffectiveHours ? tips / totalEffectiveHours : 0;

  return {
    totalEffectiveHours,
    hourlyRate,
    totalExpenses,
    totalDistribution: tips
  };
}