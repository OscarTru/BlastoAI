
import React, { useState, useEffect, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { 
  ROUTES, APP_NAME, AppLogoIcon, UserCircleIcon, MoonIcon, SunIcon,
  SearchIcon, BellIcon, GlobeAltIcon, Bars3Icon, XMarkIcon,
  SidebarDashboardIcon, SidebarSyllabusIcon, SidebarCasesIcon, SidebarExamsIcon,
  SidebarLibraryIcon, SidebarChatIcon, SidebarAccountIcon, SidebarSubscriptionIcon,
  SidebarPrivacyIcon, SidebarBillingIcon, SidebarLegalIcon, SidebarSupportIcon,
  ChevronDownIcon // Added ChevronDownIcon
} from './constants';
import SyllabusPage from './components/SyllabusPage';
import ClinicalCasesPage from './components/ClinicalCasesPage';
import ProfilePage from './components/ProfilePage';
import PersistentChat from './components/ChatPage'; 
import DashboardPage from './components/DashboardPage';
import ExamsPage from './components/ExamsPage';
import SubscriptionPage from './components/SubscriptionPage';
import PrivacySecurityPage from './components/PrivacySecurityPage';
import LegalPage from './components/LegalPage';
import BillingCertificatesPage from './components/BillingCertificatesPage';
import SupportPage from './components/SupportPage';
import EnarmPrepFlowPage from './components/enarm-prep/EnarmPrepFlowPage'; 
import EnarmPrepFlowPageXp from './components/enarm-prep/EnarmPrepFlowPageXp';
import MirPrepFlowPageXp from './components/mir-prep/MirPrepFlowPageXp';
import UsmlePrepFlowPageXp from './components/usmle-prep/UsmlePrepFlowPageXp';
import PlabPrepFlowPageXp from './components/plab-prep/PlabPrepFlowPageXp'; // Added PLAB XP Flow

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isCollapsed: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isCollapsed, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group hover:bg-primary/20 dark:hover:bg-primary/30 ${
        isActive 
          ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary border border-primary/50 dark:border-primary/70 shadow-sm'
          : 'text-text-secondary-light hover:text-text-primary-light dark:text-text-secondary-dark dark:hover:text-text-primary-dark border border-transparent'
      } ${isCollapsed ? 'justify-center' : ''}`
    }
  >
    {icon}
    {!isCollapsed && <span className="text-sm font-medium">{label}</span>}
    {isCollapsed && <span className="sr-only">{label}</span>}
  </NavLink>
);

const ThemeToggleButton: React.FC<{ theme: 'light' | 'dark'; toggleTheme: () => void, className?: string }> = ({ theme, toggleTheme, className }) => (
  <button
    onClick={toggleTheme}
    className={`p-2 rounded-full hover:bg-white/10 text-text-on-header-blue transition-colors duration-200 ${className}`}
    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
  >
    {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
  </button>
);

const TopNavbar: React.FC<{ 
  theme: 'light' | 'dark'; 
  toggleTheme: () => void; 
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}> = ({ theme, toggleTheme, toggleSidebar, sidebarOpen }) => {
  const userName = "Dr. Alex K.";

  return (
    <header className="bg-header-blue border-b border-white/20 sticky top-0 z-40 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="p-2 rounded-full text-text-on-header-blue hover:bg-white/10 md:hidden mr-2"
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <XMarkIcon className="w-6 h-6"/> : <Bars3Icon className="w-6 h-6"/>}
        </button>
        <Link to={ROUTES.DASHBOARD} className="flex items-center space-x-2 group md:hidden">
          <AppLogoIcon className="w-8 h-8" /> 
        </Link>
      </div>

      <div className="flex-1 flex justify-center px-2 sm:px-4">
        <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <SearchIcon className="w-5 h-5 text-text-on-header-blue/70 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          <input 
            type="search" 
            placeholder="Buscar en Blasto Med..." 
            className="w-full pl-10 pr-3 py-2 bg-white/10 border border-transparent rounded-lg text-sm text-text-on-header-blue placeholder:text-text-on-header-blue/70 focus:ring-2 focus:ring-white/50 focus:border-white/30 outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-1 sm:space-x-2">
        <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
        <button className="p-2 rounded-full hover:bg-white/10 text-text-on-header-blue">
          <BellIcon className="w-5 h-5" /> <span className="sr-only">Notifications</span>
        </button>
        <button className="p-2 rounded-full hover:bg-white/10 text-text-on-header-blue">
          <GlobeAltIcon className="w-5 h-5" /> <span className="sr-only">Language</span>
        </button>
        <Link 
          to={ROUTES.PROFILE} 
          className="flex items-center space-x-2 p-1 pr-2 hover:bg-white/10 rounded-full transition-colors duration-200"
        >
          <UserCircleIcon className="w-7 h-7 text-text-on-header-blue" />
          <span className="text-sm font-medium text-text-on-header-blue hidden sm:inline">{userName}</span>
        </Link>
      </div>
    </header>
  );
};

const SyllabusSubNavItem: React.FC<{ to: string; label: string; onClick?: () => void; isCollapsed: boolean; }> = ({ to, label, onClick, isCollapsed }) => {
  if (isCollapsed) return null;

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center pl-5 pr-3 py-1.5 rounded-md transition-all duration-150 ease-in-out group text-sm hover:bg-primary/10 dark:hover:bg-primary/20 ${
          isActive
            ? 'text-accent dark:text-accent font-semibold' // Use accent for active sub-item
            : 'text-text-secondary-light hover:text-text-primary-light dark:text-text-secondary-dark dark:hover:text-text-primary-dark'
        }`
      }
    >
      <span className="mr-2 text-xs">–</span> {/* Simple dash for indentation visual cue */}
      {label}
    </NavLink>
  );
};


