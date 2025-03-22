import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivacyNotice, LoadingIndicator, Badge, ProgressBar } from '../components/UIComponents';
import localStorageUtil from '../lib/localStorageUtil';

const Quests = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('daily');
  const [quests, setQuests] = useState({
    daily: [],
    weekly: [],
    longterm: []
  });
  const [newQuest, setNewQuest] = useState({
    title: '',
    description: '',
    difficulty: 'Mittel',
    tags: '',
    deadline: '',
    estimatedTime: '',
    type: 'daily'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(true);

  useEffect(() => {
    // Lade gespeicherte Quests aus dem localStorage
    const savedQuests = localStorageUtil.loadData('nebula_quests', {
      daily: [],
      weekly: [],
      longterm: []
    });
    
    // Wenn keine gespeicherten Quests vorhanden sind, lade Beispiel-Quests
    if (savedQuests.daily.length === 0 && 
        savedQuests.weekly.length === 0 && 
        savedQuests.longterm.length === 0) {
      setQuests(getExampleQuests());
      localStorageUtil.saveData('nebula_quests', getExampleQuests());
    } else {
      setQuests(savedQuests);
    }
    
    setIsLoading(false);
  }, []);

  const getExampleQuests = () => {
    return {
      daily: [
        {
          id: 'd1',
          title: '30 Minuten Meditation',
          description: 'Führe eine 30-minütige Meditation durch, um deinen Geist zu beruhigen und deine Konzentration zu verbessern.',
          difficulty: 'Leicht',
          tags: ['Achtsamkeit', 'Wohlbefinden'],
          deadline: 'Heute',
          estimatedTime: '30 Min',
          xp: 50,
          completed: false
        },
        {
          id: 'd2',
          title: 'Projektplan erstellen',
          description: 'Erstelle einen detaillierten Plan für dein aktuelles Projekt mit Zeitplan und Meilensteinen.',
          difficulty: 'Mittel',
          tags: ['Produktivität', 'Organisation'],
          deadline: 'Heute',
          estimatedTime: '45 Min',
          xp: 75,
          completed: false
        }
      ],
      weekly: [
        {
          id: 'w1',
          title: 'Buch abschließen',
          description: 'Beende das Buch, das du gerade liest, und reflektiere über die wichtigsten Erkenntnisse.',
          difficulty: 'Mittel',
          tags: ['Bildung', 'Persönliches Wachstum'],
          deadline: 'Diese Woche',
          estimatedTime: '3 Std',
          xp: 150,
          completed: false
        },
        {
          id: 'w2',
          title: 'Wöchentliche Reflexion',
          description: 'Führe eine tiefgehende Reflexion über deine Fortschritte und Herausforderungen der Woche durch.',
          difficulty: 'Leicht',
          tags: ['Reflexion', 'Achtsamkeit'],
          deadline: 'Sonntag',
          estimatedTime: '1 Std',
          xp: 100,
          completed: false
        }
      ],
      longterm: [
        {
          id: 'l1',
          title: 'Programmierkurs abschließen',
          description: 'Schließe den Online-Programmierkurs ab und erstelle ein Abschlussprojekt.',
          difficulty: 'Schwer',
          tags: ['Bildung', 'Technologie', 'Karriere'],
          deadline: '30 Tage',
          estimatedTime: '40 Std',
          xp: 500,
          completed: false
        },
        {
          id: 'l2',
          title: 'Meditationsgewohnheit etablieren',
          description: 'Meditiere 30 Tage lang täglich für mindestens 15 Minuten.',
          difficulty: 'Mittel',
          tags: ['Achtsamkeit', 'Gewohnheitsbildung'],
          deadline: '30 Tage',
          estimatedTime: '7.5 Std',
          xp: 300,
          completed: false
        }
      ]
    };
  };

  const handleQuestToggle = (id, type) => {
    const updatedQuests = {...quests};
    const questIndex = updatedQuests[type].findIndex(quest => quest.id === id);
    
    if (questIndex !== -1) {
      updatedQuests[type][questIndex].completed = !updatedQuests[type][questIndex].completed;
      setQuests(updatedQuests);
      localStorageUtil.saveData('nebula_quests', updatedQuests);
    }
  };

  const handleNewQuestChange = (e) => {
    const { name, value } = e.target;
    setNewQuest({
      ...newQuest,
      [name]: value
    });
  };

  const handleNewQuestSubmit = (e) => {
    e.preventDefault();
    
    if (!newQuest.title || !newQuest.description) {
      alert('Bitte fülle mindestens Titel und Beschreibung aus.');
      return;
    }
    
    const questType = newQuest.type;
    const updatedQuests = {...quests};
    
    const newQuestObj = {
      id: `${questType[0]}${Date.now()}`,
      title: newQuest.title,
      description: newQuest.description,
      difficulty: newQuest.difficulty,
      tags: newQuest.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      deadline: newQuest.deadline,
      estimatedTime: newQuest.estimatedTime,
      xp: calculateXP(newQuest.difficulty),
      completed: false
    };
    
    updatedQuests[questType] = [newQuestObj, ...updatedQuests[questType]];
    
    setQuests(updatedQuests);
    localStorageUtil.saveData('nebula_quests', updatedQuests);
    
    // Reset form
    setNewQuest({
      title: '',
      description: '',
      difficulty: 'Mittel',
      tags: '',
      deadline: '',
      estimatedTime: '',
      type: questType
    });
  };

  const calculateXP = (difficulty) => {
    switch(difficulty) {
      case 'Leicht':
        return 50;
      case 'Mittel':
        return 100;
      case 'Schwer':
        return 200;
      default:
        return 100;
    }
  };

  const deleteQuest = (id, type) => {
    const updatedQuests = {...quests};
    updatedQuests[type] = updatedQuests[type].filter(quest => quest.id !== id);
    
    setQuests(updatedQuests);
    localStorageUtil.saveData('nebula_quests', updatedQuests);
  };

  const exportQuests = () => {
    localStorageUtil.exportData();
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Leicht':
        return 'success';
      case 'Mittel':
        return 'primary';
      case 'Schwer':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const getCompletedCount = (type) => {
    return quests[type].filter(quest => quest.completed).length;
  };

  const getTotalCount = (type) => {
    return quests[type].length;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Quests</h1>
      
      {showPrivacyInfo && (
        <PrivacyNotice>
          Deine Quests werden ausschließlich lokal in deinem Browser gespeichert und sind nur für dich sichtbar.
          <button 
            className="ml-2 text-nebula-purple underline" 
            onClick={() => setShowPrivacyInfo(false)}
          >
            Verstanden
          </button>
        </PrivacyNotice>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="card">
            <div className="flex border-b mb-4">
              <button 
                className={`py-2 px-4 ${activeTab === 'daily' ? 'border-b-2 border-nebula-purple font-semibold' : ''}`}
                onClick={() => setActiveTab('daily')}
              >
                Tägliche Quests
                <span className="ml-2 text-sm">
                  {getCompletedCount('daily')}/{getTotalCount('daily')}
                </span>
              </button>
              <button 
                className={`py-2 px-4 ${activeTab === 'weekly' ? 'border-b-2 border-nebula-purple font-semibold' : ''}`}
                onClick={() => setActiveTab('weekly')}
              >
                Wöchentliche Quests
                <span className="ml-2 text-sm">
                  {getCompletedCount('weekly')}/{getTotalCount('weekly')}
                </span>
              </button>
              <button 
                className={`py-2 px-4 ${activeTab === 'longterm' ? 'border-b-2 border-nebula-purple font-semibold' : ''}`}
                onClick={() => setActiveTab('longterm')}
              >
                Langfristige Quests
                <span className="ml-2 text-sm">
                  {getCompletedCount('longterm')}/{getTotalCount('longterm')}
                </span>
              </button>
            </div>
            
            {isLoading ? (
              <LoadingIndicator isLoading={true} text="Quests werden geladen..." />
            ) : (
              <>
                <ProgressBar 
                  value={getCompletedCount(activeTab)} 
                  max={getTotalCount(activeTab)} 
                  type={activeTab === 'daily' ? 'primary' : activeTab === 'weekly' ? 'secondary' : 'success'}
                />
                
                <div className="mt-4">
                  {quests[activeTab].length === 0 ? (
                    <p className="text-center py-4 text-muted">Keine {activeTab === 'daily' ? 'täglichen' : activeTab === 'weekly' ? 'wöchentlichen' : 'langfristigen'} Quests vorhanden. Erstelle eine neue Quest!</p>
                  ) : (
                    <div className="space-y-4">
                      {quests[activeTab].map(quest => (
                        <div 
                          key={quest.id} 
                          className={`p-4 border rounded-md ${quest.completed ? 'bg-gray-50' : 'bg-white'}`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex items-start">
                              <input 
                                type="checkbox" 
                                checked={quest.completed}
                                onChange={() => handleQuestToggle(quest.id, activeTab)}
                                className="mt-1 mr-3"
                              />
                              <div>
                                <h3 className={`text-lg font-medium ${quest.completed ? 'line-through text-muted' : ''}`}>
                                  {quest.title}
                                </h3>
                                <p className={`mt-1 ${quest.completed ? 'text-muted' : ''}`}>
                                  {quest.description}
                                </p>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  <Badge type={getDifficultyColor(quest.difficulty)}>
                                    {quest.difficulty}
                                  </Badge>
                                  <Badge type="secondary">
                                    {quest.xp} XP
                                  </Badge>
                                  {quest.tags.map((tag, index) => (
                                    <Badge key={index} type="accent">
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                <div className="mt-2 text-sm text-muted">
                                  <span className="mr-4">Deadline: {quest.deadline}</span>
                                  <span>Geschätzte Zeit: {quest.estimatedTime}</span>
                                </div>
                              </div>
                            </div>
                            <button 
                              className="text-danger"
                              onClick={() => deleteQuest(quest.id, activeTab)}
                            >
                              Löschen
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              className="btn btn-secondary"
              onClick={exportQuests}
            >
              Quests exportieren
            </button>
          </div>
        </div>
        
        <div>
          <div className="card card-accent">
            <h2 className="text-2xl font-semibold mb-4">Neue Quest erstellen</h2>
            
            <form onSubmit={handleNewQuestSubmit}>
              <div className="mb-4">
                <label htmlFor="title">Titel</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title"
                  value={newQuest.title}
                  onChange={handleNewQuestChange}
                  placeholder="Quest-Titel"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="description">Beschreibung</label>
                <textarea 
                  id="description" 
                  name="description"
                  value={newQuest.description}
                  onChange={handleNewQuestChange}
                  placeholder="Beschreibe deine Quest"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="type">Quest-Typ</label>
                <select 
                  id="type" 
                  name="type"
                  value={newQuest.type}
                  onChange={handleNewQuestChange}
                >
                  <option value="daily">Täglich</option>
                  <option value="weekly">Wöchentlich</option>
                  <option value="longterm">Langfristig</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="difficulty">Schwierigkeitsgrad</label>
                <select 
                  id="difficulty" 
                  name="difficulty"
                  value={newQuest.difficulty}
                  onChange={handleNewQuestChange}
                >
                  <option value="Leicht">Leicht (50 XP)</option>
                  <option value="Mittel">Mittel (100 XP)</option>
                  <option value="Schwer">Schwer (200 XP)</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="tags">Tags (durch Komma getrennt)</label>
                <input 
                  type="text" 
                  id="tags" 
                  name="tags"
                  value={newQuest.tags}
                  onChange={handleNewQuestChange}
                  placeholder="z.B. Fitness, Produktivität, Lernen"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="deadline">Deadline</label>
                <input 
                  type="text" 
                  id="deadline" 
                  name="deadline"
                  value={newQuest.deadline}
                  onChange={handleNewQuestChange}
                  placeholder="z.B. Heute, Freitag, 15. April"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="estimatedTime">Geschätzte Zeit</label>
                <input 
                  type="text" 
                  id="estimatedTime" 
                  name="estimatedTime"
                  value={newQuest.estimatedTime}
                  onChange={handleNewQuestChange}
                  placeholder="z.B. 30 Min, 2 Std"
                />
              </div>
              
              <button type="submit" className="btn btn-primary w-full">
                Quest erstellen
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quests;
