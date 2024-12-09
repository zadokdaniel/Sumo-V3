import React, { useMemo } from 'react';
import { User, ArrowRight, Clock, Percent, DollarSign, ArrowDown } from 'lucide-react';
import { StaffData } from './StaffMember';
import { FormattedNumber } from './ui/formatted-number';
import { cn } from '../lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface StaffSummaryProps {
  staff: Record<string, StaffData>;
  totalTips: string;
  config: {
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
  effectiveMultiplier: number;
}

function calculateHours(member: StaffData): number {
  if (!member.startTime || !member.endTime) return 0;
  const start = new Date(`2000/01/01 ${member.startTime}`);
  const end = new Date(`2000/01/01 ${member.endTime}`);
  let totalMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
  totalMinutes -= parseInt(member.breakDuration || '0', 10);
  return totalMinutes / 60;
}

export default function StaffSummary({ staff, totalTips, config, effectiveMultiplier }: StaffSummaryProps) {
  const { staffMembers, hourlyRate } = useMemo(() => {
    const tips = parseFloat(totalTips) || 0;
    const entries = Object.entries(staff);
    
    const totalEffectiveHours = entries.reduce((sum, [_, member]) => {
      const type = config.staffTypes.find(t => t.id === member.role);
      if (!type) return sum;
      
      const hours = calculateHours(member);
      return sum + (hours * (type.calculation === 'hours' ? type.amount : 1));
    }, 0);

    return {
      staffMembers: entries,
      hourlyRate: totalEffectiveHours > 0 ? tips / totalEffectiveHours : 0
    };
  }, [staff, totalTips, config.staffTypes]);

  if (staffMembers.length === 0) {
    return (
      <div className="bg-white/90 rounded-lg border border-gray-100 p-3 text-center">
        <div className="text-xs text-gray-500">No staff members added yet</div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 rounded-lg border border-gray-100 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Staff Member</TableHead>
            <TableHead>Hours</TableHead>
            <TableHead>Rate</TableHead>
            <TableHead>Expenses</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffMembers.map(([id, member]) => {
            const type = config.staffTypes.find(t => t.id === member.role);
            if (!type) return null;

            const hours = calculateHours(member);
            const effectiveHours = hours * (type.calculation === 'hours' ? type.amount : 1);
            const expenses = parseFloat(member.expenses) || 0;
            const minWage = type.minWage * effectiveMultiplier;
            
            const cashEarned = (hourlyRate * effectiveHours);
            const totalEarned = cashEarned + expenses;
            const shouldEarn = Math.max(hours * minWage, totalEarned);
            const completion = Math.max(0, shouldEarn - totalEarned);

            return (
              <TableRow key={id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="relative flex-shrink-0">
                      <User className="w-3.5 h-3.5 text-gray-400" />
                      <div className={cn(
                        "absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full ring-1 ring-white",
                        type.from === 'provision' ? "bg-purple-500" : "bg-blue-500"
                      )} />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{member.name || 'Unnamed'}</span>
                      <span className={cn(
                        "px-1.5 py-0.5 rounded-full text-[0.65rem] font-medium w-fit",
                        type.from === 'provision' ? "bg-purple-50 text-purple-700" : "bg-blue-50 text-blue-700"
                      )}>
                        {type.label}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <FormattedNumber value={hours} unit="hrs" size="sm" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                    <FormattedNumber value={hourlyRate} currency unit="/hr" size="sm" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm">
                    <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                    <FormattedNumber value={expenses} currency size="sm" />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex flex-col items-end">
                      <FormattedNumber 
                        value={totalEarned} 
                        currency 
                        size="sm"
                        className="text-gray-900" 
                      />
                      <div className="text-[0.65rem] text-gray-500">
                        min: <FormattedNumber 
                          value={shouldEarn} 
                          currency 
                          size="sm"
                          className="text-gray-500" 
                        />
                      </div>
                    </div>
                    {completion > 0 && (
                      <div className="flex items-center gap-1 bg-purple-50 rounded-lg px-2 py-1">
                        <ArrowDown className="w-3 h-3 text-purple-600" />
                        <FormattedNumber 
                          value={completion} 
                          currency 
                          size="sm"
                          className="text-purple-700" 
                        />
                      </div>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}