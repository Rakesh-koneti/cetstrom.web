import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function GrandMockTestPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if popup was shown in the last 24 hours
    const lastShown = localStorage.getItem('popupLastShown');
    const now = new Date().getTime();
    
    if (!lastShown || (now - parseInt(lastShown)) > 24 * 60 * 60 * 1000) {
      setIsVisible(true);
      localStorage.setItem('popupLastShown', now.toString());
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full relative shadow-2xl transform transition-all animate-fade-in">
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center space-y-4">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium mb-4">
            🎉 Exciting News!
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Grand Mock Test Coming Soon!
          </h3>
          
          <p className="text-gray-600 dark:text-gray-300">
            Get ready for our biggest mock test event with exciting prizes and rewards. Stay tuned for more details!
          </p>
          
          <div className="pt-4">
            <button
              onClick={() => setIsVisible(false)}
              className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-all transform hover:scale-105"
            >
              I'm Interested!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 