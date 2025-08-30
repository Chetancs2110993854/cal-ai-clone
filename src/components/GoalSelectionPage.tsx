import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface GoalSelectionPageProps {
  onContinue: () => void;
  onBack: () => void;
}

type Goal = 'lose-weight' | 'maintain' | 'gain-weight';

interface GoalOption {
  value: Goal;
  label: string;
}

export const GoalSelectionPage: React.FC<GoalSelectionPageProps> = ({
  onContinue,
  onBack,
}) => {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);

  const goalOptions: GoalOption[] = [
    {
      value: 'lose-weight',
      label: 'Lose weight',
    },
    {
      value: 'maintain',
      label: 'Maintain',
    },
    {
      value: 'gain-weight',
      label: 'Gain weight',
    },
  ];

  // Load saved data from localStorage
  useEffect(() => {
    const savedGoal = localStorage.getItem('userGoal') as Goal;
    if (savedGoal) {
      setSelectedGoal(savedGoal);
    }
  }, []);

  const handleContinue = () => {
    if (selectedGoal) {
      // Save to localStorage
      localStorage.setItem('userGoal', selectedGoal);
      onContinue();
    }
  };

  const handleOptionSelect = (goal: Goal) => {
    setSelectedGoal(goal);
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
          <div className="bg-foreground h-1 rounded-full w-5/6"></div>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-2">What is your goal?</h1>
        <p className="text-muted-foreground">
          This helps us generate a plan for your calorie intake.
        </p>
      </div>

      {/* Goal Options */}
      <div className="flex-1 space-y-4">
        {goalOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
            className={`w-full p-6 rounded-lg text-left transition-all duration-200 ${
              selectedGoal === option.value
                ? 'bg-muted border-2 border-foreground'
                : 'bg-muted border-2 border-transparent hover:bg-muted/80'
            }`}
          >
            <div className="text-lg font-medium">{option.label}</div>
          </button>
        ))}
      </div>

      {/* Continue Button */}
      <div className="pt-8">
        <Button
          onClick={handleContinue}
          disabled={!selectedGoal}
          className="w-full h-14 text-lg font-medium"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};