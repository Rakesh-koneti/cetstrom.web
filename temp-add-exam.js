// Create the exam object
const exam = {
  id: Date.now().toString(),
  title: 'Mathematics Practice Test - Divisibility',
  stream: 'engineering',
  category: 'daily',
  subject: 'Mathematics',
  scheduledDate: new Date().toISOString(),
  duration: 60,
  totalQuestions: 4,
  sections: [{
    id: 'sec_' + Date.now(),
    name: 'Divisibility and Number Theory',
    instructions: 'Choose the correct option for each question. Each question carries equal marks.',
    subject: 'Mathematics',
    negativeMarking: 0.25,
    questions: [
      {
        id: 'q1_' + Date.now(),
        text: 'For all 2n + 1, 3n + 1, n ∈ N, 3.5 is divisible by:',
        options: ['19', '17', '23', 'Any odd integer'],
        correctAnswer: 1,
        explanation: 'The answer is 17',
        subject: 'Mathematics',
        topic: 'Divisibility',
        difficulty: 'medium',
        weightage: 1,
        section: 'sec_' + Date.now()
      },
      {
        id: 'q2_' + Date.now(),
        text: 'For all +ve integral values of n, 49n + 16n - 1 is divisible by:',
        options: ['64', '8', '16', '43'],
        correctAnswer: 0,
        explanation: 'The answer is 64',
        subject: 'Mathematics',
        topic: 'Divisibility',
        difficulty: 'medium',
        weightage: 1,
        section: 'sec_' + Date.now()
      },
      {
        id: 'q3_' + Date.now(),
        text: 'For all n ∈ N, 10n + 2n, 3.4 + 5 is divisible by:',
        options: ['23', '3', '9', '207'],
        correctAnswer: 2,
        explanation: 'The answer is 9',
        subject: 'Mathematics',
        topic: 'Divisibility',
        difficulty: 'medium',
        weightage: 1,
        section: 'sec_' + Date.now()
      },
      {
        id: 'q4_' + Date.now(),
        text: 'The number an - bn (a, b are distinct rational numbers and n ∈ N) is always divisible by:',
        options: ['a - b', 'a + b', '2a-b', 'a-2b'],
        correctAnswer: 0,
        explanation: 'The answer is a - b',
        subject: 'Mathematics',
        topic: 'Divisibility',
        difficulty: 'medium',
        weightage: 1,
        section: 'sec_' + Date.now()
      }
    ]
  }],
  difficulty: 'medium',
  status: 'scheduled',
  createdAt: new Date().toISOString(),
  notifications: {
    reminderBefore: 60,
    enabled: true
  },
  markingScheme: {
    defaultWeightage: 1,
    defaultNegativeMarking: 0.25,
    passingPercentage: 35
  }
};

// Get existing exams from localStorage
const existingExams = localStorage.getItem('exams');
const exams = existingExams ? JSON.parse(existingExams) : [];

// Add new exam
exams.push(exam);

// Save back to localStorage
localStorage.setItem('exams', JSON.stringify(exams));

console.log('Mathematics exam added successfully!'); 