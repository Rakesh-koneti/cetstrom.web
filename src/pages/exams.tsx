import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { PreviousYearPapers } from '../components/PreviousYearPapers';
import {
  Brain,
  Beaker,
  Calculator,
  Atom,
  Microscope,
  TestTube,
} from 'lucide-react';

const streams = [
  {
    id: 'engineering',
    title: 'Engineering',
    description: 'Practice tests for engineering entrance and competitive exams',
    icon: Brain,
    subjects: [
      { id: 'mathematics', name: 'Mathematics', icon: Calculator },
      { id: 'physics', name: 'Physics', icon: Atom },
      { id: 'chemistry', name: 'Chemistry', icon: TestTube },
    ],
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    description: 'Practice tests for pharmacy entrance and professional exams',
    icon: Beaker,
    subjects: [
      { id: 'biology', name: 'Biology', icon: Microscope },
      { id: 'chemistry', name: 'Chemistry', icon: TestTube },
      { id: 'physics', name: 'Physics', icon: Atom },
    ],
  },
];

export function ExamsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  // Launch popup removed

  // Popup handler removed

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Launch Popup removed */}

          {/* Header */}
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className={`text-2xl font-semibold leading-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Practice Tests
              </h1>
              <p className={`mt-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Choose your stream and subject to start practicing
              </p>
            </div>
          </div>

          {/* Streams Grid */}
          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            {streams.map((stream) => (
              <div
                key={stream.id}
                className={`group relative rounded-xl p-6 ${isDark ? 'bg-gray-800/50 ring-1 ring-gray-700 hover:ring-violet-500' : 'bg-white ring-1 ring-gray-200 shadow-lg hover:ring-violet-500'} transition-all duration-200`}
              >
                {/* Stream Header */}
                <div className={`flex items-center gap-x-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  <span className={`rounded-lg p-3 ring-1 ${
                    isDark ? 'bg-gray-700 ring-gray-600' : 'bg-violet-50 ring-violet-200'
                  }`}>
                    <stream.icon className="h-8 w-8 text-violet-600" />
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold">{stream.title}</h3>
                    <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      {stream.description}
                    </p>
                  </div>
                </div>

                {/* Subjects Grid */}
                <div className="mt-8">
                  <h4 className={`text-sm font-medium mb-4 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Available Subjects:
                  </h4>
                  <div className="grid gap-3">
                    {stream.subjects.map((subject) => (
                      <Link
                        key={subject.id}
                        to={`/exams/${stream.id}?subject=${encodeURIComponent(subject.name)}`}
                        className={`flex items-center gap-3 p-4 rounded-lg transition-all duration-200 ${
                          isDark
                            ? 'bg-gray-700/50 text-white hover:bg-violet-600 hover:scale-102'
                            : 'bg-gray-50 text-gray-900 hover:bg-violet-600 hover:text-white hover:scale-102'
                        } transform hover:-translate-y-1`}
                      >
                        <span className={`p-2 rounded-lg ${
                          isDark ? 'bg-gray-600' : 'bg-white'
                        }`}>
                          <subject.icon className="h-5 w-5 text-violet-600" />
                        </span>
                        <span className="font-medium">{subject.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <PreviousYearPapers />
        </div>
      </div>
    </div>
  );
}