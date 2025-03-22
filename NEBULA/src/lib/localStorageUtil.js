// localStorage Utility für Datenpersistenz
const localStorageUtil = {
  // Speichern von Daten
  saveData: (key, data) => {
    try {
      const serializedData = JSON.stringify(data);
      localStorage.setItem(key, serializedData);
      return true;
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      return false;
    }
  },

  // Laden von Daten
  loadData: (key, defaultValue = null) => {
    try {
      const serializedData = localStorage.getItem(key);
      if (serializedData === null) {
        return defaultValue;
      }
      return JSON.parse(serializedData);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      return defaultValue;
    }
  },

  // Löschen von Daten
  removeData: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data from localStorage:', error);
      return false;
    }
  },

  // Alle Daten löschen
  clearAll: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  },

  // Exportieren aller Daten als JSON-Datei
  exportData: () => {
    try {
      const data = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('nebula_')) { // Nur Nebula-bezogene Daten exportieren
          data[key] = JSON.parse(localStorage.getItem(key));
        }
      }
      
      const dataStr = JSON.stringify(data, null, 2);
      const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
      
      const exportFileDefaultName = `nebula_odyssey_data_${new Date().toISOString().slice(0, 10)}.json`;
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      return true;
    } catch (error) {
      console.error('Error exporting data from localStorage:', error);
      return false;
    }
  },

  // Importieren von Daten aus JSON-Datei
  importData: (jsonData) => {
    try {
      const data = JSON.parse(jsonData);
      
      // Daten in localStorage speichern
      Object.keys(data).forEach(key => {
        localStorage.setItem(key, JSON.stringify(data[key]));
      });
      
      return true;
    } catch (error) {
      console.error('Error importing data to localStorage:', error);
      return false;
    }
  }
};

export default localStorageUtil;
