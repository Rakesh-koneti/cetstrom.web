import { Mail, Send } from 'lucide-react';
import { useTheme } from '../lib/theme-context';
import { useState, FormEvent } from 'react';

export function ContactUs() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:cetstrom.in@gmail.com?subject=${encodeURIComponent(`${formData.subject}`)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
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

        <div className="mt-12 flex flex-col lg:flex-row items-start gap-8">
          {/* Developer Credits Sidebar */}
          <div className="lg:w-64 w-full lg:sticky lg:top-8">
            <div className={`rounded-lg shadow-lg p-6 ${isDark ? 'bg-gray-700/90' : 'bg-white'}`}>
              <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Developers
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Lead Developer</p>
                  <p className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent font-bold text-lg">
                    Rakesh Koneti
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Co-Developer</p>
                  <p className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-bold text-lg">
                    Sai Revanth
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="flex-1">
            <div className={`rounded-lg shadow-lg p-8 ${isDark ? 'bg-gray-700/90' : 'bg-white'}`}>
              <div className="text-center mb-8">
                <Mail className={`w-12 h-12 mx-auto ${isDark ? 'text-orange-400' : 'text-orange-500'}`} />
                <h3 className={`mt-4 text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Contact Form
                </h3>
                <p className={`mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Fill out this form to send us an email
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                    } focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                    } focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                    } focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
                    placeholder="Enter subject"
                  />
                </div>

                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                    } focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
                    placeholder="Enter your message"
                  ></textarea>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      isDark 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    }`}
                  >
                    <Send className="w-5 h-5 mr-2" />
                    <span>Send via Gmail</span>
                  </button>
                </div>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-600">
                <p className={`text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Or email us directly at{' '}
                  <a 
                    href="mailto:cetstrom.in@gmail.com"
                    className={`font-medium ${isDark ? 'text-orange-400 hover:text-orange-300' : 'text-orange-500 hover:text-orange-600'}`}
                  >
                    cetstrom.in@gmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 