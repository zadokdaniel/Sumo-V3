import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

interface ShiftShortcutProps {
  date: Date;
  currentDate: string;
  currentShift: string;
  onSelect: (date: string, shift: string) => void;
  label: string;
}

export function ShiftShortcut({ 
  date, 
  currentDate, 
  currentShift, 
  onSelect, 
  label 
}: ShiftShortcutProps) {
  const formattedDate = format(date, 'yyyy-MM-dd');
  const isCurrentDay = formattedDate === currentDate;

  return (
    <div className="flex items-center gap-2">
      <div className="text-xs font-medium text-gray-500 w-16">{label}</div>
      <div className="flex gap-1 flex-1">
        <button
          onClick={() => onSelect(formattedDate, 'AM')}
          className={cn(
            "flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-1",
            isCurrentDay && currentShift === 'AM'
              ? "bg-amber-100 text-amber-900"
              : "hover:bg-gray-100 text-gray-600"
          )}
        >
          <Sun className="w-3.5 h-3.5" />
          <span>AM</span>
        </button>
        <button
          onClick={() => onSelect(formattedDate, 'PM')}
          className={cn(
            "flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex-1",
            isCurrentDay && currentShift === 'PM'
              ? "bg-blue-100 text-blue-900"
              : "hover:bg-gray-100 text-gray-600"
          )}
        >
          <Moon className="w-3.5 h-3.5" />
          <span>PM</span>
        </button>
      </div>
    </div>
  );
}

interface ShiftShortcutsProps {
  currentDate: string;
  currentShift: string;
  onSelect: (date: string, shift: string) => void;
}

export function ShiftShortcuts({ currentDate, currentShift, onSelect }: ShiftShortcutsProps) {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <div className="p-3 border-b space-y-2">
      <ShiftShortcut
        date={today}
        currentDate={currentDate}
        currentShift={currentShift}
        onSelect={onSelect}
        label="Today"
      />
      <ShiftShortcut
        date={yesterday}
        currentDate={currentDate}
        currentShift={currentShift}
        onSelect={onSelect}
        label="Yesterday"
      />
    </div>
  );
}