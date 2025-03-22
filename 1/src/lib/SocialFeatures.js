// Soziale Funktionen für Nebula Odyssey
import localStorageUtil from './localStorageUtil';

// Benutzerprofilstruktur
export const userProfileStructure = {
  username: "",
  displayName: "",
  avatar: "",
  bio: "",
  privacySettings: {
    shareProgress: false,
    shareAchievements: false,
    shareQuests: false,
    shareSkills: false,
    shareUniverse: false
  },
  connections: [],
  achievements: [],
  statistics: {
    totalXP: 0,
    skillsCount: 0,
    averageSkillLevel: 0,
    questsCompleted: 0,
    reflectionsCount: 0,
    universeStage: 1
  }
};

// Initialisiere Benutzerprofil
export const initializeUserProfile = (userData) => {
  const existingProfile = localStorageUtil.loadData('nebula_user_profile', null);
  
  if (existingProfile) {
    return existingProfile;
  }
  
  // Erstelle neues Profil basierend auf Onboarding-Daten
  const newProfile = {
    ...userProfileStructure,
    username: userData.name ? userData.name.toLowerCase().replace(/\s+/g, '_') : 'explorer',
    displayName: userData.name || 'Explorer',
    avatar: generateRandomAvatar(),
    statistics: updateUserStatistics()
  };
  
  localStorageUtil.saveData('nebula_user_profile', newProfile);
  return newProfile;
};

// Aktualisiere Benutzerstatistiken
export const updateUserStatistics = () => {
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  const reflections = localStorageUtil.loadData('nebula_reflections', []);
  
  // Berechne Statistiken
  const totalXP = calculateTotalXP(skills, quests);
  const skillsCount = skills.length;
  const averageSkillLevel = skillsCount > 0 
    ? skills.reduce((sum, skill) => sum + skill.currentLevel, 0) / skillsCount 
    : 0;
  
  const questsCompleted = [
    ...(quests.daily || []).filter(q => q.completed),
    ...(quests.weekly || []).filter(q => q.completed),
    ...(quests.longterm || []).filter(q => q.completed)
  ].length;
  
  const reflectionsCount = reflections.length;
  
  // Bestimme Universum-Stufe
  const UniverseEvolution = require('./UniverseEvolution').default;
  const universeStatus = UniverseEvolution.calculateUniverseStatus();
  
  const statistics = {
    totalXP,
    skillsCount,
    averageSkillLevel,
    questsCompleted,
    reflectionsCount,
    universeStage: universeStatus.currentStage.id
  };
  
  // Aktualisiere Profil
  const userProfile = localStorageUtil.loadData('nebula_user_profile', null);
  if (userProfile) {
    const updatedProfile = {
      ...userProfile,
      statistics
    };
    localStorageUtil.saveData('nebula_user_profile', updatedProfile);
  }
  
  return statistics;
};

// Berechne Gesamt-XP
const calculateTotalXP = (skills, quests) => {
  // XP aus Skills
  const skillsXP = skills.reduce((sum, skill) => {
    // XP für jedes Level: 100 * level^2
    let levelXP = 0;
    for (let i = 1; i < skill.currentLevel; i++) {
      levelXP += 100 * Math.pow(i, 2);
    }
    // Aktuelle Level-Fortschritt
    levelXP += skill.currentXP;
    return sum + levelXP;
  }, 0);
  
  // XP aus abgeschlossenen Quests
  const questsXP = [
    ...(quests.daily || []).filter(q => q.completed),
    ...(quests.weekly || []).filter(q => q.completed),
    ...(quests.longterm || []).filter(q => q.completed)
  ].reduce((sum, quest) => sum + quest.xp, 0);
  
  return skillsXP + questsXP;
};

// Generiere zufälligen Avatar
const generateRandomAvatar = () => {
  const colors = ['blue', 'purple', 'pink', 'teal', 'orange', 'green'];
  const shapes = ['circle', 'square', 'triangle', 'hexagon', 'star'];
  
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
  
  return `${randomShape}_${randomColor}`;
};

