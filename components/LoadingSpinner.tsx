
import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; // Tailwind color class e.g. text-med-primary
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  color, // Allow color override
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-6 h-6 border-[3px]', // Slightly adjusted default md size
    lg: 'w-10 h-10 border-4',  // Slightly adjusted default lg size
  };

  // Default color classes for light and dark themes
  const defaultColorClasses = 'text-med-primary dark:text-med-secondary';
  const finalColorClass = color || defaultColorClasses;

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-solid border-t-transparent ${sizeClasses[size]} ${finalColorClass}`}
        style={{ borderTopColor: 'transparent' }} // Ensure this part is transparent for the spin effect
        role="status"
        aria-live="polite"
        aria-label="Cargando"
      ></div>
    </div>
  );
};

export default LoadingSpinner;
