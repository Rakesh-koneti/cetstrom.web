import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, BookOpen, Award, Beaker, Calculator, ExternalLink, Moon, Sun } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTheme } from '../lib/theme-context';

interface MockTest {
  id: string;
  title: string;
  description: string;
  duration: number;
  questions_count: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  subject: string;
  stream: 'Engineering' | 'Pharmacy';
}

type Stream = 'Engineering' | 'Pharmacy' | 'All';

const EXTERNAL_TESTS = {
  ENGINEERING: {
    url: 'https://g01.digialm.com//OnlineAssessment/index.html?1480@@M54',
    title: 'Engineering Mock Test',
    provider: 'TCS iON'
  },
  PHARMACY: {
    url: 'https://g01.digialm.com//OnlineAssessment/instructions.html?1480@@M53@@0',
    title: 'Pharmacy Mock Test',
    provider: 'TCS iON'
  }
};

export function MockTestsPage() {
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStream, setSelectedStream] = useState<Stream>('All');
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    async function fetchMockTests() {
      try {
        const { data, error } = await supabase
          .from('mock_tests')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMockTests(data || []);
      } catch (error) {
        console.error('Error fetching mock tests:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMockTests();
  }, []);

  const filteredTests = selectedStream === 'All' 
    ? mockTests 
    : mockTests.filter(test => test.stream === selectedStream);

  const StreamIcon = ({ stream }: { stream: Stream }) => {
    return stream === 'Engineering' 
      ? <Calculator className="h-5 w-5 md:h-6 md:w-6" />
      : <Beaker className="h-5 w-5 md:h-6 md:w-6" />;
  };

  const handleExternalTestClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">Mock Tests</h1>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Practice with our comprehensive mock tests
            </p>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full h-9 w-9 p-0 border-gray-200 dark:border-gray-700"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>

        {/* Stream Selection */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['All', 'Engineering', 'Pharmacy'] as const).map((stream) => (
            <Button
              key={stream}
              variant={selectedStream === stream ? 'default' : 'outline'}
              onClick={() => setSelectedStream(stream)}
              className={`flex items-center gap-2 text-sm px-3 py-1.5 h-auto
                ${selectedStream === stream 
                  ? 'bg-primary text-white dark:bg-primary dark:text-white' 
                  : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700'
                }
              `}
            >
              {stream !== 'All' && <StreamIcon stream={stream} />}
              {stream}
            </Button>
          ))}
        </div>

        {/* External Mock Tests Section */}
        {(selectedStream === 'Engineering' || selectedStream === 'Pharmacy' || selectedStream === 'All') && (
          <div className="mb-8">
            <h2 className="text-lg md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              External Mock Tests
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(EXTERNAL_TESTS).map(([stream, test]) => {
                if (selectedStream !== 'All' && selectedStream !== stream) return null;
                return (
                  <Card key={stream} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader className="p-4 md:p-6">
                      <div className="flex items-center justify-between mb-2">
                        <StreamIcon stream={stream as Stream} />
                        <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">{test.provider}</span>
                      </div>
                      <CardTitle className="text-base md:text-lg text-gray-900 dark:text-white">{test.title}</CardTitle>
                      <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                        Practice with official TCS iON {stream.toLowerCase()} mock test
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 md:p-6 pt-0">
                      <Button
                        onClick={() => handleExternalTestClick(test.url)}
                        className="w-full bg-primary hover:bg-primary/90 text-white"
                      >
                        <ExternalLink className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                        Start Test
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Internal Mock Tests Section */}
        <div>
          <h2 className="text-lg md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
            Internal Mock Tests
          </h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="text-center py-8 md:py-12">
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                No mock tests available for {selectedStream}
              </h3>
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
                Please check back later for new tests
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTests.map((test) => (
                <Card key={test.id} className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-2">
                      <StreamIcon stream={test.stream} />
                      <span className={`px-2 py-1 rounded-full text-xs md:text-sm ${
                        test.difficulty === 'Easy' 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-100' 
                          : test.difficulty === 'Medium'
                          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-100'
                          : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-100'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                    <CardTitle className="text-base md:text-lg text-gray-900 dark:text-white">
                      {test.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 dark:text-gray-300">
                      {test.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4 md:p-6 pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <Clock className="h-4 w-4 md:h-5 md:w-5 text-gray-500 dark:text-gray-400" />
                        <span>{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-gray-500 dark:text-gray-400" />
                        <span>{test.questions_count} questions</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-700 dark:text-gray-300">
                        <Award className="h-4 w-4 md:h-5 md:w-5 text-gray-500 dark:text-gray-400" />
                        <span>{test.subject}</span>
                      </div>
                      <div className="pt-3">
                        <Link to={`/exam/${test.id}`} className="block">
                          <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                            Start Test
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 