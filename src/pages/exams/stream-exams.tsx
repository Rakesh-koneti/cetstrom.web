import { useState, useEffect } from 'react';
import { Link, useParams, useSearchParams, Navigate } from 'react-router-dom';
import { useTheme } from '../../lib/theme-context';
import { Exam, Stream } from '../../lib/types';
import { ExamService } from '../../services';
import { checkSupabaseConnection } from '../../lib/supabase';
import {
  Search,
  Filter,
  Clock,
  Calendar,
  GraduationCap,
  Target,
  Brain,
  Beaker,
  ArrowLeft,
  Loader2,
  Calculator,
  Atom,
  Microscope,
  TestTube,
  AlertTriangle,
} from 'lucide-react';

const streamInfo = {
  engineering: {
    title: 'Engineering Exams',
    description: 'Practice tests for engineering entrance and competitive exams',
    icon: Brain,
    subjects: [
      { id: 'mathematics', name: 'Mathematics', icon: Calculator },
      { id: 'physics', name: 'Physics', icon: Atom },
      { id: 'chemistry', name: 'Chemistry', icon: TestTube },
    ],
  },
  pharmacy: {
    title: 'Pharmacy Exams',
    description: 'Practice tests for pharmacy entrance and professional exams',
    icon: Beaker,
    subjects: [
      { id: 'biology', name: 'Biology', icon: Microscope },
      { id: 'chemistry', name: 'Chemistry', icon: TestTube },
      { id: 'physics', name: 'Physics', icon: Atom },
    ],
  },
} as const;

export function StreamExamsPage() {
  const { stream } = useParams<{ stream: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>(searchParams.get('subject') || '');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');

  // Validate stream parameter
  if (!stream || !['engineering', 'pharmacy'].includes(stream)) {
    return <Navigate to="/exams" replace />;
  }

  const currentStream = stream as Stream;
  const currentStreamInfo = streamInfo[currentStream];

  useEffect(() => {
    const loadStreamExams = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log('Loading exams for stream:', currentStream);
        
        // Check Supabase connection first
        const isConnected = await checkSupabaseConnection();
        if (!isConnected) {
          throw new Error('Database connection failed. Please check your internet connection.');
        }

        // Load exams from database
        const filters: any = {
          stream: currentStream
        };

        if (selectedSubject) {
          filters.subject = selectedSubject;
        }

        console.log('Fetching exams with filters:', filters);
        const exams = await ExamService.getExams(filters);
        console.log('Fetched exams:', exams);

        if (!exams || exams.length === 0) {
          console.log('No exams found for stream:', currentStream);
        }

        // Apply any additional filtering that can't be done at the database level
        const filteredExams = exams.filter(exam => {
          if (!exam) return false;
          
          // Apply difficulty filter if selected
          if (selectedDifficulty && exam.difficulty !== selectedDifficulty) {
            return false;
          }

          // Apply search term if provided
          if (searchTerm && !exam.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return false;
          }

          return true;
        });

        setExams(filteredExams);

        // Cache exams in localStorage for offline support
        localStorage.setItem('stream_exams_' + currentStream, JSON.stringify(filteredExams));
      } catch (err: any) {
        console.error('Error loading exams:', err);
        setError(err?.message || 'Failed to load exams. Please try again.');

        // Try to load from cache if available
        try {
          const cachedExams = localStorage.getItem('stream_exams_' + currentStream);
          if (cachedExams) {
            const parsed = JSON.parse(cachedExams);
            setExams(parsed);
            console.log('Loaded exams from cache:', parsed);
          } else {
            setExams([]);
          }
        } catch (cacheError) {
          console.error('Error loading cached exams:', cacheError);
          setExams([]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadStreamExams();
  }, [currentStream, selectedSubject, selectedDifficulty, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <Loader2 className={`h-8 w-8 animate-spin ${
          isDark ? 'text-white' : 'text-gray-900'
        }`} />
        <p className={`mt-4 text-lg ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          Loading exams...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white dark:bg-gray-900">
        <div className={`text-center max-w-md w-full p-6 rounded-lg shadow-lg ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}>
          <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-yellow-500" />
          <h2 className="text-2xl font-bold mb-4">Error Loading Exams</h2>
          <p className="text-lg mb-6">{error}</p>
          <div className="flex flex-col gap-4">
            <button
              onClick={() => window.location.reload()}
              className={`w-full px-4 py-2 rounded-lg font-medium ${
                isDark
                  ? 'bg-violet-600 text-white hover:bg-violet-500'
                  : 'bg-violet-500 text-white hover:bg-violet-400'
              }`}
            >
              Try Again
            </button>
            <Link
              to="/exams"
              className={`w-full px-4 py-2 rounded-lg font-medium text-center ${
                isDark
                  ? 'bg-gray-700 text-white hover:bg-gray-600'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              }`}
            >
              Back to Streams
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter exams based on search and filters
  const filteredExams = exams.filter((exam) => {
    if (!exam || typeof exam !== 'object') return false;

    const matchesSearch = (exam.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (exam.subject || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = !selectedDifficulty || exam.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Back button */}
        <Link
          to="/exams"
          className={`inline-flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${
            isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Streams
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className={`text-2xl sm:text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {currentStreamInfo.title}
          </h1>
          <p className={`mt-3 text-base sm:text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {currentStreamInfo.description}
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`} />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 w-full h-10 rounded-lg border transition-colors ${
                  isDark
                    ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                } focus:border-violet-500 focus:ring-violet-500`}
              />
            </div>

            {/* Subject filter */}
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setSearchParams(e.target.value ? { subject: e.target.value } : {});
              }}
              className={`h-10 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:border-violet-500 focus:ring-violet-500`}
            >
              <option value="">All Subjects</option>
              {currentStreamInfo.subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>

            {/* Difficulty filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className={`h-10 rounded-lg border transition-colors ${
                isDark
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              } focus:border-violet-500 focus:ring-violet-500`}
            >
              <option value="">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {filteredExams.length > 0 ? (
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className={`rounded-lg p-4 sm:p-6 transition-all duration-200 hover:scale-[1.02] ${
                  isDark
                    ? 'bg-gray-800 ring-1 ring-gray-700 hover:ring-violet-500'
                    : 'bg-white shadow-lg ring-1 ring-gray-200 hover:ring-violet-500'
                }`}
              >
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {exam.title}
                </h3>

                <div className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {exam.subject}
                </div>

                <div className={`mt-4 space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 flex-shrink-0" />
                    <span>{exam.duration} minutes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 flex-shrink-0" />
                    <span>{new Date(exam.scheduledDate).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 flex-shrink-0" />
                    <span className="capitalize">{exam.difficulty}</span>
                  </div>
                </div>

                <Link
                  to={`/exam/${exam.id}`}
                  className={`mt-4 sm:mt-6 block w-full rounded-lg px-4 py-2 text-center text-sm font-medium transition-colors ${
                    isDark
                      ? 'bg-violet-600 text-white hover:bg-violet-500'
                      : 'bg-violet-600 text-white hover:bg-violet-700'
                  }`}
                >
                  Start Test
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 mb-4">
              <Target className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              No tests found
            </h3>
            <p className="mt-2">
              {searchTerm || selectedSubject || selectedDifficulty
                ? 'Try adjusting your filters or search term'
                : 'No tests are currently available for this stream'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}