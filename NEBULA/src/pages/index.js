import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivacyNotice, LoadingIndicator, Badge, ProgressBar } from '../components/UIComponents';
import localStorageUtil from '../lib/localStorageUtil';

const Index = () => {
  const router = useRouter();
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);
  
  useEffect(() => {
    // Prüfe, ob Onboarding abgeschlossen wurde
    const completed = localStorageUtil.loadData('nebula_onboarding_completed', false);
    setOnboardingCompleted(completed);
  }, []);
  
  const handleStartJourney = () => {
    if (onboardingCompleted) {
      router.push('/dashboard');
    } else {
      router.push('/onboarding');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="stars-bg py-10">
        <div className="stars-content container mx-auto px-4 py-10">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold mb-4">
              <span className="nebula-text-gradient">NEBULA ODYSSEY</span>
            </h1>
            <p className="text-xl mb-8 max-w-2xl">
              Deine persönliche Weltraum-Odyssee zur Selbstentwicklung. Navigiere durch verschiedene Planeten, 
              die Lebensbereiche repräsentieren, sammle XP und verbessere deine Fähigkeiten in einer 
              interaktiven Reise des persönlichen Wachstums.
            </p>
            <button 
              onClick={handleStartJourney}
              className="btn btn-primary btn-lg animate-pulse"
            >
              {onboardingCompleted ? 'Setze deine Reise fort' : 'Starte deine Reise'}
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="card animate-slideUp">
                <h3 className="text-xl font-semibold mb-3">Skill-System</h3>
                <p>Entwickle und verfolge deine Lebensfähigkeiten in verschiedenen Bereichen. Steige in Levels auf und schalte neue Herausforderungen frei.</p>
              </div>
              <div className="card animate-slideUp" style={{animationDelay: '0.2s'}}>
                <h3 className="text-xl font-semibold mb-3">Quest-System</h3>
                <p>Absolviere tägliche, wöchentliche und langfristige Quests, die auf deine persönlichen Ziele und Interessen zugeschnitten sind.</p>
              </div>
              <div className="card animate-slideUp" style={{animationDelay: '0.4s'}}>
                <h3 className="text-xl font-semibold mb-3">Reflexion & Wachstum</h3>
                <p>Nutze geführte Reflexionsübungen und therapeutische Komponenten, um tiefere Einsichten zu gewinnen und persönliches Wachstum zu fördern.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Hauptfunktionen</h2>
        <p className="text-center mb-12 max-w-2xl mx-auto">Entdecke die Werkzeuge, die deine persönliche Entwicklung revolutionieren werden.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card">
            <div className="text-nebula-purple text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold mb-3">Gamifizierte Entwicklung</h3>
            <p>Sammle XP, steige Level auf und schalte neue Fähigkeiten frei, während du an deinen persönlichen Zielen arbeitest.</p>
          </div>
          
          <div className="card">
            <div className="text-nebula-blue text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-semibold mb-3">Skill-System</h3>
            <p>Entwickle und verfolge deine Fähigkeiten in verschiedenen Lebensbereichen mit einem visuellen Fortschrittssystem.</p>
          </div>
          
          <div className="card">
            <div className="text-nebula-teal text-4xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-3">Quest-System</h3>
            <p>Tägliche, wöchentliche und langfristige Quests helfen dir, deine Ziele in erreichbare Schritte zu unterteilen.</p>
          </div>
          
          <div className="card">
            <div className="text-nebula-pink text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-3">KI-gestützte Reflexion</h3>
            <p>Personalisierte Reflexionsfragen und Einsichten, die durch KI generiert werden, um deine Selbsterkenntnis zu vertiefen.</p>
          </div>
          
          <div className="card">
            <div className="text-nebula-orange text-4xl mb-4">👥</div>
            <h3 className="text-xl font-semibold mb-3">NPC-Interaktionen</h3>
            <p>Interagiere mit KI-gesteuerten Mentoren und Charakteren, die dir auf deiner Reise Ratschläge und Herausforderungen bieten.</p>
          </div>
          
          <div className="card">
            <div className="text-nebula-green text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold mb-3">Visuelle Fortschrittsverfolgung</h3>
            <p>Verfolge deinen Fortschritt mit interaktiven Visualisierungen und personalisierbaren Dashboards.</p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit, deine Odyssee zu beginnen?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Starte noch heute deine Reise zur persönlichen Entwicklung mit Nebula Odyssey. 
            {onboardingCompleted 
              ? ' Setze deine Reise fort und erreiche deine Ziele in einem immersiven, gamifizierten Erlebnis.'
              : ' Erstelle ein Konto und beginne, deine Ziele in einem immersiven, gamifizierten Erlebnis zu verfolgen.'}
          </p>
          <button 
            onClick={handleStartJourney}
            className="btn btn-primary btn-lg"
          >
            {onboardingCompleted ? 'Zum Dashboard' : 'Jetzt kostenlos starten'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
