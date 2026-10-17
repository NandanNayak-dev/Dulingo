import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { authService } from '../services/api.js';
import {
  Search,
  BookOpen,
  Clock,
  CheckCircle2,
  ArrowRight,
  Filter,
  PlusCircle,
  ExternalLink,
  Bus,
  Coins,
  FileCheck,
  Zap,
  Building2,
  HelpCircle,
  Volume2,
  Sparkles,
} from 'lucide-react';

const CATEGORY_ICONS = {
  Bus: <Bus size={22} />,
  Coins: <Coins size={22} />,
  FileCheck: <FileCheck size={22} />,
  Zap: <Zap size={22} />,
  Building2: <Building2 size={22} />,
  HelpCircle: <HelpCircle size={22} />,
};

export const CatalogPage = ({ setView, onOpenTeacherModal }) => {
  const { user } = useAuth();
  const [categories, setCategories] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [catRes, lessonRes] = await Promise.all([
          authService.getCategories(),
          authService.getLessons(),
        ]);

        if (catRes.categories) setCategories(catRes.categories);
        if (lessonRes.lessons) setLessons(lessonRes.lessons);

        if (user) {
          const progRes = await authService.getMyProgress().catch(() => ({}));
          if (progRes.completedLessonIds) {
            setCompletedIds(new Set(progRes.completedLessonIds));
          }
        }
      } catch (err) {
        console.error('Failed to fetch catalog data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const filteredLessons = lessons.filter((lesson) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      lesson.categoryId?._id === selectedCategory ||
      lesson.categoryId?.slug === selectedCategory;

    const matchesDifficulty =
      selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;

    const matchesSearch =
      !searchQuery.trim() ||
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.explanationText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lesson.nativeExplanationText &&
        lesson.nativeExplanationText.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="catalog-page">
      <div className="container">
        {/* Catalog Banner */}
        <div className="catalog-header-banner">
          <div className="catalog-banner-text">
            <span className="badge badge-green">
              <BookOpen size={14} /> Screen 5 · Public Service Curriculum
            </span>
            <h1>Government Service Lessons</h1>
            <p>
              Listen to step-by-step audio explanations designed to help seniors and citizens navigate digital government portals safely.
            </p>
          </div>

          {user?.role === 'teacher' && (
            <button
              className="btn btn-accent"
              onClick={onOpenTeacherModal}
              title="Open Teacher Lesson Workshop"
            >
              <PlusCircle size={18} />
              <span>Create New Lesson</span>
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div className="category-filter-strip">
          <button
            className={`cat-pill-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            <span>All Categories ({lessons.length})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat._id}
              className={`cat-pill-btn ${selectedCategory === cat._id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat._id)}
            >
              <span className="pill-icon" style={{ color: cat.colorHex }}>
                {CATEGORY_ICONS[cat.icon] || <BookOpen size={18} />}
              </span>
              <span>{cat.title}</span>
              <span className="pill-count">{cat.lessonCount}</span>
            </button>
          ))}
        </div>

        {/* Search & Difficulty Filter Bar */}
        <div className="catalog-search-bar">
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search bus passes, pensions, electricity, certificates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                ✕
              </button>
            )}
          </div>

          <div className="difficulty-filter-wrapper">
            <Filter size={16} />
            <select
              className="filter-select"
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Lesson Cards Grid */}
        {loading ? (
          <div className="catalog-loading">
            <div className="dot-pulse"></div>
            <span>Loading public service curriculum...</span>
          </div>
        ) : filteredLessons.length === 0 ? (
          <div className="empty-catalog-card">
            <BookOpen size={48} color="#94a3b8" />
            <h3>No lessons match your search</h3>
            <p>Try searching for different terms or reset category filters.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSelectedCategory('all');
                setSelectedDifficulty('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="lessons-grid">
            {filteredLessons.map((lesson) => {
              const isCompleted = completedIds.has(lesson._id);
              const cat = lesson.categoryId || {};

              return (
                <div
                  key={lesson._id}
                  className={`lesson-card ${isCompleted ? 'lesson-completed' : ''}`}
                  onClick={() => setView(`lesson:${lesson._id}`)}
                >
                  <div className="lesson-card-top">
                    <span
                      className="lesson-cat-badge"
                      style={{
                        backgroundColor: cat.bgLight || '#ecfdf5',
                        color: cat.colorHex || '#059669',
                      }}
                    >
                      {cat.title || 'Civic Service'}
                    </span>

                    {isCompleted ? (
                      <span className="status-badge-learned">
                        <CheckCircle2 size={15} /> Learned
                      </span>
                    ) : (
                      <span className="lesson-time-pill">
                        <Clock size={14} /> {lesson.estimatedMinutes} min
                      </span>
                    )}
                  </div>

                  <h3 className="lesson-card-title">{lesson.title}</h3>

                  <p className="lesson-card-snippet">
                    {lesson.explanationText.slice(0, 140)}...
                  </p>

                  <div className="lesson-card-meta">
                    <span className="meta-dept">
                      🏛️ {lesson.officialDepartment || 'Govt of Karnataka'}
                    </span>
                  </div>

                  <div className="lesson-card-footer">
                    <div className="reward-tag">
                      <Sparkles size={14} color="#f59e0b" />
                      <span>{isCompleted ? '+10 XP Earned' : '+10 XP on Completion'}</span>
                    </div>

                    <button
                      className="btn-listen-action"
                      onClick={(e) => {
                        e.stopPropagation();
                        setView(`lesson:${lesson._id}`);
                      }}
                    >
                      <Volume2 size={16} />
                      <span>{isCompleted ? 'Replay Audio' : 'Listen Now'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
