export interface StaffConfig {
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
}

export interface StaffData {
  name: string;
  role: 'waiter-100' | 'waiter-80' | 'bartender' | 'trainee';
  startTime: string;
  endTime: string;
  breakDuration: string;
  expenses: string;
}