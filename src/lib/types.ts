export type Stream = 'engineering' | 'pharmacy';

export type Subject = {
  id: string;
  name: string;
  stream: Stream;
  code: string;
};

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  subject: string;
  topic?: string;
  difficulty: DifficultyLevel;
  weightage: number;
  section: string;
};

export type Section = {
  id: string;
  name: string;
  instructions?: string;
  subject?: string;
  questions: Question[];
  negativeMarking: number;
};

export type Exam = {
  id: string;
  title: string;
  stream: Stream;
  category: 'daily' | 'weekly' | 'monthly';
  subject?: string;
  scheduledDate: string;
  duration: number;
  totalQuestions: number;
  sections: Section[];
  difficulty: DifficultyLevel;
  status: 'scheduled' | 'completed';
  createdAt: string;
  notifications: {
    reminderBefore: number;
    enabled: boolean;
  };
  markingScheme: {
    defaultWeightage: number;
    defaultNegativeMarking: number;
    passingPercentage: number;
  };
};

export interface ExamSession {
  id: string;
  examId: string;
  userId: string;
  attemptNumber: number;
  startTime: string;
  endTime?: string;
  status: 'ongoing' | 'completed' | 'abandoned';
  answers: {
    questionId: string;
    selectedOption: number;
    timeSpent: number;
  }[];
  activityLog: {
    timestamp: string;
    action: 'start' | 'answer' | 'review' | 'submit' | 'tab_switch' | 'idle';
    details?: string;
  }[];
}

export interface ExamResult {
  sessionId: string;
  examId: string;
  userId: string;
  attemptNumber: number;
  totalMarks: number;
  obtainedMarks: number;
  sectionWiseMarks: {
    sectionId: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    marks: number;
  }[];
  timeTaken: number;
  status: 'pass' | 'fail';
  submittedAt: string;
  aiAnalysis?: {
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
  };
}