import React, { useState, useEffect } from 'react';
import FullScreenQuestionLayout, { QuestionOption } from './FullScreenQuestionLayout';
import ProgressIndicator from './ProgressIndicator';
import { EnarmXpFormAnswers, EnarmXpSection1Answers, EnarmXpSection2Answers, EnarmXpSection3Answers, EnarmXpSection4Answers, EnarmXpSection5Answers } from '../../types';

interface EnarmPrepFormXpProps {
  onFormComplete: (answers: EnarmXpFormAnswers) => void;
  initialData?: Partial<EnarmXpFormAnswers>; // Changed to Partial
}

type SectionKey = keyof EnarmXpFormAnswers;

interface FormQuestionDefinition {
  id: keyof EnarmXpSection1Answers | keyof EnarmXpSection2Answers | keyof EnarmXpSection3Answers | keyof EnarmXpSection4Answers | keyof EnarmXpSection5Answers;
  section: SectionKey;
  title: string;
  type: 'radio' | 'checkbox' | 'select' | 'text' | 'textarea' | 'date';
  options?: QuestionOption[];
  placeholder?: string;
  allowMultiple?: boolean;
  isOptional?: boolean;
  helperText?: string;
}

const questions: FormQuestionDefinition[] = [
  // Section 1: Perfil académico
  { section: 'section1', id: 'presentedBefore', title: '¿Has presentado antes el ENARM?', type: 'radio', options: [{ value: 'Sí', label: 'Sí' }, { value: 'No', label: 'No' }] },
  { section: 'section1', id: 'previousResults', title: '¿Cuáles fueron tus resultados anteriores? (Opcional)', type: 'textarea', placeholder: 'Describe tu puntaje, áreas fuertes/débiles si recuerdas...', isOptional: true },
  { section: 'section1', id: 'strongAreas', title: '¿En qué áreas médicas te sientes más fuerte actualmente?', type: 'checkbox', allowMultiple: true, options: [ { value: 'Cardiología', label: 'Cardiología' }, { value: 'Pediatría', label: 'Pediatría' }, { value: 'Ginecología', label: 'Ginecología y Obstetricia' }, { value: 'Cirugía', label: 'Cirugía General' }, { value: 'Medicina Interna', label: 'Medicina Interna' }, { value: 'Salud Pública', label: 'Salud Pública' } ], helperText: "Selecciona 2-3 áreas principales." },
  { section: 'section1', id: 'weakAreas', title: '¿En qué materias tienes más dudas o necesitas reforzar?', type: 'checkbox', allowMultiple: true, options: [ { value: 'Cardiología', label: 'Cardiología' }, { value: 'Pediatría', label: 'Pediatría' }, { value: 'Ginecología', label: 'Ginecología y Obstetricia' }, { value: 'Cirugía', label: 'Cirugía General' }, { value: 'Medicina Interna', label: 'Medicina Interna' }, { value: 'Salud Pública', label: 'Salud Pública' } ], helperText: "Selecciona 2-3 áreas principales." },
  // Section 2: Tiempo disponible
  { section: 'section2', id: 'studyHoursPerDay', title: '¿Cuántas horas REALISTAS puedes estudiar al día?', type: 'select', options: [{value: '1-2', label: '1-2 horas'}, {value: '2-3', label: '2-3 horas'}, {value: '3-4', label: '3-4 horas'}, {value: '4+', label: 'Más de 4 horas'}] },
  { section: 'section2', id: 'hasJobOrResponsibilities', title: '¿Tienes trabajo u otras responsabilidades importantes?', type: 'radio', options: [{ value: 'Sí', label: 'Sí' }, { value: 'No', label: 'No' }] },
  { section: 'section2', id: 'preferredStudyTime', title: '¿En qué horario prefieres estudiar?', type: 'select', options: [{value: 'Mañana', label: 'Mañana'}, {value: 'Tarde', label: 'Tarde'}, {value: 'Noche', label: 'Noche'}, {value: 'Indiferente', label: 'Indiferente/Flexible'}] },
  { section: 'section2', id: 'studyDeadline', title: '¿Qué fecha tienes en mente como tope para estudiar o presentar?', type: 'date', placeholder: 'Selecciona una fecha' },
  // Section 3: Método de aprendizaje
  { section: 'section3', id: 'learningMethods', title: '¿Qué te funciona MEJOR para estudiar y aprender?', type: 'checkbox', allowMultiple: true, options: [{value: 'Lectura de textos/guías', label: 'Lectura de textos/guías'}, {value: 'Videoclases', label: 'Videoclases'}, {value: 'Resolver preguntas (QBanks)', label: 'Resolver preguntas (QBanks)'}, {value: 'Crear esquemas/diagramas', label: 'Crear esquemas/diagramas'}, {value: 'Grupos de estudio', label: 'Grupos de estudio'}, {value: 'Otro', label: 'Otro'}]},
  { section: 'section3', id: 'usesLearningTools', title: '¿Usas herramientas como flashcards, resúmenes o mapas mentales?', type: 'checkbox', allowMultiple: true, options: [{value: 'Flashcards (Anki, etc.)', label: 'Flashcards (Anki, etc.)'}, {value: 'Resúmenes propios', label: 'Resúmenes propios'}, {value: 'Mapas mentales', label: 'Mapas mentales'}, {value: 'No uso herramientas específicas', label: 'No uso herramientas específicas'}]},
  { section: 'section3', id: 'consistentWithReview', title: '¿Eres constante con el repaso de temas ya estudiados?', type: 'radio', options: [{ value: 'Sí', label: 'Sí, repaso regularmente' }, { value: 'A veces', label: 'A veces, podría mejorar' }, { value: 'No', label: 'No, me cuesta repasar' }]},
  { section: 'section3', id: 'disciplineLevel', title: '¿Qué tan disciplinado/a te consideras con los planes de estudio?', type: 'select', options: [{value: 'Muy disciplinado', label: 'Muy disciplinado/a, cumplo casi siempre'}, {value: 'Disciplinado', label: 'Disciplinado/a, cumplo la mayoría de las veces'}, {value: 'Poco disciplinado', label: 'Poco disciplinado/a, me cuesta seguirlo'}, {value: 'Necesito mejorar mucho', label: 'Necesito mejorar mucho mi disciplina'}]},
  // Section 4: Resolución de preguntas
  { section: 'section4', id: 'currentCorrectnessPercentage', title: '¿Qué porcentaje de aciertos tienes actualmente en simuladores (aproximado)?', type: 'select', options: [{value: '<40%', label: 'Menos de 40%'}, {value: '40-50%', label: '40-50%'}, {value: '50-60%', label: '50-60%'}, {value: '60-70%', label: '60-70%'}, {value: '>70%', label: 'Más de 70%'}, {value: 'No sé', label: 'Aún no lo mido'} ], isOptional: true},
  { section: 'section4', id: 'failurePoints', title: '¿Dónde sueles fallar más en las preguntas?', type: 'checkbox', allowMultiple: true, options: [{value: 'Falta de conocimiento específico', label: 'Falta de conocimiento específico'}, {value: 'Error en razonamiento clínico', label: 'Error en razonamiento clínico'}, {value: 'Manejo del tiempo/ansiedad', label: 'Manejo del tiempo/ansiedad'}, {value: 'Confusión entre opciones similares', label: 'Confusión entre opciones similares'}, {value: 'Otro', label: 'Otro'}]},
  { section: 'section4', id: 'usesSimulators', title: '¿Usas simuladores tipo ENARM? ¿Cuáles o con qué frecuencia?', type: 'text', placeholder: 'Ej: Examenes.com semanal, PROEDUMED, ninguno aún...', isOptional: true},
  { section: 'section4', id: 'caseQuestionFrequency', title: '¿Con qué frecuencia haces preguntas tipo caso clínico?', type: 'select', options: [{value: 'Diariamente', label: 'Diariamente'}, {value: 'Varias veces/semana', label: 'Varias veces por semana'}, {value: 'Semanalmente', label: 'Semanalmente'}, {value: 'Ocasionalmente', label: 'Ocasionalmente'}, {value: 'Raramente', label: 'Raramente'}]},
  // Section 5: Objetivo personal
  { section: 'section5', id: 'targetSpecialty', title: '¿Por qué especialidad(es) te gustaría competir?', type: 'text', placeholder: 'Ej: Cardiología, Pediatría...' },
  { section: 'section5', id: 'targetInstitution', title: '¿Tienes alguna sede o institución deseada? (Opcional)', type: 'text', placeholder: 'Ej: IMSS Siglo XXI, Nutrición...', isOptional: true },
  { section: 'section5', id: 'targetScoreGoal', title: '¿Tienes un puntaje meta para el ENARM? (Opcional)', type: 'text', placeholder: 'Ej: 75+, el necesario para mi especialidad...', isOptional: true },
  { section: 'section5', id: 'motivation', title: 'Finalmente, ¿qué te motiva a estudiar medicina y buscar esta especialidad hoy?', type: 'textarea', placeholder: 'Una breve reflexión personal...' },
];

