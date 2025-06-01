
import React, { useState, useEffect } from 'react';
import FullScreenQuestionLayout, { QuestionOption } from '../enarm-prep/FullScreenQuestionLayout'; // Reusing layout
import ProgressIndicator from '../enarm-prep/ProgressIndicator'; // Reusing progress indicator
import { ExamType } from '../../types';

export interface UsmleFormAnswers {
  usmleStep: ExamType; // 'USMLE Step 1', 'USMLE Step 2 CK', 'USMLE Step 3'
  medicalSchoolType: 'USMG' | 'IMG';
  targetScore?: string; // Optional
  studyDurationMonths: string;
  preferredResources: string[];
  weakestSubjects: string[];
  studyTimePerWeek: string;
  presentedUsmleBefore: string; // 'Sí' or 'No' for the specific step
}

interface UsmlePrepFormProps {
  onFormComplete: (answers: UsmleFormAnswers) => void;
  initialAnswers: Partial<UsmleFormAnswers>;
}

type QuestionUIType = 'radio' | 'checkbox' | 'select' | 'text'; // Renamed to avoid conflict if needed

interface FormQuestion {
  id: keyof UsmleFormAnswers;
  title: string;
  type: QuestionUIType; // Use the renamed type
  options?: QuestionOption[];
  placeholder?: string;
  allowMultiple?: boolean;
  isOptional?: boolean; // Added to mark optional questions
}

const questions: FormQuestion[] = [
  {
    id: 'usmleStep',
    title: 'Which USMLE Step are you preparing for?',
    type: 'radio',
    options: [
      { value: 'USMLE Step 1', label: 'USMLE Step 1' },
      { value: 'USMLE Step 2 CK', label: 'USMLE Step 2 CK' },
      { value: 'USMLE Step 3', label: 'USMLE Step 3' },
    ],
  },
  {
    id: 'medicalSchoolType',
    title: 'Are you a US Medical Graduate (USMG) or an International Medical Graduate (IMG)?',
    type: 'radio',
    options: [
      { value: 'USMG', label: 'USMG' },
      { value: 'IMG', label: 'IMG' },
    ],
  },
  {
    id: 'studyDurationMonths',
    title: 'How many months do you have until your planned exam date?',
    type: 'radio',
    options: [
        { value: '1-3 months', label: '1-3 Months' },
        { value: '4-6 months', label: '4-6 Months' },
        { value: '7-9 months', label: '7-9 Months' },
        { value: '10-12 months', label: '10-12 Months' },
        { value: '12+ months', label: 'More than 12 Months' },
    ]
  },
  {
    id: 'targetScore',
    title: 'What is your target score range (optional)?',
    type: 'text', 
    placeholder: 'e.g., 240-250 or Pass',
    isOptional: true,
  },
  {
    id: 'studyTimePerWeek',
    title: 'How much time can you dedicate to studying per week?',
    type: 'radio',
    options: [
      { value: '10-15 hours', label: '10-15 hours' },
      { value: '15-20 hours', label: '15-20 hours' },
      { value: '20-30 hours', label: '20-30 hours' },
      { value: '30+ hours', label: '30+ hours' },
    ],
  },
  {
    id: 'preferredResources',
    title: 'Which resources are you currently using or plan to use? (Select all that apply)',
    type: 'checkbox',
    allowMultiple: true,
    options: [
      { value: 'UWorld', label: 'UWorld QBank' },
      { value: 'First Aid', label: 'First Aid for the USMLE' },
      { value: 'Pathoma', label: 'Pathoma' },
      { value: 'SketchyMedical', label: 'SketchyMedical (Micro/Pharm/Path)' },
      { value: 'NBME CBSSAs', label: 'NBME Self-Assessments (CBSSAs)' },
      { value: 'Amboss', label: 'Amboss QBank/Library' },
      { value: 'Boards and Beyond', label: 'Boards and Beyond' },
      { value: 'Anki', label: 'Anki Flashcards' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    id: 'weakestSubjects',
    title: 'What are your weakest subjects/systems? (Select up to 3-4)',
    type: 'checkbox',
    allowMultiple: true,
    options: [ 
      { value: 'Biochemistry', label: 'Biochemistry & Molecular Biology' },
      { value: 'Physiology', label: 'Physiology' },
      { value: 'Pathology', label: 'Pathology' },
      { value: 'Pharmacology', label: 'Pharmacology' },
      { value: 'Microbiology', label: 'Microbiology & Immunology' },
      { value: 'Behavioral Science', label: 'Behavioral Science & Ethics' },
      { value: 'Cardiovascular System', label: 'Cardiovascular System' },
      { value: 'Respiratory System', label: 'Respiratory System' },
      { value: 'Renal System', label: 'Renal System' },
      { value: 'Gastrointestinal System', label: 'Gastrointestinal System' },
      { value: 'Musculoskeletal System', label: 'Musculoskeletal System' },
      { value: 'Nervous System', label: 'Nervous System & Psychiatry' },
      { value: 'Reproductive System', label: 'Reproductive & Endocrine Systems' },
    ],
  },
  {
    id: 'presentedUsmleBefore',
    title: 'Have you taken this specific USMLE Step before?',
    type: 'radio',
    options: [
      { value: 'Sí', label: 'Yes' },
      { value: 'No', label: 'No' },
    ],
  },
];

const UsmlePrepForm: React.FC<UsmlePrepFormProps> = ({ onFormComplete, initialAnswers }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<UsmleFormAnswers>>(initialAnswers);
  const [animationClass, setAnimationClass] = useState('animate-fade-in-up');

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerChange = (value: string | string[]) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }));
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimationClass('animate-[slideOutLeft_0.3s_ease-out_forwards]');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnimationClass('animate-[slideInRight_0.3s_ease-out_forwards]');
      }, 300);
    } else {
      onFormComplete(answers as UsmleFormAnswers);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setAnimationClass('animate-[slideOutRight_0.3s_ease-out_forwards]');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setAnimationClass('animate-[slideInLeft_0.3s_ease-out_forwards]');
      }, 300);
    }
  };

  useEffect(() => {
    const styleId = 'usmle-prep-animations'; // Unique ID
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        // Ensure animations are defined if not already in index.html or global scope
        style.innerHTML = `
            @keyframes slideInRight { 0% { transform: translateX(100%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
            @keyframes slideOutLeft { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(-100%); opacity: 0; } }
            @keyframes slideInLeft { 0% { transform: translateX(-100%); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
            @keyframes slideOutRight { 0% { transform: translateX(0); opacity: 1; } 100% { transform: translateX(100%); opacity: 0; } }
        `;
        document.head.appendChild(style);
    }
  }, []);

  const currentAnswer = answers[currentQuestion.id];
  const isNextDisabled = !currentQuestion.isOptional && (
    currentAnswer === undefined ||
    (Array.isArray(currentAnswer) && currentAnswer.length === 0) ||
    (typeof currentAnswer === 'string' && currentAnswer.trim() === '' && currentQuestion.type !== 'text') // Empty string is invalid for non-optional non-text
  );


  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <ProgressIndicator currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
      <div className={`w-full max-w-2xl ${animationClass}`}>
        <FullScreenQuestionLayout
          key={currentQuestion.id}
          question={currentQuestion.title}
          questionType={currentQuestion.type}
          options={currentQuestion.options}
          allowMultiple={currentQuestion.allowMultiple}
          currentAnswer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          onNext={nextQuestion}
          onBack={prevQuestion}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          isNextDisabled={isNextDisabled}
          placeholder={currentQuestion.placeholder}
        />
      </div>
    </div>
  );
};

export default UsmlePrepForm;
