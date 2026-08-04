import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import AppWorkspace from './pages/AppWorkspace';
import AuthPage from './pages/AuthPage';
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
        <Toaster position="top-right" toastOptions={{ style: { background: '#1F2937', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' } }} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/app" replace /> : <AuthPage />} 
          />

          <Route 
            path="/app/*" 
            element={isAuthenticated ? <AppWorkspace /> : <Navigate to="/login" replace />} 
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
