import React, { useState, useEffect } from 'react';
import FullScreenQuestionLayout, { QuestionOption } from '../enarm-prep/FullScreenQuestionLayout';
import ProgressIndicator from '../enarm-prep/ProgressIndicator';
import { UsmleXpFormAnswers, UsmleXpSection1Answers, UsmleXpSection2Answers, UsmleXpSection3Answers, UsmleXpSection4Answers, UsmleXpSection5Answers } from '../../types';

interface UsmlePrepFormXpProps {
  onFormComplete: (answers: UsmleXpFormAnswers) => void;
  initialData?: Partial<UsmleXpFormAnswers>;
}

type SectionKey = keyof UsmleXpFormAnswers;

interface FormQuestionDefinition {
  id: keyof UsmleXpSection1Answers | keyof UsmleXpSection2Answers | keyof UsmleXpSection3Answers | keyof UsmleXpSection4Answers | keyof UsmleXpSection5Answers;
  section: SectionKey;
  title: string;
  type: 'radio' | 'checkbox' | 'select' | 'text' | 'textarea' | 'date';
  options?: QuestionOption[];
  placeholder?: string;
  allowMultiple?: boolean;
  isOptional?: boolean;
  helperText?: string;
}

const usmleResources = [
    { value: 'UWorld', label: 'UWorld QBank' },
    { value: 'First Aid', label: 'First Aid for the USMLE' },
    { value: 'Pathoma', label: 'Pathoma' },
    { value: 'SketchyMedical', label: 'SketchyMedical (Micro/Pharm/Path)' },
    { value: 'NBME CBSSAs', label: 'NBME Self-Assessments (CBSSAs)' },
    { value: 'Amboss', label: 'Amboss QBank/Library' },
    { value: 'Boards and Beyond', label: 'Boards and Beyond (B&B)' },
    { value: 'Anki', label: 'Anki Flashcards (e.g., Zanki, AnKing)' },
    { value: 'Kaplan', label: 'Kaplan QBank/Lectures' },
    { value: 'Lecturio', label: 'Lecturio' },
    { value: 'OnlineMedEd', label: 'OnlineMedEd (OME)' },
    { value: 'Otro', label: 'Otro recurso principal' },
];

const usmleSystemsDisciplines = [
    // Step 1 Focus
    { value: 'Bioquímica y Biología Molecular', label: 'Bioquímica y Biología Molecular' },
    { value: 'Fisiología', label: 'Fisiología' },
    { value: 'Patología', label: 'Patología General y Sistémica' },
    { value: 'Farmacología', label: 'Farmacología General y Sistémica' },
    { value: 'Microbiología e Inmunología', label: 'Microbiología e Inmunología' },
    { value: 'Ciencias de la Conducta y Ética', label: 'Ciencias de la Conducta y Ética Médica' },
    // Shared / Step 2 CK / Step 3 Focus
    { value: 'Sistema Cardiovascular', label: 'Sistema Cardiovascular' },
    { value: 'Sistema Respiratorio', label: 'Sistema Respiratorio' },
    { value: 'Sistema Renal/Urinario', label: 'Sistema Renal/Urinario' },
    { value: 'Sistema Gastrointestinal', label: 'Sistema Gastrointestinal y Nutrición' },
    { value: 'Sistema Musculoesquelético y Tejido Conectivo', label: 'Sistema Musculoesquelético y Tejido Conectivo' },
    { value: 'Sistema Nervioso y Psiquiatría', label: 'Sistema Nervioso y Psiquiatría' },
    { value: 'Sistema Reproductor y Endocrino', label: 'Sistema Reproductor y Endocrino' },
    { value: 'Hematología y Oncología', label: 'Hematología y Oncología' },
    { value: 'Pediatría (Step 2 CK/3)', label: 'Pediatría (para Step 2 CK / Step 3)' },
    { value: 'Obstetricia y Ginecología (Step 2 CK/3)', label: 'Obstetricia y Ginecología (para Step 2 CK / Step 3)' },
    { value: 'Cirugía (Step 2 CK/3)', label: 'Cirugía (para Step 2 CK / Step 3)' },
    { value: 'Medicina Interna (Step 2 CK/3)', label: 'Medicina Interna (para Step 2 CK / Step 3)' },
    { value: 'Bioestadística y Epidemiología', label: 'Bioestadística y Epidemiología' },
    { value: 'Principios de Manejo del Paciente (Step 3)', label: 'Principios de Manejo del Paciente (para Step 3)' },
    { value: 'Casos CCS (Step 3)', label: 'Casos CCS (Práctica para Step 3)' },
];


