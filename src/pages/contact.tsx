import { ContactUs } from '../components/ContactUs';
import { useTheme } from '../lib/theme-context';

export function ContactPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Get in Touch
          </h1>
          <p className={`mt-4 text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            We're here to help and answer any questions you might have
          </p>
        </div>
        <ContactUs />
      </div>
    </div>
  );
}