import { useState } from 'react';
import { useTheme } from '../lib/theme-context';
import { Calculator, BookOpen, GraduationCap, Plus, Minus } from 'lucide-react';

interface WeightageInfo {
  subject: string;
  ipeWeightage: number;
  eamcetWeightage: number;
  totalMarks: number;
}

interface IPEMarks {
  // MPC Subjects
  maths1A: string;
  maths1B: string;
  physics1: string;
  chemistry1: string;
  maths2A: string;
  maths2B: string;
  physics2: string;
  chemistry2: string;
  physicsPractical: string;
  chemistryPractical: string;
  // BIPC Subjects
  botany1: string;
  zoology1: string;
  physics1BIPC: string;
  chemistry1BIPC: string;
  botany2: string;
  zoology2: string;
  physics2BIPC: string;
  chemistry2BIPC: string;
  botanyPractical: string;
  zoologyPractical: string;
  physicsPracticalBIPC: string;
  chemistryPracticalBIPC: string;
}

type Stream = 'MPC' | 'BIPC';

const weightageData: WeightageInfo[] = [
  {
    subject: 'Mathematics',
    ipeWeightage: 25,
    eamcetWeightage: 75,
    totalMarks: 100
  },
  {
    subject: 'Physics',
    ipeWeightage: 25,
    eamcetWeightage: 75,
    totalMarks: 100
  },
  {
    subject: 'Chemistry',
    ipeWeightage: 25,
    eamcetWeightage: 75,
    totalMarks: 100
  }
];

const bipcWeightageData: WeightageInfo[] = [
  {
    subject: 'Botany',
    ipeWeightage: 25,
    eamcetWeightage: 75,
    totalMarks: 100
  },
  {
    subject: 'Zoology',
    ipeWeightage: 25,
    eamcetWeightage: 75,
    totalMarks: 100
  },
  {
    subject: 'Physics',
    ipeWeightage: 25,
    eamcetWeightage: 75,
    totalMarks: 100
  },
  {
    subject: 'Chemistry',
    ipeWeightage: 25,
    eamcetWeightage: 75,
    totalMarks: 100
  }
];

