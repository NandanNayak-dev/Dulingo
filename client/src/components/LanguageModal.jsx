import React from 'react';
import { SUPPORTED_LANGUAGES } from '../utils/translations.js';
import { useAuth } from '../context/AuthContext.jsx';
import { Volume2, Check, X } from 'lucide-react';

export const LanguageModal = ({ isOpen, onClose }) => {
  const { user, updateLanguage, speakText } = useAuth();
  const currentLang = user?.languagePreference || 'en';

  if (!isOpen) return null;

  const handleSelectLanguage = (lang) => {
    updateLanguage(lang.code);
    speakText(lang.greeting);
    onClose();
  };

  const handlePlayGreetingOnly = (e, lang) => {
    e.stopPropagation();
    speakText(lang.greeting);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3>Select Learning Language</h3>
            <p className="modal-subtitle">Choose your primary language for explanations, instructions, and audio lessons.</p>
          </div>
          <button className="btn-close" onClick={onClose} aria-label="Close language selector">
            <X size={20} />
          </button>
        </div>

        <div className="language-grid">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <div
                key={lang.code}
                className={`lang-option-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectLanguage(lang)}
              >
                <div className="lang-info">
                  <span className="lang-native-large">{lang.native}</span>
                  <span className="lang-english-sub">{lang.name}</span>
                  <span className="lang-greeting-preview">"{lang.greeting}"</span>
                </div>

                <div className="lang-actions">
                  <button
                    className="btn-audio-mini"
                    onClick={(e) => handlePlayGreetingOnly(e, lang)}
                    title={`Listen to greeting in ${lang.name}`}
                    aria-label={`Listen to greeting in ${lang.name}`}
                  >
                    <Volume2 size={16} />
                  </button>

                  {isSelected && (
                    <div className="selected-badge" title="Active Language">
                      <Check size={18} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="modal-footer">
          <p className="modal-note">
            💡 Lesson audio availability in Kannada and other regional languages will expand with each curriculum update.
          </p>
        </div>
      </div>
    </div>
  );
};
