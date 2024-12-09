import React from 'react';
import { cn } from '../../../lib/utils';
import { Clock } from 'lucide-react';

interface TimeDisplayProps {
  time: string;
  error?: string;
  onClick: () => void;
  onWheel: (e: React.WheelEvent) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  disabled?: boolean;
}

export function TimeDisplay({
  time,
  error,
  onClick,
  onWheel,
  onKeyDown,
  disabled = false
}: TimeDisplayProps) {
  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 border rounded",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
        error 
          ? "border-red-300 hover:border-red-400 text-red-900"
          : "border-gray-200 hover:border-gray-300 text-gray-900",
        disabled
          ? "bg-gray-50 cursor-not-allowed"
          : "bg-white cursor-pointer"
      )}
      onClick={onClick}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
    >
      <Clock className="w-4 h-4 text-gray-400" />
      <span className="tabular-nums">{time}</span>
    </div>
  );
}