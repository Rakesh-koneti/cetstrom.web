import { supabase } from '../lib/supabase';
import { Exam, Section, Question, DifficultyLevel, Stream } from '../lib/types';

const practiceTests = {
  engineering: [
    {
      id: 'eng-practice-1',
      title: 'Engineering Practice Test 1',
      stream: 'engineering',
      category: 'daily',
      subject: 'mathematics',
      scheduledDate: new Date().toISOString(),
      duration: 60,
      difficulty: 'medium',
      status: 'active',
      sections: [
        {
          id: 'math-section-1',
          name: 'Mathematics Section 1',
          instructions: 'Solve the following problems. Each question carries 4 marks.',
          subject: 'mathematics',
          negativeMarking: 1,
          questions: [
            {
              id: 'math-q1',
              text: 'If a + b = 5 and ab = 6, find the value of a² + b².',
              options: ['13', '25', '11', '17'],
              correctAnswer: 0,
              explanation: 'Using (a + b)² = a² + b² + 2ab, we get: 25 = a² + b² + 12, so a² + b² = 13',
              subject: 'mathematics',
              topic: 'Algebra',
              difficulty: 'medium',
              weightage: 4
            },
            {
              id: 'math-q2',
              text: 'What is the derivative of x²sin(x)?',
              options: [
                '2xsin(x) + x²cos(x)',
                'x²sin(x) + 2xcos(x)',
                '2xsin(x) - x²cos(x)',
                '2xsin(x)'
              ],
              correctAnswer: 0,
              explanation: 'Using product rule: d/dx[x²sin(x)] = x² d/dx[sin(x)] + sin(x) d/dx[x²]',
              subject: 'mathematics',
              topic: 'Calculus',
              difficulty: 'medium',
              weightage: 4
            },
            {
              id: 'math-q3',
              text: 'What is the value of sin²θ + cos²θ?',
              options: ['0', '1', '2', 'Depends on θ'],
              correctAnswer: 1,
              explanation: 'This is a fundamental trigonometric identity: sin²θ + cos²θ = 1',
              subject: 'mathematics',
              topic: 'Trigonometry',
              difficulty: 'easy',
              weightage: 4
            },
            {
              id: 'math-q4',
              text: 'Solve the equation: log₂(x) = 3',
              options: ['6', '8', '9', '16'],
              correctAnswer: 1,
              explanation: 'If log₂(x) = 3, then x = 2³ = 8',
              subject: 'mathematics',
              topic: 'Logarithms',
              difficulty: 'medium',
              weightage: 4
            }
          ]
        }
      ],
      markingScheme: {
        defaultWeightage: 4,
        defaultNegativeMarking: 1,
        passingPercentage: 35
      }
    }
  ],
  pharmacy: [
    {
      id: 'pharm-practice-1',
      title: 'Pharmacy Practice Test 1',
      stream: 'pharmacy',
      category: 'daily',
      subject: 'chemistry',
      scheduledDate: new Date().toISOString(),
      duration: 45,
      difficulty: 'medium',
      status: 'active',
      sections: [
        {
          id: 'chem-section-1',
          name: 'Chemistry Section 1',
          instructions: 'Answer all questions. Each question carries 4 marks.',
          subject: 'chemistry',
          negativeMarking: 1,
          questions: [
            {
              id: 'chem-q1',
              text: 'Which of the following is a strong acid?',
              options: ['HCl', 'CH₃COOH', 'H₂CO₃', 'H₂S'],
              correctAnswer: 0,
              explanation: 'HCl (Hydrochloric acid) is a strong acid as it completely dissociates in water.',
              subject: 'chemistry',
              topic: 'Acids and Bases',
              difficulty: 'medium',
              weightage: 4
            },
            {
              id: 'chem-q2',
              text: 'What is the IUPAC name of CH₃-CH₂-CHO?',
              options: ['Propanal', 'Propanone', 'Ethanol', 'Ethanal'],
              correctAnswer: 0,
              explanation: 'CH₃-CH₂-CHO is an aldehyde with 3 carbons, hence it is named propanal.',
              subject: 'chemistry',
              topic: 'Organic Chemistry',
              difficulty: 'medium',
              weightage: 4
            },
            {
              id: 'chem-q3',
              text: 'Which of the following is an aromatic compound?',
              options: ['Benzene', 'Cyclohexane', 'Hexane', 'Ethene'],
              correctAnswer: 0,
              explanation: 'Benzene is an aromatic compound due to its cyclic structure with delocalized electrons.',
              subject: 'chemistry',
              topic: 'Organic Chemistry',
              difficulty: 'medium',
              weightage: 4
            },
            {
              id: 'chem-q4',
              text: 'What is the pH of a neutral solution at 25°C?',
              options: ['0', '7', '14', '1'],
              correctAnswer: 1,
              explanation: 'At 25°C, a neutral solution has a pH of 7.',
              subject: 'chemistry',
              topic: 'Acids and Bases',
              difficulty: 'easy',
              weightage: 4
            }
          ]
        }
      ],
      markingScheme: {
        defaultWeightage: 4,
        defaultNegativeMarking: 1,
        passingPercentage: 35
      }
    }
  ]
};

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

