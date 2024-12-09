import { Shift, StaffMember } from '../types/shift';

export interface ProvisionResult {
  amount: number;
  reason: string | null;
  distributions: Array<{
    name: string;
    amount: number;
    netEarnings: number;
  }>;
}

export function calculateProvision(
  shift: Shift,
  totalHours: number,
  totalDistribution: number
): ProvisionResult {
  const bartenders = shift.staff.filter(staff => staff.type === "bar");
  let amount = 0;
  let reason: string | null = null;

  if (shift.rules.provision.isApplicable) {
    if (bartenders.length === 0) {
      reason = "No bartenders";
    } else if (totalHours < shift.rules.provision.hourlyMinThreshold) {
      reason = `<${shift.rules.provision.hourlyMinThreshold} an hour`;
    } else {
      amount = Math.floor(shift.rules.provision.value * totalDistribution);
    }
  } else {
    reason = "Disabled";
  }

  const distributions = bartenders.map(bartender => {
    const individualProvision = Math.floor(amount / bartenders.length);
    return {
      name: bartender.name,
      amount: individualProvision,
      netEarnings: individualProvision - bartender.expenses
    };
  });

  return { amount, reason, distributions };
}