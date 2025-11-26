import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
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
  Sparkles
} from 'lucide-react';

export function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const navigate = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState(false);
  const [commentName, setCommentName] = useState('');
  const [commentMessage, setCommentMessage] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);

  useEffect(() => {
    // Timer for date/time
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Show welcome message
    setShowWelcome(true);

    return () => clearInterval(timer);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  const handleBackToWebsite = () => {
    window.location.href = 'https://cetstrom.in';
  };

  const features = [
    {
      name: 'Engineering Entrance',
      description: 'AP EAMCET, JEE Main & Advanced',
      icon: Brain,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Pharmacy Entrance',
      description: 'NEET, GPAT and more',
      icon: Beaker,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Expert Content',
      description: 'By top educators',
      icon: GraduationCap,
      color: 'from-orange-500 to-yellow-500'
    },
    {
      name: 'Analytics',
      description: 'Track your progress',
      icon: Target,
      color: 'from-green-500 to-emerald-500'
    },
  ];

  const testimonials = [
    {
      name: 'Ravi Kumar',
      role: 'EAMCET 2025 Ranker',
      content:
        "CETStrom's practice tests were exactly like the actual EAMCET exam. The detailed solutions helped me understand my mistakes and improve.",
      rating: 5,
      avatar: 'student-avatar-1.jpg'
    },
    {
      name: 'Sai Priya',
      role: 'EAMCET 2025 Ranker',
      content:
        'The mock tests here gave me confidence. Time management features helped me complete the actual exam within time.',
      rating: 5,
      avatar: 'student-avatar-2.jpg'
    },
    {
      name: 'Arun Reddy',
      role: 'EAMCET 2025 Ranker',
      content:
        'The subject-wise analysis and performance tracking helped me focus on my weak areas. Highly recommended for EAMCET preparation!',
      rating: 5,
      avatar: 'student-avatar-3.jpg'
    },
    {
      name: 'Meghana Rao',
      role: 'EAMCET 2025 Topper',
      content:
        'Section-wise tests and detailed reports helped me plan my daily preparation. My accuracy improved a lot with CETStrom.',
      rating: 5,
      avatar: 'student-avatar-4.jpg'
    },
    {
      name: 'Vikas Sharma',
      role: 'EAMCET 2025 Ranker',
      content:
        'The interface felt just like the real exam. Practicing multiple full-length mocks here reduced my exam fear completely.',
      rating: 5,
      avatar: 'student-avatar-5.jpg'
    },
    {
      name: 'Nikhila Reddy',
      role: 'EAMCET 2025 Ranker',
      content:
        'Daily practice on CETStrom with chapter-wise tests helped me move from average scores to a top EAMCET rank.',
      rating: 5,
      avatar: 'student-avatar-6.jpg'
    }
  ];

  return (
    <div className="min-h-screen">
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

      {/* Hero Section */}
      <section
        className={`
          relative overflow-hidden py-16 md:py-24
          ${isDark 
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-purple-950' 
            : 'bg-gradient-to-b from-orange-50 via-amber-50 to-white'}
        `}
      >
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#f97316_0,_transparent_55%),radial-gradient(circle_at_bottom,_#ec4899_0,_transparent_55%)]" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-8 glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl border border-white/20 dark:border-white/10">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs sm:text-sm font-medium shadow-lg">
                <Sparkles className="w-4 h-4 mr-2" /> Trusted by 1000+ EAMCET aspirants
              </div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Crack Your
                <span className="block mt-2 gradient-text">
                  Entrance Exams
                </span>
              </h1>
              <p className={`text-base sm:text-lg md:text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                Real-exam style mock tests, smart analytics, and expert-curated questions to boost your EAMCET & entrance exam rank.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/mock-tests"
                  className="btn-primary inline-flex items-center justify-center"
                >
                  Start Free Practice <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className={`inline-flex items-center px-6 py-3 rounded-full font-semibold border text-sm sm:text-base ${
                    isDark 
                      ? 'bg-transparent text-gray-100 border-gray-600 hover:bg-gray-800' 
                      : 'bg-white text-gray-900 border-gray-200 hover:bg-gray-50'
                  } transition-all shadow-sm`}
                >
                  Learn More About CETStrom
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-white/20 dark:border-gray-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    1000+
                  </div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Active Students</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    1000+
                  </div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Practice Questions</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-bold gradient-text">
                    95%
                  </div>
                  <div className={`text-xs sm:text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Student Satisfaction</div>
                </div>
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

              {/* Floating Elements */}
              <div className="absolute -right-4 top-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg animate-float">
                <BookOpen className="h-6 w-6 text-purple-600" />
              </div>
              <div className="absolute -left-4 bottom-1/4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg animate-float-delayed">
                <Award className="h-6 w-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-purple-500/20 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-500/20 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </section>

      {/* Exam Categories / Features Section */}
      <section className={`py-20 ${isDark ? 'bg-slate-950' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Choose Your{' '}
              <span className="gradient-text">
                Exam Track
              </span>
            </h2>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Designed for AP EAMCET and other top entrance exams with exam-specific practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group card cursor-pointer hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className={`mb-6 inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {feature.name}
                </h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works + Testimonials */}
      <section className={`py-20 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">
            {/* How it works */}
            <div>
              <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                How CETStrom Helps You Win
              </h2>
              <p className={`mb-6 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Simple steps to improve your rank with focused practice and analysis.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-green-500/10 text-green-500 p-2">
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>1. Choose your exam & mock test</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Pick from Engineering or Pharmacy tests tailored to AP EAMCET pattern.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-blue-500/10 text-blue-500 p-2">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>2. Attempt test with real exam timer</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Practice in a real-exam environment with accurate time limits.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-full bg-purple-500/10 text-purple-500 p-2">
                    <Target className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>3. Analyse & improve</h3>
                    <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>View detailed analysis, identify weak topics and track progress over time.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials header */}
            <div className="text-left lg:text-right flex flex-col justify-center">
              <h2 className={`text-3xl md:text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                2025 EAMCET Success Stories
              </h2>
              <div className="mt-4 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium">
                <Star className="w-4 h-4 mr-2" /> Real Student Experiences
              </div>
              <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Hear from our successful EAMCET aspirants.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`card transition-transform hover:-translate-y-1`}
              >
                <div className="flex items-center mb-4">
                  <img
                    src={`/images/${testimonial.avatar}`}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${testimonial.name.replace(' ', '+')}&background=random`;
                    }}
                  />
                  <div className="ml-4">
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-purple-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className={`text-lg mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  "{testimonial.content}"
                </p>
                <div className="flex items-center text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Join thousands of successful EAMCET aspirants who trusted CETStrom for their preparation
            </p>
            <Link
              to="/mock-tests"
              className="inline-flex items-center px-6 py-3 mt-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Your EAMCET Preparation <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* User Comment Box */}
      <section className={`${isDark ? 'bg-slate-950' : 'bg-white'} py-16`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Share your EAMCET journey
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mt-2`}>
              Tell us how CETStrom is helping you in your preparation. Your feedback motivates other students.
            </p>
          </div>

          <form
            className="card space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (!commentName.trim() || !commentMessage.trim()) {
                return;
              }
              setCommentSubmitted(true);
              setCommentMessage('');
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Enter your name"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                />
              </div>
              <div>
                <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                  Your Comment
                </label>
                <textarea
                  className="input-field min-h-[120px]"
                  placeholder="Share your experience with CETStrom..."
                  value={commentMessage}
                  onChange={(e) => setCommentMessage(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Submit Comment
              </button>
              {commentSubmitted && (
                <span className={`text-sm ${isDark ? 'text-green-300' : 'text-green-600'}`}>
                  Thanks for your feedback!
                </span>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-sky-500 via-indigo-600 to-fuchsia-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-400 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-fuchsia-500 blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg md:text-2xl mb-6 text-sky-100">
            Join thousands of successful students preparing for their entrance exams
          </p>
          <div className="inline-flex items-center justify-center space-x-2 text-base md:text-lg font-medium mb-8 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full shadow-lg border border-white/30">
            <Clock className="w-5 h-5" />
            <span>Next Mock Test: <span className="font-semibold text-amber-200">20th March 2026</span></span>
          </div>
          <div>
            <Link
              to="/mock-tests"
              className="inline-flex items-center px-10 py-4 rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-slate-900 font-semibold hover:brightness-110 transition-all transform hover:scale-110 shadow-[0_10px_40px_rgba(251,191,36,0.6)]"
            >
              Start Free Practice Test <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Next Mock Test Info - Bottom Banner */}
      <section className={`${isDark ? 'bg-slate-950' : 'bg-gray-100'} border-t border-gray-200 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
          <span className={`text-sm sm:text-base font-medium ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
            Next mock test will begin on <span className="font-semibold text-orange-600 dark:text-orange-400">19th April 2026</span>.
          </span>
        </div>
      </section>
    </div>
  );
}