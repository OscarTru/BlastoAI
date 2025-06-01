import React from 'react';
import { NewAppLogo } from './components/NewAppLogo'; 
import { 
  HomeIcon as OriginalHomeIcon, 
  BookOpenIcon as OriginalBookOpenIcon, 
  ClipboardDocumentListIcon as OriginalClipboardIcon, 
  UserCircleIcon as OriginalUserCircleIcon, 
  MoonIcon as OriginalMoonIcon, 
  SunIcon as OriginalSunIcon,
  SparklesIcon as OriginalSparklesIcon,
  SendIcon as OriginalSendIcon,
  PencilAndStarsIcon as OriginalPencilSquareIcon, // Changed import to PencilAndStarsIcon
  DocumentTextIcon as OriginalDocumentTextIcon, 
  StethoscopeIcon as OriginalStethoscopeIcon,
  LightbulbIcon as OriginalLightBulbIcon,
  ChatBubbleOvalLeftEllipsisIcon as OriginalChatIcon, 
  ShareIcon as OriginalShareIcon,
  // New Solid Icons
  SolidHomeIcon, 
  SolidDocumentTextIcon, 
  SolidFolderIcon,
  SolidCogIcon,
  SolidCreditCardIcon,
  // New Icon for Syllabus
  StackedBooksIcon,
  // New Icon for Clinical Cases
  MedicalBagIcon,
  // New Icon for Exams
  ChecklistIcon,
  // New Icon for Dashboard
  PresentationChartBarIcon,
  // New Icon for Blasto AI Chat Sidebar
  NeuronIcon,
  // New Icon for Exam Prep
  AcademicCapIcon,
  // New Icon for Topics Detail Overlay
  ArrowTrendingUpIcon,
  // New Icons for Settings Sections
  ShieldCheckIcon,
  ScaleIcon,
  ReceiptPercentIcon,
  LifebuoyIcon,
  // Icons for ENARM Prep Flow
  ChevronLeftIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckCircleIconSolid,
  CircleIconOutline,
  // New Icons for Exams Page
  BookOpenCheckIcon,
  DocumentMagnifyingGlassIcon,
} from './components/icons'; 


export const APP_NAME = "Blasto Med"; 

export const ROUTES = {
  DASHBOARD: "/", 
  CHAT: "/chat", 
  SYLLABUS: "/syllabus", 
  CASES: "/cases",
  EXAMS: "/exams",
  LIBRARY: "/library",
  PROFILE: "/profile", 
  SUBSCRIPTIONS: "/subscriptions", 
  PRIVACY_SECURITY: "/privacy-security",
  LEGAL: "/legal",
  BILLING_CERTIFICATES: "/billing-certificates",
  SUPPORT: "/support",
  ENARM_PREP: "/enarm-prep", // Legacy or general ENARM prep
  // MIR_PREP: "/mir-prep", // Legacy MIR prep, replaced by MIR_PREP_XP
  // USMLE_PREP: "/usmle-prep", // Legacy USMLE prep, replaced by USMLE_PREP_XP
  ENARM_PREP_XP: "/enarm-prep-xp", // New enhanced ENARM prep flow
  MIR_PREP_XP: "/mir-prep-xp", // New enhanced MIR prep flow
  USMLE_PREP_XP: "/usmle-prep-xp", // New enhanced USMLE prep flow
  PLAB_PREP_XP: "/plab-prep-xp" // New enhanced PLAB prep flow
};

export const AppLogoIcon: React.FC<{ className?: string; }> = ({ className = "w-8 h-8" }) => (
  <NewAppLogo className={className} />
);

export const AnimatedAppLogo: React.FC<{ className?: string; isAnimated?: boolean }> = ({ className = "w-10 h-10", isAnimated = false }) => (
   <NewAppLogo className={`${className} ${isAnimated ? 'animate-pulse-soft' : ''}`} />
);

export const SmallAppLogo: React.FC<{ className?: string }> = ({ className = "w-7 h-7" }) => (
  <NewAppLogo className={className} /> 
);

