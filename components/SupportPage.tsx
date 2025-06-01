
import React from 'react';
import { SidebarSupportIcon } from '../constants';

const SupportPage: React.FC = () => {
  return (
    <div className="space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        <SidebarSupportIcon className="w-10 h-10 text-primary dark:text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Soporte y Ayuda</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Encuentra respuestas o contáctanos.</p>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Centro de Ayuda (FAQ)</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3">Encuentra respuestas a las preguntas más frecuentes.</p>
        <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
          Visitar FAQ
        </button>
      </div>
      
      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Tickets de Soporte</h2>
        <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg mr-3">
          Crear Nuevo Ticket
        </button>
         <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg">
          Ver Mis Tickets
        </button>
      </div>

      {/* Placeholder for Live Chat if applicable */}
      {/* <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Chat en Vivo</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3">Chatea con un agente de soporte.</p>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg">
          Iniciar Chat
        </button>
      </div> */}
    </div>
  );
};

export default SupportPage;
