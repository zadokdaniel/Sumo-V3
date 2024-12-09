import React from 'react';
import { StaffData } from '../StaffMember';
import { StaffList } from './StaffList';
import { StaffHandle } from './StaffHandle';

interface StaffPanelProps {
  staff: Record<string, StaffData>;
  onAddStaff: () => void;
  onUpdateStaff: (id: string, updates: Partial<StaffData>) => void;
  onDeleteStaff: (id: string) => void;
  totalTips: string;
  lastAddedId: string | null;
}

export function StaffPanel({
  staff,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff,
  totalTips,
  lastAddedId,
}: StaffPanelProps) {
  return (
    <div className="hidden lg:block bg-white/90 rounded-lg border border-gray-100 h-[calc(100vh-7rem)] sticky top-24">
      <StaffHandle
        staffCount={Object.keys(staff).length}
        onAddStaff={onAddStaff}
        className="border-b rounded-t-lg"
      />
      <div className="p-4 h-[calc(100%-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <StaffList
          staff={staff}
          onUpdateStaff={onUpdateStaff}
          onDeleteStaff={onDeleteStaff}
          totalTips={totalTips}
          lastAddedId={lastAddedId}
        />
      </div>
    </div>
  );
}