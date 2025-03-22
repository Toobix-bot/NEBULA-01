// Erweitertes Quest-System mit mehr Inhalten
import localStorageUtil from './localStorageUtil';

// Vordefinierte Quest-Kategorien
export const questCategories = [
  'Produktivität',
  'Wohlbefinden',
  'Technologie',
  'Kreativität',
  'Sozial',
  'Finanzen',
  'Fitness',
  'Ernährung',
  'Bildung',
  'Achtsamkeit'
];

// Vordefinierte Schwierigkeitsgrade
export const difficultyLevels = [
  { id: 'easy', name: 'Leicht', xp: 50 },
  { id: 'medium', name: 'Mittel', xp: 100 },
  { id: 'hard', name: 'Schwer', xp: 200 },
  { id: 'epic', name: 'Episch', xp: 500 }
];

// Große Sammlung vordefinierter Quests
export const predefinedQuests = {
  daily: [
    // Produktivität
    {
      title: "Prioritäten-Liste erstellen",
      description: "Erstelle eine Liste mit deinen Top-3-Prioritäten für heute und arbeite sie systematisch ab.",
      difficulty: "Leicht",
      tags: ["Produktivität", "Organisation"],
      estimatedTime: "15 Min",
      xp: 50
    },
    {
      title: "Pomodoro-Technik anwenden",
      description: "Arbeite 4 Pomodoro-Einheiten (25 Minuten Arbeit, 5 Minuten Pause) an einem wichtigen Projekt.",
      difficulty: "Mittel",
      tags: ["Produktivität", "Zeitmanagement"],
      estimatedTime: "2 Std",
      xp: 100
    },
    {
      title: "Digitales Aufräumen",
      description: "Räume deinen Desktop auf und organisiere deine Dateien in einer logischen Ordnerstruktur.",
      difficulty: "Mittel",
      tags: ["Produktivität", "Organisation"],
      estimatedTime: "30 Min",
      xp: 100
    },
    
    // Wohlbefinden
    {
      title: "Meditation am Morgen",
      description: "Beginne deinen Tag mit einer 10-minütigen Meditation für mehr Klarheit und Fokus.",
      difficulty: "Leicht",
      tags: ["Wohlbefinden", "Achtsamkeit"],
      estimatedTime: "10 Min",
      xp: 50
    },
    {
      title: "Dankbarkeitstagebuch führen",
      description: "Schreibe drei Dinge auf, für die du heute dankbar bist.",
      difficulty: "Leicht",
      tags: ["Wohlbefinden", "Achtsamkeit"],
      estimatedTime: "5 Min",
      xp: 50
    },
    {
      title: "Digital Detox",
      description: "Verbringe mindestens 2 Stunden ohne digitale Geräte und konzentriere dich auf analoge Aktivitäten.",
      difficulty: "Schwer",
      tags: ["Wohlbefinden", "Achtsamkeit"],
      estimatedTime: "2 Std",
      xp: 200
    },
    
    // Fitness
    {
      title: "10.000 Schritte gehen",
      description: "Erreiche heute 10.000 Schritte, um deine körperliche Aktivität zu steigern.",
      difficulty: "Mittel",
      tags: ["Fitness", "Gesundheit"],
      estimatedTime: "Über den Tag verteilt",
      xp: 100
    },
    {
      title: "Kurzes Workout",
      description: "Absolviere ein 15-minütiges Workout mit Körpergewichtsübungen.",
      difficulty: "Leicht",
      tags: ["Fitness", "Gesundheit"],
      estimatedTime: "15 Min",
      xp: 50
    },
    {
      title: "Dehnübungen",
      description: "Führe eine 10-minütige Dehnroutine durch, um deine Flexibilität zu verbessern.",
      difficulty: "Leicht",
      tags: ["Fitness", "Wohlbefinden"],
      estimatedTime: "10 Min",
      xp: 50
    },
    
    // Ernährung
    {
      title: "Gesundes Frühstück",
      description: "Bereite ein ausgewogenes Frühstück mit Proteinen, gesunden Fetten und komplexen Kohlenhydraten zu.",
      difficulty: "Leicht",
      tags: ["Ernährung", "Gesundheit"],
      estimatedTime: "20 Min",
      xp: 50
    },
    {
      title: "Wasserkonsum tracken",
      description: "Trinke mindestens 2 Liter Wasser über den Tag verteilt.",
      difficulty: "Leicht",
      tags: ["Ernährung", "Gesundheit"],
      estimatedTime: "Über den Tag verteilt",
      xp: 50
    },
    {
      title: "Zuckerfreier Tag",
      description: "Verzichte heute auf zugesetzten Zucker in deiner Ernährung.",
      difficulty: "Schwer",
      tags: ["Ernährung", "Gesundheit"],
      estimatedTime: "Ganzer Tag",
      xp: 200
    },
    
    // Bildung
    {
      title: "30 Minuten lesen",
      description: "Lies 30 Minuten in einem Buch, das dein Wissen erweitert.",
      difficulty: "Leicht",
      tags: ["Bildung", "Persönliches Wachstum"],
      estimatedTime: "30 Min",
      xp: 50
    },
    {
      title: "Neues Konzept lernen",
      description: "Recherchiere und lerne ein neues Konzept oder eine neue Fähigkeit, die dich interessiert.",
      difficulty: "Mittel",
      tags: ["Bildung", "Persönliches Wachstum"],
      estimatedTime: "1 Std",
      xp: 100
    },
    {
      title: "Podcast hören",
      description: "Höre einen informativen Podcast zu einem Thema, das dich interessiert.",
      difficulty: "Leicht",
      tags: ["Bildung", "Persönliches Wachstum"],
      estimatedTime: "30 Min",
      xp: 50
    }
  ],
  
  weekly: [
    // Produktivität
    {
      title: "Wochenplanung",
      description: "Plane deine kommende Woche mit klaren Zielen und Prioritäten.",
      difficulty: "Mittel",
      tags: ["Produktivität", "Organisation"],
      estimatedTime: "45 Min",
      xp: 100
    },
    {
      title: "E-Mail-Postfach aufräumen",
      description: "Räume dein E-Mail-Postfach auf und organisiere wichtige E-Mails in Ordnern.",
      difficulty: "Mittel",
      tags: ["Produktivität", "Organisation"],
      estimatedTime: "1 Std",
      xp: 100
    },
    {
      title: "Tiefe Arbeitsphase",
      description: "Reserviere 3 Stunden für tiefe, fokussierte Arbeit an einem wichtigen Projekt ohne Unterbrechungen.",
      difficulty: "Schwer",
      tags: ["Produktivität", "Fokus"],
      estimatedTime: "3 Std",
      xp: 200
    },
    
    // Wohlbefinden
    {
      title: "Wöchentliche Reflexion",
      description: "Reflektiere über die vergangene Woche: Was lief gut, was könnte besser sein, was hast du gelernt?",
      difficulty: "Mittel",
      tags: ["Wohlbefinden", "Persönliches Wachstum"],
      estimatedTime: "30 Min",
      xp: 100
    },
    {
      title: "Natur-Auszeit",
      description: "Verbringe mindestens 2 Stunden in der Natur, um dich zu erholen und neue Energie zu tanken.",
      difficulty: "Mittel",
      tags: ["Wohlbefinden", "Achtsamkeit"],
      estimatedTime: "2 Std",
      xp: 100
    },
    {
      title: "Selbstfürsorge-Tag",
      description: "Widme einen Tag der Woche ganz der Selbstfürsorge mit Aktivitäten, die dir gut tun.",
      difficulty: "Schwer",
      tags: ["Wohlbefinden", "Selbstfürsorge"],
      estimatedTime: "1 Tag",
      xp: 200
    },
    
    // Sozial
    {
      title: "Freunde kontaktieren",
      description: "Nimm dir Zeit, um mit einem Freund oder Familienmitglied zu telefonieren oder dich zu treffen.",
      difficulty: "Leicht",
      tags: ["Sozial", "Beziehungen"],
      estimatedTime: "1 Std",
      xp: 50
    },
    {
      title: "Netzwerken",
      description: "Knüpfe eine neue berufliche Verbindung oder pflege bestehende Kontakte.",
      difficulty: "Mittel",
      tags: ["Sozial", "Karriere"],
      estimatedTime: "1 Std",
      xp: 100
    },
    {
      title: "Gruppenaktivität",
      description: "Nimm an einer Gruppenaktivität teil, sei es ein Kurs, ein Sportteam oder ein Community-Event.",
      difficulty: "Mittel",
      tags: ["Sozial", "Persönliches Wachstum"],
      estimatedTime: "2 Std",
      xp: 100
    },
    
    // Finanzen
    {
      title: "Budgetüberprüfung",
      description: "Überprüfe dein Budget und deine Ausgaben der letzten Woche.",
      difficulty: "Mittel",
      tags: ["Finanzen", "Organisation"],
      estimatedTime: "45 Min",
      xp: 100
    },
    {
      title: "Finanzbildung",
      description: "Lerne etwas Neues über persönliche Finanzen, Investitionen oder Finanzplanung.",
      difficulty: "Mittel",
      tags: ["Finanzen", "Bildung"],
      estimatedTime: "1 Std",
      xp: 100
    },
    {
      title: "Sparziel setzen",
      description: "Setze dir ein konkretes Sparziel und erstelle einen Plan, um es zu erreichen.",
      difficulty: "Schwer",
      tags: ["Finanzen", "Ziele"],
      estimatedTime: "1 Std",
      xp: 200
    }
  ],
  
  longterm: [
    // Persönliches Wachstum
    {
      title: "Neues Hobby beginnen",
      description: "Beginne ein neues Hobby, das dich interessiert und deine Fähigkeiten erweitert.",
      difficulty: "Schwer",
      tags: ["Persönliches Wachstum", "Kreativität"],
      estimatedTime: "1 Monat",
      xp: 300
    },
    {
      title: "Buch lesen",
      description: "Lies ein Buch zu einem Thema, das dich interessiert oder deine Fähigkeiten verbessert.",
      difficulty: "Mittel",
      tags: ["Bildung", "Persönliches Wachstum"],
      estimatedTime: "2 Wochen",
      xp: 200
    },
    {
      title: "Online-Kurs abschließen",
      description: "Schließe einen Online-Kurs ab, der deine beruflichen oder persönlichen Fähigkeiten verbessert.",
      difficulty: "Schwer",
      tags: ["Bildung", "Karriere"],
      estimatedTime: "1 Monat",
      xp: 300
    },
    
    // Gesundheit
    {
      title: "30-Tage-Fitness-Challenge",
      description: "Nimm an einer 30-Tage-Fitness-Challenge teil, um deine körperliche Fitness zu verbessern.",
      difficulty: "Schwer",
      tags: ["Fitness", "Gesundheit"],
      estimatedTime: "30 Tage",
      xp: 300
    },
    {
      title: "Ernährungsumstellung",
      description: "Stelle deine Ernährung für einen Monat um, z.B. mehr pflanzliche Kost oder weniger verarbeitete Lebensmittel.",
      difficulty: "Schwer",
      tags: ["Ernährung", "Gesundheit"],
      estimatedTime: "1 Monat",
      xp: 300
    },
    {
      title: "Meditationsroutine etablieren",
      description: "Etabliere eine regelmäßige Meditationspraxis von mindestens 10 Minuten täglich über 21 Tage.",
      difficulty: "Mittel",
      tags: ["Wohlbefinden", "Achtsamkeit"],
      estimatedTime: "21 Tage",
      xp: 200
    },
    
    // Kreativität
    {
      title: "Kreatives Projekt umsetzen",
      description: "Setze ein kreatives Projekt um, sei es Schreiben, Malen, Musik oder ein anderes kreatives Medium.",
      difficulty: "Schwer",
      tags: ["Kreativität", "Persönliches Wachstum"],
      estimatedTime: "1 Monat",
      xp: 300
    },
    {
      title: "Fotografie-Challenge",
      description: "Mache 30 Tage lang jeden Tag ein Foto zu einem bestimmten Thema oder Konzept.",
      difficulty: "Mittel",
      tags: ["Kreativität", "Kunst"],
      estimatedTime: "30 Tage",
      xp: 200
    },
    {
      title: "Tagebuch führen",
      description: "Führe 30 Tage lang ein Tagebuch, um deine Gedanken und Erfahrungen festzuhalten.",
      difficulty: "Mittel",
      tags: ["Kreativität", "Wohlbefinden"],
      estimatedTime: "30 Tage",
      xp: 200
    },
    
    // Karriere
    {
      title: "Berufliche Fähigkeiten verbessern",
      description: "Identifiziere und verbessere eine wichtige Fähigkeit für deine berufliche Entwicklung.",
      difficulty: "Schwer",
      tags: ["Karriere", "Bildung"],
      estimatedTime: "2 Monate",
      xp: 300
    },
    {
      title: "Netzwerk erweitern",
      description: "Erweitere dein berufliches Netzwerk, indem du an Events teilnimmst oder gezielt neue Kontakte knüpfst.",
      difficulty: "Mittel",
      tags: ["Karriere", "Sozial"],
      estimatedTime: "1 Monat",
      xp: 200
    },
    {
      title: "Portfolio erstellen",
      description: "Erstelle oder aktualisiere dein berufliches Portfolio oder deinen Lebenslauf.",
      difficulty: "Mittel",
      tags: ["Karriere", "Organisation"],
      estimatedTime: "2 Wochen",
      xp: 200
    },
    
    // Epische Quests
    {
      title: "Sprache lernen",
      description: "Lerne die Grundlagen einer neuen Sprache bis zu einem A1-Niveau.",
      difficulty: "Episch",
      tags: ["Bildung", "Persönliches Wachstum"],
      estimatedTime: "6 Monate",
      xp: 500
    },
    {
      title: "Marathon vorbereiten",
      description: "Trainiere für einen Halbmarathon oder Marathon und nimm daran teil.",
      difficulty: "Episch",
      tags: ["Fitness", "Gesundheit"],
      estimatedTime: "6 Monate",
      xp: 500
    },
    {
      title: "Nebenprojekt starten",
      description: "Starte ein Nebenprojekt, sei es ein Blog, ein kleines Business oder ein gemeinnütziges Projekt.",
      difficulty: "Episch",
      tags: ["Kreativität", "Karriere"],
      estimatedTime: "6 Monate",
      xp: 500
    }
  ]
};

