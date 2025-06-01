

import React from 'react';

// Original Icons from constants.tsx are moved here

export const SolidHomeIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
    <path d="M11.47 3.84a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06l-6.97-6.97V18.75a.75.75 0 01-1.5 0V5.432L4.53 12.4a.75.75 0 01-1.06-1.06l7.5-7.5z" />
    <path d="M12 5.432L4.53 12.4v6.35a.75.75 0 00.75.75h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v5.25a.75.75 0 00.75.75h3.75a.75.75 0 00.75-.75V12.4L12 5.432z" />
  </svg>
);

export const SolidDocumentTextIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
    <path fillRule="evenodd" d="M5.625 1.5A3.375 3.375 0 002.25 4.875v14.25A3.375 3.375 0 005.625 22.5h12.75A3.375 3.375 0 0021.75 19.125V4.875A3.375 3.375 0 0018.375 1.5H5.625zM9.75 6a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zm.75 3.75a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3zm-2.25 3a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM8.25 15a.75.75 0 000 1.5h7.5a.75.75 0 000-1.5h-7.5z" clipRule="evenodd" />
  </svg>
);

export const SolidFolderIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
    <path d="M19.5 21a3 3 0 003-3V9a3 3 0 00-3-3h-5.379a.75.75 0 01-.53-.22L11.172 3.36a2.25 2.25 0 00-1.591-.653H4.5a3 3 0 00-3 3v12a3 3 0 003 3h15z" />
  </svg>
);

export const SolidCogIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
    <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 7.889c-.02.12-.115.26-.297.348a7.493 7.493 0 00-.986.57c-.166.097-.335.22-.476.383L6.9 9.83a1.875 1.875 0 00-2.652 0L2.922 11.156a1.875 1.875 0 000 2.652l1.328 1.328c.14.162.31.286.476.383.314.184.637.348.986.57.182.088.277.228.297.348l.178 4.072c.152.904.933 1.567 1.85 1.567h1.844c.917 0 1.699-.663 1.85-1.567l.178-4.072c.02-.12.114-.26.297-.348.349-.16.672-.324.986-.57.166-.097.335-.22.476-.383l1.328-1.328a1.875 1.875 0 000-2.652l-1.328-1.328c-.14-.162-.31-.286-.476-.383a7.493 7.493 0 00-.986-.57c-.182-.088-.277-.228-.297-.348l-.178-4.072A1.875 1.875 0 0012.922 2.25h-1.844zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clipRule="evenodd" />
  </svg>
);

export const SolidCreditCardIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
    <path d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15z" />
  </svg>
);

export const StackedBooksIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5V9.75A2.25 2.25 0 016.75 7.5h10.5A2.25 2.25 0 0119.5 9.75v9.75M4.5 19.5H19.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 15V6.75A2.25 2.25 0 017.5 4.5h9A2.25 2.25 0 0118.75 6.75V15M5.25 15H18.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 10.5V4.5A2.25 2.25 0 018.25 2.25h7.5A2.25 2.25 0 0118 4.5v6M6 10.5H18" />
  </svg>
);

export const MedicalBagIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 0A2.25 2.25 0 016 6.75h12A2.25 2.25 0 0120.25 9v9.75A2.25 2.25 0 0118 21H6a2.25 2.25 0 01-2.25-2.25V9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V5.25a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5V6.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15.75V12.75m-1.5 1.5h3" />
  </svg>
);

export const ChecklistIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75h-9A2.25 2.25 0 005.25 6v13.5A2.25 2.25 0 007.5 21.75h9a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0016.5 3.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.75V2.25a1.5 1.5 0 011.5-1.5h1.5a1.5 1.5 0 011.5 1.5V3.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 9h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 12h4.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 11.5l1 1 2-2" />
  </svg>
);

export const PresentationChartBarIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h12A2.25 2.25 0 0020.25 14.25V3M3.75 3H20.25M3.75 3A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5v4.5m-3.75-4.5h7.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 12.75V9M12 12.75V6.75M16.5 12.75V10.5" />
 </svg>
);

