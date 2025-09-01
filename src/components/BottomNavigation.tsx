import { Home, BarChart3, Settings } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/analytics', icon: BarChart3, label: 'Analytics' },
    { path: '/settings', icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 safe-area-pb">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center py-2 px-4 rounded-lg transition-colors ${
              isActive(item.path)
                ? 'text-black'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <item.icon 
              className={`w-6 h-6 mb-1 ${
                isActive(item.path) ? 'text-black' : 'text-gray-400'
              }`} 
            />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};