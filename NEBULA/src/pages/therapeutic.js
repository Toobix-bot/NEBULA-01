import React, { useState } from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiBook, FiHeart, FiShield, FiStar, FiTarget, FiUsers } from 'react-icons/fi';
import Link from 'next/link';

const TherapeuticPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPrivateContent, setShowPrivateContent] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Übersicht', icon: <FiBook /> },
    { id: 'shadow', label: 'Shadow Work', icon: <FiShield /> },
    { id: 'addiction', label: 'Suchtbewältigung', icon: <FiTarget /> },
    { id: 'schizophrenia', label: 'Schizophrenie', icon: <FiStar /> },
    { id: 'resources', label: 'Ressourcen', icon: <FiHeart /> },
  ];

  const ResourceCard = ({ title, description, link, isPrivate = false }) => {
    if (isPrivate && !showPrivateContent) return null;
    
    return (
      <motion.div 
        className="resource-card p-6 rounded-lg bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] transition-colors"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-[var(--text-secondary)] mb-4">{description}</p>
        {link && (
          <Link href={link} className="text-[var(--accent)] hover:underline">
            Mehr erfahren →
          </Link>
        )}
        {isPrivate && (
          <div className="mt-2 text-sm text-[var(--accent)]">
            Privater Inhalt
          </div>
        )}
      </motion.div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Therapeutische Komponenten</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              NEBULA ODYSSEY integriert therapeutische Ansätze in ein gamifiziertes System zur persönlichen Entwicklung. 
              Diese Komponenten unterstützen dich bei der Bewältigung von Herausforderungen, der Selbstreflexion und dem persönlichen Wachstum.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="feature-card p-6">
                <div className="text-[var(--accent)] text-2xl mb-3"><FiShield /></div>
                <h3 className="text-xl font-semibold mb-2">Shadow Work</h3>
                <p className="text-[var(--text-secondary)]">
                  Entdecke und integriere verdrängte Aspekte deiner Persönlichkeit mit Hilfe des Schattenflüsterers, 
                  einem speziellen NPC, der dich durch emotionale Reflexion und Schattenarbeit führt.
                </p>
              </div>
              
              <div className="feature-card p-6">
                <div className="text-[var(--accent)] text-2xl mb-3"><FiHeart /></div>
                <h3 className="text-xl font-semibold mb-2">Emotionales Management</h3>
                <p className="text-[var(--text-secondary)]">
                  Lerne, deine Emotionen zu erkennen, zu verstehen und zu regulieren. Entwickle gesunde Bewältigungsstrategien 
                  und verbessere deine emotionale Intelligenz.
                </p>
              </div>
            </div>
            
            <div className="private-content-toggle mb-8">
              <button 
                className="btn btn-secondary flex items-center"
                onClick={() => setShowPrivateContent(!showPrivateContent)}
              >
                {showPrivateContent ? 'Private Inhalte ausblenden' : 'Private Inhalte anzeigen'}
              </button>
              <p className="text-sm text-[var(--text-secondary)] mt-2">
                Private Inhalte sind nur für dich sichtbar und enthalten spezifische Ressourcen zu Sucht und Schizophrenie.
              </p>
            </div>
          </div>
        );
        
      case 'shadow':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Shadow Work mit dem Schattenflüsterer</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              Der Schattenflüsterer ist ein spezieller NPC in NEBULA ODYSSEY, der dich durch den Prozess der Schattenarbeit führt. 
              Er hilft dir, verdrängte Aspekte deiner Persönlichkeit zu erkennen, zu akzeptieren und zu integrieren.
            </p>
            
            <div className="shadow-work-process mb-8">
              <h3 className="text-xl font-semibold mb-4">Der Prozess der Schattenarbeit</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="process-step p-4 bg-[var(--secondary)] rounded-lg">
                  <div className="step-number bg-[var(--accent)] text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">1</div>
                  <h4 className="font-medium mb-2">Erkennen</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Identifiziere Trigger, emotionale Reaktionen und Muster, die auf Schattenaspekte hinweisen.
                  </p>
                </div>
                
                <div className="process-step p-4 bg-[var(--secondary)] rounded-lg">
                  <div className="step-number bg-[var(--accent)] text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">2</div>
                  <h4 className="font-medium mb-2">Akzeptieren</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Entwickle Mitgefühl und Akzeptanz für diese Aspekte deiner Persönlichkeit.
                  </p>
                </div>
                
                <div className="process-step p-4 bg-[var(--secondary)] rounded-lg">
                  <div className="step-number bg-[var(--accent)] text-white w-8 h-8 rounded-full flex items-center justify-center mb-3">3</div>
                  <h4 className="font-medium mb-2">Integrieren</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Integriere diese Aspekte bewusst in dein Selbstbild und nutze ihre Energie konstruktiv.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="shadow-exercises mb-8">
              <h3 className="text-xl font-semibold mb-4">Übungen zur Schattenarbeit</h3>
              <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)]">
                <li>Trigger-Tagebuch: Dokumentiere Situationen, die starke emotionale Reaktionen auslösen</li>
                <li>Spiegelarbeit: Erkenne projizierte Eigenschaften in anderen Menschen</li>
                <li>Dialog mit dem Schatten: Führe imaginäre Gespräche mit deinen Schattenaspekten</li>
                <li>Traumanalyse: Untersuche wiederkehrende Traumsymbole und -themen</li>
              </ul>
            </div>
          </div>
        );
        
      case 'addiction':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Suchtbewältigung</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              NEBULA ODYSSEY bietet Unterstützung bei der Bewältigung von Suchtverhalten durch gamifizierte Ansätze, 
              Reflexionsübungen und strukturierte Herausforderungen.
            </p>
            
            <div className="addiction-strategies mb-8">
              <h3 className="text-xl font-semibold mb-4">Strategien zur Suchtbewältigung</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Trigger-Management</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Identifiziere und vermeide Auslöser, die Suchtverhalten fördern. Entwickle alternative Reaktionen auf unvermeidbare Trigger.
                  </p>
                </div>
                
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Belohnungssystem</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Ersetze die kurzfristige Belohnung durch Suchtmittel mit einem strukturierten System aus XP, Levels und Achievements.
                  </p>
                </div>
                
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Fortschrittsverfolgung</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Visualisiere deinen Fortschritt und feiere Meilensteine in deiner Genesungsreise.
                  </p>
                </div>
                
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Gemeinschaft und Unterstützung</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Verbinde dich mit Vertrauten, die dich auf deinem Weg unterstützen können.
                  </p>
                </div>
              </div>
            </div>
            
            {showPrivateContent && (
              <div className="private-resources mb-8">
                <h3 className="text-xl font-semibold mb-4">Persönliche Ressourcen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResourceCard 
                    title="Tägliches Abstinenz-Tracking" 
                    description="Ein spezielles Tool zum Tracking deiner abstinenten Tage mit Belohnungen für Meilensteine."
                    isPrivate={true}
                  />
                  <ResourceCard 
                    title="Notfallplan" 
                    description="Erstelle einen personalisierten Notfallplan für Momente, in denen das Verlangen besonders stark ist."
                    isPrivate={true}
                  />
                  <ResourceCard 
                    title="Therapeutische Ressourcen" 
                    description="Zugang zu professionellen Ressourcen und Selbsthilfegruppen in deiner Nähe."
                    isPrivate={true}
                  />
                </div>
              </div>
            )}
          </div>
        );
        
      case 'schizophrenia':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Leben mit Schizophrenie</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              NEBULA ODYSSEY bietet Unterstützung für Menschen, die mit Schizophrenie leben, durch strukturierte Routinen, 
              Realitätsverankerung und Symptommanagement.
            </p>
            
            <div className="schizophrenia-strategies mb-8">
              <h3 className="text-xl font-semibold mb-4">Unterstützende Strategien</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Realitätsverankerung</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Techniken zur Unterscheidung zwischen realen und halluzinierten Erfahrungen. Übungen zur Erdung im Hier und Jetzt.
                  </p>
                </div>
                
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Strukturierte Routinen</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Entwickle stabile Tagesabläufe, die Sicherheit und Vorhersehbarkeit bieten.
                  </p>
                </div>
                
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Symptommanagement</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Lerne, frühe Warnzeichen zu erkennen und entwickle Strategien zum Umgang mit Symptomen.
                  </p>
                </div>
                
                <div className="strategy-card p-4 bg-[var(--secondary)] rounded-lg">
                  <h4 className="font-medium mb-2">Kognitive Übungen</h4>
                  <p className="text-sm text-[var(--text-secondary)]">
                    Stärke deine kognitiven Fähigkeiten durch regelmäßige Übungen und Herausforderungen.
                  </p>
                </div>
              </div>
            </div>
            
            {showPrivateContent && (
              <div className="private-resources mb-8">
                <h3 className="text-xl font-semibold mb-4">Persönliche Ressourcen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResourceCard 
                    title="Realitäts-Check-Tool" 
                    description="Ein interaktives Tool zur Überprüfung und Verankerung in der Realität während schwieriger Episoden."
                    isPrivate={true}
                  />
                  <ResourceCard 
                    title="Medikamenten-Tracker" 
                    description="Verfolge deine Medikamenteneinnahme und erhalte Erinnerungen für eine konsistente Behandlung."
                    isPrivate={true}
                  />
                  <ResourceCard 
                    title="Krisenplan" 
                    description="Erstelle einen personalisierten Plan für Krisensituationen mit wichtigen Kontakten und Schritten."
                    isPrivate={true}
                  />
                  <ResourceCard 
                    title="Therapeutische Ressourcen" 
                    description="Zugang zu professionellen Ressourcen und Selbsthilfegruppen in deiner Nähe."
                    isPrivate={true}
                  />
                </div>
              </div>
            )}
          </div>
        );
        
      case 'resources':
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Ressourcen und Werkzeuge</h2>
            <p className="text-[var(--text-secondary)] mb-6">
              NEBULA ODYSSEY bietet verschiedene Ressourcen und Werkzeuge zur Unterstützung deiner therapeutischen Reise.
            </p>
            
            <div className="resources-grid mb-8">
              <h3 className="text-xl font-semibold mb-4">Allgemeine Ressourcen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResourceCard 
                  title="Reflexionstagebuch" 
                  description="Ein strukturiertes Tagebuch für tägliche Reflexionen und emotionales Tracking."
                />
                <ResourceCard 
                  title="Meditationsübungen" 
                  description="Geführte Meditationen zur Förderung von Achtsamkeit und emotionalem Gleichgewicht."
                />
                <ResourceCard 
                  title="Schattenarbeit-Leitfaden" 
                  description="Ein umfassender Leitfaden zur Schattenarbeit mit praktischen Übungen und Reflexionsfragen."
                />
                <ResourceCard 
                  title="Emotionales Intelligenz-Training" 
                  description="Übungen und Herausforderungen zur Entwicklung deiner emotionalen Intelligenz."
                />
              </div>
            </div>
            
            {showPrivateContent && (
              <div className="private-resources mb-8">
                <h3 className="text-xl font-semibold mb-4">Persönliche Ressourcen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ResourceCard 
                    title="Therapeutische Kontakte" 
                    description="Eine Liste von Therapeuten, Beratungsstellen und Notfallkontakten für verschiedene Bedürfnisse."
                    isPrivate={true}
                  />
                  <ResourceCard 
                    title="Personalisierte Bewältigungsstrategien" 
                    description="Auf deine spezifischen Herausforderungen zugeschnittene Strategien und Techniken."
                    isPrivate={true}
                  />
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <Layout title="Therapeutische Komponenten">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">Therapeutische Komponenten</h1>
            <p className="text-[var(--text-secondary)]">
              Entdecke die therapeutischen Aspekte von NEBULA ODYSSEY, die deine persönliche Entwicklung unterstützen.
            </p>
          </div>
          
          {/* Tabs */}
          <div className="tabs-container mb-8">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button flex items-center px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id 
                      ? 'bg-[var(--accent)] text-white' 
                      : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Tab Content */}
          <div className="tab-content">
            {renderTabContent()}
          </div>
          
          {/* Navigation */}
          <div className="navigation-buttons mt-12 flex justify-between">
            <Link href="/dashboard" className="btn btn-secondary">
              Zurück zum Dashboard
            </Link>
            <Link href="/reflection" className="btn btn-primary">
              Zur Reflexion
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default TherapeuticPage;
