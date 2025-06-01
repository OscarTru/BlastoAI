import React, { useState, useEffect } from 'react';
import FullScreenQuestionLayout, { QuestionOption } from '../enarm-prep/FullScreenQuestionLayout';
import ProgressIndicator from '../enarm-prep/ProgressIndicator';
import { PlabXpFormAnswers, PlabXpSection1Answers, PlabXpSection2Answers, PlabXpSection3Answers, PlabXpSection4Answers, PlabXpSection5Answers } from '../../types';

interface PlabPrepFormXpProps {
  onFormComplete: (answers: PlabXpFormAnswers) => void;
  initialData?: Partial<PlabXpFormAnswers>;
}

type SectionKey = keyof PlabXpFormAnswers;

interface FormQuestionDefinition {
  id: keyof PlabXpSection1Answers | keyof PlabXpSection2Answers | keyof PlabXpSection3Answers | keyof PlabXpSection4Answers | keyof PlabXpSection5Answers;
  section: SectionKey;
  title: string;
  type: 'radio' | 'checkbox' | 'select' | 'text' | 'textarea' | 'date';
  options?: QuestionOption[];
  placeholder?: string;
  allowMultiple?: boolean;
  isOptional?: boolean;
  helperText?: string;
  dependsOnPart?: 'PLAB Part 1' | 'PLAB Part 2'; // For questions specific to a part
}

const plabPart1Areas = [
    { value: 'Anatomía', label: 'Anatomía Aplicada' },
    { value: 'Fisiología', label: 'Fisiología Aplicada' },
    { value: 'Farmacología', label: 'Farmacología y Terapéutica' },
    { value: 'Patología', label: 'Patología Aplicada' },
    { value: 'Microbiología', label: 'Microbiología Aplicada' },
    { value: 'Ética y Leyes (UK)', label: 'Ética y Leyes Médicas del Reino Unido' },
    { value: 'Condiciones Comunes', label: 'Manejo de Condiciones Comunes' },
    { value: 'Emergencias Médicas', label: 'Manejo de Emergencias Médicas' },
];

const plabPart2Stations = [
    { value: 'Historia Clínica', label: 'Toma de Historia Clínica' },
    { value: 'Examen Físico', label: 'Examen Físico (maniquíes/simulado)' },
    { value: 'Habilidades de Comunicación', label: 'Habilidades de Comunicación (con pacientes/colegas)' },
    { value: 'Procedimientos Prácticos', label: 'Procedimientos Prácticos (simulados)' },
    { value: 'Enseñanza/Explicación', label: 'Enseñanza o Explicación a Pacientes/Colegas' },
    { value: 'Escenarios Éticos', label: 'Discusión de Escenarios Éticos (GMC)' },
    { value: 'Interpretación de Datos', label: 'Interpretación de Datos (labs, ECG, rayos X)' },
];

const plabResources = [
    { value: 'Plabable', label: 'Plabable QBank & Mocks' },
    { value: 'PlabKeys', label: 'PlabKeys Notes & Videos' },
    { value: 'GMC Good Medical Practice', label: 'GMC Good Medical Practice guidance' },
    { value: 'Oxford Handbooks', label: 'Oxford Handbooks (Clinical Medicine, etc.)' },
    { value: 'NICE Guidelines', label: 'NICE Guidelines (UK)' },
    { value: 'BMJ Best Practice', label: 'BMJ Best Practice / UpToDate' },
    { value: 'MedRevisions', label: 'MedRevisions' },
    { value: 'Anki (PLAB decks)', label: 'Anki (PLAB specific decks)' },
    { value: 'Otro', label: 'Otro recurso principal' },
];