const questions: FormQuestionDefinition[] = [
  // Section 1: Perfil y Examen USMLE
  { section: 'section1', id: 'usmleStepToPrep', title: '¿Para qué Step del USMLE te estás preparando?', type: 'radio', options: [{value: 'USMLE Step 1', label: 'USMLE Step 1'}, {value: 'USMLE Step 2 CK', label: 'USMLE Step 2 CK'}, {value: 'USMLE Step 3', label: 'USMLE Step 3'}] },
  { section: 'section1', id: 'medicalGraduateType', title: '¿Eres USMG (Graduado de Medicina en EEUU) o IMG (Graduado Internacional)?', type: 'radio', options: [{value: 'USMG', label: 'USMG'}, {value: 'IMG', label: 'IMG'}] },
  { section: 'section1', id: 'presentedThisStepBefore', title: '¿Has presentado este Step del USMLE antes?', type: 'radio', options: [{value: 'Sí', label: 'Sí'}, {value: 'No', label: 'No'}] },
  { section: 'section1', id: 'previousAttemptExperience', title: 'Si sí, ¿cuál fue tu resultado o experiencia? (Opcional)', type: 'textarea', placeholder: 'Ej: Fallé por poco, necesité más tiempo en X sección...', isOptional: true },
  // Section 2: Tiempo y Recursos
  { section: 'section2', id: 'studyDurationMonths', title: '¿Cuántos meses REALISTAS tienes hasta tu fecha de examen planeada?', type: 'select', options: [{value: '1-3', label: '1-3 meses'}, {value: '4-6', label: '4-6 meses'}, {value: '7-9', label: '7-9 meses'}, {value: '10-12', label: '10-12 meses'}, {value: '12+', label: 'Más de 12 meses'}] },
  { section: 'section2', id: 'studyHoursPerWeek', title: '¿Cuántas horas puedes dedicar al estudio del USMLE por semana?', type: 'select', options: [{value: '10-20', label: '10-20 horas'}, {value: '20-30', label: '20-30 horas'}, {value: '30-40', label: '30-40 horas'}, {value: '40+', label: 'Más de 40 horas'}] },
  { section: 'section2', id: 'mainResources', title: '¿Qué recursos de estudio principales planeas usar o estás usando?', type: 'checkbox', allowMultiple: true, options: usmleResources, helperText: "Selecciona todos los que apliquen." },
  { section: 'section2', id: 'otherResponsibilities', title: '¿Tienes otras responsabilidades significativas (trabajo, rotaciones clínicas)?', type: 'radio', options: [{value: 'Sí', label: 'Sí'}, {value: 'No', label: 'No'}] },
  // Section 3: Fortalezas y Debilidades
  { section: 'section3', id: 'strongSystemsDisciplines', title: '¿En qué sistemas o disciplinas te sientes más fuerte para este Step?', type: 'checkbox', allowMultiple: true, options: usmleSystemsDisciplines, helperText: "Selecciona 2-3 áreas." },
  { section: 'section3', id: 'weakSystemsDisciplines', title: '¿En qué sistemas o disciplinas necesitas reforzar más para este Step?', type: 'checkbox', allowMultiple: true, options: usmleSystemsDisciplines, helperText: "Selecciona 2-3 áreas." },
  { section: 'section3', id: 'qbankFrequency', title: '¿Con qué frecuencia haces preguntas de QBank (ej. UWorld)?', type: 'select', options: [{value: 'Diariamente', label: 'Diariamente'}, {value: 'Varias veces/semana', label: 'Varias veces/semana'}, {value: 'Semanalmente', label: 'Semanalmente'}, {value: 'Ocasionalmente', label: 'Ocasionalmente'}, {value: 'No he empezado', label: 'No he empezado'}]},
  { section: 'section3', id: 'qbankPercentage', title: 'Si has hecho bancos de preguntas, ¿cuál es tu porcentaje de aciertos promedio? (Opcional)', type: 'select', options: [{value: '<40%', label: '<40%'}, {value: '40-50%', label: '40-50%'}, {value: '50-60%', label: '50-60%'}, {value: '60-70%', label: '60-70%'}, {value: '>70%', label: '>70%'}, {value: 'No aplica', label: 'No aplica / Aún no lo mido'}], isOptional: true },
  // Section 4: Simulacros y Estrategia
  { section: 'section4', id: 'takenPracticeExams', title: '¿Has realizado algún examen de práctica completo (NBME, UWSA)?', type: 'radio', options: [{value: 'Sí', label: 'Sí'}, {value: 'No', label: 'No'}] },
  { section: 'section4', id: 'practiceExamScores', title: 'Si sí, ¿cuáles fueron tus puntajes aproximados? (Opcional)', type: 'text', placeholder: 'Ej: NBME 25: 220, UWSA1: 230...', isOptional: true},
  { section: 'section4', id: 'mainDifficultyUsmleQuestions', title: '¿Cuál es tu principal dificultad al enfrentarte a las preguntas tipo USMLE?', type: 'checkbox', allowMultiple: true, options: [{value: 'Interpretación de viñetas', label: 'Interpretación de viñetas (largas/complejas)'}, {value: 'Integración de conceptos multidisciplinarios', label: 'Integración de conceptos multidisciplinarios'}, {value: 'Manejo del tiempo por pregunta/bloque', label: 'Manejo del tiempo por pregunta/bloque'}, {value: 'Fatiga durante el examen', label: 'Fatiga durante el examen'}, {value: 'Identificar el "siguiente mejor paso" (Step 2/3)', label: 'Identificar el "siguiente mejor paso" (Step 2/3)'}, {value: 'Otro', label: 'Otro'}]},
  { section: 'section4', id: 'preferredStudyEnvironment', title: '¿Qué tipo de entorno de estudio prefieres?', type: 'select', options: [{value: 'Silencioso/Individual', label: 'Silencioso/Individual'}, {value: 'Grupo de estudio', label: 'Grupo de estudio (presencial/virtual)'}, {value: 'Biblioteca', label: 'Biblioteca'}, {value: 'En casa', label: 'En casa'}]},
  // Section 5: Objetivos y Motivación
  { section: 'section5', id: 'targetScore', title: '¿Cuál es tu puntaje objetivo para este Step?', type: 'text', placeholder: 'Ej: Pass, 240-250, >250...' },
  { section: 'section5', id: 'interestedSpecialties', title: '¿Qué especialidad(es) te interesan (si aplica)? (Opcional)', type: 'text', placeholder: 'Ej: Internal Medicine, Surgery, Pediatrics...', isOptional: true },
  { section: 'section5', id: 'motivation', title: 'Finalmente, ¿qué te motiva a superar este Step del USMLE?', type: 'textarea', placeholder: 'Una breve reflexión personal sobre tus metas...' },
];

