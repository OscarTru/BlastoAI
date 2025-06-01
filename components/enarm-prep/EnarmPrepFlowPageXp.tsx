
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EnarmPrepFormXp from './EnarmPrepFormXp';
import { ROUTES, XMarkIcon, SparklesIcon, BrainIcon } from '../../constants';
import { generateStudyPlan } from '../../services/geminiService';
import { addStudyPlan, getStudyPlanById, updateStudyPlan } from '../../stores/studyPlansStore';
import { StudyPlan, ExamType, EnarmXpFormAnswers, AnyExamFormAnswers } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

type EnarmPrepPhase = 'FORM' | 'PLAN_GENERATION' | 'PLAN_ERROR'; // Removed 'PLAN_DISPLAY'

const EnarmPrepFlowPageXp: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<EnarmPrepPhase>('FORM');
  const [formAnswers, setFormAnswers] = useState<Partial<EnarmXpFormAnswers>>({});
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null); // Kept for potential retry logic
  const [planError, setPlanError] = useState<string | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const examType: ExamType = 'ENARM_XP';

  useEffect(() => {
    const locationState = location.state as { planIdToEdit?: string; initialData?: EnarmXpFormAnswers };
    if (locationState?.planIdToEdit) {
      const planToEdit = getStudyPlanById(locationState.planIdToEdit);
      if (planToEdit && planToEdit.examType === 'ENARM_XP') {
        setFormAnswers(planToEdit.userInput as EnarmXpFormAnswers);
        setEditingPlanId(locationState.planIdToEdit);
      }
    } else if (locationState?.initialData) { // For re-editing unsaved data
        setFormAnswers(locationState.initialData);
    }
  }, [location.state]);


  const handleFormComplete = (answers: EnarmXpFormAnswers) => {
    setFormAnswers(answers);
    setCurrentPhase('PLAN_GENERATION'); 
    console.log("ENARM XP Form Answers:", answers);
  };
  
  const handleExitFlow = () => {
    navigate(ROUTES.DASHBOARD);
  };

  const handleViewPlanInExams = (plan: StudyPlan) => { // Accepts plan object
    if (plan) {
      navigate(ROUTES.EXAMS, { state: { newPlanId: plan.id, examType: plan.examType } });
    } else {
      // Fallback if plan somehow is not available, though it shouldn't happen in this flow
      navigate(ROUTES.EXAMS);
    }
  };

  useEffect(() => {
    if (currentPhase === 'PLAN_GENERATION' && Object.keys(formAnswers).length > 0) {
      generateStudyPlan(formAnswers as EnarmXpFormAnswers, examType)
        .then(plan => {
          setGeneratedPlan(plan); // Store the plan
          if (editingPlanId) {
            const updatedPlan = { ...plan, id: editingPlanId };
            updateStudyPlan(updatedPlan);
            handleViewPlanInExams(updatedPlan); // Navigate immediately
          } else {
            addStudyPlan(plan); 
            handleViewPlanInExams(plan); // Navigate immediately
          }
          // No longer setting PLAN_DISPLAY phase here
        })
        .catch(error => {
          console.error("Error generating ENARM XP study plan:", error);
          setPlanError(error.message || "Ocurrió un error al generar el plan para el ENARM.");
          setCurrentPhase('PLAN_ERROR');
        });
    }
  }, [currentPhase, formAnswers, examType, editingPlanId, navigate]); // Added navigate to dependencies

  const handleEditAnswers = () => {
    setCurrentPhase('FORM'); // Go back to form with current answers
  }

  const pageTitle = editingPlanId ? "Editando Plan ENARM" : "Crear Plan ENARM Personalizado";

  return (
    <div className="fixed inset-0 bg-bg-dark text-text-primary-dark flex flex-col items-center justify-center p-4 overflow-y-auto custom-scrollbar font-inter">
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center bg-bg-dark/80 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
            <BrainIcon className="w-7 h-7 text-primary" />
            <h1 className="text-lg sm:text-xl font-semibold text-text-primary-dark">{pageTitle}</h1>
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
        <div className="w-full h-full flex flex-col items-center justify-center pt-16 sm:pt-20"> {/* Added padding top for header */}
            <EnarmPrepFormXp 
                onFormComplete={handleFormComplete} 
                initialData={formAnswers as EnarmXpFormAnswers} 
            />
        </div>
      )}
      
      {currentPhase === 'PLAN_GENERATION' && (
        <div className="text-center animate-fade-in-up flex flex-col items-center justify-center h-full">
          <SparklesIcon className="w-16 h-16 text-primary mb-6 animate-pulse-soft" />
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 font-poppins">Generando tu Plan de Estudio Personalizado...</h1>
          <p className="text-text-secondary-dark mb-8 max-w-md">
            Blasto AI está analizando tus respuestas para crear la mejor estrategia de preparación. Esto podría tomar un momento.
          </p>
          <LoadingSpinner size="lg" color="text-primary" />
        </div>
      )}

      {/* PLAN_DISPLAY phase is removed. Navigation happens directly. */}

      {currentPhase === 'PLAN_ERROR' && (
        <div className="text-center animate-fade-in-up max-w-xl w-full flex flex-col items-center justify-center h-full pt-16 sm:pt-20">
           <XMarkIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 font-poppins">Error al Generar el Plan</h1>
          <p className="text-md text-text-secondary-dark mb-6">
            Lo sentimos, Blasto AI no pudo generar tu plan de estudio en este momento.
          </p>
          {planError && <p className="text-sm text-red-400 bg-red-900/30 p-3 rounded-md mb-6 border border-red-500">{planError}</p>}
          <div className="flex space-x-4">
             <button
                onClick={handleEditAnswers} // Allow user to go back and try again
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

export default EnarmPrepFlowPageXp;
