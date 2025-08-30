import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check, Flame, Wheat, Drumstick, Droplet, Edit3, Heart } from 'lucide-react';

interface CustomPlanPageProps {
  onContinue: () => void;
  onBack: () => void;
}

interface UserData {
  height: number;
  weight: number;
  age: number;
  gender: 'male' | 'female' | 'other';
  goal: 'lose-weight' | 'maintain' | 'gain-weight';
  workoutFrequency: '0-2' | '3-5' | '6+';
}

interface NutritionPlan {
  calories: number;
  carbs: number;
  protein: number;
  fats: number;
  targetWeight: number;
  targetDate: string;
}

export const CustomPlanPage: React.FC<CustomPlanPageProps> = ({
  onContinue,
  onBack,
}) => {
  const [nutritionPlan, setNutritionPlan] = useState<NutritionPlan | null>(null);
  const [debugLog, setDebugLog] = useState<string[]>([]);

  const calculateAge = (birthYear: number, birthMonth: number, birthDay: number): number => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();
    
    let age = currentYear - birthYear;
    
    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
      age--;
    }
    
    return age;
  };

  const calculateNutrition = (userData: UserData): NutritionPlan => {
    const logs: string[] = [];
    logs.push("=== NUTRITION CALCULATION START ===");
    logs.push(`User Data: Height=${userData.height}cm, Weight=${userData.weight}kg, Age=${userData.age}, Gender=${userData.gender}, Goal=${userData.goal}, Workouts=${userData.workoutFrequency}`);

    // BMR Calculation (Mifflin-St Jeor Formula)
    let bmr: number;
    if (userData.gender === 'male') {
      bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age + 5;
      logs.push(`BMR (Male): 10 * ${userData.weight} + 6.25 * ${userData.height} - 5 * ${userData.age} + 5 = ${bmr}`);
    } else {
      bmr = 10 * userData.weight + 6.25 * userData.height - 5 * userData.age - 161;
      logs.push(`BMR (Female): 10 * ${userData.weight} + 6.25 * ${userData.height} - 5 * ${userData.age} - 161 = ${bmr}`);
    }

    // Activity Factor
    let activityFactor: number;
    switch (userData.workoutFrequency) {
      case '0-2':
        activityFactor = 1.2;
        break;
      case '3-5':
        activityFactor = 1.375;
        break;
      case '6+':
        activityFactor = 1.55;
        break;
      default:
        activityFactor = 1.2;
    }
    logs.push(`Activity Factor (${userData.workoutFrequency} workouts): ${activityFactor}`);

    // TDEE Calculation
    const tdee = bmr * activityFactor;
    logs.push(`TDEE: ${bmr} * ${activityFactor} = ${tdee}`);

    // Goal Adjustment
    let adjustedCalories: number;
    let targetWeight: number;
    let weightChangeRate: number; // kg per week
    
    switch (userData.goal) {
      case 'lose-weight':
        adjustedCalories = tdee * 0.8;
        weightChangeRate = -0.5; // lose 0.5kg per week
        targetWeight = userData.weight + (weightChangeRate * 4); // 4 weeks
        logs.push(`Goal Adjustment (Lose Weight): ${tdee} * 0.8 = ${adjustedCalories}`);
        break;
      case 'maintain':
        adjustedCalories = tdee;
        weightChangeRate = 0;
        targetWeight = userData.weight;
        logs.push(`Goal Adjustment (Maintain): ${tdee} = ${adjustedCalories}`);
        break;
      case 'gain-weight':
        adjustedCalories = tdee * 1.15;
        weightChangeRate = 0.3; // gain 0.3kg per week
        targetWeight = userData.weight + (weightChangeRate * 4); // 4 weeks
        logs.push(`Goal Adjustment (Gain Weight): ${tdee} * 1.15 = ${adjustedCalories}`);
        break;
      default:
        adjustedCalories = tdee;
        weightChangeRate = 0;
        targetWeight = userData.weight;
    }

    // Target Date (4 weeks from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 28);
    const targetDateString = targetDate.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    // Macronutrient Breakdown
    // Protein: 1.0g per kg of body weight (changed from lbs to kg for metric)
    const proteinG = userData.weight * 1.0;
    const proteinCal = proteinG * 4;
    logs.push(`Protein: ${userData.weight}kg * 1.0g/kg = ${proteinG}g (${proteinCal} calories)`);

    // Fat: 0.4g per kg of body weight (changed from lbs to kg for metric)
    const fatG = userData.weight * 0.4;
    const fatCal = fatG * 9;
    logs.push(`Fat: ${userData.weight}kg * 0.4g/kg = ${fatG}g (${fatCal} calories)`);

    // Carbs: remaining calories
    const carbsCal = adjustedCalories - (proteinCal + fatCal);
    const carbsG = carbsCal / 4;
    logs.push(`Carbs: (${adjustedCalories} - ${proteinCal} - ${fatCal}) / 4 = ${carbsG}g`);

    logs.push("=== FINAL RESULTS ===");
    logs.push(`Calories: ${Math.round(adjustedCalories)}`);
    logs.push(`Carbs: ${Math.round(carbsG)}g`);
    logs.push(`Protein: ${Math.round(proteinG)}g`);
    logs.push(`Fats: ${Math.round(fatG)}g`);
    logs.push(`Target Weight: ${targetWeight.toFixed(1)}kg by ${targetDateString}`);
    logs.push("=== CALCULATION END ===");

    return {
      calories: Math.round(adjustedCalories),
      carbs: Math.round(carbsG),
      protein: Math.round(proteinG),
      fats: Math.round(fatG),
      targetWeight: Math.round(targetWeight * 10) / 10,
      targetDate: targetDateString
    };
  };

  useEffect(() => {
    // Load user data from localStorage
    const height = parseInt(localStorage.getItem('userHeight') || '170');
    const weight = parseInt(localStorage.getItem('userWeight') || '70');
    const birthYear = parseInt(localStorage.getItem('userBirthYear') || '1990');
    const birthMonth = parseInt(localStorage.getItem('userBirthMonth') || '1');
    const birthDay = parseInt(localStorage.getItem('userBirthDay') || '1');
    const gender = (localStorage.getItem('userGender') || 'male') as 'male' | 'female' | 'other';
    const goal = (localStorage.getItem('userGoal') || 'lose-weight') as 'lose-weight' | 'maintain' | 'gain-weight';
    const workoutFrequency = (localStorage.getItem('userWorkoutFrequency') || '0-2') as '0-2' | '3-5' | '6+';

    const age = calculateAge(birthYear, birthMonth, birthDay);

    const userData: UserData = {
      height,
      weight,
      age,
      gender,
      goal,
      workoutFrequency
    };

    const plan = calculateNutrition(userData);
    setNutritionPlan(plan);
    
    // Log debug information to console
    const logs = calculateNutrition(userData);
    console.log("Nutrition Calculation Debug Logs:");
    debugLog.forEach(log => console.log(log));
  }, []);

  const getGoalText = () => {
    const goal = localStorage.getItem('userGoal');
    const currentWeight = parseInt(localStorage.getItem('userWeight') || '70');
    
    if (goal === 'lose-weight') {
      const weightLoss = currentWeight - (nutritionPlan?.targetWeight || currentWeight);
      return `You should lose: ${weightLoss.toFixed(1)} kg by ${nutritionPlan?.targetDate}`;
    } else if (goal === 'gain-weight') {
      const weightGain = (nutritionPlan?.targetWeight || currentWeight) - currentWeight;
      return `You should gain: ${weightGain.toFixed(1)} kg by ${nutritionPlan?.targetDate}`;
    } else {
      return `You should maintain: ${currentWeight} kg`;
    }
  };

  const CircularProgress = ({ value, max, color, children }: { 
    value: number; 
    max: number; 
    color: string; 
    children: React.ReactNode; 
  }) => {
    const percentage = (value / max) * 100;
    const strokeDasharray = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = strokeDasharray - (strokeDasharray * percentage) / 100;

    return (
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-muted"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      </div>
    );
  };

  if (!nutritionPlan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Calculating your custom plan...</p>
        </div>
      </div>
    );
  }

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
          <div className="bg-foreground h-1 rounded-full w-full"></div>
        </div>
      </div>

      {/* Success Icon and Title */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-background" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Congratulations your custom plan is ready!</h1>
        <p className="text-muted-foreground">{getGoalText()}</p>
      </div>

      {/* Daily Recommendation */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-1">Daily recommendation</h2>
        <p className="text-muted-foreground mb-6">You can edit this anytime</p>

        {/* Nutrition Grid */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Calories */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Flame className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Calories</span>
              <Edit3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <CircularProgress value={nutritionPlan.calories} max={3000} color="#f97316">
              <div className="text-center">
                <div className="text-lg font-bold">{nutritionPlan.calories}</div>
              </div>
            </CircularProgress>
          </div>

          {/* Carbs */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Wheat className="h-5 w-5 text-orange-500" />
              <span className="font-medium">Carbs</span>
              <Edit3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <CircularProgress value={nutritionPlan.carbs} max={400} color="#f97316">
              <div className="text-center">
                <div className="text-lg font-bold">{nutritionPlan.carbs}</div>
                <div className="text-xs text-muted-foreground">g</div>
              </div>
            </CircularProgress>
          </div>

          {/* Protein */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Drumstick className="h-5 w-5 text-red-500" />
              <span className="font-medium">Protein</span>
              <Edit3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <CircularProgress value={nutritionPlan.protein} max={200} color="#ef4444">
              <div className="text-center">
                <div className="text-lg font-bold">{nutritionPlan.protein}</div>
                <div className="text-xs text-muted-foreground">g</div>
              </div>
            </CircularProgress>
          </div>

          {/* Fats */}
          <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Fats</span>
              <Edit3 className="h-4 w-4 text-muted-foreground" />
            </div>
            <CircularProgress value={nutritionPlan.fats} max={150} color="#3b82f6">
              <div className="text-center">
                <div className="text-lg font-bold">{nutritionPlan.fats}</div>
                <div className="text-xs text-muted-foreground">g</div>
              </div>
            </CircularProgress>
          </div>
        </div>

        {/* Health Score */}
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg mb-8">
          <div className="flex items-center gap-3">
            <Heart className="h-5 w-5 text-pink-500" />
            <span className="font-medium">Health Score</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">7/10</span>
            <div className="w-20 h-2 bg-muted rounded-full">
              <div className="w-3/4 h-2 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="mt-auto">
        <Button
          onClick={onContinue}
          className="w-full h-14 text-lg font-medium"
          size="lg"
        >
          Let&apos;s get started!
        </Button>
      </div>
    </div>
  );
};