export const NeuronIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <circle cx="12" cy="12" r="3" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V5M12 5L10.5 7M12 5L13.5 7" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15V19M12 19L10.5 17M12 19L13.5 17" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12H5M5 12L7 10.5M5 12L7 13.5" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H19M19 12L17 10.5M19 12L17 13.5" />
    <line x1="14.1" y1="9.9" x2="16.5" y2="7.5" />
    <line x1="9.9" y1="9.9" x2="7.5" y2="7.5" />
    <line x1="9.9" y1="14.1" x2="7.5" y2="16.5" />
    <line x1="14.1" y1="14.1" x2="16.5" y2="16.5" />
  </svg>
);

export const AcademicCapIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
  </svg>
);

export const ArrowTrendingUpIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.517l2.74-1.22m0 0l-3.94.886M21.75 6.75l-.886 3.942" />
  </svg>
);


export const PencilAndStarsIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12.75h-2.25a2.25 2.25 0 00-2.25 2.25v2.25H9.75V15a2.25 2.25 0 00-2.25-2.25H5.25m12.75 0H18M5.25 12.75H3M18 21H6a3 3 0 01-3-3V8.25a3 3 0 013-3h10.5a3 3 0 013 3V18a3 3 0 01-3 3z" opacity="0.6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.5 5.5l.4-.8a.5.5 0 01.9 0l.4.8.8.4a.5.5 0 010 .9l-.8.4-.4.8a.5.5 0 01-.9 0l-.4-.8-.8-.4a.5.5 0 010-.9l.8-.4z" /> 
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.5 3.5l.3-.6a.375.375 0 01.675 0l.3.6.6.3a.375.375 0 010 .675l-.6.3-.3.6a.375.375 0 01-.675 0l-.3-.6-.6-.3a.375.375 0 010-.675l.6-.3z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 10.5l.3-.6a.375.375 0 01.675 0l.3.6.6.3a.375.375 0 010 .675l-.6.3-.3.6a.375.375 0 01-.675 0l-.3-.6-.6-.3a.375.375 0 010-.675l.6-.3z" transform="translate(10 5)" />
  </svg>
);

export const DocumentTextIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const StethoscopeIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75L18 18M3 12V8.25A2.25 2.25 0 015.25 6h1.5M21 12V8.25A2.25 2.25 0 0018.75 6h-1.5" />
  </svg>
);

export const HomeIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h7.5" />
  </svg>
);

export const BookOpenIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const ClipboardDocumentListIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.172AA48.322 48.322 0 0012 3.75c-2.796 0-5.48.403-7.924 1.186A2.25 2.25 0 002.25 6.108V18.75c0 1.242 1.008 2.25 2.25 2.25H6.75M12 3.75V12m0 0V21" />
  </svg>
);

export const UserCircleIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-6 h-6", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const SparklesIcon: React.FC<{ className?: string; title?: string; } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L1.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L21 5.25l-.813 2.846a4.5 4.5 0 00-3.09 3.09L14.25 12l2.846.813a4.5 4.5 0 003.09 3.09L21 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09zM12 16.875c.398 0 .779-.034 1.153-.099a4.501 4.501 0 007.44-1.988V9.339c0-.255-.03-.507-.085-.752a4.5 4.5 0 00-7.883-1.618c-.37.05-.746.082-1.125.082C6.625 7.05 3.75 9.925 3.75 13.5S6.625 19.95 12 19.95z" />
  </svg>
);

export const SendIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
  </svg>
);

export const SunIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 12a2.25 2.25 0 00-2.25 2.25c0 1.242.75 2.39 1.875 2.84M12 12a2.25 2.25 0 012.25 2.25c0 1.242-.75 2.39-1.875 2.84M12 12a2.25 2.25 0 00-2.25-2.25c-1.242 0-2.39.75-2.84 1.875M12 12a2.25 2.25 0 012.25-2.25c1.242 0 2.39.75 2.84 1.875M12 12h.008v.008H12V12z" />
  </svg>
);

export const MoonIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
  </svg>
);

export const ChatBubbleOvalLeftEllipsisIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a.375.375 0 01.265-.112c2.331-.052 4.63-1.106 4.63-4.71V9.75A4.505 4.505 0 0012.25 5.25H8.25A4.505 4.505 0 003.75 9.75v3.01z" />
  </svg>
);

