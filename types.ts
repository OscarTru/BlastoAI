import { FormAnswers as EnarmLegacyFormAnswers } from './components/enarm-prep/EnarmPrepForm'; // Legacy ENARM form
// import { UsmleFormAnswers as UsmleLegacyFormAnswers } from './components/usmle-prep/UsmlePrepForm'; // Legacy USMLE form, to be replaced

// --- New ENARM XP Form Answers ---
export interface EnarmXpSection1Answers {
  presentedBefore: 'Sí' | 'No';
  previousResults?: string; // Optional, textarea
  strongAreas: string[]; // Checkbox/Multiselect
  weakAreas: string[]; // Checkbox/Multiselect
}

export interface EnarmXpSection2Answers {
  studyHoursPerDay: string; // e.g., '1-2 horas', '3-4 horas'
  hasJobOrResponsibilities: 'Sí' | 'No';
  preferredStudyTime: 'Mañana' | 'Tarde' | 'Noche' | 'Indiferente';
  studyDeadline: string; // ISO date string
}

export interface EnarmXpSection3Answers {
  learningMethods: string[]; // Checkbox: 'Lectura', 'Videos', 'Preguntas', 'Esquemas', 'Otro'
  usesLearningTools: string[]; // Checkbox: 'Flashcards', 'Resúmenes', 'Mapas Mentales', 'Ninguno específico'
  consistentWithReview: 'Sí' | 'No' | 'A veces';
  disciplineLevel: 'Muy disciplinado' | 'Disciplinado' | 'Poco disciplinado' | 'Necesito mejorar';
}

export interface EnarmXpSection4Answers {
  currentCorrectnessPercentage?: string; // Optional, e.g., 'Menos de 40%', '40-60%', 'Más de 60%'
  failurePoints: string[]; // Checkbox: 'Falta de conocimientos', 'Razonamiento clínico', 'Ansiedad/Tiempo', 'Otro'
  usesSimulators?: string; // Optional, e.g., 'Sí, varios', 'Sí, uno específico', 'No aún'
  caseQuestionFrequency: 'Diariamente' | 'Varias veces por semana' | 'Semanalmente' | 'Ocasionalmente';
}

export interface EnarmXpSection5Answers {
  targetSpecialty: string;
  targetInstitution?: string; // Optional
  targetScoreGoal?: string; // Optional, e.g., 'Arriba de 70', 'Lo más alto posible'
  motivation: string; // Textarea
}

export interface EnarmXpFormAnswers {
  section1: EnarmXpSection1Answers;
  section2: EnarmXpSection2Answers;
  section3: EnarmXpSection3Answers;
  section4: EnarmXpSection4Answers;
  section5: EnarmXpSection5Answers;
}
// --- End New ENARM XP Form Answers ---

// --- New MIR XP Form Answers ---
export interface MirXpSection1Answers {
  presentedBefore: 'Sí' | 'No';
  previousResults?: string; // Optional, textarea for num orden or experience
  strongAreas: string[]; // Checkbox/Multiselect for MIR subjects
  weakAreas: string[]; // Checkbox/Multiselect for MIR subjects
}

export interface MirXpSection2Answers {
  studyHoursPerDay: '1-3' | '4-6' | '7-9' | '10+';
  hasJobOrResponsibilities: 'Sí' | 'No';
  preferredStudyTime: 'Mañana' | 'Tarde' | 'Noche' | 'Flexible';
  studyDeadline: string; // ISO date string (for convocatoria year or target date)
}

export interface MirXpSection3Answers {
  learningMethods: string[]; // Checkbox for MIR study methods
  specificPlatform?: string; // Optional, text
  reviewFrequency: 'Diario' | 'Varias veces/semana' | 'Semanal' | 'Ocasional' | 'Raramente';
  disciplineLevel: 'Muy alta' | 'Alta' | 'Media' | 'Necesito mejorar bastante';
}

export interface MirXpSection4Answers {
  currentNetCorrectness?: '<30%' | '30-40%' | '40-50%' | '50-60%' | '>60%' | 'Aún no he hecho simulacros'; // Select
  failurePoints: string[]; // Checkbox for MIR question failure types
  fullSimFrequency: 'Semanalmente' | 'Cada 15 días' | 'Mensualmente' | 'Aún no he empezado'; // Select
  mainDifficulty?: string; // Optional, textarea
}

