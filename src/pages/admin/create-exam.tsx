import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Brain, Beaker, Leaf } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Exam, Section, DifficultyLevel, Stream } from '../../lib/types';

const streamInfo = {
  engineering: {
    title: 'Engineering',
    icon: Brain,
    subjects: ['Mathematics', 'Physics', 'Chemistry', 'Computer Science'],
  },
  pharmacy: {
    title: 'Pharmacy',
    icon: Beaker,
    subjects: ['Biology', 'Chemistry', 'Pharmacology', 'Pharmaceutical Analysis'],
  },
  agriculture: {
    title: 'Agriculture',
    icon: Leaf,
    subjects: ['Agronomy', 'Soil Science', 'Plant Pathology', 'Agricultural Economics'],
  },
};

export function CreateExamPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const defaultStream = searchParams.get('stream') as Stream || 'engineering';

  const [formData, setFormData] = useState<Omit<Exam, 'id' | 'createdAt'>>({
    title: '',
    stream: defaultStream,
    category: 'daily',
    subject: '',
    scheduledDate: new Date().toISOString().slice(0, 16),
    duration: 60,
    totalQuestions: 0,
    sections: [],
    difficulty: 'medium',
    status: 'scheduled',
    notifications: {
      reminderBefore: 60,
      enabled: true,
    },
    markingScheme: {
      defaultWeightage: 1,
      defaultNegativeMarking: 0,
      passingPercentage: 40,
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Validate required fields
      if (!formData.title || !formData.stream || !formData.subject) {
        alert('Please fill in all required fields');
        return;
      }

      // Create new exam
      const newExam: Exam = {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        totalQuestions: formData.sections.reduce(
          (total, section) => total + section.questions.length,
          0
        ),
      };

      // Save to localStorage
      const storedExams = localStorage.getItem('exams');
      const exams = storedExams ? JSON.parse(storedExams) : [];

      // Add new exam
      exams.push(newExam);

      // Save back to localStorage
      localStorage.setItem('exams', JSON.stringify(exams));

      // Show success message
      alert('Exam created successfully!');

      // Navigate to manage tests page for the specific stream
      navigate(`/admin/manage-tests/${formData.stream}`);
    } catch (error) {
      console.error('Error creating exam:', error);
      alert('Failed to create exam. Please try again.');
    }
  };

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: Date.now().toString(),
          name: `Section ${prev.sections.length + 1}`,
          instructions: '',
          subject: prev.subject,
          negativeMarking: 0,
          questions: [],
        },
      ],
    }));
  };

  const addPresetQuestions = () => {
    if (formData.subject === 'Mathematics') {
      const newSection: Section = {
        id: 'sec_' + Date.now(),
        name: 'Divisibility and Number Theory',
        instructions: 'Choose the correct option for each question. Each question carries equal marks.',
        subject: 'Mathematics',
        negativeMarking: 0,
        questions: [
          {
            id: 'q1_' + Date.now(),
            text: 'For all 2n + 1, 3n + 1, n ∈ N, 3.5 is divisible by:',
            options: ['19', '17', '23', 'Any odd integer'],
            correctAnswer: 1,
            explanation: 'The answer is 17',
            subject: 'Mathematics',
            topic: 'Divisibility',
            difficulty: 'medium' as DifficultyLevel,
            weightage: formData.markingScheme.defaultWeightage,
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
            difficulty: 'medium' as DifficultyLevel,
            weightage: formData.markingScheme.defaultWeightage,
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
            difficulty: 'medium' as DifficultyLevel,
            weightage: formData.markingScheme.defaultWeightage,
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
            difficulty: 'medium' as DifficultyLevel,
            weightage: formData.markingScheme.defaultWeightage,
            section: 'sec_' + Date.now()
          }
        ]
      };

      setFormData(prev => ({
        ...prev,
        sections: [...prev.sections, newSection],
        totalQuestions: prev.totalQuestions + 4
      }));
    }
  };

  const addQuestion = (sectionIndex: number) => {
    setFormData((prev) => {
      const newSections = [...prev.sections];
      newSections[sectionIndex].questions.push({
        id: Date.now().toString(),
        text: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        subject: prev.subject || '',
        difficulty: prev.difficulty,
        weightage: prev.markingScheme.defaultWeightage,
        section: prev.sections[sectionIndex].id,
        topic: '',
      });
      return { ...prev, sections: newSections };
    });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Create New Exam</h1>
        <p className="mt-2 text-sm text-gray-700">
          Set up a new exam with sections and questions
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stream</label>
              <select
                value={formData.stream}
                onChange={(e) => setFormData({ ...formData, stream: e.target.value as Stream, subject: '' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              >
                {Object.entries(streamInfo).map(([value, { title }]) => (
                  <option key={value} value={value}>
                    {title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <select
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              >
                <option value="">Select a subject</option>
                {streamInfo[formData.stream].subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'daily' | 'weekly' | 'monthly' })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              >
                <option value="daily">Daily Test</option>
                <option value="weekly">Weekly Test</option>
                <option value="monthly">Monthly Test</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Scheduled Date</label>
              <input
                type="datetime-local"
                required
                value={formData.scheduledDate}
                onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
              <input
                type="number"
                required
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Difficulty</label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as DifficultyLevel })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {formData.subject === 'Mathematics' && (
              <div>
                <button
                  type="button"
                  onClick={addPresetQuestions}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Add Preset Mathematics Questions
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Marking Scheme */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Marking Scheme</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Marks per Question
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                required
                value={formData.markingScheme.defaultWeightage}
                onChange={(e) => setFormData({
                  ...formData,
                  markingScheme: {
                    ...formData.markingScheme,
                    defaultWeightage: parseFloat(e.target.value),
                  },
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Passing Percentage
              </label>
              <input
                type="number"
                step="1"
                min="0"
                max="100"
                required
                value={formData.markingScheme.passingPercentage}
                onChange={(e) => setFormData({
                  ...formData,
                  markingScheme: {
                    ...formData.markingScheme,
                    passingPercentage: parseInt(e.target.value),
                  },
                })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
              />
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Sections</h2>
            <Button type="button" onClick={addSection}>
              Add Section
            </Button>
          </div>

          {formData.sections.map((section, sectionIndex) => (
            <div key={section.id} className="mb-6 last:mb-0">
              <div className="border rounded-lg p-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Section Name
                  </label>
                  <input
                    type="text"
                    value={section.name}
                    onChange={(e) => {
                      const newSections = [...formData.sections];
                      newSections[sectionIndex].name = e.target.value;
                      setFormData({ ...formData, sections: newSections });
                    }}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Instructions
                  </label>
                  <textarea
                    value={section.instructions}
                    onChange={(e) => {
                      const newSections = [...formData.sections];
                      newSections[sectionIndex].instructions = e.target.value;
                      setFormData({ ...formData, sections: newSections });
                    }}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Questions ({section.questions.length})
                  </label>
                  <Button
                    type="button"
                    onClick={() => addQuestion(sectionIndex)}
                    className="mt-2"
                  >
                    Add Question
                  </Button>
                </div>

                {section.questions.map((question, questionIndex) => (
                  <div key={question.id} className="mb-4 last:mb-0">
                    <div className="border rounded-lg p-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Question Text
                        </label>
                        <textarea
                          value={question.text}
                          onChange={(e) => {
                            const newSections = [...formData.sections];
                            newSections[sectionIndex].questions[questionIndex].text = e.target.value;
                            setFormData({ ...formData, sections: newSections });
                          }}
                          rows={2}
                          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                        />
                      </div>

                      <div className="space-y-4">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex}>
                            <label className="block text-sm font-medium text-gray-700">
                              Option {optionIndex + 1}
                            </label>
                            <div className="mt-1 flex items-center gap-2">
                              <input
                                type="text"
                                value={option}
                                onChange={(e) => {
                                  const newSections = [...formData.sections];
                                  newSections[sectionIndex].questions[questionIndex].options[optionIndex] = e.target.value;
                                  setFormData({ ...formData, sections: newSections });
                                }}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-violet-500 focus:ring-violet-500"
                              />
                              <input
                                type="radio"
                                name={`correct-${question.id}`}
                                checked={question.correctAnswer === optionIndex}
                                onChange={() => {
                                  const newSections = [...formData.sections];
                                  newSections[sectionIndex].questions[questionIndex].correctAnswer = optionIndex;
                                  setFormData({ ...formData, sections: newSections });
                                }}
                                className="h-4 w-4 text-violet-600 focus:ring-violet-500"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <Button type="submit">Create Exam</Button>
        </div>
      </form>
    </div>
  );
}