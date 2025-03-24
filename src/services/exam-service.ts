import { supabase } from '../lib/supabase';
import { Exam, Section, Question, DifficultyLevel, Stream } from '../lib/types';

export interface ExamCreateInput {
  title: string;
  stream: Stream;
  category: 'daily' | 'weekly' | 'monthly';
  subject?: string;
  scheduledDate: string;
  duration: number;
  difficulty: DifficultyLevel;
  status: 'draft' | 'scheduled' | 'active' | 'completed';
  markingScheme: {
    defaultWeightage: number;
    defaultNegativeMarking: number;
    passingPercentage: number;
  };
  reminderBefore?: number;
  notificationsEnabled?: boolean;
}

export interface SectionCreateInput {
  name: string;
  instructions?: string;
  subject?: string;
  negativeMarking: number;
}

export interface QuestionCreateInput {
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
  topic?: string;
  difficulty: DifficultyLevel;
  weightage: number;
}

/**
 * Service for managing exams in the database
 */
export const ExamService = {
  /**
   * Get all exams with optional filtering
   */
  async getExams(filters?: {
    stream?: Stream;
    subject?: string;
    status?: string;
    difficulty?: DifficultyLevel;
  }): Promise<Exam[]> {
    try {
      let query = supabase
        .from('tests')
        .select(`
          id,
          title,
          description,
          stream,
          subject,
          difficulty,
          duration,
          total_marks,
          status,
          category,
          scheduled_date,
          created_at,
          updated_at,
          is_previous_year,
          year,
          marking_schemes (
            default_weightage,
            default_negative_marking,
            passing_percentage
          )
        `);

      // Apply filters if provided
      if (filters?.stream) {
        query = query.eq('stream', filters.stream);
      }
      if (filters?.subject) {
        query = query.eq('subject', filters.subject);
      }
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.difficulty) {
        query = query.eq('difficulty', filters.difficulty);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      // Transform the data to match our Exam type
      const exams: Exam[] = await Promise.all(
        (data || []).map(async (test) => {
          // Get sections for this exam
          const { data: sectionData, error: sectionError } = await supabase
            .from('test_sections')
            .select(`
              section_id,
              section_order,
              sections (
                id,
                name,
                instructions,
                subject,
                negative_marking
              )
            `)
            .eq('test_id', test.id)
            .order('section_order');

          if (sectionError) {
            console.error('Error fetching sections:', sectionError);
            return null;
          }

          // Get questions for each section
          const sections: Section[] = await Promise.all(
            (sectionData || []).map(async (sectionJoin) => {
              const section = sectionJoin.sections;

              const { data: questionData, error: questionError } = await supabase
                .from('questions')
                .select(`
                  id,
                  question_text,
                  options,
                  correct_answer,
                  explanation,
                  question_type,
                  difficulty,
                  topic,
                  weightage,
                  marks
                `)
                .eq('section_id', section.id);

              if (questionError) {
                console.error('Error fetching questions:', questionError);
                return null;
              }

              // Transform questions to match our Question type
              const questions: Question[] = (questionData || []).map((q) => ({
                id: q.id,
                text: q.question_text,
                options: Array.isArray(q.options) ? q.options : [],
                correctAnswer: parseInt(q.correct_answer, 10) || 0,
                explanation: q.explanation,
                subject: test.subject,
                topic: q.topic,
                difficulty: q.difficulty as DifficultyLevel,
                weightage: q.weightage || q.marks || 1,
                section: section.id
              }));

              return {
                id: section.id,
                name: section.name,
                instructions: section.instructions,
                subject: section.subject,
                negativeMarking: section.negative_marking || 0,
                questions
              };
            })
          );

          // Filter out any null sections (from errors)
          const validSections = sections.filter(Boolean) as Section[];

          // Calculate total questions
          const totalQuestions = validSections.reduce(
            (sum, section) => sum + section.questions.length,
            0
          );

          const markingScheme = test.marking_schemes?.[0] || {
            default_weightage: 1,
            default_negative_marking: 0,
            passing_percentage: 35
          };

          return {
            id: test.id,
            title: test.title,
            stream: test.stream as Stream,
            category: test.category as 'daily' | 'weekly' | 'monthly',
            subject: test.subject,
            scheduledDate: test.scheduled_date,
            duration: test.duration,
            totalQuestions,
            sections: validSections,
            difficulty: test.difficulty as DifficultyLevel,
            status: test.status as 'scheduled' | 'completed',
            createdAt: test.created_at,
            notifications: {
              reminderBefore: test.reminder_before || 60,
              enabled: test.notifications_enabled || true
            },
            markingScheme: {
              defaultWeightage: markingScheme.default_weightage,
              defaultNegativeMarking: markingScheme.default_negative_marking,
              passingPercentage: markingScheme.passing_percentage
            }
          };
        })
      );

      // Filter out any null exams (from errors)
      return exams.filter(Boolean) as Exam[];
    } catch (error) {
      console.error('Error in getExams:', error);

      // Try to get cached data
      const cachedExams = localStorage.getItem('exams_cache');
      if (cachedExams) {
        return JSON.parse(cachedExams);
      }

      return [];
    }
  },

  /**
   * Get a single exam by ID
   */
  async getExamById(id: string): Promise<Exam | null> {
    try {
      const { data, error } = await supabase
        .from('tests')
        .select(`
          id,
          title,
          description,
          stream,
          subject,
          difficulty,
          duration,
          total_marks,
          status,
          category,
          scheduled_date,
          created_at,
          updated_at,
          is_previous_year,
          year,
          marking_schemes (
            default_weightage,
            default_negative_marking,
            passing_percentage
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      if (!data) {
        return null;
      }

      // Get sections for this exam
      const { data: sectionData, error: sectionError } = await supabase
        .from('test_sections')
        .select(`
          section_id,
          section_order,
          sections (
            id,
            name,
            instructions,
            subject,
            negative_marking
          )
        `)
        .eq('test_id', id)
        .order('section_order');

      if (sectionError) {
        console.error('Error fetching sections:', sectionError);
        return null;
      }

      // Get questions for each section
      const sections: Section[] = await Promise.all(
        (sectionData || []).map(async (sectionJoin) => {
          const section = sectionJoin.sections;

          const { data: questionData, error: questionError } = await supabase
            .from('questions')
            .select(`
              id,
              question_text,
              options,
              correct_answer,
              explanation,
              question_type,
              difficulty,
              topic,
              weightage,
              marks
            `)
            .eq('section_id', section.id);

          if (questionError) {
            console.error('Error fetching questions:', questionError);
            return null;
          }

          // Transform questions to match our Question type
          const questions: Question[] = (questionData || []).map((q) => ({
            id: q.id,
            text: q.question_text,
            options: Array.isArray(q.options) ? q.options :
              (typeof q.options === 'string' ? JSON.parse(q.options) :
               typeof q.options === 'object' ? Object.values(q.options) : []),
            correctAnswer: parseInt(q.correct_answer, 10) || 0,
            explanation: q.explanation,
            subject: data.subject,
            topic: q.topic,
            difficulty: q.difficulty as DifficultyLevel,
            weightage: q.weightage || q.marks || 1,
            section: section.id
          }));

          return {
            id: section.id,
            name: section.name,
            instructions: section.instructions,
            subject: section.subject,
            negativeMarking: section.negative_marking || 0,
            questions
          };
        })
      );

      // Filter out any null sections (from errors)
      const validSections = sections.filter(Boolean) as Section[];

      // Calculate total questions
      const totalQuestions = validSections.reduce(
        (sum, section) => sum + section.questions.length,
        0
      );

      const markingScheme = data.marking_schemes?.[0] || {
        default_weightage: 1,
        default_negative_marking: 0,
        passing_percentage: 35
      };

      const exam: Exam = {
        id: data.id,
        title: data.title,
        stream: data.stream as Stream,
        category: data.category as 'daily' | 'weekly' | 'monthly',
        subject: data.subject,
        scheduledDate: data.scheduled_date,
        duration: data.duration,
        totalQuestions,
        sections: validSections,
        difficulty: data.difficulty as DifficultyLevel,
        status: data.status as 'scheduled' | 'completed',
        createdAt: data.created_at,
        notifications: {
          reminderBefore: data.reminder_before || 60,
          enabled: data.notifications_enabled || true
        },
        markingScheme: {
          defaultWeightage: markingScheme.default_weightage,
          defaultNegativeMarking: markingScheme.default_negative_marking,
          passingPercentage: markingScheme.passing_percentage
        }
      };

      // Cache the exam
      localStorage.setItem(`exam_${id}_cache`, JSON.stringify(exam));

      return exam;
    } catch (error) {
      console.error('Error in getExamById:', error);

      // Try to get cached data
      const cachedExam = localStorage.getItem(`exam_${id}_cache`);
      if (cachedExam) {
        return JSON.parse(cachedExam);
      }

      // Fallback to localStorage exams
      const exams = JSON.parse(localStorage.getItem('exams') || '[]');
      return exams.find((e: Exam) => e.id === id) || null;
    }
  },

  /**
   * Create a new exam
   */
  async createExam(
    examInput: ExamCreateInput,
    sections: SectionCreateInput[],
    questions: Record<number, QuestionCreateInput[]>
  ): Promise<Exam | null> {
    try {
      // Start a transaction
      const { data: testData, error: testError } = await supabase
        .from('tests')
        .insert({
          title: examInput.title,
          description: `${examInput.title} - ${examInput.subject || examInput.stream}`,
          stream: examInput.stream,
          subject: examInput.subject || '',
          difficulty: examInput.difficulty,
          duration: examInput.duration,
          total_marks: 0, // Will be calculated based on questions
          status: examInput.status,
          category: examInput.category,
          scheduled_date: examInput.scheduledDate,
          reminder_before: examInput.reminderBefore || 60,
          notifications_enabled: examInput.notificationsEnabled || true
        })
        .select('id')
        .single();

      if (testError) {
        throw testError;
      }

      const testId = testData.id;

      // Create marking scheme
      const { error: markingError } = await supabase
        .from('marking_schemes')
        .insert({
          test_id: testId,
          default_weightage: examInput.markingScheme.defaultWeightage,
          default_negative_marking: examInput.markingScheme.defaultNegativeMarking,
          passing_percentage: examInput.markingScheme.passingPercentage
        });

      if (markingError) {
        throw markingError;
      }

      // Create sections and questions
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];

        // Create section
        const { data: sectionData, error: sectionError } = await supabase
          .from('sections')
          .insert({
            name: section.name,
            instructions: section.instructions || '',
            subject: section.subject || examInput.subject || '',
            negative_marking: section.negativeMarking
          })
          .select('id')
          .single();

        if (sectionError) {
          throw sectionError;
        }

        const sectionId = sectionData.id;

        // Link section to test
        const { error: linkError } = await supabase
          .from('test_sections')
          .insert({
            test_id: testId,
            section_id: sectionId,
            section_order: i
          });

        if (linkError) {
          throw linkError;
        }

        // Create questions for this section
        const sectionQuestions = questions[i] || [];
        let totalMarks = 0;

        for (const question of sectionQuestions) {
          const { error: questionError } = await supabase
            .from('questions')
            .insert({
              test_id: testId,
              section_id: sectionId,
              question_text: question.text,
              question_type: 'multiple_choice',
              options: JSON.stringify(question.options),
              correct_answer: question.correctAnswer.toString(),
              explanation: question.explanation || '',
              difficulty: question.difficulty,
              topic: question.topic || '',
              weightage: question.weightage,
              marks: question.weightage
            });

          if (questionError) {
            throw questionError;
          }

          totalMarks += question.weightage;
        }

        // Update total marks
        const { error: updateError } = await supabase
          .from('tests')
          .update({ total_marks: totalMarks })
          .eq('id', testId);

        if (updateError) {
          throw updateError;
        }
      }

      // Get the created exam
      return this.getExamById(testId);
    } catch (error) {
      console.error('Error in createExam:', error);
      return null;
    }
  },

  /**
   * Update an existing exam
   */
  async updateExam(
    id: string,
    examInput: Partial<ExamCreateInput>,
    sections?: SectionCreateInput[],
    questions?: Record<number, QuestionCreateInput[]>
  ): Promise<Exam | null> {
    try {
      // Update test
      const updateData: any = {};

      if (examInput.title) updateData.title = examInput.title;
      if (examInput.stream) updateData.stream = examInput.stream;
      if (examInput.category) updateData.category = examInput.category;
      if (examInput.subject) updateData.subject = examInput.subject;
      if (examInput.scheduledDate) updateData.scheduled_date = examInput.scheduledDate;
      if (examInput.duration) updateData.duration = examInput.duration;
      if (examInput.difficulty) updateData.difficulty = examInput.difficulty;
      if (examInput.status) updateData.status = examInput.status;
      if (examInput.reminderBefore) updateData.reminder_before = examInput.reminderBefore;
      if (examInput.notificationsEnabled !== undefined) {
        updateData.notifications_enabled = examInput.notificationsEnabled;
      }

      if (Object.keys(updateData).length > 0) {
        const { error: testError } = await supabase
          .from('tests')
          .update(updateData)
          .eq('id', id);

        if (testError) {
          throw testError;
        }
      }

      // Update marking scheme if provided
      if (examInput.markingScheme) {
        const { error: markingError } = await supabase
          .from('marking_schemes')
          .update({
            default_weightage: examInput.markingScheme.defaultWeightage,
            default_negative_marking: examInput.markingScheme.defaultNegativeMarking,
            passing_percentage: examInput.markingScheme.passingPercentage
          })
          .eq('test_id', id);

        if (markingError) {
          throw markingError;
        }
      }

      // If sections are provided, update them
      if (sections && sections.length > 0) {
        // First, get existing sections
        const { data: existingSections, error: sectionsError } = await supabase
          .from('test_sections')
          .select('section_id')
          .eq('test_id', id);

        if (sectionsError) {
          throw sectionsError;
        }

        // Delete existing sections
        if (existingSections && existingSections.length > 0) {
          const sectionIds = existingSections.map(s => s.section_id);

          const { error: deleteError } = await supabase
            .from('sections')
            .delete()
            .in('id', sectionIds);

          if (deleteError) {
            throw deleteError;
          }
        }

        // Create new sections and questions
        for (let i = 0; i < sections.length; i++) {
          const section = sections[i];

          // Create section
          const { data: sectionData, error: sectionError } = await supabase
            .from('sections')
            .insert({
              name: section.name,
              instructions: section.instructions || '',
              subject: section.subject || examInput.subject || '',
              negative_marking: section.negativeMarking
            })
            .select('id')
            .single();

          if (sectionError) {
            throw sectionError;
          }

          const sectionId = sectionData.id;

          // Link section to test
          const { error: linkError } = await supabase
            .from('test_sections')
            .insert({
              test_id: id,
              section_id: sectionId,
              section_order: i
            });

          if (linkError) {
            throw linkError;
          }

          // Create questions for this section if provided
          if (questions && questions[i]) {
            const sectionQuestions = questions[i];
            let totalMarks = 0;

            for (const question of sectionQuestions) {
              const { error: questionError } = await supabase
                .from('questions')
                .insert({
                  test_id: id,
                  section_id: sectionId,
                  question_text: question.text,
                  question_type: 'multiple_choice',
                  options: question.options,
                  correct_answer: question.correctAnswer.toString(),
                  explanation: question.explanation || '',
                  difficulty: question.difficulty,
                  topic: question.topic || '',
                  weightage: question.weightage,
                  marks: question.weightage
                });

              if (questionError) {
                throw questionError;
              }

              totalMarks += question.weightage;
            }

            // Update total marks
            const { error: updateError } = await supabase
              .from('tests')
              .update({ total_marks: totalMarks })
              .eq('id', id);

            if (updateError) {
              throw updateError;
            }
          }
        }
      }

      // Get the updated exam
      return this.getExamById(id);
    } catch (error) {
      console.error('Error in updateExam:', error);
      return null;
    }
  },

  /**
   * Delete an exam
   */
  async deleteExam(id: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('tests')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      console.error('Error in deleteExam:', error);
      return false;
    }
  }
};
