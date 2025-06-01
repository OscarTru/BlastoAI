
import React from 'react';
import ReactDOM from 'react-dom/client';
import RoutedApp from './App'; // Changed from App to RoutedApp

// Diagnostic log: Display the Flowise API Key status from window.APP_CONFIG
console.log(
  '[index.tsx] Initial check: window.APP_CONFIG.FLOWISE_API_KEY =', 
  (window as any).APP_CONFIG?.FLOWISE_API_KEY, 
  `(Type: ${typeof (window as any).APP_CONFIG?.FLOWISE_API_KEY})`
);
if (!(window as any).APP_CONFIG?.FLOWISE_API_KEY) {
  console.warn("[index.tsx] FLOWISE_API_KEY is not defined or empty in window.APP_CONFIG. Ensure it's set in the script tag in index.html.");
}


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <RoutedApp />
  </React.StrictMode>
);