import React, { useState, useEffect } from 'react';
import { useLanguage } from '../lib/language-context';

interface VoiceSearchProps {
  onSearchResult: (text: string) => void;
}

export function VoiceSearch({ onSearchResult }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const { language } = useLanguage();
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        onSearchResult(text);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognition);
    }
  }, [onSearchResult]);

  const startListening = () => {
    if (recognition) {
      recognition.lang = language === 'en' ? 'en-US' : 
                        language === 'hi' ? 'hi-IN' : 
                        'te-IN';
      recognition.start();
      setIsListening(true);
    }
  };

  if (!recognition) {
    return null;
  }

  return (
    <button
      onClick={startListening}
      disabled={isListening}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
    >
      {isListening ? (
        <span>Listening...</span>
      ) : (
        <>
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          Voice Search
        </>
      )}
    </button>
  );
} 