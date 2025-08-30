import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Circle, MoreHorizontal, Grid3X3 } from 'lucide-react';

interface WorkoutFrequencyPageProps {
  onContinue: () => void;
  onBack: () => void;
}

type WorkoutFrequency = '0-2' | '3-5' | '6+';

interface WorkoutOption {
  value: WorkoutFrequency;
  label: string;
  description: string;
  icon: React.ReactNode;
}

export const WorkoutFrequencyPage: React.FC<WorkoutFrequencyPageProps> = ({
  onContinue,
  onBack,
}) => {
  const [selectedFrequency, setSelectedFrequency] = useState<WorkoutFrequency | null>(null);

  const workoutOptions: WorkoutOption[] = [
    {
      value: '0-2',
      label: '0-2',
      description: 'Workouts now and then',
      icon: <Circle className="h-6 w-6" />,
    },
    {
      value: '3-5',
      label: '3-5',
      description: 'A few workouts per week',
      icon: <MoreHorizontal className="h-6 w-6" />,
    },
    {
      value: '6+',
      label: '6+',
      description: 'Dedicated athlete',
      icon: <Grid3X3 className="h-6 w-6" />,
    },
  ];

  // Load saved data from localStorage
  useEffect(() => {
    const savedFrequency = localStorage.getItem('userWorkoutFrequency') as WorkoutFrequency;
    if (savedFrequency) {
      setSelectedFrequency(savedFrequency);
    }
  }, []);

  const handleContinue = () => {
    if (selectedFrequency) {
      // Save to localStorage
      localStorage.setItem('userWorkoutFrequency', selectedFrequency);
      onContinue();
    }
  };

  const handleOptionSelect = (frequency: WorkoutFrequency) => {
    setSelectedFrequency(frequency);
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
          <div className="bg-foreground h-1 rounded-full w-3/4"></div>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-2">How many workouts do you do per week?</h1>
        <p className="text-muted-foreground">
          This will be used to calibrate your custom plan.
        </p>
      </div>

      {/* Workout Options */}
      <div className="flex-1 space-y-4">
        {workoutOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
            className={`w-full p-6 rounded-lg text-left transition-all duration-200 ${
              selectedFrequency === option.value
                ? 'bg-muted border-2 border-foreground'
                : 'bg-muted border-2 border-transparent hover:bg-muted/80'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="text-foreground">
                {option.icon}
              </div>
              <div>
                <div className="text-lg font-semibold">{option.label}</div>
                <div className="text-muted-foreground">{option.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="pt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedFrequency}
          className="w-full h-14 text-lg font-medium"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};