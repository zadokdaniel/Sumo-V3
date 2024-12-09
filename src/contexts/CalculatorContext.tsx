import React, { createContext, useContext, useState, useMemo } from 'react';
import { format } from 'date-fns';
import { StaffData, StaffConfig } from '../types/staff';
import { defaultConfig } from '../config/staff';
import { calculateEffectiveHours, calculateDistribution } from '../utils/calculations';

interface CalculatorContextType {
  // State
  date: string;
  shift: string;
  totalTips: string;
  staff: Record<string, StaffData>;
  lastAddedId: string | null;
  isDrawerOpen: boolean;
  isComplete: boolean;
  config: StaffConfig;
  effectiveMultiplier: number;

  // Actions
  setDate: (date: string) => void;
  setShift: (shift: string) => void;
  setTotalTips: (tips: string) => void;
  addStaffMember: () => void;
  updateStaffMember: (id: string, updates: Partial<StaffData>) => void;
  deleteStaffMember: (id: string) => void;
  setIsDrawerOpen: (isOpen: boolean) => void;
  setIsComplete: (isComplete: boolean) => void;
  updateConfig: (updates: Partial<StaffConfig>) => void;

  // Calculations
  calculateTotalHours: () => number;
  getDistributionSummary: () => {
    totalEffectiveHours: number;
    hourlyRate: number;
    totalExpenses: number;
    totalDistribution: number;
  };
}

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

export function CalculatorProvider({ children }: { children: React.ReactNode }) {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [shift, setShift] = useState('AM');
  const [totalTips, setTotalTips] = useState('');
  const [staff, setStaff] = useState<Record<string, StaffData>>({});
  const [lastAddedId, setLastAddedId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [config, setConfig] = useState(defaultConfig);

  const effectiveMultiplier = useMemo(() => {
    const day = new Date(date).getDay();
    const isWeekend = (day === 5 && shift === 'PM') || (day === 6 && shift === 'AM');
    
    if (config.multiplier.mode === 'off') return 1;
    if (config.multiplier.mode === 'on') return config.multiplier.value;
    return isWeekend ? config.multiplier.value : 1;
  }, [date, shift, config.multiplier]);

  const addStaffMember = () => {
    const id = crypto.randomUUID();
    setStaff(prev => {
      const newStaff: Record<string, StaffData> = {
        [id]: {
          name: '',
          role: 'waiter-100',
          startTime: '',
          endTime: '',
          breakDuration: '0',
          expenses: '0',
        }
      };
      Object.entries(prev).forEach(([key, value]) => {
        newStaff[key] = value;
      });
      return newStaff;
    });
    setLastAddedId(id);
    setIsDrawerOpen(true);
  };

  const updateStaffMember = (id: string, updates: Partial<StaffData>) => {
    setStaff(prev => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const deleteStaffMember = (id: string) => {
    setStaff(prev => {
      const newStaff = { ...prev };
      delete newStaff[id];
      return newStaff;
    });
  };

  const calculateTotalHours = () => {
    return Object.values(staff).reduce((sum, member) => {
      return sum + calculateEffectiveHours(member);
    }, 0);
  };

  const getDistributionSummary = () => {
    const totalEffectiveHours = Object.values(staff).reduce((sum, member) => {
      const type = config.staffTypes.find(t => t.id === member.role);
      if (!type) return sum;
      
      const hours = calculateEffectiveHours(member);
      return sum + (hours * (type.calculation === 'hours' ? type.amount : 1));
    }, 0);

    const totalExpenses = Object.values(staff).reduce(
      (sum, member) => sum + (parseFloat(member.expenses) || 0),
      0
    );

    const tips = (parseFloat(totalTips) || 0);
    const totalDistribution = tips + totalExpenses;
    const hourlyRate = totalEffectiveHours > 0 ? totalDistribution / totalEffectiveHours : 0;

    return {
      totalEffectiveHours,
      hourlyRate,
      totalExpenses,
      totalDistribution
    };
  };

  const updateConfig = (updates: Partial<StaffConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const value = {
    // State
    date,
    shift,
    totalTips,
    staff,
    lastAddedId,
    isDrawerOpen,
    isComplete,
    config,
    effectiveMultiplier,

    // Actions
    setDate,
    setShift,
    setTotalTips,
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    setIsDrawerOpen,
    setIsComplete,
    updateConfig,

    // Calculations
    calculateTotalHours,
    getDistributionSummary,
  };

  return (
    <CalculatorContext.Provider value={value}>
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
}