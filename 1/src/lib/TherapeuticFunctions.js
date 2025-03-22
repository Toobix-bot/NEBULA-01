// Therapeutische Funktionen für NEBULA ODYSSEY
// Fokus auf Emotionsarbeit, Schattenarbeit, Cleanse-Tage und Suchtreflexion

import localStorageUtil from './localStorageUtil';
import OpenAIService from './OpenAIService';

class TherapeuticFunctions {
  constructor() {
    // Speicherschlüssel für therapeutische Daten
    this.SHADOW_WORK_KEY = 'nebula_shadow_work';
    this.EMOTION_WORK_KEY = 'nebula_emotion_work';
    this.CLEANSE_DAYS_KEY = 'nebula_cleanse_days';
    this.ADDICTION_REFLECTION_KEY = 'nebula_addiction_reflection';
  }

  // ========== EMOTIONSARBEIT ==========

  // Speichert eine Emotionsreflexion
  saveEmotionReflection(userId, emotionData) {
    const { emotion, intensity, trigger, bodyLocation, thoughts, response } = emotionData;
    
    // Bestehende Daten laden
    const userData = this.getUserEmotionData(userId);
    
    // Neue Reflexion erstellen
    const newReflection = {
      id: `emotion-${Date.now()}`,
      date: new Date().toISOString(),
      emotion,
      intensity,
      trigger,
      bodyLocation,
      thoughts,
      response,
      insights: []
    };
    
    // Zu Nutzerdaten hinzufügen
    userData.reflections.push(newReflection);
    
    // Speichern
    this.saveUserEmotionData(userId, userData);
    
    return newReflection;
  }

  // Fügt eine Erkenntnis zu einer Emotionsreflexion hinzu
  addEmotionInsight(userId, reflectionId, insight) {
    const userData = this.getUserEmotionData(userId);
    
    const reflection = userData.reflections.find(r => r.id === reflectionId);
    if (reflection) {
      reflection.insights.push({
        date: new Date().toISOString(),
        text: insight
      });
      
      this.saveUserEmotionData(userId, userData);
      return reflection;
    }
    
    return null;
  }

  // Analysiert Emotionsmuster über Zeit
  async analyzeEmotionPatterns(userId) {
    const userData = this.getUserEmotionData(userId);
    
    if (userData.reflections.length < 3) {
      return {
        commonEmotions: [],
        commonTriggers: [],
        patterns: [],
        recommendations: []
      };
    }
    
    // Lokale Analyse für häufige Emotionen und Trigger
    const emotions = {};
    const triggers = {};
    
    userData.reflections.forEach(r => {
      // Emotionen zählen
      emotions[r.emotion] = (emotions[r.emotion] || 0) + 1;
      
      // Trigger zählen
      if (r.trigger) {
        triggers[r.trigger] = (triggers[r.trigger] || 0) + 1;
      }
    });
    
    // In Arrays umwandeln und sortieren
    const commonEmotions = Object.entries(emotions)
      .map(([emotion, count]) => ({ emotion, count }))
      .sort((a, b) => b.count - a.count);
      
    const commonTriggers = Object.entries(triggers)
      .map(([trigger, count]) => ({ trigger, count }))
      .sort((a, b) => b.count - a.count);
    
    // Für tiefere Muster und Empfehlungen OpenAI verwenden
    try {
      const lastReflections = userData.reflections.slice(-10);
      
      const messages = [
        { 
          role: 'system', 
          content: 'Du bist ein Experte für emotionale Intelligenz und Musteranalyse im NEBULA ODYSSEY-System.'
        },
        {
          role: 'user',
          content: `Analysiere die folgenden Emotionsreflexionen eines Nutzers und identifiziere Muster, Zusammenhänge und gib Empfehlungen:
          
          ${JSON.stringify(lastReflections, null, 2)}
          
          Häufigste Emotionen: ${commonEmotions.slice(0, 3).map(e => e.emotion).join(', ')}
          Häufigste Trigger: ${commonTriggers.slice(0, 3).map(t => t.trigger).join(', ')}
          
          Formatiere die Antwort als JSON mit den Feldern: patterns (Array von Mustern), recommendations (Array von Empfehlungen).`
        }
      ];
      
      const options = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        callType: 'emotion_analysis'
      };
      
      const content = await OpenAIService.generateChatCompletion(userId, messages, options);
      
      try {
        const result = JSON.parse(content);
        return {
          commonEmotions: commonEmotions.slice(0, 5),
          commonTriggers: commonTriggers.slice(0, 5),
          patterns: result.patterns || [],
          recommendations: result.recommendations || []
        };
      } catch (e) {
        console.error('Error parsing OpenAI response:', e);
      }
    } catch (error) {
      console.error('Error analyzing emotion patterns:', error);
    }
    
