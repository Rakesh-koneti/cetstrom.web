import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { useAuth } from '../lib/auth-context';
import { Exam } from '../lib/types';
import { ExamService } from '../services';
import {
  Brain,
  Clock,
  GraduationCap,
  Target,
  Beaker,
  Users,
  ChevronRight,
  Star,
  BookOpen,
  Award,
  CheckCircle,
  ArrowLeft,
  Globe,
  Sparkles,
  Calculator,
  Atom,
  TestTube,
  Microscope,
  Search,
  Filter
} from 'lucide-react';

export function SinglePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [engineeringExams, setEngineeringExams] = useState<Exam[]>([]);
  const [pharmacyExams, setPharmacyExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  useEffect(() => {
    // Timer for date/time
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Show welcome message
    setShowWelcome(true);

    // Load exams
    loadExams();

    return () => clearInterval(timer);
  }, []);

  const loadExams = async () => {
    try {
      setIsLoading(true);
      
      // Load engineering exams
      const engineeringTests = await ExamService.getExams({ stream: 'engineering' });
      setEngineeringExams(engineeringTests);

      // Load pharmacy exams
      const pharmacyTests = await ExamService.getExams({ stream: 'pharmacy' });
      setPharmacyExams(pharmacyTests);
    } catch (error) {
      console.error('Error loading exams:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      name: 'Engineering Entrance',
      description: 'AP EAMCET, JEE Main & Advanced',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500',
      onClick: () => setActiveSection('engineering')
    },
    {
      name: 'Pharmacy Entrance',
      description: 'NEET, GPAT and more',
      icon: Beaker,
      color: 'from-purple-500 to-pink-500',
      onClick: () => setActiveSection('pharmacy')
    },
    {
      name: 'Practice Tests',
      description: 'Test your knowledge',
      icon: GraduationCap,
      color: 'from-orange-500 to-yellow-500',
      onClick: () => setActiveSection('practice')
    },
    {
      name: 'Previous Papers',
      description: 'Past year papers',
      icon: BookOpen,
      color: 'from-green-500 to-emerald-500',
      onClick: () => setActiveSection('papers')
    },
  ];

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
  };

  const renderExamList = (exams: Exam[], stream: 'engineering' | 'pharmacy') => {
    const filteredExams = exams.filter(exam => {
      const matchesSearch = exam.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = !selectedSubject || exam.subject === selectedSubject;
      const matchesDifficulty = !selectedDifficulty || exam.difficulty === selectedDifficulty;
      return matchesSearch && matchesSubject && matchesDifficulty;
    });

    return (
      <div className="space-y-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search exams..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-lg ${
                  isDark
                    ? 'bg-gray-800 text-white border-gray-700'
                    : 'bg-white text-gray-900 border-gray-300'
                } border focus:ring-2 focus:ring-violet-500`}
              />
            </div>
          </div>

          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            } border focus:ring-2 focus:ring-violet-500`}
          >
            <option value="">All Subjects</option>
            {streamInfo[stream].subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className={`px-4 py-2 rounded-lg ${
              isDark
                ? 'bg-gray-800 text-white border-gray-700'
                : 'bg-white text-gray-900 border-gray-300'
            } border focus:ring-2 focus:ring-violet-500`}
          >
            <option value="">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Exam Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className={`rounded-lg p-6 ${
                isDark ? 'bg-gray-800' : 'bg-white'
              } shadow-lg ring-1 ${
                isDark ? 'ring-gray-700' : 'ring-gray-200'
              } hover:ring-2 hover:ring-violet-500 transition-all`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {exam.title}
                  </h3>
                  <p className={`mt-1 text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {exam.subject} • {exam.difficulty}
                  </p>
                </div>
                {(() => {
                  const SubjectIcon = streamInfo[stream].subjects.find(s => s.id === exam.subject)?.icon;
                  return SubjectIcon ? (
                    <SubjectIcon className={`h-6 w-6 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : null;
                })()}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {exam.duration} minutes
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-400" />
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {exam.totalQuestions} questions
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => navigate(`/exam/${exam.id}`)}
                  className={`w-full inline-flex items-center justify-center px-4 py-2 rounded-lg ${
                    isDark
                      ? 'bg-violet-600 text-white hover:bg-violet-500'
                      : 'bg-violet-600 text-white hover:bg-violet-700'
                  }`}
                >
                  Start Test
                  <ChevronRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'engineering':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Engineering Entrance Exams
              </h2>
              <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Practice tests for engineering entrance exams
              </p>
            </div>
            {renderExamList(engineeringExams, 'engineering')}
          </div>
        );

      case 'pharmacy':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Pharmacy Entrance Exams
              </h2>
              <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Practice tests for pharmacy entrance exams
              </p>
            </div>
            {renderExamList(pharmacyExams, 'pharmacy')}
          </div>
        );

      case 'practice':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Practice Tests
              </h2>
              <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Test your knowledge with our practice exams
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => setActiveSection('engineering')}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  isDark
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <Brain className="h-8 w-8 text-blue-500 mb-4" />
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Engineering Tests
                </h3>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Practice tests for engineering subjects
                </p>
              </div>
              <div
                onClick={() => setActiveSection('pharmacy')}
                className={`p-6 rounded-lg cursor-pointer transition-all ${
                  isDark
                    ? 'bg-gray-800 hover:bg-gray-700'
                    : 'bg-white hover:bg-gray-50'
                } shadow-lg`}
              >
                <Beaker className="h-8 w-8 text-purple-500 mb-4" />
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Pharmacy Tests
                </h3>
                <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Practice tests for pharmacy subjects
                </p>
              </div>
            </div>
          </div>
        );

      case 'papers':
        return (
          <div className="space-y-8">
            <div>
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Previous Year Papers
              </h2>
              <p className={`mt-2 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Practice with past year entrance exam papers
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[2023, 2022, 2021].map(year => (
                <div
                  key={year}
                  className={`p-6 rounded-lg ${
                    isDark ? 'bg-gray-800' : 'bg-white'
                  } shadow-lg`}
                >
                  <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {year} Papers
                  </h3>
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => navigate(`/papers/engineering/${year}`)}
                      className="block text-violet-600 hover:text-violet-500"
                    >
                      Engineering Papers
                    </button>
                    <button
                      onClick={() => navigate(`/papers/pharmacy/${year}`)}
                      className="block text-violet-600 hover:text-violet-500"
                    >
                      Pharmacy Papers
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <>
            {/* Hero Section */}
            <section className={`relative overflow-hidden py-20`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-8">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium">
                      <Star className="w-4 h-4 mr-2" /> Trusted by 10,000+ students
                    </div>
                    <h1 className={`text-5xl md:text-6xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Master Your
                      <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                        Entrance Exams
                      </span>
                    </h1>
                    <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      Practice with our expertly crafted tests for Engineering & Pharmacy entrance exams. Get detailed analytics and improve your performance.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button
                        onClick={() => setActiveSection('practice')}
                        className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                      >
                        Start Practice <ChevronRight className="ml-2 w-5 h-5" />
                      </button>
                      <button
                        onClick={() => setActiveSection('papers')}
                        className={`inline-flex items-center px-8 py-4 rounded-full ${
                          isDark 
                            ? 'bg-gray-800 text-white hover:bg-gray-700' 
                            : 'bg-white text-gray-900 hover:bg-gray-50'
                        } font-semibold border border-gray-200 transition-all`}
                      >
                        Previous Papers
                      </button>
                    </div>
                  </div>

                  {/* Hero Image */}
                  <div className="relative">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-square max-w-[500px] mx-auto">
                      <img
                        src="/images/entrance-exam.jpg"
                        alt="Entrance Exam Preparation"
                        className="w-full h-full object-cover"
                        loading="eager"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/40 via-pink-600/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                  <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Everything You Need
                  </h2>
                  <p className={`mt-4 text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Comprehensive preparation tools for your success
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {features.map((feature) => (
                    <div
                      key={feature.name}
                      onClick={feature.onClick}
                      className={`p-6 rounded-xl cursor-pointer transition-all transform hover:scale-105 ${
                        isDark ? 'bg-gray-800' : 'bg-white'
                      } shadow-lg`}
                    >
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} p-3 mb-4`}>
                        <feature.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {feature.name}
                      </h3>
                      <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        );
    }
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Welcome Message */}
      <div 
        className={`
          relative z-50 flex justify-center items-center py-4
          transition-all duration-1000 ease-out bg-gradient-to-r from-purple-600/90 via-pink-600/90 to-orange-500/90 backdrop-blur-sm
          ${showWelcome ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'}
        `}
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-white animate-spin" />
          <span className="text-white text-lg font-medium animate-bounce">
            Hi, Welcome to CETStrom!
          </span>
          <Sparkles className="w-5 h-5 text-white animate-spin" />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeSection !== 'home' && (
          <button
            onClick={() => setActiveSection('home')}
            className={`mb-8 inline-flex items-center gap-2 text-sm font-medium ${
              isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>
        )}
        
        {renderContent()}
      </main>
    </div>
  );
} 