import React from 'react';
import StaffMember, { StaffData } from '../StaffMember';

interface StaffListProps {
  staff: Record<string, StaffData>;
  onUpdateStaff: (id: string, updates: Partial<StaffData>) => void;
  onDeleteStaff: (id: string) => void;
  totalTips: string;
  lastAddedId: string | null;
}

export function StaffList({
  staff,
  onUpdateStaff,
  onDeleteStaff,
  totalTips,
  lastAddedId,
}: StaffListProps) {
  return (
    <div className="space-y-3">
      {Object.entries(staff).map(([id, data]) => (
        <StaffMember
          key={id}
          id={id}
          data={data}
          onUpdate={onUpdateStaff}
          onDelete={onDeleteStaff}
          totalTips={totalTips}
          allStaff={staff}
          autoFocus={id === lastAddedId}
        />
      ))}
    </div>
  );
}