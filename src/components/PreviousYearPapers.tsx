import { useState } from 'react';
import { useTheme } from '../lib/theme-context';
import { FileText, Download, ChevronDown, ChevronUp, GraduationCap, Pill } from 'lucide-react';

interface Paper {
  id: string;
  title: string;
  year: number;
  subject: string;
  stream: 'engineering' | 'pharmacy';
  downloadUrl: string;
  date?: string; // Optional date field for specific exam dates
}

const dummyPapers: Paper[] = [
  // Engineering papers
  {
    id: '1',
    title: 'Engineering Mathematics 2024',
    year: 2024,
    subject: 'Mathematics',
    stream: 'engineering',
    downloadUrl: '#'
  },
  {
    id: '2',
    title: 'Physics Entrance Exam 2024',
    year: 2024,
    subject: 'Physics',
    stream: 'engineering',
    downloadUrl: '#'
  },
  {
    id: '3',
    title: 'Chemistry Final 2023',
    year: 2023,
    subject: 'Chemistry',
    stream: 'engineering',
    downloadUrl: '#'
  },
  {
    id: '7',
    title: '18 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/18-may-2024-forenoon.pdf',
    date: '18 May 2024'
  },
  // Pharmacy papers
  {
    id: '4',
    title: 'Pharmaceutical Chemistry 2024',
    year: 2024,
    subject: 'Chemistry',
    stream: 'pharmacy',
    downloadUrl: '#'
  },
  {
    id: '5',
    title: 'Pharmacology 2024',
    year: 2024,
    subject: 'Pharmacology',
    stream: 'pharmacy',
    downloadUrl: '#'
  },
  {
    id: '6',
    title: 'Pharmaceutical Analysis 2023',
    year: 2023,
    subject: 'Analysis',
    stream: 'pharmacy',
    downloadUrl: '#'
  },
];

export function PreviousYearPapers() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedStream, setExpandedStream] = useState<'engineering' | 'pharmacy' | null>(null);

  const years = [...new Set(dummyPapers.map(paper => paper.year))];
  const streams = ['engineering', 'pharmacy'] as const;

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const toggleStream = (stream: 'engineering' | 'pharmacy') => {
    setExpandedStream(expandedStream === stream ? null : stream);
  };

  const getPapersByStreamAndYear = (stream: 'engineering' | 'pharmacy', year: number) => {
    return dummyPapers.filter(paper => paper.stream === stream && paper.year === year);
  };

  return (
    <div className="space-y-8">
      {streams.map(stream => (
        <div key={stream} className={`rounded-lg shadow-md ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          <button
            onClick={() => toggleStream(stream)}
            className={`w-full flex items-center justify-between p-4 border-b ${isDark ? 'text-white border-gray-700' : 'text-gray-900 border-gray-200'}`}
          >
            <div className="flex items-center space-x-3">
              {stream === 'engineering' ? (
                <GraduationCap className="w-6 h-6 text-orange-500" />
              ) : (
                <Pill className="w-6 h-6 text-amber-500" />
              )}
              <h2 className="text-xl font-bold capitalize">
                {stream === 'engineering' ? 'Engineering Papers' : 'Pharmacy Papers'}
              </h2>
            </div>
            {expandedStream === stream ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
          
          {expandedStream === stream && (
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
                      {getPapersByStreamAndYear(stream, year).map(paper => (
                        <div
                          key={paper.id}
                          className={`flex items-center justify-between p-3 rounded-lg mb-2 ${
                            isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <FileText className={`w-5 h-5 ${stream === 'engineering' ? 'text-orange-500' : 'text-amber-500'}`} />
                            <div>
                              <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {paper.title}
                              </p>
                              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                {paper.subject} {paper.date && `• ${paper.date}`}
                              </p>
                            </div>
                          </div>
                          <a
                            href={paper.downloadUrl}
                            className={`p-2 rounded-full ${stream === 'engineering' ? 'hover:bg-orange-100 text-orange-500' : 'hover:bg-amber-100 text-amber-500'}`}
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
          )}
        </div>
      ))}
    </div>
  );
}