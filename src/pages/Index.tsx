import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ValuePropositionPage } from "@/components/ValuePropositionPage";
import { HeightWeightPage } from "@/components/HeightWeightPage";
import { WorkoutFrequencyPage } from "@/components/WorkoutFrequencyPage";

type OnboardingStep = 'welcome' | 'value-proposition' | 'height-weight' | 'workout-frequency' | 'next-step';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');

  const handleGetStarted = () => {
    setCurrentStep('value-proposition');
  };

  const handleContinueFromValueProp = () => {
    setCurrentStep('height-weight');
  };

  const handleContinueFromHeightWeight = () => {
    setCurrentStep('workout-frequency');
  };

  const handleContinueFromWorkoutFrequency = () => {
    setCurrentStep('next-step');
    // TODO: Navigate to next onboarding step
    console.log('Continuing to next onboarding step...');
  };

  const handleBackToValueProp = () => {
    setCurrentStep('value-proposition');
  };

  const handleBackToHeightWeight = () => {
    setCurrentStep('height-weight');
  };

  const handleBackToWelcome = () => {
    setCurrentStep('welcome');
  };

  if (currentStep === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  if (currentStep === 'value-proposition') {
    return (
      <ValuePropositionPage 
        onContinue={handleContinueFromValueProp}
        onBack={handleBackToWelcome}
      />
    );
  }

  if (currentStep === 'height-weight') {
    return (
      <HeightWeightPage 
        onContinue={handleContinueFromHeightWeight}
        onBack={handleBackToValueProp}
      />
    );
  }

  if (currentStep === 'workout-frequency') {
    return (
      <WorkoutFrequencyPage 
        onContinue={handleContinueFromWorkoutFrequency}
        onBack={handleBackToHeightWeight}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Next Onboarding Step</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
};

export default Index;
