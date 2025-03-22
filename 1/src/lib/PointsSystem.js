// Licht- und Schattenpunkte-System für NEBULA ODYSSEY
// Implementiert Belohnungs- und Konsequenzmechaniken

import localStorageUtil from './localStorageUtil';

class PointsSystem {
  constructor() {
    // Speicherschlüssel für Punktedaten
    this.POINTS_KEY = 'nebula_points_system';
    
    // Standardwerte für Aktionen
    this.lightActions = [
      { id: 'quest_completed', name: 'Quest abgeschlossen', points: 2 },
      { id: 'daily_reflection', name: 'Tägliche Reflexion durchgeführt', points: 1 },
      { id: 'weekly_reflection', name: 'Wöchentliche Reflexion durchgeführt', points: 3 },
      { id: 'monthly_reflection', name: 'Monatliche Reflexion durchgeführt', points: 5 },
      { id: 'therapeutic_reflection', name: 'Therapeutische Reflexion durchgeführt', points: 4 },
      { id: 'shadow_work', name: 'Schattenarbeit durchgeführt', points: 5 },
      { id: 'cleanse_day', name: 'Cleanse-Tag abgeschlossen', points: 8 },
      { id: 'streak_continued', name: 'Streak fortgesetzt', points: 1 },
      { id: 'milestone_reached', name: 'Meilenstein erreicht', points: 10 },
      { id: 'challenge_overcome', name: 'Herausforderung gemeistert', points: 6 },
      { id: 'growth_opportunity', name: 'Wachstumschance genutzt', points: 4 }
    ];
    
    // Schattenpunkte nur für bewusste, schwerwiegende Regelverstöße
    this.shadowActions = [
      { id: 'conscious_rule_violation', name: 'Bewusster Regelverstoß', points: 3, requiresConfirmation: true },
      { id: 'commitment_broken', name: 'Verbindliches Versprechen gebrochen', points: 4, requiresConfirmation: true },
      { id: 'system_misuse', name: 'Missbrauch des Systems', points: 5, requiresConfirmation: true }
    ];
    
    // Reinigungsquests für Schattenpunkte
    this.cleansingQuests = [
      {
        id: 'cleansing-1',
        title: "Meditation zur Reinigung",
        description: "Führe eine 20-minütige Meditation zur Reinigung und Zentrierung durch.",
        shadowPointsReduction: 2,
        estimatedTime: "20 Min",
        xp: 50
      },
      {
        id: 'cleansing-2',
        title: "Reflexionsschreiben",
        description: "Schreibe eine tiefgehende Reflexion über die verpassten Verpflichtungen und was du daraus lernen kannst.",
        shadowPointsReduction: 3,
        estimatedTime: "30 Min",
        xp: 75
      },
      {
        id: 'cleansing-3',
        title: "Wiedergutmachung",
        description: "Führe eine konkrete Handlung der Wiedergutmachung durch, die mit der verpassten Verpflichtung zusammenhängt.",
        shadowPointsReduction: 4,
        estimatedTime: "Variiert",
        xp: 100
      },
      {
        id: 'cleansing-4',
        title: "Digitaler Detox",
        description: "Führe einen eintägigen digitalen Detox durch, um dich zu zentrieren und neu auszurichten.",
        shadowPointsReduction: 8,
        estimatedTime: "1 Tag",
        xp: 200
      },
      {
        id: 'cleansing-5',
        title: "Vollständige Reinigung",
        description: "Führe ein dreitägiges Reinigungsprogramm durch, das Meditation, Reflexion, körperliche Aktivität und gesunde Ernährung umfasst.",
        shadowPointsReduction: 15,
        estimatedTime: "3 Tage",
        xp: 350
      }
    ];
    
    // Belohnungen für Lichtpunkte
    this.rewards = [
      {
        id: 'reward-1',
        title: "Neuer Avatar-Stil",
        description: "Schalte einen neuen Stil für deinen Avatar frei.",
        lightPointsCost: 20,
        category: "Avatar"
      },
      {
        id: 'reward-2',
        title: "Schiffs-Upgrade",
        description: "Verbessere das Aussehen deines Raumschiffs.",
        lightPointsCost: 30,
        category: "Schiff"
      },
      {
        id: 'reward-3',
        title: "Neue Hintergrundumgebung",
        description: "Schalte eine neue Hintergrundumgebung für dein Dashboard frei.",
        lightPointsCost: 25,
        category: "Umgebung"
      },
      {
        id: 'reward-4',
        title: "Spezial-Quest freischalten",
        description: "Schalte eine besondere Quest frei, die normalerweise nicht verfügbar ist.",
        lightPointsCost: 40,
        category: "Quest"
      },
      {
        id: 'reward-5',
        title: "XP-Boost",
        description: "Erhalte einen 20% XP-Boost für die nächsten 3 Tage.",
        lightPointsCost: 35,
        category: "Boost"
      },
      {
        id: 'reward-6',
        title: "Schatten-Immunität",
        description: "Erhalte eine einmalige Immunität gegen Schattenpunkte.",
        lightPointsCost: 50,
        category: "Immunität"
      }
    ];
    
    // Konsequenzen für zu viele Schattenpunkte
    this.shadowConsequences = [
      {
        threshold: 5,
        title: "Leichte Verdunkelung",
        description: "Dein Avatar zeigt leichte Verdunkelungseffekte. Eine Reinigungsquest wird empfohlen.",
        effect: "visual_darkening_light"
      },
      {
        threshold: 10,
        title: "Mittlere Verdunkelung",
        description: "Dein Avatar und Schiff zeigen deutliche Verdunkelungseffekte. Eine Reinigungsquest wird dringend empfohlen.",
        effect: "visual_darkening_medium"
      },
      {
        threshold: 15,
        title: "Starke Verdunkelung",
        description: "Dein gesamtes Interface ist verdunkelt. Bestimmte Funktionen sind eingeschränkt, bis du Reinigungsquests abschließt.",
        effect: "visual_darkening_heavy"
      },
      {
        threshold: 20,
        title: "Kritische Verdunkelung",
        description: "Dein System ist stark beeinträchtigt. Die meisten Funktionen sind gesperrt, bis du Reinigungsquests abschließt.",
        effect: "functionality_restricted"
      }
    ];
  }

