
import React from 'react';
import { SidebarLegalIcon } from '../constants';

const LegalPage: React.FC = () => {
  return (
    <div className="space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        <SidebarLegalIcon className="w-10 h-10 text-primary dark:text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Información Legal</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Consulta nuestros términos, políticas y preferencias de datos.</p>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <ul className="space-y-3">
          <li><a href="#terms" className="text-primary hover:underline">Términos y Condiciones</a></li>
          <li><a href="#privacy" className="text-primary hover:underline">Política de Privacidad (Datenschutzerklärung)</a></li>
        </ul>
      </div>
      
      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Preferencias de Cookies y Consentimiento</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3">Administra tus preferencias de cookies y consentimiento de datos.</p>
        <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
          Gestionar Preferencias
        </button>
      </div>
    </div>
  );
};

export default LegalPage;
