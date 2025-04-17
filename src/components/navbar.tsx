import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage or system preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return savedTheme === 'true';
    }
    // Check system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const location = useLocation();

  // Apply theme on mount and when isDark changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('darkMode', String(isDark));
  }, [isDark]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem('darkMode') === null) {
        setIsDark(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleDarkMode = () => {
    setIsDark(prev => !prev);
  };

  const closeMenu = () => setIsOpen(false);

  const navItems = [
    { href: "", label: "Home" },
    { href: "mock-tests", label: "Mock Tests" },
    { href: "contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="" className="flex items-center space-x-2" onClick={closeMenu}>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              CETStrom
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
                  ${location.pathname === '/' + item.href
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400'
                  }`}
              >
                {item.label}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="ml-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? 
                <Sun className="h-5 w-5 text-yellow-500" /> : 
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              }
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="mr-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? 
                <Sun className="h-5 w-5 text-yellow-500" /> : 
                <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              }
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isOpen ? 
                <X className="h-5 w-5 text-gray-700 dark:text-gray-300" /> : 
                <Menu className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors
                  ${location.pathname === '/' + item.href
                    ? 'text-purple-600 dark:text-purple-400'
                    : 'text-gray-700 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400'
                  }`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}