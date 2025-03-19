import { Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { FileText } from 'lucide-react';

const papers = [
  {
    id: 1,
    title: 'Practice Test 1',
    subject: 'Mathematics',
    downloadUrl: '/papers/practice-test-1.pdf'
  },
  {
    id: 2,
    title: 'Practice Test 2',
    subject: 'Physics',
    downloadUrl: '/papers/practice-test-2.pdf'
  },
  {
    id: 3,
    title: 'Practice Test 3',
    subject: 'Chemistry',
    downloadUrl: '/papers/practice-test-3.pdf'
  }
];

export function PracticePapers() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200 shadow-lg'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Practice Papers
      </h2>
      <div className="space-y-3">
        {papers.map((paper) => (
          <Link
            key={paper.id}
            to={paper.downloadUrl}
            className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
              isDark
                ? 'bg-gray-700/50 text-white hover:bg-violet-600'
                : 'bg-gray-50 text-gray-900 hover:bg-violet-600 hover:text-white'
            }`}
          >
            <FileText className="h-5 w-5 text-violet-600" />
            <div>
              <h3 className="font-medium">{paper.title}</h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{paper.subject}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}