// API Usage Control System für NEBULA ODYSSEY
// Implementiert Kostenkontrolle und Nutzungslimits für OpenAI API

import localStorageUtil from './localStorageUtil';

class ApiUsageControl {
  constructor() {
    this.MAX_DAILY_CALLS = 10; // Maximale API-Aufrufe pro Tag pro Benutzer
    this.STORAGE_KEY = 'nebula_api_usage';
  }

  // Initialisiert oder aktualisiert die Nutzungsdaten für einen Benutzer
  initUserData(userId) {
    const usageData = this.getAllUsageData();
    
    if (!usageData[userId]) {
      usageData[userId] = {
        dailyCalls: 0,
        lastReset: new Date().toISOString().split('T')[0], // Heutiges Datum im Format YYYY-MM-DD
        totalCalls: 0,
        history: []
      };
      this.saveUsageData(usageData);
    } else {
      // Prüfen, ob ein neuer Tag begonnen hat und ggf. den Zähler zurücksetzen
      this.checkAndResetDailyLimit(userId);
    }
    
    return usageData[userId];
  }

  // Prüft, ob der Benutzer das tägliche Limit erreicht hat
  canMakeApiCall(userId) {
    const userData = this.getUserData(userId);
    return userData.dailyCalls < this.MAX_DAILY_CALLS;
  }

  // Registriert einen API-Aufruf für einen Benutzer
  registerApiCall(userId, callType) {
    const usageData = this.getAllUsageData();
    const userData = this.getUserData(userId);
    
    // Täglichen Zähler erhöhen
    userData.dailyCalls += 1;
    userData.totalCalls += 1;
    
    // Aufruf in der Historie speichern
    userData.history.push({
      timestamp: new Date().toISOString(),
      type: callType
    });
    
    // Auf maximal 100 Einträge in der Historie begrenzen
    if (userData.history.length > 100) {
      userData.history = userData.history.slice(-100);
    }
    
    usageData[userId] = userData;
    this.saveUsageData(usageData);
    
    return userData;
  }

  // Prüft, ob ein neuer Tag begonnen hat und setzt ggf. den täglichen Zähler zurück
  checkAndResetDailyLimit(userId) {
    const usageData = this.getAllUsageData();
    const userData = usageData[userId] || this.initUserData(userId);
    const today = new Date().toISOString().split('T')[0];
    
    if (userData.lastReset !== today) {
      userData.dailyCalls = 0;
      userData.lastReset = today;
      usageData[userId] = userData;
      this.saveUsageData(usageData);
    }
    
    return userData;
  }

  // Gibt die Nutzungsdaten eines Benutzers zurück
  getUserData(userId) {
    return this.initUserData(userId);
  }

  // Gibt die Nutzungsdaten aller Benutzer zurück
  getAllUsageData() {
    return localStorageUtil.getItem(this.STORAGE_KEY) || {};
  }

  // Speichert die Nutzungsdaten
  saveUsageData(usageData) {
    localStorageUtil.setItem(this.STORAGE_KEY, usageData);
  }

  // Gibt die verbleibenden API-Aufrufe für einen Benutzer zurück
  getRemainingCalls(userId) {
    const userData = this.getUserData(userId);
    return Math.max(0, this.MAX_DAILY_LIMITS - userData.dailyCalls);
  }

  // Gibt Nutzungsstatistiken für einen Benutzer zurück
  getUserStats(userId) {
    const userData = this.getUserData(userId);
    return {
      dailyCalls: userData.dailyCalls,
      maxDailyCalls: this.MAX_DAILY_CALLS,
      remaining: this.MAX_DAILY_CALLS - userData.dailyCalls,
      totalCalls: userData.totalCalls,
      lastReset: userData.lastReset
    };
  }
}

export default new ApiUsageControl();