// Errungenschaften-System
export const achievements = [
  {
    id: "first_quest",
    name: "Erste Schritte",
    description: "Schließe deine erste Quest ab",
    icon: "🚀",
    xpReward: 50,
    condition: (stats) => stats.questsCompleted >= 1
  },
  {
    id: "skill_master",
    name: "Skill-Meister",
    description: "Erreiche Level 5 in einem Skill",
    icon: "🏆",
    xpReward: 100,
    condition: (stats, data) => data.skills.some(skill => skill.currentLevel >= 5)
  },
  {
    id: "reflection_guru",
    name: "Selbstreflexion",
    description: "Führe 5 Reflexionen durch",
    icon: "🧠",
    xpReward: 100,
    condition: (stats) => stats.reflectionsCount >= 5
  },
  {
    id: "quest_streak",
    name: "Auf einer Rolle",
    description: "Schließe 5 Quests in einer Woche ab",
    icon: "🔥",
    xpReward: 150,
    condition: (stats, data) => checkQuestStreak(data.quests, 5, 7)
  },
  {
    id: "universe_explorer",
    name: "Universum-Entdecker",
    description: "Erreiche Universum-Stufe 2",
    icon: "🌌",
    xpReward: 200,
    condition: (stats) => stats.universeStage >= 2
  },
  {
    id: "skill_diversity",
    name: "Vielseitigkeit",
    description: "Entwickle Skills in 3 verschiedenen Kategorien",
    icon: "🌈",
    xpReward: 150,
    condition: (stats, data) => {
      const categories = [...new Set(data.skills.map(skill => skill.category))];
      return categories.length >= 3;
    }
  },
  {
    id: "xp_milestone",
    name: "XP-Meilenstein",
    description: "Sammle insgesamt 1000 XP",
    icon: "💯",
    xpReward: 200,
    condition: (stats) => stats.totalXP >= 1000
  },
  {
    id: "daily_dedication",
    name: "Tägliche Hingabe",
    description: "Sei 7 Tage in Folge aktiv",
    icon: "📅",
    xpReward: 200,
    condition: (stats, data) => checkDailyActivity(data.quests, data.reflections, 7)
  },
  {
    id: "epic_quest",
    name: "Epischer Erfolg",
    description: "Schließe eine epische Quest ab",
    icon: "⚔️",
    xpReward: 300,
    condition: (stats, data) => {
      const allQuests = [
        ...(data.quests.daily || []),
        ...(data.quests.weekly || []),
        ...(data.quests.longterm || [])
      ];
      return allQuests.some(q => q.completed && q.difficulty === "Episch");
    }
  },
  {
    id: "skill_synergy",
    name: "Skill-Synergie",
    description: "Verknüpfe 3 Skills mit einer Quest",
    icon: "🔄",
    xpReward: 150,
    condition: (stats, data) => {
      const questSkillLinks = localStorageUtil.loadData('nebula_quest_skill_links', {});
      return Object.values(questSkillLinks).some(skillIds => skillIds.length >= 3);
    }
  }
];

// Prüfe, ob Benutzer eine bestimmte Anzahl von Quests in einem Zeitraum abgeschlossen hat
const checkQuestStreak = (quests, count, days) => {
  const completedQuests = [
    ...(quests.daily || []).filter(q => q.completed),
    ...(quests.weekly || []).filter(q => q.completed),
    ...(quests.longterm || []).filter(q => q.completed)
  ].sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
  
  if (completedQuests.length < count) return false;
  
  // Prüfe, ob die letzten 'count' abgeschlossenen Quests innerhalb von 'days' Tagen liegen
  const oldestOfCount = new Date(completedQuests[count - 1].completedDate);
  const newest = new Date(completedQuests[0].completedDate);
  const daysDifference = (newest - oldestOfCount) / (1000 * 60 * 60 * 24);
  
  return daysDifference <= days;
};

