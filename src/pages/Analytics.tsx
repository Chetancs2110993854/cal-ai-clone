import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Info, CheckCircle } from 'lucide-react';
import { BottomNavigation } from '@/components/BottomNavigation';

export const Analytics = () => {
  const [userData, setUserData] = useState<any>(null);
  const [activeTimeFilter, setActiveTimeFilter] = useState('90 Days');

  useEffect(() => {
    // Load user data from localStorage
    const storedData = {
      goal: localStorage.getItem('fitnessGoal'),
      gender: localStorage.getItem('gender'),
      height: localStorage.getItem('height'),
      weight: localStorage.getItem('weight'),
      birthday: localStorage.getItem('birthday'),
    };
    setUserData(storedData);
  }, []);

  // Calculate BMI and status
  const calculateBMI = () => {
    if (!userData?.height || !userData?.weight) return { bmi: 0, status: 'Unknown', color: 'gray' };
    
    const heightInMeters = parseInt(userData.height) / 100;
    const weight = parseInt(userData.weight);
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let status = 'Unknown';
    let color = 'gray';
    let progress = 50;
    
    if (bmi < 18.5) {
      status = 'Underweight';
      color = 'blue';
      progress = 20;
    } else if (bmi >= 18.5 && bmi < 25) {
      status = 'Healthy';
      color = 'green';
      progress = 60;
    } else if (bmi >= 25 && bmi < 30) {
      status = 'Overweight';
      color = 'yellow';
      progress = 80;
    } else {
      status = 'Obese';
      color = 'red';
      progress = 95;
    }
    
    return { bmi: bmi.toFixed(2), status, color, progress };
  };

  const { bmi, status, color, progress } = calculateBMI();
  
  const timeFilters = ['90 Days', '6 Months', '1 Year', 'All time'];
  
  // Mock weight progress data
  const weightData = [
    { date: '26 Aug', weight: 71.2 },
    { date: '26 Aug', weight: 71.0 },
    { date: '26 Aug', weight: 70.8 },
    { date: '26 Aug', weight: 70.6 },
    { date: '26 Aug', weight: 70.4 }
  ];

  // Mock nutrition data
  const nutritionTabs = ['This Week', 'Last Week', '2 wks. ago', '3 wks. ago'];
  const [activeNutritionTab, setActiveNutritionTab] = useState('This Week');

  const currentWeight = userData?.weight ? parseInt(userData.weight) : 71;
  const goalWeight = 76; // Mock goal weight

  if (!userData) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
      </div>

      <div className="px-4 space-y-4 mt-4">
        {/* Weight Goal Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-base text-muted-foreground">Weight Goal</span>
            <Button variant="outline" className="rounded-full px-4 py-1 text-sm h-8">
              Update
            </Button>
          </div>
          <div className="text-3xl font-bold text-foreground">{goalWeight} kg</div>
        </div>

        {/* Current Weight Card */}
        <Card className="bg-card rounded-2xl shadow-sm border-0">
          <CardContent className="p-5">
            <div className="space-y-3">
              <span className="text-base text-muted-foreground">Current Weight</span>
              <div className="text-3xl font-bold text-foreground">{currentWeight} kg</div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Try to update once a week so we can adjust your plan to ensure you hit your goal.
              </p>
              <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl py-3 text-base font-semibold">
                Log weight
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* BMI Section */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-foreground">Your BMI</h2>
          
          <Card className="bg-card rounded-2xl shadow-sm border-0">
            <CardContent className="p-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground text-sm">Your weight is</span>
                    <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      {status}
                    </div>
                  </div>
                  <Info className="w-4 h-4 text-muted-foreground" />
                </div>
                
                <div className="text-3xl font-bold text-foreground">{bmi}</div>
                
                <div className="space-y-2">
                  <Progress value={progress} className="h-2 bg-muted">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </Progress>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-muted-foreground">Underweight</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-muted-foreground">Healthy</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-muted-foreground">Overweight</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-muted-foreground">Obese</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goal Progress Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Goal Progress</h2>
            <span className="text-muted-foreground text-sm">0.0% <span className="text-muted-foreground/60">Goal achieved</span></span>
          </div>
          
          {/* Time Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {timeFilters.map((filter) => (
              <Button
                key={filter}
                variant={activeTimeFilter === filter ? "default" : "outline"}
                onClick={() => setActiveTimeFilter(filter)}
                className={`rounded-full px-3 py-1 text-xs whitespace-nowrap h-8 ${
                  activeTimeFilter === filter 
                    ? 'bg-foreground text-background' 
                    : 'bg-card text-muted-foreground border-border hover:bg-accent'
                }`}
              >
                {filter}
              </Button>
            ))}
          </div>
          
          {/* Weight Chart */}
          <Card className="bg-card rounded-2xl shadow-sm border-0">
            <CardContent className="p-4">
              <div className="h-32 relative">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>72</span>
                  <span>71.6</span>
                  <span>71.2</span>
                  <span>70.8</span>
                  <span>70.4</span>
                  <span>70</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-8 h-full bg-muted rounded-lg flex items-end justify-between px-3 pb-3 relative">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="border-t border-border/50"></div>
                    ))}
                  </div>
                  
                  {/* Mock data points */}
                  <div className="w-full h-full relative">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <polyline
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        points="20,80 50,70 80,60 110,55 140,50 170,45"
                      />
                      {[20, 50, 80, 110, 140, 170].map((x, i) => (
                        <circle key={i} cx={x} cy={80 - i * 7} r="3" fill="hsl(var(--primary))" />
                      ))}
                    </svg>
                  </div>
                </div>
                
                {/* X-axis labels */}
                <div className="ml-8 mt-1 flex justify-between text-xs text-muted-foreground">
                  {weightData.slice(0, 5).map((data, i) => (
                    <span key={i}>{data.date.split(' ')[0]}</span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Nutrition Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">Nutrition</h2>
            <span className="text-muted-foreground text-sm">This vs previous week</span>
          </div>
          
          {/* Nutrition Filter Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {nutritionTabs.map((tab) => (
              <Button
                key={tab}
                variant={activeNutritionTab === tab ? "default" : "outline"}
                onClick={() => setActiveNutritionTab(tab)}
                className={`rounded-full px-3 py-1 text-xs whitespace-nowrap h-8 ${
                  activeNutritionTab === tab 
                    ? 'bg-foreground text-background' 
                    : 'bg-card text-muted-foreground border-border hover:bg-accent'
                }`}
              >
                {tab}
              </Button>
            ))}
          </div>
          
          {/* Nutrition Stats */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-card rounded-2xl shadow-sm border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">0</div>
                <div className="text-muted-foreground text-sm">Total calories</div>
              </CardContent>
            </Card>
            
            <Card className="bg-card rounded-2xl shadow-sm border-0">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-foreground mb-1">0.0</div>
                <div className="text-muted-foreground text-sm">Daily avg.</div>
              </CardContent>
            </Card>
          </div>
          
          {/* Weekly Chart */}
          <Card className="bg-card rounded-2xl shadow-sm border-0">
            <CardContent className="p-4">
              <div className="h-24 relative">
                {/* Y-axis */}
                <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-muted-foreground">
                  <span>1.2</span>
                  <span>0.8</span>
                  <span>0.4</span>
                  <span>0.0</span>
                  <span>-0.4</span>
                  <span>-0.8</span>
                </div>
                
                {/* Chart area */}
                <div className="ml-6 h-full bg-muted rounded-lg relative">
                  {/* Grid line at zero */}
                  <div className="absolute top-1/2 left-0 right-0 border-t border-accent"></div>
                  
                  {/* X-axis labels */}
                  <div className="absolute bottom-1 left-0 right-0 flex justify-around text-xs text-muted-foreground">
                    {['S', 'M', 'T', 'W', 'T', 'F'].map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};