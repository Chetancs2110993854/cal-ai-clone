import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ValuePropositionPage } from "@/components/ValuePropositionPage";
import { HeightWeightPage } from "@/components/HeightWeightPage";
import { WorkoutFrequencyPage } from "@/components/WorkoutFrequencyPage";
import { GoalSelectionPage } from "@/components/GoalSelectionPage";
import { GenderSelectionPage } from "@/components/GenderSelectionPage";
import { BirthdatePage } from "@/components/BirthdatePage";
import { CustomPlanPage } from "@/components/CustomPlanPage";

type OnboardingStep = 'welcome' | 'value-proposition' | 'height-weight' | 'workout-frequency' | 'goal-selection' | 'gender-selection' | 'birthdate' | 'custom-plan' | 'next-step';

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
    setCurrentStep('goal-selection');
  };

  const handleContinueFromGoalSelection = () => {
    setCurrentStep('gender-selection');
  };

  const handleContinueFromGenderSelection = () => {
    setCurrentStep('birthdate');
  };

  const handleContinueFromBirthdate = () => {
    setCurrentStep('custom-plan');
  };

  const handleContinueFromCustomPlan = () => {
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

  const handleBackToWorkoutFrequency = () => {
    setCurrentStep('workout-frequency');
  };

  const handleBackToGoalSelection = () => {
    setCurrentStep('goal-selection');
  };

  const handleBackToGenderSelection = () => {
    setCurrentStep('gender-selection');
  };

  const handleBackToBirthdate = () => {
    setCurrentStep('birthdate');
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

  if (currentStep === 'goal-selection') {
    return (
      <GoalSelectionPage 
        onContinue={handleContinueFromGoalSelection}
        onBack={handleBackToWorkoutFrequency}
      />
    );
  }

  if (currentStep === 'gender-selection') {
    return (
      <GenderSelectionPage 
        onContinue={handleContinueFromGenderSelection}
        onBack={handleBackToGoalSelection}
      />
    );
  }

  if (currentStep === 'birthdate') {
    return (
      <BirthdatePage 
        onContinue={handleContinueFromBirthdate}
        onBack={handleBackToGenderSelection}
      />
    );
  }

  if (currentStep === 'custom-plan') {
    return (
      <CustomPlanPage 
        onContinue={handleContinueFromCustomPlan}
        onBack={handleBackToBirthdate}
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