export interface MirXpSection5Answers {
  targetSpecialty: string; // Text
  hospitalPreference?: string; // Optional, text
  targetOrderNumber?: string; // Optional, text
  motivation: string; // Textarea
}

export interface MirXpFormAnswers {
  section1: MirXpSection1Answers;
  section2: MirXpSection2Answers;
  section3: MirXpSection3Answers;
  section4: MirXpSection4Answers;
  section5: MirXpSection5Answers;
}
// --- End New MIR XP Form Answers ---

// --- New USMLE XP Form Answers ---
export interface UsmleXpSection1Answers {
  usmleStepToPrep: 'USMLE Step 1' | 'USMLE Step 2 CK' | 'USMLE Step 3';
  medicalGraduateType: 'USMG' | 'IMG';
  presentedThisStepBefore: 'Sí' | 'No';
  previousAttemptExperience?: string; // Optional, textarea
}

export interface UsmleXpSection2Answers {
  studyDurationMonths: '1-3' | '4-6' | '7-9' | '10-12' | '12+';
  studyHoursPerWeek: '10-20' | '20-30' | '30-40' | '40+';
  mainResources: string[]; // Checkbox, multiselect: UWorld, First Aid, Pathoma, Sketchy, NBME, B&B, Amboss, Anki etc.
  otherResponsibilities: 'Sí' | 'No';
}

export interface UsmleXpSection3Answers {
  strongSystemsDisciplines: string[]; // Checkbox, multiselect (general or step-specific)
  weakSystemsDisciplines: string[]; // Checkbox, multiselect
  qbankFrequency: 'Diariamente' | 'Varias veces/semana' | 'Semanalmente' | 'Ocasionalmente' | 'No he empezado';
  qbankPercentage?: '<40%' | '40-50%' | '50-60%' | '60-70%' | '>70%' | 'No aplica'; // Optional
}

export interface UsmleXpSection4Answers {
  takenPracticeExams: 'Sí' | 'No';
  practiceExamScores?: string; // Optional, text (e.g., "NBME 25: 220, UWSA1: 230")
  mainDifficultyUsmleQuestions: string[]; // Checkbox: Vignette interpretation, Concept integration, Time management, Fatigue, Other
  preferredStudyEnvironment: 'Silencioso/Individual' | 'Grupo de estudio' | 'Biblioteca' | 'En casa';
}

export interface UsmleXpSection5Answers {
  targetScore: string; // Text (e.g., "Pass", "240-250")
  interestedSpecialties?: string; // Optional, text
  motivation: string; // Textarea
}

export interface UsmleXpFormAnswers {
  section1: UsmleXpSection1Answers;
  section2: UsmleXpSection2Answers;
  section3: UsmleXpSection3Answers;
  section4: UsmleXpSection4Answers;
  section5: UsmleXpSection5Answers;
}
// --- End New USMLE XP Form Answers ---

// --- New PLAB XP Form Answers ---
export interface PlabXpSection1Answers {
  plabPartToPrep: 'PLAB Part 1' | 'PLAB Part 2';
  imgStatus: 'Sí' | 'No'; // Simplified: Are you an IMG?
  englishProficiency?: string; // Optional, text (e.g., IELTS 7.5, OET B)
  presentedThisPartBefore: 'Sí' | 'No';
  previousAttemptExperience?: string; // Optional, textarea
}

export interface PlabXpSection2Answers {
  studyDurationMonths: '1-2' | '3-4' | '5-6' | '6+';
  studyHoursPerWeek: '10-15' | '15-25' | '25-35' | '35+';
  mainResources: string[]; // Checkbox: Plabable, PlabKeys, GMC Good Medical Practice, Oxford Handbooks, etc.
  ukClinicalExperience: 'Sí, considerable' | 'Sí, limitada' | 'No';
}

export interface PlabXpSection3Answers { // Conditional questions are tricky here, will use general and rely on AI to discern Part
  strongAreasPlab1?: string[]; // Optional, Checkbox (e.g. Anatomy, Physiology, Pharmacology, Ethics for Part 1)
  weakAreasPlab1?: string[]; // Optional, Checkbox
  strongSkillsPlab2?: string[]; // Optional, Checkbox (e.g. History taking, Communication, Mannequin, Ethics for Part 2)
  weakSkillsPlab2?: string[]; // Optional, Checkbox
  generalKnowledgeAreas?: string[]; // General topics like Common conditions, Emergencies, Professionalism
  practiceMethod: 'Solo' | 'Con compañeros' | 'Cursos de preparación' | 'Combinado';
}

