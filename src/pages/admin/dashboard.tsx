import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/auth-context';
import { Exam, Stream } from '../../lib/types';
import {
  PlusCircle,
  Brain,
  Beaker,
  Leaf,
  Target,
  Calendar,
  BarChart,
  Loader2,
} from 'lucide-react';

const streamInfo = {
  engineering: {
    title: 'Engineering',
    icon: Brain,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  pharmacy: {
    title: 'Pharmacy',
    icon: Beaker,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  agriculture: {
    title: 'Agriculture',
    icon: Leaf,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
};

export function AdminDashboardPage() {
  const { isAuthenticated, isInitialized } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [streamStats, setStreamStats] = useState<Record<Stream, {
    total: number;
    scheduled: number;
    completed: number;
    daily: number;
    weekly: number;
    monthly: number;
  }>>({
    engineering: { total: 0, scheduled: 0, completed: 0, daily: 0, weekly: 0, monthly: 0 },
    pharmacy: { total: 0, scheduled: 0, completed: 0, daily: 0, weekly: 0, monthly: 0 },
    agriculture: { total: 0, scheduled: 0, completed: 0, daily: 0, weekly: 0, monthly: 0 },
  });

  // Initialize empty exams array if not exists
  useEffect(() => {
    if (!localStorage.getItem('exams')) {
      localStorage.setItem('exams', JSON.stringify([]));
    }
  }, []);

  // Load stats when component mounts and authentication state changes
  useEffect(() => {
    const loadStats = async () => {
      if (!isAuthenticated || !isInitialized) {
        return;
      }

      try {
        setIsLoading(true);
        const exams = JSON.parse(localStorage.getItem('exams') || '[]') as Exam[];
        const newStats = {
          engineering: { total: 0, scheduled: 0, completed: 0, daily: 0, weekly: 0, monthly: 0 },
          pharmacy: { total: 0, scheduled: 0, completed: 0, daily: 0, weekly: 0, monthly: 0 },
          agriculture: { total: 0, scheduled: 0, completed: 0, daily: 0, weekly: 0, monthly: 0 },
        };

        exams.forEach(exam => {
          if (exam.stream && exam.stream in newStats) {
            const streamStat = newStats[exam.stream as Stream];
            streamStat.total++;
            
            if (exam.category) {
              streamStat[exam.category]++;
            }
            
            if (exam.status) {
              streamStat[exam.status]++;
            }
          }
        });

        setStreamStats(newStats);
      } catch (error) {
        console.error('Error loading exam statistics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStats();
  }, [isAuthenticated, isInitialized]);

  // Show loading spinner while initializing
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    navigate('/admin/login', { replace: true });
    return null;
  }

  // Show loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage exams and view analytics across different streams
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Link
            to="/admin/create-exam"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-violet-600 text-white hover:bg-violet-700 transition-colors"
          >
            <PlusCircle className="h-4 w-4" />
            Create Exam
          </Link>
        </div>
      </div>

      {/* Stream Sections */}
      <div className="mt-8 space-y-8">
        {(Object.keys(streamInfo) as Stream[]).map(stream => (
          <div key={stream} className="bg-white rounded-lg shadow">
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-center gap-3">
                {React.createElement(streamInfo[stream].icon, {
                  className: `h-6 w-6 ${streamInfo[stream].color}`,
                })}
                <h2 className="text-lg font-semibold text-gray-900">
                  {streamInfo[stream].title} Stream
                </h2>
              </div>
            </div>

            <div className="px-6 py-5">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <div className={`${streamInfo[stream].bgColor} rounded-lg px-6 py-5 border ${streamInfo[stream].borderColor}`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Target className={`h-6 w-6 ${streamInfo[stream].color}`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Tests</dt>
                        <dd className="text-lg font-semibold text-gray-900">{streamStats[stream].total}</dd>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Daily: {streamStats[stream].daily}</span>
                      <span className="text-gray-600">Weekly: {streamStats[stream].weekly}</span>
                      <span className="text-gray-600">Monthly: {streamStats[stream].monthly}</span>
                    </div>
                  </div>
                </div>

                <div className={`${streamInfo[stream].bgColor} rounded-lg px-6 py-5 border ${streamInfo[stream].borderColor}`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Calendar className={`h-6 w-6 ${streamInfo[stream].color}`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Scheduled Tests</dt>
                        <dd className="text-lg font-semibold text-gray-900">{streamStats[stream].scheduled}</dd>
                      </dl>
                    </div>
                  </div>
                </div>

                <div className={`${streamInfo[stream].bgColor} rounded-lg px-6 py-5 border ${streamInfo[stream].borderColor}`}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BarChart className={`h-6 w-6 ${streamInfo[stream].color}`} />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed Tests</dt>
                        <dd className="text-lg font-semibold text-gray-900">{streamStats[stream].completed}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex gap-4">
                <Link
                  to={`/admin/manage-tests/${stream}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${streamInfo[stream].borderColor} ${streamInfo[stream].color} hover:bg-gray-50`}
                >
                  Manage Tests
                </Link>
                <Link
                  to={`/admin/create-exam?stream=${stream}`}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-white border ${streamInfo[stream].borderColor} ${streamInfo[stream].color} hover:bg-gray-50`}
                >
                  <PlusCircle className="h-4 w-4" />
                  Add Test
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}