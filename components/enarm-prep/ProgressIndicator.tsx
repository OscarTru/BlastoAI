
import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ currentStep, totalSteps }) => {
  const percentage = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

  return (
    <div className="w-full max-w-md fixed top-0 left-1/2 -translate-x-1/2 px-4 pt-4 z-40">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs font-medium text-primary dark:text-primary-dark">
          Paso {currentStep} de {totalSteps}
        </span>
         <span className="text-xs font-medium text-primary dark:text-primary-dark">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-primary h-full rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          role="progressbar"
          aria-label={`Progreso: ${Math.round(percentage)}% completado`}
        ></div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
