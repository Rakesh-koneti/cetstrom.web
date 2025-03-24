import { supabase } from '../lib/supabase';
import { ExamResult } from '../lib/types';

export interface ExamResultInput {
  testId: string;
  userId: string;
  score: number;
  answers: Record<string, any>;
  completedAt?: string;
}

/**
 * Service for managing exam results in the database
 */
export const ResultService = {
  /**
   * Save an exam result
   */
  async saveResult(result: ExamResultInput): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('test_results')
        .insert({
          test_id: result.testId,
          user_id: result.userId,
          score: result.score,
          answers: result.answers,
          completed_at: result.completedAt || new Date().toISOString()
        })
        .select('id')
        .single();

      if (error) {
        throw error;
      }

      return data.id;
    } catch (error) {
      console.error('Error saving result:', error);

      // Store in localStorage for offline sync
      const offlineResults = JSON.parse(localStorage.getItem('offline_results') || '[]');
      const offlineResult = {
        ...result,
        id: `offline_${Date.now()}`,
        created_at: new Date().toISOString()
      };

      offlineResults.push(offlineResult);
      localStorage.setItem('offline_results', JSON.stringify(offlineResults));

      return offlineResult.id;
    }
  },

  /**
   * Get results for a specific exam
   */
  async getResultsByExam(examId: string, userId?: string): Promise<ExamResult[]> {
    try {
      let query = supabase
        .from('test_results')
        .select(`
          id,
          test_id,
          user_id,
          score,
          answers,
          completed_at,
          created_at,
          tests (
            title,
            total_marks
          )
        `)
        .eq('test_id', examId);

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform to our ExamResult type
      return (data || []).map((result): ExamResult => {
        const test = result.tests || {};
        const totalMarks = test.total_marks || 0;

        // Calculate section-wise marks from answers
        const answers = result.answers || {};
        const sectionWiseMarks: ExamResult['sectionWiseMarks'] = [];

        // Ensure answers is properly parsed if it's a string
        let parsedAnswers = answers;
        if (typeof answers === 'string') {
          try {
            parsedAnswers = JSON.parse(answers);
          } catch (e) {
            console.error('Error parsing answers:', e);
          }
        }

        // Create a section-wise mark entry from the answers
        if (parsedAnswers.correctAnswers !== undefined && parsedAnswers.wrongAnswers !== undefined) {
          sectionWiseMarks.push({
            sectionId: 'all',
            sectionName: 'All Sections',
            totalQuestions: parsedAnswers.totalQuestions || 0,
            correctAnswers: parsedAnswers.correctAnswers || 0,
            wrongAnswers: parsedAnswers.wrongAnswers || 0,
            obtainedMarks: result.score,
            totalMarks: totalMarks
          });
        }

        return {
          sessionId: result.id,
          examId: result.test_id,
          userId: result.user_id,
          attemptNumber: 1, // This would need to be calculated based on previous attempts
          totalMarks,
          obtainedMarks: result.score,
          sectionWiseMarks,
          timeTaken: parsedAnswers.timeTaken || 0,
          status: result.score >= (totalMarks * 0.35) ? 'pass' : 'fail',
          submittedAt: result.completed_at,
          answers: parsedAnswers // Include the parsed answers
        };
      });
    } catch (error) {
      console.error('Error getting results:', error);

      // Try to get from localStorage
      const offlineResults = JSON.parse(localStorage.getItem(`examResults_${examId}`) || '[]');
      return offlineResults;
    }
  },

  /**
   * Get results for a specific user
   */
  async getResultsByUser(userId: string): Promise<ExamResult[]> {
    try {
      const { data, error } = await supabase
        .from('test_results')
        .select(`
          id,
          test_id,
          user_id,
          score,
          answers,
          completed_at,
          created_at,
          tests (
            title,
            total_marks
          )
        `)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      // Transform to our ExamResult type
      return (data || []).map((result): ExamResult => {
        const test = result.tests || {};
        const totalMarks = test.total_marks || 0;

        // Initialize empty section-wise marks
        const sectionWiseMarks: ExamResult['sectionWiseMarks'] = [];

        return {
          sessionId: result.id,
          examId: result.test_id,
          userId: result.user_id,
          attemptNumber: 1, // This would need to be calculated
          totalMarks,
          obtainedMarks: result.score,
          sectionWiseMarks,
          timeTaken: result.answers?.timeTaken || 0,
          status: result.score >= (totalMarks * 0.35) ? 'pass' : 'fail',
          submittedAt: result.completed_at,
          answers: result.answers
        };
      });
    } catch (error) {
      console.error('Error getting results:', error);
      return [];
    }
  },

  /**
   * Sync offline results to the database
   */
  async syncOfflineResults(): Promise<void> {
    try {
      const offlineResults = JSON.parse(localStorage.getItem('offline_results') || '[]');

      if (offlineResults.length === 0) {
        return;
      }

      for (const result of offlineResults) {
        await this.saveResult({
          testId: result.testId,
          userId: result.userId,
          score: result.score,
          answers: result.answers,
          completedAt: result.completedAt
        });
      }

      // Clear offline results
      localStorage.removeItem('offline_results');
    } catch (error) {
      console.error('Error syncing offline results:', error);
    }
  }
};
