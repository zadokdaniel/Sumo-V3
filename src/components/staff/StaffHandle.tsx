import React from 'react';
import { Users } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StaffHandleProps {
  staffCount: number;
  onAddStaff: () => void;
  onClick?: () => void;
  className?: string;
}

export function StaffHandle({ 
  staffCount, 
  onAddStaff, 
  onClick, 
  className 
}: StaffHandleProps) {
  return (
    <div 
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={cn(
        "bg-white/90 border-t border-gray-100 p-4",
        onClick && "cursor-pointer hover:bg-white/95",
        "transition-colors duration-200",
        className
      )}
    >
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="flex items-center space-x-3">
          <Users className="w-5 h-5 text-purple-600" />
          <div>
            <h3 className="font-medium text-gray-900">
              {staffCount} Staff Member{staffCount !== 1 ? 's' : ''}
            </h3>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddStaff();
          }}
          className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
        >
          Add Staff
        </button>
      </div>
    </div>
  );
}