import { PreviousYearPapers } from '../components/PreviousYearPapers';
import { useTheme } from '../lib/theme-context';

export function PreviousYearPapersPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Previous Year Papers
      </h1>
      <div className="grid grid-cols-1 gap-6">
        <PreviousYearPapers />
      </div>
    </div>
  );
}