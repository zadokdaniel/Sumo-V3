import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

interface BottomDrawerProps {
  children: React.ReactNode;
  preview: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BottomDrawer({ children, preview, isOpen, onOpenChange }: BottomDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ y: number; time: number }>({ y: 0, time: 0 });
  const [dragState, setDragState] = useState<{
    isDragging: boolean;
    startY: number;
    currentY: number;
  }>({
    isDragging: false,
    startY: 0,
    currentY: 0,
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onOpenChange(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onOpenChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      y: touch.clientY,
      time: Date.now(),
    };
    setDragState({
      isDragging: true,
      startY: touch.clientY,
      currentY: touch.clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragState.isDragging) return;

    const touch = e.touches[0];
    setDragState(prev => ({
      ...prev,
      currentY: touch.clientY,
    }));

    // Prevent default scrolling while dragging
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!dragState.isDragging) return;

    const endTime = Date.now();
    const dragDuration = endTime - touchStartRef.current.time;
    const dragDistance = dragState.currentY - dragState.startY;
    const velocity = Math.abs(dragDistance / dragDuration);

    // Close if dragged down more than 100px or with high velocity
    if (dragDistance > 100 || (dragDistance > 20 && velocity > 0.3)) {
      onOpenChange(false);
    } else if (dragDistance < -50 || (dragDistance < -20 && velocity > 0.3)) {
      // Open if dragged up
      onOpenChange(true);
    }

    setDragState({
      isDragging: false,
      startY: 0,
      currentY: 0,
    });
  };

  const translateY = dragState.isDragging
    ? Math.max(0, dragState.currentY - dragState.startY)
    : 0;

  const minHeight = Math.min(window.innerHeight * 0.95, 800);
  const maxHeight = `min(95vh, ${minHeight}px)`;
  const previewHeight = 120;
  const bottomNavHeight = 64;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/5 backdrop-blur-[1px] z-[60]"
          aria-hidden="true"
        />
      )}
      
      <div 
        ref={drawerRef}
        className={cn(
          "fixed inset-x-0 bottom-[64px] transition-transform duration-300 ease-in-out transform z-[70]",
          dragState.isDragging && "transition-none"
        )}
        style={{ 
          height: maxHeight,
          transform: `translate3d(0, ${translateY}px, 0) ${isOpen ? 'translateY(0)' : `translateY(calc(100% - ${previewHeight}px))`}`,
          touchAction: 'none'
        }}
      >
        <div 
          className={cn(
            "h-full flex flex-col",
            "bg-gradient-to-b from-white/95 to-white/90",
            "backdrop-blur-xl backdrop-saturate-150",
            "rounded-t-xl shadow-2xl",
            "border border-white/20",
            "relative"
          )}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Glass reflection effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-t-xl pointer-events-none" />

          {/* Header Section with enhanced shadow */}
          <div 
            className="relative bg-white/95 shadow-[0_4px_15px_-3px_rgba(0,0,0,0.1)] rounded-t-xl border-b border-gray-100"
          >
            {/* Drawer Handle */}
            <div 
              className="w-full p-2 flex flex-col items-center cursor-pointer"
              onClick={() => onOpenChange(!isOpen)}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>

            {/* Preview Content */}
            <div className="px-4 pb-3">
              {preview}
            </div>
          </div>

          {/* Content Area */}
          <div 
            ref={contentRef}
            className={cn(
              "flex-1 px-4 pt-4 pb-4 overflow-y-auto relative",
              "scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent",
              "transition-opacity duration-300",
              isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
}