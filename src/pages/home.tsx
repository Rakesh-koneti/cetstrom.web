import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Sparkles
} from 'lucide-react';

export function HomePage() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [showWelcome, setShowWelcome] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Timer for date/time
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Show welcome message
    setShowWelcome(true);

    // Check dark mode
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      setIsDark(isDarkMode);
    };

    // Initial check
    checkDarkMode();

    // Listen for dark mode changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => {
      clearInterval(timer);
      observer.disconnect();
    };
  }, []);

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
      name: "Ravi Kumar",
      role: "EAMCET Student",
      content: "CETStrom's practice tests were exactly like the actual EAMCET exam. The detailed solutions helped me understand my mistakes and improve.",
      rating: 5,
      avatar: "student-avatar-1.jpg"
    },
    {
      name: "Sai Priya",
      role: "EAMCET Student",
      content: "The mock tests here gave me confidence. Time management features helped me complete the actual exam within time.",
      rating: 5,
      avatar: "student-avatar-2.jpg"
    },
    {
      name: "Arun Reddy",
      role: "EAMCET Student",
      content: "The subject-wise analysis and performance tracking helped me focus on my weak areas. Highly recommended for EAMCET preparation!",
      rating: 5,
      avatar: "student-avatar-3.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Welcome Message */}
      <div 
        className={`
          fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-4 mt-16
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
      <section className="relative overflow-hidden py-20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium">
                <Star className="w-4 h-4 mr-2" /> Trusted by 10,000+ students
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white">
                Master Your
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Entrance Exams
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Practice with our expertly crafted tests for Engineering & Pharmacy entrance exams. Get detailed analytics and improve your performance.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="mock-tests"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Practice <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <button
                  onClick={() => window.location.href = 'https://cetstrom.in'}
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold border border-gray-200 dark:border-gray-700 transition-all"
                >
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    1000+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Questions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    95%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
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
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-purple-500/10 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-500/10 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              Why Choose{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                CETStrom
              </span>
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Everything you need to excel in your entrance examinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group p-6 rounded-2xl bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className={`mb-6 inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {feature.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
              What Our Students Say
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Hear from our successful students who achieved their goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {testimonial.content}
                </p>
                <div className="mt-4 flex items-center text-sm text-purple-600 dark:text-purple-400">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Verified Student
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}