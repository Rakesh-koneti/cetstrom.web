import { PracticePapers } from '../components/practice-papers';
import { PreviousYearPapers } from '../components/previous-year-papers';
import { useTheme } from '../lib/theme-context';

export function PracticePapersPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h1 className={`text-3xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Practice Papers
      </h1>
      <div className="grid grid-cols-1 gap-6">
        <PracticePapers />
        <PreviousYearPapers />
      </div>
    </div>
  );
}