// Generiere personalisierte Quests basierend auf Benutzerinteressen und -zielen
export const generatePersonalizedQuests = (userData, existingQuests) => {
  if (!userData || !userData.interests || !userData.goals) {
    return existingQuests;
  }
  
  const interests = userData.interests;
  const goals = userData.goals;
  
  // Filtere vordefinierte Quests basierend auf Benutzerinteressen
  const filteredDaily = predefinedQuests.daily.filter(quest => 
    quest.tags.some(tag => interests.includes(tag))
  );
  
  const filteredWeekly = predefinedQuests.weekly.filter(quest => 
    quest.tags.some(tag => interests.includes(tag))
  );
  
  const filteredLongterm = predefinedQuests.longterm.filter(quest => 
    quest.tags.some(tag => interests.includes(tag))
  );
  
  // Erstelle zielbasierte Quests
  const goalBasedQuests = goals.map((goal, index) => {
    // Wähle zufällig einen Schwierigkeitsgrad
    const difficulties = ["Leicht", "Mittel", "Schwer"];
    const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
    
    // Wähle zufällig ein oder zwei Interessen als Tags
    const randomInterests = interests.sort(() => 0.5 - Math.random()).slice(0, 2);
    
    // Bestimme XP basierend auf Schwierigkeit
    let xp = 50;
    if (randomDifficulty === "Mittel") xp = 100;
    if (randomDifficulty === "Schwer") xp = 200;
    
    return {
      id: `g${index + 1}`,
      title: `Fortschritt: ${goal}`,
      description: `Arbeite an deinem Ziel: ${goal}`,
      difficulty: randomDifficulty,
      tags: randomInterests,
      estimatedTime: "Variiert",
      xp: xp,
      completed: false,
      isPersonalized: true
    };
  });
  
  // Füge IDs zu vordefinierten Quests hinzu
  const dailyWithIds = filteredDaily.map((quest, index) => ({
    ...quest,
    id: `d${index + 1}`,
    completed: false
  }));
  
  const weeklyWithIds = filteredWeekly.map((quest, index) => ({
    ...quest,
    id: `w${index + 1}`,
    completed: false
  }));
  
  const longtermWithIds = filteredLongterm.map((quest, index) => ({
    ...quest,
    id: `l${index + 1}`,
    completed: false
  }));
  
  // Kombiniere bestehende und neue Quests
  const combinedQuests = {
    daily: [...(existingQuests.daily || []), ...dailyWithIds.slice(0, 5)],
    weekly: [...(existingQuests.weekly || []), ...weeklyWithIds.slice(0, 3)],
    longterm: [...(existingQuests.longterm || []), ...longtermWithIds.slice(0, 2), ...goalBasedQuests]
  };
  
  return combinedQuests;
};

