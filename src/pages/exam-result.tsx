import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { useAuth } from '../lib/auth-context';
import { Exam, ExamResult } from '../lib/types';
import { ExamService, ResultService } from '../services';
import {
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  History,
  Loader2
} from 'lucide-react';

export function ExamResultPage() {
  const { examId } = useParams();
  const { theme } = useTheme();
  const { user } = useAuth();
  const isDark = theme === 'dark';
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<number>(1);
  const [attempts, setAttempts] = useState<ExamResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [results, setResults] = useState<{
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    score: number;
    percentage: number;
    timeTaken: number;
    isPassed: boolean;
    attemptNumber: number;
    correctPercentage: number;
    wrongPercentage: number;
    skippedPercentage: number;
  } | null>(null);

  useEffect(() => {
    const loadExamAndResults = async () => {
      if (!examId) return;

      setIsLoading(true);
      try {
        // Load exam from database
        const currentExam = await ExamService.getExamById(examId);
        if (currentExam) {
          setExam(currentExam);
        }

        // Load all attempts for this exam
        const userId = user?.email || 'anonymous';
        const allResults = await ResultService.getResultsByExam(examId, userId);

        if (allResults.length === 0) {
          // Try to load from localStorage as fallback
          const localResults = JSON.parse(localStorage.getItem(`examResult_${examId}`) || '{}');

          if (localResults && localResults.score !== undefined) {
            // Create a result object from localStorage data
            const mockResult: ExamResult = {
              sessionId: `local_${Date.now()}`,
              examId: examId,
              userId: userId,
              attemptNumber: 1,
              totalMarks: currentExam?.sections.reduce(
                (sum, section) => sum + section.questions.length * (currentExam?.markingScheme.defaultWeightage || 1),
                0
              ) || 0,
              obtainedMarks: localResults.score,
              sectionWiseMarks: [{
                sectionId: 'section1',
                sectionName: 'All Sections',
                totalQuestions: localResults.totalQuestions,
                correctAnswers: localResults.correctAnswers,
                wrongAnswers: localResults.wrongAnswers,
                obtainedMarks: localResults.score,
                totalMarks: localResults.totalQuestions
              }],
              timeTaken: localResults.timeTaken,
              status: localResults.isPassed ? 'pass' : 'fail',
              submittedAt: new Date().toISOString()
            };

            setAttempts([mockResult]);

            // Process the result
            const totalQuestions = localResults.totalQuestions;
            const correctAnswers = localResults.correctAnswers;
            const wrongAnswers = localResults.wrongAnswers;
            const skippedAnswers = totalQuestions - (correctAnswers + wrongAnswers);

            setResults({
              totalQuestions,
              correctAnswers,
              wrongAnswers,
              score: localResults.score,
              percentage: localResults.percentage,
              timeTaken: localResults.timeTaken,
              isPassed: localResults.isPassed,
              attemptNumber: 1,
              correctPercentage: (correctAnswers / totalQuestions) * 100,
              wrongPercentage: (wrongAnswers / totalQuestions) * 100,
              skippedPercentage: (skippedAnswers / totalQuestions) * 100
            });
          }
        } else {
          setAttempts(allResults);

          // Set the latest attempt as current
          const latestAttempt = Math.max(...allResults.map(r => r.attemptNumber || 1));
          setCurrentAttempt(latestAttempt);

          const currentResult = allResults.find(r => r.attemptNumber === latestAttempt);
          if (currentResult) {
            // Extract data from the answers field
            const answers = currentResult.answers || {};
            const totalQuestions = answers.totalQuestions || currentExam?.sections.reduce(
              (sum, section) => sum + section.questions.length,
              0
            ) || 0;
            const correctAnswers = answers.correctAnswers || 0;
            const wrongAnswers = answers.wrongAnswers || 0;
            const skippedAnswers = totalQuestions - (correctAnswers + wrongAnswers);

            setResults({
              totalQuestions,
              correctAnswers,
              wrongAnswers,
              score: currentResult.obtainedMarks,
              percentage: answers.percentage || (currentResult.obtainedMarks / currentResult.totalMarks) * 100,
              timeTaken: answers.timeTaken || 0,
              isPassed: answers.isPassed || currentResult.status === 'pass',
              attemptNumber: currentResult.attemptNumber || 1,
              correctPercentage: (correctAnswers / totalQuestions) * 100,
              wrongPercentage: (wrongAnswers / totalQuestions) * 100,
              skippedPercentage: (skippedAnswers / totalQuestions) * 100
            });
          }
        }
      } catch (error) {
        console.error('Error loading exam results:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadExamAndResults();
  }, [examId, user]);

  const handleAttemptChange = (attemptNumber: number) => {
    const selectedResult = attempts.find(r => r.attemptNumber === attemptNumber);
    if (selectedResult) {
      setCurrentAttempt(attemptNumber);

      // Extract data from the answers field or sectionWiseMarks
      const answers = selectedResult.answers || {};
      let totalQuestions = 0;
      let correctAnswers = 0;
      let wrongAnswers = 0;

      if (selectedResult.sectionWiseMarks && selectedResult.sectionWiseMarks.length > 0) {
        // Use sectionWiseMarks if available
        totalQuestions = selectedResult.sectionWiseMarks.reduce((acc, s) => acc + s.totalQuestions, 0);
        correctAnswers = selectedResult.sectionWiseMarks.reduce((acc, s) => acc + s.correctAnswers, 0);
        wrongAnswers = selectedResult.sectionWiseMarks.reduce((acc, s) => acc + s.wrongAnswers, 0);
      } else {
        // Use answers field as fallback
        totalQuestions = answers.totalQuestions || exam?.sections.reduce(
          (sum, section) => sum + section.questions.length,
          0
        ) || 0;
        correctAnswers = answers.correctAnswers || 0;
        wrongAnswers = answers.wrongAnswers || 0;
      }

      const skippedAnswers = totalQuestions - (correctAnswers + wrongAnswers);

      setResults({
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        score: selectedResult.obtainedMarks,
        percentage: answers.percentage || (selectedResult.obtainedMarks / selectedResult.totalMarks) * 100,
        timeTaken: answers.timeTaken || selectedResult.timeTaken || 0,
        isPassed: answers.isPassed || selectedResult.status === 'pass',
        attemptNumber: selectedResult.attemptNumber,
        correctPercentage: totalQuestions > 0 ? (correctAnswers / totalQuestions) * 100 : 0,
        wrongPercentage: totalQuestions > 0 ? (wrongAnswers / totalQuestions) * 100 : 0,
        skippedPercentage: totalQuestions > 0 ? (skippedAnswers / totalQuestions) * 100 : 0
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className={`h-12 w-12 animate-spin mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`} />
        <p className={isDark ? 'text-white' : 'text-gray-900'}>Loading results...</p>
      </div>
    );
  }

  if (!exam || !results) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-12 w-12 text-yellow-500 mb-4" />
        <p className={isDark ? 'text-white' : 'text-gray-900'}>No results found for this exam.</p>
        <Link
          to="/exams"
          className={`mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
            isDark
              ? 'bg-violet-600 text-white hover:bg-violet-500'
              : 'bg-violet-600 text-white hover:bg-violet-700'
          }`}
        >
          Back to Tests
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <Link
        to="/exams"
        className={`inline-flex items-center gap-2 mb-8 text-sm font-medium ${
          isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tests
      </Link>

      <div className={`rounded-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg ring-1 ${
        isDark ? 'ring-gray-700' : 'ring-gray-200'
      }`}>
        <div className="text-center">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {exam.title} - Results
          </h1>
          <div className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Attempt {currentAttempt} of {attempts.length} - {new Date(exam.scheduledDate).toLocaleDateString()}
          </div>

          {/* Attempt Selector */}
          {attempts.length > 1 && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <History className="h-4 w-4" />
              <select
                value={currentAttempt}
                onChange={(e) => handleAttemptChange(Number(e.target.value))}
                className={`rounded-md border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} px-3 py-1 text-sm`}
              >
                {attempts.map((attempt) => (
                  <option key={attempt.attemptNumber} value={attempt.attemptNumber}>
                    Attempt {attempt.attemptNumber}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className={`p-6 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <div className="flex items-center justify-between">
              <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Score Overview
              </h2>
              <Award className={`h-6 w-6 ${results.isPassed ? 'text-green-500' : 'text-red-500'}`} />
            </div>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Total Score</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {results.score}
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Percentage</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {results.percentage.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Time Taken</span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {Math.floor(results.timeTaken / 60)}m {results.timeTaken % 60}s
                </span>
              </div>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>Status</span>
                <span className={`font-semibold ${
                  results.isPassed ? 'text-green-500' : 'text-red-500'
                }`}>
                  {results.isPassed ? 'Passed' : 'Failed'}
                </span>
              </div>
            </div>
          </div>

          {/* Pie Chart */}
          <div className={`p-6 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-50'
          }`}>
            <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Performance Analysis
            </h2>
            <div className="mt-4 relative">
              <svg className="w-full h-48" viewBox="0 0 100 100">
                {/* Pie Chart Segments */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#22c55e"
                  strokeWidth="20"
                  strokeDasharray={`${results.correctPercentage} ${100 - results.correctPercentage}`}
                  transform="rotate(-90 50 50)"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="20"
                  strokeDasharray={`${results.wrongPercentage} ${100 - results.wrongPercentage}`}
                  transform={`rotate(${(results.correctPercentage - 90)} 50 50)`}
                />
                {results.skippedPercentage > 0 && (
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#f59e0b"
                    strokeWidth="20"
                    strokeDasharray={`${results.skippedPercentage} ${100 - results.skippedPercentage}`}
                    transform={`rotate(${(results.correctPercentage + results.wrongPercentage - 90)} 50 50)`}
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {results.percentage.toFixed(0)}%
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    Score
                  </div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.correctAnswers} Correct
                </span>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.wrongAnswers} Wrong
                </span>
              </div>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-yellow-500" />
                <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {results.totalQuestions - results.correctAnswers - results.wrongAnswers} Skipped
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to={`/exam/${examId}/review`}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              isDark
                ? 'bg-violet-600 text-white hover:bg-violet-500'
                : 'bg-violet-600 text-white hover:bg-violet-700'
            }`}
          >
            Review Answers
          </Link>
          <Link
            to="/exams"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium ${
              isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            Try Another Test
          </Link>
        </div>
      </div>
    </div>
  );
}