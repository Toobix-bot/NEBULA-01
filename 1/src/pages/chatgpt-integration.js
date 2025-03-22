import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiSend, FiCopy, FiExternalLink, FiInfo } from 'react-icons/fi';

const ChatGPTIntegration = () => {
  const [activeTab, setActiveTab] = useState('reflection');
  const [promptText, setPromptText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showTutorial, setShowTutorial] = useState(true);

  // Predefined prompts for different use cases
  const predefinedPrompts = {
    reflection: [
      {
        title: "Tägliche Reflexionsanalyse",
        prompt: `Analysiere meine heutige Reflexion im NEBULA ODYSSEY-System:

Stimmung: [STIMMUNG EINFÜGEN]

Reflexionsfragen und Antworten:
1. [FRAGE]: [ANTWORT]
2. [FRAGE]: [ANTWORT]
3. [FRAGE]: [ANTWORT]

Bitte erstelle eine tiefgehende Analyse mit:
1. Zusammenfassung der Hauptpunkte
2. Wichtige Einsichten und Erkenntnisse
3. Empfehlungen für meine weitere Entwicklung
4. Vorgeschlagene Quests oder Missionen für morgen`
      },
      {
        title: "Muster in Reflexionen erkennen",
        prompt: `Analysiere die folgenden Reflexionen aus den letzten 7 Tagen im NEBULA ODYSSEY-System und identifiziere Muster, Fortschritte und Herausforderungen:

[FÜGE HIER DEINE REFLEXIONEN EIN]

Bitte erstelle eine Analyse mit:
1. Wiederkehrende Themen und Muster
2. Fortschritte und Erfolge
3. Herausforderungen und Hindernisse
4. Empfehlungen für die kommende Woche`
      }
    ],
    addiction: [
      {
        title: "Trigger-Analyse",
        prompt: `Analysiere meine Sucht-Trigger basierend auf den folgenden Beobachtungen:

[BESCHREIBE SITUATIONEN, DIE VERLANGEN AUSLÖSEN]

Bitte hilf mir zu verstehen:
1. Mögliche Muster in diesen Triggern
2. Zugrundeliegende emotionale oder psychologische Faktoren
3. Praktische Strategien zur Vermeidung oder Bewältigung dieser Trigger
4. Wie ich diese Erkenntnisse in meine NEBULA ODYSSEY-Quests integrieren kann`
      },
      {
        title: "Rückfallprävention",
        prompt: `Ich spüre ein starkes Verlangen nach [SUCHTMITTEL/VERHALTEN]. Hilf mir, einen Notfallplan zu erstellen, um einen Rückfall zu vermeiden.

Meine aktuellen Gefühle und Gedanken:
[BESCHREIBE AKTUELLE SITUATION]

Bitte erstelle einen strukturierten Plan mit:
1. Sofortige Ablenkungsstrategien
2. Personen, die ich kontaktieren kann
3. Erinnerungen an meine Motivation zur Abstinenz
4. Wie ich diese Situation als Quest in NEBULA ODYSSEY umformulieren kann`
      }
    ],
    schizophrenia: [
      {
        title: "Realitätsverankerung",
        prompt: `Ich erlebe gerade Schwierigkeiten, zwischen Realität und Halluzinationen zu unterscheiden. Bitte hilf mir mit Realitätsverankerungstechniken.

Meine aktuellen Erfahrungen:
[BESCHREIBE AKTUELLE ERFAHRUNGEN]

Bitte biete mir:
1. Einfache Erdungstechniken für den Moment
2. Fragen, die ich mir stellen kann, um die Realität zu überprüfen
3. Wie ich diese Erfahrung in meinem NEBULA ODYSSEY-System dokumentieren kann
4. Erinnerungen an meine Bewältigungsstrategien`
      },
      {
        title: "Symptommanagement-Plan",
        prompt: `Hilf mir, einen Plan zur Bewältigung meiner Schizophrenie-Symptome zu erstellen, der in mein NEBULA ODYSSEY-System integriert werden kann.

Meine häufigsten Symptome:
[LISTE DER SYMPTOME]

Bitte erstelle einen Plan mit:
1. Tägliche Routinen zur Symptomkontrolle
2. Frühwarnzeichen und wie ich darauf reagieren kann
3. Wie ich Fortschritte im Symptommanagement verfolgen kann
4. Quests und Achievements für erfolgreiche Bewältigungsstrategien`
      }
    ],
    shadow: [
      {
        title: "Schattenaspekt-Identifikation",
        prompt: `Hilf mir, potenzielle Schattenaspekte meiner Persönlichkeit zu identifizieren, basierend auf folgenden Beobachtungen:

Situationen, die starke emotionale Reaktionen auslösen:
[BESCHREIBE SITUATIONEN]

Eigenschaften, die mich an anderen stören:
[BESCHREIBE EIGENSCHAFTEN]

Wiederkehrende Träume oder Fantasien:
[BESCHREIBE TRÄUME/FANTASIEN]

Bitte analysiere diese Informationen und hilf mir:
1. Potenzielle Schattenaspekte zu identifizieren
2. Zu verstehen, wie diese Aspekte mein Leben beeinflussen
3. Erste Schritte zur Integration dieser Aspekte zu planen
4. Wie ich diese Arbeit in mein NEBULA ODYSSEY-System einbinden kann`
      },
      {
        title: "Dialog mit dem Schatten",
        prompt: `Führe mich durch einen imaginären Dialog mit einem Schattenaspekt meiner Persönlichkeit:

Schattenaspekt: [BESCHREIBE DEN ASPEKT]

Bitte leite einen Dialog an, der:
1. Mit einer Begrüßung und Anerkennung des Schattenaspekts beginnt
2. Fragen stellt, um die Motivation und den Zweck dieses Aspekts zu verstehen
3. Nach Wegen sucht, wie dieser Aspekt konstruktiv integriert werden kann
4. Mit einer Vereinbarung oder einem Verständnis endet

Formatiere dies als Dialog zwischen mir und dem Schattenaspekt, mit Anleitung für den Prozess.`
      }
    ],
    quests: [
      {
        title: "Personalisierte Quest-Generierung",
        prompt: `Generiere personalisierte Quests für mein NEBULA ODYSSEY-System basierend auf meinen aktuellen Zielen und Herausforderungen:

Aktuelle Ziele:
[LISTE DER ZIELE]

Aktuelle Herausforderungen:
[LISTE DER HERAUSFORDERUNGEN]

Fähigkeiten, die ich entwickeln möchte:
[LISTE DER FÄHIGKEITEN]

Bitte erstelle:
1. Eine tägliche Quest (einfach, in 15-30 Minuten erreichbar)
2. Eine wöchentliche Quest (mittlere Schwierigkeit, erfordert mehrere Schritte)
3. Eine monatliche Quest (herausfordernd, bedeutender Meilenstein)
4. Eine "Shadow Work"-Quest zur persönlichen Entwicklung

Für jede Quest gib Titel, Beschreibung, Schritte zur Erfüllung, XP-Belohnung und potenzielle Skill-Verbesserungen an.`
      },
      {
        title: "Therapeutische Herausforderungen",
        prompt: `Erstelle therapeutische Herausforderungen für mein NEBULA ODYSSEY-System, die mir helfen, mit [THEMA] umzugehen:

Meine aktuelle Situation:
[BESCHREIBE SITUATION]

Bisherige Bewältigungsstrategien:
[BESCHREIBE STRATEGIEN]

Bitte erstelle drei therapeutische Herausforderungen mit:
1. Klarem therapeutischen Ziel
2. Schrittweiser Anleitung
3. Möglichkeiten zur Selbstreflexion
4. Wie der Erfolg gemessen werden kann
5. XP-Belohnungen und Skill-Verbesserungen im NEBULA ODYSSEY-System`
      }
    ]
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPromptText('');
  };

  const handlePromptSelect = (prompt) => {
    setPromptText(prompt);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(promptText);
    // Show a toast or notification here
  };

  const handleOpenChatGPT = () => {
    window.open('https://chat.openai.com', '_blank');
  };

  const renderPromptTemplates = () => {
    return predefinedPrompts[activeTab].map((template, index) => (
      <div 
        key={index}
        className="prompt-template p-4 bg-[var(--secondary)] rounded-lg cursor-pointer hover:bg-[var(--secondary-hover)] transition-colors"
        onClick={() => handlePromptSelect(template.prompt)}
      >
        <h3 className="text-lg font-medium mb-2">{template.title}</h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
          {template.prompt.substring(0, 100)}...
        </p>
      </div>
    ));
  };

  return (
    <Layout title="ChatGPT Integration">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-4">ChatGPT Plus Integration</h1>
            <p className="text-[var(--text-secondary)]">
              Nutze dein bestehendes ChatGPT Plus-Abonnement, um personalisierte Unterstützung für deine NEBULA ODYSSEY-Reise zu erhalten.
            </p>
          </div>
          
          {showTutorial && (
            <motion.div 
              className="tutorial-card p-6 bg-[var(--secondary)] rounded-lg mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <FiInfo className="text-[var(--accent)] text-xl mr-2" />
                  <h2 className="text-xl font-semibold">Wie du ChatGPT mit NEBULA ODYSSEY nutzt</h2>
                </div>
                <button 
                  className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  onClick={() => setShowTutorial(false)}
                >
                  ✕
                </button>
              </div>
              <ol className="list-decimal list-inside space-y-2 text-[var(--text-secondary)]">
                <li>Wähle unten eine Kategorie aus, die deinem aktuellen Bedürfnis entspricht</li>
                <li>Wähle eine Vorlage oder erstelle deinen eigenen Prompt</li>
                <li>Passe den Prompt an, indem du die Platzhalter in [GROSSBUCHSTABEN] durch deine eigenen Informationen ersetzt</li>
                <li>Kopiere den fertigen Prompt mit dem Kopieren-Button</li>
                <li>Öffne ChatGPT Plus in einem neuen Tab und füge den Prompt ein</li>
                <li>Nutze die Antwort in deinem NEBULA ODYSSEY-System</li>
              </ol>
              <div className="mt-4 text-sm text-[var(--accent)]">
                Diese Methode nutzt dein bestehendes ChatGPT Plus-Abonnement und verursacht keine zusätzlichen API-Kosten.
              </div>
            </motion.div>
          )}
          
          {/* Category Tabs */}
          <div className="tabs-container mb-6">
            <div className="flex flex-wrap gap-2">
              <button
                className={`tab-button px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'reflection' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => handleTabChange('reflection')}
              >
                Reflexion
              </button>
              <button
                className={`tab-button px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'addiction' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => handleTabChange('addiction')}
              >
                Suchtbewältigung
              </button>
              <button
                className={`tab-button px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'schizophrenia' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => handleTabChange('schizophrenia')}
              >
                Schizophrenie
              </button>
              <button
                className={`tab-button px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'shadow' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => handleTabChange('shadow')}
              >
                Shadow Work
              </button>
              <button
                className={`tab-button px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'quests' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => handleTabChange('quests')}
              >
                Quests
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Prompt Templates */}
            <div className="md:col-span-1">
              <h2 className="text-xl font-semibold mb-4">Prompt-Vorlagen</h2>
              <div className="space-y-4">
                {renderPromptTemplates()}
              </div>
            </div>
            
            {/* Prompt Editor */}
            <div className="md:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Prompt-Editor</h2>
                <div className="flex space-x-2">
                  <button 
                    className="btn btn-secondary flex items-center"
                    onClick={handleCopyToClipboard}
                  >
                    <FiCopy className="mr-2" />
                    Kopieren
                  </button>
                  <button 
                    className="btn btn-primary flex items-center"
                    onClick={handleOpenChatGPT}
                  >
                    <FiExternalLink className="mr-2" />
                    ChatGPT öffnen
                  </button>
                </div>
              </div>
              <textarea
                className="w-full h-96 bg-[var(--primary)] border border-[var(--text-secondary)] border-opacity-30 rounded-md p-4 focus:border-[var(--accent)] focus:outline-none transition-colors font-mono text-sm"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Wähle eine Vorlage aus oder schreibe deinen eigenen Prompt hier..."
              ></textarea>
              <div className="mt-4 text-sm text-[var(--text-secondary)]">
                <p>Ersetze alle Platzhalter in [GROSSBUCHSTABEN] mit deinen eigenen Informationen.</p>
              </div>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="navigation-buttons mt-12 flex justify-between">
            <Link href="/therapeutic" className="btn btn-secondary">
              Zurück zu Therapeutischen Komponenten
            </Link>
            <Link href="/dashboard" className="btn btn-primary">
              Zum Dashboard
            </Link>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default ChatGPTIntegration;
