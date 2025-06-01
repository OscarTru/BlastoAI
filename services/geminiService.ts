import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { APP_NAME } from '../constants';
import { AnyExamFormAnswers, StudyPlan, ExamType, EnarmXpFormAnswers, EnarmXpSection1Answers, EnarmXpSection2Answers, EnarmXpSection3Answers, EnarmXpSection4Answers, EnarmXpSection5Answers, MirXpFormAnswers, MirXpSection1Answers, MirXpSection2Answers, MirXpSection3Answers, MirXpSection4Answers, MirXpSection5Answers, UsmleXpFormAnswers, UsmleXpSection1Answers, UsmleXpSection2Answers, UsmleXpSection3Answers, UsmleXpSection4Answers, UsmleXpSection5Answers, PlabXpFormAnswers, PlabXpSection1Answers, PlabXpSection2Answers, PlabXpSection3Answers, PlabXpSection4Answers, PlabXpSection5Answers } from "../types";

// --- Gemini API Configuration ---
// Prioritize process.env.API_KEY as per @google/genai guidelines
const geminiApiKeyFromEnv = process.env.API_KEY; 
const geminiApiKeyFromWindow = (window as any).APP_CONFIG?.GEMINI_API_KEY;
const geminiApiKey = geminiApiKeyFromEnv || geminiApiKeyFromWindow;

let ai: GoogleGenAI | null = null;

if (geminiApiKey) {
  try {
    ai = new GoogleGenAI({ apiKey: geminiApiKey });
    const source = geminiApiKeyFromEnv ? "process.env.API_KEY" : "window.APP_CONFIG.GEMINI_API_KEY";
    console.info(`Gemini API client initialized successfully (API key from ${source}). Used for creative messages and non-study-plan content.`);
  } catch (error) {
    console.error("Error initializing GoogleGenAI with API_KEY:", error);
    ai = null;
  }
} else {
  console.warn(
    "WARNING: Gemini API key (API_KEY or GEMINI_API_KEY) is not configured. " +
    "Functions relying on Gemini ('generateContent', 'getCreativeLoadingMessage') may not work or will use fallback. " +
    "Ensure API_KEY environment variable is available or set GEMINI_API_KEY in window.APP_CONFIG."
  );
}

// --- Flowise API Configuration (for Chat & ALL Study Plans) ---
const flowiseChatApiKey = (window as any).APP_CONFIG?.FLOWISE_API_KEY; // Key for chat
const FLOWISE_CHAT_API_URL = "https://flowise-blasto-ai.onrender.com/api/v1/prediction/c6d8e86f-a665-4f98-a95e-c8db4112f32f";

if (!flowiseChatApiKey) {
  console.error(
    "CRITICAL: Flowise Chat API key (FLOWISE_API_KEY) is not configured in window.APP_CONFIG (in index.html). " +
    "Chat functionality WILL NOT WORK."
  );
}

const studyPlanApiKey = (window as any).APP_CONFIG?.STUDY_PLAN_API_KEY; // For ALL Flowise-based plans including ENARM_XP
const studyPlanApiUrl = (window as any).APP_CONFIG?.STUDY_PLAN_API_URL; // For ALL Flowise-based plans including ENARM_XP

if (!(studyPlanApiKey && studyPlanApiUrl)) {
  console.warn(
    "CRITICAL WARNING: Flowise Study Plan API key (STUDY_PLAN_API_KEY) or URL (STUDY_PLAN_API_URL) is not configured in window.APP_CONFIG. " +
    "ALL Study Plan generation (ENARM, MIR, USMLE, PLAB) WILL NOT WORK."
  );
}