  // Initialisiert oder lädt Punktedaten für einen Benutzer
  initUserPoints(userId) {
    const allData = localStorageUtil.getItem(this.POINTS_KEY) || {};
    
    if (!allData[userId]) {
      allData[userId] = {
        lightPoints: 0,
        shadowPoints: 0,
        history: [],
        rewards: [],
        activeConsequences: []
      };
      
      localStorageUtil.setItem(this.POINTS_KEY, allData);
    }
    
    return allData[userId];
  }

  // Fügt Lichtpunkte hinzu
  addLightPoints(userId, actionId, customAmount = null) {
    const userData = this.getUserPoints(userId);
    
    // Aktion finden
    const action = this.lightActions.find(a => a.id === actionId);
    if (!action && customAmount === null) {
      console.error(`Unbekannte Lichtpunkte-Aktion: ${actionId}`);
      return userData;
    }
    
    // Punkte hinzufügen
    const pointsToAdd = customAmount !== null ? customAmount : action.points;
    userData.lightPoints += pointsToAdd;
    
    // Historien-Eintrag erstellen
    userData.history.push({
      date: new Date().toISOString(),
      type: 'light',
      action: action ? action.name : 'Benutzerdefinierte Aktion',
      points: pointsToAdd,
      balance: userData.lightPoints
    });
    
    // Speichern
    this.saveUserPoints(userId, userData);
    
    return userData;
  }

  // Fügt Schattenpunkte hinzu
  addShadowPoints(userId, actionId, customAmount = null) {
    const userData = this.getUserPoints(userId);
    
    // Aktion finden
    const action = this.shadowActions.find(a => a.id === actionId);
    if (!action && customAmount === null) {
      console.error(`Unbekannte Schattenpunkte-Aktion: ${actionId}`);
      return userData;
    }
    
    // Prüfen, ob Bestätigung erforderlich ist
    if (action && action.requiresConfirmation) {
      // In einer echten Implementierung würde hier ein Dialog angezeigt werden
      console.log(`Bestätigung erforderlich für Schattenpunkte-Aktion: ${action.name}`);
      // Hier könnte ein Flag gesetzt werden, dass auf Bestätigung wartet
    }
    
    // Punkte hinzufügen
    const pointsToAdd = customAmount !== null ? customAmount : action.points;
    userData.shadowPoints += pointsToAdd;
    
    // Historien-Eintrag erstellen
    userData.history.push({
      date: new Date().toISOString(),
      type: 'shadow',
      action: action ? action.name : 'Benutzerdefinierte Aktion',
      points: pointsToAdd,
      balance: userData.shadowPoints,
      // Reflexionsmöglichkeit hinzufügen
      reflectionPrompt: "Was hat zu dieser Situation geführt? Was könntest du beim nächsten Mal anders machen?"
    });
    
    // Konsequenzen aktualisieren
    this.updateConsequences(userId, userData);
    
    // Speichern
    this.saveUserPoints(userId, userData);
    
    return userData;
  }

  // Reduziert Schattenpunkte (z.B. durch Reinigungsquests)
  reduceShadowPoints(userId, amount, reason = "Reinigungsquest") {
    const userData = this.getUserPoints(userId);
    
    // Punkte reduzieren (nicht unter 0)
    const actualReduction = Math.min(userData.shadowPoints, amount);
    userData.shadowPoints -= actualReduction;
    
    // Historien-Eintrag erstellen
    userData.history.push({
      date: new Date().toISOString(),
      type: 'shadow_reduction',
      action: reason,
      points: -actualReduction,
      balance: userData.shadowPoints
    });
    
    // Konsequenzen aktualisieren
    this.updateConsequences(userId, userData);
    
    // Speichern
    this.saveUserPoints(userId, userData);
    
    return userData;
  }

