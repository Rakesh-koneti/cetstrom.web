import { useState } from 'react';
import { useTheme } from '../lib/theme-context';
import { FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  year: number;
  subject: string;
  downloadUrl: string;
}

const dummyPapers: Paper[] = [
  {
    id: '1',
    title: 'Engineering Mathematics 2024',
    year: 2024,
    subject: 'Mathematics',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Physics Entrance Exam 2024',
    year: 2024,
    subject: 'Physics',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Chemistry Final 2023',
    year: 2023,
    subject: 'Chemistry',
    downloadUrl: '#'
  },
];

export function PreviousYearPapers() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedYear, setExpandedYear] = useState<number | null>(null);

  const years = [...new Set(dummyPapers.map(paper => paper.year))];

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  return (
    <div className={`rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
      <h2 className={`text-xl font-bold p-4 border-b ${isDark ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'}`}>
        Previous Year Papers
      </h2>
      <div className="p-4 space-y-4">
        {years.map(year => (
          <div key={year} className={`border rounded-lg ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <button
              onClick={() => toggleYear(year)}
              className={`w-full flex items-center justify-between p-4 ${isDark ? 'text-white hover:bg-gray-700' : 'text-gray-900 hover:bg-gray-50'}`}
            >
              <span className="font-medium">{year}</span>
              {expandedYear === year ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            {expandedYear === year && (
              <div className={`p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
                {dummyPapers
                  .filter(paper => paper.year === year)
                  .map(paper => (
                    <div
                      key={paper.id}
                      className={`flex items-center justify-between p-3 rounded-lg mb-2 ${
                        isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-violet-600" />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {paper.title}
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                            {paper.subject}
                          </p>
                        </div>
                      </div>
                      <a
                        href={paper.downloadUrl}
                        className="p-2 rounded-full hover:bg-violet-100 text-violet-600"
                        title="Download"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}