const Sidebar: React.FC<{ isCollapsed: boolean; toggleSidebar?: () => void; isMobile?: boolean }> = ({ isCollapsed, toggleSidebar, isMobile = false }) => {
  const [isSyllabusOpen, setIsSyllabusOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === ROUTES.SYLLABUS) {
      setIsSyllabusOpen(true);
    }
  }, [location.pathname, location.hash]);

  const isSyllabusSectionActive = location.pathname === ROUTES.SYLLABUS;
  
  const syllabusSubLinks = [
    { to: `${ROUTES.SYLLABUS}#basicas1`, label: "Básicas I" },
    { to: `${ROUTES.SYLLABUS}#basicas2`, label: "Básicas II" },
    { to: `${ROUTES.SYLLABUS}#clinicas1`, label: "Clínicas I" },
    { to: `${ROUTES.SYLLABUS}#clinicas2`, label: "Clínicas II" },
  ];

  return (
  <aside className={`bg-surface-light dark:bg-surface-dark shadow-lg transition-all duration-300 ease-in-out flex flex-col ${isCollapsed ? 'w-16 sm:w-20' : 'w-64'}`}>
    <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'px-4'} h-16 border-b border-white/20 shrink-0 bg-header-blue`}>
      <Link to={ROUTES.DASHBOARD} className="flex items-center space-x-2 group">
        <AppLogoIcon className="w-8 h-8" />
        {!isCollapsed && <h1 className="text-xl font-semibold text-text-on-header-blue">{APP_NAME}</h1>}
      </Link>
    </div>
    <nav className="flex-grow p-3 space-y-1.5 overflow-y-auto custom-scrollbar">
      <NavItem to={ROUTES.DASHBOARD} icon={<SidebarDashboardIcon className="w-5 h-5"/>} label="Dashboard" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
      
      {/* Temario Accordion */}
      <div>
        <button
          onClick={() => {
            setIsSyllabusOpen(!isSyllabusOpen);
          }}
          className={`flex items-center w-full space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 ease-in-out group hover:bg-primary/20 dark:hover:bg-primary/30 ${
            isSyllabusSectionActive
              ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary'
              : 'text-text-secondary-light hover:text-text-primary-light dark:text-text-secondary-dark dark:hover:text-text-primary-dark'
          } ${isCollapsed ? 'justify-center' : 'justify-between'}`}
          aria-expanded={isSyllabusOpen}
          aria-controls="syllabus-submenu"
        >
          <div className="flex items-center space-x-3">
            <SidebarSyllabusIcon className="w-5 h-5"/>
            {!isCollapsed && <span className="text-sm font-medium">Temario</span>}
             {isCollapsed && <span className="sr-only">Temario</span>}
          </div>
          {!isCollapsed && (
            <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isSyllabusOpen ? 'rotate-180' : ''}`} />
          )}
        </button>
        
        <div 
          className={`transition-all duration-300 ease-in-out overflow-hidden ${isSyllabusOpen && !isCollapsed ? 'max-h-96' : 'max-h-0'}`}
          id="syllabus-submenu"
        >
          {isSyllabusOpen && !isCollapsed && (
            <div className="pt-1 space-y-0.5 ml-1"> {/* Indentation for sub-items */}
              {syllabusSubLinks.map(link => (
                <SyllabusSubNavItem 
                  key={link.to} 
                  to={link.to} 
                  label={link.label} 
                  onClick={isMobile ? toggleSidebar : undefined} 
                  isCollapsed={isCollapsed} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {/* End Temario Accordion */}

      <NavItem to={ROUTES.CASES} icon={<SidebarCasesIcon className="w-5 h-5"/>} label="Casos Clínicos" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined}/>
      <NavItem to={ROUTES.EXAMS} icon={<SidebarExamsIcon className="w-5 h-5"/>} label="Exámenes" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined}/>
      <NavItem to={ROUTES.LIBRARY} icon={<SidebarLibraryIcon className="w-5 h-5"/>} label="Biblioteca" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined}/>
      
      <div className="pt-2"> 
         <NavItem to={ROUTES.CHAT} icon={<SidebarChatIcon className="w-5 h-5"/>} label="Blasto AI" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
      </div>
    </nav>
    <div className="p-3 border-t border-border-light dark:border-border-dark shrink-0 space-y-1.5">
      <NavItem to={ROUTES.PROFILE} icon={<SidebarAccountIcon className="w-5 h-5"/>} label="Configuración" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
      <NavItem to={ROUTES.SUBSCRIPTIONS} icon={<SidebarSubscriptionIcon className="w-5 h-5"/>} label="Suscripción y Pagos" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
      <NavItem to={ROUTES.PRIVACY_SECURITY} icon={<SidebarPrivacyIcon className="w-5 h-5"/>} label="Privacidad y Seguridad" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
      <NavItem to={ROUTES.BILLING_CERTIFICATES} icon={<SidebarBillingIcon className="w-5 h-5"/>} label="Facturación" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
      <NavItem to={ROUTES.LEGAL} icon={<SidebarLegalIcon className="w-5 h-5"/>} label="Legal" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
      <NavItem to={ROUTES.SUPPORT} icon={<SidebarSupportIcon className="w-5 h-5"/>} label="Soporte" isCollapsed={isCollapsed} onClick={isMobile ? toggleSidebar : undefined} />
    </div>
  </aside>
  );
};


