import { Mail, Send } from 'lucide-react';
import { useTheme } from '../lib/theme-context';
import { useState } from 'react';

export function ContactUs() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleEmailClick = () => {
    const subject = 'Contact from CETSTROM.in';
    const body = 'Hello, I would like to get in touch with you regarding...';
    const mailtoLink = `mailto:cetstrom.in@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create the email content
      const emailContent = `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}
      `;

      // Create the mailto link with the form data
      const mailtoLink = `mailto:cetstrom.in@gmail.com?subject=${encodeURIComponent(formData.subject || 'Contact from CETSTROM.in')}&body=${encodeURIComponent(emailContent)}`;
      
      // Open the default email client
      window.location.href = mailtoLink;
      
      // Reset form after successful submission
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('success');
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="text-center mb-8">
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
                Quick Email
              </button>
            </div>

            <div className={`border-t ${isDark ? 'border-gray-600' : 'border-gray-200'} pt-8`}>
              <h3 className={`text-xl font-semibold mb-6 text-center ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send us a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
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
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-gray-800 border-gray-600 text-white focus:border-orange-500' 
                        : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500'
                    } focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50`}
                    placeholder="Enter subject (optional)"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
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
                    disabled={isSubmitting}
                    className={`flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      isDark 
                        ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                        : 'bg-orange-500 hover:bg-orange-600 text-white'
                    } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </div>
                
                {submitStatus === 'success' && (
                  <div className={`mt-4 p-3 rounded-lg text-center ${
                    isDark ? 'bg-green-900/50 text-green-200' : 'bg-green-100 text-green-800'
                  }`}>
                    Message sent successfully! Your email client should open with the message ready to send.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className={`mt-4 p-3 rounded-lg text-center ${
                    isDark ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-800'
                  }`}>
                    There was an error sending your message. Please try again or use the Quick Email button above.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 