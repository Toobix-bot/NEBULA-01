// Währungssystem für Nebula Odyssey
import localStorageUtil from './localStorageUtil';

// Währungstypen
export const currencyTypes = {
  STARDUST: {
    id: 'stardust',
    name: 'Sternenstaub',
    description: 'Die Grundwährung in Nebula Odyssey, verdient durch tägliche Aktivitäten und kleine Erfolge.',
    icon: '✨',
    color: '#9CECFB'
  },
  COSMIC_ENERGY: {
    id: 'cosmic_energy',
    name: 'Kosmische Energie',
    description: 'Eine seltenere Währung, verdient durch bedeutende Erfolge und Meilensteine.',
    icon: '⚡',
    color: '#7E57C2'
  },
  NEBULA_ESSENCE: {
    id: 'nebula_essence',
    name: 'Nebel-Essenz',
    description: 'Die seltenste Währung, verdient durch außergewöhnliche Leistungen und langfristige Konsistenz.',
    icon: '🌌',
    color: '#FF4081'
  }
};

// Belohnungssätze für verschiedene Aktivitäten
export const rewardRates = {
  // Quest-Belohnungen
  QUEST_COMPLETION: {
    easy: { [currencyTypes.STARDUST.id]: 10 },
    medium: { [currencyTypes.STARDUST.id]: 25 },
    hard: { [currencyTypes.STARDUST.id]: 50, [currencyTypes.COSMIC_ENERGY.id]: 1 },
    epic: { [currencyTypes.STARDUST.id]: 100, [currencyTypes.COSMIC_ENERGY.id]: 5, [currencyTypes.NEBULA_ESSENCE.id]: 1 }
  },
  
  // Skill-Belohnungen
  SKILL_LEVEL_UP: {
    // Level 1-3
    low: { [currencyTypes.STARDUST.id]: 20 },
    // Level 4-7
    medium: { [currencyTypes.STARDUST.id]: 50, [currencyTypes.COSMIC_ENERGY.id]: 2 },
    // Level 8-10
    high: { [currencyTypes.STARDUST.id]: 100, [currencyTypes.COSMIC_ENERGY.id]: 5, [currencyTypes.NEBULA_ESSENCE.id]: 1 }
  },
  
  // Reflexions-Belohnungen
  REFLECTION_COMPLETION: {
    daily: { [currencyTypes.STARDUST.id]: 15 },
    weekly: { [currencyTypes.STARDUST.id]: 30, [currencyTypes.COSMIC_ENERGY.id]: 1 },
    monthly: { [currencyTypes.STARDUST.id]: 75, [currencyTypes.COSMIC_ENERGY.id]: 3, [currencyTypes.NEBULA_ESSENCE.id]: 1 }
  },
  
  // Errungenschafts-Belohnungen
  ACHIEVEMENT_UNLOCK: {
    common: { [currencyTypes.STARDUST.id]: 50 },
    rare: { [currencyTypes.STARDUST.id]: 100, [currencyTypes.COSMIC_ENERGY.id]: 3 },
    epic: { [currencyTypes.STARDUST.id]: 200, [currencyTypes.COSMIC_ENERGY.id]: 10, [currencyTypes.NEBULA_ESSENCE.id]: 2 }
  },
  
  // Konsistenz-Belohnungen
  STREAK_BONUS: {
    // 3 Tage in Folge
    short: { [currencyTypes.STARDUST.id]: 30 },
    // 7 Tage in Folge
    medium: { [currencyTypes.STARDUST.id]: 100, [currencyTypes.COSMIC_ENERGY.id]: 3 },
    // 30 Tage in Folge
    long: { [currencyTypes.STARDUST.id]: 300, [currencyTypes.COSMIC_ENERGY.id]: 15, [currencyTypes.NEBULA_ESSENCE.id]: 3 }
  }
};

