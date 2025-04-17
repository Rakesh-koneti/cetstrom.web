import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { HomePage } from './pages/home';
import { MockTestsPage } from './pages/mock-tests';
import { ContactUs } from './components/ContactUs';
import { useEffect } from 'react';

function App() {
  // Remove trailing slashes from URLs
  useEffect(() => {
    if (window.location.pathname.length > 1 && window.location.pathname.endsWith('/')) {
      window.history.replaceState(
        {}, 
        '', 
        window.location.pathname.slice(0, -1) + window.location.search
      );
    }

    // Check system preference for dark mode on load
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('darkMode');
    
    if (savedTheme === null && prefersDark) {
      document.documentElement.classList.add('dark');
    } else if (savedTheme === 'true') {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <main className="min-h-screen">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="mock-tests" element={<MockTestsPage />} />
            <Route path="exam/:testId" element={<MockTestsPage />} />
            <Route path="contact" element={<ContactUs />} />
            {/* Redirect any unmatched routes to home */}
            <Route path="*" element={<Navigate to="" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;