// Generiere Quest-Vorschläge basierend auf Benutzeraktivitäten
export const generateQuestSuggestions = (userData, completedQuests) => {
  if (!userData || !userData.interests) {
    return [];
  }
  
  const interests = userData.interests;
  
  // Finde Quests, die der Benutzer noch nicht abgeschlossen hat
  const allPredefinedQuests = [
    ...predefinedQuests.daily,
    ...predefinedQuests.weekly,
    ...predefinedQuests.longterm
  ];
  
  // Filtere nach Interessen und noch nicht abgeschlossenen Quests
  const suggestedQuests = allPredefinedQuests
    .filter(quest => 
      quest.tags.some(tag => interests.includes(tag)) &&
      !completedQuests.some(cq => cq.title === quest.title)
    )
    .slice(0, 5); // Begrenze auf 5 Vorschläge
  
  return suggestedQuests;
};

// Markiere Quest als abgeschlossen und aktualisiere XP
export const completeQuest = (questId, questType) => {
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  
  // Finde die Quest
  const questTypeArray = quests[questType] || [];
  const questIndex = questTypeArray.findIndex(q => q.id === questId);
  
  if (questIndex === -1) {
    return { success: false, message: "Quest nicht gefunden" };
  }
  
  // Markiere als abgeschlossen
  const updatedQuests = {
    ...quests,
    [questType]: [
      ...questTypeArray.slice(0, questIndex),
      {
        ...questTypeArray[questIndex],
        completed: true,
        completedDate: new Date().toISOString()
      },
      ...questTypeArray.slice(questIndex + 1)
    ]
  };
  
  // Speichere aktualisierte Quests
  localStorageUtil.saveData('nebula_quests', updatedQuests);
  
  // Aktualisiere verknüpfte Skills
  const FeatureIntegration = require('./FeatureIntegration').default;
  FeatureIntegration.updateSkillsAfterQuestCompletion(questId);
  
  return { 
    success: true, 
    message: "Quest erfolgreich abgeschlossen", 
    xp: questTypeArray[questIndex].xp 
  };
};

export default {
  questCategories,
  difficultyLevels,
  predefinedQuests,
  generatePersonalizedQuests,
  generateQuestSuggestions,
  completeQuest
};
