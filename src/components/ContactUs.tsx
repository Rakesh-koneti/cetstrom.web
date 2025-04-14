import { Mail } from 'lucide-react';
import { useTheme } from '../lib/theme-context';

export function ContactUs() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleEmailClick = () => {
    const subject = 'Contact from CETSTROM.in';
    const body = 'Hello, I would like to get in touch with you regarding...';
    const mailtoLink = `mailto:cetstrom.in@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className={`py-12 ${isDark ? 'bg-gray-800/95' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Contact Us
          </h2>
          <p className={`mt-4 text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="mt-12 max-w-lg mx-auto">
          <div className={`rounded-lg shadow-lg p-8 ${isDark ? 'bg-gray-700/90' : 'bg-white'}`}>
            <div className="text-center">
              <Mail className={`w-12 h-12 mx-auto ${isDark ? 'text-orange-400' : 'text-orange-500'}`} />
              <h3 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Email Us
              </h3>
              <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Send us an email at{' '}
                <a 
                  href="mailto:cetstrom.in@gmail.com"
                  className={`font-medium ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}
                >
                  cetstrom.in@gmail.com
                </a>
              </p>
              <button
                onClick={handleEmailClick}
                className={`mt-6 px-6 py-3 rounded-lg font-medium transition-colors ${
                  isDark 
                    ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                    : 'bg-orange-500 hover:bg-orange-600 text-white'
                }`}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 