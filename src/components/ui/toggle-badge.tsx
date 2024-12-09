import React from 'react';
import { cn } from '../../lib/utils';

interface ToggleBadgeProps {
  mode: 'auto' | 'manual' | 'off' | 'on';
  onClick?: () => void;
  className?: string;
}

const modeStyles = {
  auto: 'bg-blue-100 text-blue-900',
  manual: 'bg-purple-100 text-purple-900',
  off: 'bg-gray-100 text-gray-900',
  on: 'bg-green-100 text-green-900',
};

export function ToggleBadge({ mode, onClick, className }: ToggleBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-medium transition-colors",
        modeStyles[mode],
        onClick && "hover:opacity-90",
        className
      )}
    >
      {mode.charAt(0).toUpperCase() + mode.slice(1)}
    </button>
  );
}