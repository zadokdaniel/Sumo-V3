import React, { useState } from 'react';
import { Settings, GlassWater, X, ArrowDown } from 'lucide-react';
import { cn } from '../lib/utils';
import { SettingsDetails } from './ui/settings-details';
import { StaffData } from './StaffMember';
import { SettingMode } from '../types/settings';

interface StaffConfigProps {
  config: {
    provision: {
      mode: 'auto' | 'off' | 'on';
      percentage: number;
    };
    multiplier: {
      mode: 'auto' | 'off' | 'on';
      value: number;
    };
    staffTypes: Array<{
      id: string;
      name: string;
      label: string;
      from: 'tips' | 'provision';
      calculation: 'fixed' | 'hours';
      amount: number;
      minWage: number;
    }>;
  };
  onChange: (config: any) => void;
  totalTips?: string;
  staff?: Record<string, StaffData>;
  date?: string;
  shift?: string;
}

function calculateHours(member: StaffData): number {
  if (!member.startTime || !member.endTime) return 0;
  const start = new Date(`2000/01/01 ${member.startTime}`);
  const end = new Date(`2000/01/01 ${member.endTime}`);
  let totalMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
  totalMinutes -= parseInt(member.breakDuration || '0', 10);
  return totalMinutes / 60;
}

export default function StaffConfig({ config, onChange, totalTips = '0', staff = {}, date = '', shift = '' }: StaffConfigProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'provisions' | 'multipliers' | 'thresholds'>('provisions');

  // Calculate if it's a weekend shift
  const isWeekendShift = React.useMemo(() => {
    const day = new Date(date).getDay();
    return (day === 5 && shift === 'PM') || (day === 6 && shift === 'AM');
  }, [date, shift]);

  // Calculate provision eligibility and related values
  const {
    hasBartender,
    bartenderCount,
    isProvisionEligible,
    provisionAmount,
    effectiveHourlyRate,
    belowMinWageStaff
  } = React.useMemo(() => {
    const tips = parseFloat(totalTips) || 0;
    const staffEntries = Object.entries(staff);
    
    const totalEffectiveHours = staffEntries.reduce((sum, [_, member]) => {
      const type = config.staffTypes.find(t => t.id === member.role);
      if (!type) return sum;
      
      const hours = calculateHours(member);
      return sum + (hours * (type.calculation === 'hours' ? type.amount : 1));
    }, 0);

    const hourlyRate = totalEffectiveHours > 0 ? tips / totalEffectiveHours : 0;
    const bartenders = staffEntries.filter(([_, member]) => member.role === 'bartender');
    const hasBartender = bartenders.length > 0;
    const isProvisionEligible = hasBartender && hourlyRate >= 40;
    
    return {
      hasBartender,
      bartenderCount: bartenders.length,
      isProvisionEligible,
      provisionAmount: isProvisionEligible ? tips * (config.provision.percentage / 100) : 0,
      effectiveHourlyRate: hourlyRate,
      belowMinWageStaff: staffEntries.filter(([_, member]) => {
        const type = config.staffTypes.find(t => t.id === member.role);
        if (!type) return false;
        return hourlyRate < type.minWage;
      })
    };
  }, [staff, totalTips, config]);

  // Calculate effective multiplier
  const extraPercentage = React.useMemo(() => {
    if (config.multiplier.mode === 'off') return 0;
    if (config.multiplier.mode === 'on') return (config.multiplier.value - 1) * 100;
    return isWeekendShift ? (config.multiplier.value - 1) * 100 : 0;
  }, [config.multiplier, isWeekendShift]);

  const handleModeChange = (setting: 'provision' | 'multiplier', mode: SettingMode) => {
    onChange({
      ...config,
      [setting]: {
        ...config[setting],
        mode
      }
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-3xl shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-purple-900">Settings</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <SettingsDetails
            icon={GlassWater}
            config={{
              mode: config.provision.mode,
              value: `${config.provision.percentage}%`,
              label: "Provision",
              effectiveStatus: config.provision.mode === 'auto'
                ? isProvisionEligible
                  ? `${bartenderCount} bartender${bartenderCount > 1 ? 's' : ''}`
                  : hasBartender
                    ? '<40₪/hr'
                    : 'No bartenders'
                : config.provision.mode === 'on'
                  ? `${bartenderCount} bartender${bartenderCount > 1 ? 's' : ''}`
                  : 'Disabled',
              amount: provisionAmount,
            }}
            onModeChange={(mode) => handleModeChange('provision', mode)}
          />

          <SettingsDetails
            icon={X}
            config={{
              mode: config.multiplier.mode,
              value: `${extraPercentage > 0 ? '+' : ''}${extraPercentage.toFixed(0)}%`,
              label: "Extra",
              effectiveStatus: config.multiplier.mode === 'auto'
                ? isWeekendShift
                  ? `${new Date(date).toLocaleDateString('en-US', { weekday: 'short' })} ${shift}`
                  : 'Weekday'
                : config.multiplier.mode === 'on'
                  ? 'Manual'
                  : 'Disabled',
            }}
            onModeChange={(mode) => handleModeChange('multiplier', mode)}
          />

          <SettingsDetails
            icon={ArrowDown}
            config={{
              mode: 'static',
              value: "32/35",
              label: "Min",
              effectiveStatus: belowMinWageStaff.length > 0
                ? `${belowMinWageStaff.length} below min`
                : 'Above min',
              details: `${effectiveHourlyRate.toFixed(0)}₪/hr`,
            }}
          />
        </div>
      </div>
    </div>
  );
}