import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { MockTestsPage } from './pages/mock-tests';
import { PreviousYearPapersPage } from './pages/previous-year-papers';
import { ExamsPage } from './pages/exams';
import { StreamExamsPage } from './pages/exams/stream-exams';
import { ExamPage } from './pages/exam';
import { ExamResultPage } from './pages/exam-result';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/mock-tests" element={<MockTestsPage />} />
      <Route path="/previous-year-papers" element={<PreviousYearPapersPage />} />
      <Route path="/exams" element={<ExamsPage />} />
      <Route path="/exams/:stream" element={<StreamExamsPage />} />
      <Route path="/exam/:examId" element={<ExamPage />} />
      <Route path="/exam/:examId/result" element={<ExamResultPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 