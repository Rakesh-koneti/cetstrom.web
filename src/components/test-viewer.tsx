import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Maximize2, RefreshCcw, X } from 'lucide-react';
import screenfull from 'screenfull';

interface TestViewerProps {
  url: string;
  onClose: () => void;
}

export function TestViewer({ url, onClose }: TestViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleFullscreen = () => {
    const container = document.querySelector('.test-viewer-container');
    if (container && screenfull.isEnabled) {
      screenfull.request(container);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="test-viewer-container relative h-full bg-white dark:bg-gray-900">
        {/* Controls */}
        <div className={`
          fixed top-0 left-0 right-0 z-10 flex items-center justify-between
          px-4 py-2 bg-white/95 dark:bg-gray-800/95 border-b border-gray-200 dark:border-gray-700
          ${isMobile ? 'h-12' : 'h-14'}
        `}>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Mock Test
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleFullscreen}
              className="h-8 w-8 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Fullscreen"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {
                const iframe = document.querySelector('iframe');
                if (iframe) {
                  iframe.src = url;
                  setIsLoading(true);
                }
              }}
              className="h-8 w-8 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
              title="Refresh"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
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
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              <p className="text-gray-600 dark:text-gray-300">Loading mock test...</p>
            </div>
          </div>
        )}

        {/* Test Content */}
        <iframe
          src={url}
          className={`w-full h-[calc(100vh-${isMobile ? '48px' : '56px'})] mt-${isMobile ? '12' : '14'}`}
          onLoad={() => setIsLoading(false)}
          allow="fullscreen; payment"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          title="Mock Test"
        />
      </div>
    </div>
  );
} 