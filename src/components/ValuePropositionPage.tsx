import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ValuePropositionPageProps {
  onContinue: () => void;
  onBack: () => void;
}

export const ValuePropositionPage = ({ onContinue, onBack }: ValuePropositionPageProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="p-2 -ml-2"
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      {/* Title */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold text-foreground leading-tight">
          Cal AI creates<br />long-term results
        </h1>
      </div>

      {/* Graph Container */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="bg-muted/20 rounded-3xl p-6 mb-6">
          {/* Y-axis label */}
          <div className="text-sm text-muted-foreground mb-4">Your weight</div>
          
          {/* Graph Area */}
          <div className="relative h-48 mb-4">
            {/* Graph background */}
            <svg
              className="w-full h-full"
              viewBox="0 0 300 150"
              preserveAspectRatio="none"
            >
              {/* Cal AI line (steady decline and maintenance) */}
              <path
                d="M 20 50 Q 80 80 120 100 Q 180 110 280 110"
                stroke="hsl(var(--foreground))"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Traditional diet line (drop then regain) */}
              <path
                d="M 20 50 Q 60 90 100 100 Q 140 70 200 40 Q 240 30 280 35"
                stroke="hsl(0 84% 60%)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Start point */}
              <circle cx="20" cy="50" r="4" fill="hsl(var(--foreground))" />
              
              {/* End points */}
              <circle cx="280" cy="110" r="4" fill="hsl(var(--foreground))" />
              <circle cx="280" cy="35" r="4" fill="hsl(0 84% 60%)" />
            </svg>
            
            {/* Labels */}
            <div className="absolute top-8 right-8 text-sm text-red-500">
              Traditional diet
            </div>
            <div className="absolute bottom-12 left-8 flex items-center text-sm">
              <div className="w-3 h-3 bg-foreground rounded-full mr-2"></div>
              <span className="text-foreground font-medium">Cal AI</span>
              <span className="bg-foreground text-background text-xs px-2 py-1 rounded ml-2">
                PRO
              </span>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Month 1</span>
            <span>Month 6</span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-muted-foreground mb-12 px-4">
          80% of Cal AI users maintain their weight loss even 6 months later
        </p>
      </div>

      {/* Continue Button */}
      <div className="w-full">
        <Button 
          onClick={onContinue}
          className="w-full h-14 text-lg font-semibold"
          size="lg"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};