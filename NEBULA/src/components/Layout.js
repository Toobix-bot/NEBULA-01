import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivacyBanner, PrivacyNotice, LoadingIndicator } from '../components/UIComponents';
import localStorageUtil from '../lib/localStorageUtil';

const Layout = ({ children }) => {
  const router = useRouter();
  const [showPrivacyBanner, setShowPrivacyBanner] = useState(false);
  
  useEffect(() => {
    // Prüfen, ob der Nutzer bereits zugestimmt hat
    const hasAccepted = localStorageUtil.loadData('privacy_accepted', false);
    if (!hasAccepted) {
      setShowPrivacyBanner(true);
    }
  }, []);

  const handlePrivacyAccept = () => {
    localStorageUtil.saveData('privacy_accepted', true);
    setShowPrivacyBanner(false);
  };

  const isActive = (path) => {
    return router.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex flex-wrap justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold mr-8">
                <span className="nebula-text-gradient">NEBULA ODYSSEY</span>
              </h1>
              <ul className="hidden md:flex space-x-6">
                <li><a href="/" className={isActive('/')}>Home</a></li>
                <li><a href="/dashboard" className={isActive('/dashboard')}>Dashboard</a></li>
                <li><a href="/quests" className={isActive('/quests')}>Quests</a></li>
                <li><a href="/skills" className={isActive('/skills')}>Skills</a></li>
                <li><a href="/reflection" className={isActive('/reflection')}>Reflection</a></li>
                <li><a href="/therapeutic" className={isActive('/therapeutic')}>Therapeutic</a></li>
                <li><a href="/gratitude" className={isActive('/gratitude')}>Gratitude</a></li>
                <li><a href="/about" className={isActive('/about')}>About</a></li>
              </ul>
            </div>
            <div>
              <button className="btn btn-primary">Launch</button>
            </div>
          </nav>
        </div>
      </header>
      
      <main className="flex-grow bg-gray-50 stars-bg">
        <div className="stars-content">
          {children}
        </div>
      </main>
      
      <footer className="bg-white py-8 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold mb-2">
                <span className="nebula-text-gradient">NEBULA ODYSSEY</span>
              </h2>
              <p className="text-sm text-muted">
                © 2025 NEBULA ODYSSEY. Alle Rechte vorbehalten.
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-muted hover:text-nebula-purple">
                Unterstützen
              </a>
              <a href="#" className="text-muted hover:text-nebula-purple">
                GitHub
              </a>
              <a href="#" className="text-muted hover:text-nebula-purple">
                Kontakt
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-muted">
            <p>Erstellt mit <span className="text-nebula-pink">♥</span> für persönliche Entwicklung und Wachstum.</p>
            <p className="mt-2">NEBULA ODYSSEY ist ein privates Projekt zur Förderung von Selbstreflexion, Achtsamkeit und persönlichem Wachstum.</p>
          </div>
        </div>
      </footer>
      
      {showPrivacyBanner && (
        <PrivacyBanner 
          onAccept={handlePrivacyAccept}
          onDecline={() => setShowPrivacyBanner(false)}
        />
      )}
    </div>
  );
};

export default Layout;
