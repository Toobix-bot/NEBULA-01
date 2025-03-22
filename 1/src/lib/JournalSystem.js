// Journal- und Kalendersystem für NEBULA ODYSSEY
// Integriert Daten aus allen Modulen für eine ganzheitliche Übersicht

import localStorageUtil from './localStorageUtil';
import OpenAIService from './OpenAIService';

class JournalSystem {
  constructor() {
    // Speicherschlüssel für Journal- und Kalenderdaten
    this.JOURNAL_KEY = 'nebula_journal';
    this.CALENDAR_KEY = 'nebula_calendar';
    
    // Journaleintrags-Typen
    this.entryTypes = [
      { id: 'free', name: 'Freier Eintrag', icon: 'edit' },
      { id: 'quest', name: 'Quest-Eintrag', icon: 'task' },
      { id: 'reflection', name: 'Reflexion', icon: 'psychology' },
      { id: 'emotion', name: 'Emotionsarbeit', icon: 'mood' },
      { id: 'shadow', name: 'Schattenarbeit', icon: 'dark_mode' },
      { id: 'cleanse', name: 'Cleanse-Tag', icon: 'spa' },
      { id: 'addiction', name: 'Suchtreflexion', icon: 'healing' },
      { id: 'milestone', name: 'Meilenstein', icon: 'flag' }
    ];
    
    // Kalender-Event-Typen
    this.eventTypes = [
      { id: 'quest_due', name: 'Quest-Fälligkeit', color: '#4285F4' },
      { id: 'reflection', name: 'Geplante Reflexion', color: '#34A853' },
      { id: 'cleanse', name: 'Cleanse-Tag', color: '#FBBC05' },
      { id: 'reminder', name: 'Erinnerung', color: '#EA4335' },
      { id: 'milestone', name: 'Meilenstein', color: '#9C27B0' },
      { id: 'custom', name: 'Benutzerdefiniert', color: '#607D8B' }
    ];
  }

  // ========== JOURNAL-FUNKTIONEN ==========

  // Erstellt einen neuen Journaleintrag
  createJournalEntry(userId, entryData) {
    const { type, title, content, mood, tags, relatedItems } = entryData;
    
    // Bestehende Daten laden
    const userData = this.getUserJournalData(userId);
    
    // Neuen Eintrag erstellen
    const newEntry = {
      id: `journal-${Date.now()}`,
      date: new Date().toISOString(),
      type: type || 'free',
      title: title || 'Untitled Entry',
      content: content || '',
      mood: mood,
      tags: tags || [],
      relatedItems: relatedItems || [],
      lastEdited: new Date().toISOString()
    };
    
    // Zu Nutzerdaten hinzufügen
    userData.entries.push(newEntry);
    
    // Speichern
    this.saveUserJournalData(userId, userData);
    
    return newEntry;
  }

  // Aktualisiert einen bestehenden Journaleintrag
  updateJournalEntry(userId, entryId, updatedData) {
    const userData = this.getUserJournalData(userId);
    
    const entryIndex = userData.entries.findIndex(e => e.id === entryId);
    if (entryIndex === -1) {
      return null;
    }
    
    // Eintrag aktualisieren
    const updatedEntry = {
      ...userData.entries[entryIndex],
      ...updatedData,
      lastEdited: new Date().toISOString()
    };
    
    userData.entries[entryIndex] = updatedEntry;
    
    // Speichern
    this.saveUserJournalData(userId, userData);
    
    return updatedEntry;
  }

  // Löscht einen Journaleintrag
  deleteJournalEntry(userId, entryId) {
    const userData = this.getUserJournalData(userId);
    
    const entryIndex = userData.entries.findIndex(e => e.id === entryId);
    if (entryIndex === -1) {
      return false;
    }
    
    // Eintrag entfernen
    userData.entries.splice(entryIndex, 1);
    
    // Speichern
    this.saveUserJournalData(userId, userData);
    
    return true;
  }

  // Sucht in Journaleinträgen
  searchJournalEntries(userId, searchParams) {
    const { query, types, tags, startDate, endDate, mood } = searchParams;
    const userData = this.getUserJournalData(userId);
    
    return userData.entries.filter(entry => {
      // Textsuche
      if (query && !entry.title.toLowerCase().includes(query.toLowerCase()) && 
          !entry.content.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }
      
      // Typenfilter
      if (types && types.length > 0 && !types.includes(entry.type)) {
        return false;
      }
      
      // Tag-Filter
      if (tags && tags.length > 0 && !tags.some(tag => entry.tags.includes(tag))) {
        return false;
      }
      
      // Datumsbereich
      const entryDate = new Date(entry.date);
      if (startDate && entryDate < new Date(startDate)) {
        return false;
      }
      if (endDate && entryDate > new Date(endDate)) {
        return false;
      }
      
      // Stimmungsfilter
      if (mood && entry.mood !== mood) {
        return false;
      }
      
      return true;
    });
  }

