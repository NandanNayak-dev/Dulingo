import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { authService } from '../services/api.js';
import { ShieldCheck, ShieldAlert, ArrowLeft, Terminal, CheckCircle2, XCircle } from 'lucide-react';

export const RoleTestPage = ({ setView }) => {
  const { user } = useAuth();
  const [testResult, setTestResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runTeacherTest = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const data = await authService.verifyTeacherRole();
      setTestResult({
        success: true,
        endpoint: '/api/auth/verify-role/teacher',
        status: 200,
        message: data.message,
        role: data.role,
      });
    } catch (err) {
      setTestResult({
        success: false,
        endpoint: '/api/auth/verify-role/teacher',
        status: err.status || 403,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const runLearnerTest = async () => {
    setLoading(true);
    setTestResult(null);
    try {
      const data = await authService.verifyLearnerRole();
      setTestResult({
        success: true,
        endpoint: '/api/auth/verify-role/learner',
        status: 200,
        message: data.message,
        role: data.role,
      });
    } catch (err) {
      setTestResult({
        success: false,
        endpoint: '/api/auth/verify-role/learner',
        status: err.status || 403,
        message: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-test-page">
      <div className="container" style={{ maxWidth: '850px' }}>
        <button
          className="btn-back"
          onClick={() => setView('dashboard')}
          style={{ marginBottom: '1.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        <div className="role-test-card">
          <div className="card-header">
            <div className="header-icon-badge">
              <ShieldCheck size={28} color="#10b981" />
            </div>
            <div>
              <h2>Backend Security & RBAC Inspector</h2>
              <p className="subtitle">
                Verify that server-side route guards strictly enforce learner vs teacher permissions, preventing unauthorized access even if a client attempts to forge requests.
              </p>
            </div>
          </div>

          <div className="current-user-strip">
            <span>Logged In Account:</span>
            <strong>{user.name}</strong>
            <span className={`role-badge-pill role-${user.role}`}>
              Active Role: {user.role.toUpperCase()}
            </span>
          </div>

          <div className="test-actions-grid">
            <div className="action-box">
              <h4>1. Test Teacher-Only Endpoint</h4>
              <p className="box-desc">
                Sends an authenticated request to <code>GET /api/auth/verify-role/teacher</code>. Requires <code>teacher</code> role.
              </p>
              <button
                className="btn btn-primary"
                onClick={runTeacherTest}
                disabled={loading}
              >
                Invoke Teacher Endpoint
              </button>
            </div>

            <div className="action-box">
              <h4>2. Test Learner-Only Endpoint</h4>
              <p className="box-desc">
                Sends an authenticated request to <code>GET /api/auth/verify-role/learner</code>. Requires <code>learner</code> role.
              </p>
              <button
                className="btn btn-outline"
                onClick={runLearnerTest}
                disabled={loading}
              >
                Invoke Learner Endpoint
              </button>
            </div>
          </div>

          {/* Real-time Response Output */}
          {testResult && (
            <div className={`response-console ${testResult.success ? 'console-success' : 'console-denied'}`}>
              <div className="console-header">
                <div className="console-title">
                  <Terminal size={16} />
                  <span>Server Response for {testResult.endpoint}</span>
                </div>
                <span className={`status-tag ${testResult.success ? 'tag-200' : 'tag-403'}`}>
                  HTTP {testResult.status} {testResult.success ? 'OK' : 'FORBIDDEN'}
                </span>
              </div>

              <div className="console-body">
                <div className="console-row">
                  {testResult.success ? (
                    <CheckCircle2 size={18} color="#10b981" />
                  ) : (
                    <XCircle size={18} color="#ef4444" />
                  )}
                  <span className="console-text">{testResult.message}</span>
                </div>
                <div className="console-meta">
                  <span>Server-side authorization rule executed properly: </span>
                  <code>{testResult.success ? 'Access Granted' : 'Access Blocked by requireRole() middleware'}</code>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
