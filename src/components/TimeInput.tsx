import React, { useState, useRef, useEffect } from 'react';

interface TimeInputProps {
  value: string;
  onChange: (time: string) => void;
  className?: string;
}

const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const minutes = ['00', '15', '30', '45'];

export default function TimeInput({ value, onChange, className = '' }: TimeInputProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const formatTime = (time: string) => {
    if (!time) return '--:--';
    return time;
  };

  const handleTimeChange = (part: 'hour' | 'minute', newValue: string) => {
    const [currentHour, currentMinute] = value ? value.split(':') : ['00', '00'];
    const newTime = part === 'hour' 
      ? `${newValue}:${currentMinute || '00'}`
      : `${currentHour || '00'}:${newValue}`;
    onChange(newTime);
  };

  const [currentHour, currentMinute] = value ? value.split(':') : ['--', '--'];

  return (
    <div ref={containerRef} className="relative inline-block">
      <input
        ref={inputRef}
        type="text"
        value={formatTime(value)}
        onClick={() => setIsSelecting(true)}
        readOnly
        className={`w-20 text-center border rounded py-1 cursor-pointer ${className}`}
      />
      
      {isSelecting && (
        <>
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-[1px] z-[998]"
            onClick={() => setIsSelecting(false)}
          />
          <div
            ref={selectorRef}
            className="fixed z-[999] bg-white rounded-lg shadow-xl border"
            style={{
              width: '160px',
              left: '50%',
              transform: 'translateX(-50%)',
              top: inputRef.current 
                ? Math.min(
                    inputRef.current.getBoundingClientRect().bottom + 4,
                    window.innerHeight - 320
                  )
                : 'auto',
            }}
          >
            <div className="flex">
              <div className="w-1/2 border-r">
                <div className="sticky top-0 bg-white border-b px-2 py-1 text-xs font-medium text-gray-500">
                  Hour
                </div>
                <div className="max-h-48 overflow-y-auto overscroll-contain">
                  {hours.map((hour) => (
                    <button
                      key={hour}
                      onClick={() => handleTimeChange('hour', hour)}
                      className={`w-full px-2 py-1.5 text-sm hover:bg-purple-50 ${
                        currentHour === hour ? 'bg-purple-100 text-purple-900 font-medium' : ''
                      }`}
                    >
                      {hour}
                    </button>
                  ))}
                </div>
              </div>
              <div className="w-1/2">
                <div className="sticky top-0 bg-white border-b px-2 py-1 text-xs font-medium text-gray-500">
                  Min
                </div>
                <div className="max-h-48 overflow-y-auto overscroll-contain">
                  {minutes.map((minute) => (
                    <button
                      key={minute}
                      onClick={() => {
                        handleTimeChange('minute', minute);
                        setIsSelecting(false);
                      }}
                      className={`w-full px-2 py-1.5 text-sm hover:bg-purple-50 ${
                        currentMinute === minute ? 'bg-purple-100 text-purple-900 font-medium' : ''
                      }`}
                    >
                      {minute}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}