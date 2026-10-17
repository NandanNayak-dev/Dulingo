import React, { useState, useEffect } from 'react';
import { authService } from '../services/api.js';
import { X, BookOpen, Sparkles, CheckCircle, AlertCircle } from 'lucide-react';

export const TeacherLessonModal = ({ isOpen, onClose, onLessonCreated }) => {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [language, setLanguage] = useState('en');
  const [difficulty, setDifficulty] = useState('beginner');
  const [estimatedMinutes, setEstimatedMinutes] = useState(3);
  const [explanationText, setExplanationText] = useState('');
  const [nativeExplanationText, setNativeExplanationText] = useState('');
  const [keyPointsInput, setKeyPointsInput] = useState('');
  const [officialSourceUrl, setOfficialSourceUrl] = useState('');
  const [officialDepartment, setOfficialDepartment] = useState('Government of Karnataka');
  const [status, setStatus] = useState('published');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isOpen) {
      authService
        .getCategories()
        .then((res) => {
          if (res.categories && res.categories.length > 0) {
            setCategories(res.categories);
            setCategoryId(res.categories[0]._id);
          }
        })
        .catch(console.error);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const keyPoints = keyPointsInput
        .split('\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 0);

      const res = await authService.createTeacherLesson({
        title,
        categoryId,
        language,
        difficulty,
        estimatedMinutes: Number(estimatedMinutes),
        explanationText,
        nativeExplanationText,
        keyPoints,
        officialSourceUrl,
        officialDepartment,
        status,
      });

      setSuccess('Lesson created successfully in the curriculum!');
      setTimeout(() => {
        onClose();
        if (onLessonCreated) onLessonCreated(res.lesson);
      }, 700);
    } catch (err) {
      setError(err.message || 'Failed to create lesson');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div
        className="modal-card teacher-modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px', maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="modal-header">
          <div>
            <div className="badge badge-amber" style={{ marginBottom: '0.4rem' }}>
              👩‍🏫 Teacher Workshop
            </div>
            <h3>Author Public Service Lesson</h3>
            <p className="modal-subtitle">
              Draft or publish an audio lesson to guide citizens through official government services.
            </p>
          </div>
          <button className="btn-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {error && (
          <div className="alert alert-error" style={{ margin: '1rem 1.5rem 0' }}>
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success" style={{ margin: '1rem 1.5rem 0' }}>
            <CheckCircle size={18} />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form" style={{ padding: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Lesson Title *</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. Senior Citizen Bus Pass Application"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Public Service Category *</label>
              <select
                className="form-input form-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
              >
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty Level</label>
              <select
                className="form-input form-select"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Plain-Language English Explanation *</label>
            <textarea
              className="form-input"
              rows={4}
              placeholder="Explain the procedure in simple everyday words without legal jargon..."
              value={explanationText}
              onChange={(e) => setExplanationText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Regional / Kannada Translation (Optional)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="ಕನ್ನಡ ವಿವರಣೆ (Kannada text for bilingual audio reading)..."
              value={nativeExplanationText}
              onChange={(e) => setNativeExplanationText(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Key Points to Remember (One per line)</label>
            <textarea
              className="form-input"
              rows={3}
              placeholder="Aadhaar card required&#10;50% travel discount&#10;Valid for all ordinary buses"
              value={keyPointsInput}
              onChange={(e) => setKeyPointsInput(e.target.value)}
            />
          </div>

          <div className="form-grid-2col">
            <div className="form-group">
              <label className="form-label">Official Department</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. BMTC Transport Department"
                value={officialDepartment}
                onChange={(e) => setOfficialDepartment(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Official Portal URL</label>
              <input
                type="url"
                className="form-input"
                placeholder="https://mybmtc.karnataka.gov.in"
                value={officialSourceUrl}
                onChange={(e) => setOfficialSourceUrl(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Publication Status</label>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '0.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={status === 'published'}
                  onChange={() => setStatus('published')}
                />
                <strong>Publish Immediately</strong>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={status === 'draft'}
                  onChange={() => setStatus('draft')}
                />
                <span>Save as Draft (Review First)</span>
              </label>
            </div>
          </div>

          <button type="submit" className="btn btn-accent btn-block" disabled={loading}>
            {loading ? 'Publishing Lesson...' : 'Save & Add to Dulingo Curriculum'}
          </button>
        </form>
      </div>
    </div>
  );
};
