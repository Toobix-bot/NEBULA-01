// Erweiterte Integration zwischen Features
import localStorageUtil from './localStorageUtil';

// Belohnungssystem, das Aktivitäten in allen Bereichen berücksichtigt
export const calculateTotalProgress = () => {
  // Lade Daten aus allen Bereichen
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  const reflections = localStorageUtil.loadData('nebula_reflections', []);
  
  // Berechne Gesamtfortschritt
  const skillProgress = calculateSkillProgress(skills);
  const questProgress = calculateQuestProgress(quests);
  const reflectionProgress = calculateReflectionProgress(reflections);
  
  // Kombiniere zu einem Gesamtwert
  const totalProgress = {
    level: Math.floor((skillProgress.level + questProgress.level + reflectionProgress.level) / 3),
    xp: skillProgress.xp + questProgress.xp + reflectionProgress.xp,
    nextLevelXP: 1000 * Math.pow(1.5, Math.floor((skillProgress.level + questProgress.level + reflectionProgress.level) / 3)),
    skillContribution: skillProgress.xp,
    questContribution: questProgress.xp,
    reflectionContribution: reflectionProgress.xp,
    universeStage: calculateUniverseStage(skillProgress, questProgress, reflectionProgress)
  };
  
  return totalProgress;
};

// Berechne Skill-Fortschritt
const calculateSkillProgress = (skills) => {
  if (!skills || skills.length === 0) {
    return { level: 0, xp: 0 };
  }
  
  let totalXP = 0;
  let averageLevel = 0;
  
  skills.forEach(skill => {
    // XP für jedes Level: 100 * level^2
    let levelXP = 0;
    for (let i = 1; i < skill.currentLevel; i++) {
      levelXP += 100 * Math.pow(i, 2);
    }
    // Aktuelle Level-Fortschritt
    levelXP += skill.currentXP;
    totalXP += levelXP;
    averageLevel += skill.currentLevel;
  });
  
  averageLevel = averageLevel / skills.length;
  
  return {
    level: Math.floor(averageLevel),
    xp: totalXP
  };
};

// Berechne Quest-Fortschritt
const calculateQuestProgress = (quests) => {
  if (!quests) {
    return { level: 0, xp: 0 };
  }
  
  const completedQuests = [
    ...(quests.daily || []).filter(q => q.completed),
    ...(quests.weekly || []).filter(q => q.completed),
    ...(quests.longterm || []).filter(q => q.completed)
  ];
  
  const totalXP = completedQuests.reduce((sum, quest) => sum + quest.xp, 0);
  const questLevel = Math.floor(completedQuests.length / 5) + 1; // Jede 5 abgeschlossenen Quests = 1 Level
  
  return {
    level: questLevel,
    xp: totalXP
  };
};

// Berechne Reflexions-Fortschritt
const calculateReflectionProgress = (reflections) => {
  if (!reflections || reflections.length === 0) {
    return { level: 0, xp: 0 };
  }
  
  const reflectionXP = reflections.length * 50; // 50 XP pro Reflexion
  const reflectionLevel = Math.floor(reflections.length / 7) + 1; // Jede 7 Reflexionen = 1 Level
  
  return {
    level: reflectionLevel,
    xp: reflectionXP
  };
};

// Berechne Universum-Stufe basierend auf Gesamtfortschritt
const calculateUniverseStage = (skillProgress, questProgress, reflectionProgress) => {
  const totalLevel = skillProgress.level + questProgress.level + reflectionProgress.level;
  const totalXP = skillProgress.xp + questProgress.xp + reflectionProgress.xp;
  
  // Universum-Stufen:
  // 1: Anfänger (0-1000 XP)
  // 2: Entdecker (1001-5000 XP)
  // 3: Pionier (5001-15000 XP)
  // 4: Meister (15001-50000 XP)
  // 5: Legende (50001+ XP)
  
  if (totalXP > 50000) return 5;
  if (totalXP > 15000) return 4;
  if (totalXP > 5000) return 3;
  if (totalXP > 1000) return 2;
  return 1;
};

// Verknüpfe Quests mit Skills
export const linkQuestToSkills = (quest, selectedSkills) => {
  const skills = localStorageUtil.loadData('nebula_skills', []);
  
  // Finde die ausgewählten Skills
  const linkedSkills = skills.filter(skill => selectedSkills.includes(skill.id));
  
  // Speichere die Verknüpfung
  const questSkillLinks = localStorageUtil.loadData('nebula_quest_skill_links', {});
  questSkillLinks[quest.id] = selectedSkills;
  localStorageUtil.saveData('nebula_quest_skill_links', questSkillLinks);
  
  return {
    quest,
    linkedSkills
  };
};