const questions: FormQuestionDefinition[] = [
  // Section 1: Perfil y Experiencia PLAB
  { section: 'section1', id: 'plabPartToPrep', title: '¿Para qué parte del PLAB te estás preparando?', type: 'radio', options: [{value: 'PLAB Part 1', label: 'PLAB Part 1'}, {value: 'PLAB Part 2', label: 'PLAB Part 2'}] },
  { section: 'section1', id: 'imgStatus', title: '¿Eres un International Medical Graduate (IMG)?', type: 'radio', options: [{value: 'Sí', label: 'Sí'}, {value: 'No', label: 'No (Soy elegible por otra vía)'}] },
  { section: 'section1', id: 'englishProficiency', title: '¿Cuál es tu nivel de inglés (IELTS/OET si lo tienes)? (Opcional)', type: 'text', placeholder: 'Ej: IELTS 7.5 (Overall), OET B (todas las secciones)', isOptional: true },
  { section: 'section1', id: 'presentedThisPartBefore', title: '¿Has presentado esta parte del PLAB antes?', type: 'radio', options: [{value: 'Sí', label: 'Sí'}, {value: 'No', label: 'No'}] },
  { section: 'section1', id: 'previousAttemptExperience', title: 'Si sí, ¿cuál fue tu experiencia o resultado? (Opcional)', type: 'textarea', placeholder: 'Ej: Fallé por poco en Part 1, encontré X difícil en Part 2...', isOptional: true },
  // Section 2: Disponibilidad y Recursos
  { section: 'section2', id: 'studyDurationMonths', title: '¿Cuántos meses REALISTAS tienes hasta tu fecha de examen PLAB?', type: 'select', options: [{value: '1-2', label: '1-2 meses'}, {value: '3-4', label: '3-4 meses'}, {value: '5-6', label: '5-6 meses'}, {value: '6+', label: 'Más de 6 meses'}] },
  { section: 'section2', id: 'studyHoursPerWeek', title: '¿Cuántas horas puedes dedicar al estudio del PLAB por semana?', type: 'select', options: [{value: '10-15', label: '10-15 horas'}, {value: '15-25', label: '15-25 horas'}, {value: '25-35', label: '25-35 horas'}, {value: '35+', label: 'Más de 35 horas'}] },
  { section: 'section2', id: 'mainResources', title: '¿Qué recursos de estudio principales planeas usar o estás usando?', type: 'checkbox', allowMultiple: true, options: plabResources, helperText: "Selecciona todos los que apliquen." },
  { section: 'section2', id: 'ukClinicalExperience', title: '¿Tienes experiencia clínica previa en el Reino Unido (NHS)?', type: 'radio', options: [{value: 'Sí, considerable', label: 'Sí, considerable (ej. observador, prácticas)'}, {value: 'Sí, limitada', label: 'Sí, limitada (ej. corta estancia)'}, {value: 'No', label: 'No, ninguna'}] },
  // Section 3: Áreas de Enfoque
  { section: 'section3', id: 'strongAreasPlab1', title: '¿En qué áreas del blueprint del PLAB Part 1 te sientes más fuerte?', type: 'checkbox', allowMultiple: true, options: plabPart1Areas, helperText: "Selecciona 2-3 áreas (si aplica para Part 1).", dependsOnPart: 'PLAB Part 1', isOptional: true },
  { section: 'section3', id: 'weakAreasPlab1', title: '¿En qué áreas del blueprint del PLAB Part 1 necesitas reforzar más?', type: 'checkbox', allowMultiple: true, options: plabPart1Areas, helperText: "Selecciona 2-3 áreas (si aplica para Part 1).", dependsOnPart: 'PLAB Part 1', isOptional: true },
  { section: 'section3', id: 'strongSkillsPlab2', title: '¿En qué tipo de estaciones OSCE (PLAB Part 2) te sientes más fuerte?', type: 'checkbox', allowMultiple: true, options: plabPart2Stations, helperText: "Selecciona 2-3 habilidades (si aplica para Part 2).", dependsOnPart: 'PLAB Part 2', isOptional: true },
  { section: 'section3', id: 'weakSkillsPlab2', title: '¿En qué tipo de estaciones OSCE (PLAB Part 2) necesitas más práctica?', type: 'checkbox', allowMultiple: true, options: plabPart2Stations, helperText: "Selecciona 2-3 habilidades (si aplica para Part 2).", dependsOnPart: 'PLAB Part 2', isOptional: true },
  { section: 'section3', id: 'generalKnowledgeAreas', title: '¿Qué áreas generales de conocimiento médico son tu prioridad de estudio?', type: 'checkbox', allowMultiple: true, options: [ {value: 'Condiciones médicas comunes', label:'Condiciones médicas comunes'}, {value:'Manejo de emergencias', label:'Manejo de emergencias'}, {value:'Ética médica y profesionalismo (GMC)', label:'Ética médica y profesionalismo (GMC)'}, {value:'Comunicación con pacientes y colegas', label:'Comunicación con pacientes y colegas'} ], helperText: "Selecciona las más relevantes para tu examen." },
  { section: 'section3', id: 'practiceMethod', title: '¿Cómo prefieres practicar para el examen?', type: 'select', options: [{value: 'Solo', label: 'Principalmente solo/a'}, {value: 'Con compañeros', label: 'Con compañeros de estudio'}, {value: 'Cursos de preparación', label: 'Cursos de preparación (online/presencial)'}, {value: 'Combinado', label: 'Una combinación de métodos'}] },
  // Section 4: Simulacros y Desafíos
  { section: 'section4', id: 'mockScoresPlab1', title: 'Si preparas Part 1, ¿has realizado mocks/simulacros? ¿Resultados? (Opcional)', type: 'text', placeholder: 'Ej: Plabable mocks: 70%, o "Aún no"', isOptional: true, dependsOnPart: 'PLAB Part 1' },
  { section: 'section4', id: 'osceConfidencePlab2', title: 'Si preparas Part 2, ¿cómo es tu confianza en las estaciones OSCE? (Opcional)', type: 'select', options: [{value: 'Alta', label: 'Alta'}, {value: 'Media', label: 'Media'}, {value: 'Baja', label: 'Baja'}, {value: 'No aplica', label: 'No aplica (preparando Part 1)'}], isOptional: true, dependsOnPart: 'PLAB Part 2' },
  { section: 'section4', id: 'mainChallenges', title: '¿Cuáles consideras tus principales desafíos para este examen PLAB?', type: 'textarea', placeholder: 'Ej: Adaptarme al estilo de preguntas del UK, manejo del tiempo, nervios...' },
  { section: 'section4', id: 'knowledgeGapsUkSystem', title: '¿Hay alguna brecha de conocimiento específica sobre el NHS o guías GMC que te preocupe? (Opcional)', type: 'textarea', placeholder: 'Ej: Entender las vías de referencia, consentimiento informado en UK...', isOptional: true },
  // Section 5: Objetivos y Motivación
  { section: 'section5', id: 'reasonForPlab', title: '¿Por qué deseas obtener el registro GMC y trabajar en el Reino Unido?', type: 'textarea', placeholder: 'Describe tus principales razones y aspiraciones...' },
  { section: 'section5', id: 'targetSpecialtyUk', title: '¿Tienes alguna especialidad en mente para tu futuro en el Reino Unido? (Opcional)', type: 'text', placeholder: 'Ej: GP, Acute Medicine, Pediatrics...', isOptional: true },
  { section: 'section5', id: 'timelineAfterPlab', title: '¿Cuál es tu plan o timeline aproximado después de aprobar el PLAB? (Opcional)', type: 'text', placeholder: 'Ej: Buscar Foundation Year, aplicar a training posts...', isOptional: true },
  { section: 'section5', id: 'motivation', title: 'Finalmente, ¿qué te motiva a seguir adelante con el proceso PLAB?', type: 'textarea', placeholder: 'Una breve reflexión personal sobre tu impulso...' },
];

