import React, { useState, useEffect } from 'react';
import FullScreenQuestionLayout, { QuestionOption } from '../enarm-prep/FullScreenQuestionLayout';
import ProgressIndicator from '../enarm-prep/ProgressIndicator';
import { MirXpFormAnswers, MirXpSection1Answers, MirXpSection2Answers, MirXpSection3Answers, MirXpSection4Answers, MirXpSection5Answers } from '../../types';

interface MirPrepFormXpProps {
  onFormComplete: (answers: MirXpFormAnswers) => void;
  initialData?: Partial<MirXpFormAnswers>;
}

type SectionKey = keyof MirXpFormAnswers;

interface FormQuestionDefinition {
  id: keyof MirXpSection1Answers | keyof MirXpSection2Answers | keyof MirXpSection3Answers | keyof MirXpSection4Answers | keyof MirXpSection5Answers;
  section: SectionKey;
  title: string;
  type: 'radio' | 'checkbox' | 'select' | 'text' | 'textarea' | 'date';
  options?: QuestionOption[];
  placeholder?: string;
  allowMultiple?: boolean;
  isOptional?: boolean;
  helperText?: string;
}

const mirSubjects = [
    { value: 'Cardiología', label: 'Cardiología' },
    { value: 'Neumología', label: 'Neumología' },
    { value: 'Digestivo', label: 'Digestivo' },
    { value: 'Nefrología', label: 'Nefrología' },
    { value: 'Endocrinología', label: 'Endocrinología y Nutrición' },
    { value: 'Reumatología', label: 'Reumatología' },
    { value: 'Infecciosas', label: 'Enfermedades Infecciosas' },
    { value: 'Hematología', label: 'Hematología y Hemoterapia' },
    { value: 'Neurología', label: 'Neurología' },
    { value: 'Psiquiatría', label: 'Psiquiatría' },
    { value: 'Dermatología', label: 'Dermatología' },
    { value: 'Ginecología y Obstetricia', label: 'Ginecología y Obstetricia' },
    { value: 'Pediatría', label: 'Pediatría' },
    { value: 'Cirugía General', label: 'Cirugía General y del Aparato Digestivo' },
    { value: 'Traumatología', label: 'Cirugía Ortopédica y Traumatología' },
    { value: 'Oftalmología', label: 'Oftalmología' },
    { value: 'Otorrinolaringología', label: 'Otorrinolaringología' },
    { value: 'Estadística y Epidemiología', label: 'Estadística y Epidemiología' },
    { value: 'Medicina Preventiva y Salud Pública', label: 'Medicina Preventiva y Salud Pública' },
    { value: 'Farmacología', label: 'Farmacología Clínica' },
    { value: 'Geriatría', label: 'Geriatría' },
    { value: 'Radiología', label: 'Radiodiagnóstico (Imágenes)' },
];


