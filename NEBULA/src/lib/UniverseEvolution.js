// Universum-Evolution-Konzept
import localStorageUtil from './localStorageUtil';

// Universum-Stufen und ihre Eigenschaften
export const universeStages = [
  {
    id: 1,
    name: "Nebel der Möglichkeiten",
    description: "Dein Universum beginnt als diffuser Nebel voller Potenzial. Die Sterne und Planeten sind noch nicht vollständig geformt, aber die Grundlagen deiner Reise nehmen Gestalt an.",
    requiredXP: 0,
    visualElements: {
      backgroundColor: "linear-gradient(180deg, #0a0a2a 0%, #1a1a4a 100%)",
      starDensity: "low",
      nebulaDensity: "high",
      planetVisibility: "hidden",
      specialEffects: ["subtle nebula clouds", "occasional stardust"]
    },
    unlockedFeatures: ["basic quests", "skill tracking", "simple reflection"]
  },
  {
    id: 2,
    name: "Sterngeburt",
    description: "Die ersten Sterne entzünden sich in deinem Universum. Ihre Energie treibt deine persönliche Entwicklung voran und beleuchtet neue Pfade auf deiner Reise.",
    requiredXP: 1000,
    visualElements: {
      backgroundColor: "linear-gradient(180deg, #0f1a4a 0%, #1f2a6a 100%)",
      starDensity: "medium",
      nebulaDensity: "medium",
      planetVisibility: "faint",
      specialEffects: ["pulsing stars", "energy waves", "stellar formation"]
    },
    unlockedFeatures: ["advanced quests", "skill connections", "guided reflection"]
  },
  {
    id: 3,
    name: "Planetare Formation",
    description: "Planeten bilden sich um die Sterne deines Universums. Jeder Planet repräsentiert einen Bereich deines Lebens, der Form und Struktur annimmt.",
    requiredXP: 5000,
    visualElements: {
      backgroundColor: "linear-gradient(180deg, #1a2a6a 0%, #2a3a8a 100%)",
      starDensity: "medium",
      nebulaDensity: "low",
      planetVisibility: "visible",
      specialEffects: ["orbiting planets", "asteroid belts", "planetary glow"]
    },
    unlockedFeatures: ["planet exploration", "skill specialization", "deep reflection"]
  },
  {
    id: 4,
    name: "Kosmische Harmonie",
    description: "Dein Universum erreicht einen Zustand des Gleichgewichts. Die Planeten, Sterne und Nebel arbeiten in harmonischer Synchronität, ähnlich wie die verschiedenen Aspekte deines Lebens.",
    requiredXP: 15000,
    visualElements: {
      backgroundColor: "linear-gradient(180deg, #2a3a8a 0%, #3a4aaa 100%)",
      starDensity: "high",
      nebulaDensity: "low",
      planetVisibility: "prominent",
      specialEffects: ["harmonic orbits", "interplanetary connections", "cosmic resonance"]
    },
    unlockedFeatures: ["interplanetary travel", "skill mastery", "predictive insights"]
  },
  {
    id: 5,
    name: "Galaktische Expansion",
    description: "Dein Universum expandiert zu einer vollständigen Galaxie. Neue Sternensysteme entstehen, die neue Möglichkeiten und Horizonte für deine persönliche Entwicklung darstellen.",
    requiredXP: 50000,
    visualElements: {
      backgroundColor: "linear-gradient(180deg, #3a4aaa 0%, #4a5acc 100%)",
      starDensity: "very high",
      nebulaDensity: "minimal",
      planetVisibility: "detailed",
      specialEffects: ["galactic spiral", "wormholes", "cosmic events", "supernova"]
    },
    unlockedFeatures: ["galactic challenges", "skill transcendence", "wisdom synthesis"]
  }
];

