import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { authService } from '../services/api.js';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Award,
  Globe,
  Gauge,
  Clock,
  FastForward,
  Rewind,
} from 'lucide-react';

export const LessonPlayerPage = ({ lessonId, setView }) => {
  const { user } = useAuth();
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Audio Playback State
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(0.95); // Default clear senior pacing
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [audioLanguage, setAudioLanguage] = useState('en'); // 'en' | 'kn'
  const [activeTab, setActiveTab] = useState('english'); // 'english' | 'kannada'

  // Completion State
  const [isCompleted, setIsCompleted] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [rewardFeedback, setRewardFeedback] = useState(null);

  const sentencesRef = useRef([]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoading(true);
        const data = await authService.getLesson(lessonId);
        if (data.lesson) {
          setLesson(data.lesson);

          // Split explanation into readable sentences for timed audio reading
          const text = data.lesson.explanationText;
          const sentences = text
            .split(/(?<=[.!?])\s+/)
            .filter((s) => s.trim().length > 0);
          sentencesRef.current = sentences;

          // Check if already completed
          if (user) {
            const prog = await authService.getMyProgress().catch(() => ({}));
            if (prog.completedLessonIds && prog.completedLessonIds.includes(lessonId)) {
              setIsCompleted(true);
            }
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load lesson details');
      } finally {
        setLoading(false);
      }
    };
    fetchLesson();

    // Clean up audio on unmount
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [lessonId, user]);

  // Audio Player Logic with Web Speech API
  const speakCurrentLesson = (startIndex = 0) => {
    if (!('speechSynthesis' in window)) {
      alert('Your browser does not support audio speech synthesis.');
      return;
    }

    window.speechSynthesis.cancel();

    const sentences =
      activeTab === 'kannada' && lesson.nativeExplanationText
        ? lesson.nativeExplanationText.split(/(?<=[.!?|])\s+/).filter((s) => s.trim().length > 0)
        : sentencesRef.current;

    if (!sentences || sentences.length === 0) return;

    let currentIndex = startIndex;
    setActiveSentenceIndex(currentIndex);
    setIsPlaying(true);

    const playNext = () => {
      if (currentIndex >= sentences.length) {
        setIsPlaying(false);
        setActiveSentenceIndex(0);
        return;
      }

      setActiveSentenceIndex(currentIndex);
      const textToSpeak = sentences[currentIndex];
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      utterance.rate = playbackRate;
      utterance.pitch = 1.0;
      utterance.lang = activeTab === 'kannada' ? 'kn-IN' : 'en-IN';

      utterance.onend = () => {
        currentIndex++;
        if (currentIndex < sentences.length) {
          playNext();
        } else {
          setIsPlaying(false);
          setActiveSentenceIndex(0);
        }
      };

      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
    };

    playNext();
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setIsPlaying(false);
    } else {
      speakCurrentLesson(activeSentenceIndex);
    }
  };

  const handleRestart = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setActiveSentenceIndex(0);
    speakCurrentLesson(0);
  };

  const handleRateChange = (newRate) => {
    setPlaybackRate(newRate);
    if (isPlaying) {
      // Re-trigger from current sentence with new speed
      speakCurrentLesson(activeSentenceIndex);
    }
  };

  const handleCompleteLesson = async () => {
    if (!user) {
      setView('login');
      return;
    }

    try {
      setCompleting(true);
      const res = await authService.completeLesson(lessonId);
      setIsCompleted(true);
      setRewardFeedback(res);
      // Update points in user context if present
      if (res.totalPoints !== undefined && user) {
        user.points = res.totalPoints;
      }
    } catch (err) {
      console.error('Failed to complete lesson:', err);
    } finally {
      setCompleting(false);
    }
  };

  if (loading) {
    return (
      <div className="player-loading-container">
        <div className="dot-pulse"></div>
        <span>Preparing audio lesson and transcript...</span>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="container" style={{ padding: '3rem 0' }}>
        <div className="alert alert-error">
          <span>{error || 'Lesson not found'}</span>
        </div>
        <button className="btn btn-outline" onClick={() => setView('lessons')}>
          <ArrowLeft size={16} /> Back to Catalog
        </button>
      </div>
    );
  }

  const sentences =
    activeTab === 'kannada' && lesson.nativeExplanationText
      ? lesson.nativeExplanationText.split(/(?<=[.!?|])\s+/).filter((s) => s.trim().length > 0)
      : sentencesRef.current;

  return (
    <div className="lesson-player-page">
      <div className="container" style={{ maxWidth: '980px' }}>
        {/* Navigation Bar */}
        <div className="player-top-nav">
          <button className="btn-back" onClick={() => setView('lessons')}>
            <ArrowLeft size={16} /> Back to Lessons
          </button>

          <div className="player-cat-indicator">
            <span
              className="cat-badge-mini"
              style={{
                backgroundColor: lesson.categoryId?.bgLight || '#ecfdf5',
                color: lesson.categoryId?.colorHex || '#059669',
              }}
            >
              {lesson.categoryId?.title || 'Civic Service'}
            </span>
            <span className="time-badge">
              <Clock size={13} /> {lesson.estimatedMinutes} min audio
            </span>
          </div>
        </div>

        {/* Lesson Header */}
        <div className="lesson-main-header">
          <h1 className="lesson-player-title">{lesson.title}</h1>
          <div className="lesson-header-meta">
            <span className="verified-pill">
              <ShieldCheck size={16} color="#10b981" />
              <span>Verified with {lesson.officialDepartment}</span>
            </span>
            <span className="diff-pill">Level: {lesson.difficulty.toUpperCase()}</span>
          </div>
        </div>

        {/* Audio Player Control Bar (Screen 6 Highlight) */}
        <div className="audio-player-dock">
          <div className="player-controls-left">
            <button
              className={`btn-play-dock ${isPlaying ? 'playing' : ''}`}
              onClick={handleTogglePlay}
              aria-label={isPlaying ? 'Pause audio lesson' : 'Play audio lesson'}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
            </button>

            <button
              className="btn-dock-icon"
              onClick={handleRestart}
              title="Restart from beginning"
              aria-label="Restart audio lesson"
            >
              <RotateCcw size={18} />
            </button>

            <div className="dock-track-info">
              <div className="dock-status-row">
                <span className="status-label">
                  {isPlaying ? 'Speaking lesson aloud...' : 'Audio lesson ready'}
                </span>
                <span className="playback-rate-label">
                  Speed: {playbackRate === 0.75 ? '0.75x (Senior Paced)' : `${playbackRate}x`}
                </span>
              </div>

              {/* Dynamic Soundwave Bar */}
              <div className="dock-waveform">
                {[...Array(16)].map((_, i) => (
                  <span
                    key={i}
                    className={`wave-strip ${isPlaying ? 'animated' : ''}`}
                    style={{ animationDelay: `${(i % 5) * 0.15}s` }}
                  ></span>
                ))}
              </div>
            </div>
          </div>

          <div className="player-controls-right">
            {/* Speed Control Selector */}
            <div className="speed-pills-group">
              <span className="speed-title">
                <Gauge size={14} /> Pace:
              </span>
              {[
                { label: '0.75x', value: 0.75, title: 'Senior Paced (Slower)' },
                { label: '1.0x', value: 0.95, title: 'Normal Speed' },
                { label: '1.25x', value: 1.25, title: 'Fast' },
              ].map((s) => (
                <button
                  key={s.label}
                  className={`speed-chip ${playbackRate === s.value ? 'active' : ''}`}
                  onClick={() => handleRateChange(s.value)}
                  title={s.title}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bilingual Transcript Switcher Tabs */}
        <div className="transcript-section">
          <div className="transcript-tabs-bar">
            <div className="tab-buttons">
              <button
                className={`t-tab-btn ${activeTab === 'english' ? 'active' : ''}`}
                onClick={() => {
                  if (isPlaying) window.speechSynthesis?.cancel();
                  setIsPlaying(false);
                  setActiveTab('english');
                  setActiveSentenceIndex(0);
                }}
              >
                English Explanation
              </button>
              {lesson.nativeExplanationText && (
                <button
                  className={`t-tab-btn ${activeTab === 'kannada' ? 'active' : ''}`}
                  onClick={() => {
                    if (isPlaying) window.speechSynthesis?.cancel();
                    setIsPlaying(false);
                    setActiveTab('kannada');
                    setActiveSentenceIndex(0);
                  }}
                >
                  ಕನ್ನಡ ವಿವರಣೆ (Kannada)
                </button>
              )}
            </div>

            <span className="transcript-hint">
              <Volume2 size={15} color="#6366f1" /> Spoken sentences highlight below in real time
            </span>
          </div>

          {/* Karaoke-Style Sentence Highlighting */}
          <div className="transcript-reader-box">
            {sentences.map((sentence, idx) => {
              const isCurrent = isPlaying && activeSentenceIndex === idx;
              return (
                <span
                  key={idx}
                  className={`sentence-span ${isCurrent ? 'speaking-active' : ''}`}
                  onClick={() => speakCurrentLesson(idx)}
                  title="Click to hear this specific sentence"
                >
                  {sentence}{' '}
                </span>
              );
            })}
          </div>
        </div>

        {/* Key Citizen Points Card */}
        {lesson.keyPoints && lesson.keyPoints.length > 0 && (
          <div className="key-points-card">
            <div className="key-points-header">
              <CheckCircle2 size={20} color="#10b981" />
              <h3>Key Rules & Checklist to Remember</h3>
            </div>
            <ul className="points-checklist">
              {lesson.keyPoints.map((point, index) => (
                <li key={index} className="checklist-item">
                  <span className="check-bullet">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Official Authority & Source Verification Box */}
        <div className="official-source-card">
          <div className="source-info">
            <ShieldCheck size={24} color="#059669" />
            <div>
              <strong>Authoritative Public Service Information</strong>
              <p>
                Administered by <strong>{lesson.officialDepartment}</strong>. Verified on{' '}
                {new Date(lesson.lastVerifiedDate).toLocaleDateString()}.
              </p>
            </div>
          </div>

          {lesson.officialSourceUrl && (
            <a
              href={lesson.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-external-link"
            >
              <span>Visit Official Government Portal</span>
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        {/* Reward Feedback Banner */}
        {rewardFeedback && (
          <div className="reward-celebration-banner">
            <Sparkles size={24} color="#f59e0b" />
            <div className="banner-text">
              <strong>{rewardFeedback.message}</strong>
              <span>
                Total Civic Points: <strong>{rewardFeedback.totalPoints} XP</strong> · Current Streak: <strong>{rewardFeedback.streak || 1} Day</strong>
              </span>
            </div>
          </div>
        )}

        {/* Completion Action Bar */}
        <div className="lesson-footer-actions">
          <button
            className={`btn-complete-lesson ${isCompleted ? 'completed' : ''}`}
            onClick={handleCompleteLesson}
            disabled={completing}
          >
            {completing ? (
              'Recording your progress...'
            ) : isCompleted ? (
              <>
                <CheckCircle2 size={22} />
                <span>Lesson Completed (+10 XP Earned)</span>
              </>
            ) : (
              <>
                <Sparkles size={22} />
                <span>Mark as Learned & Claim 10 XP</span>
              </>
            )}
          </button>

          <button className="btn btn-outline" onClick={() => setView('lessons')}>
            Explore Next Lesson
          </button>
        </div>
      </div>
    </div>
  );
};
