import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Exam, Section, Question, DifficultyLevel } from '../../lib/types';

export function EditExamPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState<Omit<Exam, 'id' | 'createdAt'>>({
    title: '',
    category: 'daily',
    scheduledDate: '',
    duration: 60,
    totalQuestions: 0,
    subjects: [],
    sections: [],
    difficulty: 'medium',
    status: 'scheduled',
    notifications: {
      reminderBefore: 60,
      enabled: true,
    },
    markingScheme: {
      defaultWeightage: 1,
      defaultNegativeMarking: 0.25,
      passingPercentage: 35,
    },
  });

  useEffect(() => {
    // Load exam data
    const exams = JSON.parse(localStorage.getItem('exams') || '[]');
    const exam = exams.find((e: Exam) => e.id === id);
    if (exam) {
      setFormData(exam);
    } else {
      navigate('/admin/dashboard');
    }
  }, [id, navigate]);

  const addSection = () => {
    setFormData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: Date.now().toString(),
          name: `Section ${prev.sections.length + 1}`,
          instructions: '',
          negativeMarking: prev.markingScheme.defaultNegativeMarking,
          questions: [],
        },
      ],
    }));
  };

  const addQuestion = (sectionIndex: number) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].questions.push({
      id: `${newSections[sectionIndex].id}-${Date.now()}`,
      text: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      difficulty: formData.difficulty,
      weightage: formData.markingScheme.defaultWeightage,
      section: newSections[sectionIndex].id,
    });
    
    setFormData((prev) => ({
      ...prev,
      sections: newSections,
      totalQuestions: prev.totalQuestions + 1,
    }));
  };

  const updateQuestion = (
    sectionIndex: number,
    questionIndex: number,
    updates: Partial<Question>
  ) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].questions[questionIndex] = {
      ...newSections[sectionIndex].questions[questionIndex],
      ...updates,
    };
    setFormData((prev) => ({ ...prev, sections: newSections }));
  };

  const updateQuestionOption = (
    sectionIndex: number,
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const newSections = [...formData.sections];
    newSections[sectionIndex].questions[questionIndex].options[optionIndex] = value;
    setFormData((prev) => ({ ...prev, sections: newSections }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Update exam in localStorage
      const exams = JSON.parse(localStorage.getItem('exams') || '[]');
      const examIndex = exams.findIndex((e: Exam) => e.id === id);
      if (examIndex !== -1) {
        exams[examIndex] = { ...formData, id };
        localStorage.setItem('exams', JSON.stringify(exams));
      }

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Exam</h1>
        <p className="mt-2 text-sm text-gray-700">
          Update the exam details and questions below.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Details */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Exam Title
            </label>
            <Input
              type="text"
              value={formData.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.category}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="daily">Daily Test</option>
              <option value="weekly">Weekly Test</option>
              <option value="monthly">Monthly Test</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Scheduled Date & Time
            </label>
            <Input
              type="datetime-local"
              value={formData.scheduledDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({ ...prev, scheduledDate: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (minutes)
            </label>
            <Input
              type="number"
              value={formData.duration}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  duration: parseInt(e.target.value),
                }))
              }
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Difficulty Level
            </label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.difficulty}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  difficulty: e.target.value as DifficultyLevel,
                }))
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        {/* Marking Scheme */}
        <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">Marking Scheme</h2>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Marks per Question
            </label>
            <Input
              type="number"
              step="0.5"
              value={formData.markingScheme.defaultWeightage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  markingScheme: {
                    ...prev.markingScheme,
                    defaultWeightage: parseFloat(e.target.value),
                  },
                }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Negative Marking
            </label>
            <Input
              type="number"
              step="0.25"
              value={formData.markingScheme.defaultNegativeMarking}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  markingScheme: {
                    ...prev.markingScheme,
                    defaultNegativeMarking: parseFloat(e.target.value),
                  },
                }))
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Passing Percentage
            </label>
            <Input
              type="number"
              value={formData.markingScheme.passingPercentage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFormData((prev) => ({
                  ...prev,
                  markingScheme: {
                    ...prev.markingScheme,
                    passingPercentage: parseInt(e.target.value),
                  },
                }))
              }
            />
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">Sections</h2>
            <Button type="button" onClick={addSection}>
              Add Section
            </Button>
          </div>

          {formData.sections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className="space-y-6 bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-md font-medium text-gray-900">
                  {section.name}
                </h3>
                <Button type="button" onClick={() => addQuestion(sectionIndex)}>
                  Add Question
                </Button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Section Instructions
                </label>
                <textarea
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  value={section.instructions}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    const newSections = [...formData.sections];
                    newSections[sectionIndex].instructions = e.target.value;
                    setFormData((prev) => ({ ...prev, sections: newSections }));
                  }}
                  rows={3}
                />
              </div>

              {section.questions.map((question, questionIndex) => (
                <div
                  key={question.id}
                  className="space-y-4 border border-gray-200 p-4 rounded-md"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Question Text
                    </label>
                    <textarea
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      value={question.text}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        updateQuestion(sectionIndex, questionIndex, {
                          text: e.target.value,
                        })
                      }
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Options
                    </label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex gap-2">
                        <Input
                          type="text"
                          value={option}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            updateQuestionOption(
                              sectionIndex,
                              questionIndex,
                              optionIndex,
                              e.target.value
                            )
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() =>
                            updateQuestion(sectionIndex, questionIndex, {
                              correctAnswer: optionIndex,
                            })
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Marks
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      value={question.weightage}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateQuestion(sectionIndex, questionIndex, {
                          weightage: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/admin/dashboard')}
          >
            Cancel
          </Button>
          <Button type="submit">Update Exam</Button>
        </div>
      </form>
    </div>
  );
} 