// AI integration for reflection analysis
import axios from 'axios';

class ReflectionAI {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || 'mock-api-key';
    this.useRealAPI = process.env.USE_REAL_API === 'true';
  }

  async analyzeReflection(userId, reflectionData) {
    const { mood, answers, questions } = reflectionData;
    
    try {
      if (this.useRealAPI && this.apiKey !== 'mock-api-key') {
        // Use real OpenAI API if configured
        return await this.useOpenAI(userId, reflectionData);
      } else {
        // Use mock AI response for demo purposes
        return this.getMockAnalysis(mood, answers);
      }
    } catch (error) {
      console.error('Error analyzing reflection:', error);
      return this.getFallbackAnalysis();
    }
  }

  async useOpenAI(userId, reflectionData) {
    const { mood, answers, questions } = reflectionData;
    
    // Create prompt for OpenAI
    const prompt = `
      Analysiere die folgenden Reflexionsantworten eines Benutzers im NEBULA ODYSSEY-Universum:
      
      Stimmung: ${mood}
      
      ${questions.map((q, i) => `Frage: ${q}\nAntwort: ${answers[`question${i + 1}`] || 'Keine Antwort'}`).join('\n\n')}
      
      Bitte erstelle eine tiefgehende Analyse mit:
      1. Zusammenfassung der Hauptpunkte
      2. Wichtige Einsichten und Erkenntnisse
      3. Empfehlungen für die weitere Reise im NEBULA ODYSSEY-Universum
      4. Vorgeschlagene Quests oder Missionen
      
      Formatiere die Antwort als JSON-Objekt mit den Feldern: summary, insights, recommendations, suggestedQuests.
    `;
    
    // Call OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'Du bist ein Experte für persönliche Entwicklung und Reflexion im NEBULA ODYSSEY-System.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // Parse and return the response
    try {
      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing OpenAI response:', error);
      return this.getFallbackAnalysis();
    }
  }

  getMockAnalysis(mood, answers) {
    // Generate different analysis based on mood
    if (mood === 'positive') {
      return {
        summary: "Basierend auf deiner Reflexion scheinst du heute sehr produktiv und positiv gestimmt zu sein. Du hast gute Fortschritte bei deinen Zielen gemacht und zeigst eine optimistische Einstellung gegenüber kommenden Herausforderungen.",
        insights: [
          "Du zeigst eine starke intrinsische Motivation",
          "Du fokussierst dich auf Lösungen statt auf Probleme",
          "Du erkennst und würdigst deine Erfolge angemessen"
        ],
        recommendations: [
          "Nutze deine positive Energie, um ein anspruchsvolles Projekt voranzutreiben",
          "Teile deine Erfolge mit anderen, um sie zu inspirieren",
          "Setze dir ein neues, ambitioniertes Ziel für die kommende Woche"
        ],
        suggestedQuests: [
          "Herausforderungs-Quest: Lerne eine neue Fähigkeit: +100 XP",
          "Inspirations-Quest: Teile deine Erfolgsgeschichte: +50 XP",
          "Planungs-Quest: Setze ein neues Ziel mit konkreten Schritten: +75 XP"
        ]
      };
    } else if (mood === 'negative') {
      return {
        summary: "Deine Reflexion zeigt, dass du heute einige Herausforderungen erlebt hast. Es scheint ein anstrengender Tag gewesen zu sein, aber du zeigst Resilienz und den Willen, weiterzumachen.",
        insights: [
          "Du bist in der Lage, Schwierigkeiten zu erkennen und zu benennen",
          "Du neigst dazu, zu selbstkritisch zu sein",
          "Du hast Potenzial für mehr Selbstmitgefühl"
        ],
        recommendations: [
          "Nimm dir Zeit für Selbstfürsorge und Erholung",
          "Reflektiere über vergangene Erfolge, um Perspektive zu gewinnen",
          "Teile deine Herausforderungen mit einem Vertrauten oder Mentor"
        ],
        suggestedQuests: [
          "Selbstfürsorge-Quest: 30 Minuten Entspannung: +40 XP",
          "Reflexions-Quest: Schreibe drei positive Aspekte des Tages auf: +30 XP",
          "Verbindungs-Quest: Suche Unterstützung bei einem Freund: +50 XP"
        ]
      };
    } else {
      // Neutral mood
      return {
        summary: "Basierend auf deiner Reflexion scheinst du heute einen ausgeglichenen Tag gehabt zu haben. Du machst stetige Fortschritte bei deinen Zielen und hast wertvolle Einsichten über dich selbst gewonnen.",
        insights: [
          "Du zeigst eine ausgewogene Perspektive auf deine Erfahrungen",
          "Du fokussierst dich auf kontinuierlichen Fortschritt statt Perfektion",
          "Du bist dir deiner Stärken und Verbesserungsbereiche bewusst"
        ],
        recommendations: [
          "Versuche, morgen 30 Minuten früher aufzustehen für mehr Fokuszeit",
          "Plane eine kurze Meditation ein, um deine Konzentration zu verbessern",
          "Setze dir ein spezifisches Ziel für den nächsten Schritt in deinem Hauptprojekt"
        ],
        suggestedQuests: [
          "Morgenroutine optimieren: +50 XP",
          "15 Minuten Meditation: +30 XP",
          "Hauptprojekt vorantreiben: +100 XP"
        ]
      };
    }
  }

  getFallbackAnalysis() {
    // Fallback analysis in case of errors
    return {
      summary: "Danke für deine Reflexion. Aufgrund technischer Schwierigkeiten konnte keine detaillierte Analyse erstellt werden.",
      insights: [
        "Regelmäßige Reflexion ist ein wichtiger Teil persönlichen Wachstums",
        "Das Bewusstsein für deine Gedanken und Gefühle stärkt deine emotionale Intelligenz"
      ],
      recommendations: [
        "Setze deine regelmäßige Reflexionspraxis fort",
        "Versuche, Muster in deinen Gedanken und Verhaltensweisen zu erkennen"
      ],
      suggestedQuests: [
        "Tägliche Reflexion fortsetzen: +30 XP",
        "Journaling-Praxis etablieren: +50 XP"
      ]
    };
  }
}

export default new ReflectionAI();