export function IPEWeightage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [stream, setStream] = useState<Stream>('MPC');
  const [marks, setMarks] = useState<IPEMarks>({
    // MPC Subjects
    maths1A: '',
    maths1B: '',
    physics1: '',
    chemistry1: '',
    maths2A: '',
    maths2B: '',
    physics2: '',
    chemistry2: '',
    physicsPractical: '',
    chemistryPractical: '',
    // BIPC Subjects
    botany1: '',
    zoology1: '',
    physics1BIPC: '',
    chemistry1BIPC: '',
    botany2: '',
    zoology2: '',
    physics2BIPC: '',
    chemistry2BIPC: '',
    botanyPractical: '',
    zoologyPractical: '',
    physicsPracticalBIPC: '',
    chemistryPracticalBIPC: ''
  });

  const calculateTotalMarks = () => {
    if (stream === 'MPC') {
      return Object.entries(marks)
        .filter(([key]) => !key.includes('BIPC') && !key.includes('botany') && !key.includes('zoology'))
        .reduce((sum, [_, mark]) => {
          const numValue = mark === '' ? 0 : parseInt(mark);
          return sum + (isNaN(numValue) ? 0 : numValue);
        }, 0);
    } else {
      return Object.entries(marks)
        .filter(([key]) => key.includes('BIPC') || key.includes('botany') || key.includes('zoology'))
        .reduce((sum, [_, mark]) => {
          const numValue = mark === '' ? 0 : parseInt(mark);
          return sum + (isNaN(numValue) ? 0 : numValue);
        }, 0);
    }
  };

  const calculateWeightedScore = () => {
    const total = calculateTotalMarks();
    return (total / 600) * 25; // 25% weightage
  };

  const handleMarkChange = (field: keyof IPEMarks, value: string) => {
    if (value === '') {
      setMarks(prev => ({ ...prev, [field]: '' }));
      return;
    }
    const numValue = parseInt(value);
    if (!isNaN(numValue)) {
      const maxValue = field.includes('Practical') ? 30 : 60;
      const clampedValue = Math.min(Math.max(0, numValue), maxValue);
      setMarks(prev => ({ ...prev, [field]: clampedValue.toString() }));
    }
  };

  return (
    <div className={`rounded-xl p-6 ${
      isDark ? 'bg-gray-800/50 ring-1 ring-gray-700' : 'bg-white ring-1 ring-gray-200 shadow-lg'
    }`}>
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="h-6 w-6 text-orange-500" />
        <h2 className={`text-xl font-semibold ${
          isDark ? 'text-white' : 'text-gray-900'
        }`}>
          IPE Weightage for EAMCET
        </h2>
      </div>

      <div className="space-y-8">
        {/* Stream Selector */}
        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-gray-700/50' : 'bg-orange-50'
        }`}>
          <div className="flex gap-4">
            <button
              onClick={() => setStream('MPC')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                stream === 'MPC'
                  ? 'bg-orange-500 text-white'
                  : isDark
                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              MPC
            </button>
            <button
              onClick={() => setStream('BIPC')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                stream === 'BIPC'
                  ? 'bg-orange-500 text-white'
                  : isDark
                  ? 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              BIPC
            </button>
          </div>
        </div>

        {/* Calculator Section */}
        <div className={`p-6 rounded-lg ${
          isDark ? 'bg-gray-700/50' : 'bg-orange-50'
        }`}>
          <h3 className={`text-lg font-medium mb-4 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            IPE Marks Calculator - {stream}
          </h3>

          {stream === 'MPC' ? (
            <>
              {/* First Year Marks */}
              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  First Year Marks (Max 60 each)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Mathematics 1A
                    </label>
                    <input
                      type="number"
                      value={marks.maths1A}
                      onChange={(e) => handleMarkChange('maths1A', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Mathematics 1B
                    </label>
                    <input
                      type="number"
                      value={marks.maths1B}
                      onChange={(e) => handleMarkChange('maths1B', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Physics
                    </label>
                    <input
                      type="number"
                      value={marks.physics1}
                      onChange={(e) => handleMarkChange('physics1', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chemistry
                    </label>
                    <input
                      type="number"
                      value={marks.chemistry1}
                      onChange={(e) => handleMarkChange('chemistry1', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                </div>
              </div>

              {/* Second Year Marks */}
              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Second Year Marks (Max 60 each)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Mathematics 2A
                    </label>
                    <input
                      type="number"
                      value={marks.maths2A}
                      onChange={(e) => handleMarkChange('maths2A', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Mathematics 2B
                    </label>
                    <input
                      type="number"
                      value={marks.maths2B}
                      onChange={(e) => handleMarkChange('maths2B', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Physics
                    </label>
                    <input
                      type="number"
                      value={marks.physics2}
                      onChange={(e) => handleMarkChange('physics2', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chemistry
                    </label>
                    <input
                      type="number"
                      value={marks.chemistry2}
                      onChange={(e) => handleMarkChange('chemistry2', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                </div>
              </div>

              {/* Practical Marks */}
              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Practical Marks (Max 30 each)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Physics Practical
                    </label>
                    <input
                      type="number"
                      value={marks.physicsPractical}
                      onChange={(e) => handleMarkChange('physicsPractical', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="30"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chemistry Practical
                    </label>
                    <input
                      type="number"
                      value={marks.chemistryPractical}
                      onChange={(e) => handleMarkChange('chemistryPractical', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="30"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* First Year Marks */}
              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  First Year Marks (Max 60 each)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Botany
                    </label>
                    <input
                      type="number"
                      value={marks.botany1}
                      onChange={(e) => handleMarkChange('botany1', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Zoology
                    </label>
                    <input
                      type="number"
                      value={marks.zoology1}
                      onChange={(e) => handleMarkChange('zoology1', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Physics
                    </label>
                    <input
                      type="number"
                      value={marks.physics1BIPC}
                      onChange={(e) => handleMarkChange('physics1BIPC', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chemistry
                    </label>
                    <input
                      type="number"
                      value={marks.chemistry1BIPC}
                      onChange={(e) => handleMarkChange('chemistry1BIPC', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                </div>
              </div>

              {/* Second Year Marks */}
              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Second Year Marks (Max 60 each)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Botany
                    </label>
                    <input
                      type="number"
                      value={marks.botany2}
                      onChange={(e) => handleMarkChange('botany2', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Zoology
                    </label>
                    <input
                      type="number"
                      value={marks.zoology2}
                      onChange={(e) => handleMarkChange('zoology2', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Physics
                    </label>
                    <input
                      type="number"
                      value={marks.physics2BIPC}
                      onChange={(e) => handleMarkChange('physics2BIPC', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chemistry
                    </label>
                    <input
                      type="number"
                      value={marks.chemistry2BIPC}
                      onChange={(e) => handleMarkChange('chemistry2BIPC', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="60"
                    />
                  </div>
                </div>
              </div>

              {/* Practical Marks */}
              <div className="mb-6">
                <h4 className={`text-sm font-medium mb-3 ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Practical Marks (Max 30 each)
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Botany Practical
                    </label>
                    <input
                      type="number"
                      value={marks.botanyPractical}
                      onChange={(e) => handleMarkChange('botanyPractical', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="30"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Zoology Practical
                    </label>
                    <input
                      type="number"
                      value={marks.zoologyPractical}
                      onChange={(e) => handleMarkChange('zoologyPractical', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="30"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Physics Practical
                    </label>
                    <input
                      type="number"
                      value={marks.physicsPracticalBIPC}
                      onChange={(e) => handleMarkChange('physicsPracticalBIPC', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="30"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Chemistry Practical
                    </label>
                    <input
                      type="number"
                      value={marks.chemistryPracticalBIPC}
                      onChange={(e) => handleMarkChange('chemistryPracticalBIPC', e.target.value)}
                      className={`mt-1 block w-full rounded-md ${
                        isDark
                          ? 'bg-gray-600 border-gray-500 text-white'
                          : 'border-gray-300 text-gray-900'
                      } shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm`}
                      min="0"
                      max="30"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Results */}
          <div className={`p-4 rounded-lg ${
            isDark ? 'bg-gray-600' : 'bg-white'
          }`}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Total IPE Marks
                </p>
                <p className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {calculateTotalMarks()}/600
                </p>
              </div>
              <div>
                <p className={`text-sm ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Weighted Score (25%)
                </p>
                <p className={`text-xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {calculateWeightedScore().toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Weightage Information */}
        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-gray-700/50' : 'bg-orange-50'
        }`}>
          <p className={`text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            The EAMCET final score is calculated using a combination of IPE (Intermediate Public Examination) marks and EAMCET marks. 
            Here's the detailed weightage for each subject:
          </p>
        </div>

        {/* Weightage Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b ${
                isDark ? 'border-gray-700' : 'border-gray-200'
              }`}>
                <th className={`py-3 px-4 text-left text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject
                </th>
                <th className={`py-3 px-4 text-center text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  IPE Weightage
                </th>
                <th className={`py-3 px-4 text-center text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  EAMCET Weightage
                </th>
                <th className={`py-3 px-4 text-center text-sm font-medium ${
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Total Marks
                </th>
              </tr>
            </thead>
            <tbody>
              {(stream === 'MPC' ? weightageData : bipcWeightageData).map((item) => (
                <tr key={item.subject} className={`border-b ${
                  isDark ? 'border-gray-700' : 'border-gray-200'
                }`}>
                  <td className={`py-3 px-4 text-sm font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.subject}
                  </td>
                  <td className={`py-3 px-4 text-center text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.ipeWeightage}%
                  </td>
                  <td className={`py-3 px-4 text-center text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {item.eamcetWeightage}%
                  </td>
                  <td className={`py-3 px-4 text-center text-sm font-medium ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.totalMarks}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <div className={`p-4 rounded-lg ${
          isDark ? 'bg-gray-700/50' : 'bg-orange-50'
        }`}>
          <h3 className={`text-sm font-medium mb-2 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Important Notes:
          </h3>
          <ul className={`space-y-2 text-sm ${
            isDark ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <li className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
              <span>IPE marks are calculated based on your Intermediate Public Examination results.</span>
            </li>
            <li className="flex items-start gap-2">
              <GraduationCap className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
              <span>EAMCET marks are based on your performance in the entrance examination.</span>
            </li>
            <li className="flex items-start gap-2">
              <Calculator className="h-4 w-4 mt-0.5 text-orange-500 flex-shrink-0" />
              <span>Final score = (IPE marks × 0.25) + (EAMCET marks × 0.75)</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 