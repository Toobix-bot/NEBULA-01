// AI integration for quest recommendations
import OpenAIService from './OpenAIService';

class QuestAI {
  constructor() {
    // Keine direkten API-Keys mehr hier, alles über den zentralen OpenAIService
  }

  async generateQuestRecommendations(userId, userData) {
    try {
      // Verwende den zentralen OpenAIService für API-Aufrufe
      return await this.useOpenAI(userId, userData);
    } catch (error) {
      console.error('Error generating quest recommendations:', error);
      return this.getFallbackRecommendations();
    }
  }

  async useOpenAI(userId, userData) {
    const { skills = [], completedQuests = [], recentReflections = [] } = userData || {};
    
    // Create prompt for OpenAI
    const prompt = `
      Generiere personalisierte Quest-Empfehlungen für einen Benutzer im NEBULA ODYSSEY-Universum basierend auf folgenden Daten:
      
      Skills:
      ${skills.map(s => `- ${s.name}: Level ${s.level}`).join('\n')}
      
      Kürzlich abgeschlossene Quests:
      ${completedQuests.map(q => `- ${q.title}`).join('\n')}
      
      Stimmung aus letzten Reflexionen:
      ${recentReflections.map(r => `- ${r.date}: ${r.mood}`).join('\n')}
      
      Generiere 5 personalisierte Quests in verschiedenen Kategorien (täglich, wöchentlich, langfristig) mit unterschiedlichen Schwierigkeitsgraden.
      Jede Quest sollte Titel, Beschreibung, Schwierigkeitsgrad, geschätzte Zeit, XP-Belohnung und Tags enthalten.
      
      Formatiere die Antwort als JSON-Array mit Quest-Objekten.
    `;
    
    // Verwende den zentralen OpenAIService
    const messages = [
      { role: 'system', content: 'Du bist ein Quest-Designer im NEBULA ODYSSEY-System für persönliche Entwicklung.' },
      { role: 'user', content: prompt }
    ];
    
    const options = {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      callType: 'quest'
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
          const jsonMatch = content.match(/\[[\s\S]*\]/);
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
    
    // Find highest skill
    const highestSkill = skills.length > 0 
      ? [...skills].sort((a, b) => b.level - a.level)[0]
      : { name: 'Produktivität', level: 5 };
    
    // Find lowest skill
    const lowestSkill = skills.length > 0
      ? [...skills].sort((a, b) => a.level - b.level)[0]
      : { name: 'Meditation', level: 2 };
    
    return [
      {
        id: `quest-${Date.now()}-1`,
        title: `${highestSkill.name} vertiefen`,
        description: `Nutze deine Stärke in ${highestSkill.name} (Level ${highestSkill.level}), um ein anspruchsvolles Projekt zu bewältigen.`,
        difficulty: 'Mittel',
        type: 'daily',
        estimatedTime: '45 Min',
        xp: 75,
        tags: [highestSkill.name, 'Stärken', 'Herausforderung']
      },
      {
        id: `quest-${Date.now()}-2`,
        title: `${lowestSkill.name} verbessern`,
        description: `Arbeite an deiner Entwicklung in ${lowestSkill.name} (Level ${lowestSkill.level}) durch eine grundlegende Übung.`,
        difficulty: 'Leicht',
        type: 'daily',
        estimatedTime: '20 Min',
        xp: 50,
        tags: [lowestSkill.name, 'Wachstum', 'Grundlagen']
      },
      {
        id: `quest-${Date.now()}-3`,
        title: 'Wöchentliche Reflexionsroutine',
        description: 'Führe eine tiefgehende Reflexion über deine Fortschritte und Herausforderungen der Woche durch.',
        difficulty: 'Leicht',
        type: 'weekly',
        estimatedTime: '60 Min',
        xp: 100,
        tags: ['Reflexion', 'Achtsamkeit', 'Planung']
      },
      {
        id: `quest-${Date.now()}-4`,
        title: 'Skill-Kombination',
        description: 'Kombiniere zwei deiner Skills in einem kreativen Projekt, um Synergien zu entdecken.',
        difficulty: 'Schwer',
        type: 'weekly',
        estimatedTime: '120 Min',
        xp: 150,
        tags: ['Kreativität', 'Synergie', 'Projekt']
      },
      {
        id: `quest-${Date.now()}-5`,
        title: '30-Tage-Gewohnheit',
        description: 'Etabliere eine neue tägliche Gewohnheit über 30 Tage, die mehrere deiner Entwicklungsbereiche unterstützt.',
        difficulty: 'Schwer',
        type: 'longterm',
        estimatedTime: '15 Min täglich',
        xp: 500,
        tags: ['Gewohnheitsbildung', 'Konsistenz', 'Langzeitentwicklung']
      }
    ];
  }

  getFallbackRecommendations() {
    // Fallback recommendations in case of errors
    return [
      {
        id: `quest-${Date.now()}-1`,
        title: 'Tägliche Reflexion',
        description: 'Nimm dir 15 Minuten Zeit, um über deinen Tag zu reflektieren und wichtige Erkenntnisse festzuhalten.',
        difficulty: 'Leicht',
        type: 'daily',
        estimatedTime: '15 Min',
        xp: 30,
        tags: ['Reflexion', 'Achtsamkeit']
      },
      {
        id: `quest-${Date.now()}-2`,
        title: 'Wöchentliche Planung',
        description: 'Erstelle einen detaillierten Plan für die kommende Woche mit Zielen und Prioritäten.',
        difficulty: 'Mittel',
        type: 'weekly',
        estimatedTime: '45 Min',
        xp: 75,
        tags: ['Planung', 'Organisation', 'Produktivität']
      },
      {
        id: `quest-${Date.now()}-3`,
        title: 'Lernprojekt',
        description: 'Wähle ein neues Thema oder eine neue Fähigkeit und erstelle einen 30-Tage-Lernplan.',
        difficulty: 'Schwer',
        type: 'longterm',
        estimatedTime: '30 Min täglich',
        xp: 300,
        tags: ['Bildung', 'Wachstum', 'Fähigkeiten']
      }
    ];
  }
  
  // Gibt die verbleibenden API-Aufrufe für einen Benutzer zurück
  getRemainingApiCalls(userId) {
    return OpenAIService.getUsageStats(userId);
  }
}

export default new QuestAI();