// Prüfe, ob Benutzer eine bestimmte Anzahl von Tagen in Folge aktiv war
const checkDailyActivity = (quests, reflections, days) => {
  const completedQuests = [
    ...(quests.daily || []).filter(q => q.completed),
    ...(quests.weekly || []).filter(q => q.completed),
    ...(quests.longterm || []).filter(q => q.completed)
  ];
  
  // Sammle alle Aktivitätsdaten
  const activityDates = [
    ...completedQuests.map(q => new Date(q.completedDate).toDateString()),
    ...reflections.map(r => new Date(r.date).toDateString())
  ];
  
  const uniqueDates = [...new Set(activityDates)].sort((a, b) => new Date(b) - new Date(a));
  
  if (uniqueDates.length < days) return false;
  
  // Prüfe auf aufeinanderfolgende Tage
  let consecutiveDays = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const current = new Date(uniqueDates[i]);
    const previous = new Date(uniqueDates[i-1]);
    const dayDifference = (previous - current) / (1000 * 60 * 60 * 24);
    
    if (dayDifference === 1) {
      consecutiveDays++;
      if (consecutiveDays >= days) return true;
    } else {
      consecutiveDays = 1;
    }
  }
  
  return false;
};

// Prüfe und aktualisiere Errungenschaften
export const checkAchievements = () => {
  const userProfile = localStorageUtil.loadData('nebula_user_profile', null);
  if (!userProfile) return [];
  
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  const reflections = localStorageUtil.loadData('nebula_reflections', []);
  
  // Aktualisiere Statistiken
  const statistics = updateUserStatistics();
  
  // Sammle Daten für Errungenschaftsprüfung
  const data = {
    skills,
    quests,
    reflections
  };
  
  // Prüfe jede Errungenschaft
  const newAchievements = [];
  
  achievements.forEach(achievement => {
    // Prüfe, ob Errungenschaft bereits freigeschaltet ist
    if (userProfile.achievements.includes(achievement.id)) return;
    
    // Prüfe Bedingung
    if (achievement.condition(statistics, data)) {
      newAchievements.push(achievement);
      
      // Füge Errungenschaft zum Profil hinzu
      userProfile.achievements.push(achievement.id);
      
      // Füge XP-Belohnung hinzu
      // Hier würde in einer vollständigen Implementierung die XP hinzugefügt werden
    }
  });
  
  // Speichere aktualisiertes Profil
  localStorageUtil.saveData('nebula_user_profile', userProfile);
  
  return newAchievements;
};

// Generiere Rangliste mit simulierten Benutzern
export const generateLeaderboard = () => {
  const userProfile = localStorageUtil.loadData('nebula_user_profile', null);
  if (!userProfile) return [];
  
  // Simulierte Benutzer für Rangliste
  const simulatedUsers = [
    {
      username: "cosmic_explorer",
      displayName: "Cosmic Explorer",
      avatar: "star_blue",
      statistics: {
        totalXP: Math.floor(userProfile.statistics.totalXP * 1.2),
        universeStage: Math.min(5, userProfile.statistics.universeStage + 1)
      }
    },
    {
      username: "stellar_voyager",
      displayName: "Stellar Voyager",
      avatar: "circle_purple",
      statistics: {
        totalXP: Math.floor(userProfile.statistics.totalXP * 0.9),
        universeStage: Math.max(1, userProfile.statistics.universeStage)
      }
    },
    {
      username: "nebula_navigator",
      displayName: "Nebula Navigator",
      avatar: "hexagon_teal",
      statistics: {
        totalXP: Math.floor(userProfile.statistics.totalXP * 0.8),
        universeStage: Math.max(1, userProfile.statistics.universeStage - 1)
      }
    },
    {
      username: "quantum_quester",
      displayName: "Quantum Quester",
      avatar: "triangle_pink",
      statistics: {
        totalXP: Math.floor(userProfile.statistics.totalXP * 0.7),
        universeStage: Math.max(1, userProfile.statistics.universeStage - 1)
      }
    },
    {
      username: "galactic_guardian",
      displayName: "Galactic Guardian",
      avatar: "square_orange",
      statistics: {
        totalXP: Math.floor(userProfile.statistics.totalXP * 1.1),
        universeStage: Math.min(5, userProfile.statistics.universeStage)
      }
    }
  ];
  
  // Kombiniere Benutzerprofil mit simulierten Benutzern
  const leaderboard = [
    {
      username: userProfile.username,
      displayName: userProfile.displayName,
      avatar: userProfile.avatar,
      isCurrentUser: true,
      statistics: {
        totalXP: userProfile.statistics.totalXP,
        universeStage: userProfile.statistics.universeStage
      }
    },
    ...simulatedUsers
  ];
  
  // Sortiere nach XP
  return leaderboard.sort((a, b) => b.statistics.totalXP - a.statistics.totalXP);
};