const questions: FormQuestionDefinition[] = [
  // Section 1: Perfil y Experiencia MIR
  { section: 'section1', id: 'presentedBefore', title: '¿Has presentado antes el MIR?', type: 'radio', options: [{ value: 'Sí', label: 'Sí' }, { value: 'No', label: 'No' }] },
  { section: 'section1', id: 'previousResults', title: 'Si sí, ¿cuál fue tu número de orden aproximado o tu experiencia? (Opcional)', type: 'textarea', placeholder: 'Ej: Aprox. 5000, me faltó repasar infecciosas...', isOptional: true },
  { section: 'section1', id: 'strongAreas', title: '¿En qué áreas del temario MIR te sientes más fuerte?', type: 'checkbox', allowMultiple: true, options: mirSubjects, helperText: "Selecciona 2-3 áreas principales." },
  { section: 'section1', id: 'weakAreas', title: '¿En qué áreas del temario MIR tienes más dudas o necesitas reforzar más?', type: 'checkbox', allowMultiple: true, options: mirSubjects, helperText: "Selecciona 2-3 áreas principales." },
  // Section 2: Disponibilidad y Entorno de Estudio
  { section: 'section2', id: 'studyHoursPerDay', title: '¿Cuántas horas REALISTAS puedes dedicar al estudio del MIR al día?', type: 'select', options: [{value: '1-3', label: '1-3 horas'}, {value: '4-6', label: '4-6 horas'}, {value: '7-9', label: '7-9 horas'}, {value: '10+', label: '10+ horas'}] },
  { section: 'section2', id: 'hasJobOrResponsibilities', title: '¿Estás trabajando o tienes otras responsabilidades significativas?', type: 'radio', options: [{ value: 'Sí', label: 'Sí' }, { value: 'No', label: 'No' }] },
  { section: 'section2', id: 'preferredStudyTime', title: '¿Cuál es tu horario de estudio preferido?', type: 'select', options: [{value: 'Mañana', label: 'Mañana'}, {value: 'Tarde', label: 'Tarde'}, {value: 'Noche', label: 'Noche'}, {value: 'Flexible', label: 'Flexible'}] },
  { section: 'section2', id: 'studyDeadline', title: '¿Para qué convocatoria del MIR te preparas (año)? o ¿Fecha objetivo para estar listo/a?', type: 'date', placeholder: 'Selecciona una fecha' },
  // Section 3: Estrategia de Aprendizaje para el MIR
  { section: 'section3', id: 'learningMethods', title: '¿Qué métodos de estudio te han funcionado mejor para el MIR o exámenes similares?', type: 'checkbox', allowMultiple: true, options: [{value: 'Clases de academia', label: 'Clases de academia'}, {value: 'Manuales MIR (CTO, AMIR, etc.)', label: 'Manuales MIR (CTO, AMIR, etc.)'}, {value: 'Test online/apps', label: 'Test online/apps'}, {value: 'Hacer resúmenes/esquemas propios', label: 'Hacer resúmenes/esquemas propios'}, {value: 'Flashcards (Anki, etc.)', label: 'Flashcards (Anki, etc.)'}, {value: 'Otro', label: 'Otro'}]},
  { section: 'section3', id: 'specificPlatform', title: '¿Utilizas alguna plataforma o academia específica para el MIR? (Opcional)', type: 'text', placeholder: 'Ej: AMIR, CTO, PROMIR...', isOptional: true },
  { section: 'section3', id: 'reviewFrequency', title: '¿Con qué frecuencia realizas repasos de temas ya estudiados?', type: 'select', options: [{value: 'Diario', label: 'Diario'}, {value: 'Varias veces/semana', label: 'Varias veces/semana'}, {value: 'Semanal', label: 'Semanal'}, {value: 'Ocasional', label: 'Ocasional'}, {value: 'Raramente', label: 'Raramente'}]},
  { section: 'section3', id: 'disciplineLevel', title: '¿Cómo calificarías tu disciplina para seguir un plan de estudio intensivo como el del MIR?', type: 'select', options: [{value: 'Muy alta', label: 'Muy alta, cumplo casi siempre'}, {value: 'Alta', label: 'Alta, cumplo la mayoría de las veces'}, {value: 'Media', label: 'Media, me cuesta seguirlo'}, {value: 'Necesito mejorar bastante', label: 'Necesito mejorar bastante'}]},
  // Section 4: Manejo de Preguntas y Simulacros MIR
  { section: 'section4', id: 'currentNetCorrectness', title: '¿Tu porcentaje neto de aciertos actual en simulacros MIR (si has hecho alguno)?', type: 'select', options: [{value: '<30%', label: '<30%'}, {value: '30-40%', label: '30-40%'}, {value: '40-50%', label: '40-50%'}, {value: '50-60%', label: '50-60%'}, {value: '>60%', label: '>60%'}, {value: 'Aún no he hecho simulacros', label: 'Aún no he hecho simulacros'}]},
  { section: 'section4', id: 'failurePoints', title: '¿En qué tipo de preguntas MIR sueles fallar más?', type: 'checkbox', allowMultiple: true, options: [{value: 'Imágenes', label: 'Preguntas con imágenes'}, {value: 'Casos clínicos largos', label: 'Casos clínicos muy largos'}, {value: 'Conceptos teóricos directos', label: 'Conceptos teóricos directos'}, {value: 'Negativas/excepto', label: 'Preguntas negativas o "excepto"'}, {value: 'Problemas de tiempo', label: 'Problemas de tiempo'}, {value: 'Otro', label: 'Otro'}]},
  { section: 'section4', id: 'fullSimFrequency', title: '¿Con qué frecuencia realizas simulacros completos del MIR?', type: 'select', options: [{value: 'Semanalmente', label: 'Semanalmente'}, {value: 'Cada 15 días', label: 'Cada 15 días'}, {value: 'Mensualmente', label: 'Mensualmente'}, {value: 'Aún no he empezado', label: 'Aún no he empezado'}]},
  { section: 'section4', id: 'mainDifficulty', title: '¿Cuál consideras tu principal dificultad al enfrentarte a las preguntas del MIR? (Opcional)', type: 'textarea', placeholder: 'Ej: La extensión de los casos, la gestión del tiempo...', isOptional: true},
  // Section 5: Objetivos y Motivación para el MIR
  { section: 'section5', id: 'targetSpecialty', title: '¿Qué especialidad(es) son tu principal objetivo al presentarte al MIR?', type: 'text', placeholder: 'Ej: Cardiología, Pediatría, Dermatología...' },
  { section: 'section5', id: 'hospitalPreference', title: '¿Tienes alguna preferencia por ciudad o tipo de hospital para tu residencia? (Opcional)', type: 'text', placeholder: 'Ej: Hospital grande en Madrid, hospital universitario...', isOptional: true },
  { section: 'section5', id: 'targetOrderNumber', title: '¿Tienes un número de orden objetivo en mente? (Opcional)', type: 'text', placeholder: 'Ej: Top 1000, por debajo de 4000...', isOptional: true },
  { section: 'section5', id: 'motivation', title: 'Finalmente, ¿qué te impulsa y motiva en tu camino hacia la residencia MIR?', type: 'textarea', placeholder: 'Una breve reflexión personal...' },
];

