import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Award,
  Sparkles,
  BookOpen,
  FileText,
  Bus,
  Coins,
  FileCheck,
  Zap,
  Building2,
  HelpCircle,
} from 'lucide-react';

export const HomePage = ({ setView }) => {
  const { user, isAuthenticated, speakText, stopAudio, isSpeaking } = useAuth();
  const [isPlayingDemo, setIsPlayingDemo] = useState(false);

  const sampleLessonText =
    "Welcome to your first public service lesson: Understanding the Senior Citizen Bus Pass. Citizens aged 60 and above are eligible for subsidized or free local bus travel. To apply, you need proof of age like Aadhaar or Voter ID, two passport photos, and your address verification. On Dulingo, you will practice filling this form safely before opening the real portal.";

  const handleToggleAudioDemo = () => {
    if (isPlayingDemo || isSpeaking) {
      stopAudio();
      setIsPlayingDemo(false);
    } else {
      setIsPlayingDemo(true);
      speakText(sampleLessonText);
      // Auto reset demo toggle when speech ends
      const interval = setInterval(() => {
        if (!window.speechSynthesis.speaking) {
          setIsPlayingDemo(false);
          clearInterval(interval);
        }
      }, 500);
    }
  };

  const categories = [
    {
      id: 'travel',
      title: 'Travel & Transport',
      icon: <Bus size={28} color="#059669" />,
      tag: 'Most Popular for Seniors',
      desc: 'Concessional bus passes, senior train travel, metro cards, and renew procedures.',
      color: '#ecfdf5',
    },
    {
      id: 'pensions',
      title: 'Pensions & Life Proof',
      icon: <Coins size={28} color="#d97706" />,
      tag: 'Critical Service',
      desc: 'Old-age pension schemes, digital life certificate (Jeevan Pramaan), and bank verification.',
      color: '#fffbeb',
    },
    {
      id: 'certificates',
      title: 'Government Certificates',
      icon: <FileCheck size={28} color="#4f46e5" />,
      tag: 'Essential Documents',
      desc: 'Income, caste, residence, and birth certificates on digital seva portals.',
      color: '#eef2ff',
    },
    {
      id: 'utilities',
      title: 'Electricity & Utilities',
      icon: <Zap size={28} color="#0284c7" />,
      tag: 'Daily Living',
      desc: 'BESCOM electricity connections, Gruha Jyothi subsidy, and water bill grievance tracking.',
      color: '#f0f9ff',
    },
    {
      id: 'taxes',
      title: 'Property Tax & Khata',
      icon: <Building2 size={28} color="#9333ea" />,
      tag: 'Civic Property',
      desc: 'Property tax payment, e-Khata verification, and receipt downloads without agents.',
      color: '#faf5ff',
    },
    {
      id: 'grievances',
      title: 'Public Grievances & RTI',
      icon: <HelpCircle size={28} color="#e11d48" />,
      tag: 'Civic Rights',
      desc: 'Filing complaints on civic portals, checking status, and seeking information safely.',
      color: '#fff1f2',
    },
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-text-col">
            <div className="hero-badge">
              <Sparkles size={16} color="#f59e0b" />
              <span>Audio-First Digital Public-Service Literacy</span>
            </div>

            <h1 className="hero-title">
              Learn public services <span className="highlight-text">by listening</span>
            </h1>

            <p className="hero-subtitle">
              Never get stuck on complicated government websites again. Dulingo provides simple audio explanations, step-by-step simulated forms, and rewarding practice — built especially for senior citizens, students, and first-time digital users.
            </p>

            <div className="hero-actions">
              {isAuthenticated ? (
                <button
                  className="btn btn-primary btn-lg"
                  onClick={() => setView('dashboard')}
                >
                  Continue to Your Dashboard <ArrowRight size={20} />
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-primary btn-lg"
                    onClick={() => setView('register')}
                  >
                    Start Learning Free <ArrowRight size={20} />
                  </button>
                  <button
                    className="btn btn-outline btn-lg"
                    onClick={() => setView('login')}
                  >
                    Log In
                  </button>
                </>
              )}
            </div>

            <div className="hero-social-proof">
              <div className="proof-item">
                <CheckCircle2 size={18} color="#10b981" />
                <span>100% Free & Fictional Practice Sandbox</span>
              </div>
              <div className="proof-item">
                <CheckCircle2 size={18} color="#10b981" />
                <span>Kannada & English Audio First</span>
              </div>
            </div>
          </div>

          {/* Interactive Audio Player Demo Card */}
          <div className="hero-card-col">
            <div className="audio-demo-card">
              <div className="audio-card-header">
                <div className="audio-live-pill">
                  <span className="dot-pulse"></span>
                  <span>Interactive Audio Preview</span>
                </div>
                <span className="category-pill">🚌 Transport Lesson #1</span>
              </div>

              <div className="audio-card-body">
                <h3>Applying for Senior Citizen Bus Pass</h3>
                <p className="lesson-lead">
                  Listen to this 30-second audio explanation to experience how Dulingo turns formal bureaucratic rules into friendly, clear advice:
                </p>

                <div className="audio-player-mockup">
                  <button
                    className={`btn-play-hero ${isPlayingDemo ? 'playing' : ''}`}
                    onClick={handleToggleAudioDemo}
                    aria-label={isPlayingDemo ? 'Pause sample audio' : 'Play sample audio'}
                  >
                    {isPlayingDemo ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
                  </button>

                  <div className="player-track">
                    <div className="player-label-row">
                      <span>Senior Citizen Travel Subsidy</span>
                      <span className="time-indicator">{isPlayingDemo ? 'Playing...' : '0:35'}</span>
                    </div>
                    <div className="waveform-visual">
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                      <span className={`bar ${isPlayingDemo ? 'animating' : ''}`}></span>
                    </div>
                  </div>
                </div>

                <div className="transcript-box">
                  <div className="transcript-label">
                    <Volume2 size={15} color="#4f46e5" />
                    <span>Synchronized Audio Transcript:</span>
                  </div>
                  <p className="transcript-text">
                    "{sampleLessonText}"
                  </p>
                </div>
              </div>

              <div className="audio-card-footer">
                <span className="audio-benefit">✓ No confusing legal terms</span>
                <span className="audio-benefit">✓ Repeat anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Problems & Dulingo Solutions */}
      <section className="solution-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-tag">Why We Built Dulingo</span>
            <h2>Overcoming the 4 Barriers to Digital Public Services</h2>
            <p className="section-subtitle">
              Government portals are essential, but millions of citizens avoid them due to fear, language, and lack of practice.
            </p>
          </div>

          <div className="problems-grid">
            <div className="problem-card">
              <div className="card-num">01</div>
              <h3>Complex Language</h3>
              <p className="problem-text">Official portals use formal terminology that intimidates users.</p>
              <div className="solution-box">
                <strong>Dulingo Solution:</strong> Everyday language with spoken regional audio explanations.
              </div>
            </div>

            <div className="problem-card">
              <div className="card-num">02</div>
              <h3>Fear of Mistakes</h3>
              <p className="problem-text">People worry a wrong click could cancel their pension or fail their application.</p>
              <div className="solution-box">
                <strong>Dulingo Solution:</strong> 100% safe sandbox with fictional data. Zero risk of real mistakes.
              </div>
            </div>

            <div className="problem-card">
              <div className="card-num">03</div>
              <h3>Lack of Practice</h3>
              <p className="problem-text">Citizens have no place to try out a digital form before the real submission.</p>
              <div className="solution-box">
                <strong>Dulingo Solution:</strong> Guided simulated forms with instant feedback and field explanations.
              </div>
            </div>

            <div className="problem-card">
              <div className="card-num">04</div>
              <h3>Dependence on Others</h3>
              <p className="problem-text">Seniors and citizens rely on internet cafes, middlemen, or busy relatives.</p>
              <div className="solution-box">
                <strong>Dulingo Solution:</strong> Self-paced mastery with streaks and badges for independent confidence.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Public Service Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <div>
              <span className="section-tag">Service Directory</span>
              <h2>Explore Public Service Categories</h2>
              <p className="section-subtitle">
                Master the essential procedures that empower daily citizen life in India.
              </p>
            </div>
            <button
              className="btn btn-outline"
              onClick={() => {
                if (!isAuthenticated) setView('register');
                else setView('dashboard');
              }}
            >
              Browse All Lessons <ArrowRight size={16} />
            </button>
          </div>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                style={{ backgroundColor: cat.color }}
                onClick={() => {
                  if (!isAuthenticated) setView('register');
                  else setView('dashboard');
                }}
              >
                <div className="cat-top">
                  <div className="cat-icon-wrapper">{cat.icon}</div>
                  <span className="cat-tag">{cat.tag}</span>
                </div>
                <h3>{cat.title}</h3>
                <p>{cat.desc}</p>
                <div className="cat-footer">
                  <span className="action-link">
                    Start Learning <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Audiences / Two Roles Section */}
      <section className="roles-section">
        <div className="container">
          <div className="dual-role-card">
            <div className="role-col learner-col">
              <div className="role-avatar-badge">🎓</div>
              <h3>For Citizens & Learners</h3>
              <p>Senior citizens, first-time smartphone users, and students seeking scholarships and certificates.</p>
              <ul className="role-features">
                <li>🎧 Spoken explanations in your language</li>
                <li>📝 Practice forms without risking real money or data</li>
                <li>⭐ Earn XP points, milestone badges, and daily streaks</li>
              </ul>
              <button
                className="btn btn-primary"
                onClick={() => setView('register')}
              >
                Join as a Learner
              </button>
            </div>

            <div className="role-divider"></div>

            <div className="role-col teacher-col">
              <div className="role-avatar-badge">👩‍🏫</div>
              <h3>For Teachers & Volunteers</h3>
              <p>Community instructors, NGO volunteers, and civic coaches helping citizens navigate digital literacy.</p>
              <ul className="role-features">
                <li>📚 Create and publish audio lessons and quizzes</li>
                <li>📋 Assign daily tasks to your students or elders</li>
                <li>📊 Review learning progress and help those in need</li>
              </ul>
              <button
                className="btn btn-accent"
                onClick={() => setView('register')}
              >
                Join as a Teacher / Coach
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
