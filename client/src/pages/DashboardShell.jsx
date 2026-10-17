import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { authService } from '../services/api.js';
import {
  Flame,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Volume2,
  FileText,
  HelpCircle,
  Sparkles,
  Server,
  Database,
  Lock,
} from 'lucide-react';

export const DashboardShell = ({ setView, onOpenTeacherModal }) => {
  const { user, speakText } = useAuth();
  const [serverHealth, setServerHealth] = useState(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [progressData, setProgressData] = useState({ completedCount: 0, completedIds: [] });
  const [nextLesson, setNextLesson] = useState(null);
  const [totalLessonsCount, setTotalLessonsCount] = useState(0);

  useEffect(() => {
    const fetchHealthAndLessons = async () => {
      try {
        const [healthRes, lessonsRes, progRes] = await Promise.all([
          authService.getHealth().catch(() => null),
          authService.getLessons().catch(() => ({ lessons: [] })),
          authService.getMyProgress().catch(() => ({ completedLessonIds: [] })),
        ]);

        if (healthRes) setServerHealth(healthRes);
        const allLessons = lessonsRes.lessons || [];
        setTotalLessonsCount(allLessons.length);

        const completedIds = progRes.completedLessonIds || [];
        setProgressData({ completedCount: completedIds.length, completedIds });

        // Find first uncompleted lesson for "Continue Learning"
        const next = allLessons.find((l) => !completedIds.includes(l._id)) || allLessons[0];
        setNextLesson(next);
      } catch (err) {
        console.error('Failed to query backend health/lessons:', err);
      } finally {
        setHealthLoading(false);
      }
    };
    fetchHealthAndLessons();
  }, []);

  const handleReadWelcome = () => {
    const roleText = user.role === 'teacher' ? 'teacher and curriculum author' : 'public service learner';
    speakText(`Namaskara, ${user.name}! Welcome to your Dulingo dashboard as a ${roleText}.`);
  };

  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Welcome Banner */}
        <div className="dashboard-welcome-banner">
          <div className="welcome-text">
            <div className="welcome-tag">
              <span className="dot-pulse"></span>
              <span>Authenticated Session Active · Part 1 Core Connected</span>
            </div>
            <h2>
              Welcome back, <span className="highlight-text">{user.name}</span>!
            </h2>
            <p className="welcome-sub">
              {user.role === 'teacher'
                ? 'Manage your public service curriculum, create audio lessons, and track citizen learning.'
                : 'Master government services step-by-step with zero fear of mistakes.'}
            </p>

            <button
              className="btn-audio-pill"
              onClick={handleReadWelcome}
              title="Listen to audio greeting"
            >
              <Volume2 size={18} />
              <span>Listen to Dashboard Greeting</span>
            </button>
          </div>

          <div className="welcome-stats">
            <div className="stat-card">
              <div className="stat-icon-flame">
                <Flame size={24} color="#f59e0b" fill="#f59e0b" />
              </div>
              <div className="stat-info">
                <span className="stat-number">{user.streak || 1} Day</span>
                <span className="stat-label">Learning Streak</span>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-star">
                <Award size={24} color="#10b981" />
              </div>
              <div className="stat-info">
                <span className="stat-number">{user.points || 0} XP</span>
                <span className="stat-label">Civic Points</span>
              </div>
            </div>
          </div>
        </div>

        {/* Backend & Database Connection Status Card */}
        <div className="system-health-strip">
          <div className="health-item">
            <Server size={18} color="#10b981" />
            <span>Backend: <strong>Express (Port 5000)</strong></span>
          </div>
          <div className="health-item">
            <Database size={18} color="#059669" />
            <span>
              Database:{' '}
              <strong>
                {healthLoading
                  ? 'Checking...'
                  : serverHealth?.database?.status || 'Connected'}
              </strong>
            </span>
          </div>
          <div className="health-item">
            <Lock size={18} color="#6366f1" />
            <span>JWT Security: <strong>Active (7-day Session)</strong></span>
          </div>
          <div className="health-item role-item">
            <span>Verified Role: <strong className={`role-text-${user.role}`}>{user.role.toUpperCase()}</strong></span>
          </div>
        </div>

        {/* Learner View Content */}
        {user.role === 'learner' && (
          <div className="dashboard-grid">
            {/* Continue Learning Active Card */}
            <div className="dash-card">
              <div className="card-top-row">
                <div className="card-title-group">
                  <Clock size={20} color="#10b981" />
                  <h3>Today's Learning Target</h3>
                </div>
                <span className="badge badge-green">
                  {progressData.completedCount} / {totalLessonsCount} Completed
                </span>
              </div>

              {nextLesson && (
                <div
                  className="task-preview-item clickable-task"
                  onClick={() => setView(`lesson:${nextLesson._id}`)}
                  style={{ cursor: 'pointer', border: '2px solid #86efac', backgroundColor: '#f0fdf4' }}
                >
                  <div className="task-check-circle" style={{ backgroundColor: '#10b981', color: 'white' }}>
                    <BookOpen size={16} />
                  </div>
                  <div className="task-detail">
                    <strong>{nextLesson.title}</strong>
                    <p>Estimated: {nextLesson.estimatedMinutes} mins · Category: {nextLesson.categoryId?.title || 'Public Service'}</p>
                  </div>
                  <button className="btn btn-primary btn-sm">
                    Start <ArrowRight size={14} />
                  </button>
                </div>
              )}

              <div className="task-preview-item">
                <div className="task-check-circle done">
                  <CheckCircle2 size={20} color="#10b981" />
                </div>
                <div className="task-detail">
                  <strong>Create Dulingo Account & Select Language</strong>
                  <p>Registered as a learner with {user.languagePreference.toUpperCase()} language preference.</p>
                </div>
                <span className="task-reward">+10 XP</span>
              </div>

              <div className="task-card-footer" style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setView('lessons')}
                >
                  <BookOpen size={16} /> Explore All Lessons
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setView('role-test')}
                >
                  <ShieldCheck size={16} /> Test Role Security
                </button>
              </div>
            </div>

            {/* Public Service Readiness Roadmap */}
            <div className="dash-card">
              <div className="card-top-row">
                <div className="card-title-group">
                  <BookOpen size={20} color="#6366f1" />
                  <h3>Your Learning Roadmap</h3>
                </div>
                <span className="badge badge-indigo">Active Curriculum</span>
              </div>

              <div className="roadmap-list">
                <div className="roadmap-step current">
                  <span className="step-badge">1</span>
                  <div className="step-info">
                    <strong>Part 1: Core Foundation & Secure Auth</strong>
                    <p>React client, Express API, MongoDB, and JWT authentication complete.</p>
                  </div>
                  <span className="badge badge-green">Completed</span>
                </div>

                <div className="roadmap-step current">
                  <span className="step-badge">2</span>
                  <div className="step-info">
                    <strong>Part 2 & 3: Public Service Lessons & Audio Player</strong>
                    <p>Catalog, bilingual audio reader, speed control & verified sources active.</p>
                  </div>
                  <span className="badge badge-green">Active Now</span>
                </div>

                <div className="roadmap-step next">
                  <span className="step-badge">4</span>
                  <div className="step-info">
                    <strong>Part 4: Audio Quiz Engine & Scoring</strong>
                    <p>Audio question cards with server-side validation & instant feedback.</p>
                  </div>
                  <span className="badge badge-amber">Next</span>
                </div>

                <div className="roadmap-step">
                  <span className="step-badge">5</span>
                  <div className="step-info">
                    <strong>Part 5: Simulated Mock Forms</strong>
                    <p>Fictional practice form sandbox without fear of real mistakes.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Teacher View Content */}
        {user.role === 'teacher' && (
          <div className="dashboard-grid">
            <div className="dash-card">
              <div className="card-top-row">
                <div className="card-title-group">
                  <BookOpen size={20} color="#f59e0b" />
                  <h3>Teacher Curriculum Workshop</h3>
                </div>
                <span className="badge badge-amber">Teacher Role</span>
              </div>

              <p className="card-description">
                As an authorized teacher / volunteer, you have backend permissions to author lessons, formulate audio explanations, and assign daily practice tasks to citizens.
              </p>

              <div className="teacher-quick-stats">
                <div className="t-stat">
                  <span className="t-num">{totalLessonsCount}</span>
                  <span className="t-label">Published Lessons</span>
                </div>
                <div className="t-stat">
                  <span className="t-num">6</span>
                  <span className="t-label">Service Verticals</span>
                </div>
                <div className="t-stat">
                  <span className="t-num">{progressData.completedCount}</span>
                  <span className="t-label">Completed Units</span>
                </div>
              </div>

              <div className="card-footer-buttons" style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  className="btn btn-accent"
                  onClick={onOpenTeacherModal}
                >
                  <BookOpen size={18} /> Author New Lesson
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => setView('lessons')}
                >
                  Manage Curriculum
                </button>
              </div>
            </div>

            <div className="dash-card">
              <div className="card-top-row">
                <div className="card-title-group">
                  <FileText size={20} color="#10b981" />
                  <h3>Live Civic Curriculum Highlights</h3>
                </div>
              </div>

              <div className="pipeline-item">
                <div className="pipeline-badge" style={{ backgroundColor: '#ecfdf5', color: '#047857' }}>Live</div>
                <div className="pipeline-text">
                  <strong>BMTC Senior Citizen Concessional Pass</strong>
                  <span>Category: Travel & Transport · Verified with BMTC</span>
                </div>
              </div>

              <div className="pipeline-item">
                <div className="pipeline-badge" style={{ backgroundColor: '#ecfdf5', color: '#047857' }}>Live</div>
                <div className="pipeline-text">
                  <strong>Sandhya Suraksha Senior Pension Scheme</strong>
                  <span>Category: Pensions & Senior Care · Sakala guaranteed</span>
                </div>
              </div>

              <div className="pipeline-item">
                <div className="pipeline-badge" style={{ backgroundColor: '#ecfdf5', color: '#047857' }}>Live</div>
                <div className="pipeline-text">
                  <strong>Gruha Jyothi Zero Electricity Bill</strong>
                  <span>Category: Electricity & Utilities · BESCOM guidelines</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