// Kaufbare Items
export const purchasableItems = [
  // Universum-Erweiterungen
  {
    id: 'planet_customization',
    name: 'Planeten-Anpassung',
    description: 'Passe das Aussehen eines Planeten in deinem Universum an.',
    category: 'universe',
    price: { [currencyTypes.STARDUST.id]: 200, [currencyTypes.COSMIC_ENERGY.id]: 5 },
    unlockLevel: 1
  },
  {
    id: 'cosmic_event',
    name: 'Kosmisches Ereignis',
    description: 'Löse ein besonderes kosmisches Ereignis in deinem Universum aus.',
    category: 'universe',
    price: { [currencyTypes.STARDUST.id]: 300, [currencyTypes.COSMIC_ENERGY.id]: 10, [currencyTypes.NEBULA_ESSENCE.id]: 1 },
    unlockLevel: 2
  },
  {
    id: 'galaxy_expansion',
    name: 'Galaxie-Erweiterung',
    description: 'Erweitere dein Universum um eine neue Galaxie mit einzigartigen Eigenschaften.',
    category: 'universe',
    price: { [currencyTypes.STARDUST.id]: 1000, [currencyTypes.COSMIC_ENERGY.id]: 30, [currencyTypes.NEBULA_ESSENCE.id]: 5 },
    unlockLevel: 3
  },
  
  // Visuelle Anpassungen
  {
    id: 'theme_unlock',
    name: 'Neues Farbthema',
    description: 'Schalte ein neues Farbthema für deine Nebula Odyssey-Oberfläche frei.',
    category: 'customization',
    price: { [currencyTypes.STARDUST.id]: 150 },
    unlockLevel: 1
  },
  {
    id: 'avatar_unlock',
    name: 'Neuer Avatar',
    description: 'Schalte einen neuen Avatar für dein Profil frei.',
    category: 'customization',
    price: { [currencyTypes.STARDUST.id]: 100, [currencyTypes.COSMIC_ENERGY.id]: 3 },
    unlockLevel: 1
  },
  {
    id: 'animation_effects',
    name: 'Animations-Effekte',
    description: 'Schalte besondere Animationseffekte für deine Benutzeroberfläche frei.',
    category: 'customization',
    price: { [currencyTypes.STARDUST.id]: 250, [currencyTypes.COSMIC_ENERGY.id]: 8 },
    unlockLevel: 2
  },
  
  // Gameplay-Erweiterungen
  {
    id: 'quest_slot',
    name: 'Quest-Slot',
    description: 'Erhöhe die Anzahl der aktiven Quests, die du gleichzeitig verfolgen kannst.',
    category: 'gameplay',
    price: { [currencyTypes.STARDUST.id]: 300, [currencyTypes.COSMIC_ENERGY.id]: 10 },
    unlockLevel: 1
  },
  {
    id: 'skill_boost',
    name: 'Skill-Boost',
    description: 'Erhalte einen temporären XP-Boost für alle Skill-Fortschritte (24 Stunden).',
    category: 'gameplay',
    price: { [currencyTypes.STARDUST.id]: 200, [currencyTypes.COSMIC_ENERGY.id]: 5 },
    unlockLevel: 1
  },
  {
    id: 'reflection_insight',
    name: 'Reflexions-Einsicht',
    description: 'Erhalte tiefere und personalisierte Einsichten bei deiner nächsten Reflexion.',
    category: 'gameplay',
    price: { [currencyTypes.STARDUST.id]: 150, [currencyTypes.COSMIC_ENERGY.id]: 3 },
    unlockLevel: 1
  },
  {
    id: 'quest_reroll',
    name: 'Quest-Neuauswurf',
    description: 'Generiere eine neue Auswahl an vordefinierten Quests.',
    category: 'gameplay',
    price: { [currencyTypes.STARDUST.id]: 100 },
    unlockLevel: 1
  },
  
  // Premium-Funktionen
  {
    id: 'data_export',
    name: 'Erweiterter Datenexport',
    description: 'Exportiere deine Daten in verschiedenen Formaten mit detaillierten Analysen.',
    category: 'premium',
    price: { [currencyTypes.STARDUST.id]: 500, [currencyTypes.COSMIC_ENERGY.id]: 15, [currencyTypes.NEBULA_ESSENCE.id]: 2 },
    unlockLevel: 2
  },
  {
    id: 'ai_assistant',
    name: 'KI-Assistent',
    description: 'Schalte einen KI-Assistenten frei, der personalisierte Empfehlungen gibt.',
    category: 'premium',
    price: { [currencyTypes.STARDUST.id]: 800, [currencyTypes.COSMIC_ENERGY.id]: 25, [currencyTypes.NEBULA_ESSENCE.id]: 3 },
    unlockLevel: 3
  }
];

