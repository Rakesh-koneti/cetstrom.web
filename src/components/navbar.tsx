import { Link } from 'react-router-dom';
import { useTheme } from '../lib/theme-context';
import { Menu, Moon, Sun, GraduationCap } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-effect border-b border-gray-200/20 dark:border-gray-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <GraduationCap className="h-9 w-9 text-purple-600 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-2xl font-bold gradient-text">
                  Cetstrom
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/exams" className="nav-link">
                Practice Tests
              </Link>
              <Link to="/previous-year-papers" className="nav-link">
                Previous Year Papers
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/contact" className="nav-link">
                Contact
              </Link>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="ml-4 p-2 rounded-full hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-yellow-500" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                aria-label="Toggle mobile menu"
              >
                <Menu className="h-6 w-6 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass-effect border-t border-gray-200/20 dark:border-gray-700/20">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/exams"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Practice Tests
              </Link>
              <Link
                to="/previous-year-papers"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Previous Year Papers
              </Link>
              <Link
                to="/about"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}