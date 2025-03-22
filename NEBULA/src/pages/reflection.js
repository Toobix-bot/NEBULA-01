import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivacyNotice, LoadingIndicator, Badge, ProgressBar } from '../components/UIComponents';
import localStorageUtil from '../lib/localStorageUtil';

const Reflection = () => {
  const router = useRouter();
  const [mood, setMood] = useState('neutral');
  const [reflectionText, setReflectionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [savedReflections, setSavedReflections] = useState([]);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(true);

  useEffect(() => {
    // Lade gespeicherte Reflexionen aus dem localStorage
    const reflections = localStorageUtil.loadData('nebula_reflections', []);
    setSavedReflections(reflections);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reflectionText.trim()) {
      alert('Bitte gib einen Reflexionstext ein.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In einer echten Implementierung würde hier ein API-Aufruf erfolgen
      // Für diese Demo simulieren wir eine Antwort nach einer kurzen Verzögerung
      setTimeout(() => {
        const newAnalysis = generateMockAnalysis(mood, reflectionText);
        setAnalysis(newAnalysis);
        
        // Speichere die Reflexion im localStorage
        const newReflection = {
          id: Date.now(),
          date: new Date().toISOString(),
          mood,
          text: reflectionText,
          analysis: newAnalysis
        };
        
        const updatedReflections = [newReflection, ...savedReflections];
        localStorageUtil.saveData('nebula_reflections', updatedReflections);
        setSavedReflections(updatedReflections);
        
        setIsSubmitting(false);
      }, 1500);
    } catch (error) {
      console.error('Fehler bei der Analyse:', error);
      setIsSubmitting(false);
      alert('Es gab einen Fehler bei der Analyse deiner Reflexion. Bitte versuche es später erneut.');
    }
  };
  
  const generateMockAnalysis = (mood, text) => {
    // Extrahiere Schlüsselwörter aus dem Text für personalisierte Antworten
    const keywords = extractKeywords(text);
    
    // Generiere personalisierte Antwort basierend auf Stimmung und Schlüsselwörtern
    if (mood === 'positive') {
      return {
        summary: `Basierend auf deiner Reflexion scheinst du heute sehr produktiv und positiv gestimmt zu sein. ${keywords.length > 0 ? `Deine Erwähnung von ${keywords.join(', ')} zeigt dein Engagement in diesen Bereichen.` : ''}`,
        insights: [
          `Du zeigst eine starke intrinsische Motivation${keywords.includes('Ziel') ? ' und klare Zielorientierung' : ''}`,
          `Du fokussierst dich auf Lösungen statt auf Probleme${keywords.includes('Lösung') ? ', was sich in deinem Ansatz widerspiegelt' : ''}`,
          `Du erkennst und würdigst deine Erfolge angemessen${keywords.includes('Erfolg') ? ', besonders in Bezug auf deine jüngsten Erfolge' : ''}`
        ],
        recommendations: [
          `Nutze deine positive Energie, um ein anspruchsvolles Projekt voranzutreiben${keywords.includes('Projekt') ? ', besonders das von dir erwähnte Projekt' : ''}`,
          `Teile deine Erfolge mit anderen, um sie zu inspirieren${keywords.includes('Team') ? ', besonders mit deinem Team' : ''}`,
          `Setze dir ein neues, ambitioniertes Ziel für die kommende Woche${keywords.includes('Planung') ? ', basierend auf deiner aktuellen Planung' : ''}`
        ],
        suggestedQuests: [
          "Herausforderungs-Quest: Lerne eine neue Fähigkeit: +100 XP",
          "Inspirations-Quest: Teile deine Erfolgsgeschichte: +50 XP",
          "Planungs-Quest: Setze ein neues Ziel mit konkreten Schritten: +75 XP"
        ]
      };
    } else if (mood === 'negative') {
      return {
        summary: `Deine Reflexion zeigt, dass du heute einige Herausforderungen erlebt hast. ${keywords.length > 0 ? `Deine Erwähnung von ${keywords.join(', ')} deutet auf Bereiche hin, die dich beschäftigen.` : ''}`,
        insights: [
          `Du bist in der Lage, Schwierigkeiten zu erkennen und zu benennen${keywords.includes('Problem') ? ', besonders bei den aktuellen Problemen' : ''}`,
          `Du neigst dazu, zu selbstkritisch zu sein${keywords.includes('Fehler') ? ', besonders bei der Beurteilung deiner Fehler' : ''}`,
          `Du hast Potenzial für mehr Selbstmitgefühl${keywords.includes('Stress') ? ', besonders in stressigen Situationen' : ''}`
        ],
        recommendations: [
          `Nimm dir Zeit für Selbstfürsorge und Erholung${keywords.includes('Müdigkeit') ? ', um deine Müdigkeit zu bekämpfen' : ''}`,
          `Reflektiere über vergangene Erfolge, um Perspektive zu gewinnen${keywords.includes('Zweifel') ? ' und deine Zweifel zu reduzieren' : ''}`,
          `Teile deine Herausforderungen mit einem Vertrauten oder Mentor${keywords.includes('Unterstützung') ? ', um die Unterstützung zu erhalten, die du brauchst' : ''}`
        ],
        suggestedQuests: [
          "Selbstfürsorge-Quest: 30 Minuten Entspannung: +40 XP",
          "Reflexions-Quest: Schreibe drei positive Aspekte des Tages auf: +30 XP",
          "Verbindungs-Quest: Suche Unterstützung bei einem Freund: +50 XP"
        ]
      };
    } else {
      // Neutral mood
      return {
        summary: `Basierend auf deiner Reflexion scheinst du heute einen ausgeglichenen Tag gehabt zu haben. ${keywords.length > 0 ? `Deine Erwähnung von ${keywords.join(', ')} zeigt deine aktuellen Fokusgebiete.` : ''}`,
        insights: [
          `Du zeigst eine ausgewogene Perspektive auf deine Erfahrungen${keywords.includes('Balance') ? ', besonders in Bezug auf Work-Life-Balance' : ''}`,
          `Du fokussierst dich auf kontinuierlichen Fortschritt statt Perfektion${keywords.includes('Fortschritt') ? ', was sich in deiner Einstellung zum Fortschritt zeigt' : ''}`,
          `Du bist dir deiner Stärken und Verbesserungsbereiche bewusst${keywords.includes('Lernen') ? ', besonders in Bezug auf dein kontinuierliches Lernen' : ''}`
        ],
        recommendations: [
          `Versuche, morgen 30 Minuten früher aufzustehen für mehr Fokuszeit${keywords.includes('Morgen') ? ', um deinen Morgen produktiver zu gestalten' : ''}`,
          `Plane eine kurze Meditation ein, um deine Konzentration zu verbessern${keywords.includes('Fokus') ? ' und deinen Fokus zu stärken' : ''}`,
          `Setze dir ein spezifisches Ziel für den nächsten Schritt in deinem Hauptprojekt${keywords.includes('Projekt') ? ', besonders für dein aktuelles Projekt' : ''}`
        ],
        suggestedQuests: [
          "Morgenroutine optimieren: +50 XP",
          "15 Minuten Meditation: +30 XP",
          "Hauptprojekt vorantreiben: +100 XP"
        ]
      };
    }
  };
  
  const extractKeywords = (text) => {
    // Einfache Keyword-Extraktion für Personalisierung
    const keywords = [];
    const possibleKeywords = ['Ziel', 'Projekt', 'Team', 'Erfolg', 'Planung', 'Problem', 
                             'Fehler', 'Stress', 'Müdigkeit', 'Zweifel', 'Unterstützung', 
                             'Balance', 'Fortschritt', 'Lernen', 'Morgen', 'Fokus', 'Lösung'];
    
    possibleKeywords.forEach(keyword => {
      if (text.toLowerCase().includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    });
    
    return keywords.slice(0, 3); // Maximal 3 Keywords zurückgeben
  };
  
  const deleteReflection = (id) => {
    const updatedReflections = savedReflections.filter(reflection => reflection.id !== id);
    localStorageUtil.saveData('nebula_reflections', updatedReflections);
    setSavedReflections(updatedReflections);
  };
  
  const exportReflections = () => {
    localStorageUtil.exportData();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reflexion</h1>
      
      {showPrivacyInfo && (
        <PrivacyNotice>
          Deine Reflexionen werden ausschließlich lokal in deinem Browser gespeichert und sind nur für dich sichtbar. 
          Die KI-Analyse erfolgt ohne dauerhafte Speicherung deiner Daten auf externen Servern.
          <button 
            className="ml-2 text-nebula-purple underline" 
            onClick={() => setShowPrivacyInfo(false)}
          >
            Verstanden
          </button>
        </PrivacyNotice>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">Neue Reflexion</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="mood" className="block mb-2">Wie fühlst du dich heute?</label>
              <div className="flex gap-4">
                <button 
                  type="button" 
                  className={`btn ${mood === 'negative' ? 'btn-danger' : 'btn-secondary'}`}
                  onClick={() => setMood('negative')}
                >
                  😔 Nicht so gut
                </button>
                <button 
                  type="button" 
                  className={`btn ${mood === 'neutral' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setMood('neutral')}
                >
                  😐 Neutral
                </button>
                <button 
                  type="button" 
                  className={`btn ${mood === 'positive' ? 'btn-success' : 'btn-secondary'}`}
                  onClick={() => setMood('positive')}
                >
                  😊 Gut
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <label htmlFor="reflection" className="block mb-2">Deine Reflexion</label>
              <textarea 
                id="reflection"
                className="w-full p-2 border rounded-md"
                rows="6"
                value={reflectionText}
                onChange={(e) => setReflectionText(e.target.value)}
                placeholder="Wie war dein Tag? Was hast du gelernt? Worüber denkst du nach?"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Wird analysiert...' : 'Reflexion analysieren'}
            </button>
          </form>
          
          {isSubmitting && <LoadingIndicator isLoading={true} text="Deine Reflexion wird analysiert..." />}
        </div>
        
        <div>
          {analysis ? (
            <div className="card card-accent animate-fadeIn">
              <h2 className="text-2xl font-semibold mb-4">Analyse deiner Reflexion</h2>
              
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Zusammenfassung</h3>
                <p>{analysis.summary}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Einsichten</h3>
                <ul className="list-disc pl-5">
                  {analysis.insights.map((insight, index) => (
                    <li key={index} className="mb-1">{insight}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-4">
                <h3 className="text-xl font-medium mb-2">Empfehlungen</h3>
                <ul className="list-disc pl-5">
                  {analysis.recommendations.map((recommendation, index) => (
                    <li key={index} className="mb-1">{recommendation}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-2">Vorgeschlagene Quests</h3>
                <div className="grid grid-cols-1 gap-2">
                  {analysis.suggestedQuests.map((quest, index) => (
                    <div key={index} className="bg-gray-50 p-2 rounded-md flex justify-between items-center">
                      <span>{quest.split(':')[0]}</span>
                      <Badge type="primary">{quest.split(':')[1]}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Deine Reflexionsanalyse</h2>
              <p className="text-muted">Fülle das Formular aus und klicke auf "Reflexion analysieren", um eine personalisierte Analyse zu erhalten.</p>
            </div>
          )}
        </div>
      </div>
      
      {savedReflections.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Deine Reflexionshistorie</h2>
            <button 
              className="btn btn-secondary"
              onClick={exportReflections}
            >
              Reflexionen exportieren
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {savedReflections.map((reflection) => (
              <div key={reflection.id} className="card">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span>{new Date(reflection.date).toLocaleDateString()}</span>
                      <Badge 
                        type={
                          reflection.mood === 'positive' ? 'success' : 
                          reflection.mood === 'negative' ? 'danger' : 
                          'primary'
                        }
                      >
                        {reflection.mood === 'positive' ? 'Gut' : 
                         reflection.mood === 'negative' ? 'Nicht so gut' : 
                         'Neutral'}
                      </Badge>
                    </div>
                    <p className="mb-2">{reflection.text}</p>
                  </div>
                  <button 
                    className="text-danger"
                    onClick={() => deleteReflection(reflection.id)}
                  >
                    Löschen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Reflection;
