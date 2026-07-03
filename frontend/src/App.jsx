import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppWorkspace from './pages/AppWorkspace';
import AuthScreen from './components/auth/AuthScreen';
import useAppStore from './store/useAppStore';

export default function App() {
  const isAuthenticated = useAppStore(state => state.isAuthenticated);
  const checkAuth = useAppStore(state => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <div className="bg-background min-h-screen text-text-primary selection:bg-accent-blue/30 selection:text-white font-sans antialiased">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/app/*" 
            element={isAuthenticated ? <AppWorkspace /> : <AuthScreen />} 
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
