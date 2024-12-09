import React, { useEffect, useRef } from 'react';
import { User, Clock, DollarSign, Trash2 } from 'lucide-react';
import TimeInput from './TimeInput';

interface StaffMemberProps {
  id: string;
  onUpdate: (id: string, updates: Partial<StaffData>) => void;
  onDelete: (id: string) => void;
  data: StaffData;
  totalTips: string;
  allStaff: Record<string, StaffData>;
  autoFocus?: boolean;
}

export interface StaffData {
  name: string;
  role: 'waiter-100' | 'waiter-80' | 'bartender' | 'trainee';
  startTime: string;
  endTime: string;
  breakDuration: string;
  expenses: string;
}

const roles = [
  { value: 'waiter-100', label: 'Waiter (100%)', color: 'bg-purple-100 text-purple-900' },
  { value: 'waiter-80', label: 'Waiter (80%)', color: 'bg-blue-100 text-blue-900' },
  { value: 'bartender', label: 'Bartender', color: 'bg-emerald-100 text-emerald-900' },
  { value: 'trainee', label: 'Trainee', color: 'bg-amber-100 text-amber-900' },
];

const breakOptions = [
  { value: '0', label: 'No Break' },
  { value: '15', label: '15 min' },
  { value: '30', label: '30 min' },
  { value: '45', label: '45 min' },
  { value: '60', label: '1 hour' },
];

export default function StaffMember({ 
  id, 
  onUpdate, 
  onDelete, 
  data, 
  totalTips, 
  allStaff, 
  autoFocus 
}: StaffMemberProps) {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoFocus) {
      cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => {
        nameInputRef.current?.focus();
      }, 300);
    }
  }, [autoFocus]);

  const calculateEffectiveHours = (staffMember: StaffData) => {
    if (!staffMember.startTime || !staffMember.endTime) return 0;
    
    const start = new Date(`2000/01/01 ${staffMember.startTime}`);
    const end = new Date(`2000/01/01 ${staffMember.endTime}`);
    
    let totalMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
    totalMinutes -= parseInt(staffMember.breakDuration || '0', 10);
    const hours = totalMinutes / 60;
    
    switch (staffMember.role) {
      case 'waiter-100': return hours;
      case 'waiter-80': return hours * 0.8;
      case 'bartender': return hours * 0.7;
      case 'trainee': return hours * 0.5;
      default: return hours;
    }
  };

  const calculateDistribution = () => {
    const totalEffectiveHours = Object.values(allStaff).reduce(
      (sum, member) => sum + calculateEffectiveHours(member),
      0
    );

    const totalExpenses = Object.values(allStaff).reduce(
      (sum, member) => sum + (parseFloat(member.expenses) || 0),
      0
    );

    const tips = (parseFloat(totalTips) || 0) + totalExpenses;
    const hourlyRate = totalEffectiveHours ? tips / totalEffectiveHours : 0;

    const effectiveHours = calculateEffectiveHours(data);
    const expenses = parseFloat(data.expenses) || 0;
    const share = hourlyRate * effectiveHours + expenses;

    return {
      effectiveHours,
      hourlyRate,
      share,
      expenses
    };
  };

  const distribution = calculateDistribution();
  const roleInfo = roles.find(r => r.value === data.role);
  const roleColor = roleInfo?.color || '';

  return (
    <div ref={cardRef} className="bg-white/90 rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-3 space-y-2">
        {/* Name and Role */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 flex-1">
            <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              ref={nameInputRef}
              type="text"
              value={data.name}
              onChange={(e) => onUpdate(id, { name: e.target.value })}
              placeholder="Staff Name"
              className="border-0 bg-transparent focus:ring-0 text-gray-900 font-medium placeholder:text-gray-400 w-full text-sm"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={data.role}
              onChange={(e) => onUpdate(id, { role: e.target.value as StaffData['role'] })}
              className={`text-xs px-2 py-0.5 rounded-full border-0 ${roleColor}`}
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => onDelete(id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Time and Break */}
        <div className="flex items-center space-x-2 text-sm">
          <Clock className="w-4 h-4 text-gray-400" />
          <TimeInput
            value={data.startTime}
            onChange={(time) => onUpdate(id, { startTime: time })}
            className="border-gray-200 focus:ring-purple-500 focus:border-purple-500"
          />
          <span className="text-gray-400">→</span>
          <TimeInput
            value={data.endTime}
            onChange={(time) => onUpdate(id, { endTime: time })}
            className="border-gray-200 focus:ring-purple-500 focus:border-purple-500"
          />
          <select
            value={data.breakDuration}
            onChange={(e) => onUpdate(id, { breakDuration: e.target.value })}
            className="border-gray-200 rounded focus:ring-purple-500 focus:border-purple-500 py-1 text-sm"
          >
            {breakOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Distribution Summary */}
        <div className="grid grid-cols-4 gap-1 text-sm">
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-xs text-gray-500">Hours</div>
            <div className="font-medium">{distribution.effectiveHours.toFixed(1)}h</div>
          </div>
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-xs text-gray-500">Rate</div>
            <div className="font-medium">${distribution.hourlyRate.toFixed(2)}</div>
          </div>
          <div className="bg-gray-50 rounded p-1.5">
            <div className="text-xs text-gray-500">Expenses</div>
            <div className="font-medium flex items-center">
              <DollarSign className="w-3 h-3" />
              <input
                type="number"
                value={data.expenses}
                onChange={(e) => onUpdate(id, { expenses: e.target.value })}
                className="w-full border-0 p-0 bg-transparent focus:ring-0 font-medium"
                style={{ minWidth: 0 }}
              />
            </div>
          </div>
          <div className={`${roleColor} rounded p-1.5`}>
            <div className="text-xs opacity-75">Total</div>
            <div className="font-medium">${distribution.share.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}