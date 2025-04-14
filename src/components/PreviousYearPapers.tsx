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
  // Engineering papers 2024
  {
    id: '7',
    title: '18 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/18-may-2024-forenoon.pdf',
    date: '18 May 2024'
  },
  {
    id: '8',
    title: '19 May 2024 Afternoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/19-may-2024-afternoon.pdf',
    date: '19 May 2024'
  },
  {
    id: '9',
    title: '20 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/20-may-2024-forenoon.pdf',
    date: '20 May 2024'
  },
  {
    id: '10',
    title: '20 May 2024 Afternoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/20-may-2024-afternoon.pdf',
    date: '20 May 2024'
  },
  {
    id: '11',
    title: '21 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/21-may-2024-forenoon.pdf',
    date: '21 May 2024'
  },
  {
    id: '12',
    title: '21 May 2024 Afternoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/21-may-2024-afternoon.pdf',
    date: '21 May 2024'
  },
  {
    id: '13',
    title: '22 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/22-may-2024-forenoon.pdf',
    date: '22 May 2024'
  },
  {
    id: '14',
    title: '22 May 2024 Afternoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/22-may-2024-afternoon.pdf',
    date: '22 May 2024'
  },
  {
    id: '15',
    title: '23 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/23-may-2024-forenoon.pdf',
    date: '23 May 2024'
  },
  // Engineering papers 2023
  {
    id: '20',
    title: '15 May 2023 Forenoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/15-may-2023-forenoon.pdf',
    date: '15 May 2023'
  },
  {
    id: '21',
    title: '15 May 2023 Afternoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/15-may-2023-afternoon.pdf',
    date: '15 May 2023'
  },
  {
    id: '22',
    title: '16 May 2023 Forenoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/16-may-2023-forenoon.pdf',
    date: '16 May 2023'
  },
  {
    id: '23',
    title: '16 May 2023 Afternoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/16-may-2023-afternoon.pdf',
    date: '16 May 2023'
  },
  {
    id: '24',
    title: '17 May 2023 Forenoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/17-may-2023-forenoon.pdf',
    date: '17 May 2023'
  },
  {
    id: '25',
    title: '17 May 2023 Afternoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/17-may-2023-afternoon.pdf',
    date: '17 May 2023'
  },
  {
    id: '26',
    title: '18 May 2023 Forenoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/18-may-2023-forenoon.pdf',
    date: '18 May 2023'
  },
  {
    id: '27',
    title: '18 May 2023 Afternoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/18-may-2023-afternoon.pdf',
    date: '18 May 2023'
  },
  {
    id: '28',
    title: '19 May 2023 Forenoon Paper',
    year: 2023,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/19-may-2023-forenoon.pdf',
    date: '19 May 2023'
  },
  // Engineering papers 2022
  {
    id: '40',
    title: '4 July 2022 Forenoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/4-july-2022-forenoon.pdf',
    date: '4 July 2022'
  },
  {
    id: '41',
    title: '4 July 2022 Afternoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/4-july-2022-afternoon.pdf',
    date: '4 July 2022'
  },
  {
    id: '42',
    title: '5 July 2022 Forenoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/5-july-2022-forenoon.pdf',
    date: '5 July 2022'
  },
  {
    id: '43',
    title: '5 July 2022 Afternoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/5-july-2022-afternoon.pdf',
    date: '5 July 2022'
  },
  {
    id: '44',
    title: '6 July 2022 Forenoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/6-july-2022-forenoon.pdf',
    date: '6 July 2022'
  },
  {
    id: '45',
    title: '6 July 2022 Afternoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/6-july-2022-afternoon.pdf',
    date: '6 July 2022'
  },
  {
    id: '46',
    title: '7 July 2022 Forenoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/7-july-2022-forenoon.pdf',
    date: '7 July 2022'
  },
  {
    id: '47',
    title: '7 July 2022 Afternoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/7-july-2022-afternoon.pdf',
    date: '7 July 2022'
  },
  {
    id: '48',
    title: '8 July 2022 Forenoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/8-july-2022-forenoon.pdf',
    date: '8 July 2022'
  },
  {
    id: '49',
    title: '8 July 2022 Afternoon Paper',
    year: 2022,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/8-july-2022-afternoon.pdf',
    date: '8 July 2022'
  },
  // Engineering papers 2021
  {
    id: '50',
    title: '19 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/19-august-2021-forenoon.pdf',
    date: '19 August 2021'
  },
  {
    id: '51',
    title: '19 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/19-august-2021-afternoon.pdf',
    date: '19 August 2021'
  },
  {
    id: '52',
    title: '20 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/20-august-2021-forenoon.pdf',
    date: '20 August 2021'
  },
  {
    id: '53',
    title: '20 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/20-august-2021-afternoon.pdf',
    date: '20 August 2021'
  },
  {
    id: '54',
    title: '23 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/23-august-2021-forenoon.pdf',
    date: '23 August 2021'
  },
  {
    id: '55',
    title: '23 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/23-august-2021-afternoon.pdf',
    date: '23 August 2021'
  },
  {
    id: '56',
    title: '24 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/24-august-2021-forenoon.pdf',
    date: '24 August 2021'
  },
  {
    id: '57',
    title: '24 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/24-august-2021-afternoon.pdf',
    date: '24 August 2021'
  },
  {
    id: '58',
    title: '25 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/25-august-2021-forenoon.pdf',
    date: '25 August 2021'
  },
  {
    id: '59',
    title: '25 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Engineering Entrance',
    stream: 'engineering',
    downloadUrl: '/papers/engineering/25-august-2021-afternoon.pdf',
    date: '25 August 2021'
  },
  // Pharmacy papers 2023
  {
    id: '35',
    title: '22 May 2023 Forenoon Paper',
    year: 2023,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/22-may-2023-forenoon.pdf',
    date: '22 May 2023'
  },
  {
    id: '36',
    title: '22 May 2023 Afternoon Paper',
    year: 2023,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/22-may-2023-afternoon.pdf',
    date: '22 May 2023'
  },
  {
    id: '37',
    title: '23 May 2023 Forenoon Paper',
    year: 2023,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/23-may-2023-forenoon.pdf',
    date: '23 May 2023'
  },
  {
    id: '38',
    title: '23 May 2023 Afternoon Paper',
    year: 2023,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/23-may-2023-afternoon.pdf',
    date: '23 May 2023'
  },
  // Pharmacy papers 2024
  {
    id: '16',
    title: '16 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/16-may-2024-forenoon.pdf',
    date: '16 May 2024'
  },
  {
    id: '17',
    title: '16 May 2024 Afternoon Paper',
    year: 2024,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/16-may-2024-afternoon.pdf',
    date: '16 May 2024'
  },
  {
    id: '18',
    title: '17 May 2024 Forenoon Paper',
    year: 2024,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/17-may-2024-forenoon.pdf',
    date: '17 May 2024'
  },
  {
    id: '19',
    title: '17 May 2024 Afternoon Paper',
    year: 2024,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/17-may-2024-afternoon.pdf',
    date: '17 May 2024'
  },
  // Pharmacy papers 2022
  {
    id: '60',
    title: '11 July 2022 Forenoon Paper',
    year: 2022,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/11-july-2022-forenoon.pdf',
    date: '11 July 2022'
  },
  {
    id: '61',
    title: '11 July 2022 Afternoon Paper',
    year: 2022,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/11-july-2022-afternoon.pdf',
    date: '11 July 2022'
  },
  {
    id: '62',
    title: '12 July 2022 Forenoon Paper',
    year: 2022,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/12-july-2022-forenoon.pdf',
    date: '12 July 2022'
  },
  {
    id: '63',
    title: '12 July 2022 Afternoon Paper',
    year: 2022,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/12-july-2022-afternoon.pdf',
    date: '12 July 2022'
  },
  // Pharmacy papers 2021
  {
    id: '70',
    title: '3 September 2021 Forenoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/3-september-2021-forenoon.pdf',
    date: '3 September 2021'
  },
  {
    id: '71',
    title: '3 September 2021 Afternoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/3-september-2021-afternoon.pdf',
    date: '3 September 2021'
  },
  {
    id: '72',
    title: '6 September 2021 Forenoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/6-september-2021-forenoon.pdf',
    date: '6 September 2021'
  },
  {
    id: '73',
    title: '6 September 2021 Afternoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/6-september-2021-afternoon.pdf',
    date: '6 September 2021'
  },
  {
    id: '74',
    title: '23 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/23-august-2021-forenoon.pdf',
    date: '23 August 2021'
  },
  {
    id: '75',
    title: '23 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/23-august-2021-afternoon.pdf',
    date: '23 August 2021'
  },
  {
    id: '76',
    title: '24 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/24-august-2021-forenoon.pdf',
    date: '24 August 2021'
  },
  {
    id: '77',
    title: '24 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/24-august-2021-afternoon.pdf',
    date: '24 August 2021'
  },
  {
    id: '78',
    title: '25 August 2021 Forenoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/25-august-2021-forenoon.pdf',
    date: '25 August 2021'
  },
  {
    id: '79',
    title: '25 August 2021 Afternoon Paper',
    year: 2021,
    subject: 'Pharmacy Entrance',
    stream: 'pharmacy',
    downloadUrl: '/papers/pharmacy/25-august-2021-afternoon.pdf',
    date: '25 August 2021'
  }
];

export function PreviousYearPapers() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedStream, setExpandedStream] = useState<'engineering' | 'pharmacy' | null>(null);

  const years = [...new Set(dummyPapers.map(paper => paper.year))].sort((a, b) => b - a);
  const streams = ['engineering', 'pharmacy'] as const;

  // Debug: Log available years and papers
  console.log('Available years:', years);
  console.log('2022 papers:', dummyPapers.filter(paper => paper.year === 2022));

  const toggleYear = (year: number) => {
    setExpandedYear(expandedYear === year ? null : year);
  };

  const toggleStream = (stream: 'engineering' | 'pharmacy') => {
    setExpandedStream(expandedStream === stream ? null : stream);
  };

  const getPapersByStreamAndYear = (stream: 'engineering' | 'pharmacy', year: number) => {
    const papers = dummyPapers.filter(paper => paper.stream === stream && paper.year === year);
    console.log(`Papers for ${stream} ${year}:`, papers);
    return papers;
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
              {years.map(year => {
                const papersForYear = getPapersByStreamAndYear(stream, year);
                // Only show years that have papers for this stream
                if (papersForYear.length === 0) return null;
                
                return (
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
                        {papersForYear.map(paper => (
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
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}