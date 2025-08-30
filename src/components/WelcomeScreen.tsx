import { Button } from "@/components/ui/button";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm mx-auto flex flex-col items-center text-center space-y-8">
        
        {/* Food Image */}
        <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1592415486689-125cbbfcbee2?q=80&w=800&auto=format"
            alt="Healthy sandwich with vegetables"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Main Headline */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground leading-tight">
            Calorie tracking made easy
          </h1>
          
          {/* Subtext */}
          <p className="text-lg text-muted-foreground">
            Scan your food. Get your custom plan.
          </p>
        </div>

        {/* CTA Button */}
        <div className="w-full pt-4">
          <Button 
            onClick={onGetStarted}
            className="w-full h-14 text-lg font-semibold"
            size="lg"
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};