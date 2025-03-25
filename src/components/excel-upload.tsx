import { useState } from 'react';
import * as XLSX from 'xlsx';
import { Button } from './ui/button';

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ExcelUploadProps {
  onQuestionsImported: (questions: Question[]) => void;
}

export function ExcelUpload({ onQuestionsImported }: ExcelUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Assume the first sheet contains the questions
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // Convert to JSON with header row
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        if (jsonData.length < 2) {
          throw new Error('Excel file must contain at least a header row and one data row.');
        }

        // Get the header row and normalize column names
        const headerRow = jsonData[0] as string[];
        const normalizedHeaders = headerRow.map(header =>
          String(header).trim().toLowerCase().replace(/\s+/g, '')
        );

        // Find the column indices
        const questionIndex = normalizedHeaders.findIndex(h =>
          h === 'question' || h === 'questiontext' || h === 'questions'
        );
        const option1Index = normalizedHeaders.findIndex(h =>
          h === 'option1' || h === 'option 1' || h === 'a' || h === 'optiona'
        );
        const option2Index = normalizedHeaders.findIndex(h =>
          h === 'option2' || h === 'option 2' || h === 'b' || h === 'optionb'
        );
        const option3Index = normalizedHeaders.findIndex(h =>
          h === 'option3' || h === 'option 3' || h === 'c' || h === 'optionc'
        );
        const option4Index = normalizedHeaders.findIndex(h =>
          h === 'option4' || h === 'option 4' || h === 'd' || h === 'optiond'
        );
        const answerIndex = normalizedHeaders.findIndex(h =>
          h === 'answer' || h === 'correctanswer' || h === 'correct' || h === 'correctoption'
        );

        // Validate column indices
        if (questionIndex === -1) {
          throw new Error('Could not find a question column. Please include a column named "Question" or similar.');
        }
        if (option1Index === -1 || option2Index === -1 || option3Index === -1 || option4Index === -1) {
          throw new Error('Could not find all option columns. Please include columns for options 1-4 (can be named Option1, A, OptionA, etc.).');
        }
        if (answerIndex === -1) {
          throw new Error('Could not find an answer column. Please include a column named "Answer", "CorrectAnswer", etc.');
        }

        // Process data rows
        const questions: Question[] = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i] as any[];

          // Skip empty rows
          if (!row || row.length === 0 || !row[questionIndex]) {
            continue;
          }

          const question = String(row[questionIndex] || '').trim();
          const option1 = String(row[option1Index] || '').trim();
          const option2 = String(row[option2Index] || '').trim();
          const option3 = String(row[option3Index] || '').trim();
          const option4 = String(row[option4Index] || '').trim();
          const answerValue = String(row[answerIndex] || '').trim();

          // Validate required fields
          if (!question || !option1 || !option2 || !option3 || !option4 || !answerValue) {
            throw new Error(`Row ${i + 1} is missing required fields. Please ensure all cells have values.`);
          }

          // Determine the correct answer index (0-based)
          let correctAnswerIndex: number;
          const lowerAnswer = answerValue.toLowerCase();

          if (
            lowerAnswer === '1' ||
            lowerAnswer === 'a' ||
            lowerAnswer === 'option1' ||
            lowerAnswer === 'option a' ||
            lowerAnswer === 'optiona' ||
            lowerAnswer === option1.toLowerCase()
          ) {
            correctAnswerIndex = 0;
          } else if (
            lowerAnswer === '2' ||
            lowerAnswer === 'b' ||
            lowerAnswer === 'option2' ||
            lowerAnswer === 'option b' ||
            lowerAnswer === 'optionb' ||
            lowerAnswer === option2.toLowerCase()
          ) {
            correctAnswerIndex = 1;
          } else if (
            lowerAnswer === '3' ||
            lowerAnswer === 'c' ||
            lowerAnswer === 'option3' ||
            lowerAnswer === 'option c' ||
            lowerAnswer === 'optionc' ||
            lowerAnswer === option3.toLowerCase()
          ) {
            correctAnswerIndex = 2;
          } else if (
            lowerAnswer === '4' ||
            lowerAnswer === 'd' ||
            lowerAnswer === 'option4' ||
            lowerAnswer === 'option d' ||
            lowerAnswer === 'optiond' ||
            lowerAnswer === option4.toLowerCase()
          ) {
            correctAnswerIndex = 3;
          } else {
            throw new Error(`Row ${i + 1} has an invalid answer value: "${answerValue}". Answer must be 1-4, A-D, option1-option4, or match one of the option values.`);
          }

          questions.push({
            id: `imported-${Date.now()}-${i}`,
            text: question,
            options: [option1, option2, option3, option4],
            correctAnswer: correctAnswerIndex
          });
        }

        onQuestionsImported(questions);
        setIsLoading(false);

        // Reset the file input
        e.target.value = '';

      } catch (err: any) {
        console.error('Error processing Excel file:', err);
        setError(err.message || 'Failed to process the Excel file. Please check the format.');
        setIsLoading(false);

        // Reset the file input
        e.target.value = '';
      }
    };

    reader.onerror = () => {
      setError('Failed to read the file. Please try again.');
      setIsLoading(false);

      // Reset the file input
      e.target.value = '';
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Import Questions from Excel
        </label>

        <div className="flex items-center gap-2">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={isLoading}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100"
          />

          {isLoading && (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-violet-600"></div>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-1">{error}</div>
        )}

        <div className="text-sm text-gray-500 mt-1">
          <p>Excel file must have these columns:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Question</strong> (or QuestionText, Questions)</li>
            <li><strong>Option1</strong> (or Option 1, A, OptionA)</li>
            <li><strong>Option2</strong> (or Option 2, B, OptionB)</li>
            <li><strong>Option3</strong> (or Option 3, C, OptionC)</li>
            <li><strong>Option4</strong> (or Option 4, D, OptionD)</li>
            <li><strong>Answer</strong> (or CorrectAnswer, Correct, CorrectOption)</li>
          </ul>
          <p className="mt-2">The "answer" column can contain:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Numbers (1-4)</li>
            <li>Letters (A-D)</li>
            <li>Option labels (Option1, OptionA, etc.)</li>
            <li>The exact text of the correct option</li>
          </ul>
        </div>

        <div className="mt-2">
          <Button
            type="button"
            onClick={() => {
              // Create a sample Excel file for download
              const worksheet = XLSX.utils.json_to_sheet([
                {
                  Question: 'What is 2+2?',
                  'Option A': '3',
                  'Option B': '4',
                  'Option C': '5',
                  'Option D': '6',
                  'Correct Answer': 'B' // Correct answer is option B (4)
                },
                {
                  Question: 'Which planet is closest to the sun?',
                  'Option A': 'Earth',
                  'Option B': 'Venus',
                  'Option C': 'Mercury',
                  'Option D': 'Mars',
                  'Correct Answer': 'C' // Correct answer is option C (Mercury)
                },
                {
                  Question: 'What is the capital of France?',
                  'Option A': 'London',
                  'Option B': 'Berlin',
                  'Option C': 'Madrid',
                  'Option D': 'Paris',
                  'Correct Answer': 'Paris' // Correct answer is option D (Paris)
                }
              ]);

              const workbook = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(workbook, worksheet, 'Questions');

              // Generate and download the file
              XLSX.writeFile(workbook, 'cetstrom_questions_template.xlsx');
            }}
            variant="outline"
            size="sm"
          >
            Download Sample Template
          </Button>
        </div>
      </div>
    </div>
  );
}
