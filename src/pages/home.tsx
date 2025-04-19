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
      <section className={`relative overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-50'} py-20`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium">
                <Star className="w-4 h-4 mr-2" /> Trusted by 1000 students
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
                <Link
                  to="/mock-tests"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Practice <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/about"
                  className={`inline-flex items-center px-8 py-4 rounded-full ${
                    isDark 
                      ? 'bg-gray-800 text-white hover:bg-gray-700' 
                      : 'bg-white text-gray-900 hover:bg-gray-50'
                  } font-semibold border border-gray-200 transition-all`}
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600`}>
                    1000+
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600`}>
                    1000+
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Questions</div>
                </div>
                <div>
                  <div className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600`}>
                    95%
                  </div>
                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Success Rate</div>
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
      <section className={`py-20 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Why Choose{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                CETStrom
              </span>
            </h2>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to excel in your entrance examinations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className={`group p-6 rounded-2xl ${
                  isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                } transition-all duration-300 transform hover:scale-105 shadow-lg`}
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

      {/* Testimonials Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              EAMCET Success Stories
            </h2>
            <div className={`mt-4 inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium`}>
              <Star className="w-4 h-4 mr-2" /> Real Student Experiences
            </div>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Hear from our successful EAMCET aspirants
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`p-6 rounded-2xl ${
                  isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-lg transition-transform hover:scale-105`}
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of successful students preparing for their entrance exams
          </p>
          <div className="inline-flex items-center justify-center space-x-2 text-lg font-medium mb-8 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
            <Clock className="w-5 h-5" />
            <span>Next Mock Test: {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</span>
          </div>
          <div>
            <Link
              to="/mock-tests"
              className="inline-flex items-center px-8 py-4 rounded-full bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Start Free Practice Test <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}