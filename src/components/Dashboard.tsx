import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChartContainer } from '@/components/ui/chart';
import { PieChart, Pie, Cell } from 'recharts';
import { Camera, Flame, Beef, Wheat, Droplet, Plus } from 'lucide-react';
import { CameraCapture } from './CameraCapture';
import { toast } from '@/hooks/use-toast';

export const Dashboard = () => {
  const [userData, setUserData] = useState<any>(null);
  const [currentDay, setCurrentDay] = useState(new Date().getDay());
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

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dayNumbers = [14, 15, 16, 17, 18, 19, 20];
  
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🍎</span>
          </div>
          <h1 className="text-2xl font-bold text-black">Cal AI</h1>
        </div>
        
        {/* Streak Counter */}
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
            <span className="text-orange-600 text-sm">🔥</span>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-black">{streakCount}</div>
          </div>
        </div>
      </div>

      {/* Week Calendar */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-3">
          {days.map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-xs text-gray-500 mb-1 font-medium">{day}</div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  index === currentDay
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {dayNumbers[index]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {/* Calorie Summary Card */}
        <Card className="shadow-lg border-0 bg-white rounded-3xl">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-black mb-2">{currentCalories}</div>
              <div className="text-sm text-gray-500 mb-6">
                {caloriesLeft > 0 ? 'Calories left' : 'Calories over'}
              </div>
              <div className="relative w-20 h-20 mx-auto">
                <ChartContainer
                  config={{
                    consumed: { color: "#000000" },
                    remaining: { color: "#f3f4f6" }
                  }}
                  className="w-full h-full"
                >
                  <PieChart width={80} height={80}>
                    <Pie
                      data={caloriesData}
                      cx="50%"
                      cy="50%"
                      innerRadius={25}
                      outerRadius={35}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      <Cell fill="#000000" />
                      <Cell fill="#f3f4f6" />
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-black" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protein Card */}
        <Card className="shadow-lg border-0 bg-white rounded-3xl">
          <CardContent className="p-6">
            <div className="text-left mb-4">
              <div className="text-xl font-bold text-black">{proteinConsumed}g</div>
              <div className="text-sm font-medium text-gray-500">Protein left</div>
            </div>
            <div className="relative w-12 h-12">
              <ChartContainer
                config={{
                  consumed: { color: "#ef4444" },
                  remaining: { color: "#f3f4f6" }
                }}
                className="w-full h-full"
              >
                <PieChart width={48} height={48}>
                  <Pie
                    data={proteinData}
                    cx="50%"
                    cy="50%"
                    innerRadius={15}
                    outerRadius={22}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="#ef4444" />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <Beef className="w-3 h-3 text-red-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Carbs Card */}
        <Card className="shadow-lg border-0 bg-white rounded-3xl">
          <CardContent className="p-6">
            <div className="text-left mb-4">
              <div className="text-xl font-bold text-black">{carbsConsumed}g</div>
              <div className="text-sm font-medium text-gray-500">Carbs left</div>
            </div>
            <div className="relative w-12 h-12">
              <ChartContainer
                config={{
                  consumed: { color: "#f97316" },
                  remaining: { color: "#f3f4f6" }
                }}
                className="w-full h-full"
              >
                <PieChart width={48} height={48}>
                  <Pie
                    data={carbsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={15}
                    outerRadius={22}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="#f97316" />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <Wheat className="w-3 h-3 text-orange-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fats Card */}
        <Card className="shadow-lg border-0 bg-white rounded-3xl">
          <CardContent className="p-6">
            <div className="text-left mb-4">
              <div className="text-xl font-bold text-black">{fatsConsumed}g</div>
              <div className="text-sm font-medium text-gray-500">Fats left</div>
            </div>
            <div className="relative w-12 h-12">
              <ChartContainer
                config={{
                  consumed: { color: "#3b82f6" },
                  remaining: { color: "#f3f4f6" }
                }}
                className="w-full h-full"
              >
                <PieChart width={48} height={48}>
                  <Pie
                    data={fatsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={15}
                    outerRadius={22}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    <Cell fill="#3b82f6" />
                    <Cell fill="#f3f4f6" />
                  </Pie>
                </PieChart>
              </ChartContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <Droplet className="w-3 h-3 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Promotional Discount Box */}
      <Card className="shadow-lg border-0 bg-gradient-to-r from-pink-100 to-red-100 rounded-3xl mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="inline-block bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-3">
                80% off
              </div>
              <h3 className="text-lg font-bold text-black mb-1">Your trial</h3>
              <h3 className="text-lg font-bold text-black">ends today!!</h3>
            </div>
            <div className="text-center mr-4">
              <div className="text-2xl font-bold text-black mb-1">23 : 56 : 43</div>
            </div>
            <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6 py-3">
              Resubscribe now
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recently Logged */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-black mb-6">Recently logged</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {recentMeals.map((meal, index) => (
            <Card key={index} className="shadow-lg border-0 bg-white rounded-3xl min-w-[200px]">
              <CardContent className="p-5">
                <div className="font-semibold text-black text-sm">{meal.name}</div>
                <div className="text-xs text-gray-500 mt-1">{meal.calories} cal</div>
                <div className="text-xs text-gray-400">{meal.time}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Floating Action Button */}
      <Button
        onClick={handleCameraClick}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black hover:bg-black/90 text-white shadow-lg"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Camera Capture Modal */}
      <CameraCapture
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handlePhotoCapture}
      />
    </div>
  );
};