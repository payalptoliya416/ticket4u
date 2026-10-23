import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSettings } from './providers/SettingsProvider';
import { AppRouting } from './routing'; 
import { PathnameProvider } from './providers';
import AppFrontend from './routing/AppFrontend';
import { useEffect } from 'react';

const App = () => {
  const { settings } = useSettings();
  const determineBaseName = () => {
    const currentPath = window.location.pathname;
    return currentPath.startsWith('/admin') ? '/admin' : '/';
  };
  const baseName = determineBaseName();
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.remove('light');
    document.documentElement.classList.add(settings.themeMode);
  }, [settings]);
  
  return (
    <>
      <BrowserRouter basename={baseName}>
      <PathnameProvider>
      {baseName === '/admin' ? <AppRouting /> : <AppFrontend />}
      </PathnameProvider>
    </BrowserRouter>
    </>
  );
};

export { App };
