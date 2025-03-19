import { Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { FileText } from 'lucide-react';

const papers = [
  {
    id: 1,
    title: 'CET 2024',
    subject: 'All Subjects',
    downloadUrl: '/papers/cet-2024.pdf'
  },
  {
    id: 2,
    title: 'CET 2023',
    subject: 'All Subjects',
    downloadUrl: '/papers/cet-2023.pdf'
  },
  {
    id: 3,
    title: 'CET 2022',
    subject: 'All Subjects',
    downloadUrl: '/papers/cet-2022.pdf'
  }
];

export function PreviousYearPapers() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`rounded-xl p-6 ${isDark ? 'bg-gray-800/50 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200 shadow-lg'}`}>
      <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Previous Year Papers
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