  // Generiert Einsichten aus Journaleinträgen mit KI
  async generateJournalInsights(userId, timeRange = 'month') {
    const userData = this.getUserJournalData(userId);
    
    // Einträge nach Zeitraum filtern
    let startDate;
    const now = new Date();
    
    switch(timeRange) {
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
        break;
      case 'quarter':
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 3);
        break;
      case 'year':
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = new Date(now);
        startDate.setMonth(now.getMonth() - 1);
    }
    
    const relevantEntries = userData.entries.filter(entry => 
      new Date(entry.date) >= startDate
    );
    
    if (relevantEntries.length < 3) {
      return {
        error: "Nicht genug Einträge für eine aussagekräftige Analyse"
      };
    }
    
    try {
      // Einträge für die Analyse vorbereiten
      const entriesForAnalysis = relevantEntries.map(entry => ({
        date: entry.date,
        type: entry.type,
        title: entry.title,
        content: entry.content.substring(0, 300) + (entry.content.length > 300 ? '...' : ''),
        mood: entry.mood,
        tags: entry.tags
      }));
      
      const messages = [
        { 
          role: 'system', 
          content: 'Du bist ein Experte für persönliche Entwicklung und Journalanalyse im NEBULA ODYSSEY-System.'
        },
        {
          role: 'user',
          content: `Analysiere die folgenden Journaleinträge eines Nutzers und identifiziere Muster, Themen, Fortschritte und Herausforderungen:
          
          ${JSON.stringify(entriesForAnalysis, null, 2)}
          
          Formatiere die Antwort als JSON mit den Feldern:
          - themes (Array von identifizierten Themen)
          - patterns (Array von Verhaltens- oder Gedankenmustern)
          - progress (Array von Fortschritten oder positiven Entwicklungen)
          - challenges (Array von Herausforderungen oder Hindernissen)
          - recommendations (Array von Empfehlungen für weiteres Wachstum)`
        }
      ];
      
      const options = {
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        callType: 'journal_analysis'
      };
      
      const content = await OpenAIService.generateChatCompletion(userId, messages, options);
      
      try {
        const result = JSON.parse(content);
        
        // Einsichten speichern
        userData.insights.push({
          id: `insight-${Date.now()}`,
          date: new Date().toISOString(),
          timeRange,
          entriesAnalyzed: relevantEntries.length,
          ...result
        });
        
        this.saveUserJournalData(userId, userData);
        
        return result;
      } catch (e) {
        console.error('Error parsing OpenAI response:', e);
        return {
          error: "Fehler beim Parsen der Analyse",
          rawContent: content
        };
      }
    } catch (error) {
      console.error('Error generating journal insights:', error);
      return {
        error: "Fehler bei der Generierung von Einsichten"
      };
    }
  }

  // Lädt Journaldaten eines Nutzers
  getUserJournalData(userId) {
    const allData = localStorageUtil.getItem(this.JOURNAL_KEY) || {};
    
    if (!allData[userId]) {
      allData[userId] = {
        entries: [],
        insights: [],
        tags: []
      };
      
      localStorageUtil.setItem(this.JOURNAL_KEY, allData);
    }
    
    return allData[userId];
  }

  // Speichert Journaldaten eines Nutzers
  saveUserJournalData(userId, userData) {
    const allData = localStorageUtil.getItem(this.JOURNAL_KEY) || {};
    allData[userId] = userData;
    localStorageUtil.setItem(this.JOURNAL_KEY, allData);
  }

  // ========== KALENDER-FUNKTIONEN ==========

  // Erstellt ein neues Kalenderereignis
  createCalendarEvent(userId, eventData) {
    const { type, title, description, startDate, endDate, allDay, recurring, reminderTime, relatedItems } = eventData;
    
    // Bestehende Daten laden
    const userData = this.getUserCalendarData(userId);
    
    // Neues Ereignis erstellen
    const newEvent = {
      id: `event-${Date.now()}`,
      type: type || 'custom',
      title: title || 'Untitled Event',
      description: description || '',
      startDate,
      endDate: endDate || startDate,
      allDay: allDay || false,
      recurring: recurring || null,
      reminderTime: reminderTime || null,
      relatedItems: relatedItems || [],
      completed: false,
      createdAt: new Date().toISOString()
    };
    
    // Zu Nutzerdaten hinzufügen
    userData.events.push(newEvent);
    
    // Speichern
    this.saveUserCalendarData(userId, userData);
    
    return newEvent;
  }

  // Aktualisiert ein bestehendes Kalenderereignis
  updateCalendarEvent(userId, eventId, updatedData) {
    const userData = this.getUserCalendarData(userId);
    
    const eventIndex = userData.events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
      return null;
    }
    
    // Ereignis aktualisieren
    const updatedEvent = {
      ...userData.events[eventIndex],
      ...updatedData,
      lastEdited: new Date().toISOString()
    };
    
    userData.events[eventIndex] = updatedEvent;
    
    // Speichern
    this.saveUserCalendarData(userId, userData);
    
    return updatedEvent;
  }

  // Löscht ein Kalenderereignis
  deleteCalendarEvent(userId, eventId) {
    const userData = this.getUserCalendarData(userId);
    
    const eventIndex = userData.events.findIndex(e => e.id === eventId);
    if (eventIndex === -1) {
      return false;
    }
    
    // Ereignis entfernen
    userData.events.splice(eventIndex, 1);
    
    // Speichern
    this.saveUserCalendarData(userId, userData);
    
    return true;
  }

  // Markiert ein Ereignis als abgeschlossen
  completeCalendarEvent(userId, eventId) {
    const userData = this.getUserCalendarData(userId);
    
    const event = userData.events.find(e => e.id === eventId);
    if (!event) {
      return null;
    }
    
    event.completed = true;
    event.completedAt = new Date().toISOString();
    
    // Speichern
    this.saveUserCalendarData(userId, userData);
    
    return event;
  }

  // Holt Ereignisse für einen bestimmten Zeitraum
  getEventsForRange(userId, startDate, endDate) {
    const userData = this.getUserCalendarData(userId);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return userData.events.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate || event.startDate);
      
      // Prüfen, ob das Ereignis im angegebenen Zeitraum liegt
      return (eventStart <= end && eventEnd >= start);
    });
  }

  // Holt Ereignisse für einen bestimmten Tag
  getEventsForDay(userId, date) {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);
    
    return this.getEventsForRange(userId, dayStart, dayEnd);
  }

  // Generiert Kalendervorschläge basierend auf Nutzeraktivitäten
  generateCalendarSuggestions(userId) {
    const userData = this.getUserCalendarData(userId);
    const journalData = this.getUserJournalData(userId);
    
    const suggestions = [];
    
    // Vorschlag für regelmäßige Reflexionen
    if (journalData.entries.filter(e => e.type === 'reflection').length > 0) {
      suggestions.push({
        type: 'reflection',
        title: 'Wöchentliche Reflexion',
        description: 'Zeit für deine wöchentliche Reflexion, um über deine Fortschritte nachzudenken.',
        recurring: { frequency: 'weekly', day: 'sunday' },
        allDay: false
      });
    }
    
    // Vorschlag für Cleanse-Tag
    const cleanseDayEntries = journalData.entries.filter(e => e.type === 'cleanse');
    if (cleanseDayEntries.length > 0) {
      suggestions.push({
        type: 'cleanse',
        title: 'Monatlicher Cleanse-Tag',
        description: 'Ein Tag zur Reinigung und Erneuerung.',
        recurring: { frequency: 'monthly', dayOfMonth: 1 },
        allDay: true
      });
    }
    
    // Vorschlag für Schattenarbeit
    if (journalData.entries.filter(e => e.type === 'shadow').length > 0) {
      suggestions.push({
        type: 'custom',
        title: 'Schattenarbeit-Session',
        description: 'Zeit für die Arbeit mit deinen Schattenaspekten.',
        recurring: { frequency: 'weekly', day: 'wednesday' },
        allDay: false
      });
    }
    
    return suggestions;
  }

  // Lädt Kalenderdaten eines Nutzers
  getUserCalendarData(userId) {
    const allData = localStorageUtil.getItem(this.CALENDAR_KEY) || {};
    
    if (!allData[userId]) {
      allData[userId] = {
        events: [],
        settings: {
          defaultView: 'week',
          defaultReminderTime: 30, // Minuten vor dem Ereignis
          startOfWeek: 'monday'
        }
      };
      
      localStorageUtil.setItem(this.CALENDAR_KEY, allData);
    }
    
    return allData[userId];
  }

  // Speichert Kalenderdaten eines Nutzers
  saveUserCalendarData(userId, userData) {
    const allData = localStorageUtil.getItem(this.CALENDAR_KEY) || {};
    allData[userId] = userData;
    localStorageUtil.setItem(this.CALENDAR_KEY, allData);
  }

  // Aktualisiert Kalendereinstellungen
  updateCalendarSettings(userId, settings) {
    const userData = this.getUserCalendarData(userId);
    
    userData.settings = {
      ...userData.settings,
      ...settings
    };
    
    this.saveUserCalendarData(userId, userData);
    
    return userData.settings;
  }
}

export default new JournalSystem();
