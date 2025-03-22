// OpenAI Service für NEBULA ODYSSEY
// Zentralisierte Schnittstelle für alle OpenAI API-Aufrufe

import { Configuration, OpenAIApi } from 'openai';
import ApiUsageControl from './ApiUsageControl';
import dotenv from 'dotenv';

// Lade Umgebungsvariablen
dotenv.config();

class OpenAIService {
  constructor() {
    this.apiKey = process.env.OPENAI_API_KEY || 'mock-api-key';
    this.useRealAPI = process.env.USE_REAL_API === 'true';
    
    if (this.useRealAPI && this.apiKey !== 'mock-api-key') {
      const configuration = new Configuration({
        apiKey: this.apiKey,
      });
      this.openai = new OpenAIApi(configuration);
    }
  }

  // Prüft, ob die API verwendet werden kann
  canUseAPI(userId) {
    if (!this.useRealAPI || this.apiKey === 'mock-api-key') {
      return false;
    }
    
    return ApiUsageControl.canMakeApiCall(userId);
  }

  // Generiert eine Antwort mit dem ChatGPT-Modell
  async generateChatCompletion(userId, messages, options = {}) {
    // Standardwerte für Optionen
    const defaultOptions = {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      max_tokens: 1000,
      callType: 'chat'
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    try {
      // Prüfen, ob API verwendet werden kann
      if (!this.canUseAPI(userId)) {
        console.log('Using mock response - API not available or daily limit reached');
        return this.getMockResponse(messages, finalOptions.callType);
      }
      
      // API-Aufruf registrieren
      ApiUsageControl.registerApiCall(userId, finalOptions.callType);
      
      // API-Aufruf durchführen
      const response = await this.openai.createChatCompletion({
        model: finalOptions.model,
        messages: messages,
        temperature: finalOptions.temperature,
        max_tokens: finalOptions.max_tokens
      });
      
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      return this.getMockResponse(messages, finalOptions.callType);
    }
  }

  // Generiert eine Mock-Antwort für Testzwecke oder wenn API nicht verfügbar ist
  getMockResponse(messages, callType) {
    // Extrahiere den letzten Benutzer-Prompt
    const userPrompt = messages.find(m => m.role === 'user')?.content || '';
    
    // Generiere unterschiedliche Mock-Antworten je nach Aufruftyp
    switch (callType) {
      case 'quest':
        return `Hier sind einige personalisierte Quest-Vorschläge basierend auf deinem Profil:
1. "Morgenroutine optimieren" - Leicht - 15 Min - 50 XP
2. "Wöchentliche Reflexion" - Mittel - 30 Min - 100 XP
3. "Neue Fähigkeit erlernen" - Schwer - 2 Wochen - 300 XP`;
      
      case 'reflection':
        return `Basierend auf deiner Reflexion erkenne ich folgende Muster:
- Du zeigst Fortschritte in deiner Selbstwahrnehmung
- Herausforderungen bestehen noch im Bereich Zeitmanagement
- Empfehlung: Fokussiere dich auf kleine, tägliche Verbesserungen`;
      
      case 'shadow':
        return `Deine beschriebenen emotionalen Reaktionen könnten auf folgende Schattenaspekte hinweisen:
- Ein Teil von dir sehnt sich nach mehr Anerkennung
- Es gibt unausgedrückte kreative Energie
- Vorschlag: Arbeite mit diesen Aspekten durch kreative Ausdrucksformen`;
      
      default:
        return `Ich habe deine Nachricht erhalten und würde normalerweise mit der OpenAI API antworten. 
Da die API derzeit nicht verfügbar ist oder dein tägliches Limit erreicht wurde, 
ist dies eine automatisch generierte Antwort. Bitte versuche es später noch einmal.`;
    }
  }

  // Gibt Nutzungsstatistiken zurück
  getUsageStats(userId) {
    return ApiUsageControl.getUserStats(userId);
  }
}

export default new OpenAIService();
