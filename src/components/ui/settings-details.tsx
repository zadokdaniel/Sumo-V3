import React from 'react';
import { cn } from '../../lib/utils';
import { FormattedNumber } from './formatted-number';
import { SettingMode, SettingModeConfig, SettingModeColors } from '../../types/settings';

const defaultColors: SettingModeColors = {
  auto: {
    badge: "bg-blue-50 text-blue-700",
    text: "bg-blue-500",
  },
  on: {
    badge: "bg-green-50 text-green-700",
    text: "bg-green-500",
  },
  off: {
    badge: "bg-gray-50 text-gray-700",
    text: "bg-gray-400",
  },
  static: {
    badge: "bg-purple-50 text-purple-700",
    text: "bg-purple-500",
  },
};

interface SettingsDetailsProps {
  config: SettingModeConfig;
  icon: React.ElementType;
  onModeChange?: (mode: SettingMode) => void;
  colors?: Partial<SettingModeColors>;
  className?: string;
}

export function SettingsDetails({
  config,
  icon: Icon,
  onModeChange,
  colors = defaultColors,
  className,
}: SettingsDetailsProps) {
  const handleClick = () => {
    if (config.mode === 'static' || !onModeChange) return;

    const modes: SettingMode[] = ['auto', 'off', 'on'];
    const currentIndex = modes.indexOf(config.mode as SettingMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    onModeChange(nextMode);
  };

  const modeColors = { ...defaultColors, ...colors };
  const currentColors = modeColors[config.mode];

  return (
    <div
      role={onModeChange ? "button" : "article"}
      tabIndex={onModeChange ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (onModeChange && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          handleClick();
        }
      }}
      className={cn(
        "group w-full text-left",
        onModeChange && "cursor-pointer",
        "bg-white/80 hover:bg-white",
        "rounded-lg p-3 transition-colors",
        "focus:outline-none focus:ring-2 focus:ring-purple-500/50",
        "border border-gray-100",
        className
      )}
    >
      <div className="space-y-2">
        {/* Header - Icon and Mode */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Icon className="w-4 h-4 text-gray-600" />
              <div className={cn(
                "absolute -top-1 -right-1 w-2 h-2 rounded-full ring-2 ring-white",
                currentColors.text
              )} />
            </div>
            <div className={cn(
              "px-1.5 py-0.5 rounded-full text-[0.65rem] font-medium uppercase tracking-wide",
              currentColors.badge
            )}>
              {config.mode}
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <div className="text-lg font-semibold tabular-nums">
              {typeof config.value === 'number' ? (
                <FormattedNumber value={config.value} currency={false} />
              ) : config.value}
            </div>
            <div className="text-xs text-gray-500">{config.label}</div>
          </div>
        </div>

        {/* Status and Details */}
        {(config.effectiveStatus || config.amount !== undefined || config.details) && (
          <div className="flex items-baseline justify-between">
            <div className="text-sm font-medium text-purple-700">
              {config.effectiveStatus}
            </div>
            <div className="flex items-baseline gap-2">
              {config.amount !== undefined && (
                <FormattedNumber 
                  value={config.amount} 
                  currency={true}
                  size="sm"
                  className="text-purple-700"
                  compact={config.amount >= 1000}
                />
              )}
              {config.details && (
                <span className="text-xs text-gray-500 tabular-nums">
                  {config.details}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}