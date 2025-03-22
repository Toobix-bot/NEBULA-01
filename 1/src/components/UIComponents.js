import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import localStorageUtil from '../lib/localStorageUtil';

const PrivacyBanner = ({ onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Prüfen, ob der Nutzer bereits zugestimmt hat
    const hasAccepted = localStorageUtil.loadData('privacy_accepted', false);
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorageUtil.saveData('privacy_accepted', true);
    setIsVisible(false);
    if (onAccept) onAccept();
  };

  const handleDecline = () => {
    setIsVisible(false);
    if (onDecline) onDecline();
  };

  if (!isVisible) return null;

  return (
    <div className="privacy-banner">
      <div className="privacy-banner-content">
        <h4>Datenschutzhinweis</h4>
        <p>Nebula Odyssey speichert alle Ihre Daten ausschließlich lokal in Ihrem Browser. Keine Daten werden an externe Server gesendet oder dort gespeichert. KI-Antworten werden über eine API generiert, aber Ihre Eingaben werden nicht dauerhaft gespeichert.</p>
      </div>
      <div className="privacy-banner-actions">
        <button className="btn btn-primary" onClick={handleAccept}>Akzeptieren</button>
        <button className="btn btn-secondary" onClick={handleDecline}>Ablehnen</button>
      </div>
    </div>
  );
};

const PrivacyNotice = ({ children }) => {
  return (
    <div className="privacy-notice">
      <span className="privacy-notice-icon">🔒</span>
      {children || "Ihre Daten werden ausschließlich lokal in Ihrem Browser gespeichert und sind nur für Sie sichtbar."}
    </div>
  );
};

const LoadingIndicator = ({ isLoading, text = "Wird geladen..." }) => {
  if (!isLoading) return null;
  
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="animate-pulse mb-2">
        <svg className="w-8 h-8 text-nebula-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
      </div>
      <p className="text-nebula-purple">{text}</p>
    </div>
  );
};

const Badge = ({ type, children }) => {
  const className = `badge badge-${type || 'primary'}`;
  return <span className={className}>{children}</span>;
};

const ProgressBar = ({ value, max = 100, type = 'primary' }) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  
  return (
    <div className="progress-container">
      <div 
        className={`progress-bar progress-${type}`} 
        style={{ width: `${percentage}%` }}
        aria-valuenow={value}
        aria-valuemin="0"
        aria-valuemax={max}
      ></div>
    </div>
  );
};

const Tooltip = ({ text, children }) => {
  return (
    <div className="tooltip">
      {children}
      <span className="tooltip-text">{text}</span>
    </div>
  );
};

export { PrivacyBanner, PrivacyNotice, LoadingIndicator, Badge, ProgressBar, Tooltip };