  // Verwendet Lichtpunkte für eine Belohnung
  useLightPointsForReward(userId, rewardId) {
    const userData = this.getUserPoints(userId);
    
    // Belohnung finden
    const reward = this.rewards.find(r => r.id === rewardId);
    if (!reward) {
      console.error(`Unbekannte Belohnung: ${rewardId}`);
      return { success: false, message: "Belohnung nicht gefunden" };
    }
    
    // Prüfen, ob genug Punkte vorhanden sind
    if (userData.lightPoints < reward.lightPointsCost) {
      return { 
        success: false, 
        message: "Nicht genug Lichtpunkte", 
        required: reward.lightPointsCost, 
        available: userData.lightPoints 
      };
    }
    
    // Punkte abziehen
    userData.lightPoints -= reward.lightPointsCost;
    
    // Belohnung zur Historie hinzufügen
    userData.rewards.push({
      date: new Date().toISOString(),
      rewardId: reward.id,
      title: reward.title,
      cost: reward.lightPointsCost
    });
    
    // Historien-Eintrag erstellen
    userData.history.push({
      date: new Date().toISOString(),
      type: 'reward',
      action: `Belohnung: ${reward.title}`,
      points: -reward.lightPointsCost,
      balance: userData.lightPoints
    });
    
    // Speichern
    this.saveUserPoints(userId, userData);
    
    return { 
      success: true, 
      message: `Belohnung "${reward.title}" erfolgreich eingelöst`, 
      reward: reward,
      remainingPoints: userData.lightPoints
    };
  }

  // Aktualisiert die aktiven Konsequenzen basierend auf Schattenpunkten
  updateConsequences(userId, userData) {
    // Alte Konsequenzen löschen
    userData.activeConsequences = [];
    
    // Neue Konsequenzen basierend auf Schwellenwerten hinzufügen
    for (const consequence of this.shadowConsequences) {
      if (userData.shadowPoints >= consequence.threshold) {
        userData.activeConsequences.push({
          date: new Date().toISOString(),
          ...consequence
        });
      }
    }
    
    return userData.activeConsequences;
  }

  // Gibt verfügbare Reinigungsquests basierend auf Schattenpunkten zurück
  getAvailableCleansingQuests(userId) {
    const userData = this.getUserPoints(userId);
    
    // Nur Quests zurückgeben, deren Reduktion nicht größer als die vorhandenen Schattenpunkte ist
    return this.cleansingQuests.filter(quest => quest.shadowPointsReduction <= userData.shadowPoints);
  }

  // Gibt verfügbare Belohnungen basierend auf Lichtpunkten zurück
  getAvailableRewards(userId) {
    const userData = this.getUserPoints(userId);
    
    // Alle Belohnungen mit Verfügbarkeitsstatus zurückgeben
    return this.rewards.map(reward => ({
      ...reward,
      available: userData.lightPoints >= reward.lightPointsCost
    }));
  }

  // Gibt aktive Konsequenzen zurück
  getActiveConsequences(userId) {
    const userData = this.getUserPoints(userId);
    return userData.activeConsequences;
  }

  // Gibt Punktehistorie zurück
  getPointsHistory(userId, limit = 20) {
    const userData = this.getUserPoints(userId);
    return userData.history.slice(-limit);
  }

  // Gibt Belohnungshistorie zurück
  getRewardsHistory(userId) {
    const userData = this.getUserPoints(userId);
    return userData.rewards;
  }

  // Gibt Punktestatistik zurück
  getPointsStats(userId) {
    const userData = this.getUserPoints(userId);
    
    // Berechne Statistiken
    const lightPointsTotal = userData.history
      .filter(h => h.type === 'light')
      .reduce((sum, entry) => sum + entry.points, 0);
      
    const shadowPointsTotal = userData.history
      .filter(h => h.type === 'shadow')
      .reduce((sum, entry) => sum + entry.points, 0);
      
    const shadowPointsReduced = userData.history
      .filter(h => h.type === 'shadow_reduction')
      .reduce((sum, entry) => sum + Math.abs(entry.points), 0);
      
    const rewardsUsed = userData.rewards.length;
    const pointsSpentOnRewards = userData.rewards.reduce((sum, r) => sum + r.cost, 0);
    
    return {
      currentLightPoints: userData.lightPoints,
      currentShadowPoints: userData.shadowPoints,
      lightPointsEarnedTotal: lightPointsTotal,
      shadowPointsReceivedTotal: shadowPointsTotal,
      shadowPointsReducedTotal: shadowPointsReduced,
      rewardsUsedCount: rewardsUsed,
      pointsSpentOnRewards: pointsSpentOnRewards,
      activeConsequencesCount: userData.activeConsequences.length
    };
  }

  // Lädt Punktedaten eines Nutzers
  getUserPoints(userId) {
    return this.initUserPoints(userId);
  }

  // Speichert Punktedaten eines Nutzers
  saveUserPoints(userId, userData) {
    const allData = localStorageUtil.getItem(this.POINTS_KEY) || {};
    allData[userId] = userData;
    localStorageUtil.setItem(this.POINTS_KEY, allData);
  }
}

export default new PointsSystem();
