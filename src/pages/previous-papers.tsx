import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Download, Filter } from 'lucide-react';

interface PaperType {
  id: string;
  year: number;
  stream: string;
  subject: string;
  title: string;
  downloadUrl: string;
}

export function PreviousPapersPage() {
  const [selectedStream, setSelectedStream] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');

  // Sample data - replace with your actual data
  const papers: PaperType[] = [
    {
      id: '1',
      year: 2023,
      stream: 'Engineering',
      subject: 'Mathematics',
      title: 'EAMCET Engineering Mathematics 2023',
      downloadUrl: '/papers/eamcet-2023-math.pdf'
    },
    {
      id: '2',
      year: 2023,
      stream: 'Engineering',
      subject: 'Physics',
      title: 'EAMCET Engineering Physics 2023',
      downloadUrl: '/papers/eamcet-2023-physics.pdf'
    },
    {
      id: '3',
      year: 2023,
      stream: 'Pharmacy',
      subject: 'Biology',
      title: 'EAMCET Pharmacy Biology 2023',
      downloadUrl: '/papers/eamcet-2023-biology.pdf'
    },
    // Add more papers as needed
  ];

  const filteredPapers = papers.filter(paper => {
    return (
      (selectedStream === 'all' || paper.stream === selectedStream) &&
      (selectedSubject === 'all' || paper.subject === selectedSubject) &&
      (selectedYear === 'all' || paper.year === selectedYear)
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Previous Year Papers
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Access past exam papers to enhance your preparation
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <select
              value={selectedStream}
              onChange={(e) => setSelectedStream(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
            >
              <option value="all">All Streams</option>
              <option value="Engineering">Engineering</option>
              <option value="Pharmacy">Pharmacy</option>
            </select>

            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
            >
              <option value="all">All Subjects</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-2"
            >
              <option value="all">All Years</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
          </div>
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {paper.year}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {paper.title}
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm rounded">
                    {paper.stream}
                  </span>
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400 text-sm rounded">
                    {paper.subject}
                  </span>
                </div>
                <a
                  href={paper.downloadUrl}
                  className="flex items-center justify-center gap-2 w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download Paper
                </a>
              </div>
            </div>
          ))}
        </div>

        {filteredPapers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No papers found matching your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 