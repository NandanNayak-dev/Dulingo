import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { SUPPORTED_LANGUAGES, UI_STRINGS } from '../utils/translations.js';
import {
  Volume2,
  VolumeX,
  Globe,
  Sun,
  Moon,
  Flame,
  Award,
  LogOut,
  User as UserIcon,
  ShieldCheck,
  Type,
} from 'lucide-react';

export const Header = ({ onOpenLanguageModal, currentView, setView }) => {
  const {
    user,
    isAuthenticated,
    logout,
    contrast,
    toggleContrast,
    textSize,
    setTextSize,
    isSpeaking,
    stopAudio,
    speakText,
  } = useAuth();

  const [showUserMenu, setShowUserMenu] = useState(false);

  const langCode = user?.languagePreference || 'en';
  const strings = UI_STRINGS[langCode] || UI_STRINGS.en;
  const currentLang = SUPPORTED_LANGUAGES.find((l) => l.code === langCode) || SUPPORTED_LANGUAGES[0];

  const cycleTextSize = () => {
    if (textSize === 'standard') setTextSize('large');
    else if (textSize === 'large') setTextSize('xlarge');
    else setTextSize('standard');
  };

  const handleSpeechGreeting = () => {
    const text = user
      ? `Welcome back, ${user.name}! You are in the Dulingo ${user.role} workspace.`
      : 'Welcome to Dulingo! Learn public services by listening.';
    speakText(text);
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand Logo */}
        <div className="brand" onClick={() => setView('home')} style={{ cursor: 'pointer' }}>
          <div className="logo-badge">
            <span className="logo-icon">🦉</span>
            {isSpeaking && (
              <div className="waveform-indicator" title="Audio playing">
                <span className="waveform-bar"></span>
                <span className="waveform-bar"></span>
                <span className="waveform-bar"></span>
              </div>
            )}
          </div>
          <div className="brand-text">
            <div className="brand-title">Dulingo</div>
            <div className="brand-tagline">{strings.tagline}</div>
          </div>
        </div>

        {/* Navigation & Controls */}
        <div className="header-actions">
          {/* Lessons / Curriculum Link */}
          <button
            className={`btn-nav-link ${currentView === 'lessons' ? 'active' : ''}`}
            onClick={() => setView('lessons')}
            title="Browse Public Service Lessons"
          >
            Lessons
          </button>

          {/* Audio Accessibility Control */}
          <button
            className={`btn-icon ${isSpeaking ? 'active-audio' : ''}`}
            onClick={isSpeaking ? stopAudio : handleSpeechGreeting}
            title={isSpeaking ? 'Stop voice reading' : 'Play audio intro'}
            aria-label="Toggle voice guidance"
          >
            {isSpeaking ? <VolumeX size={20} color="#ef4444" /> : <Volume2 size={20} color="#10b981" />}
          </button>

          {/* Text Size Accessibility Toggle */}
          <button
            className="btn-icon"
            onClick={cycleTextSize}
            title={`Text Size: ${textSize.toUpperCase()} (Click to change)`}
            aria-label="Change text size"
          >
            <Type size={18} />
            <span className="icon-subtext">{textSize === 'standard' ? '1x' : textSize === 'large' ? '1.2x' : '1.4x'}</span>
          </button>

          {/* High Contrast Mode Toggle */}
          <button
            className="btn-icon"
            onClick={toggleContrast}
            title={contrast === 'high' ? 'Standard Contrast' : 'High Contrast for Seniors'}
            aria-label="Toggle contrast"
          >
            {contrast === 'high' ? <Sun size={19} color="#f59e0b" /> : <Moon size={19} />}
          </button>

          {/* Language Selector Button */}
          <button
            className="lang-pill-btn"
            onClick={onOpenLanguageModal}
            title="Change learning language"
          >
            <Globe size={16} />
            <span className="lang-name">{currentLang.native}</span>
          </button>

          {/* Authenticated State */}
          {isAuthenticated ? (
            <div className="user-section">
              {/* Streaks & Points */}
              <div className="gamification-pill" title="Daily Learning Streak">
                <Flame size={18} color="#f59e0b" fill="#f59e0b" />
                <span>{user.streak || 1}</span>
              </div>

              <div className="gamification-pill points-pill" title="Earned Learning Points">
                <Award size={18} color="#10b981" />
                <span>{user.points || 0} XP</span>
              </div>

              {/* User Dropdown Trigger */}
              <div className="user-dropdown-container">
                <button
                  className="user-btn"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  aria-expanded={showUserMenu}
                >
                  <div className="avatar-circle">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-meta">
                    <span className="user-name">{user.name.split(' ')[0]}</span>
                    <span className={`role-tag role-${user.role}`}>
                      {user.role === 'teacher' ? 'Teacher' : 'Learner'}
                    </span>
                  </div>
                </button>

                {showUserMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <strong>{user.name}</strong>
                      <span className="dropdown-email">{user.email}</span>
                      <span className="dropdown-role">Role: {user.role.toUpperCase()}</span>
                    </div>

                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setView('dashboard');
                        setShowUserMenu(false);
                      }}
                    >
                      <UserIcon size={16} />
                      Dashboard
                    </button>

                    <button
                      className="dropdown-item"
                      onClick={() => {
                        setView('role-test');
                        setShowUserMenu(false);
                      }}
                    >
                      <ShieldCheck size={16} />
                      Security & RBAC Inspector
                    </button>

                    <button
                      className="dropdown-item logout-item"
                      onClick={() => {
                        logout();
                        setView('home');
                        setShowUserMenu(false);
                      }}
                    >
                      <LogOut size={16} />
                      {strings.logout}
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Unauthenticated Navigation */
            <div className="auth-buttons">
              <button
                className="btn btn-outline"
                onClick={() => setView('login')}
              >
                {strings.login}
              </button>
              <button
                className="btn btn-primary"
                onClick={() => setView('register')}
              >
                {strings.startLearning}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
