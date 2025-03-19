import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTheme } from '../../lib/theme-context';
import { Exam, Stream } from '../../lib/types';
import { PlusCircle, Pencil, Trash2, Loader2 } from 'lucide-react';

export function ManageTestsPage() {
  const { category } = useParams<{ category?: Stream }>();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [tests, setTests] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTests = async () => {
      try {
        setIsLoading(true);
        // Initialize exams array if it doesn't exist
        let storedExams = localStorage.getItem('exams');
        if (!storedExams) {
          localStorage.setItem('exams', '[]');
          storedExams = '[]';
        }

        // Load and parse exams
        let allExams: Exam[] = [];
        try {
          allExams = JSON.parse(storedExams);
          if (!Array.isArray(allExams)) {
            throw new Error('Stored exams is not an array');
          }
        } catch (parseError) {
          console.error('Error parsing exams:', parseError);
          localStorage.setItem('exams', '[]');
          allExams = [];
        }

        // Filter by category if specified
        const filteredTests = category
          ? allExams.filter(exam => exam && exam.stream === category)
          : allExams;

        setTests(filteredTests);
      } catch (error) {
        console.error('Error loading tests:', error);
        setTests([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTests();
  }, [category]);

  const handleDeleteTest = async (testId: string) => {
    if (!window.confirm('Are you sure you want to delete this test?')) {
      return;
    }

    try {
      const updatedTests = tests.filter(test => test.id !== testId);
      localStorage.setItem('exams', JSON.stringify(updatedTests));
      setTests(updatedTests);
    } catch (error) {
      console.error('Error deleting test:', error);
      alert('Failed to delete test. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-violet-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <h1 className={`text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {category 
                ? `${category.charAt(0).toUpperCase() + category.slice(1)} Tests`
                : 'All Tests'}
            </h1>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Manage your tests and their settings
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <Link
              to={category ? `/admin/create-exam?stream=${category}` : '/admin/create-exam'}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isDark
                  ? 'bg-violet-600 text-white hover:bg-violet-500'
                  : 'bg-violet-600 text-white hover:bg-violet-700'
              }`}
            >
              <PlusCircle className="h-4 w-4" />
              Create Test
            </Link>
          </div>
        </div>

        <div className="mt-6 sm:mt-8">
          {tests.length > 0 ? (
            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className={isDark ? 'bg-gray-800' : 'bg-gray-50'}>
                    <tr>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Test Title
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Stream
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Subject
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Questions
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Duration
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                        Status
                      </th>
                      <th scope="col" className="relative px-4 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${
                    isDark ? 'bg-gray-900' : 'bg-white'
                  }`}>
                    {tests.map((test) => (
                      <tr key={test.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                        <td className={`whitespace-nowrap px-4 py-4 text-sm font-medium ${
                          isDark ? 'text-white' : 'text-gray-900'
                        }`}>
                          {test.title}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {test.stream}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {test.subject}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {test.totalQuestions}
                        </td>
                        <td className={`whitespace-nowrap px-4 py-4 text-sm ${
                          isDark ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {test.duration} min
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            test.status === 'scheduled'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                              : test.status === 'completed'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          }`}>
                            {test.status.charAt(0).toUpperCase() + test.status.slice(1)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-4 py-4 text-sm text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              to={`/admin/edit-exam/${test.id}`}
                              className={`p-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                              }`}
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                            <button
                              onClick={() => handleDeleteTest(test.id)}
                              className={`p-1 rounded-md transition-colors ${
                                isDark
                                  ? 'text-gray-400 hover:text-red-400 hover:bg-gray-800'
                                  : 'text-gray-500 hover:text-red-600 hover:bg-gray-100'
                              }`}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={`text-center py-12 rounded-lg border ${
              isDark
                ? 'bg-gray-800/50 border-gray-700'
                : 'bg-white border-gray-200'
            }`}>
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-violet-100 dark:bg-violet-900/30 mb-4">
                <PlusCircle className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className={`text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No tests found
              </h3>
              <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Get started by creating a new test
              </p>
              <div className="mt-6">
                <Link
                  to={category ? `/admin/create-exam?stream=${category}` : '/admin/create-exam'}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isDark
                      ? 'bg-violet-600 text-white hover:bg-violet-500'
                      : 'bg-violet-600 text-white hover:bg-violet-700'
                  }`}
                >
                  <PlusCircle className="h-4 w-4" />
                  Create Your First Test
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}