export interface PlabXpSection4Answers {
  mockScoresPlab1?: string; // Optional, text (e.g. Plabable mocks: 70%)
  osceConfidencePlab2?: 'Alta' | 'Media' | 'Baja' | 'No aplica'; // Optional
  mainChallenges: string; // Textarea (e.g. Adapting to UK style, time management)
  knowledgeGapsUkSystem?: string; // Optional, Textarea (NHS structure, GMC guidelines)
}

export interface PlabXpSection5Answers {
  reasonForPlab: string; // Textarea (Work in UK, specialist training)
  targetSpecialtyUk?: string; // Optional, text
  timelineAfterPlab?: string; // Optional, text (e.g. Foundation Year, direct specialty application)
  motivation: string; // Textarea
}

export interface PlabXpFormAnswers {
  section1: PlabXpSection1Answers;
  section2: PlabXpSection2Answers;
  section3: PlabXpSection3Answers;
  section4: PlabXpSection4Answers;
  section5: PlabXpSection5Answers;
}
// --- End New PLAB XP Form Answers ---


export interface User {
  id: string;
  name: string;
  email: string;
  level: UserLevel;
  profilePictureUrl?: string;
  progress?: UserProgress;
}

export enum UserLevel {
  Student = "Estudiante",
  Intern = "Interno",
  Resident = "Residente",
  GeneralPractitioner = "Médico General",
}

export interface UserProgress {
  topicsViewed: number;
  casesSolved: number;
  timeInvestedHours: number;
}

export interface MedicalTopic {
  id: string;
  title: string;
  category: string; // e.g., 'Básicas', 'Clínicas'
  specialty: string; // e.g., 'Anatomía', 'Cardiología'
  summary: string;
  content?: string; // Mini-class content
  pearls?: string[]; // Clinical pearls
  questions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}

export interface ClinicalCase {
  id:string;
  title: string;
  specialty: string;
  history: string;
  analysisQuestions: string[];
  learningSummary: string;
  solvedDate: string; // ISO date string
}

export interface ExternalArticle {
  id: string;
  title: string;
  source: 'NEJM' | 'Medscape' | 'UpToDate' | 'PubMed';
  url: string;
  publishDate: string; // ISO date string
  summary?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: number;
  isLoading?: boolean;
}

export type ExamType = 
  'ENARM' | // Legacy ENARM
  'MIR' | // Legacy MIR
  'USMLE Step 1' | 
  'USMLE Step 2 CK' | 
  'USMLE Step 3' | 
  'PLAB Part 1' | // Specific PLAB Part 1
  'PLAB Part 2' | // Specific PLAB Part 2
  'ENARM_XP' | // New ENARM Experience Personalizada
  'MIR_XP'; // New MIR Experience Personalizada
  // USMLE_XP will use the specific step types like 'USMLE Step 1'
  // PLAB_XP will use specific part types

export interface StudyPlanTask {
  id: string;
  dayOfWeek?: string; 
  timeSlot?: string; 
  activity: string; 
  duration?: string; 
  resources?: string[]; 
  completed: boolean;
}

export interface StudyPlanWeek {
  weekNumber: number;
  startDate: string; // ISO Date
  endDate: string; // ISO Date
  focusArea?: string;
  tasks: StudyPlanTask[];
}

// General type for form answers
export type AnyExamFormAnswers = 
  EnarmLegacyFormAnswers | 
  // UsmleLegacyFormAnswers | // Removed legacy USMLE
  EnarmXpFormAnswers | 
  MirXpFormAnswers |
  UsmleXpFormAnswers |
  PlabXpFormAnswers;


export interface StudyPlan {
  id: string; 
  examType: ExamType;
  targetDate?: string; 
  creationDate: string; 
  userInput: AnyExamFormAnswers; 
  planTitle: string; 
  summary?: string; 
  schedule?: StudyPlanWeek[]; 
  planContent: string; 
  recommendations?: string[];
  estimatedLevel?: string; 
}