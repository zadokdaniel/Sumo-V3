import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StaffHandle } from './StaffHandle';
import { StaffList } from './StaffList';
import { StaffData } from '../StaffMember';
import { useBreakpoint } from '../../hooks/useBreakpoint';
import { cn } from '../../lib/utils';

interface StaffDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  staff: Record<string, StaffData>;
  onAddStaff: () => void;
  onUpdateStaff: (id: string, updates: Partial<StaffData>) => void;
  onDeleteStaff: (id: string) => void;
  totalTips: string;
  lastAddedId: string | null;
}

export function StaffDrawer({
  isOpen,
  onOpenChange,
  staff,
  onAddStaff,
  onUpdateStaff,
  onDeleteStaff,
  totalTips,
  lastAddedId,
}: StaffDrawerProps) {
  const [drawerHeight, setDrawerHeight] = useState<number>(0);
  const isSmallScreen = !useBreakpoint('sm', 'up');
  const isLargeScreen = useBreakpoint('lg', 'up');

  useEffect(() => {
    const updateHeight = () => {
      setDrawerHeight(window.innerHeight * 0.85);
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  if (isLargeScreen) {
    return null;
  }

  const handleDragEnd = (_: any, info: { offset: { y: number } }) => {
    if (info.offset.y > 100) {
      onOpenChange(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => onOpenChange(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          x: isSmallScreen ? 0 : '0',
          y: isOpen ? '0%' : '95%',
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 200,
        }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        className={cn(
          "fixed bottom-0 z-50 bg-white rounded-t-xl shadow-lg",
          isSmallScreen ? "left-0 w-full" : "right-0 w-[400px]"
        )}
        style={{
          touchAction: 'none',
          willChange: 'transform',
          height: drawerHeight,
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-3">
          <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
        </div>

        <StaffHandle
          staffCount={Object.keys(staff).length}
          onAddStaff={onAddStaff}
          onClick={() => onOpenChange(!isOpen)}
          className="rounded-t-xl"
        />

        <motion.div
          animate={{ 
            opacity: isOpen ? 1 : 0,
          }}
          transition={{
            opacity: { duration: 0.2 },
          }}
          className={cn(
            "overflow-hidden transition-[height]",
            isOpen ? "h-[calc(100%-64px)]" : "h-0"
          )}
        >
          <div className="p-4 h-full overflow-y-auto">
            <StaffList
              staff={staff}
              onUpdateStaff={onUpdateStaff}
              onDeleteStaff={onDeleteStaff}
              totalTips={totalTips}
              lastAddedId={lastAddedId}
            />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}