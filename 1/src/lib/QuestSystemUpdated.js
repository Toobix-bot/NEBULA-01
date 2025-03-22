// Erweitertes Quest-System mit mehr Inhalten und therapeutischen Komponenten
import localStorageUtil from './localStorageUtil';
import therapeuticQuests from './therapeuticQuests';

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
  'Achtsamkeit',
  'Schattenarbeit',
  'Emotionsarbeit',
  'Cleanse',
  'Suchtbewältigung',
  'Schattenprüfung'
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
  // Bestehende Quests aus QuestSystem.js
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
      estimatedTime: "1 Monat",
      xp: 300
    },
    {
      title: "Netzwerk aufbauen",
      description: "Baue systematisch dein berufliches Netzwerk auf und pflege es regelmäßig.",
      difficulty: "Schwer",
      tags: ["Karriere", "Sozial"],
      estimatedTime: "3 Monate",
      xp: 400
    },
    {
      title: "Seitenprojekt starten",
      description: "Starte ein Seitenprojekt, das deine Leidenschaft und deine Fähigkeiten verbindet.",
      difficulty: "Episch",
      tags: ["Karriere", "Kreativität"],
      estimatedTime: "3 Monate",
      xp: 500
    }
  ],
  
  // Neue therapeutische Quests
  shadow: therapeuticQuests.shadow,
  emotional: therapeuticQuests.emotional,
  cleanse: therapeuticQuests.cleanse,
  addiction: therapeuticQuests.addiction,
  shadow_trials: therapeuticQuests.shadow_trials
};

// Licht- und Schattenpunkte-System
export const pointsSystem = {
  // Lichtpunkte-Aktionen
  lightActions: [
    { action: "Quest abgeschlossen", points: 2 },
    { action: "Tägliche Reflexion durchgeführt", points: 1 },
    { action: "Wöchentliche Reflexion durchgeführt", points: 3 },
    { action: "Monatliche Reflexion durchgeführt", points: 5 },
    { action: "Therapeutische Reflexion durchgeführt", points: 4 },
    { action: "Schattenarbeit durchgeführt", points: 5 },
    { action: "Cleanse-Tag abgeschlossen", points: 8 },
    { action: "Streak fortgesetzt", points: 1 },
    { action: "Meilenstein erreicht", points: 10 }
  ],
  
  // Schattenpunkte-Aktionen
  shadowActions: [
    { action: "Tägliche Quest verpasst", points: 1 },
    { action: "Streak gebrochen", points: 2 },
    { action: "Reflexion übersprungen", points: 1 },
    { action: "Wöchentliche Quest verpasst", points: 3 },
    { action: "Langzeit-Quest abgebrochen", points: 5 }
  ],
  
  // Reinigungsquests für Schattenpunkte
  cleansingQuests: [
    {
      title: "Meditation zur Reinigung",
      description: "Führe eine 20-minütige Meditation zur Reinigung und Zentrierung durch.",
      shadowPointsReduction: 2,
      estimatedTime: "20 Min"
    },
    {
      title: "Reflexionsschreiben",
      description: "Schreibe eine tiefgehende Reflexion über die verpassten Verpflichtungen und was du daraus lernen kannst.",
      shadowPointsReduction: 3,
      estimatedTime: "30 Min"
    },
    {
      title: "Wiedergutmachung",
      description: "Führe eine konkrete Handlung der Wiedergutmachung durch, die mit der verpassten Verpflichtung zusammenhängt.",
      shadowPointsReduction: 4,
      estimatedTime: "Variiert"
    },
    {
      title: "Digitaler Detox",
      description: "Führe einen eintägigen digitalen Detox durch, um dich zu zentrieren und neu auszurichten.",
      shadowPointsReduction: 8,
      estimatedTime: "1 Tag"
    },
    {
      title: "Vollständige Reinigung",
      description: "Führe ein dreitägiges Reinigungsprogramm durch, das Meditation, Reflexion, körperliche Aktivität und gesunde Ernährung umfasst.",
      shadowPointsReduction: 15,
      estimatedTime: "3 Tage"
    }
  ]
};

