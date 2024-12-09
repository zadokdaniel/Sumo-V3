import React, { useState } from 'react';
import { Check, Share } from 'lucide-react';
import { cn } from '../lib/utils';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert-dialog';

interface ShiftCompletionProps {
  onComplete: () => void;
  variant?: 'primary' | 'secondary';
}

export default function ShiftCompletion({
  onComplete,
  variant = 'primary',
}: ShiftCompletionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);
  const [isCashDistributed, setIsCashDistributed] = useState(false);
  const [isSummaryShared, setIsSummaryShared] = useState(false);

  const handleComplete = () => {
    setIsOpen(false);
    onComplete();
  };

  const handleShareSummary = async () => {
    // Format the summary text
    const summaryText = encodeURIComponent(`Shift Summary
Total Tips: ₪1,250
Staff Members: 5
Average Rate: ₪45/hr

Distribution:
- John (Waiter): ₪320
- Sarah (Bartender): ₪280
- Mike (Waiter): ₪250
- Emma (Trainee): ₪200
- David (Waiter): ₪200`);

    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/?text=${summaryText}`, '_blank');
    setIsSummaryShared(true);
  };

  const canComplete = isReviewed && isCashDistributed && isSummaryShared;

  return (
    <>
      <div className="flex justify-center w-full">
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2',
            variant === 'primary'
              ? 'w-full h-[50%] bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-purple-100 text-purple-900 hover:bg-purple-200'
          )}
        >
          <Check className="w-4 h-4" />
          {variant === 'primary' ? 'Complete Shift' : 'Complete'}
        </button>
      </div>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Complete Shift</AlertDialogTitle>
            <AlertDialogDescription>
              Please confirm the following steps before completing the shift:
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-4 py-4">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isReviewed}
                onChange={(e) => setIsReviewed(e.target.checked)}
                className="mt-1 text-purple-600 focus:ring-purple-500"
              />
              <div>
                <div className="font-medium text-gray-900 group-hover:text-gray-700">
                  I have reviewed all calculations
                </div>
                <div className="text-sm text-gray-500">
                  All staff members, hours, and tips are correctly entered
                </div>
              </div>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isCashDistributed}
                onChange={(e) => setIsCashDistributed(e.target.checked)}
                className="mt-1 text-purple-600 focus:ring-purple-500"
              />
              <div>
                <div className="font-medium text-gray-900 group-hover:text-gray-700">
                  I have distributed the cash
                </div>
                <div className="text-sm text-gray-500">
                  Tips have been counted and distributed according to
                  calculations
                </div>
              </div>
            </label>

            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={isSummaryShared}
                readOnly
                className="mt-1 text-purple-600 focus:ring-purple-500"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">Share summary</div>
                  <button
                    onClick={handleShareSummary}
                    disabled={isSummaryShared}
                    className={cn(
                      'flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-md',
                      !isSummaryShared
                        ? 'bg-purple-100 text-purple-900 hover:bg-purple-200'
                        : 'bg-gray-100 text-gray-500 cursor-not-allowed'
                    )}
                  >
                    <Share className="w-4 h-4" />
                    {isSummaryShared ? 'Shared' : 'Share to WhatsApp'}
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  Send the shift summary to the staff WhatsApp group
                </div>
              </div>
            </div>
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleComplete}
              disabled={!canComplete}
              className={cn(!canComplete && 'opacity-50 cursor-not-allowed')}
            >
              Complete Shift
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}