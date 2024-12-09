import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import {
  format,
  isAfter,
  isSameDay,
  isBefore,
  parseISO,
  subDays,
  addDays,
} from 'date-fns';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '../lib/utils';
import { getRelativeTimeText, getCurrentDate } from '../utils/date';
import { ShiftSelector } from './ui/shift-selector';
import { shifts, shiftThemes, ShiftType } from '../config/shifts';
import ShiftCompletion from './ShiftCompletion';
import { ShiftShortcuts } from './ui/shift-shortcuts';

interface ShiftDetailsProps {
  date: string;
  onDateChange: (date: string) => void;
  shift: string;
  onShiftChange: (shift: string) => void;
  isComplete?: boolean;
  onComplete?: () => void;
}

export default function ShiftDetails({
  date,
  onDateChange,
  shift,
  onShiftChange,
  isComplete,
  onComplete,
}: ShiftDetailsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(
    null
  );
  const currentTheme = shiftThemes[shift as ShiftType];
  const ShiftIcon = currentTheme.icon;
  const selectedDate = parseISO(date);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;

    // Only handle horizontal swipes
    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > 50 &&
      deltaTime < 300
    ) {
      if (deltaX > 0) {
        changeShift('prev');
      } else {
        changeShift('next');
      }
    }

    touchStartRef.current = null;
  };

  const changeShift = (direction: 'prev' | 'next') => {
    const current = selectedDate;
    const today = getCurrentDate();

    if (direction === 'next') {
      if (shift === 'AM' && isSameDay(current, today)) {
        onShiftChange('PM');
      } else if (!isSameDay(current, today) && isBefore(current, today)) {
        const nextDay = addDays(current, 1);
        if (!isAfter(nextDay, today)) {
          onDateChange(format(nextDay, 'yyyy-MM-dd'));
          onShiftChange('AM');
        }
      }
    } else {
      if (shift === 'PM') {
        onShiftChange('AM');
      } else {
        const prevDay = subDays(current, 1);
        onDateChange(format(prevDay, 'yyyy-MM-dd'));
        onShiftChange('PM');
      }
    }
  };

  const showNextButton = (() => {
    const today = getCurrentDate();
    if (isSameDay(selectedDate, today)) {
      return shift === 'AM';
    }
    return isBefore(selectedDate, today);
  })();

  const isShiftAvailable = (shiftType: ShiftType) => {
    const today = getCurrentDate();
    if (isAfter(selectedDate, today)) return false;
    if (isSameDay(selectedDate, today)) {
      return shiftType === 'AM' || (shiftType === 'PM' && shift === 'PM');
    }
    return true;
  };

  const handleShiftSelect = (newDate: string, newShift: string) => {
    onDateChange(newDate);
    onShiftChange(newShift);
    setIsOpen(false);
  };

  return (
    <div
      className="flex flex-col-reverse sm:flex-row gap-2"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={cn('flex-1 rounded-lg overflow-hidden', currentTheme.bg)}>
        <div className="flex justify-between items-stretch h-full">
          <button
            type="button"
            onClick={() => changeShift('prev')}
            className="px-3 text-gray-600 hover:text-gray-900 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <button
                className="flex-1 group cursor-pointer hover:bg-white/20 px-3 py-2 focus:outline-none focus:bg-white/20"
                onClick={() => setIsOpen(true)}
              >
                <div className="flex flex-col justify-center h-full">
                  <div className="flex items-center">
                    <ShiftIcon
                      className={cn(
                        'h-6 w-6 mr-1 me-3',
                        currentTheme.iconColor
                      )}
                    />

                    <div>
                      <span
                        className={cn(
                          'text-xs font-semibold',
                          currentTheme.text
                        )}
                      >
                        {format(selectedDate, 'EEE MMM dd').toUpperCase()}
                      </span>
                      <div className="text-[0.65rem] text-gray-500 mt-0.5 text-start">
                        {getRelativeTimeText(selectedDate)}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent
              className="w-[280px] p-0"
              align="start"
              sideOffset={8}
            >
              <ShiftShortcuts
                currentDate={date}
                currentShift={shift}
                onSelect={handleShiftSelect}
              />
              <div className="p-3">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(newDate) => {
                    if (newDate && !isAfter(newDate, getCurrentDate())) {
                      onDateChange(format(newDate, 'yyyy-MM-dd'));
                      setIsOpen(false);
                    }
                  }}
                  disabled={(date) => isAfter(date, getCurrentDate())}
                  initialFocus
                  showOutsideDays={false}
                />
              </div>
            </PopoverContent>
          </Popover>

          <div className="flex justify-end">
            <ShiftSelector
              shifts={shifts}
              currentShift={shift}
              onShiftChange={onShiftChange}
              isShiftAvailable={isShiftAvailable}
            />
          </div>

          <button
            type="button"
            disabled={!showNextButton}
            onClick={() => changeShift('next')}
            className={cn(
              'px-3 transition-colors',
              showNextButton
                ? 'text-gray-600 hover:text-gray-900 hover:bg-white/20'
                : 'text-gray-400 cursor-not-allowed'
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {isComplete ? (
        <div
          className={cn(
            'flex items-center px-4 rounded-lg',
            'bg-gray-100 text-gray-500'
          )}
        >
          <Lock className="w-5 h-5" />
        </div>
      ) : (
        onComplete && (
          <div className="sm:w-auto w-full">
            <ShiftCompletion onComplete={onComplete} variant="secondary" />
          </div>
        )
      )}
    </div>
  );
}