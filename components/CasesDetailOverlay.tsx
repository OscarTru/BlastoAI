
import React, { useState, useEffect } from 'react';
import { XMarkIcon, ArrowTrendingUpIcon, BriefcaseIcon } from '../constants'; // BriefcaseIcon is MedicalBagIcon

type Period = '28d' | '3m' | '6m' | '1y';

interface CasesDetailOverlayProps {
  onClose: () => void;
}

const CasesDetailOverlay: React.FC<CasesDetailOverlayProps> = ({ onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>('28d');
  const [internalVisible, setInternalVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setInternalVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setInternalVisible(false);
    setTimeout(onClose, 300); 
  };

  const periodLabels: Record<Period, string> = {
    '28d': 'Últimos 28 días',
    '3m': 'Últimos 3 Meses',
    '6m': 'Últimos 6 Meses',
    '1y': 'Último Año',
  };

  const mockTrends = {
    totalSolved: 32,
    newThisWeek: 2,
    avgTimePerCase: "25 min", 
    strongestSpecialty: "Pediatría",
  };

  return (
    <div 
      className={`
        absolute inset-x-0 top-0 z-20 bg-surface-light dark:bg-surface-dark p-5 sm:p-6 
        rounded-2xl shadow-xl border border-border-light dark:border-border-dark
        transition-all duration-300 ease-out transform
        ${internalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}
      `}
      aria-modal="true"
      role="dialog"
      aria-labelledby="cases-detail-title"
    >
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <div className="flex items-center space-x-3">
          <BriefcaseIcon className="w-7 h-7 text-green-500 dark:text-green-400" />
          <h2 id="cases-detail-title" className="text-xl sm:text-2xl font-semibold text-text-primary-light dark:text-text-primary-dark">
            Detalle de Casos Clínicos
          </h2>
        </div>
        <button
          onClick={handleClose}
          className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 text-text-secondary-light dark:text-text-secondary-dark transition-colors"
          aria-label="Cerrar detalle de casos clínicos"
        >
          <XMarkIcon className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-md sm:text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-3 flex items-center">
          <ArrowTrendingUpIcon className="w-5 h-5 mr-2 text-green-500" />
          Tendencias (Últimos 28 Días)
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 text-sm">
          <div className="bg-bg-light dark:bg-bg-dark p-3 rounded-lg">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Total Resueltos</p>
            <p className="font-bold text-lg text-green-500 dark:text-green-400">{mockTrends.totalSolved}</p>
          </div>
          <div className="bg-bg-light dark:bg-bg-dark p-3 rounded-lg">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Nuevos (Semana)</p>
            <p className="font-bold text-lg text-green-500">+{mockTrends.newThisWeek}</p>
          </div>
          <div className="bg-bg-light dark:bg-bg-dark p-3 rounded-lg">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Tiempo Prom./Caso</p>
            <p className="font-bold text-lg text-green-500 dark:text-green-400">{mockTrends.avgTimePerCase}</p>
          </div>
          <div className="bg-bg-light dark:bg-bg-dark p-3 rounded-lg">
            <p className="text-text-secondary-light dark:text-text-secondary-dark">Especialidad Fuerte</p>
            <p className="font-bold text-lg text-green-500 dark:text-green-400">{mockTrends.strongestSpecialty}</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-md sm:text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">
          Gráfico de Progreso Dinámico
        </h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {(Object.keys(periodLabels) as Period[]).map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors
                ${selectedPeriod === period 
                  ? 'bg-green-500 text-white shadow-sm' 
                  : 'bg-bg-light dark:bg-bg-dark hover:bg-green-500/10 dark:hover:bg-green-400/20 text-text-secondary-light dark:text-text-secondary-dark'
                }`}
            >
              {periodLabels[period]}
            </button>
          ))}
        </div>
        <div className="h-56 sm:h-64 bg-bg-light dark:bg-bg-dark rounded-lg flex items-center justify-center border border-dashed border-border-light dark:border-border-dark">
          <p className="text-text-secondary-light dark:text-text-secondary-dark p-4 text-center">
            [Placeholder para Gráfico de Casos Clínicos: {periodLabels[selectedPeriod]}]
            <br />
            <span className="text-xs">(Implementación de gráfico pendiente)</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CasesDetailOverlay;