const defaultPlabAnswers: PlabXpFormAnswers = {
  section1: { plabPartToPrep: 'PLAB Part 1', imgStatus: 'Sí', englishProficiency: '', presentedThisPartBefore: 'No', previousAttemptExperience: '' },
  section2: { studyDurationMonths: '3-4', studyHoursPerWeek: '15-25', mainResources: [], ukClinicalExperience: 'No' },
  section3: { strongAreasPlab1: [], weakAreasPlab1: [], strongSkillsPlab2: [], weakSkillsPlab2: [], generalKnowledgeAreas: [], practiceMethod: 'Combinado' },
  section4: { mockScoresPlab1: '', osceConfidencePlab2: 'No aplica', mainChallenges: '', knowledgeGapsUkSystem: '' },
  section5: { reasonForPlab: '', targetSpecialtyUk: '', timelineAfterPlab: '', motivation: '' },
};

const getInitialFormState = (initial?: Partial<PlabXpFormAnswers>): PlabXpFormAnswers => {
  const defaultsCopy = JSON.parse(JSON.stringify(defaultPlabAnswers));
  if (!initial || Object.keys(initial).length === 0) {
    return defaultsCopy;
  }
  const merged = defaultsCopy;
  (Object.keys(initial) as Array<keyof PlabXpFormAnswers>).forEach(sectionKey => {
    if (initial[sectionKey] && typeof initial[sectionKey] === 'object') {
      merged[sectionKey] = { ...merged[sectionKey], ...initial[sectionKey] };
    }
  });
  return merged;
};

