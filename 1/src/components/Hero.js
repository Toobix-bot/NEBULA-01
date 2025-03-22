import React from 'react';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter();
  
  const handleStartJourney = () => {
    // Redirect to dashboard page when button is clicked
    router.push('/dashboard');
  };

  return (
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
            className="btn btn-primary btn-lg animate-fadeIn"
          >
            Starte deine Reise
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
  );
};

export default Hero;
