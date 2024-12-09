import React from 'react';
import ShiftDetails from '../components/ShiftDetails';
import TipsInput from '../components/TipsInput';
import StaffConfig from '../components/StaffConfig';
import StaffSummary from '../components/StaffSummary';
import ShiftCompletion from '../components/ShiftCompletion';
import { StaffPanel } from '../components/staff/StaffPanel';
import { StaffDrawer } from '../components/staff/StaffDrawer';
import { useCalculator } from '../contexts/CalculatorContext';
import { useMediaQuery } from '../hooks/useMediaQuery';

export default function Calculator() {
  const {
    date,
    shift,
    totalTips,
    staff,
    lastAddedId,
    isDrawerOpen,
    isComplete,
    config,
    effectiveMultiplier,
    setDate,
    setShift,
    setTotalTips,
    addStaffMember,
    updateStaffMember,
    deleteStaffMember,
    setIsDrawerOpen,
    setIsComplete,
    updateConfig,
  } = useCalculator();

  const isLargeScreen = useMediaQuery('(min-width: 992px)');

  const handleAddStaff = () => {
    addStaffMember();
    if (!isLargeScreen) {
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="sm:flex sm:flex-row flex-col gap-2">
          <div className="flex-1">
            <ShiftDetails
              date={date}
              onDateChange={setDate}
              shift={shift}
              onShiftChange={setShift}
              isComplete={isComplete}
            />
          </div>
          <div className="hidden sm:block">
            {!isComplete && (
              <ShiftCompletion onComplete={() => setIsComplete(true)} />
            )}
          </div>
        </div>

        <TipsInput
          totalTips={totalTips}
          onTipsChange={setTotalTips}
          staff={staff}
        />

        <StaffConfig
          config={config}
          onChange={updateConfig}
          totalTips={totalTips}
          staff={staff}
          date={date}
          shift={shift}
        />

        <StaffSummary
          staff={staff}
          totalTips={totalTips}
          config={config}
          effectiveMultiplier={effectiveMultiplier}
        />

        <div className="block sm:hidden">
          {!isComplete && (
            <ShiftCompletion onComplete={() => setIsComplete(true)} />
          )}
        </div>
      </div>

      {/* Desktop Panel */}
      <StaffPanel
        staff={staff}
        onAddStaff={handleAddStaff}
        onUpdateStaff={updateStaffMember}
        onDeleteStaff={deleteStaffMember}
        totalTips={totalTips}
        lastAddedId={lastAddedId}
      />

      {/* Mobile/Tablet Drawer */}
      <StaffDrawer
        isOpen={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        staff={staff}
        onAddStaff={handleAddStaff}
        onUpdateStaff={updateStaffMember}
        onDeleteStaff={deleteStaffMember}
        totalTips={totalTips}
        lastAddedId={lastAddedId}
      />
    </>
  );
}