// Planeten-Typen, die Lebensbereiche repräsentieren
export const planetTypes = [
  {
    id: "productivity",
    name: "Productiva",
    description: "Ein Planet mit effizienten Strukturen und fließenden Energieströmen. Hier werden Fähigkeiten in Produktivität, Organisation und Zeitmanagement entwickelt.",
    color: "#4a9aff",
    associatedCategories: ["Produktivität", "Organisation", "Zeitmanagement"],
    visualElements: {
      terrain: "geometric landscapes",
      atmosphere: "blue energy flows",
      structures: "efficient cities",
      inhabitants: "focused entities"
    }
  },
  {
    id: "wellbeing",
    name: "Serenita",
    description: "Ein ruhiger, harmonischer Planet mit heilenden Gewässern und beruhigenden Landschaften. Hier werden Fähigkeiten in Wohlbefinden, Achtsamkeit und Selbstfürsorge entwickelt.",
    color: "#7a6aff",
    associatedCategories: ["Wohlbefinden", "Achtsamkeit", "Selbstfürsorge"],
    visualElements: {
      terrain: "flowing landscapes",
      atmosphere: "calming auras",
      structures: "meditation temples",
      inhabitants: "peaceful beings"
    }
  },
  {
    id: "creativity",
    name: "Imaginara",
    description: "Ein bunter, sich ständig verändernder Planet voller unerwarteter Formen und Farben. Hier werden Fähigkeiten in Kreativität, Kunst und Innovation entwickelt.",
    color: "#ff6a9a",
    associatedCategories: ["Kreativität", "Kunst", "Innovation"],
    visualElements: {
      terrain: "ever-changing landscapes",
      atmosphere: "colorful auroras",
      structures: "artistic expressions",
      inhabitants: "creative spirits"
    }
  },
  {
    id: "knowledge",
    name: "Sapientia",
    description: "Ein Planet mit riesigen Bibliotheken und Observatorien, die das Universum beobachten. Hier werden Fähigkeiten in Bildung, Wissen und Weisheit entwickelt.",
    color: "#6adfff",
    associatedCategories: ["Bildung", "Wissen", "Lernen"],
    visualElements: {
      terrain: "crystalline structures",
      atmosphere: "thought patterns",
      structures: "vast libraries",
      inhabitants: "scholars and sages"
    }
  },
  {
    id: "social",
    name: "Connectia",
    description: "Ein Planet voller Netzwerke und Verbindungen zwischen verschiedenen Gemeinschaften. Hier werden Fähigkeiten in sozialen Beziehungen, Kommunikation und Empathie entwickelt.",
    color: "#ffaa4a",
    associatedCategories: ["Sozial", "Kommunikation", "Beziehungen"],
    visualElements: {
      terrain: "interconnected islands",
      atmosphere: "communication waves",
      structures: "community hubs",
      inhabitants: "social networks"
    }
  },
  {
    id: "health",
    name: "Vitalica",
    description: "Ein energiegeladener Planet mit dynamischen Landschaften und revitalisierenden Ressourcen. Hier werden Fähigkeiten in Gesundheit, Fitness und Ernährung entwickelt.",
    color: "#4aff7a",
    associatedCategories: ["Gesundheit", "Fitness", "Ernährung"],
    visualElements: {
      terrain: "active landscapes",
      atmosphere: "energizing aura",
      structures: "training grounds",
      inhabitants: "vital beings"
    }
  },
  {
    id: "finance",
    name: "Prosperita",
    description: "Ein Planet mit reichen Ressourcen und ausgeklügelten Handelssystemen. Hier werden Fähigkeiten in Finanzen, Ressourcenmanagement und Wohlstand entwickelt.",
    color: "#ffda4a",
    associatedCategories: ["Finanzen", "Ressourcen", "Wohlstand"],
    visualElements: {
      terrain: "resource-rich landscapes",
      atmosphere: "golden particles",
      structures: "exchange centers",
      inhabitants: "prosperous entities"
    }
  },
  {
    id: "purpose",
    name: "Destinara",
    description: "Ein mysteriöser Planet mit Pfaden, die sich je nach den Entscheidungen des Betrachters verändern. Hier werden Fähigkeiten in Zielsetzung, Sinnfindung und Lebenszweck entwickelt.",
    color: "#b06aff",
    associatedCategories: ["Ziele", "Sinn", "Lebenszweck"],
    visualElements: {
      terrain: "path-filled landscapes",
      atmosphere: "destiny threads",
      structures: "vision temples",
      inhabitants: "purpose guides"
    }
  }
];

