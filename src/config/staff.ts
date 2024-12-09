import { StaffConfig } from '../types/staff';

export const defaultConfig: StaffConfig = {
  provision: {
    mode: 'auto' as const,
    percentage: 5,
  },
  multiplier: {
    mode: 'auto' as const,
    value: 1.5,
  },
  staffTypes: [
    {
      id: 'waiter-100',
      name: 'Waiter',
      label: '100%',
      from: 'tips' as const,
      calculation: 'hours' as const,
      amount: 1,
      minWage: 32,
    },
    {
      id: 'waiter-80',
      name: 'Waiter',
      label: '80%',
      from: 'tips' as const,
      calculation: 'hours' as const,
      amount: 0.8,
      minWage: 32,
    },
    {
      id: 'bartender',
      name: 'Bartender',
      label: 'Bar',
      from: 'provision' as const,
      calculation: 'hours' as const,
      amount: 0.7,
      minWage: 35,
    },
    {
      id: 'trainee',
      name: 'Trainee',
      label: 'New',
      from: 'tips' as const,
      calculation: 'fixed' as const,
      amount: 32,
      minWage: 32,
    },
  ],
};