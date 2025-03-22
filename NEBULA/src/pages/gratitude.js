import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiHeart, FiStar, FiCalendar, FiClock, FiPlus, FiEdit, FiTrash2 } from 'react-icons/fi';

const GratitudePage = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('gratitude');
  
  // Mock data for gratitude entries
  const [gratitudeEntries, setGratitudeEntries] = useState([
    {
      id: 1,
      date: "20. März 2025",
      content: "Ich bin dankbar für die Möglichkeit, NEBULA ODYSSEY zu entwickeln und damit mein Leben auf eine strukturierte und spielerische Weise zu verbessern.",
      category: "persönlich"
    },
    {
      id: 2,
      date: "19. März 2025",
      content: "Ich bin dankbar für die Unterstützung meiner Familie und Freunde, die mich auf meinem Weg begleiten.",
      category: "beziehungen"
    },
    {
      id: 3,
      date: "18. März 2025",
      content: "Ich bin dankbar für die kleinen Fortschritte, die ich täglich in meiner persönlichen Entwicklung mache.",
      category: "wachstum"
    }
  ]);
  
  // Mock data for present moment awareness entries
  const [momentEntries, setMomentEntries] = useState([
    {
      id: 1,
      date: "20. März 2025",
      time: "10:30",
      observation: "Ich nehme den Geschmack meines Kaffees bewusst wahr und genieße die Wärme der Tasse in meinen Händen.",
      emotions: "Ruhe, Zufriedenheit",
      thoughts: "Ich bemerke, wie mein Geist zur Ruhe kommt, wenn ich mich auf den Moment konzentriere."
    },
    {
      id: 2,
      date: "19. März 2025",
      time: "15:45",
      observation: "Ich spüre den Wind auf meiner Haut während eines kurzen Spaziergangs und höre bewusst die Geräusche um mich herum.",
      emotions: "Freiheit, Verbundenheit",
      thoughts: "Die Natur hilft mir, im Hier und Jetzt zu sein und meine Sorgen loszulassen."
    }
  ]);
  
  const handleAddEntry = (type, entry) => {
    if (type === 'gratitude') {
      setGratitudeEntries([
        {
          id: gratitudeEntries.length + 1,
          date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.'),
          content: entry.content,
          category: entry.category
        },
        ...gratitudeEntries
      ]);
    } else {
      setMomentEntries([
        {
          id: momentEntries.length + 1,
          date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '.'),
          time: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }),
          observation: entry.observation,
          emotions: entry.emotions,
          thoughts: entry.thoughts
        },
        ...momentEntries
      ]);
    }
    setShowAddModal(false);
  };
  
  const AddEntryModal = () => {
    const [entryType, setEntryType] = useState(activeTab);
    const [gratitudeContent, setGratitudeContent] = useState('');
    const [gratitudeCategory, setGratitudeCategory] = useState('persönlich');
    const [momentObservation, setMomentObservation] = useState('');
    const [momentEmotions, setMomentEmotions] = useState('');
    const [momentThoughts, setMomentThoughts] = useState('');
    
    const handleSubmit = () => {
      if (entryType === 'gratitude') {
        if (gratitudeContent.trim() === '') return;
        handleAddEntry('gratitude', {
          content: gratitudeContent,
          category: gratitudeCategory
        });
      } else {
        if (momentObservation.trim() === '') return;
        handleAddEntry('moment', {
          observation: momentObservation,
          emotions: momentEmotions,
          thoughts: momentThoughts
        });
      }
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <motion.div 
          className="bg-[var(--primary)] rounded-lg p-6 w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {entryType === 'gratitude' ? 'Neue Dankbarkeitsnotiz' : 'Neue Momentaufnahme'}
            </h2>
            <button 
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              onClick={() => setShowAddModal(false)}
            >
              ✕
            </button>
          </div>
          
          <div className="tabs-container mb-4">
            <div className="flex gap-2">
              <button
                className={`tab-button px-4 py-2 rounded-lg transition-colors ${
                  entryType === 'gratitude' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => setEntryType('gratitude')}
              >
                Dankbarkeit
              </button>
              <button
                className={`tab-button px-4 py-2 rounded-lg transition-colors ${
                  entryType === 'moment' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => setEntryType('moment')}
              >
                Gegenwärtigkeit
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            {entryType === 'gratitude' ? (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Wofür bist du dankbar?</label>
                  <textarea 
                    className="w-full bg-[var(--secondary)] border border-[var(--text-secondary)] border-opacity-30 rounded-md p-2 focus:border-[var(--accent)] focus:outline-none transition-colors"
                    rows="4"
                    placeholder="Ich bin dankbar für..."
                    value={gratitudeContent}
                    onChange={(e) => setGratitudeContent(e.target.value)}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Kategorie</label>
                  <select 
                    className="w-full bg-[var(--secondary)] border border-[var(--text-secondary)] border-opacity-30 rounded-md p-2 focus:border-[var(--accent)] focus:outline-none transition-colors"
                    value={gratitudeCategory}
                    onChange={(e) => setGratitudeCategory(e.target.value)}
                  >
                    <option value="persönlich">Persönlich</option>
                    <option value="beziehungen">Beziehungen</option>
                    <option value="gesundheit">Gesundheit</option>
                    <option value="wachstum">Wachstum</option>
                    <option value="umgebung">Umgebung</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-1">Was nimmst du in diesem Moment wahr?</label>
                  <textarea 
                    className="w-full bg-[var(--secondary)] border border-[var(--text-secondary)] border-opacity-30 rounded-md p-2 focus:border-[var(--accent)] focus:outline-none transition-colors"
                    rows="3"
                    placeholder="Beschreibe, was du siehst, hörst, fühlst, riechst oder schmeckst..."
                    value={momentObservation}
                    onChange={(e) => setMomentObservation(e.target.value)}
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Welche Emotionen spürst du?</label>
                  <input 
                    type="text" 
                    className="w-full bg-[var(--secondary)] border border-[var(--text-secondary)] border-opacity-30 rounded-md p-2 focus:border-[var(--accent)] focus:outline-none transition-colors"
                    placeholder="z.B. Ruhe, Freude, Neugier..."
                    value={momentEmotions}
                    onChange={(e) => setMomentEmotions(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Welche Gedanken hast du?</label>
                  <textarea 
                    className="w-full bg-[var(--secondary)] border border-[var(--text-secondary)] border-opacity-30 rounded-md p-2 focus:border-[var(--accent)] focus:outline-none transition-colors"
                    rows="2"
                    placeholder="Welche Gedanken beobachtest du in diesem Moment?"
                    value={momentThoughts}
                    onChange={(e) => setMomentThoughts(e.target.value)}
                  ></textarea>
                </div>
              </>
            )}
            
            <div className="pt-4 flex justify-end space-x-3">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Abbrechen
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Speichern
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };
  
  const GratitudeCard = ({ entry }) => {
    return (
      <motion.div 
        className="gratitude-card p-6 rounded-lg bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] transition-colors"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <FiHeart className="text-[var(--accent)] text-xl mr-2" />
            <div className="text-sm text-[var(--text-secondary)]">{entry.date}</div>
          </div>
          <div className="category-badge px-2 py-1 text-xs rounded-full bg-[var(--accent)] bg-opacity-20 text-[var(--accent)]">
            {entry.category}
          </div>
        </div>
        
        <p className="text-[var(--text-primary)] mb-4">{entry.content}</p>
        
        <div className="flex justify-end space-x-2">
          <button className="icon-button p-2 rounded-full hover:bg-[var(--primary)]">
            <FiEdit className="text-[var(--text-secondary)]" />
          </button>
          <button className="icon-button p-2 rounded-full hover:bg-[var(--primary)]">
            <FiTrash2 className="text-[var(--text-secondary)]" />
          </button>
        </div>
      </motion.div>
    );
  };
  
  const MomentCard = ({ entry }) => {
    return (
      <motion.div 
        className="moment-card p-6 rounded-lg bg-[var(--secondary)] hover:bg-[var(--secondary-hover)] transition-colors"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <FiStar className="text-[var(--accent)] text-xl mr-2" />
            <div className="text-sm text-[var(--text-secondary)]">{entry.date}, {entry.time}</div>
          </div>
        </div>
        
        <div className="mb-3">
          <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Wahrnehmung:</h3>
          <p className="text-[var(--text-primary)]">{entry.observation}</p>
        </div>
        
        <div className="mb-3">
          <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Emotionen:</h3>
          <p className="text-[var(--text-primary)]">{entry.emotions}</p>
        </div>
        
        <div className="mb-4">
          <h3 className="text-sm font-medium text-[var(--text-secondary)] mb-1">Gedanken:</h3>
          <p className="text-[var(--text-primary)]">{entry.thoughts}</p>
        </div>
        
        <div className="flex justify-end space-x-2">
          <button className="icon-button p-2 rounded-full hover:bg-[var(--primary)]">
            <FiEdit className="text-[var(--text-secondary)]" />
          </button>
          <button className="icon-button p-2 rounded-full hover:bg-[var(--primary)]">
            <FiTrash2 className="text-[var(--text-secondary)]" />
          </button>
        </div>
      </motion.div>
    );
  };
  
  const renderBenefits = () => {
    const benefits = {
      gratitude: [
        {
          title: "Verbesserte psychische Gesundheit",
          description: "Regelmäßige Dankbarkeitsübungen können Stress reduzieren und das allgemeine Wohlbefinden steigern."
        },
        {
          title: "Stärkere Resilienz",
          description: "Dankbarkeit hilft dir, auch in schwierigen Zeiten das Positive zu erkennen und Herausforderungen besser zu bewältigen."
        },
        {
          title: "Bessere Beziehungen",
          description: "Wenn du Wertschätzung ausdrückst, stärkst du deine Verbindungen zu anderen Menschen."
        }
      ],
      moment: [
        {
          title: "Reduzierte Angst",
          description: "Im gegenwärtigen Moment zu sein reduziert Grübeln über die Vergangenheit und Sorgen über die Zukunft."
        },
        {
          title: "Verbesserte Konzentration",
          description: "Achtsamkeit trainiert deinen Geist, fokussiert zu bleiben und Ablenkungen zu reduzieren."
        },
        {
          title: "Emotionale Regulation",
          description: "Die Annahme des Moments hilft dir, deine Emotionen zu beobachten, ohne von ihnen überwältigt zu werden."
        }
      ]
    };
    
    return (
      <div className="benefits-section mt-8 p-6 bg-[var(--secondary)] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Vorteile von {activeTab === 'gratitude' ? 'Dankbarkeit' : 'Gegenwärtigkeit'}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {benefits[activeTab].map((benefit, index) => (
            <div key={index} className="benefit-card p-4 bg-[var(--primary)] rounded-lg">
              <h3 className="font-medium mb-2">{benefit.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderCreatorNote = () => {
    return (
      <div className="creator-note mt-12 p-6 bg-[var(--secondary)] rounded-lg">
        <div className="flex items-start">
          <div className="mr-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--nebula-purple)] to-[var(--nebula-blue)] flex items-center justify-center text-white text-xl font-bold">
              R
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Eine Notiz vom Schöpfer</h3>
            <p className="text-[var(--text-secondary)] mb-3">
              NEBULA ODYSSEY entstand aus meinem persönlichen Bedürfnis, einen strukturierten und spielerischen Weg zur Selbstentwicklung zu finden. 
              Dankbarkeit und Gegenwärtigkeit sind zwei Praktiken, die mir besonders geholfen haben, meine mentale Gesundheit zu verbessern und 
              mit Herausforderungen wie Sucht und Schizophrenie umzugehen.
            </p>
            <p className="text-[var(--text-secondary)]">
              Ich hoffe, dass dieses System auch dir hilft, deine eigene Odyssee durch die Sterne des persönlichen Wachstums zu navigieren.
              Jeder Fortschritt, egal wie klein, ist ein Schritt auf deiner Reise.
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <Layout title={activeTab === 'gratitude' ? 'Dankbarkeit' : 'Gegenwärtigkeit'}>
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {activeTab === 'gratitude' ? 'Dankbarkeit' : 'Annahme des Moments'}
              </h1>
              <p className="text-[var(--text-secondary)]">
                {activeTab === 'gratitude' 
                  ? 'Kultiviere Dankbarkeit und erkenne die positiven Aspekte deines Lebens.'
                  : 'Übe dich in Gegenwärtigkeit und nimm den aktuellen Moment bewusst wahr.'}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button 
                className="btn btn-primary flex items-center"
                onClick={() => setShowAddModal(true)}
              >
                <FiPlus className="mr-2" />
                Neuer Eintrag
              </button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="tabs-container mb-8">
            <div className="flex gap-2">
              <button
                className={`tab-button flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'gratitude' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => setActiveTab('gratitude')}
              >
                <FiHeart className="mr-2" />
                Dankbarkeit
              </button>
              <button
                className={`tab-button flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'moment' 
                    ? 'bg-[var(--accent)] text-white' 
                    : 'bg-[var(--secondary)] hover:bg-[var(--secondary-hover)]'
                }`}
                onClick={() => setActiveTab('moment')}
              >
                <FiStar className="mr-2" />
                Gegenwärtigkeit
              </button>
            </div>
          </div>
          
          {/* Entries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'gratitude'
              ? gratitudeEntries.map(entry => <GratitudeCard key={entry.id} entry={entry} />)
              : momentEntries.map(entry => <MomentCard key={entry.id} entry={entry} />)
            }
          </div>
          
          {/* Benefits Section */}
          {renderBenefits()}
          
          {/* Creator Note */}
          {renderCreatorNote()}
          
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
      
      {/* Add Entry Modal */}
      {showAddModal && <AddEntryModal />}
    </Layout>
  );
};

export default GratitudePage;
