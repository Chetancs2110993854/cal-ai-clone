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
        <div className="bg-gray-100 rounded-3xl p-6 mb-6 relative">
          {/* Y-axis label */}
          <div className="text-sm text-gray-600 mb-6 font-medium">Your weight</div>
          
          {/* Graph Area */}
          <div className="relative h-40 mb-6">
            <svg
              className="w-full h-full"
              viewBox="0 0 320 120"
              preserveAspectRatio="none"
            >
              {/* Cal AI line (steady decline and maintenance) */}
              <path
                d="M 30 30 Q 80 50 120 65 Q 180 75 290 75"
                stroke="#000000"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Traditional diet line (drop then regain) */}
              <path
                d="M 30 30 Q 70 55 110 65 Q 150 50 200 25 Q 250 15 290 20"
                stroke="#ef4444"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
              
              {/* Start point */}
              <circle cx="30" cy="30" r="3" fill="#000000" />
              
              {/* End points */}
              <circle cx="290" cy="75" r="3" fill="#000000" />
              <circle cx="290" cy="20" r="3" fill="#ef4444" />
            </svg>
            
            {/* Traditional diet label */}
            <div className="absolute top-4 right-8 text-sm text-red-500 font-medium">
              Traditional diet
            </div>
            
            {/* Cal AI label with PRO badge */}
            <div className="absolute bottom-2 left-2 flex items-center">
              <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
              <span className="text-black text-sm font-medium mr-2">Cal AI</span>
              <span className="bg-black text-white text-xs px-2 py-0.5 rounded font-medium">
                PRO
              </span>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="flex justify-between text-sm text-gray-600 font-medium">
            <span>Month 1</span>
            <span>Month 6</span>
          </div>
        </div>

        {/* Caption */}
        <p className="text-center text-gray-600 mb-12 px-4 font-medium">
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