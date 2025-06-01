
import React from 'react';
import { SidebarSubscriptionIcon } from '../constants'; // Using the alias from constants

const SubscriptionPage: React.FC = () => {
  return (
    <div className="space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        <SidebarSubscriptionIcon className="w-10 h-10 text-primary dark:text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Suscripción y Pagos</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Gestiona tu plan, métodos de pago e historial.</p>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Detalles del Plan</h2>
        <p>Plan actual: Premium Mensual</p>
        <p>Próxima renovación: 15 de Agosto, 2024</p>
        <button className="mt-4 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg">
          Cambiar Plan
        </button>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
        <p>Tarjeta terminada en: **** 1234</p>
        <button className="mt-4 px-4 py-2 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg">
          Actualizar Método de Pago
        </button>
      </div>
      
      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Historial de Pagos</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">Aquí aparecerá tu historial de pagos.</p>
        {/* Placeholder for payment history list */}
      </div>
       <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Dirección de Facturación</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">Configura tu dirección de facturación.</p>
        {/* Placeholder for billing address form */}
      </div>
    </div>
  );
};

export default SubscriptionPage;
