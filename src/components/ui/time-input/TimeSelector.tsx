import React, { useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { parseTime, formatTime, generateTimeOptions } from './utils';

interface TimeSelectorProps {
  selectedTime: string;
  minTime?: string;
  onSelect: (time: string) => void;
  onClose: () => void;
}

export function TimeSelector({
  selectedTime,
  minTime,
  onSelect,
  onClose
}: TimeSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (selectedRef.current) {
      selectedRef.current.scrollIntoView({
        block: 'center',
        behavior: 'instant'
      });
    }
  }, []);

  const timeOptions = generateTimeOptions(15, minTime);

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-[998]"
        onClick={onClose}
      />
      <div
        ref={containerRef}
        className="absolute z-[999] w-48 bg-white rounded-lg shadow-xl border"
        style={{
          left: '50%',
          transform: 'translateX(-50%)',
          top: 'calc(100% + 4px)',
        }}
      >
        <div className="max-h-64 overflow-y-auto overscroll-contain">
          {timeOptions.map((time) => {
            const isSelected = time === selectedTime;
            const isDisabled = minTime && parseTime(time) < parseTime(minTime);

            return (
              <button
                key={time}
                ref={isSelected ? selectedRef : null}
                onClick={() => {
                  onSelect(time);
                  onClose();
                }}
                disabled={isDisabled}
                className={cn(
                  "w-full px-3 py-2 text-sm text-left",
                  "hover:bg-purple-50 disabled:hover:bg-transparent",
                  "transition-colors duration-100",
                  isSelected && "bg-purple-100 text-purple-900 font-medium",
                  isDisabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {formatTime(time)}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}