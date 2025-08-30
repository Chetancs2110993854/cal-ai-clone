import { useState } from "react";
import { WelcomeScreen } from "@/components/WelcomeScreen";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'onboarding'>('welcome');

  const handleGetStarted = () => {
    setCurrentStep('onboarding');
    // TODO: Navigate to next onboarding step
    console.log('Starting onboarding flow...');
  };

  if (currentStep === 'welcome') {
    return <WelcomeScreen onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Onboarding Flow</h1>
        <p className="text-muted-foreground">Coming soon...</p>
      </div>
    </div>
  );
};

export default Index;
