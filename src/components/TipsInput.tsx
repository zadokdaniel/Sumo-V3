import React, { useState } from 'react';
import { Calculator } from 'lucide-react';
import { StaffData } from './StaffMember';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { FormattedNumber } from './ui/formatted-number';

interface TipsInputProps {
  totalTips: string;
  onTipsChange: (tips: string) => void;
  staff: Record<string, StaffData>;
}

export default function TipsInput({ totalTips, onTipsChange, staff }: TipsInputProps) {
  const [calculation, setCalculation] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);

  const totalExpenses = Object.values(staff).reduce(
    (sum, member) => sum + (parseFloat(member.expenses) || 0),
    0
  );

  const cashTips = parseFloat(totalTips) || 0;
  const totalDistribution = cashTips + totalExpenses;

  const hours = Object.values(staff).reduce((sum, member) => {
    if (!member.startTime || !member.endTime) return sum;
    const start = new Date(`2000/01/01 ${member.startTime}`);
    const end = new Date(`2000/01/01 ${member.endTime}`);
    let totalMinutes = (end.getTime() - start.getTime()) / 1000 / 60;
    totalMinutes -= parseInt(member.breakDuration || '0', 10);
    return sum + (totalMinutes / 60);
  }, 0);
 
  const hourlyRate = hours > 0 ? totalDistribution / hours : 0;

  const handleCalculate = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(calculation);
      if (!isNaN(result)) {
        onTipsChange(result.toString());
        setCalculation('');
        setIsCalculating(false);
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.select();
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 shadow-lg">
      <div className="text-center space-y-6">
        <h2 className="text-xl font-semibold text-purple-900">Total Distribution</h2>
        
        <div className="flex justify-center">
          <FormattedNumber 
            value={totalDistribution} 
            currency={true}
            size="xl"
            className="text-purple-600"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {/* Cash Tips */}
          <div className="order-1 sm:order-2 flex flex-col items-center">
            <div className="h-10 flex items-center">
              <div className="relative flex items-center">
                <Popover 
                  open={isCalculating} 
                  onOpenChange={setIsCalculating}
                >
                  <PopoverTrigger>
                    <Calculator className="w-4 h-4 text-purple-400 hover:text-purple-600 transition-colors cursor-pointer absolute -left-6" />
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-3">
                    <div className="relative mb-2">
                      <input
                        type="text"
                        value={calculation}
                        onChange={(e) => setCalculation(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onClick={handleInputClick}
                        className="w-full px-3 py-1.5 text-center border rounded text-lg font-mono"
                        autoFocus
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      {['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '.', '0', 'Enter', '/'].map((key) => (
                        <button
                          key={key}
                          onClick={() => {
                            if (key === 'Enter') {
                              handleCalculate();
                            } else {
                              setCalculation(prev => prev + key);
                            }
                          }}
                          className={`p-2 text-center hover:bg-purple-100 rounded transition-colors ${
                            key === 'Enter' ? 'text-purple-600 font-medium' : ''
                          }`}
                        >
                          {key}
                        </button>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                <input
                  type="text"
                  inputMode="decimal"
                  value={totalTips}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^\d.]/g, '');
                    onTipsChange(value);
                  }}
                  onClick={handleInputClick}
                  placeholder="0"
                  className="w-24 text-2xl font-bold text-center text-purple-900 bg-transparent border-none focus:outline-none focus:ring-0 placeholder-purple-200"
                />
              </div>
            </div>
            <div className="text-sm text-purple-400 font-medium">Cash Tips</div>
          </div>

          {/* Expenses */}
          <div className="order-2 sm:order-1 flex flex-col items-center">
            <div className="h-10 flex items-center">
              <FormattedNumber 
                value={totalExpenses} 
                currency={true}
                className="text-purple-900"
              />
            </div>
            <div className="text-sm text-purple-400 font-medium">Expenses</div>
          </div>

          {/* Hours */}
          <div className="order-3 flex flex-col items-center">
            <div className="h-10 flex items-center">
              <FormattedNumber 
                value={hours}
                unit="hrs"
                className="text-purple-900"
              />
            </div>
            <div className="text-sm text-purple-400 font-medium">Hours</div>
          </div>

          {/* Per Hour */}
          <div className="order-4 flex flex-col items-center">
            <div className="h-10 flex items-center">
              <FormattedNumber 
                value={hourlyRate}
                currency={true}
                unit="/hr"
                className="text-purple-900"
              />
            </div>
            <div className="text-sm text-purple-400 font-medium">Per Hour</div>
          </div>
        </div>
      </div>
    </div>
  );
}