const defaultUsmleAnswers: UsmleXpFormAnswers = {
  section1: { usmleStepToPrep: 'USMLE Step 1', medicalGraduateType: 'IMG', presentedThisStepBefore: 'No', previousAttemptExperience: '' },
  section2: { studyDurationMonths: '4-6', studyHoursPerWeek: '20-30', mainResources: [], otherResponsibilities: 'No' },
  section3: { strongSystemsDisciplines: [], weakSystemsDisciplines: [], qbankFrequency: 'Ocasionalmente', qbankPercentage: undefined },
  section4: { takenPracticeExams: 'No', practiceExamScores: '', mainDifficultyUsmleQuestions: [], preferredStudyEnvironment: 'En casa' },
  section5: { targetScore: 'Pass', interestedSpecialties: '', motivation: '' },
};

const getInitialFormState = (initial?: Partial<UsmleXpFormAnswers>): UsmleXpFormAnswers => {
  const defaultsCopy = JSON.parse(JSON.stringify(defaultUsmleAnswers));
  if (!initial || Object.keys(initial).length === 0) {
    return defaultsCopy;
  }
  const merged = defaultsCopy;
  (Object.keys(initial) as Array<keyof UsmleXpFormAnswers>).forEach(sectionKey => {
    if (initial[sectionKey] && typeof initial[sectionKey] === 'object') {
      merged[sectionKey] = { ...merged[sectionKey], ...initial[sectionKey] };
    }
  });
  return merged;
};

const UsmlePrepFormXp: React.FC<UsmlePrepFormXpProps> = ({ onFormComplete, initialData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UsmleXpFormAnswers>(() => getInitialFormState(initialData));
  const [animationClass, setAnimationClass] = useState('animate-fade-in-up');

  const currentQuestionDef = questions[currentQuestionIndex];

  const handleAnswerChange = (value: any) => {
    setAnswers(prev => {
      const newAnswers = JSON.parse(JSON.stringify(prev));
      (newAnswers[currentQuestionDef.section] as any)[currentQuestionDef.id as any] = value;
      return newAnswers;
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setAnimationClass('animate-[slideOutLeft_0.3s_ease-out_forwards]');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnimationClass('animate-[slideInRight_0.3s_ease-out_forwards]');
      }, 300);
    } else {
      onFormComplete(answers as UsmleXpFormAnswers);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setAnimationClass('animate-[slideOutRight_0.3s_ease-out_forwards]');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev - 1);
        setAnimationClass('animate-[slideInLeft_0.3s_ease-out_forwards]');
      }, 300);
    }
  };
  
  const currentAnswer = (answers[currentQuestionDef.section] as any)[currentQuestionDef.id as any];
  
  let isNextDisabled = false;
  if (!currentQuestionDef.isOptional) {
    if (currentAnswer === undefined || currentAnswer === null) {
      isNextDisabled = true;
    } else if (Array.isArray(currentAnswer) && currentAnswer.length === 0) {
      isNextDisabled = true;
    } else if (typeof currentAnswer === 'string' && currentAnswer.trim() === '') {
      isNextDisabled = true;
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <ProgressIndicator currentStep={currentQuestionIndex + 1} totalSteps={questions.length} />
      <div className={`w-full max-w-2xl ${animationClass}`}>
        <FullScreenQuestionLayout
          key={currentQuestionDef.section + '.' + currentQuestionDef.id}
          question={currentQuestionDef.title}
          questionType={currentQuestionDef.type}
          options={currentQuestionDef.options}
          allowMultiple={currentQuestionDef.allowMultiple}
          currentAnswer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          onNext={nextQuestion}
          onBack={prevQuestion}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === questions.length - 1}
          isNextDisabled={isNextDisabled}
          placeholder={currentQuestionDef.placeholder}
          helperText={currentQuestionDef.helperText}
        />
      </div>
    </div>
  );
};

export default UsmlePrepFormXp;