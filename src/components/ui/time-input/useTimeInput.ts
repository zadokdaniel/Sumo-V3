import { useState, useCallback } from 'react';
import { parseTime, formatTime, addMinutes } from './utils';

interface UseTimeInputProps {
  value: string;
  onChange: (time: string) => void;
  minTime?: string;
  setIsSelecting: (isSelecting: boolean) => void;
}

export function useTimeInput({
  value,
  onChange,
  minTime,
  setIsSelecting
}: UseTimeInputProps) {
  const [error, setError] = useState<string>();

  const validateAndUpdate = useCallback((newTime: string) => {
    if (!newTime) {
      setError(undefined);
      onChange('');
      return;
    }

    const parsedTime = parseTime(newTime);
    if (!parsedTime) {
      setError('Invalid time');
      return;
    }

    if (minTime && parsedTime < parseTime(minTime)) {
      setError('Time cannot be earlier than start time');
      return;
    }

    setError(undefined);
    onChange(formatTime(parsedTime));
  }, [onChange, minTime]);

  const handleTimeSelect = useCallback((time: string) => {
    validateAndUpdate(time);
  }, [validateAndUpdate]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsSelecting(true);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const currentTime = parseTime(value);
      if (currentTime) {
        validateAndUpdate(formatTime(addMinutes(currentTime, 15)));
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const currentTime = parseTime(value);
      if (currentTime) {
        validateAndUpdate(formatTime(addMinutes(currentTime, -15)));
      }
    }
  }, [value, validateAndUpdate, setIsSelecting]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const currentTime = parseTime(value);
    if (currentTime) {
      validateAndUpdate(formatTime(addMinutes(currentTime, e.deltaY > 0 ? -15 : 15)));
    }
  }, [value, validateAndUpdate]);

  return {
    handleKeyDown,
    handleWheel,
    handleTimeSelect,
    formattedTime: value ? formatTime(value) : '--:--',
    error
  };
}