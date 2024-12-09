import React from 'react';
import { cn } from '../lib/utils';

interface LoadingStateProps {
  className?: string;
  lines?: number;
}

export function LoadingState({ className, lines = 3 }: LoadingStateProps) {
  return (
    <div className={cn('space-y-3 animate-pulse', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded"
          style={{
            width: `${Math.random() * 30 + 70}%`,
          }}
        />
      ))}
    </div>
  );
}