import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { SUPPORTED_LANGUAGES } from '../utils/translations.js';
import {
  User,
  Mail,
  Lock,
  Globe,
  CheckCircle,
  AlertCircle,
  Sparkles,
  ArrowRight,
  GraduationCap,
  BookOpen,
  Volume2,
} from 'lucide-react';

export const AuthPage = ({ initialTab = 'login', setView }) => {
  const { login, register, speakText } = useAuth();

  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register'
  const [role, setRole] = useState('learner'); // 'learner' | 'teacher'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [languagePreference, setLanguagePreference] = useState('en');

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleQuickFill = (targetRole) => {
    if (targetRole === 'learner') {
      setEmail('ramesh.senior@dulingo.local');
      setPassword('CitizenPass123!');
      if (activeTab === 'register') {
        setName('Ramesh Gowda');
        setRole('learner');
        setLanguagePreference('kn');
      }
    } else {
      setEmail('priya.teacher@dulingo.local');
      setPassword('TeacherPass123!');
      if (activeTab === 'register') {
        setName('Priya Sharma');
        setRole('teacher');
        setLanguagePreference('en');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await login(email, password);
        setSuccessMessage('Logged in successfully! Redirecting...');
        setTimeout(() => setView('dashboard'), 600);
      } else {
        await register({
          name,
          email,
          password,
          role,
          languagePreference,
        });
        setSuccessMessage('Account created successfully! Welcome aboard.');
        setTimeout(() => setView('dashboard'), 600);
      }
    } catch (err) {
      setErrorMessage(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleReadAuthHelp = () => {
    const text =
      activeTab === 'login'
        ? 'Please enter your registered email address and password to log in. You can also click Quick Fill for instant testing.'
        : 'Please enter your name, email, password, and select whether you are a Learner or a Teacher.';
    speakText(text);
  };

  return (
    <div className="auth-page">
      <div className="container auth-container">
        <div className="auth-card">
          {/* Audio help & Switch Tabs */}
          <div className="auth-header">
            <div className="auth-brand-pill">
              <span className="logo-icon">🦉</span>
              <span>Dulingo Access</span>
              <button
                type="button"
                className="btn-audio-mini"
                onClick={handleReadAuthHelp}
                title="Listen to audio instructions"
                aria-label="Listen to audio instructions"
              >
                <Volume2 size={16} />
              </button>
            </div>

            <h2>{activeTab === 'login' ? 'Welcome Back!' : 'Start Your Learning Journey'}</h2>
            <p className="auth-subtitle">
              {activeTab === 'login'
                ? 'Sign in to access your audio lessons, streaks, and mock forms.'
                : 'Join Dulingo to safely master government services at your own pace.'}
            </p>

            <div className="tab-switch">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('login');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('register');
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-fill helpers */}
          <div className="quick-fill-bar">
            <span className="quick-fill-label">⚡ Quick 1-Click Demo:</span>
            <button
              type="button"
              className="quick-fill-chip"
              onClick={() => handleQuickFill('learner')}
            >
              Learner (Ramesh)
            </button>
            <button
              type="button"
              className="quick-fill-chip chip-teacher"
              onClick={() => handleQuickFill('teacher')}
            >
              Teacher (Priya)
            </button>
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success">
              <CheckCircle size={18} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {activeTab === 'register' && (
              <>
                {/* Role Selection */}
                <div className="form-group">
                  <label className="form-label">I am joining as:</label>
                  <div className="role-selector-cards">
                    <div
                      className={`role-choice-card ${role === 'learner' ? 'selected' : ''}`}
                      onClick={() => setRole('learner')}
                    >
                      <div className="role-icon-box">
                        <GraduationCap size={22} color="#10b981" />
                      </div>
                      <div className="role-choice-text">
                        <strong>Learner</strong>
                        <span>I want to learn public services and practice forms</span>
                      </div>
                    </div>

                    <div
                      className={`role-choice-card ${role === 'teacher' ? 'selected' : ''}`}
                      onClick={() => setRole('teacher')}
                    >
                      <div className="role-icon-box">
                        <BookOpen size={22} color="#f59e0b" />
                      </div>
                      <div className="role-choice-text">
                        <strong>Teacher / Volunteer</strong>
                        <span>I want to create lessons and assign tasks</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Full Name */}
                <div className="form-group">
                  <label className="form-label" htmlFor="register-name">
                    Full Name
                  </label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      id="register-name"
                      type="text"
                      className="form-input"
                      placeholder="e.g. Ramesh Gowda"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Language Preference */}
                <div className="form-group">
                  <label className="form-label" htmlFor="register-lang">
                    Preferred Learning Language
                  </label>
                  <div className="input-with-icon">
                    <Globe size={18} className="input-icon" />
                    <select
                      id="register-lang"
                      className="form-input form-select"
                      value={languagePreference}
                      onChange={(e) => setLanguagePreference(e.target.value)}
                    >
                      {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.code} value={lang.code}>
                          {lang.native} ({lang.name})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label" htmlFor="auth-email">
                Email Address
              </label>
              <div className="input-with-icon">
                <Mail size={18} className="input-icon" />
                <input
                  id="auth-email"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label" htmlFor="auth-password">
                Password
              </label>
              <div className="input-with-icon">
                <Lock size={18} className="input-icon" />
                <input
                  id="auth-password"
                  type="password"
                  className="form-input"
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              {loading ? (
                'Processing...'
              ) : activeTab === 'login' ? (
                <>Sign In to Dulingo <ArrowRight size={18} /></>
              ) : (
                <>Create Free Account <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="auth-footer-note">
            <Sparkles size={14} color="#10b981" />
            <span>Encrypted passwords · Fictional safe practice sandbox</span>
          </div>
        </div>
      </div>
    </div>
  );
};
