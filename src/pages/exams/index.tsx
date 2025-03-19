import { Link } from 'react-router-dom';
import { useTheme } from '../../lib/theme-context';
import {
  Brain,
  Beaker,
  Leaf,
} from 'lucide-react';

const streams = [
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Practice tests for engineering entrance and competitive exams',
    icon: Brain,
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    description: 'Practice tests for pharmacy entrance and professional exams',
    icon: Beaker,
    subjects: ['Biology', 'Chemistry', 'Pharmacology', 'Pharmaceutical Analysis'],
  },
];

export function ExamsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Initialize empty exams array in localStorage if it doesn't exist
  if (!localStorage.getItem('exams')) {
    localStorage.setItem('exams', '[]');
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center">
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Choose Your Stream
        </h1>
        <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Select your field of study to find relevant practice tests
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2">
        {streams.map((stream) => {
          const Icon = stream.icon;
          return (
            <Link
              key={stream.id}
              to={`/exams/${stream.id}`}
              className={`group relative rounded-lg p-6 transition-all duration-200 hover:scale-105 ${
                isDark
                  ? 'bg-gray-800/50 ring-1 ring-gray-700 hover:ring-violet-500'
                  : 'bg-white ring-1 ring-gray-200 hover:ring-violet-500'
              }`}
            >
              <div className={`flex items-center gap-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                <span className={`rounded-lg p-3 ring-1 ${
                  isDark ? 'bg-gray-700 ring-gray-600' : 'bg-gray-50 ring-gray-200'
                }`}>
                  <Icon className="h-6 w-6 text-violet-600" />
                </span>
                <h2 className="text-xl font-semibold">{stream.title}</h2>
              </div>

              <p className={`mt-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {stream.description}
              </p>

              <div className="mt-6">
                <h3 className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  Key Subjects:
                </h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {stream.subjects.map((subject) => (
                    <span
                      key={subject}
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        isDark
                          ? 'bg-gray-700 text-gray-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>

              <div className={`mt-6 text-sm font-medium ${
                isDark ? 'text-violet-400' : 'text-violet-600'
              }`}>
                View Tests →
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
} 