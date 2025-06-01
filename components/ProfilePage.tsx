
import React, { useState } from 'react';
import { User, UserLevel, UserProgress } from '../types';
import { UserCircleIcon, SparklesIcon, ShareIcon, Cog6ToothIcon } from '../constants'; 

const mockUser: User = {
  id: 'user123',
  name: 'Dr. Alex K.',
  email: 'alex.k@example.com',
  level: UserLevel.Resident,
  profilePictureUrl: 'https://picsum.photos/seed/blastoaiuser/200/200', 
  progress: {
    topicsViewed: 78,
    casesSolved: 32,
    timeInvestedHours: 120,
  }
};

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving user data:", user);
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 text-text-primary-light dark:text-text-primary-dark">
      <div className="flex items-center space-x-4 p-5 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-md-soft border border-border-light dark:border-border-dark">
        {/* Cog6ToothIcon will now render the SolidCogIcon */}
        <Cog6ToothIcon className="w-10 h-10 text-primary dark:text-primary" />
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary-light dark:text-text-primary-dark">Mi Perfil y Configuración</h1>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Gestiona tu información, progreso y preferencias.</p>
        </div>
      </div>

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-5 sm:space-y-0 sm:space-x-6">
          <img 
            src={user.profilePictureUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=00C2FF&color=FFFFFF&size=128&font-size=0.33&bold=true`} 
            alt={user.name} 
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-md border-4 border-surface-light dark:border-surface-dark ring-2 ring-primary"
          />
          <div className="flex-grow text-center sm:text-left w-full">
            {isEditing ? (
              <input 
                type="text" 
                name="name" 
                value={user.name} 
                onChange={handleInputChange}
                className="text-2xl font-bold bg-transparent border-b-2 border-primary focus:outline-none w-full mb-2 py-1 text-text-primary-light dark:text-text-primary-dark"
                placeholder="Nombre Completo"
              />
            ) : (
              <h2 className="text-2xl sm:text-3xl font-bold mb-0.5 text-text-primary-light dark:text-text-primary-dark">{user.name}</h2>
            )}
            
            {isEditing ? (
              <input 
                type="email" 
                name="email" 
                value={user.email} 
                onChange={handleInputChange}
                className="text-sm bg-transparent border-b border-border-light dark:border-border-dark focus:outline-none w-full mb-3 py-1 text-text-secondary-light dark:text-text-secondary-dark"
                placeholder="Correo Electrónico"
              />
            ) : (
              <p className="text-md text-text-secondary-light dark:text-text-secondary-dark">{user.email}</p>
            )}

            {isEditing ? (
              <select 
                name="level" 
                value={user.level} 
                onChange={handleInputChange}
                className="text-sm font-medium bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark rounded-md focus:outline-none focus:border-primary w-full mt-2 p-2 text-text-primary-light dark:text-text-primary-dark"
              >
                {Object.values(UserLevel).map(level => (
                  <option key={level} value={level} className="bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark">{level}</option>
                ))}
              </select>
            ) : (
              <p className="text-md text-primary dark:text-accent font-semibold mt-1">{user.level}</p>
            )}
             <div className="mt-5">
              {isEditing ? (
                <div className="flex space-x-3">
                   <button 
                    onClick={handleSave}
                    className="px-5 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg shadow-sm hover:shadow-md-soft transition-all text-sm font-semibold"
                  >
                    Guardar Cambios
                  </button>
                   <button 
                    onClick={() => setIsEditing(false)}
                    className="px-5 py-2 bg-border-light dark:bg-border-dark hover:bg-slate-300 dark:hover:bg-slate-600 text-text-primary-light dark:text-text-primary-dark rounded-lg transition-all text-sm font-semibold"
                  >
                    Cancelar
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg shadow-sm hover:shadow-md-soft transition-all text-sm font-semibold"
                >
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {user.progress && (
        <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
          <h3 className="text-xl sm:text-2xl font-semibold mb-5 flex items-center text-text-primary-light dark:text-text-primary-dark">
            <SparklesIcon className="w-6 h-6 text-accent mr-2.5" />
            Progreso Acumulado
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 text-center">
            {(Object.keys(user.progress) as Array<keyof UserProgress>).map(key => {
              const labels = { topicsViewed: "Temas Vistos", casesSolved: "Casos Resueltos", timeInvestedHours: "Tiempo Invertido" };
              const value = user.progress![key];
              return (
                <div key={key} className="p-4 bg-bg-light dark:bg-bg-dark rounded-lg shadow-sm border border-border-light dark:border-border-dark">
                  <p className="text-2xl sm:text-3xl font-bold text-primary dark:text-primary">
                    {value}{key === 'timeInvestedHours' ? 'h' : ''}
                  </p>
                  <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider">{labels[key]}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 text-center">
            <button className="inline-flex items-center space-x-2 px-5 py-2 bg-accent hover:bg-accent-dark text-white rounded-lg shadow-sm hover:shadow-md-soft transition-all text-sm font-semibold">
              <ShareIcon className="w-4 h-4" />
              <span>Compartir Mi Progreso</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-surface-light dark:bg-surface-dark p-6 sm:p-8 rounded-2xl shadow-soft border border-border-light dark:border-border-dark">
          <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-text-primary-light dark:text-text-primary-dark">Redes Sociales</h3>
          <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">Próximamente podrás conectar tus redes sociales para compartir tus logros y avances.</p>
          <div className="flex space-x-3 mt-4">
            {['L', 'X', 'I'].map(letter => (
              <div key={letter} className="w-9 h-9 bg-bg-light dark:bg-bg-dark rounded-full flex items-center justify-center text-text-secondary-light dark:text-text-secondary-dark text-md font-medium border border-border-light dark:border-border-dark">{letter}</div>
            ))}
          </div>
      </div>

    </div>
  );
};

export default ProfilePage;