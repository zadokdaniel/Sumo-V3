import React from 'react';
import { Users } from 'lucide-react';
import { StaffData } from './StaffMember';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';
import StaffMember from './StaffMember';

interface StaffDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  staff: Record<string, StaffData>;
  onAddStaff: () => void;
  onUpdateStaff: (id: string, updates: Partial<StaffData>) => void;
  onDeleteStaff: (id: string) => void;
  totalTips: string;
  lastAddedId: string | null;
}

export default function StaffDrawer({
  isOpen,
  onOpenChange,
  staff,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff,
  totalTips,
  lastAddedId,
}: StaffDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[85vh] sm:h-[95vh]">
        <DrawerHeader className="border-b border-gray-100">
          <DrawerTitle>
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
          </DrawerTitle>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
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
      </DrawerContent>
    </Drawer>
  );
}