// Kosmische Ereignisse, die basierend auf Benutzeraktivitäten auftreten
export const cosmicEvents = [
  {
    id: "skill_mastery",
    name: "Skill-Supernova",
    description: "Eine Supernova leuchtet in deinem Universum auf, als du Meisterschaft in einer Fähigkeit erreichst. Ihre Energie verbreitet sich und stärkt verwandte Fähigkeiten.",
    trigger: "skill_level_10",
    visualEffect: "expanding supernova",
    duration: 7, // Tage
    rewards: {
      xpBoost: 1.5,
      relatedSkillsBoost: true
    }
  },
  {
    id: "quest_streak",
    name: "Meteoritenschauer",
    description: "Ein Meteoritenschauer durchzieht dein Universum, als du eine Reihe von Quests abschließt. Jeder Meteorit bringt wertvolle Ressourcen für deine Reise.",
    trigger: "complete_5_quests_in_row",
    visualEffect: "meteor shower",
    duration: 3, // Tage
    rewards: {
      questXpBoost: 1.25,
      randomSkillBoost: true
    }
  },
  {
    id: "reflection_insight",
    name: "Kosmische Erleuchtung",
    description: "Eine plötzliche Erleuchtung erhellt dein Universum, als du tiefe Einsichten durch Reflexion gewinnst. Das Licht offenbart verborgene Verbindungen zwischen verschiedenen Aspekten deines Lebens.",
    trigger: "deep_reflection_insight",
    visualEffect: "cosmic illumination",
    duration: 5, // Tage
    rewards: {
      insightBoost: true,
      skillConnectionsRevealed: true
    }
  },
  {
    id: "milestone_reached",
    name: "Planetare Ausrichtung",
    description: "Die Planeten deines Universums richten sich aus, als du einen bedeutenden Meilenstein erreichst. Diese seltene Konstellation verstärkt alle deine Bemühungen.",
    trigger: "major_milestone_reached",
    visualEffect: "planetary alignment",
    duration: 7, // Tage
    rewards: {
      allActivitiesXpBoost: 1.2,
      specialQuestUnlocked: true
    }
  },
  {
    id: "consistency_reward",
    name: "Stabiler Raumzeitkorridor",
    description: "Durch deine konsequente Praxis hat sich ein stabiler Korridor in der Raumzeit deines Universums gebildet. Dieser Pfad erleichtert den Fortschritt in allen Bereichen.",
    trigger: "daily_activity_for_7_days",
    visualEffect: "spacetime corridor",
    duration: 7, // Tage
    rewards: {
      progressionSpeedBoost: 1.3,
      consistencyBonusXp: 100
    }
  }
];

// Berechne den aktuellen Universum-Status basierend auf Benutzerfortschritt
export const calculateUniverseStatus = () => {
  // Lade Benutzerfortschritt
  const FeatureIntegration = require('./FeatureIntegration').default;
  const totalProgress = FeatureIntegration.calculateTotalProgress();
  
  // Bestimme aktuelle Universum-Stufe
  const currentStage = universeStages.filter(stage => totalProgress.xp >= stage.requiredXP)
    .sort((a, b) => b.requiredXP - a.requiredXP)[0];
  
  // Berechne Fortschritt zur nächsten Stufe
  const currentStageIndex = universeStages.findIndex(stage => stage.id === currentStage.id);
  const nextStage = currentStageIndex < universeStages.length - 1 ? universeStages[currentStageIndex + 1] : null;
  
  let progressToNextStage = 100;
  if (nextStage) {
    const xpForCurrentStage = totalProgress.xp - currentStage.requiredXP;
    const xpRequiredForNextStage = nextStage.requiredXP - currentStage.requiredXP;
    progressToNextStage = Math.min(100, Math.floor((xpForCurrentStage / xpRequiredForNextStage) * 100));
  }
  
  // Bestimme aktive Planeten basierend auf Fähigkeitskategorien
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const activeCategories = [...new Set(skills.map(skill => skill.category))];
  
  const activePlanets = planetTypes.filter(planet => 
    planet.associatedCategories.some(category => activeCategories.includes(category))
  );
  
  // Bestimme aktive kosmische Ereignisse
  const activeEvents = determineActiveCosmicEvents();
  
  return {
    currentStage,
    progressToNextStage,
    nextStage,
    activePlanets,
    activeEvents,
    totalXP: totalProgress.xp,
    universeLevel: totalProgress.level
  };
};

