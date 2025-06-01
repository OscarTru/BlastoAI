import React, { useState, useEffect } from 'react';
import { ArrowRightIcon, ChevronLeftIcon, CalendarDaysIcon, CheckCircleIconSolid, CircleIconOutline } from '../../constants';

export interface QuestionOption {
  value: string;
  label: string;
  icon?: React.ReactElement;
}

interface FullScreenQuestionLayoutProps {
  question: string;
  questionType: 'radio' | 'date' | 'checkbox' | 'select' | 'text' | 'textarea'; // Added 'textarea'
  options?: QuestionOption[];
  allowMultiple?: boolean;
  currentAnswer: any; 
  onAnswerChange: (value: any) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstQuestion: boolean;
  isLastQuestion: boolean;
  isNextDisabled?: boolean;
  placeholder?: string;
  helperText?: string; // Optional helper text for questions
}

const FullScreenQuestionLayout: React.FC<FullScreenQuestionLayoutProps> = ({
  question,
  questionType,
  options = [],
  allowMultiple = false,
  currentAnswer,
  onAnswerChange,
  onNext,
  onBack,
  isFirstQuestion,
  isLastQuestion,
  isNextDisabled = false,
  placeholder,
  helperText,
}) => {
  
  const [dateValue, setDateValue] = useState<string>('');

  useEffect(() => {
    if (questionType === 'date' && typeof currentAnswer === 'string') {
      setDateValue(currentAnswer);
    }
  }, [currentAnswer, questionType]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateValue(e.target.value);
    onAnswerChange(e.target.value); 
  };
  
  const handleCheckboxChange = (optionValue: string) => {
    const currentSelected = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
    const index = currentSelected.indexOf(optionValue);
    if (index > -1) {
      currentSelected.splice(index, 1);
    } else {
      currentSelected.push(optionValue);
    }
    onAnswerChange(currentSelected);
  };


  const renderInput = () => {
    switch (questionType) {
      case 'radio':
      case 'select': // Visually similar to radio for now, can be distinct later
        return (
          <div className="space-y-3 w-full">
            {options.map(option => (
              <button
                key={option.value}
                onClick={() => onAnswerChange(option.value)}
                className={`w-full flex items-center text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out
                  ${currentAnswer === option.value 
                    ? 'bg-primary/10 border-primary dark:bg-primary/20 dark:border-primary ring-2 ring-primary shadow-md-soft' 
                    : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/70 hover:bg-primary/5 dark:hover:bg-primary/10'}`}
              >
                {currentAnswer === option.value 
                  ? <CheckCircleIconSolid className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                  : <CircleIconOutline className="w-6 h-6 mr-3 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0" />
                }
                <span className="text-md font-medium text-text-primary-light dark:text-text-primary-dark">{option.label}</span>
              </button>
            ))}
          </div>
        );
      case 'checkbox':
         return (
          <div className="space-y-3 w-full">
            {options.map(option => {
              const isSelected = Array.isArray(currentAnswer) && currentAnswer.includes(option.value);
              return (
                <button
                  key={option.value}
                  onClick={() => handleCheckboxChange(option.value)}
                  className={`w-full flex items-center text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out
                    ${isSelected
                      ? 'bg-primary/10 border-primary dark:bg-primary/20 dark:border-primary ring-2 ring-primary shadow-md-soft' 
                      : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/70 hover:bg-primary/5 dark:hover:bg-primary/10'}`}
                >
                  {isSelected 
                    ? <CheckCircleIconSolid className="w-6 h-6 mr-3 text-primary flex-shrink-0" />
                    : <CircleIconOutline className="w-6 h-6 mr-3 text-text-secondary-light dark:text-text-secondary-dark flex-shrink-0" />
                  }
                  <span className="text-md font-medium text-text-primary-light dark:text-text-primary-dark">{option.label}</span>
                </button>
              );
            })}
          </div>
        );
      case 'date':
        return (
          <div className="relative w-full max-w-sm">
            <CalendarDaysIcon className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="date"
              value={dateValue}
              onChange={handleDateChange}
              placeholder={placeholder}
              className="w-full pl-10 pr-3 py-3 bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark rounded-lg text-md text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            />
          </div>
        );
      case 'text':
        return (
          <div className="w-full max-w-sm">
            <input
              type="text"
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder={placeholder || "Escribe tu respuesta..."}
              className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark rounded-lg text-md text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none"
              aria-label={question}
            />
          </div>
        );
      case 'textarea':
        return (
          <div className="w-full max-w-sm">
            <textarea
              value={typeof currentAnswer === 'string' ? currentAnswer : ''}
              onChange={(e) => onAnswerChange(e.target.value)}
              placeholder={placeholder || "Escribe tu respuesta detallada aquí..."}
              className="w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border-2 border-border-light dark:border-border-dark rounded-lg text-md text-text-primary-light dark:text-text-primary-dark focus:ring-2 focus:ring-primary focus:border-primary outline-none min-h-[100px] resize-y"
              aria-label={question}
              rows={4}
            />
          </div>
        );
      default:
        return <p>Tipo de pregunta no soportado: {questionType}</p>;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] sm:min-h-[calc(100vh-200px)] w-full p-4 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6 leading-tight font-poppins">
        {question}
      </h2>
      {helperText && (
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-md">{helperText}</p>
      )}
      
      <div className="w-full max-w-md mb-10 sm:mb-16 flex justify-center">
        {renderInput()}
      </div>

      <div className="flex w-full max-w-md justify-between items-center mt-auto pt-4">
        <button
          onClick={onBack}
          disabled={isFirstQuestion}
          className="flex items-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-md font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg hover:bg-primary/10 dark:hover:bg-primary/20"
          aria-label="Pregunta anterior"
        >
          <ChevronLeftIcon className="w-5 h-5 mr-1.5 sm:mr-2" />
          Volver
        </button>
        <button
          onClick={onNext}
          disabled={isNextDisabled}
          className="flex items-center px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-md font-medium text-white bg-primary hover:bg-primary-dark disabled:opacity-60 disabled:cursor-not-allowed transition-colors rounded-lg shadow-soft hover:shadow-md-soft"
          aria-label={isLastQuestion ? "Finalizar y generar plan" : "Siguiente pregunta"}
        >
          {isLastQuestion ? 'Finalizar' : 'Siguiente'}
          <ArrowRightIcon className="w-5 h-5 ml-1.5 sm:ml-2" />
        </button>
      </div>
    </div>
  );
};

export default FullScreenQuestionLayout;