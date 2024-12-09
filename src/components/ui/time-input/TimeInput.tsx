import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../../lib/utils';
import { TimeDisplay } from './TimeDisplay';
import { TimeSelector } from './TimeSelector';
import { useTimeInput } from './useTimeInput';
import { parseTime, formatTime, addMinutes } from './utils';

export interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
  minTime?: string;
  className?: string;
  disabled?: boolean;
}

export function TimeInput({
  value,
  onChange,
  minTime,
  className,
  disabled = false,
}: TimeInputProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const inputRef = useRef<HTMLDivElement>(null);
  const {
    handleKeyDown,
    handleWheel,
    handleTimeSelect,
    formattedTime,
    error
  } = useTimeInput({
    value,
    onChange,
    minTime,
    setIsSelecting
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsSelecting(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={inputRef}
      className={cn(
        "relative inline-block",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <TimeDisplay
        time={formattedTime}
        error={error}
        onClick={() => !disabled && setIsSelecting(true)}
        onWheel={handleWheel}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />
      
      {isSelecting && !disabled && (
        <TimeSelector
          selectedTime={value}
          minTime={minTime}
          onSelect={handleTimeSelect}
          onClose={() => setIsSelecting(false)}
        />
      )}
    </div>
  );
}