// Initialisiere Währungskonto
export const initializeCurrencyAccount = () => {
  const existingAccount = localStorageUtil.loadData('nebula_currency', null);
  
  if (existingAccount) {
    return existingAccount;
  }
  
  // Erstelle neues Konto mit Startwerten
  const newAccount = {
    [currencyTypes.STARDUST.id]: 100, // Startbonus
    [currencyTypes.COSMIC_ENERGY.id]: 3, // Startbonus
    [currencyTypes.NEBULA_ESSENCE.id]: 0,
    transactions: [],
    purchasedItems: []
  };
  
  localStorageUtil.saveData('nebula_currency', newAccount);
  return newAccount;
};

// Füge Währung hinzu
export const addCurrency = (type, amount, reason) => {
  if (!currencyTypes[type] && !Object.values(currencyTypes).find(ct => ct.id === type)) {
    return { success: false, message: "Ungültiger Währungstyp" };
  }
  
  const currencyId = currencyTypes[type]?.id || type;
  const account = localStorageUtil.loadData('nebula_currency', null) || initializeCurrencyAccount();
  
  // Aktualisiere Kontostand
  account[currencyId] = (account[currencyId] || 0) + amount;
  
  // Zeichne Transaktion auf
  account.transactions.push({
    type: 'credit',
    currencyId,
    amount,
    reason,
    timestamp: new Date().toISOString()
  });
  
  // Begrenze Transaktionshistorie auf 100 Einträge
  if (account.transactions.length > 100) {
    account.transactions = account.transactions.slice(-100);
  }
  
  localStorageUtil.saveData('nebula_currency', account);
  
  return {
    success: true,
    message: `${amount} ${currencyTypes[type]?.name || type} hinzugefügt`,
    newBalance: account[currencyId]
  };
};

// Ziehe Währung ab
export const subtractCurrency = (type, amount, reason) => {
  if (!currencyTypes[type] && !Object.values(currencyTypes).find(ct => ct.id === type)) {
    return { success: false, message: "Ungültiger Währungstyp" };
  }
  
  const currencyId = currencyTypes[type]?.id || type;
  const account = localStorageUtil.loadData('nebula_currency', null) || initializeCurrencyAccount();
  
  // Prüfe, ob genug Währung vorhanden ist
  if ((account[currencyId] || 0) < amount) {
    return { 
      success: false, 
      message: `Nicht genug ${currencyTypes[type]?.name || type}`,
      currentBalance: account[currencyId] || 0,
      missing: amount - (account[currencyId] || 0)
    };
  }
  
  // Aktualisiere Kontostand
  account[currencyId] -= amount;
  
  // Zeichne Transaktion auf
  account.transactions.push({
    type: 'debit',
    currencyId,
    amount: -amount,
    reason,
    timestamp: new Date().toISOString()
  });
  
  // Begrenze Transaktionshistorie auf 100 Einträge
  if (account.transactions.length > 100) {
    account.transactions = account.transactions.slice(-100);
  }
  
  localStorageUtil.saveData('nebula_currency', account);
  
  return {
    success: true,
    message: `${amount} ${currencyTypes[type]?.name || type} abgezogen`,
    newBalance: account[currencyId]
  };
};

// Kaufe Item
export const purchaseItem = (itemId) => {
  const item = purchasableItems.find(i => i.id === itemId);
  
  if (!item) {
    return { success: false, message: "Item nicht gefunden" };
  }
  
  const account = localStorageUtil.loadData('nebula_currency', null) || initializeCurrencyAccount();
  
  // Prüfe, ob Item bereits gekauft wurde
  if (account.purchasedItems.includes(itemId)) {
    return { success: false, message: "Item bereits gekauft" };
  }
  
  // Prüfe, ob genug Währung für alle Preiskomponenten vorhanden ist
  const insufficientCurrencies = [];
  
  for (const [currencyId, amount] of Object.entries(item.price)) {
    if ((account[currencyId] || 0) < amount) {
      const currency = Object.values(currencyTypes).find(ct => ct.id === currencyId);
      insufficientCurrencies.push({
        name: currency?.name || currencyId,
        current: account[currencyId] || 0,
        required: amount,
        missing: amount - (account[currencyId] || 0)
      });
    }
  }
  
  if (insufficientCurrencies.length > 0) {
    return {
      success: false,
      message: "Nicht genug Währung für diesen Kauf",
      insufficientCurrencies
    };
  }
  
  // Ziehe Währung ab
  for (const [currencyId, amount] of Object.entries(item.price)) {
    account[currencyId] -= amount;
    
    // Zeichne Transaktion auf
    account.transactions.push({
      type: 'purchase',
      currencyId,
      amount: -amount,
      reason: `Kauf: ${item.name}`,
      itemId,
      timestamp: new Date().toISOString()
    });
  }
  
  // Füge Item zu gekauften Items hinzu
  account.purchasedItems.push(itemId);
  
  localStorageUtil.saveData('nebula_currency', account);
  
  return {
    success: true,
    message: `${item.name} erfolgreich gekauft`,
    item
  };
};