const PlabPrepFormXp: React.FC<PlabPrepFormXpProps> = ({ onFormComplete, initialData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<PlabXpFormAnswers>(() => getInitialFormState(initialData));
  const [animationClass, setAnimationClass] = useState('animate-fade-in-up');

  const selectedPlabPart = answers.section1.plabPartToPrep;

  const visibleQuestions = questions.filter(q => {
    if (!q.dependsOnPart) return true;
    return q.dependsOnPart === selectedPlabPart;
  });
  
  const currentQuestionDef = visibleQuestions[currentQuestionIndex];

  useEffect(() => {
    // Reset index if it goes out of bounds due to part change
    if (currentQuestionIndex >= visibleQuestions.length && visibleQuestions.length > 0) {
        setCurrentQuestionIndex(visibleQuestions.length - 1);
    } else if (visibleQuestions.length === 0 && currentQuestionIndex !== 0) {
        // This case should ideally not happen if form logic is correct
        setCurrentQuestionIndex(0); 
    }
  }, [selectedPlabPart, currentQuestionIndex, visibleQuestions.length]);


  const handleAnswerChange = (value: any) => {
    setAnswers(prev => {
      const newAnswers = JSON.parse(JSON.stringify(prev));
      // If changing PLAB part, reset dependent answers to avoid keeping irrelevant data
      if (currentQuestionDef.id === 'plabPartToPrep' && prev.section1.plabPartToPrep !== value) {
        newAnswers.section3.strongAreasPlab1 = [];
        newAnswers.section3.weakAreasPlab1 = [];
        newAnswers.section3.strongSkillsPlab2 = [];
        newAnswers.section3.weakSkillsPlab2 = [];
        newAnswers.section4.mockScoresPlab1 = '';
        newAnswers.section4.osceConfidencePlab2 = 'No aplica';
      }
      (newAnswers[currentQuestionDef.section] as any)[currentQuestionDef.id as any] = value;
      return newAnswers;
    });
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < visibleQuestions.length - 1) {
      setAnimationClass('animate-[slideOutLeft_0.3s_ease-out_forwards]');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setAnimationClass('animate-[slideInRight_0.3s_ease-out_forwards]');
      }, 300);
    } else {
      onFormComplete(answers as PlabXpFormAnswers);
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
  
  const currentAnswer = currentQuestionDef ? (answers[currentQuestionDef.section] as any)[currentQuestionDef.id as any] : undefined;
  
  let isNextDisabled = false;
  if (currentQuestionDef && !currentQuestionDef.isOptional) {
    if (currentAnswer === undefined || currentAnswer === null) {
      isNextDisabled = true;
    } else if (Array.isArray(currentAnswer) && currentAnswer.length === 0) {
      isNextDisabled = true;
    } else if (typeof currentAnswer === 'string' && currentAnswer.trim() === '') {
      isNextDisabled = true;
    }
  }
  
  if (!currentQuestionDef) { // Handles edge case where currentQuestionDef might be undefined temporarily
    return <div className="w-full h-full flex items-center justify-center"><ProgressIndicator currentStep={0} totalSteps={questions.length} /></div>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative">
      <ProgressIndicator currentStep={currentQuestionIndex + 1} totalSteps={visibleQuestions.length} />
      <div className={`w-full max-w-2xl ${animationClass}`}>
        <FullScreenQuestionLayout
          key={currentQuestionDef.section + '.' + currentQuestionDef.id + selectedPlabPart} // Add selectedPlabPart to key
          question={currentQuestionDef.title}
          questionType={currentQuestionDef.type}
          options={currentQuestionDef.options}
          allowMultiple={currentQuestionDef.allowMultiple}
          currentAnswer={currentAnswer}
          onAnswerChange={handleAnswerChange}
          onNext={nextQuestion}
          onBack={prevQuestion}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === visibleQuestions.length - 1}
          isNextDisabled={isNextDisabled}
          placeholder={currentQuestionDef.placeholder}
          helperText={currentQuestionDef.helperText}
        />
      </div>
    </div>
  );
};

export default PlabPrepFormXp;