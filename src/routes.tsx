import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './lib/auth-context';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { ContactPage } from './pages/contact';
import { MockTestsPage } from './pages/mock-tests';
import { PreviousYearPapersPage } from './pages/previous-year-papers';
import { ExamsPage } from './pages/exams';
import { StreamExamsPage } from './pages/exams/stream-exams';
import { ExamPage } from './pages/exam';
import { ExamResultPage } from './pages/exam-result';
import { ExamReviewPage } from './pages/exam-review';
import { IPEWeightagePage } from './pages/ipe-weightage';

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/ipe-weightage" element={<IPEWeightagePage />} />

      {/* Protected Routes */}
      <Route path="/mock-tests" element={
        <AuthProvider>
          <MockTestsPage />
        </AuthProvider>
      } />
      <Route path="/previous-year-papers" element={
        <AuthProvider>
          <PreviousYearPapersPage />
        </AuthProvider>
      } />
      <Route path="/exams" element={
        <AuthProvider>
          <ExamsPage />
        </AuthProvider>
      } />
      <Route path="/exams/:stream" element={
        <AuthProvider>
          <StreamExamsPage />
        </AuthProvider>
      } />
      <Route path="/exam/:examId" element={
        <AuthProvider>
          <ExamPage />
        </AuthProvider>
      } />
      <Route path="/exam/:examId/result" element={
        <AuthProvider>
          <ExamResultPage />
        </AuthProvider>
      } />
      <Route path="/exam/:examId/review" element={
        <AuthProvider>
          <ExamReviewPage />
        </AuthProvider>
      } />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
} 