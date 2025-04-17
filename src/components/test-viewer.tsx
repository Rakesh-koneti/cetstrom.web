import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, RefreshCcw, Maximize2 } from 'lucide-react';

interface TestViewerProps {
  url: string;
  onClose: () => void;
}

export function TestViewer({ url, onClose }: TestViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFullscreen = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="relative w-full h-screen">
        {/* Header */}
        <div className={`
          absolute top-0 left-0 right-0 z-10 flex items-center
          ${isMobile ? 'justify-between bg-white dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700' : 'justify-end p-4'}
        `}>
          {isMobile && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Mock Test
              </span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleFullscreen}
              className="h-8 w-8 p-0 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe) {
                  iframe.src = url;
                  setIsLoading(true);
                }
              }}
              className="h-8 w-8 p-0 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
              title="Refresh"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
              title="Close"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                Loading mock test...
              </p>
            </div>
          </div>
        )}

        {/* Test Content */}
        <iframe
          src={url}
          className={`w-full border-0 ${isMobile ? 'h-[calc(100vh-48px)] mt-12' : 'h-full'}`}
          onLoad={() => setIsLoading(false)}
          allow="fullscreen; payment"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          title="Mock Test"
        />
      </div>
    </div>
  );
} 