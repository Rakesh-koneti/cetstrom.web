import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { Exam } from '../lib/types';
import {
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';

export function ExamReviewPage() {
  const { examId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [exam, setExam] = useState<Exam | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    // Load exam and answers
    const exams = JSON.parse(localStorage.getItem('exams') || '[]');
    const currentExam = exams.find((e: Exam) => e.id === examId);
    if (currentExam) {
      setExam(currentExam);
    }

    const results = JSON.parse(localStorage.getItem(`examResult_${examId}`) || 'null');
    if (results?.answers) {
      setAnswers(results.answers);
    }
  }, [examId]);

  if (!exam) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className={isDark ? 'text-white' : 'text-gray-900'}>Loading exam review...</p>
      </div>
    );
  }

  const currentSectionData = exam.sections[currentSection];
  const currentQuestionData = currentSectionData?.questions[currentQuestion];

  if (!currentSectionData || !currentQuestionData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className={isDark ? 'text-white' : 'text-gray-900'}>No questions found.</p>
      </div>
    );
  }

  const userAnswer = answers[currentQuestionData.id];
  const isCorrect = userAnswer === currentQuestionData.correctAnswer;

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link
        to="/exams"
        className={`inline-flex items-center gap-2 mb-8 text-sm font-medium ${
          isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Tests
      </Link>

      {/* Header */}
      <div className={`flex items-center justify-between mb-8 ${
        isDark ? 'text-white' : 'text-gray-900'
      }`}>
        <h1 className="text-2xl font-bold">{exam.title} - Review</h1>
      </div>

      {/* Question Area */}
      <div className={`rounded-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg ring-1 ${
        isDark ? 'ring-gray-700' : 'ring-gray-200'
      }`}>
        {/* Section Info */}
        <div className="mb-6">
          <h2 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {currentSectionData.name}
          </h2>
          {currentSectionData.instructions && (
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {currentSectionData.instructions}
            </p>
          )}
        </div>

        {/* Question */}
        <div className="space-y-6">
          <div>
            <div className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Question {currentQuestion + 1} of {currentSectionData.questions.length}
            </div>
            <p className={`mt-2 text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {currentQuestionData.text}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestionData.options.map((option, index) => {
              const isSelected = userAnswer === index;
              const isCorrectAnswer = index === currentQuestionData.correctAnswer;

              return (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-4 rounded-lg ${
                    isSelected
                      ? isCorrect
                        ? isDark
                          ? 'bg-green-500/20 text-white'
                          : 'bg-green-50 text-green-900'
                        : isDark
                        ? 'bg-red-500/20 text-white'
                        : 'bg-red-50 text-red-900'
                      : isCorrectAnswer
                      ? isDark
                        ? 'bg-green-500/20 text-white'
                        : 'bg-green-50 text-green-900'
                      : isDark
                      ? 'bg-gray-700 text-gray-300'
                      : 'bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="flex-1">{option}</div>
                  {isSelected && (
                    isCorrect ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )
                  )}
                  {!isSelected && isCorrectAnswer && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-8 flex items-center justify-between">
          <button
            onClick={() => {
              if (currentQuestion > 0) {
                setCurrentQuestion(currentQuestion - 1);
              } else if (currentSection > 0) {
                setCurrentSection(currentSection - 1);
                setCurrentQuestion(exam.sections[currentSection - 1].questions.length - 1);
              }
            }}
            disabled={currentSection === 0 && currentQuestion === 0}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Previous
          </button>

          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            Question {currentQuestion + 1} of {currentSectionData.questions.length}
          </div>

          <button
            onClick={() => {
              if (currentQuestion < currentSectionData.questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
              } else if (currentSection < exam.sections.length - 1) {
                setCurrentSection(currentSection + 1);
                setCurrentQuestion(0);
              }
            }}
            disabled={
              currentSection === exam.sections.length - 1 &&
              currentQuestion === currentSectionData.questions.length - 1
            }
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-gray-700 text-white hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400'
            }`}
          >
            Next
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Question Palette */}
      <div className={`mt-8 rounded-lg p-6 ${
        isDark ? 'bg-gray-800' : 'bg-white'
      } shadow-lg ring-1 ${
        isDark ? 'ring-gray-700' : 'ring-gray-200'
      }`}>
        <h3 className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Question Palette
        </h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {exam.sections.map((section, sIndex) =>
            section.questions.map((question, qIndex) => {
              const isAnswered = answers[question.id] !== undefined;
              const isActive = currentSection === sIndex && currentQuestion === qIndex;
              const isCorrectAnswer = answers[question.id] === question.correctAnswer;

              return (
                <button
                  key={question.id}
                  onClick={() => {
                    setCurrentSection(sIndex);
                    setCurrentQuestion(qIndex);
                  }}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-violet-600 text-white'
                      : isAnswered
                      ? isCorrectAnswer
                        ? isDark
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-700'
                        : isDark
                        ? 'bg-red-500 text-white'
                        : 'bg-red-100 text-red-700'
                      : isDark
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {qIndex + 1}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 