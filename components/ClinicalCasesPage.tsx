import React, { useState } from 'react';
import { ClinicalCase } from '../types';
import { BriefcaseIcon, ChatIcon } from '../constants';

interface ClinicalCasesPageProps {
  openChatWithContext: (context: string) => void;
}

const mockCases: ClinicalCase[] = [
  { id: 'case1', title: 'Paciente de 45 años con dolor torácico opresivo', specialty: 'Cardiología', history: 'Varón de 45 años, fumador, con antecedentes de HTA, acude por dolor torácico opresivo de 2 horas de evolución...', analysisQuestions: ['¿Cuál es el diagnóstico más probable?', '¿Qué pruebas solicitaría?', '¿Cuál sería el manejo inicial?'], learningSummary: 'Sospecha de Síndrome Coronario Agudo. Importancia de ECG y marcadores cardíacos.', solvedDate: '2024-07-20T10:00:00Z' },
  { id: 'case2', title: 'Niño de 5 años con fiebre y exantema', specialty: 'Pediatría', history: 'Preescolar de 5 años, previamente sano, presenta fiebre de 39°C de 3 días de evolución asociada a exantema maculopapular...', analysisQuestions: ['¿Cuáles son los diagnósticos diferenciales?', '¿Qué signos de alarma buscaría?', '¿Requiere tratamiento específico?'], learningSummary: 'Diagnóstico diferencial de enfermedades exantemáticas en la infancia.', solvedDate: '2024-07-18T15:30:00Z' },
  { id: 'case3', title: 'Mujer de 68 años con alteración del estado de conciencia', specialty: 'Neurología', history: 'Paciente femenina de 68 años, con diabetes mellitus tipo 2, es traída por familiares por presentar desorientación y somnolencia progresiva...', analysisQuestions: ['¿Causas metabólicas a descartar?', '¿Estudios de neuroimagen indicados?', '¿Manejo de la vía aérea?'], learningSummary: 'Abordaje del paciente con alteración del nivel de conciencia.', solvedDate: '2024-06-25T09:00:00Z' },
];


const CaseItem: React.FC<{ caseItem: ClinicalCase; onExplain: (title: string) => void }> = ({ caseItem, onExplain }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-md-soft border border-border-light dark:border-border-dark hover:border-accent/70 dark:hover:border-accent">
      <div className="flex justify-between items-start cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div>
          <h3 className="text-lg font-semibold text-primary dark:text-accent">{caseItem.title}</h3>
          <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mt-0.5">{caseItem.specialty} - Resuelto: {formatDate(caseItem.solvedDate)}</p>
        </div>
        <span className={`transform transition-transform duration-200 text-text-secondary-light dark:text-text-secondary-dark ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-1.5">Historia Clínica (Resumen):</h4>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{caseItem.history}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-1.5">Preguntas de Análisis:</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {caseItem.analysisQuestions.map((q, index) => (
                <li key={index} className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{q}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-text-primary-light dark:text-text-primary-dark mb-1.5">Resumen de Aprendizaje:</h4>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">{caseItem.learningSummary}</p>
          </div>
          <button 
            onClick={() => onExplain(`Analizar el caso clínico: "${caseItem.title}"`)}
            className="mt-3 inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-accent hover:bg-accent-dark rounded-lg shadow-sm transition-colors"
          >
            <ChatIcon className="w-4 h-4 mr-2" />
            Explicación con Blasto AI
          </button>
        </div>
      )}
    </div>
  );
};


const ClinicalCasesPage: React.FC<ClinicalCasesPageProps> = ({ openChatWithContext }) => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentCases = mockCases.filter(c => new Date(c.solvedDate) >= thirtyDaysAgo);

  const handleExplainWithAI = (caseTitle: string) => {
    openChatWithContext(caseTitle);
  };

  return (
    <div className="space-y-8 text-text-primary-light dark:text-text-primary-dark">
       <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        <BriefcaseIcon className="w-10 h-10 text-accent dark:text-accent" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Casos Clínicos</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Revisa tus últimos casos clínicos resueltos y practica con nuevos.</p>
        </div>
      </div>
      
      {recentCases.length > 0 ? (
        <div className="space-y-5">
          {recentCases.map(caseItem => (
            <CaseItem key={caseItem.id} caseItem={caseItem} onExplain={handleExplainWithAI} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 sm:py-12 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
          <BriefcaseIcon className="w-16 h-16 sm:w-20 sm:h-20 text-text-secondary-light/40 dark:text-text-secondary-dark/40 mx-auto mb-5" />
          <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-5">No has resuelto casos clínicos en los últimos 30 días.</p>
          <button 
            onClick={() => handleExplainWithAI("Quiero resolver un nuevo caso clínico")}
            className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white rounded-lg shadow-sm font-semibold transition-colors"
          >
            Resolver un Nuevo Caso
          </button>
        </div>
      )}

      {mockCases.length > recentCases.length && recentCases.length > 0 && (
         <div className="mt-8 text-center">
             <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Hay {mockCases.length - recentCases.length} casos más antiguos disponibles.</p>
             {/* Button to show all cases could be added here */}
         </div>
      )}
    </div>
  );
};

export default ClinicalCasesPage;