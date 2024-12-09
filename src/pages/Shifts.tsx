import React from 'react';
import { Calendar, DollarSign, Clock, ChevronRight } from 'lucide-react';

const shifts = [
  {
    id: 1,
    date: '2024-03-15',
    totalTips: 1250.00,
    staff: 5,
    hours: 25,
  },
  {
    id: 2,
    date: '2024-03-14',
    totalTips: 980.50,
    staff: 4,
    hours: 20,
  },
];

export default function Shifts() {
  return (
    <div className="space-y-6">
      {/* Monthly Summary */}
      <div className="bg-white/80 rounded-xl p-6 shadow-lg backdrop-blur-sm">
        <h2 className="text-xl font-semibold text-purple-900 mb-4">March 2024</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-2xl font-bold text-purple-900">$12,450</div>
            <div className="text-sm text-gray-600">Total Tips</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-900">180</div>
            <div className="text-sm text-gray-600">Total Hours</div>
          </div>
        </div>
      </div>

      {/* Shift List */}
      <div className="space-y-4">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="bg-white/80 rounded-xl p-4 shadow-lg backdrop-blur-sm"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Calendar className="w-10 h-10 text-purple-600" />
                <div>
                  <div className="font-semibold text-gray-900">
                    {new Date(shift.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {shift.staff} staff · {shift.hours} hours
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <div className="font-semibold text-purple-900">
                    ${shift.totalTips.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-600">
                    ${(shift.totalTips / shift.hours).toFixed(2)}/hr
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}