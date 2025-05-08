import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export function VisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Get the current count from localStorage
    const storedCount = localStorage.getItem('visitorCount');
    const currentCount = storedCount ? parseInt(storedCount) : 0;
    
    // Increment the count
    const newCount = currentCount + 1;
    setVisitorCount(newCount);
    
    // Store the new count
    localStorage.setItem('visitorCount', newCount.toString());

    // Update the count every 5 seconds to simulate live updates
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 right-0 z-40 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-sm border-t border-gray-200 dark:border-gray-700`}>
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center gap-2">
        <div className="relative">
          <Users className="w-5 h-5 text-purple-600" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Live Visitors:
          </span>
          <span className={`text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600`}>
            {visitorCount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
} 