const defaultMirAnswers: MirXpFormAnswers = {
  section1: { presentedBefore: 'No', previousResults: '', strongAreas: [], weakAreas: [] },
  section2: { studyHoursPerDay: '4-6', hasJobOrResponsibilities: 'No', preferredStudyTime: 'Flexible', studyDeadline: '' },
  section3: { learningMethods: [], specificPlatform: '', reviewFrequency: 'Semanal', disciplineLevel: 'Alta' },
  section4: { currentNetCorrectness: 'Aún no he hecho simulacros', failurePoints: [], fullSimFrequency: 'Mensualmente', mainDifficulty: '' },
  section5: { targetSpecialty: '', hospitalPreference: '', targetOrderNumber: '', motivation: '' },
};


const getInitialFormState = (initial?: Partial<MirXpFormAnswers>): MirXpFormAnswers => {
  const defaultsCopy = JSON.parse(JSON.stringify(defaultMirAnswers)); // Deep copy defaultAnswers
  if (!initial || Object.keys(initial).length === 0) {
    return defaultsCopy;
  }

  const merged = defaultsCopy;
    (Object.keys(initial) as Array<keyof MirXpFormAnswers>).forEach(sectionKey => {
        if (initial[sectionKey] && typeof initial[sectionKey] === 'object') {
            merged[sectionKey] = { ...merged[sectionKey], ...initial[sectionKey] };
        }
    });
  return merged;
};


const MirPrepFormXp: React.FC<MirPrepFormXpProps> = ({ onFormComplete, initialData }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MirXpFormAnswers>(() => getInitialFormState(initialData));
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
      onFormComplete(answers as MirXpFormAnswers);
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

export default MirPrepFormXp;