import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface HeightWeightPageProps {
  onContinue: () => void;
  onBack: () => void;
}

export const HeightWeightPage: React.FC<HeightWeightPageProps> = ({
  onContinue,
  onBack,
}) => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');

  // Load saved data from localStorage
  useEffect(() => {
    const savedHeight = localStorage.getItem('userHeight');
    const savedWeight = localStorage.getItem('userWeight');
    if (savedHeight) setHeight(savedHeight);
    if (savedWeight) setWeight(savedWeight);
  }, []);

  // Generate height options (140cm to 220cm)
  const heightOptions = Array.from({ length: 81 }, (_, i) => 140 + i);
  
  // Generate weight options (40kg to 150kg)
  const weightOptions = Array.from({ length: 111 }, (_, i) => 40 + i);

  const handleContinue = () => {
    if (height && weight) {
      // Save to localStorage
      localStorage.setItem('userHeight', height);
      localStorage.setItem('userWeight', weight);
      onContinue();
    }
  };

  const isFormValid = height && weight;

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
          <div className="bg-foreground h-1 rounded-full w-1/2"></div>
        </div>
      </div>

      {/* Title and Subtitle */}
      <div className="mb-12">
        <h1 className="text-2xl font-bold mb-2">Height & weight</h1>
        <p className="text-muted-foreground">
          This will be used to calibrate your custom plan.
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-8">
        {/* Height Input */}
        <div>
          <label className="block text-lg font-medium mb-4">Height</label>
          <select
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full h-14 px-4 text-lg border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px',
            }}
          >
            <option value="">Select height</option>
            {heightOptions.map((h) => (
              <option key={h} value={h}>
                {h} cm
              </option>
            ))}
          </select>
        </div>

        {/* Weight Input */}
        <div>
          <label className="block text-lg font-medium mb-4">Weight</label>
          <select
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full h-14 px-4 text-lg border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 appearance-none cursor-pointer"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 12px center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '16px',
            }}
          >
            <option value="">Select weight</option>
            {weightOptions.map((w) => (
              <option key={w} value={w}>
                {w} kg
              </option>
            ))}
          </select>
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