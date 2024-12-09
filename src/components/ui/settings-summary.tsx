import React from 'react';
import { cn } from '../../lib/utils';
import { FormattedNumber } from './formatted-number';

interface SettingsSummaryItemProps {
  icon: React.ElementType;
  mode: 'auto' | 'manual' | 'off' | 'on';
  value: string;
  label: string;
  amount?: number;
  details?: string;
  onClick?: () => void;
  asChild?: boolean;
}

export function SettingsSummaryItem({ 
  icon: Icon,
  mode,
  value,
  label,
  amount,
  details,
  onClick,
  asChild = false
}: SettingsSummaryItemProps) {
  const Element = asChild ? 'div' : 'button';
  
  return (
    <Element 
      onClick={!asChild ? onClick : undefined}
      className={cn(
        "flex items-start gap-2 p-2 rounded-lg transition-colors text-left",
        onClick && !asChild && "hover:bg-black/5"
      )}
    >
      <div className="relative">
        <Icon className="w-5 h-5 text-purple-600" />
        <div className={cn(
          "absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white",
          mode === 'auto' ? "bg-blue-500" :
          mode === 'on' ? "bg-green-500" :
          mode === 'off' ? "bg-gray-300" :
          "bg-purple-500"
        )} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1">
          <div className="font-medium">{value}</div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
        {(amount !== undefined || details) && (
          <div className="text-sm text-purple-600">
            {amount !== undefined && (
              <FormattedNumber 
                value={amount} 
                currency={true} 
                size="sm"
              />
            )}
            {details && <span className="text-gray-500 text-xs"> · {details}</span>}
          </div>
        )}
      </div>
    </Element>
  );
}