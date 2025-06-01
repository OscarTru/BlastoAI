import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PlabPrepFormXp from './PlabPrepFormXp';
import { ROUTES, XMarkIcon, SparklesIcon, AcademicCapIcon } from '../../constants'; 
import { generateStudyPlan } from '../../services/geminiService';
import { addStudyPlan, getStudyPlanById, updateStudyPlan } from '../../stores/studyPlansStore';
import { StudyPlan, ExamType, PlabXpFormAnswers, AnyExamFormAnswers } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

type PlabPrepPhase = 'FORM' | 'PLAN_GENERATION' | 'PLAN_ERROR';

const PlabPrepFlowPageXp: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<PlabPrepPhase>('FORM');
  const [formAnswers, setFormAnswers] = useState<Partial<PlabXpFormAnswers>>({});
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  // examType will be determined by formAnswers.section1.plabPartToPrep

  useEffect(() => {
    const locationState = location.state as { planIdToEdit?: string; initialData?: PlabXpFormAnswers };
    if (locationState?.planIdToEdit) {
      const planToEdit = getStudyPlanById(locationState.planIdToEdit);
      if (planToEdit && (planToEdit.examType === 'PLAB Part 1' || planToEdit.examType === 'PLAB Part 2')) {
        setFormAnswers(planToEdit.userInput as PlabXpFormAnswers);
        setEditingPlanId(locationState.planIdToEdit);
      }
    } else if (locationState?.initialData) {
        setFormAnswers(locationState.initialData);
    }
  }, [location.state]);

  const handleFormComplete = (answers: PlabXpFormAnswers) => {
    setFormAnswers(answers);
    setCurrentPhase('PLAN_GENERATION'); 
    console.log("PLAB XP Form Answers (Specific):", answers);
  };
  
  const handleExitFlow = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleViewPlanInExams = (plan: StudyPlan) => {
    if (plan) {
      navigate(ROUTES.EXAMS, { state: { newPlanId: plan.id, examType: plan.examType } });
    } else {
      navigate(ROUTES.EXAMS);
    }
  };

  useEffect(() => {
    if (currentPhase === 'PLAN_GENERATION' && formAnswers.section1?.plabPartToPrep) {
      const currentExamType: ExamType = formAnswers.section1.plabPartToPrep;
      generateStudyPlan(formAnswers as AnyExamFormAnswers, currentExamType)
        .then(plan => {
          setGeneratedPlan(plan);
          if (editingPlanId) {
            const updatedPlan = { ...plan, id: editingPlanId };
            updateStudyPlan(updatedPlan);
            handleViewPlanInExams(updatedPlan);
          } else {
            addStudyPlan(plan); 
            handleViewPlanInExams(plan);
          }
        })
        .catch(error => {
          console.error(`Error generating PLAB XP study plan for ${currentExamType}:`, error);
          setPlanError(error.message || `Ocurrió un error al generar el plan para ${currentExamType}.`);
          setCurrentPhase('PLAN_ERROR');
        });
    }
  }, [currentPhase, formAnswers, editingPlanId, navigate]);

  const handleEditAnswers = () => {
    setCurrentPhase('FORM');
  }

  const getPageTitle = () => {
    let baseTitle = "Plan PLAB Personalizado";
    if (formAnswers.section1?.plabPartToPrep) {
      baseTitle = `Plan ${formAnswers.section1.plabPartToPrep} Personalizado`;
    }
    return editingPlanId ? `Editando ${baseTitle}` : `Crear ${baseTitle}`;
  }

  return (
    <div className="fixed inset-0 bg-bg-dark text-text-primary-dark flex flex-col items-center justify-center p-4 overflow-y-auto custom-scrollbar font-inter">
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center bg-bg-dark/80 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
            <AcademicCapIcon className="w-7 h-7 text-primary" /> 
            <h1 className="text-lg sm:text-xl font-semibold text-text-primary-dark">{getPageTitle()}</h1>
        </div>
        <button
            onClick={handleExitFlow}
            className="p-2 rounded-full hover:bg-surface-dark/50 transition-colors"
            aria-label="Salir y volver al dashboard"
        >
            <XMarkIcon className="w-6 h-6" />
        </button>
      </div>

      {currentPhase === 'FORM' && (
        <div className="w-full h-full flex flex-col items-center justify-center pt-16 sm:pt-20">
            <PlabPrepFormXp 
                onFormComplete={handleFormComplete} 
                initialData={formAnswers as PlabXpFormAnswers} 
            />
        </div>
      )}
      
      {currentPhase === 'PLAN_GENERATION' && (
        <div className="text-center animate-fade-in-up flex flex-col items-center justify-center h-full">
          <SparklesIcon className="w-16 h-16 text-primary mb-6 animate-pulse-soft" />
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 font-poppins">
            Generando tu {formAnswers.section1?.plabPartToPrep || "PLAB"} Plan Personalizado...
          </h1>
          <p className="text-text-secondary-dark mb-8 max-w-md">
            Blasto AI está diseñando tu estrategia para el PLAB. Esto podría tomar un momento.
          </p>
          <LoadingSpinner size="lg" color="text-primary" />
        </div>
      )}

      {currentPhase === 'PLAN_ERROR' && (
        <div className="text-center animate-fade-in-up max-w-xl w-full flex flex-col items-center justify-center h-full pt-16 sm:pt-20">
           <XMarkIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 font-poppins">
            Error al Generar el Plan {formAnswers.section1?.plabPartToPrep || "PLAB"}
          </h1>
          <p className="text-md text-text-secondary-dark mb-6">
            Lo sentimos, Blasto AI no pudo generar tu plan de estudio en este momento.
          </p>
          {planError && <p className="text-sm text-red-400 bg-red-900/30 p-3 rounded-md mb-6 border border-red-500">{planError}</p>}
          <div className="flex space-x-4">
             <button
                onClick={handleEditAnswers}
                className="px-6 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg shadow-md transition-colors"
            >
                Revisar Respuestas
            </button>
            <button
                onClick={handleExitFlow}
                className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors"
            >
                Volver al Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlabPrepFlowPageXp;