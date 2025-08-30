import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GenderSelectionPageProps {
  onContinue: () => void;
  onBack: () => void;
}

type Gender = 'male' | 'female' | 'other';

interface GenderOption {
  value: Gender;
  label: string;
}

export const GenderSelectionPage: React.FC<GenderSelectionPageProps> = ({
  onContinue,
  onBack,
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender | null>(null);

  const genderOptions: GenderOption[] = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  // Load saved data from localStorage
  useEffect(() => {
    const savedGender = localStorage.getItem('userGender') as Gender;
    if (savedGender) {
      setSelectedGender(savedGender);
    }
  }, []);

  const handleContinue = () => {
    if (selectedGender) {
      // Save to localStorage
      localStorage.setItem('userGender', selectedGender);
      onContinue();
    }
  };

  const handleOptionSelect = (gender: Gender) => {
    setSelectedGender(gender);
  };

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
        <h1 className="text-2xl font-bold mb-2">Choose your Gender</h1>
        <p className="text-muted-foreground">
          This will be used to calibrate your custom plan.
        </p>
      </div>

      {/* Gender Options */}
      <div className="flex-1 space-y-4">
        {genderOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
            className={`w-full p-6 rounded-lg text-left transition-all duration-200 ${
              selectedGender === option.value
                ? 'bg-foreground text-background'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            <div className="text-lg font-medium text-center">{option.label}</div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="pt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedGender}
          className="w-full h-14 text-lg font-medium"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};