import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivacyNotice, LoadingIndicator, Badge, ProgressBar } from '../components/UIComponents';
import localStorageUtil from '../lib/localStorageUtil';

const Skills = () => {
  const router = useRouter();
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Produktivität',
    description: '',
    currentLevel: 1,
    currentXP: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showPrivacyInfo, setShowPrivacyInfo] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Alle');

  useEffect(() => {
    // Lade gespeicherte Skills aus dem localStorage
    const savedSkills = localStorageUtil.loadData('nebula_skills', []);
    
    // Wenn keine gespeicherten Skills vorhanden sind, lade Beispiel-Skills
    if (savedSkills.length === 0) {
      setSkills(getExampleSkills());
      localStorageUtil.saveData('nebula_skills', getExampleSkills());
    } else {
      setSkills(savedSkills);
    }
    
    setIsLoading(false);
  }, []);

  const getExampleSkills = () => {
    return [
      {
        id: 's1',
        name: 'Meditation',
        category: 'Wohlbefinden',
        description: 'Die Fähigkeit, den Geist zu beruhigen und im gegenwärtigen Moment zu bleiben.',
        currentLevel: 3,
        maxLevel: 10,
        currentXP: 150,
        nextLevelXP: 400
      },
      {
        id: 's2',
        name: 'Programmieren',
        category: 'Technologie',
        description: 'Die Fähigkeit, Computerprogramme zu schreiben und technische Probleme zu lösen.',
        currentLevel: 5,
        maxLevel: 10,
        currentXP: 750,
        nextLevelXP: 1200
      },
      {
        id: 's3',
        name: 'Zeitmanagement',
        category: 'Produktivität',
        description: 'Die Fähigkeit, Zeit effektiv zu nutzen und Prioritäten zu setzen.',
        currentLevel: 4,
        maxLevel: 10,
        currentXP: 450,
        nextLevelXP: 800
      },
      {
        id: 's4',
        name: 'Kreatives Schreiben',
        category: 'Kreativität',
        description: 'Die Fähigkeit, originelle und fesselnde Texte zu verfassen.',
        currentLevel: 2,
        maxLevel: 10,
        currentXP: 80,
        nextLevelXP: 200
      }
    ];
  };

  const handleNewSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({
      ...newSkill,
      [name]: value
    });
  };

  const handleNewSkillSubmit = (e) => {
    e.preventDefault();
    
    if (!newSkill.name || !newSkill.description) {
      alert('Bitte fülle mindestens Name und Beschreibung aus.');
      return;
    }
    
    const newSkillObj = {
      id: `s${Date.now()}`,
      name: newSkill.name,
      category: newSkill.category,
      description: newSkill.description,
      currentLevel: parseInt(newSkill.currentLevel) || 1,
      maxLevel: 10,
      currentXP: 0,
      nextLevelXP: calculateNextLevelXP(parseInt(newSkill.currentLevel) || 1)
    };
    
    const updatedSkills = [...skills, newSkillObj];
    setSkills(updatedSkills);
    localStorageUtil.saveData('nebula_skills', updatedSkills);
    
    // Reset form
    setNewSkill({
      name: '',
      category: 'Produktivität',
      description: '',
      currentLevel: 1,
      currentXP: 0
    });
  };

  const calculateNextLevelXP = (level) => {
    // Einfache Formel für XP-Anforderungen: 100 * level^2
    return 100 * Math.pow(level, 2);
  };

  const addXPToSkill = (id, xpAmount) => {
    const updatedSkills = [...skills];
    const skillIndex = updatedSkills.findIndex(skill => skill.id === id);
    
    if (skillIndex !== -1) {
      const skill = updatedSkills[skillIndex];
      skill.currentXP += xpAmount;
      
      // Überprüfe, ob ein Level-Up erfolgt ist
      if (skill.currentXP >= skill.nextLevelXP && skill.currentLevel < skill.maxLevel) {
        skill.currentLevel += 1;
        skill.currentXP = skill.currentXP - skill.nextLevelXP;
        skill.nextLevelXP = calculateNextLevelXP(skill.currentLevel);
        alert(`Glückwunsch! Deine Fähigkeit "${skill.name}" hat Level ${skill.currentLevel} erreicht!`);
      }
      
      setSkills(updatedSkills);
      localStorageUtil.saveData('nebula_skills', updatedSkills);
    }
  };

  const deleteSkill = (id) => {
    const updatedSkills = skills.filter(skill => skill.id !== id);
    setSkills(updatedSkills);
    localStorageUtil.saveData('nebula_skills', updatedSkills);
  };

  const exportSkills = () => {
    localStorageUtil.exportData();
  };

  const getCategories = () => {
    const categories = ['Alle', ...new Set(skills.map(skill => skill.category))];
    return categories;
  };

  const filteredSkills = activeCategory === 'Alle' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Fähigkeiten</h1>
      
      {showPrivacyInfo && (
        <PrivacyNotice>
          Deine Fähigkeiten werden ausschließlich lokal in deinem Browser gespeichert und sind nur für dich sichtbar.
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
            <div className="flex flex-wrap border-b mb-4 gap-2">
              {getCategories().map(category => (
                <button 
                  key={category}
                  className={`py-2 px-4 ${activeCategory === category ? 'border-b-2 border-nebula-purple font-semibold' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {isLoading ? (
              <LoadingIndicator isLoading={true} text="Fähigkeiten werden geladen..." />
            ) : (
              <div className="space-y-6">
                {filteredSkills.length === 0 ? (
                  <p className="text-center py-4 text-muted">Keine Fähigkeiten in dieser Kategorie. Erstelle eine neue Fähigkeit!</p>
                ) : (
                  filteredSkills.map(skill => (
                    <div key={skill.id} className="p-4 border rounded-md bg-white">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-medium">{skill.name}</h3>
                            <Badge type="primary">Level {skill.currentLevel}</Badge>
                            <Badge type="secondary">{skill.category}</Badge>
                          </div>
                          <p className="mt-1">{skill.description}</p>
                          
                          <div className="mt-3">
                            <div className="flex justify-between text-sm mb-1">
                              <span>XP: {skill.currentXP} / {skill.nextLevelXP}</span>
                              <span>{Math.floor((skill.currentXP / skill.nextLevelXP) * 100)}%</span>
                            </div>
                            <ProgressBar value={skill.currentXP} max={skill.nextLevelXP} type="primary" />
                          </div>
                          
                          <div className="mt-3 flex gap-2">
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => addXPToSkill(skill.id, 10)}
                            >
                              +10 XP
                            </button>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => addXPToSkill(skill.id, 50)}
                            >
                              +50 XP
                            </button>
                            <button 
                              className="btn btn-secondary btn-sm"
                              onClick={() => addXPToSkill(skill.id, 100)}
                            >
                              +100 XP
                            </button>
                          </div>
                        </div>
                        <button 
                          className="text-danger"
                          onClick={() => deleteSkill(skill.id)}
                        >
                          Löschen
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              className="btn btn-secondary"
              onClick={exportSkills}
            >
              Fähigkeiten exportieren
            </button>
          </div>
        </div>
        
        <div>
          <div className="card card-accent">
            <h2 className="text-2xl font-semibold mb-4">Neue Fähigkeit erstellen</h2>
            
            <form onSubmit={handleNewSkillSubmit}>
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={newSkill.name}
                  onChange={handleNewSkillChange}
                  placeholder="Name der Fähigkeit"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="category">Kategorie</label>
                <select 
                  id="category" 
                  name="category"
                  value={newSkill.category}
                  onChange={handleNewSkillChange}
                >
                  <option value="Produktivität">Produktivität</option>
                  <option value="Wohlbefinden">Wohlbefinden</option>
                  <option value="Technologie">Technologie</option>
                  <option value="Kreativität">Kreativität</option>
                  <option value="Sozial">Sozial</option>
                  <option value="Finanzen">Finanzen</option>
                  <option value="Fitness">Fitness</option>
                  <option value="Ernährung">Ernährung</option>
                  <option value="Bildung">Bildung</option>
                  <option value="Sonstiges">Sonstiges</option>
                </select>
              </div>
              
              <div className="mb-4">
                <label htmlFor="description">Beschreibung</label>
                <textarea 
                  id="description" 
                  name="description"
                  value={newSkill.description}
                  onChange={handleNewSkillChange}
                  placeholder="Beschreibe diese Fähigkeit"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label htmlFor="currentLevel">Aktuelles Level</label>
                <select 
                  id="currentLevel" 
                  name="currentLevel"
                  value={newSkill.currentLevel}
                  onChange={handleNewSkillChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
              
              <button type="submit" className="btn btn-primary w-full">
                Fähigkeit erstellen
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
