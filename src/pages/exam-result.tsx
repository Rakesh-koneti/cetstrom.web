import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { Exam, ExamResult } from '../lib/types';
import {
  Award,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  History
} from 'lucide-react';

export function ExamResultPage() {
  const { examId } = useParams();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [exam, setExam] = useState<Exam | null>(null);
  const [currentAttempt, setCurrentAttempt] = useState<number>(1);
  const [attempts, setAttempts] = useState<ExamResult[]>([]);
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
    // Load exam and all attempts from localStorage
    const exams = JSON.parse(localStorage.getItem('exams') || '[]');
    const currentExam = exams.find((e: Exam) => e.id === examId);
    if (currentExam) {
      setExam(currentExam);
    }

    // Load all attempts for this exam
    const allResults = JSON.parse(localStorage.getItem(`examResults_${examId}`) || '[]');
    setAttempts(allResults);

    // Set the latest attempt as current
    if (allResults.length > 0) {
      const latestAttempt = Math.max(...allResults.map((r: ExamResult) => r.attemptNumber));
      setCurrentAttempt(latestAttempt);
      const currentResults = allResults.find((r: ExamResult) => r.attemptNumber === latestAttempt);
      if (currentResults) {
        const totalQuestions = currentResults.sectionWiseMarks.reduce((acc: number, s: { totalQuestions: number }) => acc + s.totalQuestions, 0);
        const correctAnswers = currentResults.sectionWiseMarks.reduce((acc: number, s: { correctAnswers: number }) => acc + s.correctAnswers, 0);
        const wrongAnswers = currentResults.sectionWiseMarks.reduce((acc: number, s: { wrongAnswers: number }) => acc + s.wrongAnswers, 0);
        const skippedAnswers = totalQuestions - (correctAnswers + wrongAnswers);

        setResults({
          totalQuestions,
          correctAnswers,
          wrongAnswers,
          score: currentResults.obtainedMarks,
          percentage: (currentResults.obtainedMarks / currentResults.totalMarks) * 100,
          timeTaken: currentResults.timeTaken,
          isPassed: currentResults.status === 'pass',
          attemptNumber: currentResults.attemptNumber,
          correctPercentage: (correctAnswers / totalQuestions) * 100,
          wrongPercentage: (wrongAnswers / totalQuestions) * 100,
          skippedPercentage: (skippedAnswers / totalQuestions) * 100
        });
      }
    }
  }, [examId]);

  const handleAttemptChange = (attemptNumber: number) => {
    const selectedResult = attempts.find(r => r.attemptNumber === attemptNumber);
    if (selectedResult) {
      setCurrentAttempt(attemptNumber);
      const totalQuestions = selectedResult.sectionWiseMarks.reduce((acc, s) => acc + s.totalQuestions, 0);
      const correctAnswers = selectedResult.sectionWiseMarks.reduce((acc, s) => acc + s.correctAnswers, 0);
      const wrongAnswers = selectedResult.sectionWiseMarks.reduce((acc, s) => acc + s.wrongAnswers, 0);
      const skippedAnswers = totalQuestions - (correctAnswers + wrongAnswers);

      setResults({
        totalQuestions,
        correctAnswers,
        wrongAnswers,
        score: selectedResult.obtainedMarks,
        percentage: (selectedResult.obtainedMarks / selectedResult.totalMarks) * 100,
        timeTaken: selectedResult.timeTaken,
        isPassed: selectedResult.status === 'pass',
        attemptNumber: selectedResult.attemptNumber,
        correctPercentage: (correctAnswers / totalQuestions) * 100,
        wrongPercentage: (wrongAnswers / totalQuestions) * 100,
        skippedPercentage: (skippedAnswers / totalQuestions) * 100
      });
    }
  };

  if (!exam || !results) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className={isDark ? 'text-white' : 'text-gray-900'}>Loading results...</p>
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