// Bestimme aktive kosmische Ereignisse basierend auf Benutzeraktivitäten
const determineActiveCosmicEvents = () => {
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  const reflections = localStorageUtil.loadData('nebula_reflections', []);
  const activeEvents = localStorageUtil.loadData('nebula_active_events', []);
  
  const newEvents = [];
  
  // Prüfe auf Skill-Meisterschaft (Level 10)
  const masteredSkills = skills.filter(skill => skill.currentLevel >= 10 && skill.eventTriggered !== true);
  if (masteredSkills.length > 0) {
    newEvents.push({
      ...cosmicEvents.find(event => event.id === "skill_mastery"),
      relatedSkill: masteredSkills[0].name,
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 Tage
    });
    
    // Markiere Skill als Event-auslösend
    const updatedSkills = skills.map(skill => {
      if (skill.id === masteredSkills[0].id) {
        return { ...skill, eventTriggered: true };
      }
      return skill;
    });
    localStorageUtil.saveData('nebula_skills', updatedSkills);
  }
  
  // Prüfe auf Quest-Streak (5 in Folge)
  const completedQuests = [
    ...(quests.daily || []).filter(q => q.completed),
    ...(quests.weekly || []).filter(q => q.completed),
    ...(quests.longterm || []).filter(q => q.completed)
  ].sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate));
  
  if (completedQuests.length >= 5) {
    // Prüfe, ob die letzten 5 abgeschlossenen Quests innerhalb von 5 Tagen liegen
    const oldestOfFive = new Date(completedQuests[4].completedDate);
    const now = new Date();
    const daysDifference = (now - oldestOfFive) / (1000 * 60 * 60 * 24);
    
    if (daysDifference <= 5 && !localStorageUtil.loadData('nebula_quest_streak_triggered', false)) {
      newEvents.push({
        ...cosmicEvents.find(event => event.id === "quest_streak"),
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString() // 3 Tage
      });
      
      localStorageUtil.saveData('nebula_quest_streak_triggered', true);
      
      // Reset nach 7 Tagen
      setTimeout(() => {
        localStorageUtil.saveData('nebula_quest_streak_triggered', false);
      }, 7 * 24 * 60 * 60 * 1000);
    }
  }
  
  // Prüfe auf tägliche Aktivität für 7 Tage
  const activityDates = [
    ...completedQuests.map(q => new Date(q.completedDate).toDateString()),
    ...reflections.map(r => new Date(r.date).toDateString())
  ];
  
  const uniqueDates = [...new Set(activityDates)].sort((a, b) => new Date(b) - new Date(a));
  
  if (uniqueDates.length >= 7) {
    // Prüfe, ob die letzten 7 Tage aufeinanderfolgende Aktivität hatten
    let consecutiveDays = 1;
    for (let i = 1; i < uniqueDates.length; i++) {
      const current = new Date(uniqueDates[i]);
      const previous = new Date(uniqueDates[i-1]);
      const dayDifference = (previous - current) / (1000 * 60 * 60 * 24);
      
      if (dayDifference === 1) {
        consecutiveDays++;
      } else {
        break;
      }
    }
    
    if (consecutiveDays >= 7 && !localStorageUtil.loadData('nebula_consistency_triggered', false)) {
      newEvents.push({
        ...cosmicEvents.find(event => event.id === "consistency_reward"),
        startDate: new Date().toISOString(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString() // 7 Tage
      });
      
      localStorageUtil.saveData('nebula_consistency_triggered', true);
      
      // Reset nach 14 Tagen
      setTimeout(() => {
        localStorageUtil.saveData('nebula_consistency_triggered', false);
      }, 14 * 24 * 60 * 60 * 1000);
    }
  }
  
  // Entferne abgelaufene Ereignisse
  const now = new Date();
  const currentEvents = activeEvents.filter(event => new Date(event.endDate) > now);
  
  // Kombiniere aktuelle und neue Ereignisse
  const updatedEvents = [...currentEvents, ...newEvents];
  localStorageUtil.saveData('nebula_active_events', updatedEvents);
  
  return updatedEvents;
};

