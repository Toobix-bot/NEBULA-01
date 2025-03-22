// AI integration for skill development recommendations
import OpenAIService from './OpenAIService';

class SkillAI {
  constructor() {
    // Keine direkten API-Keys mehr hier, alles über den zentralen OpenAIService
  }

  async generateSkillRecommendations(userId, userData) {
    try {
      // Verwende den zentralen OpenAIService für API-Aufrufe
      return await this.useOpenAI(userId, userData);
    } catch (error) {
      console.error('Error generating skill recommendations:', error);
      return this.getFallbackRecommendations();
    }
  }

  async useOpenAI(userId, userData) {
    const { skills = [], completedQuests = [], recentReflections = [] } = userData || {};
    
    // Create prompt for OpenAI
    const prompt = `
      Generiere personalisierte Skill-Entwicklungsempfehlungen für einen Benutzer im NEBULA ODYSSEY-Universum basierend auf folgenden Daten:
      
      Aktuelle Skills:
      ${skills.map(s => `- ${s.name}: Level ${s.level}, XP: ${s.currentXP}/${s.requiredXP}`).join('\n')}
      
      Kürzlich abgeschlossene Quests:
      ${completedQuests.map(q => `- ${q.title}`).join('\n')}
      
      Stimmung aus letzten Reflexionen:
      ${recentReflections.map(r => `- ${r.date}: ${r.mood}`).join('\n')}
      
      Generiere für jeden Skill spezifische Aktivitäten zur Weiterentwicklung und XP-Gewinnung.
      Berücksichtige dabei das aktuelle Level und die Interessen des Benutzers.
      
      Formatiere die Antwort als JSON-Objekt mit Skill-Namen als Schlüssel und Arrays von Aktivitäten als Werte.
    `;
    
    // Verwende den zentralen OpenAIService
    const messages = [
      { role: 'system', content: 'Du bist ein Skill-Entwicklungsexperte im NEBULA ODYSSEY-System für persönliche Entwicklung.' },
      { role: 'user', content: prompt }
    ];
    
    const options = {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      callType: 'skill'
    };
    
    try {
      const content = await OpenAIService.generateChatCompletion(userId, messages, options);
      
      // Versuche, die Antwort als JSON zu parsen
      try {
        return JSON.parse(content);
      } catch (parseError) {
        console.error('Error parsing OpenAI response:', parseError);
        
        // Wenn die Antwort kein gültiges JSON ist, versuche eine einfache Konvertierung
        if (typeof content === 'string' && content.includes('{')) {
          // Extrahiere JSON-ähnliche Teile
          const jsonMatch = content.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            try {
              return JSON.parse(jsonMatch[0]);
            } catch (e) {
              console.error('Failed to extract JSON from response');
            }
          }
        }
        
        // Fallback zu Mock-Empfehlungen
        return this.getMockRecommendations(userData);
      }
    } catch (error) {
      console.error('Error with OpenAI service:', error);
      return this.getMockRecommendations(userData);
    }
  }

  getMockRecommendations(userData) {
    // Generate different recommendations based on user data
    const { skills = [] } = userData || {};
    
    // Create recommendations object
    const recommendations = {};
    
    // Default skills if none provided
    const defaultSkills = [
      { id: 's1', name: 'Produktivität', level: 7 },
      { id: 's2', name: 'Kreativität', level: 5 },
      { id: 's3', name: 'Fitness', level: 4 },
      { id: 's4', name: 'Meditation', level: 3 },
      { id: 's5', name: 'Kommunikation', level: 6 },
      { id: 's6', name: 'Finanzen', level: 4 }
    ];
    
    // Use provided skills or defaults
    const skillsToUse = skills.length > 0 ? skills : defaultSkills;
    
    // Generate recommendations for each skill
    skillsToUse.forEach(skill => {
      const activities = this.getActivitiesForSkill(skill.name, skill.level);
      recommendations[skill.name] = activities;
    });
    
    return recommendations;
  }
  
  getActivitiesForSkill(skillName, level) {
    // Generate skill-specific activities based on skill name and level
    const activities = [];
    
    switch(skillName.toLowerCase()) {
      case 'produktivität':
        activities.push(
          { title: 'Pomodoro-Technik', description: 'Arbeite mit der Pomodoro-Technik (25 Minuten Fokus, 5 Minuten Pause) für 2 Stunden.', xp: 30 },
          { title: 'Tagesplanung', description: 'Erstelle einen detaillierten Plan für den nächsten Tag mit Zeitblöcken.', xp: 20 },
          { title: 'Ablenkungen eliminieren', description: 'Identifiziere und eliminiere die drei größten Ablenkungen in deinem Arbeitsumfeld.', xp: 40 }
        );
        if (level >= 5) {
          activities.push(
            { title: 'Workflow-Optimierung', description: 'Analysiere und optimiere deinen Arbeitsablauf für eine wiederkehrende Aufgabe.', xp: 50 },
            { title: 'Batch-Processing', description: 'Wende Batch-Processing auf ähnliche Aufgaben an, um Effizienz zu steigern.', xp: 60 }
          );
        }
        break;
        
      case 'kreativität':
        activities.push(
          { title: 'Freies Schreiben', description: 'Praktiziere 15 Minuten freies Schreiben ohne Selbstzensur.', xp: 25 },
          { title: 'Ideensammlung', description: 'Generiere 20 Ideen zu einem bestimmten Problem oder Thema.', xp: 30 }
        );
        if (level >= 5) {
          activities.push(
            { title: 'Kreative Kombination', description: 'Kombiniere zwei scheinbar unverbundene Konzepte zu einer neuen Idee.', xp: 45 },
            { title: 'Perspektivwechsel', description: 'Betrachte ein Problem aus der Sicht von drei verschiedenen Personen oder Rollen.', xp: 50 }
          );
        }
        break;
        
      case 'fitness':
        activities.push(
          { title: 'Tägliche Bewegung', description: 'Integriere mindestens 30 Minuten Bewegung in deinen Tag.', xp: 20 },
          { title: 'Stretching-Routine', description: 'Führe eine 15-minütige Stretching-Routine durch.', xp: 15 }
        );
        if (level >= 4) {
          activities.push(
            { title: 'Intervalltraining', description: 'Absolviere ein 20-minütiges Intervalltraining mit hoher Intensität.', xp: 40 },
            { title: 'Wöchentlicher Trainingsplan', description: 'Erstelle einen ausgewogenen Trainingsplan für die kommende Woche.', xp: 35 }
          );
        }
        break;
        
      case 'meditation':
        activities.push(
          { title: 'Atemfokus', description: 'Praktiziere 10 Minuten Meditation mit Fokus auf den Atem.', xp: 20 },
          { title: 'Body Scan', description: 'Führe einen 15-minütigen Body Scan durch.', xp: 25 }
        );
        if (level >= 3) {
          activities.push(
            { title: 'Achtsamer Spaziergang', description: 'Mache einen 20-minütigen achtsamen Spaziergang in der Natur.', xp: 30 },
            { title: 'Emotionsbeobachtung', description: 'Beobachte deine Emotionen während des Tages ohne Urteil.', xp: 35 }
          );
        }
        break;
        
      case 'kommunikation':
        activities.push(
          { title: 'Aktives Zuhören', description: 'Übe aktives Zuhören in einem Gespräch, ohne zu unterbrechen.', xp: 25 },
          { title: 'Klare Botschaft', description: 'Formuliere eine komplexe Idee in drei einfachen Sätzen.', xp: 30 }
        );
        if (level >= 5) {
          activities.push(
            { title: 'Feedback geben', description: 'Gib konstruktives Feedback zu einem Projekt oder einer Idee.', xp: 40 },
            { title: 'Präsentationsübung', description: 'Halte eine 5-minütige Präsentation zu einem Thema deiner Wahl.', xp: 50 }
          );
        }
        break;
        
      case 'finanzen':
        activities.push(
          { title: 'Ausgabentracking', description: 'Verfolge deine Ausgaben für eine Woche in verschiedenen Kategorien.', xp: 25 },
          { title: 'Budgetplanung', description: 'Erstelle ein monatliches Budget mit Einnahmen und Ausgaben.', xp: 30 }
        );
        if (level >= 4) {
          activities.push(
            { title: 'Sparplan', description: 'Entwickle einen Sparplan für ein spezifisches Ziel.', xp: 40 },
            { title: 'Finanzrecherche', description: 'Recherchiere eine Anlagemöglichkeit und fasse die Vor- und Nachteile zusammen.', xp: 45 }
          );
        }
        break;
        
      default:
        // Generic activities for any skill
        activities.push(
          { title: 'Lernressourcen finden', description: `Finde drei hochwertige Lernressourcen zum Thema ${skillName}.`, xp: 20 },
          { title: 'Tägliche Übung', description: `Übe täglich 15 Minuten eine Aktivität, die ${skillName} verbessert.`, xp: 25 },
          { title: 'Fortschrittstagebuch', description: `Führe ein Tagebuch über deine Fortschritte im Bereich ${skillName}.`, xp: 30 }
        );
    }
    
    return activities;
  }

  getFallbackRecommendations() {
    // Fallback recommendations in case of errors
    return {
      'Allgemeine Entwicklung': [
        { title: 'Tägliche Übung', description: 'Widme täglich 15 Minuten der Entwicklung einer Fähigkeit deiner Wahl.', xp: 20 },
        { title: 'Lernressourcen', description: 'Finde und organisiere Lernressourcen für einen Skill, den du verbessern möchtest.', xp: 15 },
        { title: 'Fortschrittstagebuch', description: 'Führe ein Tagebuch über deine Fortschritte und Erkenntnisse.', xp: 25 }
      ]
    };
  }
  
  // Gibt die verbleibenden API-Aufrufe für einen Benutzer zurück
  getRemainingApiCalls(userId) {
    return OpenAIService.getUsageStats(userId);
  }
}

export default new SkillAI();