export const getFlowiseChatResponse = async (message: string): Promise<string> => {
  if (!flowiseChatApiKey) {
    return "Error: La clave API para el servicio de chat (Flowise) no está configurada.";
  }
  try {
    const response = await fetch(FLOWISE_CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${flowiseChatApiKey}`,
      },
      body: JSON.stringify({ question: message }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`Flowise Chat API error ${response.status}: ${errorBody}`);
      return `Error ${response.status} al contactar el servicio de chat. Detalle: ${errorBody}`;
    }

    const data = await response.json();

    if (data && typeof data.text === 'string') {
      return data.text;
    } else if (data && typeof data.answer === 'string') {
      return data.answer;
    } else if (data && typeof data.message === 'string') {
        return data.message;
    }
    console.warn("Flowise Chat response format unknown or missing 'text'/'answer'/'message' field:", data);
    return `Respuesta recibida del chat, pero en un formato inesperado: ${JSON.stringify(data)}`;

  } catch (error) {
    console.error("Error sending message to Flowise Chat:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return `Lo siento, no pude procesar tu solicitud de chat en este momento debido a un error de red o servicio. Por favor, inténtalo de nuevo más tarde. Detalle: ${errorMessage}`;
  }
};

export const generateContent = async (prompt: string): Promise<string> => {
  if (!ai) {
    // Fallback to Flowise chat if Gemini is not available for general content generation
    console.warn("Gemini API not available for generateContent, falling back to Flowise chat endpoint.");
    return getFlowiseChatResponse(prompt); 
  }
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: { 
        systemInstruction: `Eres ${APP_NAME}, un asistente médico. Proporciona información clara y concisa.`,
      }
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    // Fallback to Flowise on Gemini error
    console.warn("Error with Gemini for generateContent, falling back to Flowise chat endpoint.");
    return getFlowiseChatResponse(prompt);
  }
};

export const getCreativeLoadingMessage = async (userQuery: string): Promise<string> => {
  const defaultFallback = "Procesando... ¡un momentito!";
  if (!ai) { // Use Gemini only if available, otherwise simple fallbacks
    const fallbacks = ["Buscando en los papers...", "Consultando el atlas...", "Revisando protocolos...", "Preparando el estetoscopio...", "Afinando el microscopio..."];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
  }
  try {
    const prompt = `Genera un dato curioso de medicina MUY CORTO (máximo 10-15 palabras), relacionado con '${userQuery || 'medicina general'}'. 
    Usa un tono juvenil pero un poco más formal, con un toque latino (Latinoamérica), divertido y ligero. 
    NO uses asteriscos ni markdown. 
    Ejemplo para 'corazón': El corazón bombea unos 5 litros de sangre por minuto, ¡qué máquina!
    Ejemplo para 'cerebro': Tu cerebro sigue activo mientras duermes, ¡siempre chambeando!`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: prompt,
      config: {
        temperature: 0.7, 
        topP: 0.95,
      }
    });
    let creativeText = response.text.trim();
    if (!creativeText) {
        creativeText = defaultFallback;
    }
    creativeText = creativeText.replace(/\*/g, '');
    return creativeText;
  } catch (error) {
    console.warn("Error generating creative loading message from Gemini:", error);
    const errorFallbacks = ["Buscando inspiración...", "Un segundito, porfa...", "Cargando datos médicos...", "Ya casi está tu info, ¡aguanta!"];
    return errorFallbacks[Math.floor(Math.random() * errorFallbacks.length)];
  }
};

const formatEnarmXpAnswersForPrompt = (answers: EnarmXpFormAnswers): string => {
  let details = "Respuestas del usuario (ENARM):\n";

  const section1: EnarmXpSection1Answers = answers.section1 || { presentedBefore: 'No', previousResults: '', strongAreas: [], weakAreas: [] };
  details += "Sección 1 – Perfil académico:\n";
  details += `- ¿Ha presentado antes el examen?: ${section1.presentedBefore}\n`;
  if (section1.previousResults) details += `- Resultados anteriores: ${section1.previousResults}\n`;
  details += `- Áreas médicas fuertes: ${(section1.strongAreas || []).join(', ') || 'No especificadas'}\n`;
  details += `- Materias con más dudas: ${(section1.weakAreas || []).join(', ') || 'No especificadas'}\n\n`;

  const section2: EnarmXpSection2Answers = answers.section2 || { studyHoursPerDay: 'No especificado', hasJobOrResponsibilities: 'No', preferredStudyTime: 'Indiferente', studyDeadline: '' };
  details += "Sección 2 – Tiempo disponible:\n";
  details += `- Horas de estudio al día: ${section2.studyHoursPerDay}\n`;
  details += `- ¿Tiene trabajo u otras responsabilidades?: ${section2.hasJobOrResponsibilities}\n`;
  details += `- Horario preferido para estudiar: ${section2.preferredStudyTime}\n`;
  details += `- Fecha tope para estudiar/presentar: ${section2.studyDeadline ? new Date(section2.studyDeadline).toLocaleDateString('es-MX') : 'No especificada'}\n\n`;
  
  const section3: EnarmXpSection3Answers = answers.section3 || { learningMethods: [], usesLearningTools: [], consistentWithReview: 'A veces', disciplineLevel: 'Disciplinado' };
  details += "Sección 3 – Método de aprendizaje:\n";
  details += `- Métodos que funcionan mejor: ${(section3.learningMethods || []).join(', ') || 'No especificados'}\n`;
  details += `- Herramientas usadas: ${(section3.usesLearningTools || []).join(', ') || 'Ninguna específica'}\n`;
  details += `- Constancia con el repaso: ${section3.consistentWithReview}\n`;
  details += `- Nivel de disciplina: ${section3.disciplineLevel}\n\n`;

  const section4: EnarmXpSection4Answers = answers.section4 || { currentCorrectnessPercentage: '', failurePoints: [], usesSimulators: '', caseQuestionFrequency: 'Ocasionalmente' };
  details += "Sección 4 – Resolución de preguntas:\n";
  if (section4.currentCorrectnessPercentage) details += `- Porcentaje de aciertos actual: ${section4.currentCorrectnessPercentage}\n`;
  details += `- Dónde falla más: ${(section4.failurePoints || []).join(', ') || 'No especificado'}\n`;
  if (section4.usesSimulators) details += `- Uso de simuladores: ${section4.usesSimulators}\n`;
  details += `- Frecuencia de preguntas tipo caso clínico: ${section4.caseQuestionFrequency}\n\n`;

  const section5: EnarmXpSection5Answers = answers.section5 || { targetSpecialty: 'No especificada', targetInstitution: '', targetScoreGoal: '', motivation: 'No especificada' };
  details += "Sección 5 – Objetivo personal:\n";
  details += `- Especialidad deseada: ${section5.targetSpecialty}\n`;
  if (section5.targetInstitution) details += `- Sede o institución deseada: ${section5.targetInstitution}\n`;
  if (section5.targetScoreGoal) details += `- Puntaje meta: ${section5.targetScoreGoal}\n`;
  details += `- Motivación: ${section5.motivation}\n`;
  
  return details;
};

const formatMirXpAnswersForPrompt = (answers: MirXpFormAnswers): string => {
  let details = "Respuestas del usuario (MIR):\n";

  const section1: MirXpSection1Answers = answers.section1 || { presentedBefore: 'No', previousResults: '', strongAreas: [], weakAreas: [] };
  details += "Sección 1 – Perfil y Experiencia MIR:\n";
  details += `- ¿Ha presentado antes el MIR?: ${section1.presentedBefore}\n`;
  if (section1.previousResults) details += `- Número de orden o experiencia previa: ${section1.previousResults}\n`;
  details += `- Áreas MIR fuertes: ${(section1.strongAreas || []).join(', ') || 'No especificadas'}\n`;
  details += `- Áreas MIR con más dudas: ${(section1.weakAreas || []).join(', ') || 'No especificadas'}\n\n`;

  const section2: MirXpSection2Answers = answers.section2 || { studyHoursPerDay: '4-6', hasJobOrResponsibilities: 'No', preferredStudyTime: 'Flexible', studyDeadline: '' };
  details += "Sección 2 – Disponibilidad y Entorno de Estudio:\n";
  details += `- Horas de estudio al día: ${section2.studyHoursPerDay}\n`;
  details += `- ¿Trabajo u otras responsabilidades?: ${section2.hasJobOrResponsibilities}\n`;
  details += `- Horario preferido para estudiar: ${section2.preferredStudyTime}\n`;
  details += `- Convocatoria o fecha objetivo: ${section2.studyDeadline ? new Date(section2.studyDeadline).toLocaleDateString('es-ES') : 'No especificada'}\n\n`;
  
  const section3: MirXpSection3Answers = answers.section3 || { learningMethods: [], specificPlatform: '', reviewFrequency: 'Semanal', disciplineLevel: 'Alta' };
  details += "Sección 3 – Estrategia de Aprendizaje para el MIR:\n";
  details += `- Métodos de estudio efectivos: ${(section3.learningMethods || []).join(', ') || 'No especificados'}\n`;
  if (section3.specificPlatform) details += `- Plataforma o academia específica: ${section3.specificPlatform}\n`;
  details += `- Frecuencia de repasos: ${section3.reviewFrequency}\n`;
  details += `- Disciplina para plan intensivo: ${section3.disciplineLevel}\n\n`;

  const section4: MirXpSection4Answers = answers.section4 || { currentNetCorrectness: 'Aún no he hecho simulacros', failurePoints: [], fullSimFrequency: 'Mensualmente', mainDifficulty: '' };
  details += "Sección 4 – Manejo de Preguntas y Simulacros MIR:\n";
  details += `- Porcentaje neto de aciertos actual: ${section4.currentNetCorrectness}\n`;
  details += `- Tipo de preguntas donde falla más: ${(section4.failurePoints || []).join(', ') || 'No especificado'}\n`;
  details += `- Frecuencia de simulacros completos: ${section4.fullSimFrequency}\n`;
  if (section4.mainDifficulty) details += `- Principal dificultad en preguntas MIR: ${section4.mainDifficulty}\n\n`;

  const section5: MirXpSection5Answers = answers.section5 || { targetSpecialty: 'No especificada', hospitalPreference: '', targetOrderNumber: '', motivation: 'No especificada' };
  details += "Sección 5 – Objetivos y Motivación para el MIR:\n";
  details += `- Especialidad(es) objetivo: ${section5.targetSpecialty}\n`;
  if (section5.hospitalPreference) details += `- Preferencia de hospital/ciudad: ${section5.hospitalPreference}\n`;
  if (section5.targetOrderNumber) details += `- Número de orden objetivo: ${section5.targetOrderNumber}\n`;
  details += `- Motivación: ${section5.motivation}\n`;
  
  return details;
};

const formatUsmleXpAnswersForPrompt = (answers: UsmleXpFormAnswers): string => {
  const examName = answers.section1?.usmleStepToPrep || "USMLE";
  let details = `Respuestas del usuario (${examName}):\n`;

  const section1: UsmleXpSection1Answers = answers.section1 || { usmleStepToPrep: 'USMLE Step 1', medicalGraduateType: 'IMG', presentedThisStepBefore: 'No', previousAttemptExperience: '' };
  details += "Sección 1 – Perfil y Examen USMLE:\n";
  details += `- Step del USMLE a preparar: ${section1.usmleStepToPrep}\n`;
  details += `- Tipo de Graduado Médico: ${section1.medicalGraduateType}\n`;
  details += `- ¿Ha presentado este Step antes?: ${section1.presentedThisStepBefore}\n`;
  if (section1.previousAttemptExperience) details += `- Experiencia en intento anterior: ${section1.previousAttemptExperience}\n\n`;

  const section2: UsmleXpSection2Answers = answers.section2 || { studyDurationMonths: '4-6', studyHoursPerWeek: '20-30', mainResources: [], otherResponsibilities: 'No' };
  details += "Sección 2 – Tiempo y Recursos:\n";
  details += `- Meses de estudio hasta el examen: ${section2.studyDurationMonths}\n`;
  details += `- Horas de estudio por semana: ${section2.studyHoursPerWeek}\n`;
  details += `- Recursos principales: ${(section2.mainResources || []).join(', ') || 'No especificados'}\n`;
  details += `- Otras responsabilidades (trabajo, rotaciones): ${section2.otherResponsibilities}\n\n`;

  const section3: UsmleXpSection3Answers = answers.section3 || { strongSystemsDisciplines: [], weakSystemsDisciplines: [], qbankFrequency: 'Ocasionalmente', qbankPercentage: undefined };
  details += "Sección 3 – Fortalezas y Debilidades:\n";
  details += `- Sistemas/Disciplinas fuertes: ${(section3.strongSystemsDisciplines || []).join(', ') || 'No especificadas'}\n`;
  details += `- Sistemas/Disciplinas a reforzar: ${(section3.weakSystemsDisciplines || []).join(', ') || 'No especificadas'}\n`;
  details += `- Frecuencia de QBank: ${section3.qbankFrequency}\n`;
  if (section3.qbankPercentage) details += `- Porcentaje de aciertos en QBank: ${section3.qbankPercentage}\n\n`;

  const section4: UsmleXpSection4Answers = answers.section4 || { takenPracticeExams: 'No', practiceExamScores: '', mainDifficultyUsmleQuestions: [], preferredStudyEnvironment: 'En casa' };
  details += "Sección 4 – Simulacros y Estrategia:\n";
  details += `- ¿Ha realizado exámenes de práctica completos?: ${section4.takenPracticeExams}\n`;
  if (section4.practiceExamScores) details += `- Puntajes de práctica: ${section4.practiceExamScores}\n`;
  details += `- Principal dificultad en preguntas USMLE: ${(section4.mainDifficultyUsmleQuestions || []).join(', ') || 'No especificada'}\n`;
  details += `- Entorno de estudio preferido: ${section4.preferredStudyEnvironment}\n\n`;
  
  const section5: UsmleXpSection5Answers = answers.section5 || { targetScore: 'Pass', interestedSpecialties: '', motivation: 'No especificada' };
  details += "Sección 5 – Objetivos y Motivación:\n";
  details += `- Puntaje objetivo: ${section5.targetScore}\n`;
  if (section5.interestedSpecialties) details += `- Especialidades de interés: ${section5.interestedSpecialties}\n`;
  details += `- Motivación: ${section5.motivation}\n`;

  return details;
};

const formatPlabXpAnswersForPrompt = (answers: PlabXpFormAnswers): string => {
  const examName = answers.section1?.plabPartToPrep || "PLAB";
  let details = `Respuestas del usuario (${examName}):\n`;

  const section1: PlabXpSection1Answers = answers.section1 || { plabPartToPrep: 'PLAB Part 1', imgStatus: 'Sí', presentedThisPartBefore: 'No' };
  details += "Sección 1 – Perfil y Experiencia PLAB:\n";
  details += `- Parte del PLAB a preparar: ${section1.plabPartToPrep}\n`;
  details += `- ¿Es Graduado Médico Internacional (IMG)?: ${section1.imgStatus}\n`;
  if (section1.englishProficiency) details += `- Nivel de Inglés (IELTS/OET): ${section1.englishProficiency}\n`;
  details += `- ¿Ha presentado esta parte del PLAB antes?: ${section1.presentedThisPartBefore}\n`;
  if (section1.previousAttemptExperience) details += `- Experiencia en intento anterior: ${section1.previousAttemptExperience}\n\n`;

  const section2: PlabXpSection2Answers = answers.section2 || { studyDurationMonths: '3-4', studyHoursPerWeek: '15-25', mainResources: [], ukClinicalExperience: 'No' };
  details += "Sección 2 – Disponibilidad y Recursos:\n";
  details += `- Meses hasta el examen PLAB: ${section2.studyDurationMonths}\n`;
  details += `- Horas de estudio por semana: ${section2.studyHoursPerWeek}\n`;
  details += `- Recursos principales: ${(section2.mainResources || []).join(', ') || 'No especificados'}\n`;
  details += `- Experiencia clínica en Reino Unido: ${section2.ukClinicalExperience}\n\n`;
  
  const section3: PlabXpSection3Answers = answers.section3 || { practiceMethod: 'Combinado' };
  details += "Sección 3 – Áreas de Enfoque y Práctica:\n";
  if (section1.plabPartToPrep === 'PLAB Part 1') {
    if (section3.strongAreasPlab1?.length) details += `- Áreas fuertes (Part 1): ${section3.strongAreasPlab1.join(', ')}\n`;
    if (section3.weakAreasPlab1?.length) details += `- Áreas a reforzar (Part 1): ${section3.weakAreasPlab1.join(', ')}\n`;
  } else { // PLAB Part 2
    if (section3.strongSkillsPlab2?.length) details += `- Habilidades OSCE fuertes (Part 2): ${section3.strongSkillsPlab2.join(', ')}\n`;
    if (section3.weakSkillsPlab2?.length) details += `- Habilidades OSCE a reforzar (Part 2): ${section3.weakSkillsPlab2.join(', ')}\n`;
  }
  if(section3.generalKnowledgeAreas?.length) details += `- Áreas de conocimiento general a cubrir: ${section3.generalKnowledgeAreas.join(', ')}\n`;
  details += `- Método de práctica preferido: ${section3.practiceMethod}\n\n`;

  const section4: PlabXpSection4Answers = answers.section4 || { mainChallenges: 'No especificados' };
  details += "Sección 4 – Simulacros y Desafíos:\n";
  if (section1.plabPartToPrep === 'PLAB Part 1' && section4.mockScoresPlab1) details += `- Resultados en simulacros (Part 1): ${section4.mockScoresPlab1}\n`;
  if (section1.plabPartToPrep === 'PLAB Part 2' && section4.osceConfidencePlab2) details += `- Confianza en OSCE (Part 2): ${section4.osceConfidencePlab2}\n`;
  details += `- Principales desafíos para el PLAB: ${section4.mainChallenges}\n`;
  if (section4.knowledgeGapsUkSystem) details += `- Brechas de conocimiento sobre sistema NHS/GMC: ${section4.knowledgeGapsUkSystem}\n\n`;
  
  const section5: PlabXpSection5Answers = answers.section5 || { reasonForPlab: 'No especificada', motivation: 'No especificada' };
  details += "Sección 5 – Objetivos y Motivación:\n";
  details += `- Razón para obtener registro GMC: ${section5.reasonForPlab}\n`;
  if (section5.targetSpecialtyUk) details += `- Especialidad de interés en UK: ${section5.targetSpecialtyUk}\n`;
  if (section5.timelineAfterPlab) details += `- Plan después de aprobar PLAB: ${section5.timelineAfterPlab}\n`;
  details += `- Motivación: ${section5.motivation}\n`;

  return details;
};


export const generateStudyPlan = async (userData: AnyExamFormAnswers, examType: ExamType): Promise<StudyPlan> => {
  
  if (!studyPlanApiKey || !studyPlanApiUrl) {
    throw new Error("API de generación de planes (Flowise) no configurada. Revisa STUDY_PLAN_API_KEY y STUDY_PLAN_API_URL en index.html.");
  }

  let flowisePrompt = "";
  let targetDateForPlan: string | undefined = undefined;
  let generatedPlanTitlePrefix = `Plan de Estudio para ${examType.replace('_XP', '')}`;
  let userDetailsString = "";

  if (examType === 'ENARM_XP') {
    const xpAnswers = userData as EnarmXpFormAnswers;
    userDetailsString = formatEnarmXpAnswersForPrompt(xpAnswers);
    targetDateForPlan = (xpAnswers.section2 && xpAnswers.section2.studyDeadline) ? xpAnswers.section2.studyDeadline : undefined;
    generatedPlanTitlePrefix = `Plan ENARM Personalizado${targetDateForPlan ? ` para ${new Date(targetDateForPlan).toLocaleDateString('es-MX', {month:'long', year:'numeric'})}` : ''}`;
  } else if (examType === 'MIR_XP') {
    const mirAnswers = userData as MirXpFormAnswers;
    userDetailsString = formatMirXpAnswersForPrompt(mirAnswers);
    targetDateForPlan = (mirAnswers.section2 && mirAnswers.section2.studyDeadline) ? mirAnswers.section2.studyDeadline : undefined;
    generatedPlanTitlePrefix = `Plan MIR Personalizado${targetDateForPlan ? ` para ${new Date(targetDateForPlan).toLocaleDateString('es-ES', {month:'long', year:'numeric'})}` : ''}`;
  } else if (examType === 'USMLE Step 1' || examType === 'USMLE Step 2 CK' || examType === 'USMLE Step 3') {
    const usmleAnswers = userData as UsmleXpFormAnswers;
    userDetailsString = formatUsmleXpAnswersForPrompt(usmleAnswers);
    generatedPlanTitlePrefix = `Plan ${examType} Personalizado`;
  } else if (examType === 'PLAB Part 1' || examType === 'PLAB Part 2') {
    const plabAnswers = userData as PlabXpFormAnswers;
    userDetailsString = formatPlabXpAnswersForPrompt(plabAnswers);
    generatedPlanTitlePrefix = `Plan ${examType} Personalizado`;
    // Target date for PLAB might be inferred from studyDurationMonths but not directly set as a date.
  } else {
    // --- Legacy Flowise-based plan generation for other exam types ---
    const keyMappings: Record<string, string> = { 
      yearInCareer: "Año en curso o de egreso",
      enarmDate: "Fecha planeada para examen", // Legacy ENARM
      studyTime: "Tiempo de estudio semanal", // Legacy ENARM
      difficultAreas: "Áreas consideradas difíciles", // Legacy ENARM
      presentedBefore: "¿Ha presentado antes el examen?", // Legacy ENARM
      hasSimulators: "Acceso a simuladores", // Legacy ENARM
    };

    for (const key in userData) {
      if (Object.prototype.hasOwnProperty.call(userData, key)) {
        const value = (userData as any)[key];
        if (value === undefined || value === null || (Array.isArray(value) && value.length === 0)) continue;
        
        let formattedValue = value;
        if (Array.isArray(value)) {
          formattedValue = value.join(', ');
        } else if ((key === 'enarmDate' || key === 'studyDeadline') && typeof value === 'string' && value) {
          try {
            formattedValue = new Date(value).toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });
          } catch (e) { /* ignore date formatting error, use original */ }
        }
        
        const displayName = keyMappings[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
        userDetailsString += `- ${displayName}: ${formattedValue || 'No especificado'}\n`;
      }
    }
    
    flowisePrompt = `
Genera un plan de estudio personalizado para el examen ${examType}.
Considera los siguientes datos del usuario:
${userDetailsString}
El plan debe ser completo, detallado y estructurado por semanas o módulos. 
Debe incluir temas específicos a cubrir, sugerencias de recursos (si aplica), 
técnicas de estudio recomendadas, y una estimación realista de tiempo.
Utiliza formato Markdown para una buena estructura (encabezados, listas). Es CRUCIAL que uses Markdown.
    `.trim();

    if ('enarmDate' in userData && (userData as any).enarmDate) { // Legacy check
      targetDateForPlan = (userData as any).enarmDate;
    }
  }

  // Common prompt structure for XP flows
  if (examType === 'ENARM_XP' || examType === 'MIR_XP' || examType.startsWith('USMLE Step') || examType.startsWith('PLAB Part')) {
     let examNameForPrompt = examType.replace('_XP', ''); 
     if (examType.startsWith('PLAB Part')) {
        examNameForPrompt = examType; // e.g. "PLAB Part 1"
     }

     let specificInstructions = "";
     if (examType === 'PLAB Part 2') {
        specificInstructions = "Para PLAB Part 2, enfócate en habilidades para estaciones OSCE (comunicación, examen físico, procedimientos), escenarios éticos según GMC, y manejo de tiempo en circuito OSCE.";
     } else if (examType === 'PLAB Part 1') {
        specificInstructions = "Para PLAB Part 1, cubre el blueprint del GMC, enfatizando condiciones comunes, emergencias, y ética médica. Incluye muchos MCQs estilo PLAB.";
     }


     flowisePrompt = `
Eres Blasto AI, un tutor experto en preparación para el ${examNameForPrompt}.
Un estudiante quiere prepararse para el ${examNameForPrompt}. Basado en sus respuestas, genera un plan de estudio personalizado y detallado.
El plan debe estar dividido por semanas, con un enfoque claro en sus áreas débiles, gestionando su tiempo disponible y ayudándole a alcanzar sus objetivos.
Incorpora técnicas de aprendizaje activo, preguntas tipo ${examNameForPrompt}, y reforzamiento espaciado. Las sesiones deben ser realistas para evitar el burnout.
Prioriza las áreas débiles que el usuario mencionó, pero asegura una cobertura equilibrada de todos los temas importantes del ${examNameForPrompt}.
Sugiere una estructura semanal y diaria, incluyendo tipos de actividades (repaso, temas nuevos, preguntas, simulacros).
Ofrece consejos específicos basados en sus respuestas sobre método de aprendizaje y resolución de preguntas.
${specificInstructions}
El plan debe ser motivador y práctico. Utiliza formato Markdown para una buena estructura (encabezados, listas). Es CRUCIAL que uses Markdown para la estructura.

${userDetailsString}

Genera el plan ahora.
    `.trim();
  }


  try {
    const response = await fetch(studyPlanApiUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json', 
        'Authorization': `Bearer ${studyPlanApiKey}` 
      },
      body: JSON.stringify({ question: flowisePrompt }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`Error ${response.status} al generar el plan de estudio (${examType}) desde Flowise. Detalle: ${errorBody}`);
    }

    const data = await response.json();
    let planContent = data.text || data.answer || data.message || `Respuesta de Flowise en formato inesperado: ${JSON.stringify(data)}`;
    
    const titleMatch = planContent.match(/^(# .*|Plan de Estudio.*)/im);
    let planTitle = titleMatch ? titleMatch[0].replace(/^#\s*/, '').trim() : generatedPlanTitlePrefix;
    
    // Ensure the dynamic title from XP flows is used if available
    if (examType === 'ENARM_XP' || examType === 'MIR_XP' || examType.startsWith('USMLE Step') || examType.startsWith('PLAB Part')) {
      planTitle = generatedPlanTitlePrefix;
    }


    const newPlan: StudyPlan = {
      id: `${examType.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
      examType,
      targetDate: targetDateForPlan,
      creationDate: new Date().toISOString(),
      userInput: userData,
      planTitle: planTitle,
      planContent: planContent,
    };
    return newPlan;

  } catch (error) {
    console.error(`Error fetching study plan for ${examType} (Flowise):`, error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`No se pudo generar el plan de estudio para ${examType} (Flowise). Detalle: ${errorMessage}`);
  }
};