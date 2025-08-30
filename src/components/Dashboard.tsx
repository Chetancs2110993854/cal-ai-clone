import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Camera, Flame, Beef, Wheat, Droplet } from 'lucide-react';

export const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
  
  useEffect(() => {
    // Load user data from localStorage
    const storedData = {
      goal: localStorage.getItem('fitnessGoal'),
      gender: localStorage.getItem('gender'),
      height: localStorage.getItem('height'),
      weight: localStorage.getItem('weight'),
      frequency: localStorage.getItem('workoutFrequency'),
      birthday: localStorage.getItem('birthday'),
      calories: localStorage.getItem('targetCalories'),
      protein: localStorage.getItem('targetProtein'),
      carbs: localStorage.getItem('targetCarbs'),
      fats: localStorage.getItem('targetFats')
    };
    setUserData(storedData);
  }, []);

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Mock data for demonstration
  const currentCalories = 1847;
  const targetCalories = userData?.calories ? parseInt(userData.calories) : 2200;
  const caloriesLeft = targetCalories - currentCalories;
  
  const proteinConsumed = 85;
  const targetProtein = userData?.protein ? parseInt(userData.protein) : 150;
  
  const carbsConsumed = 180;
  const targetCarbs = userData?.carbs ? parseInt(userData.carbs) : 275;
  
  const fatsConsumed = 55;
  const targetFats = userData?.fats ? parseInt(userData.fats) : 73;

  const streakCount = 7; // Mock streak data

  const recentMeals = [
    { name: 'Grilled Chicken Salad', calories: 425, time: '2:30 PM' },
    { name: 'Greek Yogurt & Berries', calories: 180, time: '10:15 AM' },
    { name: 'Oatmeal with Banana', calories: 320, time: '8:00 AM' }
  ];

  const handleCameraClick = () => {
    // TODO: Implement camera functionality
    console.log('Camera clicked - implement photo logging');
  };

  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Cal AI</h1>
        
        {/* Week Calendar */}
        <div className="flex gap-2">
          {days.map((day, index) => (
            <div
              key={day}
              className={`px-3 py-2 rounded-full text-sm font-medium ${
                index === currentDay
                  ? 'bg-primary text-primary-foreground'
                  : 'border-2 border-dashed border-muted-foreground text-muted-foreground'
              }`}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Streak Counter */}
        <div className="text-right">
          <div className="text-2xl font-bold text-foreground">{streakCount}</div>
          <div className="text-sm text-muted-foreground">day streak</div>
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Calorie Summary Card */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-foreground mb-2">{currentCalories}</div>
              <div className="text-sm text-muted-foreground mb-4">
                {caloriesLeft > 0 ? `${caloriesLeft} calories left` : `${Math.abs(caloriesLeft)} calories over`}
              </div>
              <div className="relative w-24 h-24 mx-auto">
                <Progress 
                  value={(currentCalories / targetCalories) * 100} 
                  className="h-2"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="w-8 h-8 text-primary" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protein Card */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-left">
                <div className="text-xl font-bold text-foreground">{proteinConsumed}g</div>
                <div className="text-sm font-semibold text-foreground">Protein left</div>
              </div>
              <Beef className="w-5 h-5 text-red-500" />
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                  strokeDasharray={`${(proteinConsumed / targetProtein) * 100}, 100`}
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Carbs Card */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-left">
                <div className="text-xl font-bold text-foreground">{carbsConsumed}g</div>
                <div className="text-sm font-semibold text-foreground">Carbs left</div>
              </div>
              <Wheat className="w-5 h-5 text-orange-500" />
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#f97316"
                  strokeWidth="3"
                  strokeDasharray={`${(carbsConsumed / targetCarbs) * 100}, 100`}
                />
              </svg>
            </div>
          </CardContent>
        </Card>

        {/* Fats Card */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="text-left">
                <div className="text-xl font-bold text-foreground">{fatsConsumed}g</div>
                <div className="text-sm font-semibold text-foreground">Fats left</div>
              </div>
              <Droplet className="w-5 h-5 text-blue-500" />
            </div>
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="hsl(var(--muted))"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3"
                  strokeDasharray={`${(fatsConsumed / targetFats) * 100}, 100`}
                />
              </svg>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recently Logged */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Recently Logged</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recentMeals.map((meal, index) => (
            <Card key={index} className="shadow-sm border-0 min-w-[200px]">
              <CardContent className="p-4">
                <div className="font-semibold text-foreground">{meal.name}</div>
                <div className="text-sm text-muted-foreground">{meal.calories} cal</div>
                <div className="text-xs text-muted-foreground">{meal.time}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={handleCameraClick}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-foreground hover:bg-foreground/90 text-background shadow-lg"
        size="icon"
      >
        <Camera className="w-6 h-6" />
      </Button>
    </div>
  );
};