// Generiere kooperative Herausforderungen
export const generateCooperativeChallenges = () => {
  const userProfile = localStorageUtil.loadData('nebula_user_profile', null);
  if (!userProfile) return [];
  
  // Basis-Herausforderungen
  const baseChallenges = [
    {
      id: "community_quest_completion",
      name: "Gemeinsame Quest-Vollendung",
      description: "Die Community strebt an, gemeinsam 100 Quests abzuschließen. Jede abgeschlossene Quest trägt zum Gesamtfortschritt bei.",
      goal: 100,
      currentProgress: 0,
      reward: "Kosmisches Ereignis: Gemeinschaftliche Erleuchtung",
      category: "Quests"
    },
    {
      id: "skill_mastery_challenge",
      name: "Skill-Meisterschaft-Herausforderung",
      description: "Die Community strebt an, insgesamt 50 Skill-Level-Ups zu erreichen. Jedes Level-Up trägt zum Gesamtfortschritt bei.",
      goal: 50,
      currentProgress: 0,
      reward: "Kosmisches Ereignis: Kollektive Weisheit",
      category: "Skills"
    },
    {
      id: "reflection_insights",
      name: "Gemeinsame Reflexion",
      description: "Die Community strebt an, gemeinsam 30 Reflexionen durchzuführen. Jede Reflexion trägt zum Gesamtfortschritt bei.",
      goal: 30,
      currentProgress: 0,
      reward: "Kosmisches Ereignis: Geteilte Einsichten",
      category: "Reflexion"
    }
  ];
  
  // Simuliere Fortschritt basierend auf Benutzerstatistiken
  const simulatedProgress = (challenge) => {
    switch (challenge.category) {
      case "Quests":
        return Math.min(challenge.goal, Math.floor(userProfile.statistics.questsCompleted * 2.5));
      case "Skills":
        return Math.min(challenge.goal, Math.floor(userProfile.statistics.skillsCount * userProfile.statistics.averageSkillLevel * 0.8));
      case "Reflexion":
        return Math.min(challenge.goal, Math.floor(userProfile.statistics.reflectionsCount * 1.5));
      default:
        return 0;
    }
  };
  
  // Aktualisiere Fortschritt
  return baseChallenges.map(challenge => ({
    ...challenge,
    currentProgress: simulatedProgress(challenge)
  }));
};

// Teile Erfolg (simuliert)
export const shareAchievement = (achievementId) => {
  const userProfile = localStorageUtil.loadData('nebula_user_profile', null);
  if (!userProfile) return { success: false, message: "Benutzerprofil nicht gefunden" };
  
  // Finde Errungenschaft
  const achievement = achievements.find(a => a.id === achievementId);
  if (!achievement) return { success: false, message: "Errungenschaft nicht gefunden" };
  
  // Simuliere Teilen
  return {
    success: true,
    message: `${achievement.name} wurde erfolgreich geteilt!`,
    shareUrl: `https://nebula-odyssey.example.com/share/${userProfile.username}/${achievementId}`,
    likes: Math.floor(Math.random() * 10) + 1
  };
};

export default {
  initializeUserProfile,
  updateUserStatistics,
  checkAchievements,
  generateLeaderboard,
  generateCooperativeChallenges,
  shareAchievement,
  achievements
};
