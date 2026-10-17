import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { Header } from './components/Header.jsx';
import { Footer } from './components/Footer.jsx';
import { LanguageModal } from './components/LanguageModal.jsx';
import { TeacherLessonModal } from './components/TeacherLessonModal.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { AuthPage } from './pages/AuthPage.jsx';
import { DashboardShell } from './pages/DashboardShell.jsx';
import { RoleTestPage } from './pages/RoleTestPage.jsx';
import { CatalogPage } from './pages/CatalogPage.jsx';
import { LessonPlayerPage } from './pages/LessonPlayerPage.jsx';
import './App.css';

function MainApp() {
  const { isAuthenticated, loading } = useAuth();
  
  const getHashView = () => {
    const raw = window.location.hash.replace('#/', '').replace('#', '');
    if (['home', 'login', 'register', 'dashboard', 'role-test', 'lessons'].includes(raw)) {
      return raw;
    }
    if (raw.startsWith('lesson:')) {
      return raw;
    }
    return 'home';
  };

  const [currentView, setCurrentViewState] = useState(getHashView);
  const [isLangModalOpen, setIsLangModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  const setCurrentView = (view) => {
    setCurrentViewState(view);
    window.location.hash = `#/${view}`;
  };

  React.useEffect(() => {
    const handleHashChange = () => {
      setCurrentViewState(getHashView());
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (loading) {
    return (
      <div className="app-loader">
        <div className="loader-box">
          <span className="loader-owl">🦉</span>
          <h3>Starting Dulingo...</h3>
          <p>Connecting to public-service learning database</p>
        </div>
      </div>
    );
  }

  // Parse lesson ID if viewing specific lesson
  const isLessonPlayer = currentView.startsWith('lesson:');
  const activeLessonId = isLessonPlayer ? currentView.split('lesson:')[1] : null;

  return (
    <div className="app-wrapper">
      <Header
        onOpenLanguageModal={() => setIsLangModalOpen(true)}
        currentView={currentView}
        setView={setCurrentView}
      />

      <main className="main-content">
        {currentView === 'home' && <HomePage setView={setCurrentView} />}

        {currentView === 'login' && (
          <AuthPage initialTab="login" setView={setCurrentView} />
        )}

        {currentView === 'register' && (
          <AuthPage initialTab="register" setView={setCurrentView} />
        )}

        {currentView === 'dashboard' && (
          isAuthenticated ? (
            <DashboardShell setView={setCurrentView} onOpenTeacherModal={() => setIsTeacherModalOpen(true)} />
          ) : (
            <AuthPage initialTab="login" setView={setCurrentView} />
          )
        )}

        {currentView === 'role-test' && (
          isAuthenticated ? (
            <RoleTestPage setView={setCurrentView} />
          ) : (
            <AuthPage initialTab="login" setView={setCurrentView} />
          )
        )}

        {currentView === 'lessons' && (
          <CatalogPage
            setView={setCurrentView}
            onOpenTeacherModal={() => setIsTeacherModalOpen(true)}
          />
        )}

        {isLessonPlayer && activeLessonId && (
          <LessonPlayerPage
            lessonId={activeLessonId}
            setView={setCurrentView}
          />
        )}
      </main>

      <Footer />

      <LanguageModal
        isOpen={isLangModalOpen}
        onClose={() => setIsLangModalOpen(false)}
      />

      <TeacherLessonModal
        isOpen={isTeacherModalOpen}
        onClose={() => setIsTeacherModalOpen(false)}
        onLessonCreated={(newLesson) => {
          setCurrentView(`lesson:${newLesson._id}`);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
