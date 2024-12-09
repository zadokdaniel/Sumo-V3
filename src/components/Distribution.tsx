import React from 'react';
import { StaffData } from './StaffMember';

interface DistributionProps {
  staff: Record<string, StaffData>;
  totalTips: string;
}

export default function Distribution({ staff, totalTips }: DistributionProps) {
  const calculateEffectiveHours = (staffMember: StaffData) => {
    if (!staffMember.startTime || !staffMember.endTime) return 0;
    
    const start = new Date(`2000/01/01 ${staffMember.startTime}`);
    const end = new Date(`2000/01/01 ${staffMember.endTime}`);
    
    let totalMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
    totalMinutes -= parseInt(staffMember.breakDuration || '0', 10);
    const hours = totalMinutes / 60;
    
    switch (staffMember.role) {
      case 'waiter-100':
        return hours;
      case 'waiter-80':
        return hours * 0.8;
      case 'bartender':
        return hours * 0.7;
      case 'trainee':
        return hours * 0.5;
      default:
        return hours;
    }
  };

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

  return (
    <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-purple-900 mb-4">Distribution</h2>
      <div className="space-y-4">
        {Object.entries(staff).map(([id, member]) => {
          const effectiveHours = calculateEffectiveHours(member);
          const expenses = parseFloat(member.expenses) || 0;
          const share = hourlyRate * effectiveHours + expenses;
          
          return (
            <div key={id} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <div>
                <div className="font-medium text-gray-900">{member.name || 'Unnamed'}</div>
                <div className="text-sm text-gray-600">
                  {effectiveHours.toFixed(1)} effective hours · {member.role.replace('-', ' ')}
                  {expenses > 0 && ` · $${expenses} expenses`}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-purple-900">${share.toFixed(2)}</div>
                <div className="text-sm text-gray-600">${hourlyRate.toFixed(2)}/hr</div>
              </div>
            </div>
          );
        })}

        <div className="pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Tips + Expenses:</span>
            <span>${tips.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Effective Hours:</span>
            <span>{totalEffectiveHours.toFixed(1)}h</span>
          </div>
          <div className="flex justify-between font-medium text-purple-900 mt-1">
            <span>Average Hourly Rate:</span>
            <span>${hourlyRate.toFixed(2)}/hr</span>
          </div>
        </div>
      </div>
    </div>
  );
}