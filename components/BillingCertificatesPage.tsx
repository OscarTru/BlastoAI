
import React from 'react';
import { SidebarBillingIcon } from '../constants';

const BillingCertificatesPage: React.FC = () => {
  return (
    <div className="space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        <SidebarBillingIcon className="w-10 h-10 text-primary dark:text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Facturación y Certificados</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Accede a tus facturas, certificados y materiales.</p>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Facturas</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">Aquí podrás descargar tus facturas de suscripción.</p>
        {/* Placeholder for invoices list */}
      </div>
      
      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Certificados de Curso</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">Descarga tus certificados PDF de cursos completados.</p>
        {/* Placeholder for certificates list */}
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <h2 className="text-xl font-semibold mb-4">Material Complementario</h2>
        <p className="text-text-secondary-light dark:text-text-secondary-dark">Accede al material complementario que has descargado.</p>
        {/* Placeholder for downloaded materials list */}
      </div>
    </div>
  );
};

export default BillingCertificatesPage;
