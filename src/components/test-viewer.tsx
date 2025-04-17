import { useState } from 'react';
import { Button } from './ui/button';
import { X, RefreshCcw, Maximize2 } from 'lucide-react';

interface TestViewerProps {
  url: string;
  onClose: () => void;
}

export function TestViewer({ url, onClose }: TestViewerProps) {
  const [isLoading, setIsLoading] = useState(true);

  const handleFullscreen = () => {
    const iframe = document.querySelector('iframe');
    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative w-full h-screen bg-white dark:bg-gray-800">
        {/* Header */}
        <div className="absolute top-0 right-0 m-4 z-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleFullscreen}
            className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            title="Fullscreen"
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const iframe = document.querySelector('iframe');
              if (iframe) {
                iframe.src = url;
              }
            }}
            className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            title="Refresh"
          >
            <RefreshCcw className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onClose}
            className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            title="Close"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-gray-800">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* Test Content */}
        <iframe
          src={url}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          allow="fullscreen; payment"
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          title="Mock Test"
        />
      </div>
    </div>
  );
} 