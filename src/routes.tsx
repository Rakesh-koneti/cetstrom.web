import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { MockTestsPage } from './pages/mock-tests';
import { PreviousYearPapersPage } from './pages/previous-year-papers';
import { PreviousPapersPage } from './pages/previous-papers';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/mock-tests" element={<MockTestsPage />} />
      <Route path="/previous-year-papers" element={<PreviousYearPapersPage />} />
      <Route path="/previous-papers" element={<PreviousPapersPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 