const defaultAnswers: EnarmXpFormAnswers = {
  section1: { presentedBefore: 'No', strongAreas: [], weakAreas: [] },
  section2: { studyHoursPerDay: '2-3', hasJobOrResponsibilities: 'No', preferredStudyTime: 'Indiferente', studyDeadline: '' },
  section3: { learningMethods: [], usesLearningTools: [], consistentWithReview: 'A veces', disciplineLevel: 'Disciplinado' },
  section4: { currentCorrectnessPercentage: undefined, failurePoints: [], usesSimulators: undefined, caseQuestionFrequency: 'Semanalmente' },
  section5: { targetSpecialty: '', targetInstitution: undefined, targetScoreGoal: undefined, motivation: '' },
};

const getInitialFormState = (initial?: Partial<EnarmXpFormAnswers>): EnarmXpFormAnswers => {
  const defaultsCopy = JSON.parse(JSON.stringify(defaultAnswers)); // Deep copy defaultAnswers
  if (!initial || Object.keys(initial).length === 0) {
    return defaultsCopy;
  }

  const merged = defaultsCopy;
    (Object.keys(initial) as Array<keyof EnarmXpFormAnswers>).forEach(sectionKey => {
        if (initial[sectionKey] && typeof initial[sectionKey] === 'object') { // Check if section exists and is an object
            merged[sectionKey] = { ...merged[sectionKey], ...initial[sectionKey] };
        }
    });
  return merged;
};


const EnarmPrepFormXp: React.FC<EnarmPrepFormXpProps> = ({ onFormComplete, initialData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<EnarmXpFormAnswers>(() => getInitialFormState(initialData));
  const [animationClass, setAnimationClass] = useState('animate-fade-in-up');

  const currentQuestionDef = questions[currentQuestionIndex];

  const handleAnswerChange = (value: any) => {
    setAnswers(prev => {
      const newAnswers = JSON.parse(JSON.stringify(prev)); // Deep copy
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
      onFormComplete(answers as EnarmXpFormAnswers);
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
  
  // Ensure animations are defined (already in index.html)

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

export default EnarmPrepFormXp;