// Belohne Benutzer für Aktivität
export const rewardActivity = (activityType, subType) => {
  if (!rewardRates[activityType] || !rewardRates[activityType][subType]) {
    return { success: false, message: "Ungültiger Aktivitätstyp oder Subtyp" };
  }
  
  const rewards = rewardRates[activityType][subType];
  const results = [];
  
  // Füge jede Währung hinzu
  for (const [currencyId, amount] of Object.entries(rewards)) {
    const result = addCurrency(
      currencyId,
      amount,
      `Belohnung: ${activityType} (${subType})`
    );
    
    results.push({
      currencyId,
      amount,
      success: result.success,
      newBalance: result.newBalance
    });
  }
  
  return {
    success: true,
    message: `Belohnung für ${activityType} (${subType}) erhalten`,
    rewards: results
  };
};

// Erhalte Kontostand
export const getAccountBalance = () => {
  const account = localStorageUtil.loadData('nebula_currency', null) || initializeCurrencyAccount();
  
  const balance = {};
  
  // Füge alle Währungstypen hinzu, auch wenn Kontostand 0 ist
  Object.values(currencyTypes).forEach(currency => {
    balance[currency.id] = account[currency.id] || 0;
  });
  
  return balance;
};

// Erhalte gekaufte Items
export const getPurchasedItems = () => {
  const account = localStorageUtil.loadData('nebula_currency', null) || initializeCurrencyAccount();
  
  return account.purchasedItems.map(itemId => {
    const item = purchasableItems.find(i => i.id === itemId);
    return item || { id: itemId, name: "Unbekanntes Item", description: "Dieses Item existiert nicht mehr." };
  });
};

// Erhalte Transaktionshistorie
export const getTransactionHistory = (limit = 10) => {
  const account = localStorageUtil.loadData('nebula_currency', null) || initializeCurrencyAccount();
  
  return account.transactions
    .slice(-limit)
    .reverse()
    .map(transaction => {
      const currency = Object.values(currencyTypes).find(ct => ct.id === transaction.currencyId);
      return {
        ...transaction,
        currencyName: currency?.name || transaction.currencyId,
        currencyIcon: currency?.icon || '💰'
      };
    });
};

// Erhalte verfügbare Items zum Kauf
export const getAvailableItems = (userLevel = 1) => {
  const account = localStorageUtil.loadData('nebula_currency', null) || initializeCurrencyAccount();
  
  return purchasableItems
    .filter(item => item.unlockLevel <= userLevel && !account.purchasedItems.includes(item.id))
    .map(item => {
      const affordability = {};
      let canAfford = true;
      
      for (const [currencyId, amount] of Object.entries(item.price)) {
        const currentAmount = account[currencyId] || 0;
        affordability[currencyId] = {
          required: amount,
          current: currentAmount,
          sufficient: currentAmount >= amount
        };
        
        if (currentAmount < amount) {
          canAfford = false;
        }
      }
      
      return {
        ...item,
        affordability,
        canAfford
      };
    });
};

export default {
  currencyTypes,
  rewardRates,
  purchasableItems,
  initializeCurrencyAccount,
  addCurrency,
  subtractCurrency,
  purchaseItem,
  rewardActivity,
  getAccountBalance,
  getPurchasedItems,
  getTransactionHistory,
  getAvailableItems
};
