import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Clock, BookOpen, Award, Beaker, Calculator, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
      ? <Calculator className="h-6 w-6" />
      : <Beaker className="h-6 w-6" />;
  };

  const handleExternalTestClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-white dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">Mock Tests</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Practice with our comprehensive mock tests designed to simulate real exam conditions
        </p>

        {/* Stream Selection */}
        <div className="flex flex-wrap gap-2 md:gap-4 mb-8">
          {(['All', 'Engineering', 'Pharmacy'] as const).map((stream) => (
            <Button
              key={stream}
              variant={selectedStream === stream ? 'default' : 'outline'}
              onClick={() => setSelectedStream(stream)}
              className="flex items-center gap-2 text-sm md:text-base px-3 py-2 md:px-4 md:py-2"
            >
              {stream !== 'All' && <StreamIcon stream={stream} />}
              {stream}
            </Button>
          ))}
        </div>

        {/* External Mock Tests Section */}
        {(selectedStream === 'Engineering' || selectedStream === 'Pharmacy' || selectedStream === 'All') && (
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">External Mock Tests</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {Object.entries(EXTERNAL_TESTS).map(([stream, test]) => {
                if (selectedStream !== 'All' && selectedStream !== stream) return null;
                return (
                  <Card key={stream} className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <StreamIcon stream={stream as Stream} />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{test.provider}</span>
                      </div>
                      <CardTitle className="text-gray-900 dark:text-white">{test.title}</CardTitle>
                      <CardDescription className="text-gray-600 dark:text-gray-300">
                        Practice with official TCS iON {stream.toLowerCase()} mock test
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button
                        onClick={() => handleExternalTestClick(test.url)}
                        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white"
                      >
                        <ExternalLink className="h-5 w-5" />
                        Start Mock Test
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
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Internal Mock Tests</h2>
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : filteredTests.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">No mock tests available for {selectedStream}</h3>
              <p className="text-gray-600 dark:text-gray-300">Please check back later for new tests</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredTests.map((test) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <StreamIcon stream={test.stream} />
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        test.difficulty === 'Easy' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' :
                        test.difficulty === 'Medium' ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100' :
                        'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
                      }`}>
                        {test.difficulty}
                      </span>
                    </div>
                    <CardTitle className="text-gray-900 dark:text-white">{test.title}</CardTitle>
                    <CardDescription className="text-gray-600 dark:text-gray-300">{test.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span>{test.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                        <BookOpen className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span>{test.questions_count} questions</span>
                      </div>
                      <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                        <Award className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                        <span>{test.subject}</span>
                      </div>
                      <div className="mt-4">
                        <Link to={`/exam/${test.id}`}>
                          <Button className="w-full bg-primary hover:bg-primary/90 text-white">Start Test</Button>
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