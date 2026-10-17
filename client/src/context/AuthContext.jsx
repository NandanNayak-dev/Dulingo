import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('dulingo_token'));
  const [loading, setLoading] = useState(true);
  const [contrast, setContrast] = useState(() => localStorage.getItem('dulingo_contrast') || 'normal');
  const [textSize, setTextSize] = useState(() => localStorage.getItem('dulingo_text_size') || 'standard');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Sync accessibility attributes to DOM root
  useEffect(() => {
    document.documentElement.setAttribute('data-contrast', contrast);
    localStorage.setItem('dulingo_contrast', contrast);
  }, [contrast]);

  useEffect(() => {
    document.documentElement.setAttribute('data-text-size', textSize);
    localStorage.setItem('dulingo_text_size', textSize);
  }, [textSize]);

  // Load user profile on mount if token exists
  useEffect(() => {
    const fetchCurrentUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await authService.getMe();
        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.warn('Session verification failed, logging out:', err.message);
        localStorage.removeItem('dulingo_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [token]);

  const login = async (email, password) => {
    const data = await authService.login({ email, password });
    if (data.token) {
      localStorage.setItem('dulingo_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    if (data.token) {
      localStorage.setItem('dulingo_token', data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      // ignore
    } finally {
      localStorage.removeItem('dulingo_token');
      setToken(null);
      setUser(null);
    }
  };

  const updateLanguage = async (newLang) => {
    if (user) {
      try {
        const res = await authService.updateMe({ languagePreference: newLang });
        if (res.user) {
          setUser(res.user);
        }
      } catch (err) {
        console.error('Failed to update language preference:', err);
      }
    }
  };

  const toggleContrast = () => {
    setContrast((prev) => (prev === 'normal' ? 'high' : 'normal'));
  };

  // Audio helper using Web Speech API
  const speakText = (text, lang = 'en-US') => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support audio speech synthesis.');
      return;
    }

    window.speechSynthesis.cancel(); // Stop any currently playing audio
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.95; // slightly slower for better clarity for seniors
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateLanguage,
        contrast,
        textSize,
        toggleContrast,
        setTextSize,
        speakText,
        stopAudio,
        isSpeaking,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
