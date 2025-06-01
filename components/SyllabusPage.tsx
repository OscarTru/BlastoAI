import React, { useState } from 'react';
import { MedicalTopic } from '../types';
import { NewSyllabusIcon, ChatIcon, SparklesIcon } from '../constants'; 

interface SyllabusPageProps {
  openChatWithContext: (context: string) => void;
}

const mockTopics: MedicalTopic[] = [
  { id: 'anat1', title: 'Anatomía del Tórax', category: 'Básicas', specialty: 'Anatomía', summary: 'Estructuras principales, órganos y vascularización del tórax.', pearls: ['El nervio frénico inerva el diafragma.', 'El conducto torácico es el principal vaso linfático.'] },
  { id: 'fisio1', title: 'Fisiología Cardiovascular', category: 'Básicas', specialty: 'Fisiología', summary: 'Ciclo cardíaco, regulación de la presión arterial y gasto cardíaco.', pearls: ['La Ley de Frank-Starling describe la relación entre precarga y volumen sistólico.'] },
  { id: 'cardio1', title: 'Insuficiencia Cardíaca', category: 'Clínicas', specialty: 'Cardiología', summary: 'Diagnóstico y manejo de la insuficiencia cardíaca congestiva.', pearls: ['Los IECA son clave en el tratamiento.', 'La disnea es un síntoma común.'] },
  { id: 'neuro1', title: 'Accidente Cerebrovascular', category: 'Clínicas', specialty: 'Neurología', summary: 'Tipos, diagnóstico y tratamiento agudo del ACV.', pearls: ['"Tiempo es cerebro".', 'La escala NIHSS evalúa la severidad.'] },
  { id: 'pedia1', title: 'Calendario de Vacunación Infantil', category: 'Clínicas', specialty: 'Pediatría', summary: 'Esquema de vacunación recomendado para niños.', pearls: ['Vacunar es prevenir.', 'Importancia de la inmunidad de rebaño.'] },
];

const TopicItem: React.FC<{ topic: MedicalTopic; onExplain: (title: string) => void }> = ({ topic, onExplain }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-surface-light dark:bg-surface-dark p-5 rounded-2xl shadow-soft transition-all duration-300 hover:shadow-md-soft border border-border-light dark:border-border-dark hover:border-primary/50 dark:hover:border-primary/70">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <h3 className="text-lg font-semibold text-primary dark:text-primary">{topic.title}</h3>
        <span className={`transform transition-transform duration-200 text-text-secondary-light dark:text-text-secondary-dark ${isExpanded ? 'rotate-180' : ''}`}>▼</span>
      </div>
      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark space-y-3">
          <p className="text-sm text-text-primary-light dark:text-text-primary-dark mb-2">{topic.summary}</p>
          {topic.pearls && topic.pearls.length > 0 && (
            <div className="mb-3">
              <h4 className="text-xs font-semibold uppercase text-text-secondary-light dark:text-text-secondary-dark mb-1.5">Perlas Clínicas:</h4>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {topic.pearls.map((pearl, index) => (
                  <li key={index} className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{pearl}</li>
                ))}
              </ul>
            </div>
          )}
          <button 
            onClick={() => onExplain(topic.title)}
            className="mt-2 inline-flex items-center px-4 py-2 text-xs font-medium text-white bg-accent hover:bg-accent-dark rounded-lg shadow-sm transition-colors"
          >
            <ChatIcon className="w-4 h-4 mr-2" />
            Explicación con Blasto AI
          </button>
        </div>
      )}
    </div>
  );
};

const SyllabusPage: React.FC<SyllabusPageProps> = ({ openChatWithContext }) => {
  const categories = Array.from(new Set(mockTopics.map(t => t.category)));

  const handleExplainWithAI = (topicTitle: string) => {
    openChatWithContext(`Explícame más sobre: "${topicTitle}"`);
  };

  return (
    <div className="space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        {/* NewSyllabusIcon will now render the SolidDocumentTextIcon */}
        <NewSyllabusIcon className="w-10 h-10 text-primary dark:text-primary" /> 
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Temario Médico Interactivo</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Explora los temas por categorías y especialidades.</p>
        </div>
      </div>

      {categories.map(category => (
        <section key={category}>
          <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-text-primary-light dark:text-text-primary-dark border-b-2 border-primary pb-2">{category}</h2>
          <div className="space-y-5">
            {mockTopics.filter(t => t.category === category).map(topic => (
              <TopicItem key={topic.id} topic={topic} onExplain={handleExplainWithAI} />
            ))}
          </div>
        </section>
      ))}
       <div className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-primary to-primary-dark dark:from-primary dark:to-primary-dark/80 rounded-2xl shadow-lg-soft text-center text-white">
        <SparklesIcon className="w-10 h-10 mx-auto mb-3 opacity-90" />
        <h3 className="text-xl sm:text-2xl font-semibold mb-2">¿Necesitas ayuda con un tema específico?</h3>
        <p className="mb-5 text-sm opacity-90 max-w-md mx-auto">Usa Blasto AI para obtener explicaciones personalizadas, resúmenes o preguntas de práctica sobre cualquier tema médico.</p>
        <button
          onClick={() => handleExplainWithAI("Necesito ayuda general de Blasto AI")}
          className="bg-accent hover:bg-accent-dark text-white font-semibold px-6 py-2.5 rounded-lg shadow-md transition-colors"
        >
          Chatear con Blasto AI
        </button>
      </div>
    </div>
  );
};

export default SyllabusPage;