export const LightbulbIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => ( 
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.375 6.375 0 006.375-6.375H5.625a6.375 6.375 0 006.375 6.375zM12 18H9m3 0h3m-3 0v.75m0-.75c-.016-.024-.036-.047-.054-.071M15 12.75a3 3 0 01-6 0m6 0H9m3.75 0a3.75 3.75 0 00-3.75-3.75M12 3c2.485 0 4.5 2.015 4.5 4.5H7.5A4.5 4.5 0 0112 3z" />
  </svg>
);

export const ShareIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.524.02 1.048.058 1.575.115a9.742 9.742 0 016.042 2.058M7.217 10.907a9.723 9.723 0 006.042-2.058 9.743 9.743 0 001.575-.115m-7.617 2.186a2.25 2.25 0 100-2.186m0 2.186a2.25 2.25 0 100-2.186m2.25 0a2.25 2.25 0 100-2.186m0 2.186H9.467m0 0a2.25 2.25 0 100-2.186M14.25 7.5a2.25 2.25 0 100-2.186m0 2.186c.524.02 1.048.058 1.575.115a9.742 9.742 0 016.042 2.058M14.25 7.5a9.723 9.723 0 006.042-2.058 9.743 9.743 0 001.575-.115" />
</svg>
);

// New Icons for Settings Area
export const ShieldCheckIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 0V3M3.598 6h16.804M3 9.75S4.5 5.25 12 3s9 6.75 9 6.75" />
  </svg>
);

export const ScaleIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75M12 20.25c1.472 0 2.882.265 4.185.75M18.75 4.97A48.416 48.416 0 0012 4.5c-2.291 0-4.545.16-6.75.47m13.5 0c1.01.143 2.01.317 3 .52m-3-.52l2.286-1.007M18.75 4.97l-3.75 3.75M3.25 4.97A48.416 48.416 0 0112 4.5c2.291 0 4.545.16 6.75.47m-13.5 0c-1.01.143-2.01.317-3 .52m3-.52L3.25 3.963m13.5 0l3.75 3.75" />
  </svg>
);

export const ReceiptPercentIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-1.5h5.25m-5.25 0h3M9.75 6.375a3.375 3.375 0 01-3.375-3.375h10.5a3.375 3.375 0 01-3.375 3.375H9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 18a3.375 3.375 0 00-3.375-3.375H3.375M9.75 18a3.375 3.375 0 013.375 3.375H19.5A2.25 2.25 0 0021.75 19.5V4.5A2.25 2.25 0 0019.5 2.25h-15A2.25 2.25 0 002.25 4.5v10.5A3.375 3.375 0 005.625 18.375M9.75 18h3.375" />
    <circle cx="14.25" cy="14.25" r=".75" fill="currentColor" />
    <circle cx="11.25" cy="11.25" r=".75" fill="currentColor" />
  </svg>
);

export const LifebuoyIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0a8.949 8.949 0 005.002-1.544M12 21a8.949 8.949 0 01-5.002-1.544m5.002-14.912A8.949 8.949 0 0117.002 6M12 3a8.949 8.949 0 00-5.002 1.544m10.004 11.912L12 12m0 0l-5.002-5.002M12 12l5.002-5.002M12 12l-5.002 5.002M12 12l5.002 5.002" />
  </svg>
);

// Icons for ENARM Prep Flow
export const ChevronLeftIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

export const ArrowRightIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

export const CalendarDaysIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-3.75h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
  </svg>
);

export const CheckCircleIconSolid: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} {...rest}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06L10.5 13.186 8.72 11.407a.75.75 0 00-1.06 1.06L9.97 14.78a.75.75 0 001.06 0l4.87-4.87z" clipRule="evenodd" />
  </svg>
);

export const CircleIconOutline: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

// New Icons for Exams Page
export const BookOpenCheckIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9.75l-4.5 4.5-2.25-2.25" />
  </svg>
);

export const DocumentMagnifyingGlassIcon: React.FC<{ className?: string } & React.SVGProps<SVGSVGElement>> = ({ className = "w-5 h-5", ...rest }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className} {...rest}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h9M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.03 17.28a3.75 3.75 0 10-5.303-5.303 3.75 3.75 0 005.303 5.303zm0 0l1.22-1.22" />
 </svg>
);


// Ensure all necessary icons are exported
export * from './NewAppLogo'; // If NewAppLogo is in its own file within components folder
// And any other icon components you might have...
