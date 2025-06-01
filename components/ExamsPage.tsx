import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { StudyPlan, ExamType } from '../types';
import { getStudyPlans, getStudyPlanById } from '../stores/studyPlansStore';
import { 
    SidebarExamsIcon, 
    ExamsPlanIcon, 
    ExamsSimulationsIcon, 
    XMarkIcon,
    AcademicCapIcon,
    PencilSquareIcon, // For Edit button
    SparklesIcon, // For AI generated indication
    ROUTES
} from '../constants';


const renderStructuredContent = (text: string): string => {
  if (!text) return "";
  let processedText = text;

  // Enhanced Markdown processing
  processedText = processedText
    .replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>') // Bold
    .replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>') // Italic
    .replace(/`(.*?)`/g, '<code>$1</code>'); // Inline code

  const lines = processedText.split('\n');
  let htmlOutput = '';
  let inList = false;
  let listType = ''; 
  let listIndent = 0;


  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Headlines - Corrected block
    if (line.startsWith('### ')) {
      if (inList) { htmlOutput += `</${listType}>`; inList = false; }
      htmlOutput += `<h3 class="text-md font-semibold mt-3 mb-1.5">${line.substring(4).trim().replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>').replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')}</h3>`;
    } else if (line.startsWith('## ')) {
      if (inList) { htmlOutput += `</${listType}>`; inList = false; }
      htmlOutput += `<h2 class="text-lg font-semibold mt-4 mb-2">${line.substring(3).trim().replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>').replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')}</h2>`;
    } else if (line.startsWith('# ')) {
      if (inList) { htmlOutput += `</${listType}>`; inList = false; }
      htmlOutput += `<h1 class="text-xl font-bold mt-5 mb-3">${line.substring(2).trim().replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>').replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')}</h1>`;
    }
    // List items (unordered and ordered)
    // Ensure this 'else if' chain is correct after heading checks
    else { // Added else to ensure headings are exclusive of list/paragraph logic
        const listItemMatch = line.match(/^(\s*)([\*\-\+]|\d+\.)\s+(.*)/);
        if (listItemMatch) {
        const currentIndent = listItemMatch[1].length;
        const marker = listItemMatch[2];
        const itemContent = listItemMatch[3];

        if (inList && (currentIndent < listIndent || (marker.match(/\d+\./) && listType === 'ul') || (!marker.match(/\d+\./) && listType === 'ol'))) {
            htmlOutput += `</${listType}>`;
            inList = false;
        }

        if (!inList) {
            listType = marker.match(/\d+\./) ? 'ol' : 'ul';
            listIndent = currentIndent;
            htmlOutput += `<${listType} class="${listType === 'ol' ? 'list-decimal' : 'list-disc'} list-inside pl-5 mb-2 space-y-1 text-sm">`;
            inList = true;
        }
        htmlOutput += `<li>${itemContent.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>').replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')}</li>`;
        } else {
        if (inList) { // If it's not a list item, and we were in a list, close it.
            htmlOutput += `</${listType}>`;
            inList = false;
        }
        if (line) { // Only add paragraph if line is not empty
            htmlOutput += `<p class="mb-2 text-sm leading-relaxed">${line.replace(/\*\*(.*?)\*\*|__(.*?)__/g, '<strong>$1$2</strong>').replace(/\*(.*?)\*|_(.*?)_/g, '<em>$1$2</em>')}</p>`;
        } else if (htmlOutput.length > 0 && !htmlOutput.endsWith('</p>') && !htmlOutput.endsWith('</h3>') && !htmlOutput.endsWith('</h2>') && !htmlOutput.endsWith('</h1>') && !htmlOutput.endsWith(`</${listType}>`)) {
            // Add a small break for visual spacing if it's an empty line and not immediately after a block element or list closing.
             htmlOutput += '<div class="my-1"></div>';
        }
        }
    }
  }

  if (inList) { htmlOutput += `</${listType}>`; } // Close any remaining open list
  return htmlOutput.trim();
};


const ExamsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'plans' | 'simulations'>('plans');
  const [studyPlans, setStudyPlans] = useState<StudyPlan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setStudyPlans(getStudyPlans());
  }, []);

  useEffect(() => {
    const state = location.state as { newPlanId?: string, examType?: ExamType };
    if (state?.newPlanId) {
      const plan = getStudyPlanById(state.newPlanId);
      if (plan) {
        setSelectedPlan(plan);
        // Clear state after use
        navigate(location.pathname, { replace: true, state: {} });
      }
    }
  }, [location, navigate]);

  const handleEditPlan = (plan: StudyPlan) => {
    if (plan.examType === 'ENARM_XP') {
       navigate(ROUTES.ENARM_PREP_XP, { state: { planIdToEdit: plan.id } });
    } else if (plan.examType === 'MIR_XP') {
       navigate(ROUTES.MIR_PREP_XP, { state: { planIdToEdit: plan.id } });
    } else if (plan.examType === 'USMLE Step 1' || plan.examType === 'USMLE Step 2 CK' || plan.examType === 'USMLE Step 3') {
       navigate(ROUTES.USMLE_PREP_XP, { state: { planIdToEdit: plan.id } });
    } else if (plan.examType === 'PLAB Part 1' || plan.examType === 'PLAB Part 2') {
       navigate(ROUTES.PLAB_PREP_XP, { state: { planIdToEdit: plan.id } });
    }
  };
  
  const getDisplayCardTitle = (plan: StudyPlan): string => {
    switch (plan.examType) {
        case 'ENARM_XP':
            return "Plan ENARM";
        case 'ENARM': // Legacy
            return "Plan ENARM";
        case 'MIR_XP':
            return "Plan MIR";
        case 'MIR': // Legacy
            return "Plan MIR";
        case 'USMLE Step 1':
            return "Plan USMLE Step 1";
        case 'USMLE Step 2 CK':
            return "Plan USMLE Step 2 CK";
        case 'USMLE Step 3':
            return "Plan USMLE Step 3";
        case 'PLAB Part 1':
            return "Plan PLAB Part 1";
        case 'PLAB Part 2':
            return "Plan PLAB Part 2";
        default:
            return plan.planTitle.startsWith("Plan de Estudio") ? plan.planTitle : `Plan ${plan.examType}`;
    }
  };

  const isAIPlan = (examType: ExamType) => {
    return examType === 'ENARM_XP' || 
           examType === 'MIR_XP' ||
           examType === 'USMLE Step 1' || 
           examType === 'USMLE Step 2 CK' || 
           examType === 'USMLE Step 3' ||
           examType === 'PLAB Part 1' ||
           examType === 'PLAB Part 2';
  }


  return (
    <div className="space-y-6 sm:space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        <SidebarExamsIcon className="w-10 h-10 text-primary dark:text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Mis Exámenes</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Gestiona tus planes de estudio y simulaciones.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border-light dark:border-border-dark">
        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm sm:text-base transition-colors
            ${activeTab === 'plans' 
              ? 'border-b-2 border-primary text-primary dark:text-primary' 
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary'
            }`}
        >
          <ExamsPlanIcon className="w-5 h-5" />
          <span>Planes de Estudio</span>
        </button>
        <button
          onClick={() => setActiveTab('simulations')}
          className={`flex items-center space-x-2 px-4 py-3 font-medium text-sm sm:text-base transition-colors
            ${activeTab === 'simulations' 
              ? 'border-b-2 border-primary text-primary dark:text-primary' 
              : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary'
            }`}
        >
          <ExamsSimulationsIcon className="w-5 h-5" />
          <span>Simulaciones</span>
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'plans' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {studyPlans.length > 0 ? studyPlans.map(plan => (
            <div 
              key={plan.id} 
              className="bg-surface-light dark:bg-surface-dark p-5 rounded-xl shadow-soft border border-border-light dark:border-border-dark transition-all duration-200 hover:shadow-md-soft hover:border-primary/30 dark:hover:border-primary/50 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-semibold text-primary dark:text-primary mb-0.5 line-clamp-2">
                        {getDisplayCardTitle(plan)}
                    </h3>
                    {isAIPlan(plan.examType) && (
                        <SparklesIcon className="w-5 h-5 text-accent flex-shrink-0 ml-2" title="Generado con Blasto AI" />
                    )}
                </div>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-1">
                  Creado: {new Date(plan.creationDate).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
                {plan.targetDate && (
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark mb-3">
                    Fecha Objetivo: {new Date(plan.targetDate).toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                )}
                <p className="text-sm text-text-primary-light dark:text-text-primary-dark line-clamp-3 mb-3">
                  {plan.summary || plan.planContent.substring(0, 100) + "..."}
                </p>
              </div>
              <div className="flex items-center justify-end space-x-2 mt-3">
                {isAIPlan(plan.examType) && ( 
                     <button
                        onClick={() => handleEditPlan(plan)}
                        className="p-2 text-xs font-medium text-text-secondary-light dark:text-text-secondary-dark hover:text-primary dark:hover:text-primary transition-colors rounded-md hover:bg-primary/10 dark:hover:bg-primary/20"
                        aria-label="Editar plan"
                    >
                        <PencilSquareIcon className="w-4 h-4" />
                    </button>
                )}
                <button
                  onClick={() => setSelectedPlan(plan)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-white bg-primary hover:bg-primary-dark rounded-md shadow-sm transition-colors"
                >
                  Ver Plan Completo
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full text-center py-10 bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-border-light dark:border-border-dark">
              <AcademicCapIcon className="w-16 h-16 text-text-secondary-light/40 dark:text-text-secondary-dark/40 mx-auto mb-4" />
              <p className="text-md text-text-secondary-light dark:text-text-secondary-dark">No tienes planes de estudio guardados.</p>
              <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-1">Crea uno desde el Dashboard.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'simulations' && (
        <div className="text-center py-10 bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft border border-border-light dark:border-border-dark">
          <ExamsSimulationsIcon className="w-16 h-16 text-text-secondary-light/40 dark:text-text-secondary-dark/40 mx-auto mb-4" />
          <p className="text-md text-text-secondary-light dark:text-text-secondary-dark">La sección de simulaciones estará disponible próximamente.</p>
        </div>
      )}

      {/* Modal for displaying selected plan */}
      {selectedPlan && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in-up"
            onClick={() => setSelectedPlan(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="plan-modal-title"
        >
          <div 
            className="bg-surface-light dark:bg-surface-dark rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden border border-border-light dark:border-border-dark"
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            <div className="flex justify-between items-center p-5 border-b border-border-light dark:border-border-dark">
              <h2 id="plan-modal-title" className="text-xl font-semibold text-primary dark:text-primary">{selectedPlan.planTitle}</h2>
              <button 
                onClick={() => setSelectedPlan(null)} 
                className="p-1.5 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label="Cerrar plan"
              >
                <XMarkIcon className="w-5 h-5 text-text-secondary-light dark:text-text-secondary-dark" />
              </button>
            </div>
            <div className="p-5 sm:p-6 overflow-y-auto custom-scrollbar flex-grow">
                <div
                  className="prose prose-sm sm:prose-base max-w-none dark:prose-invert text-text-primary-light dark:text-text-primary-dark overflow-x-hidden break-words custom-scrollbar-thin"
                  dangerouslySetInnerHTML={{ __html: renderStructuredContent(selectedPlan.planContent) }}
                />
            </div>
             <div className="p-4 border-t border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark flex justify-end">
                <button 
                    onClick={() => setSelectedPlan(null)}
                    className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-white rounded-md shadow-sm"
                >
                    Cerrar
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;