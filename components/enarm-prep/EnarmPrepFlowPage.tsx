
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import EnarmPrepForm, { FormAnswers } from './EnarmPrepForm';
import { ROUTES, XMarkIcon, SparklesIcon } from '../../constants';
import { generateStudyPlan } from '../../services/geminiService';
import { addStudyPlan } from '../../stores/studyPlansStore';
import { StudyPlan, ExamType } from '../../types';
import LoadingSpinner from '../LoadingSpinner';

type EnarmPrepPhase = 'FORM' | 'TEST_INTRO' | 'TEST_QUESTIONS' | 'TEST_RESULTS' | 'PLAN_GENERATION' | 'PLAN_DISPLAY' | 'PLAN_ERROR';

const EnarmPrepFlowPage: React.FC = () => {
  const [currentPhase, setCurrentPhase] = useState<EnarmPrepPhase>('FORM');
  const [formAnswers, setFormAnswers] = useState<Partial<FormAnswers>>({});
  const [generatedPlan, setGeneratedPlan] = useState<StudyPlan | null>(null);
  const [planError, setPlanError] = useState<string | null>(null);
  
  const navigate = useNavigate();

  const handleFormComplete = (answers: FormAnswers) => {
    setFormAnswers(answers);
    setCurrentPhase('TEST_INTRO'); // Or directly to PLAN_GENERATION if skipping test for now
    console.log("ENARM Prep Form Answers:", answers);
  };

  const handleStartTest = () => {
    // For now, we skip the test and go to plan generation
    // In future, this would go to 'TEST_QUESTIONS'
    setCurrentPhase('PLAN_GENERATION'); 
  };
  
  const handleExitFlow = () => {
    navigate(ROUTES.DASHBOARD);
  };

  useEffect(() => {
    if (currentPhase === 'PLAN_GENERATION' && formAnswers.yearInCareer) { // Ensure formAnswers are available
      const examType: ExamType = 'ENARM'; // Hardcoded for now, can be dynamic later
      generateStudyPlan(formAnswers as FormAnswers, examType)
        .then(plan => {
          setGeneratedPlan(plan);
          addStudyPlan(plan); // Save to store
          setCurrentPhase('PLAN_DISPLAY');
        })
        .catch(error => {
          console.error("Error generating study plan:", error);
          setPlanError(error.message || "Ocurrió un error al generar el plan.");
          setCurrentPhase('PLAN_ERROR');
        });
    }
  }, [currentPhase, formAnswers]);

  const handleStartPlan = () => {
    if (generatedPlan) {
      navigate(ROUTES.EXAMS, { state: { newPlanId: generatedPlan.id, examType: generatedPlan.examType } });
    } else {
      // Fallback or error if plan is not available
      navigate(ROUTES.EXAMS);
    }
  };


  return (
    <div className="fixed inset-0 bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark flex flex-col items-center justify-center p-4 overflow-y-auto custom-scrollbar">
      <button
        onClick={handleExitFlow}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-50 p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        aria-label="Salir de la preparación ENARM y volver al dashboard"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {currentPhase === 'FORM' && (
        <EnarmPrepForm onFormComplete={handleFormComplete} initialAnswers={formAnswers} />
      )}

      {currentPhase === 'TEST_INTRO' && (
        <div className="text-center animate-fade-in-up max-w-xl w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">🎓 ¡Excelente!</h1>
          <p className="text-lg sm:text-xl text-text-secondary-light dark:text-text-secondary-dark mb-8">
            Has completado la información inicial. Ahora, generaremos tu plan de estudio personalizado.
            <br/> <small>(Fase de test diagnóstico se implementará próximamente)</small>
          </p>
          <button
            onClick={handleStartTest} // This now directly triggers plan generation
            className="px-8 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-md text-lg transition-transform transform hover:scale-105"
          >
            Generar Mi Plan de Estudio
          </button>
        </div>
      )}

      {/* Placeholders for TEST_QUESTIONS and TEST_RESULTS - to be built out later */}
      {currentPhase === 'TEST_QUESTIONS' && (
        <div className="text-center animate-fade-in-up">
          <h1 className="text-3xl font-bold text-primary mb-6">Fase de Test Diagnóstico</h1>
           <p className="text-text-secondary-light dark:text-text-secondary-dark">
            (Esta sección está en desarrollo)
          </p>
           <button 
            onClick={() => setCurrentPhase('PLAN_GENERATION')} // Simulate skipping to plan generation
            className="mt-8 px-6 py-2 bg-primary text-white rounded-lg">
                Saltar Test y Generar Plan
            </button>
        </div>
      )}

       {currentPhase === 'PLAN_GENERATION' && (
        <div className="text-center animate-fade-in-up flex flex-col items-center">
          <SparklesIcon className="w-16 h-16 text-primary mb-6 animate-pulse" />
          <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Generando tu Plan de Estudio Personalizado...</h1>
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-6 max-w-md">
            Estamos analizando tus respuestas para crear la mejor estrategia de preparación para el ENARM. Esto podría tomar un momento.
          </p>
          <LoadingSpinner size="lg" />
        </div>
      )}

      {currentPhase === 'PLAN_DISPLAY' && generatedPlan && (
        <div className="text-center animate-fade-in-up max-w-2xl w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">🎉 ¡Tu Plan de Estudio Personalizado está Listo!</h1>
          <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-lg border border-border-light dark:border-border-dark mb-8">
            <h2 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark mb-3">{generatedPlan.planTitle}</h2>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
              <strong>Examen:</strong> {generatedPlan.examType}
            </p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mb-2">
              <strong>Fecha Objetivo:</strong> {generatedPlan.targetDate ? new Date(generatedPlan.targetDate).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No especificada'}
            </p>
            <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">
              Hemos guardado este plan en la sección "Exámenes" para que puedas consultarlo cuando quieras.
            </p>
            {/* Basic preview of plan content - can be expanded */}
            <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark text-left max-h-60 overflow-y-auto custom-scrollbar p-2 bg-bg-light dark:bg-bg-dark rounded-md">
                <h4 className="font-semibold text-md mb-2">Vista Previa del Plan:</h4>
                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark whitespace-pre-line line-clamp-6">
                    {generatedPlan.planContent.substring(0, 500)}...
                </p>
            </div>
          </div>
          <button
            onClick={handleStartPlan}
            className="px-8 py-3 bg-accent hover:bg-accent-dark text-white font-semibold rounded-lg shadow-md text-lg transition-transform transform hover:scale-105"
          >
            Ver mi Plan en "Exámenes"
          </button>
        </div>
      )}

      {currentPhase === 'PLAN_ERROR' && (
        <div className="text-center animate-fade-in-up max-w-xl w-full">
           <XMarkIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl sm:text-3xl font-bold text-red-500 mb-4">Error al Generar el Plan</h1>
          <p className="text-md text-text-secondary-light dark:text-text-secondary-dark mb-6">
            Lo sentimos, no pudimos generar tu plan de estudio en este momento.
          </p>
          {planError && <p className="text-sm text-red-400 bg-red-500/10 p-3 rounded-md mb-6">{planError}</p>}
          <button
            onClick={handleExitFlow}
            className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-md transition-colors"
          >
            Volver al Dashboard
          </button>
        </div>
      )}
    </div>
  );
};

export default EnarmPrepFlowPage;