// Funktionen für das Quest-System
export const getQuestsByCategory = (category) => {
  switch(category) {
    case 'daily':
      return predefinedQuests.daily;
    case 'weekly':
      return predefinedQuests.weekly;
    case 'longterm':
      return predefinedQuests.longterm;
    case 'shadow':
      return predefinedQuests.shadow;
    case 'emotional':
      return predefinedQuests.emotional;
    case 'cleanse':
      return predefinedQuests.cleanse;
    case 'addiction':
      return predefinedQuests.addiction;
    case 'shadow_trials':
      return predefinedQuests.shadow_trials;
    default:
      return [];
  }
};

export const getQuestsByTag = (tag) => {
  const allQuests = [
    ...predefinedQuests.daily,
    ...predefinedQuests.weekly,
    ...predefinedQuests.longterm,
    ...predefinedQuests.shadow,
    ...predefinedQuests.emotional,
    ...predefinedQuests.cleanse,
    ...predefinedQuests.addiction,
    ...predefinedQuests.shadow_trials
  ];
  
  return allQuests.filter(quest => quest.tags && quest.tags.includes(tag));
};

export const getQuestsByDifficulty = (difficulty) => {
  const allQuests = [
    ...predefinedQuests.daily,
    ...predefinedQuests.weekly,
    ...predefinedQuests.longterm,
    ...predefinedQuests.shadow,
    ...predefinedQuests.emotional,
    ...predefinedQuests.cleanse,
    ...predefinedQuests.addiction,
    ...predefinedQuests.shadow_trials
  ];
  
  return allQuests.filter(quest => quest.difficulty === difficulty);
};

export const getRandomQuests = (count = 3) => {
  const allQuests = [
    ...predefinedQuests.daily,
    ...predefinedQuests.weekly,
    ...predefinedQuests.longterm,
    ...predefinedQuests.shadow,
    ...predefinedQuests.emotional,
    ...predefinedQuests.cleanse,
    ...predefinedQuests.addiction,
    ...predefinedQuests.shadow_trials
  ];
  
  const shuffled = [...allQuests].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Licht- und Schattenpunkte-Funktionen
export const addLightPoints = (userId, action, amount = null) => {
  const userData = localStorageUtil.getItem(`user_${userId}`) || {};
  const lightPoints = userData.lightPoints || 0;
  
  let pointsToAdd = amount;
  
  if (!pointsToAdd) {
    const actionInfo = pointsSystem.lightActions.find(a => a.action === action);
    pointsToAdd = actionInfo ? actionInfo.points : 1;
  }
  
  userData.lightPoints = lightPoints + pointsToAdd;
  localStorageUtil.setItem(`user_${userId}`, userData);
  
  return userData.lightPoints;
};

export const addShadowPoints = (userId, action, amount = null) => {
  const userData = localStorageUtil.getItem(`user_${userId}`) || {};
  const shadowPoints = userData.shadowPoints || 0;
  
  let pointsToAdd = amount;
  
  if (!pointsToAdd) {
    const actionInfo = pointsSystem.shadowActions.find(a => a.action === action);
    pointsToAdd = actionInfo ? actionInfo.points : 1;
  }
  
  userData.shadowPoints = shadowPoints + pointsToAdd;
  localStorageUtil.setItem(`user_${userId}`, userData);
  
  return userData.shadowPoints;
};

export const reduceShadowPoints = (userId, amount) => {
  const userData = localStorageUtil.getItem(`user_${userId}`) || {};
  const shadowPoints = userData.shadowPoints || 0;
  
  userData.shadowPoints = Math.max(0, shadowPoints - amount);
  localStorageUtil.setItem(`user_${userId}`, userData);
  
  return userData.shadowPoints;
};

export const getCleansingQuests = (shadowPoints) => {
  return pointsSystem.cleansingQuests.filter(quest => quest.shadowPointsReduction <= shadowPoints);
};

export default {
  questCategories,
  difficultyLevels,
  predefinedQuests,
  pointsSystem,
  getQuestsByCategory,
  getQuestsByTag,
  getQuestsByDifficulty,
  getRandomQuests,
  addLightPoints,
  addShadowPoints,
  reduceShadowPoints,
  getCleansingQuests
};
