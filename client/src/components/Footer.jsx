import React from 'react';
import { ShieldCheck, Sparkles, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand-logo-small">
              <span className="logo-icon">🦉</span>
              <span className="logo-name">Dulingo</span>
            </div>
            <p className="footer-desc">
              Gamified, audio-first public-service learning platform built with the MERN stack. Designed to empower senior citizens, first-time digital users, and students to navigate online government services with confidence.
            </p>
            <div className="team-badge">
              <Sparkles size={14} color="#f59e0b" />
              <span>Crafted by <strong>Team Octopus</strong> · Part 1 Core Foundation</span>
            </div>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <h4>Public Service Verticals</h4>
              <ul>
                <li>🚌 Travel & Senior Transport</li>
                <li>🏛️ Pensions & Life Certificate</li>
                <li>📜 Caste & Income Certificates</li>
                <li>⚡ Electricity (BESCOM) & Utilities</li>
                <li>⚖️ Grievances & RTI Inquiries</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Audio-First Civic Tech</h4>
              <ul>
                <li>🎙️ Plain-language audio lessons</li>
                <li>📝 Safe mock form-filling</li>
                <li>🎯 Daily assignments & quizzes</li>
                <li>🔥 Streaks & milestone badges</li>
                <li>🌐 Multilingual regional support</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-disclaimer">
          <ShieldCheck size={18} color="#10b981" />
          <p>
            <strong>Educational Practice Sandbox:</strong> Dulingo uses fictional scenarios and sample data for safe practice. It does not store actual banking credentials or submit real legal applications to government portals.
          </p>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Dulingo · Team Octopus · All rights reserved.</p>
          <p className="built-with">
            Built with <Heart size={14} color="#ef4444" fill="#ef4444" /> for Digital Public Literacy
          </p>
        </div>
      </div>
    </footer>
  );
};
