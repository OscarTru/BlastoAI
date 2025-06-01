
import { StudyPlan } from '../types';

// This is a simple in-memory store. 
// In a real application, this would be replaced by a backend or a robust state management solution.

let studyPlans: StudyPlan[] = [];

// Function to load plans from localStorage (optional persistence for prototyping)
const loadPlansFromLocalStorage = (): StudyPlan[] => {
  try {
    const storedPlans = localStorage.getItem('blastoMedStudyPlans');
    if (storedPlans) {
      return JSON.parse(storedPlans);
    }
  } catch (error) {
    console.error("Error loading study plans from localStorage:", error);
  }
  return [];
};

// Function to save plans to localStorage
const savePlansToLocalStorage = (plans: StudyPlan[]) => {
  try {
    localStorage.setItem('blastoMedStudyPlans', JSON.stringify(plans));
  } catch (error) {
    console.error("Error saving study plans to localStorage:", error);
  }
};


// Initialize plans from localStorage
studyPlans = loadPlansFromLocalStorage();


export const getStudyPlans = (): StudyPlan[] => {
  return [...studyPlans]; // Return a copy to prevent direct mutation
};

export const addStudyPlan = (plan: StudyPlan): void => {
  // Prevent adding duplicate plans by ID (simple check)
  if (!studyPlans.find(p => p.id === plan.id)) {
    studyPlans.unshift(plan); // Add new plans to the beginning
    savePlansToLocalStorage(studyPlans);
  }
};

export const getStudyPlanById = (id: string): StudyPlan | undefined => {
  return studyPlans.find(plan => plan.id === id);
};

// Potentially add functions to update or delete plans if needed in the future
export const updateStudyPlan = (updatedPlan: StudyPlan): void => {
  const index = studyPlans.findIndex(plan => plan.id === updatedPlan.id);
  if (index !== -1) {
    studyPlans[index] = updatedPlan;
    savePlansToLocalStorage(studyPlans);
  }
};

export const deleteStudyPlan = (id: string): void => {
  studyPlans = studyPlans.filter(plan => plan.id !== id);
  savePlansToLocalStorage(studyPlans);
};