const AppContent: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
      if (storedTheme) return storedTheme;
    }
    return 'dark'; // Default to dark theme for futuristic feel
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return newTheme;
    });
  };

  const toggleMobileSidebar = () => setIsMobileSidebarOpen(!isMobileSidebarOpen);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  
  const fullScreenRoutes = [
    ROUTES.CHAT, 
    ROUTES.ENARM_PREP, 
    ROUTES.ENARM_PREP_XP,
    ROUTES.MIR_PREP_XP,
    ROUTES.USMLE_PREP_XP,
    ROUTES.PLAB_PREP_XP // Added PLAB XP route
  ];

  useEffect(() => {
    if (fullScreenRoutes.includes(location.pathname)) {
      setIsDesktopSidebarCollapsed(true);
    } else {
       setIsDesktopSidebarCollapsed(false); 
    }
  }, [location.pathname, fullScreenRoutes]);

  const handleMobileSidebarNavItemClick = () => {
    if (isMobileSidebarOpen) {
      setIsMobileSidebarOpen(false);
    }
  };
  
  const handleNavigateToChatWithContext = useCallback((contextPrompt: string) => {
    navigate(ROUTES.CHAT, { state: { initialChatPrompt: contextPrompt } });
  }, [navigate]);

  const isFullScreenRoute = fullScreenRoutes.includes(location.pathname);

  if (isFullScreenRoute) {
    let pageComponent;
    switch (location.pathname) {
      case ROUTES.ENARM_PREP: // Legacy ENARM
        pageComponent = <EnarmPrepFlowPage />;
        break;
      case ROUTES.ENARM_PREP_XP:
        pageComponent = <EnarmPrepFlowPageXp />;
        break;
      case ROUTES.MIR_PREP_XP:
        pageComponent = <MirPrepFlowPageXp />;
        break;
      case ROUTES.USMLE_PREP_XP:
        pageComponent = <UsmlePrepFlowPageXp />;
        break;
      case ROUTES.PLAB_PREP_XP: // New PLAB XP
        pageComponent = <PlabPrepFlowPageXp />;
        break;
      case ROUTES.CHAT:
        // Chat is handled by the main router below as it's not standalone in the same way
        break; 
      default:
        pageComponent = null;
    }

    // Render prep flows standalone
    if (pageComponent && location.pathname !== ROUTES.CHAT) {
      return (
        <div className="h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark overflow-hidden">
          {pageComponent}
        </div>
      );
    }
  }


  return (
      <div className="flex h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark overflow-hidden">
        <div className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}>
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm md:hidden" onClick={toggleMobileSidebar} aria-hidden="true"></div>
          <Sidebar isCollapsed={false} toggleSidebar={handleMobileSidebarNavItemClick} isMobile={true} />
        </div>

        <div className="hidden md:flex">
           <Sidebar isCollapsed={isDesktopSidebarCollapsed} /> 
        </div>
        
        <div className="flex flex-col flex-grow overflow-hidden">
          <TopNavbar 
            theme={theme} 
            toggleTheme={toggleTheme} 
            toggleSidebar={toggleMobileSidebar}
            sidebarOpen={isMobileSidebarOpen}
          />
          <main className="flex-grow p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
            <Routes>
              <Route path={ROUTES.DASHBOARD} element={<DashboardPage openChatWithContext={handleNavigateToChatWithContext}/>} />
              <Route path={ROUTES.CHAT} element={<PersistentChat />} />
              <Route path={ROUTES.SYLLABUS} element={<SyllabusPage openChatWithContext={handleNavigateToChatWithContext} />} />
              <Route path={ROUTES.CASES} element={<ClinicalCasesPage openChatWithContext={handleNavigateToChatWithContext} />} />
              <Route path={ROUTES.EXAMS} element={<ExamsPage />} /> 
              <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
              <Route path={ROUTES.SUBSCRIPTIONS} element={<SubscriptionPage />} />
              <Route path={ROUTES.PRIVACY_SECURITY} element={<PrivacySecurityPage />} />
              <Route path={ROUTES.LEGAL} element={<LegalPage />} />
              <Route path={ROUTES.BILLING_CERTIFICATES} element={<BillingCertificatesPage />} />
              <Route path={ROUTES.SUPPORT} element={<SupportPage />} />
              {/* Prep routes are handled by conditional full-screen rendering above */}
              <Route path="*" element={<DashboardPage openChatWithContext={handleNavigateToChatWithContext} />} /> 
            </Routes>
          </main>
        </div>
      </div>
  );
};

const RoutedApp: React.FC = () => (
  <HashRouter>
    <AppContent /> 
  </HashRouter>
);

export default RoutedApp;