interface DatabaseTest {
  id: string;
  title: string;
  description: string;
  stream: string;
  subject: string;
  difficulty: string;
  duration: number;
  total_marks: number;
  status: string;
  category: string;
  scheduled_date: string;
  created_at: string;
  updated_at: string;
  is_previous_year: boolean;
  year?: number;
  reminder_before?: number;
  notifications_enabled?: boolean;
  marking_schemes: Array<{
    default_weightage: number;
    default_negative_marking: number;
    passing_percentage: number;
  }>;
}

interface DatabaseSection {
  id: string;
  name: string;
  instructions: string;
  subject: string;
  negative_marking: number;
}

interface DatabaseQuestion {
  id: string;
  question_text: string;
  options: string | string[];
  correct_answer: string;
  explanation?: string;
  question_type: string;
  difficulty: string;
  topic?: string;
  weightage?: number;
  marks?: number;
}

interface PracticeTest {
  id: string;
  title: string;
  stream: Stream;
  category: 'daily' | 'weekly' | 'monthly';
  subject: string;
  scheduledDate: string;
  duration: number;
  difficulty: DifficultyLevel;
  status: 'active';
  sections: Array<{
    id: string;
    name: string;
    instructions: string;
    subject: string;
    negativeMarking: number;
    questions: Array<{
      id: string;
      text: string;
      options: string[];
      correctAnswer: number;
      explanation?: string;
      subject: string;
      topic?: string;
      difficulty: DifficultyLevel;
      weightage: number;
    }>;
  }>;
  markingScheme: {
    defaultWeightage: number;
    defaultNegativeMarking: number;
    passingPercentage: number;
  };
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

      // Transform practice test to match Exam type
      const transformPracticeTest = (test: PracticeTest): Exam => ({
        id: test.id,
        title: test.title,
        stream: test.stream,
        category: test.category,
        subject: test.subject,
        scheduledDate: test.scheduledDate,
        duration: test.duration,
        totalQuestions: test.sections.reduce(
          (sum, section) => sum + section.questions.length,
          0
        ),
        sections: test.sections.map(section => ({
          id: section.id,
          name: section.name,
          instructions: section.instructions,
          subject: section.subject,
          negativeMarking: section.negativeMarking,
          questions: section.questions.map(q => ({
            ...q,
            explanation: q.explanation || '',
            topic: q.topic || '',
            section: section.id
          }))
        })),
        difficulty: test.difficulty,
        status: 'scheduled',
        createdAt: new Date().toISOString(),
        notifications: {
          reminderBefore: 60,
          enabled: true
        },
        markingScheme: test.markingScheme
      });

      // Transform database test to Exam type
      const transformDatabaseTest = (test: DatabaseTest): Exam => {
        const markingScheme = test.marking_schemes?.[0];
        return {
          id: test.id,
          title: test.title,
          stream: test.stream as Stream,
          category: test.category as 'daily' | 'weekly' | 'monthly',
          subject: test.subject,
          scheduledDate: test.scheduled_date,
          duration: test.duration,
          totalQuestions: 0, // Will be updated after sections are processed
          sections: [], // Will be updated after sections are processed
          difficulty: test.difficulty as DifficultyLevel,
          status: test.status as 'scheduled' | 'completed',
          createdAt: test.created_at,
          notifications: {
            reminderBefore: test.reminder_before || 60,
            enabled: test.notifications_enabled || true
          },
          markingScheme: {
            defaultWeightage: markingScheme?.default_weightage || 1,
            defaultNegativeMarking: markingScheme?.default_negative_marking || 0,
            passingPercentage: markingScheme?.passing_percentage || 35
          }
        };
      };

      // Transform database section to Section type
      const transformDatabaseSection = (section: DatabaseSection, questions: Question[]): Section => ({
        id: section.id,
        name: section.name,
        instructions: section.instructions || '',
        subject: section.subject,
        negativeMarking: section.negative_marking,
        questions
      });

