
import React from 'react';
import { SidebarPrivacyIcon } from '../constants';

const PrivacySecurityPage: React.FC = () => {
  return (
    <div className="space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        <SidebarPrivacyIcon className="w-10 h-10 text-primary dark:text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Privacidad y Seguridad</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Gestiona la seguridad de tu cuenta y tus datos.</p>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Autenticación en Dos Pasos (2FA)</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark mb-3">Añade una capa extra de seguridad a tu cuenta.</p>
        <button className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
          Activar 2FA
        </button>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Dispositivos Activos</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">Aquí verás los dispositivos donde has iniciado sesión.</p>
        {/* Placeholder for active devices list */}
         <button className="mt-3 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg">
          Cerrar Sesión en Otros Dispositivos
        </button>
      </div>
      
      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Gestión de Datos</h2>
         <button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg mr-3">
          Descargar Mis Datos (GDPR)
        </button>
        <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default PrivacySecurityPage;
