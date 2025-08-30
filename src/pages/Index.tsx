import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { ValuePropositionPage } from "@/components/ValuePropositionPage";

type OnboardingStep = 'welcome' | 'value-proposition' | 'next-step';

const Index = () => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');

  const handleGetStarted = () => {
    setCurrentStep('value-proposition');
  };

  const handleContinueFromValueProp = () => {
    setCurrentStep('next-step');
    // TODO: Navigate to next onboarding step
    console.log('Continuing to next onboarding step...');
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
