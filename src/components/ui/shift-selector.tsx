import React from 'react';
import { cn } from '../../lib/utils';
import { shiftThemes, ShiftType } from '../../config/shifts';

interface ShiftSelectorProps {
  shifts: readonly ShiftType[];
  currentShift: string;
  onShiftChange: (shift: ShiftType) => void;
  isShiftAvailable: (shift: ShiftType) => boolean;
}

export function ShiftSelector({
  shifts,
  currentShift,
  onShiftChange,
  isShiftAvailable,
}: ShiftSelectorProps) {
  return (
    <div className="flex items-stretch h-[75%] my-auto">
      {shifts.map((s) => {
        const theme = shiftThemes[s];
        const Icon = theme.icon;
        const available = isShiftAvailable(s);

        return (
          <button
            key={s}
            onClick={() => {
              if (available) {
                onShiftChange(s);
              }
            }}
            className={cn(
              'flex items-center gap-1.5 px-4 mx-0.5 rounded-lg transition-colors',
              available
                ? currentShift === s
                  ? cn(theme.selectedBg, theme.text, 'font-medium')
                  : 'text-gray-600 hover:bg-white/20 hover:text-gray-900'
                : 'opacity-50 cursor-not-allowed'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">{s}</span>
          </button>
        );
      })}
    </div>
  );
}
