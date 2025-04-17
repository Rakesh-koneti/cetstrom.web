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
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar />
        <Routes>
          <Route path="" element={<HomePage />} />
          <Route path="mock-tests" element={<MockTestsPage />} />
          <Route path="exam/:testId" element={<MockTestsPage />} />
          <Route path="contact" element={<ContactUs />} />
          {/* Redirect any unmatched routes to home */}
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;