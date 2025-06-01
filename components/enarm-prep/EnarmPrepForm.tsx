
import React, { useState, useEffect } from 'react';
import FullScreenQuestionLayout, { QuestionOption } from './FullScreenQuestionLayout';
import ProgressIndicator from './ProgressIndicator';

export interface FormAnswers {
  yearInCareer: string;
  enarmDate: string; // ISO string or formatted date string
  studyTime: string;
  difficultAreas: string[];
  presentedBefore: string; // 'Sí' or 'No'
  hasSimulators: string; // 'Sí', 'No', or 'Estoy usando Blasto AI'
}

interface EnarmPrepFormProps {
  onFormComplete: (answers: FormAnswers) => void;
  initialAnswers: Partial<FormAnswers>;
}

type QuestionType = 'radio' | 'date' | 'checkbox' | 'select'; // 'select' can be like radio but with different UI

interface FormQuestion {
  id: keyof FormAnswers;
  title: string;
  type: QuestionType;
  options?: QuestionOption[];
  placeholder?: string;
  allowMultiple?: boolean; // For checkbox type
}

const questions: FormQuestion[] = [
  {
    id: 'yearInCareer',
    title: '¿En qué año de la carrera estás o terminaste?',
    type: 'radio',
    options: [
      { value: '5to', label: '5° Año' },
      { value: '6to', label: '6° Año' },
      { value: 'Internado', label: 'Internado Médico' },
      { value: 'Egresado', label: 'Egresado (más de 1 año)' },
      { value: 'Recien Egresado', label: 'Recién Egresado (menos de 1 año)' },
    ],
  },
  {
    id: 'enarmDate',
    title: '¿Cuándo planeas presentar el ENARM?',
    type: 'date',
    placeholder: 'Selecciona una fecha',
  },
  {
    id: 'studyTime',
    title: '¿Cuánto tiempo puedes estudiar a la semana?',
    type: 'radio',
    options: [
      { value: '5h', label: '5 horas' },
      { value: '10h', label: '10 horas' },
      { value: '15h', label: '15 horas' },
      { value: '20h+', label: '20 horas o más' },
    ],
  },
   {
    id: 'difficultAreas',
    title: '¿Qué áreas consideras más difíciles para ti?',
    type: 'checkbox',
    allowMultiple: true,
    options: [
      { value: 'Ginecología y Obstetricia', label: 'Ginecología y Obstetricia' },
      { value: 'Pediatría', label: 'Pediatría' },
      { value: 'Medicina Interna', label: 'Medicina Interna' },
      { value: 'Cirugía General', label: 'Cirugía General' },
      { value: 'Salud Pública', label: 'Salud Pública y Epidemiología'},
      { value: 'Urgencias', label: 'Urgencias Médico-Quirúrgicas'},
    ],
  },
  {
    id: 'presentedBefore',
    title: '¿Has presentado el ENARM antes?',
    type: 'radio',
    options: [
      { value: 'Sí', label: 'Sí' },
      { value: 'No', label: 'No' },
    ],
  },
  {
    id: 'hasSimulators',
    title: '¿Tienes acceso a casos clínicos o simuladores?',
    type: 'radio',
    options: [
      { value: 'Sí', label: 'Sí, tengo acceso' },
      { value: 'No', label: 'No, no tengo acceso' },
      { value: 'BlastoAI', label: 'Estoy usando Blasto AI' },
    ],
  },
];

const EnarmPrepForm: React.FC<EnarmPrepFormProps> = ({ onFormComplete, initialAnswers }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Partial<FormAnswers>>(initialAnswers);
  const [animationClass, setAnimationClass] = useState('animate-fade-in-up'); // Initial animation

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
      }, 300); // Duration of slideOutLeft
    } else {
      onFormComplete(answers as FormAnswers); // Assume all required answers are filled
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setAnimationClass('animate-[slideOutRight_0.3s_ease-out_forwards]');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setAnimationClass('animate-[slideInLeft_0.3s_ease-out_forwards]');
      }, 300); // Duration of slideOutRight
    }
  };
  
  // Add keyframes for slideIn/Out animations to tailwind.config in index.html if not present
  // This is a workaround as dynamic keyframes are not directly supported in a .tsx file easily
  // For now, using simple fade. For slide, update index.html's tailwind config.
  useEffect(() => {
    // Add keyframes to style tag, this is a bit hacky for a component
    const styleId = 'enarm-prep-animations';
    if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
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
  const isNextDisabled = currentAnswer === undefined || (Array.isArray(currentAnswer) && currentAnswer.length === 0);


  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <ProgressIndicator currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
      <div className={`w-full max-w-2xl ${animationClass}`}>
        <FullScreenQuestionLayout
          key={currentQuestion.id} // Ensures component re-renders with new question
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

export default EnarmPrepForm;