// Existing Icons
export const HomeIcon = OriginalHomeIcon; 
export const BookOpenIcon = OriginalBookOpenIcon;
export const ClipboardDocumentListIcon = OriginalClipboardIcon; 
export const UserCircleIcon = OriginalUserCircleIcon; 
export const MoonIcon = OriginalMoonIcon;
export const SunIcon = OriginalSunIcon;
export const SparklesIcon = OriginalSparklesIcon;
export const SendIcon = OriginalSendIcon;
export const PencilSquareIcon = OriginalPencilSquareIcon; // Using PencilSquareIcon for edit actions
export const DocumentTextIcon = OriginalDocumentTextIcon; 
export const StethoscopeIcon = OriginalStethoscopeIcon; 
export const LightbulbIcon = OriginalLightBulbIcon;
export const ChatIcon = OriginalChatIcon; 
export const ShareIcon = OriginalShareIcon;
export { 
    AcademicCapIcon, ArrowTrendingUpIcon,
    ChevronLeftIcon, ArrowRightIcon, CalendarDaysIcon, CheckCircleIconSolid, CircleIconOutline, 
    BookOpenCheckIcon, DocumentMagnifyingGlassIcon 
}; 


// Icons defined directly in constants.tsx
export const SearchIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export const BellIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
);

export const GlobeAltIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A11.978 11.978 0 0112 16.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 003 12c0 .778.099 1.533.284 2.253m0 0c.117.361.27.712.453 1.047M12 10.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm0 0V3m0 7.5L10.5 9" />
  </svg>
);

export const ChartBarIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
  </svg>
);

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <MedicalBagIcon className={className} />
);

export const NewSyllabusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <StackedBooksIcon className={className} />
);

export const DocumentDuplicateIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 4.876v-1.625c0-.621-.504-1.125-1.125-1.125h-1.5a1.125 1.125 0 01-1.125-1.125V10.5m6.75 4.876h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h1.5m-6.75 4.875c.618 0 1.125-.504 1.125-1.125v-1.5a1.125 1.125 0 00-1.125-1.125h-1.5a1.125 1.125 0 00-1.125-1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5z" />
  </svg>
);

export const FolderIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <SolidFolderIcon className={className} />
);

export const Cog6ToothIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
 <SolidCogIcon className={className} />
);

export const CreditCardIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <SolidCreditCardIcon className={className} />
);

// Sidebar specific icons
export const SidebarDashboardIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<PresentationChartBarIcon className={className} />); 
export const SidebarSyllabusIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<NewSyllabusIcon className={className} />); 
export const SidebarCasesIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<MedicalBagIcon className={className} />); 
export const SidebarExamsIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<ChecklistIcon className={className} />); 
export const SidebarLibraryIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<FolderIcon className={className} />); 
export const SidebarChatIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<NeuronIcon className={className} />); 

// Account/Settings Area Icons
export const SidebarAccountIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<Cog6ToothIcon className={className} />); 
export const SidebarSubscriptionIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<CreditCardIcon className={className} />); 
export const SidebarPrivacyIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<ShieldCheckIcon className={className} />);
export const SidebarBillingIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<ReceiptPercentIcon className={className} />);
export const SidebarLegalIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<ScaleIcon className={className} />);
export const SidebarSupportIcon: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (<LifebuoyIcon className={className} />);


export const Bars3Icon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const XMarkIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-6 h-6", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Exams Page Tab Icons
export { BookOpenCheckIcon as ExamsPlanIcon };
export { DocumentMagnifyingGlassIcon as ExamsSimulationsIcon };

// Generic Brain/AI icon for ENARM Prep Button
export const BrainIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12.75h7.5m-7.5-3h7.5m-1.5-3l-1.5-1.5-1.5 1.5M12 21.75a2.25 2.25 0 002.25-2.25H9.75a2.25 2.25 0 002.25 2.25z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.188 3.099A6.002 6.002 0 0012 2.25a6 6 0 00-3.188.85m6.376 0M19.5 6.375A6.002 6.002 0 0012 4.5a6 6 0 00-7.5 1.875m15 0M4.5 6.375A6.002 6.002 0 0112 4.5a6 6 0 017.5 1.875M4.5 10.125a5.25 5.25 0 0115 0M4.5 10.125V15A5.25 5.25 0 0012 20.25a5.25 5.25 0 007.5-5.25V10.125" />
  </svg>
);

export const ChevronDownIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);
