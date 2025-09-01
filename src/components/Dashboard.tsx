import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { Camera, Flame, Beef, Wheat, Droplet, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { CameraCapture } from './CameraCapture';
import { BottomNavigation } from './BottomNavigation';
import { toast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  
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

  // Generate week dates around selected date
  const generateWeekDates = () => {
    const dates = [];
    const startOfWeek = new Date(selectedDate);
    const dayOffset = startOfWeek.getDay() === 0 ? 6 : startOfWeek.getDay() - 1; // Make Monday = 0
    startOfWeek.setDate(startOfWeek.getDate() - dayOffset);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = generateWeekDates();
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 7 : -7));
    setSelectedDate(newDate);
  };
  
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
    { name: 'Grilled Chicken Salad', calories: 425, time: '2:30 PM', type: 'scan' },
    { name: 'Greek Yogurt & Berries', calories: 180, time: '10:15 AM', type: 'manual' },
    { name: 'Oatmeal with Banana', calories: 320, time: '8:00 AM', type: 'scan' }
  ];

  const handleCameraClick = () => {
    setIsCameraOpen(true);
  };

  const handlePhotoCapture = (imageBlob: Blob) => {
    // TODO: Process the captured/selected image for food recognition
    console.log('Photo captured:', imageBlob);
    toast({
      title: "Photo Captured",
      description: "Processing your food image for calorie analysis..."
    });
  };

  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Create chart data for each nutrient
  const caloriesData = [
    { name: 'consumed', value: currentCalories },
    { name: 'remaining', value: Math.max(0, targetCalories - currentCalories) }
  ];

  const proteinData = [
    { name: 'consumed', value: proteinConsumed },
    { name: 'remaining', value: Math.max(0, targetProtein - proteinConsumed) }
  ];

  const carbsData = [
    { name: 'consumed', value: carbsConsumed },
    { name: 'remaining', value: Math.max(0, targetCarbs - carbsConsumed) }
  ];

  const fatsData = [
    { name: 'consumed', value: fatsConsumed },
    { name: 'remaining', value: Math.max(0, targetFats - fatsConsumed) }
  ];

  return (
    <div className="min-h-screen bg-background p-3 pb-24">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-foreground rounded-lg flex items-center justify-center">
            <span className="text-background text-sm">🍎</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Cal AI</h1>
        </div>
        
        {/* Streak Counter */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 text-xs">🔥</span>
          </div>
          <div className="text-lg font-bold text-foreground">{streakCount}</div>
        </div>
      </div>

      {/* Interactive Week Calendar */}
      <div className="flex items-center justify-between mb-6 px-1">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigateWeek('prev')}
          className="p-2 hover:bg-muted rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        
        <div className="flex gap-2">
          {weekDates.map((date, index) => {
            const isToday = date.toDateString() === new Date().toDateString();
            const isSelected = date.toDateString() === selectedDate.toDateString();
            
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date)}
                className="text-center"
              >
                <div className="text-xs text-muted-foreground mb-1 font-medium">{days[index]}</div>
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                    isSelected
                      ? 'bg-foreground text-background'
                      : isToday 
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {date.getDate()}
                </div>
              </button>
            );
          })}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigateWeek('next')}
          className="p-2 hover:bg-muted rounded-full"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        {/* Calorie Summary Card */}
        <Card className="shadow-sm border-0 bg-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">{currentCalories}</div>
              <div className="text-xs text-muted-foreground mb-3">
                {caloriesLeft > 0 ? 'Calories left' : 'Calories over'}
              </div>
              <div className="relative w-12 h-12 mx-auto">
                <ChartContainer
                  config={{
                    consumed: { color: "hsl(var(--foreground))" },
                    remaining: { color: "hsl(var(--muted))" }
                  }}
                  className="w-full h-full"
                >
                  <PieChart width={48} height={48}>
                    <Pie
                      data={caloriesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={15}
                      outerRadius={22}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      <Cell fill="hsl(var(--foreground))" />
                      <Cell fill="hsl(var(--muted))" />
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="w-3 h-3 text-foreground" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protein Card */}
        <Card className="shadow-sm border-0 bg-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-left mb-3">
              <div className="text-lg font-bold text-foreground">{proteinConsumed}g</div>
              <div className="text-xs text-muted-foreground">Protein</div>
            </div>
            <div className="relative w-10 h-10">
              <ChartContainer
                config={{
                  consumed: { color: "#ef4444" },
                  remaining: { color: "hsl(var(--muted))" }
                }}
                className="w-full h-full"
              >
                <PieChart width={40} height={40}>
                  <Pie
                    data={proteinData}
                    cx="50%"
                    cy="50%"
                    innerRadius={12}
                    outerRadius={18}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="#ef4444" />
                    <Cell fill="hsl(var(--muted))" />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <Beef className="w-2.5 h-2.5 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carbs Card */}
        <Card className="shadow-sm border-0 bg-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-left mb-3">
              <div className="text-lg font-bold text-foreground">{carbsConsumed}g</div>
              <div className="text-xs text-muted-foreground">Carbs</div>
            </div>
            <div className="relative w-10 h-10">
              <ChartContainer
                config={{
                  consumed: { color: "#f97316" },
                  remaining: { color: "hsl(var(--muted))" }
                }}
                className="w-full h-full"
              >
                <PieChart width={40} height={40}>
                  <Pie
                    data={carbsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={12}
                    outerRadius={18}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="#f97316" />
                    <Cell fill="hsl(var(--muted))" />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <Wheat className="w-2.5 h-2.5 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fats Card */}
        <Card className="shadow-sm border-0 bg-card rounded-2xl">
          <CardContent className="p-4">
            <div className="text-left mb-3">
              <div className="text-lg font-bold text-foreground">{fatsConsumed}g</div>
              <div className="text-xs text-muted-foreground">Fats</div>
            </div>
            <div className="relative w-10 h-10">
              <ChartContainer
                config={{
                  consumed: { color: "#3b82f6" },
                  remaining: { color: "hsl(var(--muted))" }
                }}
                className="w-full h-full"
              >
                <PieChart width={40} height={40}>
                  <Pie
                    data={fatsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={12}
                    outerRadius={18}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="hsl(var(--muted))" />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <Droplet className="w-2.5 h-2.5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotional Discount Box */}
      <Card className="shadow-sm border-0 bg-gradient-to-r from-pink-50 to-red-50 rounded-2xl mb-6">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-block bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2">
                80% off
              </div>
              <h3 className="text-sm font-bold text-foreground mb-0.5">Your trial ends today!</h3>
            </div>
            <div className="text-center mr-3">
              <div className="text-lg font-bold text-foreground">23:56:43</div>
            </div>
            <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-full px-4 py-2 text-sm">
              Resubscribe
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recently Logged */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-foreground mb-4 px-1">Recently logged</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {recentMeals.map((meal, index) => (
            <Card key={index} className="shadow-sm border-0 bg-card rounded-2xl min-w-[160px]">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-foreground text-sm">{meal.name}</div>
                  <div className={`w-2 h-2 rounded-full ${meal.type === 'scan' ? 'bg-green-500' : 'bg-blue-500'}`} />
                </div>
                <div className="text-xs text-muted-foreground">{meal.calories} cal</div>
                <div className="text-xs text-muted-foreground">{meal.time}</div>
                <div className="text-xs text-muted-foreground mt-1 capitalize">
                  {meal.type === 'scan' ? '📷 Scanned' : '✏️ Manual'}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={handleCameraClick}
        className="fixed bottom-20 right-4 w-12 h-12 rounded-full bg-foreground hover:bg-foreground/90 text-background shadow-lg"
        size="icon"
      >
        <Plus className="w-5 h-5" />
      </Button>

      {/* Camera Capture Modal */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handlePhotoCapture}
      />

      <BottomNavigation />
    </div>
  );
};