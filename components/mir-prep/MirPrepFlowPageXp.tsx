import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MirPrepFormXp from './MirPrepFormXp'; // Using the new MIR-specific form
import { ROUTES, XMarkIcon, SparklesIcon, AcademicCapIcon } from '../../constants'; 
import { generateStudyPlan } from '../../services/geminiService';
import { addStudyPlan, getStudyPlanById, updateStudyPlan } from '../../stores/studyPlansStore';
import { StudyPlan, ExamType, MirXpFormAnswers, AnyExamFormAnswers } from '../../types'; // Using MirXpFormAnswers
import LoadingSpinner from '../LoadingSpinner';

type MirPrepPhase = 'FORM' | 'PLAN_GENERATION' | 'PLAN_ERROR';

const MirPrepFlowPageXp: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<MirPrepPhase>('FORM');
  const [formAnswers, setFormAnswers] = useState<Partial<MirXpFormAnswers>>({}); // Using MirXpFormAnswers
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  const [editingPlanId, setEditingPlanId] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const examType: ExamType = 'MIR_XP'; 

  useEffect(() => {
    const locationState = location.state as { planIdToEdit?: string; initialData?: MirXpFormAnswers };
    if (locationState?.planIdToEdit) {
      const planToEdit = getStudyPlanById(locationState.planIdToEdit);
      if (planToEdit && planToEdit.examType === 'MIR_XP') {
        setFormAnswers(planToEdit.userInput as MirXpFormAnswers); // Cast to MirXpFormAnswers
        setEditingPlanId(locationState.planIdToEdit);
      }
    } else if (locationState?.initialData) {
        setFormAnswers(locationState.initialData);
    }
  }, [location.state]);


  const handleFormComplete = (answers: MirXpFormAnswers) => { // Expecting MirXpFormAnswers
    setFormAnswers(answers);
    setCurrentPhase('PLAN_GENERATION'); 
    console.log("MIR XP Form Answers (Specific):", answers);
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
    if (currentPhase === 'PLAN_GENERATION' && Object.keys(formAnswers).length > 0) {
      generateStudyPlan(formAnswers as AnyExamFormAnswers, examType) // Cast to AnyExamFormAnswers for service
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
          console.error("Error generating MIR XP study plan:", error);
          setPlanError(error.message || "Ocurrió un error al generar el plan para el MIR.");
          setCurrentPhase('PLAN_ERROR');
        });
    }
  }, [currentPhase, formAnswers, examType, editingPlanId, navigate]);

  const handleEditAnswers = () => {
    setCurrentPhase('FORM');
  }

  const pageTitle = editingPlanId ? "Editando Plan MIR" : "Crear Plan MIR Personalizado";

  return (
    <div className="fixed inset-0 bg-bg-dark text-text-primary-dark flex flex-col items-center justify-center p-4 overflow-y-auto custom-scrollbar font-inter">
      <div className="absolute top-0 left-0 right-0 p-4 sm:p-6 flex justify-between items-center bg-bg-dark/80 backdrop-blur-sm z-10">
        <div className="flex items-center space-x-2">
            <AcademicCapIcon className="w-7 h-7 text-primary" /> 
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
        <div className="w-full h-full flex flex-col items-center justify-center pt-16 sm:pt-20">
            <MirPrepFormXp // Using the new MIR_XP form component
                onFormComplete={handleFormComplete} 
                initialData={formAnswers as MirXpFormAnswers} 
            />
        </div>
      )}
      
      {currentPhase === 'PLAN_GENERATION' && (
        <div className="text-center animate-fade-in-up flex flex-col items-center justify-center h-full">
          <SparklesIcon className="w-16 h-16 text-primary mb-6 animate-pulse-soft" />
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4 font-poppins">Generando tu Plan de Estudio MIR Personalizado...</h1>
          <p className="text-text-secondary-dark mb-8 max-w-md">
            Blasto AI está adaptando la estrategia para tu preparación MIR. Esto podría tomar un momento.
          </p>
          <LoadingSpinner size="lg" color="text-primary" />
        </div>
      )}

      {currentPhase === 'PLAN_ERROR' && (
        <div className="text-center animate-fade-in-up max-w-xl w-full flex flex-col items-center justify-center h-full pt-16 sm:pt-20">
           <XMarkIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4 font-poppins">Error al Generar el Plan MIR</h1>
          <p className="text-md text-text-secondary-dark mb-6">
            Lo sentimos, Blasto AI no pudo generar tu plan de estudio MIR en este momento.
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

export default MirPrepFlowPageXp;