      // Transform database question to Question type
      const transformDatabaseQuestion = (q: DatabaseQuestion, subject: string, sectionId: string): Question => {
        let parsedOptions: string[] = [];
        try {
          parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : 
                        Array.isArray(q.options) ? q.options : [];
        } catch (e) {
          console.error('Error parsing options:', e);
          parsedOptions = [];
        }
        
        return {
          id: q.id,
          text: q.question_text,
          options: parsedOptions,
          correctAnswer: parseInt(q.correct_answer, 10) || 0,
          explanation: q.explanation || '',
          subject: subject,
          topic: q.topic || '',
          difficulty: q.difficulty as DifficultyLevel,
          weightage: q.weightage || q.marks || 1,
          section: sectionId
        };
      };

      // Transform the data to match our Exam type
      const exams: (Exam | null)[] = await Promise.all(
        (data || []).map(async (test: DatabaseTest) => {
          try {
            const exam = transformDatabaseTest(test);

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
              .order('section_order') as { data: Array<{ sections: DatabaseSection }> | null, error: any };

            if (sectionError) {
              console.error('Error fetching sections:', sectionError);
              return null;
            }

            // Get questions for each section
            const sections = await Promise.all(
              (sectionData || []).map(async (sectionJoin) => {
                const section = sectionJoin.sections;
                if (!section) return null;

                try {
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
                    .eq('section_id', section.id) as { data: DatabaseQuestion[] | null, error: any };

                  if (questionError) {
                    console.error('Error fetching questions for section:', section.id, questionError);
                    return null;
                  }

                  const questions = (questionData || []).map(q => 
                    transformDatabaseQuestion(q, test.subject, section.id)
                  );

                  return transformDatabaseSection(section, questions);
                } catch (error) {
                  console.error('Error processing section:', section.id, error);
                  return null;
                }
              })
            );

            // Filter out any null sections
            const validSections = sections.filter((section): section is Section => section !== null);

            // Update exam with sections and total questions
            exam.sections = validSections;
            exam.totalQuestions = validSections.reduce(
              (sum, section) => sum + section.questions.length,
              0
            );

            return exam;
          } catch (error) {
            console.error('Error processing exam:', test.id, error);
            return null;
          }
        })
      );

      // Filter out any null exams
      const filteredExams = exams.filter((exam): exam is Exam => exam !== null);

      // Add practice tests based on the stream filter
      let practiceExams: Exam[] = [];
      if (filters?.stream) {
        practiceExams = (practiceTests[filters.stream] as PracticeTest[] || []).map(transformPracticeTest);
      } else {
        // If no stream filter, include all practice tests
        practiceExams = [...practiceTests.engineering, ...practiceTests.pharmacy].map(test => 
          transformPracticeTest(test as PracticeTest)
        );
      }

      // Apply subject and difficulty filters to practice tests if needed
      if (filters?.subject || filters?.difficulty) {
        practiceExams = practiceExams.filter(exam => {
          const matchesSubject = !filters.subject || exam.subject === filters.subject;
          const matchesDifficulty = !filters.difficulty || exam.difficulty === filters.difficulty;
          return matchesSubject && matchesDifficulty;
        });
      }

      // Combine database exams with practice tests
      const allExams = [...filteredExams, ...practiceExams];

      // Cache the combined results
      if (filters?.stream) {
        localStorage.setItem(`stream_exams_${filters.stream}`, JSON.stringify(allExams));
      }

      return allExams;
    } catch (error) {
      console.error('Error in getExams:', error);

      // If database query fails, return practice tests
      let practiceExams: Exam[] = [];
      if (filters?.stream) {
        practiceExams = practiceTests[filters.stream] || [];
      } else {
        practiceExams = [...practiceTests.engineering, ...practiceTests.pharmacy];
      }

      // Apply filters if needed
      if (filters?.subject || filters?.difficulty) {
        practiceExams = practiceExams.filter(exam => {
          const matchesSubject = !filters.subject || exam.subject === filters.subject;
          const matchesDifficulty = !filters.difficulty || exam.difficulty === filters.difficulty;
          return matchesSubject && matchesDifficulty;
        });
      }

      return practiceExams;
    }
  },

  /**
   * Get a single exam by ID
   */
  async getExamById(id: string): Promise<Exam | null> {
    try {
      console.log('Fetching exam data from Supabase for ID:', id);
      
      const { data: testData, error: testError } = await supabase
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
          reminder_before,
          notifications_enabled,
          marking_schemes (
            default_weightage,
            default_negative_marking,
            passing_percentage
          )
        `)
        .eq('id', id)
        .single() as { data: DatabaseTest | null, error: any };

      if (testError) {
        console.error('Error fetching test data:', testError);
        throw testError;
      }

      if (!testData) {
        console.error('No test data found for ID:', id);
        return null;
      }

      console.log('Fetching sections for exam:', id);
      
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
        .order('section_order') as { data: Array<{ sections: DatabaseSection }> | null, error: any };

      if (sectionError) {
        console.error('Error fetching sections:', sectionError);
        throw sectionError;
      }

      if (!sectionData || sectionData.length === 0) {
        console.error('No sections found for exam:', id);
        return {
          ...testData,
          sections: [],
          totalQuestions: 0,
          markingScheme: testData.marking_schemes?.[0] || {
            defaultWeightage: 1,
            defaultNegativeMarking: 0,
            passingPercentage: 35
          }
        };
      }

      console.log('Fetching questions for exam sections');
      
      // Get questions for each section
      const sections = await Promise.all(
        sectionData.map(async (sectionJoin) => {
          const section = sectionJoin.sections;
          if (!section) {
            console.error('Invalid section data:', sectionJoin);
            return null;
          }

          try {
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
              .eq('section_id', section.id) as { data: DatabaseQuestion[] | null, error: any };

            if (questionError) {
              console.error('Error fetching questions for section:', section.id, questionError);
              throw questionError;
            }

            // Transform questions
            const questions = (questionData || []).map((q) => {
              let parsedOptions: string[] = [];
              try {
                parsedOptions = typeof q.options === 'string' ? JSON.parse(q.options) : 
                              Array.isArray(q.options) ? q.options : [];
              } catch (e) {
                console.error('Error parsing options:', e);
                parsedOptions = [];
              }
              
              return {
                id: q.id,
                text: q.question_text,
                options: parsedOptions,
                correctAnswer: parseInt(q.correct_answer, 10) || 0,
                explanation: q.explanation,
                subject: testData.subject,
                topic: q.topic,
                difficulty: q.difficulty,
                weightage: q.weightage || q.marks || 1,
                section: section.id
              };
            });

            return {
              id: section.id,
              name: section.name,
              instructions: section.instructions,
              subject: section.subject,
              negativeMarking: section.negative_marking || 0,
              questions
            };
          } catch (error) {
            console.error('Error processing section:', section.id, error);
            return null;
          }
        })
      );

      // Filter out any null sections
      const validSections = sections.filter((section): section is Section => section !== null);

      if (validSections.length === 0) {
        console.error('No valid sections found after processing');
      }

      console.log('Exam data processed successfully');
      
      return {
        id: testData.id,
        title: testData.title,
        stream: testData.stream,
        category: testData.category,
        subject: testData.subject,
        scheduledDate: testData.scheduled_date,
        duration: testData.duration,
        totalQuestions: validSections.reduce(
          (sum, section) => sum + (section?.questions?.length || 0),
          0
        ),
        sections: validSections,
        difficulty: testData.difficulty,
        status: testData.status,
        markingScheme: testData.marking_schemes?.[0] || {
          defaultWeightage: 1,
          defaultNegativeMarking: 0,
          passingPercentage: 35
        }
      };
    } catch (error) {
      console.error('Error in getExamById:', error);
      throw error;
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

      // Initialize total marks for the entire test
      let testTotalMarks = 0;

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
        let sectionTotalMarks = 0;

        for (const question of sectionQuestions) {
          // Default weightage to 1 if not specified
          const weightage = question.weightage || 1;

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
              difficulty: question.difficulty || 'medium',
              topic: question.topic || '',
              weightage: weightage,
              marks: weightage
            });

          if (questionError) {
            throw questionError;
          }

          sectionTotalMarks += weightage;
        }

        // Add this section's marks to the test total
        testTotalMarks += sectionTotalMarks;
      }

      // Update total marks for the entire test
      // If no questions were added, default to at least 1 mark
      const finalTotalMarks = testTotalMarks > 0 ? testTotalMarks : 1;

      const { error: updateError } = await supabase
        .from('tests')
        .update({ total_marks: finalTotalMarks })
        .eq('id', testId);

      if (updateError) {
        throw updateError;
      }

      // Get the created exam
      return this.getExamById(testId);
    } catch (error) {
      console.error('Error in createExam:', error);
      // Throw the error so it can be handled by the UI
      throw new Error('Failed to create exam: ' + (error.message || 'Unknown error'));
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
