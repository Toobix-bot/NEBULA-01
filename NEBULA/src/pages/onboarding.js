import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PrivacyNotice, LoadingIndicator, Badge, ProgressBar } from '../components/UIComponents';
import localStorageUtil from '../lib/localStorageUtil';

const Onboarding = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    name: '',
    interests: [],
    goals: [],
    initialSkills: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const interestOptions = [
    'Produktivität', 'Wohlbefinden', 'Technologie', 'Kreativität', 
    'Sozial', 'Finanzen', 'Fitness', 'Ernährung', 'Bildung', 'Achtsamkeit'
  ];
  
  const predefinedSkills = [
    { name: 'Meditation', category: 'Wohlbefinden', description: 'Die Fähigkeit, den Geist zu beruhigen und im gegenwärtigen Moment zu bleiben.' },
    { name: 'Zeitmanagement', category: 'Produktivität', description: 'Die Fähigkeit, Zeit effektiv zu nutzen und Prioritäten zu setzen.' },
    { name: 'Programmieren', category: 'Technologie', description: 'Die Fähigkeit, Computerprogramme zu schreiben und technische Probleme zu lösen.' },
    { name: 'Kreatives Schreiben', category: 'Kreativität', description: 'Die Fähigkeit, originelle und fesselnde Texte zu verfassen.' },
    { name: 'Netzwerken', category: 'Sozial', description: 'Die Fähigkeit, berufliche und persönliche Beziehungen aufzubauen und zu pflegen.' },
    { name: 'Budgetierung', category: 'Finanzen', description: 'Die Fähigkeit, Einnahmen und Ausgaben zu verwalten und finanzielle Ziele zu erreichen.' },
    { name: 'Krafttraining', category: 'Fitness', description: 'Die Fähigkeit, Muskeln aufzubauen und körperliche Stärke zu entwickeln.' },
    { name: 'Gesunde Ernährung', category: 'Ernährung', description: 'Die Fähigkeit, ausgewogene Mahlzeiten zu planen und zuzubereiten.' },
    { name: 'Fremdsprachen', category: 'Bildung', description: 'Die Fähigkeit, neue Sprachen zu erlernen und zu sprechen.' },
    { name: 'Achtsamkeitspraxis', category: 'Achtsamkeit', description: 'Die Fähigkeit, bewusst im Moment zu leben und Stress zu reduzieren.' }
  ];
  
  const predefinedGoals = [
    'Jeden Tag 30 Minuten meditieren',
    'Eine neue Programmiersprache lernen',
    'Ein Buch pro Monat lesen',
    'Wöchentliches Workout-Programm einhalten',
    'Monatliches Budget erstellen und einhalten',
    'Jeden Tag 10.000 Schritte gehen',
    'Jeden Morgen journaling praktizieren',
    'Eine gesunde Work-Life-Balance etablieren',
    'Neue berufliche Fähigkeiten entwickeln',
    'Soziale Verbindungen stärken'
  ];
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };
  
  const handleInterestToggle = (interest) => {
    const updatedInterests = [...userData.interests];
    if (updatedInterests.includes(interest)) {
      const index = updatedInterests.indexOf(interest);
      updatedInterests.splice(index, 1);
    } else {
      updatedInterests.push(interest);
    }
    setUserData({
      ...userData,
      interests: updatedInterests
    });
  };
  
  const handleAddGoal = () => {
    const goalInput = document.getElementById('goalInput');
    const goal = goalInput.value.trim();
    
    if (goal) {
      setUserData({
        ...userData,
        goals: [...userData.goals, goal]
      });
      goalInput.value = '';
    }
  };
  
  const handleAddPredefinedGoal = (goal) => {
    if (!userData.goals.includes(goal)) {
      setUserData({
        ...userData,
        goals: [...userData.goals, goal]
      });
    }
  };
  
  const handleRemoveGoal = (index) => {
    const updatedGoals = [...userData.goals];
    updatedGoals.splice(index, 1);
    setUserData({
      ...userData,
      goals: updatedGoals
    });
  };
  
  const handleAddInitialSkill = () => {
    const skillNameInput = document.getElementById('skillNameInput');
    const skillCategoryInput = document.getElementById('skillCategoryInput');
    
    const name = skillNameInput.value.trim();
    const category = skillCategoryInput.value;
    
    if (name) {
      setUserData({
        ...userData,
        initialSkills: [...userData.initialSkills, { name, category }]
      });
      skillNameInput.value = '';
    }
  };
  
  const handleAddPredefinedSkill = (skill) => {
    // Prüfen, ob Skill bereits hinzugefügt wurde
    const skillExists = userData.initialSkills.some(s => s.name === skill.name);
    
    if (!skillExists) {
      setUserData({
        ...userData,
        initialSkills: [...userData.initialSkills, skill]
      });
    }
  };
  
  const handleRemoveInitialSkill = (index) => {
    const updatedSkills = [...userData.initialSkills];
    updatedSkills.splice(index, 1);
    setUserData({
      ...userData,
      initialSkills: updatedSkills
    });
  };
  
  const handleNextStep = () => {
    if (step === 1 && !userData.name) {
      alert('Bitte gib deinen Namen ein, um fortzufahren.');
      return;
    }
    
    if (step === 2 && userData.interests.length === 0) {
      alert('Bitte wähle mindestens ein Interesse aus, um fortzufahren.');
      return;
    }
    
    if (step === 3 && userData.goals.length === 0) {
      alert('Bitte füge mindestens ein Ziel hinzu, um fortzufahren.');
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };
  
  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleSubmit = () => {
    setIsSubmitting(true);
    
    // Speichere Benutzerdaten
    localStorageUtil.saveData('nebula_user_data', userData);
    
    // Erstelle initiale Skills basierend auf den Angaben des Nutzers
    const initialSkills = userData.initialSkills.map((skill, index) => ({
      id: `s${index + 1}`,
      name: skill.name,
      category: skill.category,
      description: skill.description || `Deine Fähigkeit in ${skill.name}.`,
      currentLevel: 1,
      maxLevel: 10,
      currentXP: 0,
      nextLevelXP: 100
    }));
    localStorageUtil.saveData('nebula_skills', initialSkills);
    
    // Erstelle initiale Quests basierend auf den Zielen des Nutzers
    const initialQuests = {
      daily: userData.goals.slice(0, 2).map((goal, index) => ({
        id: `d${index + 1}`,
        title: `Arbeite an: ${goal}`,
        description: `Mache heute einen kleinen Schritt in Richtung deines Ziels: ${goal}`,
        difficulty: 'Leicht',
        tags: userData.interests.slice(0, 2),
        deadline: 'Heute',
        estimatedTime: '30 Min',
        xp: 50,
        completed: false
      })),
      weekly: userData.goals.slice(0, 1).map((goal, index) => ({
        id: `w${index + 1}`,
        title: `Wöchentlicher Fortschritt: ${goal}`,
        description: `Mache diese Woche bedeutenden Fortschritt bei deinem Ziel: ${goal}`,
        difficulty: 'Mittel',
        tags: userData.interests.slice(0, 2),
        deadline: 'Diese Woche',
        estimatedTime: '2 Std',
        xp: 150,
        completed: false
      })),
      longterm: [{
        id: 'l1',
        title: 'Meistere deine Nebula Odyssey',
        description: 'Nutze Nebula Odyssey regelmäßig, um deine persönliche Entwicklung zu fördern und deine Ziele zu erreichen.',
        difficulty: 'Mittel',
        tags: ['Persönliches Wachstum', 'Gewohnheitsbildung'],
        deadline: '30 Tage',
        estimatedTime: '10 Std',
        xp: 300,
        completed: false
      }]
    };
    localStorageUtil.saveData('nebula_quests', initialQuests);
    
    // Markiere Onboarding als abgeschlossen
    localStorageUtil.saveData('nebula_onboarding_completed', true);
    
    // Weiterleitung zum Dashboard
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Willkommen bei Nebula Odyssey</h1>
      
      <div className="card max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div 
                key={stepNumber}
                className={`w-1/4 px-1 ${stepNumber < step ? 'text-nebula-purple' : stepNumber === step ? 'text-nebula-blue' : 'text-muted'}`}
              >
                <div 
                  className={`h-2 rounded-full mb-1 ${stepNumber <= step ? 'bg-nebula-purple' : 'bg-gray-200'}`}
                ></div>
                <span className="text-sm">
                  {stepNumber === 1 && 'Persönlich'}
                  {stepNumber === 2 && 'Interessen'}
                  {stepNumber === 3 && 'Ziele'}
                  {stepNumber === 4 && 'Fähigkeiten'}
                </span>
              </div>
            ))}
          </div>
        </div>
        
        {step === 1 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">Wie heißt du?</h2>
            <p className="mb-4">Wir möchten deine Nebula Odyssey personalisieren. Wie dürfen wir dich nennen?</p>
            
            <div className="mb-4">
              <label htmlFor="name">Dein Name</label>
              <input 
                type="text" 
                id="name" 
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                placeholder="Dein Name"
                className="w-full p-2 border rounded-md"
              />
            </div>
            
            <PrivacyNotice>
              Deine Daten werden ausschließlich lokal in deinem Browser gespeichert und sind nur für dich sichtbar.
            </PrivacyNotice>
          </div>
        )}
        
        {step === 2 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">Was interessiert dich?</h2>
            <p className="mb-4">Wähle Bereiche aus, die dich interessieren. Diese helfen uns, relevante Quests und Fähigkeiten für dich zu erstellen.</p>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  className={`interest-button ${userData.interests.includes(interest) ? 'selected' : ''}`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </button>
              ))}
            </div>
            
            <div className="mt-4 p-3 bg-gray-50 rounded-md">
              <h3 className="font-medium mb-2">Ausgewählte Interessen:</h3>
              {userData.interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userData.interests.map((interest) => (
                    <Badge key={interest} type="primary">{interest}</Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted">Noch keine Interessen ausgewählt.</p>
              )}
            </div>
          </div>
        )}
        
        {step === 3 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">Was sind deine Ziele?</h2>
            <p className="mb-4">Füge einige Ziele hinzu, an denen du arbeiten möchtest. Diese werden in Quests umgewandelt.</p>
            
            <div className="mb-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  id="goalInput" 
                  placeholder="Neues Ziel eingeben"
                  className="flex-1 p-2 border rounded-md"
                />
                <button 
                  className="btn btn-primary"
                  onClick={handleAddGoal}
                >
                  Hinzufügen
                </button>
              </div>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Vorschläge:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {predefinedGoals.map((goal) => (
                  <button
                    key={goal}
                    className={`p-2 text-left rounded-md border ${userData.goals.includes(goal) ? 'bg-gray-100 border-nebula-purple' : 'bg-white'}`}
                    onClick={() => handleAddPredefinedGoal(goal)}
                    disabled={userData.goals.includes(goal)}
                  >
                    {goal}
                    {userData.goals.includes(goal) && <span className="ml-2 text-nebula-purple">✓</span>}
                  </button>
                ))}
              </div>
            </div>
            
            {userData.goals.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Deine Ziele:</h3>
                <ul className="space-y-2">
                  {userData.goals.map((goal, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <span>{goal}</span>
                      <button 
                        className="text-danger"
                        onClick={() => handleRemoveGoal(index)}
                      >
                        Entfernen
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        {step === 4 && (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">Mit welchen Fähigkeiten möchtest du beginnen?</h2>
            <p className="mb-4">Füge einige Fähigkeiten hinzu, die du entwickeln oder verbessern möchtest.</p>
            
            <div className="mb-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <input 
                    type="text" 
                    id="skillNameInput" 
                    placeholder="Name der Fähigkeit"
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <select 
                    id="skillCategoryInput"
                    className="w-full p-2 border rounded-md"
                  >
                    {interestOptions.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                className="btn btn-primary w-full mt-2"
                onClick={handleAddInitialSkill}
              >
                Eigene Fähigkeit hinzufügen
              </button>
            </div>
            
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-2">Vorgeschlagene Fähigkeiten:</h3>
              <div className="grid grid-cols-1 gap-2">
                {predefinedSkills
                  .filter(skill => userData.interests.includes(skill.category))
                  .map((skill, index) => (
                    <button
                      key={index}
                      className={`p-2 text-left rounded-md border ${userData.initialSkills.some(s => s.name === skill.name) ? 'bg-gray-100 border-nebula-purple' : 'bg-white'}`}
                      onClick={() => handleAddPredefinedSkill(skill)}
                      disabled={userData.initialSkills.some(s => s.name === skill.name)}
                    >
                      <div className="flex justify-between">
                        <div>
                          <span className="font-medium">{skill.name}</span>
                          <Badge type="secondary" className="ml-2">{skill.category}</Badge>
                        </div>
                        {userData.initialSkills.some(s => s.name === skill.name) && (
                          <span className="text-nebula-purple">✓</span>
                        )}
                      </div>
                      <p className="text-sm text-muted mt-1">{skill.description}</p>
                    </button>
                  ))}
              </div>
            </div>
            
            {userData.initialSkills.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Deine ausgewählten Fähigkeiten:</h3>
                <ul className="space-y-2">
                  {userData.initialSkills.map((skill, index) => (
                    <li key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                      <div>
                        <span className="font-medium">{skill.name}</span>
                        <Badge type="secondary" className="ml-2">{skill.category}</Badge>
                      </div>
                      <button 
                        className="text-danger"
                        onClick={() => handleRemoveInitialSkill(index)}
                      >
                        Entfernen
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
        
        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <button 
              className="btn btn-secondary"
              onClick={handlePreviousStep}
            >
              Zurück
            </button>
          ) : (
            <div></div>
          )}
          
          <button 
            className="btn btn-primary"
            onClick={handleNextStep}
            disabled={isSubmitting}
          >
            {step < 4 ? 'Weiter' : 'Starte deine Odyssee'}
          </button>
        </div>
        
        {isSubmitting && (
          <div className="mt-4">
            <LoadingIndicator isLoading={true} text="Deine Nebula Odyssey wird vorbereitet..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