// Generiere Universum-Visualisierung basierend auf aktuellem Status
export const generateUniverseVisualization = (universeStatus) => {
  if (!universeStatus) {
    universeStatus = calculateUniverseStatus();
  }
  
  const { currentStage, activePlanets, activeEvents } = universeStatus;
  
  // Generiere Visualisierungsdaten für Frontend
  return {
    background: currentStage.visualElements.backgroundColor,
    starDensity: currentStage.visualElements.starDensity,
    nebulaDensity: currentStage.visualElements.nebulaDensity,
    planetVisibility: currentStage.visualElements.planetVisibility,
    specialEffects: currentStage.visualElements.specialEffects,
    planets: activePlanets.map(planet => ({
      id: planet.id,
      name: planet.name,
      color: planet.color,
      size: calculatePlanetSize(planet.id),
      position: calculatePlanetPosition(planet.id, activePlanets.length),
      orbit: calculatePlanetOrbit(planet.id)
    })),
    events: activeEvents.map(event => ({
      id: event.id,
      name: event.name,
      visualEffect: event.visualEffect,
      position: calculateEventPosition(event.id)
    }))
  };
};

// Hilfsfunktionen für Visualisierung
const calculatePlanetSize = (planetId) => {
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const planet = planetTypes.find(p => p.id === planetId);
  
  if (!planet) return 1;
  
  // Finde Skills, die mit diesem Planeten assoziiert sind
  const relatedSkills = skills.filter(skill => 
    planet.associatedCategories.includes(skill.category)
  );
  
  if (relatedSkills.length === 0) return 1;
  
  // Berechne durchschnittliches Skill-Level
  const avgLevel = relatedSkills.reduce((sum, skill) => sum + skill.currentLevel, 0) / relatedSkills.length;
  
  // Skaliere Planetengröße basierend auf durchschnittlichem Skill-Level (1-3)
  return 1 + Math.min(2, avgLevel / 5);
};

const calculatePlanetPosition = (planetId, totalPlanets) => {
  // Positioniere Planeten in einem Kreis um das Zentrum
  const index = planetTypes.findIndex(p => p.id === planetId);
  const angle = (index / totalPlanets) * 2 * Math.PI;
  
  // Radius variiert leicht für visuelles Interesse
  const radius = 40 + (index % 3) * 10;
  
  return {
    x: 50 + Math.cos(angle) * radius,
    y: 50 + Math.sin(angle) * radius
  };
};

const calculatePlanetOrbit = (planetId) => {
  // Generiere Orbit-Parameter für Animation
  const index = planetTypes.findIndex(p => p.id === planetId);
  
  return {
    speed: 0.5 + (index % 5) * 0.1, // Orbit-Geschwindigkeit
    eccentricity: 0.1 + (index % 3) * 0.05, // Orbit-Exzentrizität
    tilt: (index % 6) * 5 // Orbit-Neigung in Grad
  };
};

const calculateEventPosition = (eventId) => {
  // Positioniere Ereignisse zufällig im Universum
  const index = cosmicEvents.findIndex(e => e.id === eventId);
  
  return {
    x: 20 + (index % 3) * 30,
    y: 20 + Math.floor(index / 3) * 30
  };
};

export default {
  universeStages,
  planetTypes,
  cosmicEvents,
  calculateUniverseStatus,
  generateUniverseVisualization
};
