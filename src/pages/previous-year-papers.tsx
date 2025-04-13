import { PreviousYearPapers } from '../components/PreviousYearPapers';
import { useTheme } from '../lib/theme-context';
import { FileText } from 'lucide-react';

export function PreviousYearPapersPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Previous Year Papers
        </h1>
        <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Access previous year question papers for engineering and pharmacy entrance exams
        </p>
      </div>
      
      <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200 dark:border-orange-800">
        <div className="flex items-start space-x-3">
          <FileText className="w-6 h-6 text-orange-500 mt-1 flex-shrink-0" />
          <div>
            <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              How to use these papers
            </h3>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              These previous year papers are organized by stream and year. Click on a stream to expand and see available years, 
              then click on a year to see the papers available for that year. You can download any paper by clicking the download icon.
            </p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <PreviousYearPapers />
      </div>
    </div>
  );
}