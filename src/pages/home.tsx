import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import {
  Brain,
  Clock,
  GraduationCap,
  Target,
  Beaker,
  Users,
} from 'lucide-react';

export function HomePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Update date/time every second
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      name: 'Engineering',
      description: 'Comprehensive practice tests for engineering entrance exams',
      icon: Brain,
    },
    {
      name: 'Pharmacy',
      description: 'Specialized tests for pharmacy entrance examinations',
      icon: Beaker,
    },
    {
      name: 'Expert Content',
      description: 'Questions designed by subject matter experts',
      icon: GraduationCap,
    },
    {
      name: 'Community',
      description: 'Join thousands of students preparing together',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full text-lg font-medium animate-bounce">
              👋 Welcome to CETStrom - Your Success Partner!
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                🎯 Best Platform for Entrance Exam Preparation
              </div>
              <h1 className="text-5xl md:text-6xl font-bold animate-fade-in">
                Master Your
                <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-orange-400">
                  Entrance Exams
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 animate-fade-in-delay">
                Comprehensive practice tests and expert guidance for Engineering & Pharmacy entrance exams
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/exams"
                  className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 px-8 py-4 rounded-full font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Free Practice
                </Link>
                <Link
                  to="/about"
                  className="inline-block bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full font-semibold hover:bg-white/20 transition-all"
                >
                  Learn More
                </Link>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10">
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl font-bold text-yellow-300 animate-count-up">1000+</div>
                  <div className="text-sm text-gray-300">Practice Questions</div>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl font-bold text-yellow-300 animate-count-up">1000+</div>
                  <div className="text-sm text-gray-300">Active Students</div>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <div className="text-3xl font-bold text-yellow-300 animate-count-up">95%</div>
                  <div className="text-sm text-gray-300">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="relative group" onClick={() => {
              const imageContainer = document.querySelector('.image-container');
              imageContainer?.classList.remove('animate-click');
              setTimeout(() => imageContainer?.classList.add('animate-click'), 10);
            }}>
              <div className="relative aspect-square w-full max-w-[500px] mx-auto rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-102 transition-transform duration-500 image-container animate-on-click">
                <style>{`
                  .animate-click {
                    animation: clickEffect 0.5s ease-out;
                  }
                  @keyframes clickEffect {
                    0% { transform: scale(1); }
                    50% { transform: scale(0.95) rotate(-2deg); }
                    100% { transform: scale(1) rotate(0deg); }
                  }
                `}</style>
                <img
                  src="/images/entrance-exam.jpg"
                  alt="Entrance Exam Preparation"
                  className="w-full h-full object-cover"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
                  }}
                />
                {/* Enhanced Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700/40 via-purple-700/30 to-transparent"></div>
              </div>
              
              {/* Floating Features */}
              <div className="absolute -right-4 top-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer animate-float">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">Targeted Practice</span>
                </div>
              </div>
              
              <div className="absolute -left-4 bottom-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-4 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer animate-float-delayed">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-800 dark:text-white">Time Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-purple-500/20 -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-pink-500/20 translate-x-1/3 translate-y-1/3 blur-3xl"></div>
      </section>

      {/* Key Features Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">
              <span className={`bg-clip-text text-transparent bg-gradient-to-r ${isDark ? 'from-purple-400 to-pink-400' : 'from-indigo-600 to-purple-600'}`}>
                Why Choose Us?
              </span>
            </h2>
            <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Everything you need to succeed in your entrance exams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="group bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 hover:bg-gradient-to-b hover:from-purple-50 hover:to-white dark:hover:from-gray-800 dark:hover:to-gray-900 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <div className="text-purple-600 mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-12 w-12" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Ready to Excel?</h2>
          <p className="text-xl mb-8 animate-fade-in-delay">Join thousands of successful students today</p>
          <div className="mb-8 text-2xl font-bold">
            <span>Next Exam: {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}</span>
          </div>
          <Link
            to="/exams"
            className="inline-block bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg animate-bounce"
          >
            Start Your Journey
          </Link>
        </div>
        <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      </section>

    </div>
  );
}