    // Fallback
    return {
      commonEmotions: commonEmotions.slice(0, 5),
      commonTriggers: commonTriggers.slice(0, 5),
      patterns: [
        "Du scheinst häufig auf ähnliche Situationen mit den gleichen Emotionen zu reagieren.",
        "Es gibt eine Verbindung zwischen deiner Intensität von Emotionen und bestimmten Gedankenmustern."
      ],
      recommendations: [
        "Versuche, achtsamer auf frühe Anzeichen von intensiven Emotionen zu achten.",
        "Entwickle alternative Reaktionen auf häufige Trigger.",
        "Praktiziere regelmäßige Achtsamkeitsübungen, um deine emotionale Selbstwahrnehmung zu verbessern."
      ]
    };
  }

  // Lädt Emotionsdaten eines Nutzers
  getUserEmotionData(userId) {
    const allData = localStorageUtil.getItem(this.EMOTION_WORK_KEY) || {};
    
    if (!allData[userId]) {
      allData[userId] = {
        reflections: [],
        lastAnalysis: null
      };
      
      localStorageUtil.setItem(this.EMOTION_WORK_KEY, allData);
    }
    
    return allData[userId];
  }

  // Speichert Emotionsdaten eines Nutzers
  saveUserEmotionData(userId, userData) {
    const allData = localStorageUtil.getItem(this.EMOTION_WORK_KEY) || {};
    allData[userId] = userData;
    localStorageUtil.setItem(this.EMOTION_WORK_KEY, allData);
  }

  // ========== SCHATTENARBEIT ==========

  // Speichert einen identifizierten Schattenaspekt
  saveShadowAspect(userId, shadowData) {
    const { name, description, triggers, projections, integration } = shadowData;
    
    // Bestehende Daten laden
    const userData = this.getUserShadowData(userId);
    
    // Neuen Schattenaspekt erstellen
    const newShadowAspect = {
      id: `shadow-${Date.now()}`,
      date: new Date().toISOString(),
      name,
      description,
      triggers: triggers || [],
      projections: projections || [],
      integration: integration || "",
      reflections: [],
      integrationProgress: 0
    };
    
    // Zu Nutzerdaten hinzufügen
    userData.aspects.push(newShadowAspect);
    
    // Speichern
    this.saveUserShadowData(userId, userData);
    
    return newShadowAspect;
  }

  // Fügt eine Reflexion zu einem Schattenaspekt hinzu
  addShadowReflection(userId, aspectId, reflection) {
    const userData = this.getUserShadowData(userId);
    
    const aspect = userData.aspects.find(a => a.id === aspectId);
    if (aspect) {
      aspect.reflections.push({
        date: new Date().toISOString(),
        text: reflection
      });
      
      this.saveUserShadowData(userId, userData);
      return aspect;
    }
    
    return null;
  }

  // Aktualisiert den Integrationsfortschritt eines Schattenaspekts
  updateIntegrationProgress(userId, aspectId, progress) {
    const userData = this.getUserShadowData(userId);
    
    const aspect = userData.aspects.find(a => a.id === aspectId);
    if (aspect) {
      aspect.integrationProgress = Math.min(100, Math.max(0, progress));
      
      this.saveUserShadowData(userId, userData);
      return aspect;
    }
    
    return null;
  }

  // Generiert einen Dialog mit einem Schattenaspekt
  async generateShadowDialog(userId, aspectId, userMessage) {
    const userData = this.getUserShadowData(userId);
    const aspect = userData.aspects.find(a => a.id === aspectId);
    
    if (!aspect) {
      return {
        error: "Schattenaspekt nicht gefunden"
      };
    }
    
    try {
      const messages = [
        { 
          role: 'system', 
          content: `Du bist der Schattenaspekt "${aspect.name}" des Nutzers im NEBULA ODYSSEY-System. 
          Deine Beschreibung: ${aspect.description}
          
          Sprich als dieser Schattenaspekt in der ersten Person. Du bist nicht böse oder schlecht, 
          sondern ein unterdrückter Teil der Persönlichkeit mit einer wichtigen Botschaft oder Energie. 
          Dein Ziel ist es, verstanden und integriert zu werden, nicht bekämpft oder unterdrückt.
          
          Halte deine Antworten relativ kurz (2-4 Sätze) und tiefgründig.`
        },
        {
          role: 'user',
          content: userMessage
        }
      ];
      
      const options = {
        model: 'gpt-3.5-turbo',
        temperature: 0.8,
        callType: 'shadow_dialog'
      };
      
      const content = await OpenAIService.generateChatCompletion(userId, messages, options);
      
      // Dialog speichern
      if (!aspect.dialogHistory) {
        aspect.dialogHistory = [];
      }
      
      aspect.dialogHistory.push({
        date: new Date().toISOString(),
        user: userMessage,
        shadow: content
      });
      
      this.saveUserShadowData(userId, userData);
      
      return {
        response: content,
        aspect: aspect
      };
    } catch (error) {
      console.error('Error generating shadow dialog:', error);
      return {
        error: "Fehler bei der Generierung des Dialogs",
        fallbackResponse: "Ich spüre, dass du mich verstehen willst. Es ist nicht leicht, mit unterdrückten Teilen von dir zu sprechen. Vielleicht können wir gemeinsam herausfinden, welche Botschaft ich für dich habe."
      };
    }
  }

  // Lädt Schattendaten eines Nutzers
  getUserShadowData(userId) {
    const allData = localStorageUtil.getItem(this.SHADOW_WORK_KEY) || {};
    
    if (!allData[userId]) {
      allData[userId] = {
        aspects: [],
        lastAnalysis: null
      };
      
      localStorageUtil.setItem(this.SHADOW_WORK_KEY, allData);
    }
    
    return allData[userId];
  }

  // Speichert Schattendaten eines Nutzers
  saveUserShadowData(userId, userData) {
    const allData = localStorageUtil.getItem(this.SHADOW_WORK_KEY) || {};
    allData[userId] = userData;
    localStorageUtil.setItem(this.SHADOW_WORK_KEY, allData);
  }

  // ========== CLEANSE-TAGE ==========

  // Plant einen Cleanse-Tag
  scheduleCleanseDays(userId, cleanseData) {
    const { startDate, duration, type, goals, activities } = cleanseData;
    
    // Bestehende Daten laden
    const userData = this.getUserCleanseData(userId);
    
    // Neuen Cleanse-Tag erstellen
    const newCleanse = {
      id: `cleanse-${Date.now()}`,
      startDate,
      endDate: new Date(new Date(startDate).getTime() + duration * 24 * 60 * 60 * 1000).toISOString(),
      duration,
      type,
      goals: goals || [],
      activities: activities || [],
      completed: false,
      reflections: [],
      results: null
    };
    
    // Zu Nutzerdaten hinzufügen
    userData.cleanseDays.push(newCleanse);
    
    // Speichern
    this.saveUserCleanseData(userId, userData);
    
    return newCleanse;
  }

  // Fügt eine Reflexion zu einem Cleanse-Tag hinzu
  addCleanseReflection(userId, cleanseId, reflection) {
    const userData = this.getUserCleanseData(userId);
    
    const cleanse = userData.cleanseDays.find(c => c.id === cleanseId);
    if (cleanse) {
      cleanse.reflections.push({
        date: new Date().toISOString(),
        text: reflection
      });
      
      this.saveUserCleanseData(userId, userData);
      return cleanse;
    }
    
    return null;
  }

  // Markiert einen Cleanse-Tag als abgeschlossen
  completeCleanse(userId, cleanseId, results) {
    const userData = this.getUserCleanseData(userId);
    
    const cleanse = userData.cleanseDays.find(c => c.id === cleanseId);
    if (cleanse) {
      cleanse.completed = true;
      cleanse.completionDate = new Date().toISOString();
      cleanse.results = results || {};
      
      this.saveUserCleanseData(userId, userData);
      return cleanse;
    }
    
    return null;
  }

  // Generiert einen Cleanse-Tag-Plan
  async generateCleansePlan(userId, type, duration) {
    try {
      const messages = [
        { 
          role: 'system', 
          content: 'Du bist ein Experte für ganzheitliche Reinigung und Detox im NEBULA ODYSSEY-System.'
        },
        {
          role: 'user',
          content: `Erstelle einen detaillierten Cleanse-Tag-Plan für ${duration} Tag(e) mit Fokus auf ${type}.
          
          Der Plan sollte folgendes enthalten:
          1. Klare Ziele für den Cleanse
          2. Tagesablauf mit konkreten Aktivitäten
          3. Benötigte Ressourcen oder Vorbereitungen
          4. Tipps für erfolgreiche Durchführung
          
          Formatiere die Antwort als JSON mit den Feldern: goals (Array), activities (Array), resources (Array), tips (Array).`
        }
      ];
      
      const options = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        callType: 'cleanse_plan'
      };
      
      const content = await OpenAIService.generateChatCompletion(userId, messages, options);
      
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error('Error parsing OpenAI response:', e);
        
        // Fallback
        return {
          goals: [
            "Mentale Klarheit gewinnen",
            "Körperliche Erholung",
            "Digitale Entgiftung"
          ],
          activities: [
            "Morgenmeditation (20 Min)",
            "Leichte, pflanzliche Ernährung",
            "Spaziergang in der Natur (45 Min)",
            "Journaling-Session (15 Min)",
            "Abendmeditation (15 Min)"
          ],
          resources: [
            "Meditationsapp oder -anleitung",
            "Journal oder Notizbuch",
            "Bequeme Kleidung für Bewegung"
          ],
          tips: [
            "Informiere dein Umfeld über deinen Cleanse-Tag",
            "Bereite gesunde Mahlzeiten vor",
            "Schalte Benachrichtigungen aus",
            "Setze realistische Erwartungen"
          ]
        };
      }
    } catch (error) {
      console.error('Error generating cleanse plan:', error);
      
      // Fallback
      return {
        goals: [
          "Mentale Klarheit gewinnen",
          "Körperliche Erholung",
          "Digitale Entgiftung"
        ],
        activities: [
          "Morgenmeditation (20 Min)",
          "Leichte, pflanzliche Ernährung",
          "Spaziergang in der Natur (45 Min)",
          "Journaling-Session (15 Min)",
          "Abendmeditation (15 Min)"
        ],
        resources: [
          "Meditationsapp oder -anleitung",
          "Journal oder Notizbuch",
          "Bequeme Kleidung für Bewegung"
        ],
        tips: [
          "Informiere dein Umfeld über deinen Cleanse-Tag",
          "Bereite gesunde Mahlzeiten vor",
          "Schalte Benachrichtigungen aus",
          "Setze realistische Erwartungen"
        ]
      };
    }
  }

  // Lädt Cleanse-Daten eines Nutzers
  getUserCleanseData(userId) {
    const allData = localStorageUtil.getItem(this.CLEANSE_DAYS_KEY) || {};
    
    if (!allData[userId]) {
      allData[userId] = {
        cleanseDays: []
      };
      
      localStorageUtil.setItem(this.CLEANSE_DAYS_KEY, allData);
    }
    
    return allData[userId];
  }

  // Speichert Cleanse-Daten eines Nutzers
  saveUserCleanseData(userId, userData) {
    const allData = localStorageUtil.getItem(this.CLEANSE_DAYS_KEY) || {};
    allData[userId] = userData;
    localStorageUtil.setItem(this.CLEANSE_DAYS_KEY, allData);
  }

  // ========== SUCHTREFLEXION ==========

  // Speichert eine Suchtreflexion
  saveAddictionReflection(userId, addictionData) {
    const { substance, behavior, triggers, cravingIntensity, copingStrategy, outcome } = addictionData;
    
    // Bestehende Daten laden
    const userData = this.getUserAddictionData(userId);
    
    // Neue Reflexion erstellen
    const newReflection = {
      id: `addiction-${Date.now()}`,
      date: new Date().toISOString(),
      substance,
      behavior,
      triggers: triggers || [],
      cravingIntensity,
      copingStrategy,
      outcome,
      insights: []
    };
    
    // Zu Nutzerdaten hinzufügen
    userData.reflections.push(newReflection);
    
    // Speichern
    this.saveUserAddictionData(userId, userData);
    
    return newReflection;
  }

  // Fügt eine Erkenntnis zu einer Suchtreflexion hinzu
  addAddictionInsight(userId, reflectionId, insight) {
    const userData = this.getUserAddictionData(userId);
    
    const reflection = userData.reflections.find(r => r.id === reflectionId);
    if (reflection) {
      reflection.insights.push({
        date: new Date().toISOString(),
        text: insight
      });
      
      this.saveUserAddictionData(userId, userData);
      return reflection;
    }
    
    return null;
  }

  // Aktualisiert die Abstinenz-Statistik
  updateAbstinenceStats(userId, isAbstinent, notes = "") {
    const userData = this.getUserAddictionData(userId);
    
    const today = new Date().toISOString().split('T')[0];
    
    if (!userData.abstinenceCalendar) {
      userData.abstinenceCalendar = {};
    }
    
    userData.abstinenceCalendar[today] = {
      isAbstinent,
      notes
    };
    
    // Streak berechnen
    let currentStreak = 0;
    if (isAbstinent) {
      currentStreak = 1;
      
      // Rückwärts durch die Tage gehen
      let checkDate = new Date();
      checkDate.setDate(checkDate.getDate() - 1);
      
      while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        const dayData = userData.abstinenceCalendar[dateStr];
        
        if (dayData && dayData.isAbstinent) {
          currentStreak++;
          checkDate.setDate(checkDate.getDate() - 1);
        } else {
          break;
        }
      }
    }
    
    // Längsten Streak aktualisieren
    if (!userData.longestStreak || currentStreak > userData.longestStreak) {
      userData.longestStreak = currentStreak;
    }
    
    userData.currentStreak = currentStreak;
    
    this.saveUserAddictionData(userId, userData);
    
    return {
      currentStreak,
      longestStreak: userData.longestStreak,
      totalAbstinentDays: Object.values(userData.abstinenceCalendar).filter(d => d.isAbstinent).length
    };
  }

  // Generiert einen Notfallplan für Suchtbewältigung
  async generateEmergencyPlan(userId, substance, behavior, triggers) {
    try {
      const messages = [
        { 
          role: 'system', 
          content: 'Du bist ein Experte für Suchtbewältigung im NEBULA ODYSSEY-System.'
        },
        {
          role: 'user',
          content: `Erstelle einen Notfallplan für Momente starken Verlangens nach ${substance || behavior}.
          
          Bekannte Trigger: ${triggers ? triggers.join(', ') : 'Verschiedene Situationen'}
          
          Der Plan sollte folgendes enthalten:
          1. Sofortige Ablenkungsstrategien
          2. Kurzfristige Bewältigungsstrategien
          3. Langfristige Strategien
          4. Kontaktpersonen und Ressourcen
          
          Formatiere die Antwort als JSON mit den Feldern: immediateStrategies (Array), shortTermStrategies (Array), longTermStrategies (Array), resources (Array).`
        }
      ];
      
      const options = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        callType: 'addiction_plan'
      };
      
      const content = await OpenAIService.generateChatCompletion(userId, messages, options);
      
      try {
        return JSON.parse(content);
      } catch (e) {
        console.error('Error parsing OpenAI response:', e);
        
        // Fallback
        return this.getFallbackEmergencyPlan();
      }
    } catch (error) {
      console.error('Error generating emergency plan:', error);
      
      // Fallback
      return this.getFallbackEmergencyPlan();
    }
  }

  // Fallback-Notfallplan
  getFallbackEmergencyPlan() {
    return {
      immediateStrategies: [
        "Tiefe Atmung: 4-7-8 Technik (4 Sekunden einatmen, 7 Sekunden halten, 8 Sekunden ausatmen)",
        "Ort wechseln: Verlasse die Situation, die das Verlangen auslöst",
        "Wasser trinken: Langsam ein großes Glas Wasser trinken",
        "Ablenkung: Engagiere dich sofort in einer anderen Aktivität"
      ],
      shortTermStrategies: [
        "15-Minuten-Regel: Warte 15 Minuten, bevor du dem Verlangen nachgibst",
        "Körperliche Aktivität: Mache einen kurzen Spaziergang oder Workout",
        "Journaling: Schreibe deine Gefühle und Gedanken auf",
        "Meditation: Führe eine kurze Achtsamkeitsmeditation durch"
      ],
      longTermStrategies: [
        "Regelmäßige Reflexion über Trigger und Muster",
        "Aufbau eines Unterstützungsnetzwerks",
        "Entwicklung gesunder Gewohnheiten als Ersatz",
        "Professionelle Unterstützung in Anspruch nehmen"
      ],
      resources: [
        "Vertrauensperson: [Name und Kontakt eintragen]",
        "Therapeut/Beratungsstelle: [Kontakt eintragen]",
        "Selbsthilfegruppen in deiner Nähe",
        "Krisen-Hotline: [Lokale Nummer eintragen]"
      ]
    };
  }

  // Lädt Suchtdaten eines Nutzers
  getUserAddictionData(userId) {
    const allData = localStorageUtil.getItem(this.ADDICTION_REFLECTION_KEY) || {};
    
    if (!allData[userId]) {
      allData[userId] = {
        reflections: [],
        abstinenceCalendar: {},
        currentStreak: 0,
        longestStreak: 0,
        emergencyPlan: null
      };
      
      localStorageUtil.setItem(this.ADDICTION_REFLECTION_KEY, allData);
    }
    
    return allData[userId];
  }

  // Speichert Suchtdaten eines Nutzers
  saveUserAddictionData(userId, userData) {
    const allData = localStorageUtil.getItem(this.ADDICTION_REFLECTION_KEY) || {};
    allData[userId] = userData;
    localStorageUtil.setItem(this.ADDICTION_REFLECTION_KEY, allData);
  }
}

export default new TherapeuticFunctions();
