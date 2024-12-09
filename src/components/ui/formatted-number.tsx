import React from 'react';
import { cn } from '../../lib/utils';
import { formatNumber, locales } from '../../utils/currency';

interface FormattedNumberProps {
  value: number;
  currency?: boolean;
  unit?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  compact?: boolean;
  locale?: string;
}

const sizeClasses = {
  sm: {
    base: 'text-lg leading-none',
    decimal: 'text-sm leading-none',
  },
  md: {
    base: 'text-2xl leading-none',
    decimal: 'text-lg leading-none',
  },
  lg: {
    base: 'text-4xl leading-none',
    decimal: 'text-2xl leading-none',
  },
  xl: {
    base: 'text-6xl leading-none',
    decimal: 'text-4xl leading-none',
  },
};

export function FormattedNumber({ 
  value, 
  currency = false, 
  unit,
  size = 'md',
  className,
  compact = false,
  locale = 'he-IL'
}: FormattedNumberProps) {
  const localeConfig = locales[locale] || locales['he-IL'];

  // Format number based on type and compact mode
  let formattedValue: string;
  if (currency) {
    formattedValue = formatNumber(value, localeConfig, { compact });
  } else if (unit === '/hr') {
    formattedValue = formatNumber(value, localeConfig, { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  } else {
    const rounded = Math.round(value * 100) / 100;
    formattedValue = formatNumber(rounded, localeConfig, {
      minimumFractionDigits: 0,
      maximumFractionDigits: rounded % 1 === 0 ? 0 : 2,
    });
  }

  // Split into whole and decimal parts
  const [whole, decimal] = formattedValue.split(localeConfig.separator.decimal);
  const showDecimal = decimal !== undefined;

  return (
    <div className={cn(
      "flex items-baseline font-display tracking-tight",
      className
    )}>
      <span className={cn(
        sizeClasses[size].base,
        "font-bold tabular-nums"
      )}>
        {whole}
      </span>
      <div className={cn(
        "flex items-baseline font-normal tabular-nums",
        sizeClasses[size].decimal
      )}>
        {showDecimal && (
          <>
            <span className="mx-0.5">{localeConfig.separator.decimal}</span>
            <span>{decimal}</span>
          </>
        )}
        {(unit && !currency) && (
          <span className="ml-1 font-normal">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}