// Aktualisiere Skills nach Quest-Abschluss
export const updateSkillsAfterQuestCompletion = (questId) => {
  const questSkillLinks = localStorageUtil.loadData('nebula_quest_skill_links', {});
  const linkedSkillIds = questSkillLinks[questId] || [];
  
  if (linkedSkillIds.length === 0) {
    return false;
  }
  
  const skills = localStorageUtil.loadData('nebula_skills', []);
  let updated = false;
  
  // Aktualisiere verknüpfte Skills
  const updatedSkills = skills.map(skill => {
    if (linkedSkillIds.includes(skill.id)) {
      // Füge XP hinzu (25 XP pro verknüpftem Skill)
      const newXP = skill.currentXP + 25;
      const nextLevelXP = 100 * Math.pow(skill.currentLevel, 2);
      
      // Prüfe auf Level-Up
      if (newXP >= nextLevelXP) {
        updated = true;
        return {
          ...skill,
          currentLevel: skill.currentLevel + 1,
          currentXP: newXP - nextLevelXP,
          nextLevelXP: 100 * Math.pow(skill.currentLevel + 1, 2)
        };
      }
      
      updated = true;
      return {
        ...skill,
        currentXP: newXP
      };
    }
    return skill;
  });
  
  if (updated) {
    localStorageUtil.saveData('nebula_skills', updatedSkills);
  }
  
  return updated;
};

// Generiere Aktivitätslog für alle Bereiche
export const generateActivityLog = () => {
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  const reflections = localStorageUtil.loadData('nebula_reflections', []);
  
  const activities = [];
  
  // Füge abgeschlossene Quests hinzu
  const completedQuests = [
    ...(quests.daily || []).filter(q => q.completed).map(q => ({ ...q, type: 'daily' })),
    ...(quests.weekly || []).filter(q => q.completed).map(q => ({ ...q, type: 'weekly' })),
    ...(quests.longterm || []).filter(q => q.completed).map(q => ({ ...q, type: 'longterm' }))
  ];
  
  completedQuests.forEach(quest => {
    activities.push({
      type: 'quest_completed',
      title: `Quest abgeschlossen: ${quest.title}`,
      xp: quest.xp,
      date: quest.completedDate || new Date().toISOString(),
      category: 'quest'
    });
  });
  
  // Füge Skill-Level-Ups hinzu
  skills.forEach(skill => {
    if (skill.currentLevel > 1) {
      activities.push({
        type: 'skill_levelup',
        title: `Skill Level-Up: ${skill.name} erreicht Level ${skill.currentLevel}`,
        xp: 100 * Math.pow(skill.currentLevel - 1, 2),
        date: skill.lastLevelUpDate || new Date().toISOString(),
        category: 'skill'
      });
    }
  });
  
  // Füge Reflexionen hinzu
  reflections.forEach(reflection => {
    activities.push({
      type: 'reflection_added',
      title: `Reflexion: ${reflection.title || 'Tägliche Reflexion'}`,
      xp: 50,
      date: reflection.date,
      category: 'reflection'
    });
  });
  
  // Sortiere nach Datum (neueste zuerst)
  return activities.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// Generiere Empfehlungen basierend auf Aktivitäten in allen Bereichen
export const generateRecommendations = () => {
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  const reflections = localStorageUtil.loadData('nebula_reflections', []);
  const userData = localStorageUtil.loadData('nebula_user_data', {});
  
  const recommendations = [];
  
  // Empfehle Skills basierend auf Interessen
  if (userData.interests && userData.interests.length > 0) {
    const userInterests = userData.interests;
    const skillCategories = skills.map(skill => skill.category);
    
    // Finde Interessen ohne Skills
    userInterests.forEach(interest => {
      if (!skillCategories.includes(interest)) {
        recommendations.push({
          type: 'new_skill',
          title: `Neuen Skill in "${interest}" erstellen`,
          description: `Du hast Interesse an ${interest}, aber noch keinen Skill in diesem Bereich. Erstelle einen neuen Skill, um deinen Fortschritt zu verfolgen.`,
          action: 'create_skill',
          category: interest
        });
      }
    });
  }
  
  // Empfehle Quests für vernachlässigte Skills
  const neglectedSkills = skills.filter(skill => {
    // Skills, die seit mehr als 7 Tagen nicht verbessert wurden
    const lastUpdate = new Date(skill.lastUpdateDate || 0);
    const daysSinceUpdate = (new Date() - lastUpdate) / (1000 * 60 * 60 * 24);
    return daysSinceUpdate > 7;
  });
  
  neglectedSkills.forEach(skill => {
    recommendations.push({
      type: 'neglected_skill',
      title: `Arbeite an "${skill.name}"`,
      description: `Du hast seit einiger Zeit nicht mehr an deinem Skill "${skill.name}" gearbeitet. Erstelle eine neue Quest, um daran zu arbeiten.`,
      action: 'create_quest',
      skillId: skill.id
    });
  });
  
  // Empfehle Reflexion, wenn keine kürzlich durchgeführt wurde
  if (reflections.length === 0 || new Date() - new Date(reflections[0].date) > 1000 * 60 * 60 * 24 * 3) {
    recommendations.push({
      type: 'reflection_needed',
      title: 'Zeit für eine Reflexion',
      description: 'Du hast seit einiger Zeit keine Reflexion durchgeführt. Nimm dir einen Moment Zeit, um über deinen Fortschritt nachzudenken.',
      action: 'create_reflection'
    });
  }
  
  return recommendations;
};

export default {
  calculateTotalProgress,
  linkQuestToSkills,
  updateSkillsAfterQuestCompletion,
  generateActivityLog,
  generateRecommendations
};
