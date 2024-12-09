import React from 'react';
import { Users } from 'lucide-react';
import { StaffData } from './StaffMember';
import StaffMember from './StaffMember';

interface StaffListProps {
  staff: Record<string, StaffData>;
  onAddStaff: () => void;
  onUpdateStaff: (id: string, updates: Partial<StaffData>) => void;
  onDeleteStaff: (id: string) => void;
  totalTips: string;
  lastAddedId: string | null;
}

export default function StaffList({
  staff,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff,
  totalTips,
  lastAddedId,
}: StaffListProps) {
  return (
    <div className="bg-white/90 rounded-lg border border-gray-100 h-[calc(100vh-7rem)] sticky top-24">
      <div className="border-b border-gray-100 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <h3 className="font-medium text-gray-900">
                {Object.keys(staff).length} Staff Members
              </h3>
            </div>
          </div>
          <button
            onClick={onAddStaff}
            className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
          >
            Add Staff
          </button>
        </div>
      </div>
      <div className="p-4 space-y-3 h-[calc(100%-4rem)] overflow-y-auto">
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
    </div>
  );
}