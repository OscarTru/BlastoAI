
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  ChartBarIcon, 
  SparklesIcon, 
  BriefcaseIcon, 
  DocumentDuplicateIcon, 
  UserCircleIcon,
  AcademicCapIcon, 
  ROUTES
} from '../constants'; 
import TopicsDetailOverlay from './TopicsDetailOverlay';
import CasesDetailOverlay from './CasesDetailOverlay';
import HoursDetailOverlay from './HoursDetailOverlay';
import ProgressDetailOverlay from './ProgressDetailOverlay';

interface DashboardPageProps {
  openChatWithContext: (context: string) => void;
}

interface MetricWidgetProps {
  title: string;
  value: string;
  icon: React.ReactElement<{ className?: string }>; 
  change?: string;
  changeType?: 'positive' | 'negative';
  bgColorClass?: string;
  iconColorClass?: string;
  onClick?: () => void;
  ariaLabel?: string;
}

const MetricWidget: React.FC<MetricWidgetProps> = ({ 
  title, 
  value, 
  icon, 
  change, 
  changeType, 
  bgColorClass = "bg-primary/10 dark:bg-primary/20", 
  iconColorClass = "text-primary dark:text-primary",
  onClick,
  ariaLabel
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={!onClick}
    className={`bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-soft border border-border-light dark:border-border-dark flex items-start space-x-4 text-left w-full transition-all duration-200 ease-in-out 
                ${onClick ? 'hover:shadow-md-soft hover:ring-2 hover:ring-primary/30 dark:hover:ring-primary/50 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-primary/70 cursor-pointer' 
                          : 'cursor-default'}`}
    aria-label={ariaLabel || (onClick ? `Ver más detalles sobre ${title}` : title)}
  >
    <div className={`p-3 rounded-lg ${bgColorClass} shrink-0`}>
      {React.cloneElement<{ className?: string }>(icon, { className: `w-6 h-6 ${iconColorClass}` })}
    </div>
    <div>
      <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{title}</p>
      <p className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark mt-1">{value}</p>
      {change && (
        <p className={`text-xs mt-1 ${changeType === 'positive' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </p>
      )}
    </div>
  </button>
);

interface ExamPrepButtonProps {
  examName: string;
  onClick: () => void;
  icon?: React.ReactElement<{ className?: string }>;
  isProminent?: boolean;
}

const ExamPrepButton: React.FC<ExamPrepButtonProps> = ({ examName, onClick, icon, isProminent = false }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center p-4 font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md-soft focus:scale-105 focus:shadow-md-soft focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-center space-y-2
      ${isProminent 
        ? 'bg-primary hover:bg-primary-dark text-white col-span-1 sm:col-span-2 md:col-span-4 py-5 text-base' // Full width on small, spans on larger
        : 'bg-primary/10 hover:bg-primary/20 dark:bg-surface-dark dark:hover:bg-gray-700 text-primary dark:text-primary'
      }`}
  >
    {icon ? React.cloneElement<{ className?: string }>(icon, { className: `w-7 h-7 mb-1 ${isProminent ? 'text-white' : 'opacity-80'}` }) : <AcademicCapIcon className={`w-7 h-7 mb-1 ${isProminent ? 'text-white' : 'opacity-70'}`} />}
    <span>{examName}</span>
  </button>
);

type OverlayType = 'topics' | 'cases' | 'hours' | 'progress' | null;

const DashboardPage: React.FC<DashboardPageProps> = ({ openChatWithContext }) => {
  const [activeOverlay, setActiveOverlay] = useState<OverlayType>(null);
  const navigate = useNavigate(); 

  const openOverlay = (type: OverlayType) => {
    setActiveOverlay(type);
  };

  const closeOverlay = () => {
    setActiveOverlay(null);
  };

  const metricsData = {
    topics: { title: "Temas Revisados", value: "78", icon: <DocumentDuplicateIcon />, change: "+5 esta semana", changeType: "positive" as const, type: 'topics' as OverlayType},
    cases: { title: "Casos Clínicos Resueltos", value: "32", icon: <BriefcaseIcon />, change: "+2 esta semana", changeType: "positive" as const, type: 'cases' as OverlayType, bgColor: "bg-green-500/10 dark:bg-green-400/20", iconColor: "text-green-500 dark:text-green-400" },
    hours: { title: "Horas de Estudio", value: "120h", icon: <UserCircleIcon />, change: "+10h este mes", changeType: "positive" as const, type: 'hours' as OverlayType, bgColor: "bg-purple-500/10 dark:bg-purple-400/20", iconColor: "text-purple-500 dark:text-purple-400" },
    progress: { title: "Progreso General", value: "65%", icon: <ChartBarIcon />, type: 'progress' as OverlayType, bgColor: "bg-orange-500/10 dark:bg-orange-400/20", iconColor: "text-orange-500 dark:text-orange-400" }
  };
  
  const exams = [
    { name: "ENARM_XP", actionType: 'navigate' as const, path: ROUTES.ENARM_PREP_XP, promptText: "Crear Plan ENARM Personalizado", icon: <AcademicCapIcon /> }, 
    { name: "MIR_XP", actionType: 'navigate' as const, path: ROUTES.MIR_PREP_XP, promptText: "Crear Plan MIR Personalizado", icon: <AcademicCapIcon /> },
    { name: "USMLE_XP", actionType: 'navigate' as const, path: ROUTES.USMLE_PREP_XP, promptText: "Crear Plan USMLE Personalizado", icon: <AcademicCapIcon /> }, 
    { name: "PLAB_XP", actionType: 'navigate' as const, path: ROUTES.PLAB_PREP_XP, promptText: "Crear Plan PLAB Personalizado", icon: <AcademicCapIcon /> }
  ];

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Dashboard de Aprendizaje</h1>
          <p className="text-md text-text-secondary-light dark:text-text-secondary-dark mt-1">Bienvenido de nuevo, Dr. Alex.</p>
        </div>
        <button
          onClick={() => openChatWithContext("Ayúdame a planificar mi estudio para hoy.")}
          className="px-4 py-2 bg-accent hover:bg-accent-dark text-white dark:text-gray-900 font-semibold rounded-lg shadow-soft hover:shadow-md-soft transition-all duration-200 flex items-center space-x-2 text-sm"
        >
          <SparklesIcon className="w-4 h-4" />
          <span>Planificar Estudio</span>
        </button>
      </div>

      <div className="relative">
        <div 
          className={`
            grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 
            transition-all duration-300 ease-in-out
            ${activeOverlay ? 'opacity-0 scale-95 blur-sm pointer-events-none' : 'opacity-100 scale-100 blur-0'}
          `}
        >
          <MetricWidget 
            title={metricsData.topics.title} value={metricsData.topics.value} icon={metricsData.topics.icon} 
            change={metricsData.topics.change} changeType={metricsData.topics.changeType}
            onClick={() => openOverlay(metricsData.topics.type)}
            ariaLabel={`Ver detalle de ${metricsData.topics.title.toLowerCase()}`}
          />
          <MetricWidget 
            title={metricsData.cases.title} value={metricsData.cases.value} icon={metricsData.cases.icon} 
            change={metricsData.cases.change} changeType={metricsData.cases.changeType}
            bgColorClass={metricsData.cases.bgColor} iconColorClass={metricsData.cases.iconColor}
            onClick={() => openOverlay(metricsData.cases.type)}
            ariaLabel={`Ver detalle de ${metricsData.cases.title.toLowerCase()}`}
          />
          <MetricWidget 
            title={metricsData.hours.title} value={metricsData.hours.value} icon={metricsData.hours.icon} 
            change={metricsData.hours.change} changeType={metricsData.hours.changeType}
            bgColorClass={metricsData.hours.bgColor} iconColorClass={metricsData.hours.iconColor}
            onClick={() => openOverlay(metricsData.hours.type)}
            ariaLabel={`Ver detalle de ${metricsData.hours.title.toLowerCase()}`}
          />
           <MetricWidget 
            title={metricsData.progress.title} value={metricsData.progress.value} icon={metricsData.progress.icon} 
            bgColorClass={metricsData.progress.bgColor} iconColorClass={metricsData.progress.iconColor}
            onClick={() => openOverlay(metricsData.progress.type)}
            ariaLabel={`Ver detalle de ${metricsData.progress.title.toLowerCase()}`}
          />
        </div>
        
        {activeOverlay === 'topics' && <TopicsDetailOverlay onClose={closeOverlay} />}
        {activeOverlay === 'cases' && <CasesDetailOverlay onClose={closeOverlay} />}
        {activeOverlay === 'hours' && <HoursDetailOverlay onClose={closeOverlay} />}
        {activeOverlay === 'progress' && <ProgressDetailOverlay onClose={closeOverlay} />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
          <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Actividad de Estudio Semanal</h3>
          <div className="h-64 bg-bg-light dark:bg-bg-dark rounded-lg flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark">
            [Gráfico de actividad aquí]
          </div>
        </div>
        <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
          <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Temas Recientes</h3>
           <ul className="space-y-3">
            {['Cardiología Pediátrica', 'Neuroanatomía Funcional', 'Farmacología Cardiovascular'].map(topic => (
              <li 
                key={topic} 
                className="text-sm text-text-primary-light dark:text-text-primary-dark p-3 bg-bg-light dark:bg-bg-dark rounded-lg hover:bg-primary/5 dark:hover:bg-surface-dark/60 cursor-pointer transition-colors"
                onClick={() => openChatWithContext(`Explícame más sobre ${topic}.`)}
                role="button" tabIndex={0}
                onKeyPress={(e) => e.key === 'Enter' && openChatWithContext(`Explícame más sobre ${topic}.`)}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <div className="flex items-center mb-4">
          <AcademicCapIcon className="w-6 h-6 text-primary dark:text-primary mr-3" />
          <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark">
            Preparación para Exámenes
          </h3>
        </div>
        <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-5">
          Obtén un plan de estudio personalizado para tu examen de residencia o certificación.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {exams.map(exam => (
            <ExamPrepButton
              key={exam.name}
              examName={exam.promptText}
              icon={exam.icon}
              isProminent={false} // All buttons are now standard grid items
              onClick={() => {
                // All exam objects in the 'exams' array currently have actionType: 'navigate'
                // and a 'path'. The 'chat' actionType path was causing a type error.
                if (exam.path) {
                  navigate(exam.path);
                }
              }}
            />
          ))}
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h3 className="text-lg font-semibold text-text-primary-light dark:text-text-primary-dark mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {['Repasar Último Tema', 'Nuevo Caso Clínico', 'Examen Rápido', 'Explorar Biblioteca'].map(action => (
            <button 
              key={action}
              onClick={() => openChatWithContext(action)}
              className="p-4 bg-primary/10 hover:bg-primary/20 dark:bg-surface-dark dark:hover:bg-gray-700 text-primary dark:text-primary font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-md-soft focus:scale-105 focus:shadow-md-soft focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm text-center"
            >
              {action}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
