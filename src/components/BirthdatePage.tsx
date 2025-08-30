import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BirthdatePageProps {
  onContinue: () => void;
  onBack: () => void;
}

export const BirthdatePage: React.FC<BirthdatePageProps> = ({
  onContinue,
  onBack,
}) => {
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [year, setYear] = useState<string>('');

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Generate days 1-31
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  
  // Generate years from 1930 to current year
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1929 }, (_, i) => currentYear - i);

  // Load saved data from localStorage
  useEffect(() => {
    const savedMonth = localStorage.getItem('userBirthMonth');
    const savedDay = localStorage.getItem('userBirthDay');
    const savedYear = localStorage.getItem('userBirthYear');
    if (savedMonth) setMonth(savedMonth);
    if (savedDay) setDay(savedDay);
    if (savedYear) setYear(savedYear);
  }, []);

  const handleContinue = () => {
    if (month && day && year) {
      // Save to localStorage
      localStorage.setItem('userBirthMonth', month);
      localStorage.setItem('userBirthDay', day);
      localStorage.setItem('userBirthYear', year);
      onContinue();
    }
  };

  const isFormValid = month && day && year;

  return (
    <div className="min-h-screen bg-background flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="mr-4"
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <div className="w-full bg-muted rounded-full h-1">
          <div className="bg-foreground h-1 rounded-full w-full"></div>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-2">When were you born?</h1>
        <p className="text-muted-foreground">
          This will be used to calibrate your custom plan.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Month Dropdown */}
          <div>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full h-14 px-3 text-base border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value="">Month</option>
              {months.map((monthName, index) => (
                <option key={monthName} value={index + 1}>
                  {monthName}
                </option>
              ))}
            </select>
          </div>

          {/* Day Dropdown */}
          <div>
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="w-full h-14 px-3 text-base border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value="">Day</option>
              {days.map((dayNum) => (
                <option key={dayNum} value={dayNum}>
                  {dayNum}
                </option>
              ))}
            </select>
          </div>

          {/* Year Dropdown */}
          <div>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full h-14 px-3 text-base border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer z-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 8px center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '16px',
              }}
            >
              <option value="">Year</option>
              {years.map((yearNum) => (
                <option key={yearNum} value={yearNum}>
                  {yearNum}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-8">
        <Button
          onClick={handleContinue}
          disabled={!isFormValid}
          className="w-full h-14 text-lg font-medium"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};