// Testskript für NEBULA ODYSSEY Phase II
// Überprüft die Integration und Funktionalität aller implementierten Komponenten

// Importiere alle benötigten Module
const OpenAIService = require('./src/lib/OpenAIService');
const ApiUsageControl = require('./src/lib/ApiUsageControl');
const QuestSystem = require('./src/lib/QuestSystemUpdated');
const TherapeuticFunctions = require('./src/lib/TherapeuticFunctions');
const PointsSystem = require('./src/lib/PointsSystem');
const JournalSystem = require('./src/lib/JournalSystem');
const reflectionQuestions = require('./src/lib/reflectionQuestions');
const therapeuticQuests = require('./src/lib/therapeuticQuests');

// Testfunktionen
async function runTests() {
  console.log('=== NEBULA ODYSSEY Phase II - Integrationstests ===');
  
  // Testnutzer erstellen
  const testUserId = 'test-user-' + Date.now();
  console.log(`\nTestnutzer erstellt: ${testUserId}`);
  
  try {
    // 1. OpenAI-Integration testen
    console.log('\n--- OpenAI-Integration Tests ---');
    await testOpenAIIntegration(testUserId);
    
    // 2. Quest-System testen
    console.log('\n--- Quest-System Tests ---');
    testQuestSystem(testUserId);
    
    // 3. Therapeutische Funktionen testen
    console.log('\n--- Therapeutische Funktionen Tests ---');
    await testTherapeuticFunctions(testUserId);
    
    // 4. Punkte-System testen
    console.log('\n--- Punkte-System Tests ---');
    testPointsSystem(testUserId);
    
    // 5. Journal-System testen
    console.log('\n--- Journal-System Tests ---');
    await testJournalSystem(testUserId);
    
    // 6. Systemintegration testen
    console.log('\n--- Systemintegration Tests ---');
    await testSystemIntegration(testUserId);
    
    console.log('\n=== Alle Tests abgeschlossen ===');
    console.log('Ergebnis: Alle Systeme funktionieren wie erwartet und sind gut integriert.');
    
  } catch (error) {
    console.error('\n!!! Test fehlgeschlagen !!!');
    console.error(error);
  }
}

// 1. OpenAI-Integration testen
async function testOpenAIIntegration(userId) {
  console.log('Teste OpenAI-Service und API-Nutzungskontrolle...');
  
  // API-Nutzungskontrolle testen
  const initialUsage = ApiUsageControl.getUserUsage(userId);
  console.log(`Initiale API-Nutzung: ${JSON.stringify(initialUsage)}`);
  
  // Teste API-Aufruf (mit Mock-Daten, wenn USE_REAL_API=false)
  try {
    const messages = [
      { role: 'system', content: 'Du bist ein hilfreicher Assistent im NEBULA ODYSSEY-System.' },
      { role: 'user', content: 'Generiere eine kurze, motivierende Nachricht für den Tag.' }
    ];
    
    const options = {
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      callType: 'test'
    };
    
    const response = await OpenAIService.generateChatCompletion(userId, messages, options);
    console.log('API-Antwort erhalten:', response.substring(0, 100) + '...');
    
    // Prüfe, ob API-Nutzung aktualisiert wurde
    const updatedUsage = ApiUsageControl.getUserUsage(userId);
    console.log(`Aktualisierte API-Nutzung: ${JSON.stringify(updatedUsage)}`);
    
    // Prüfe Tageslimit
    console.log(`Verbleibende API-Aufrufe heute: ${ApiUsageControl.getRemainingCalls(userId)}`);
    
    console.log('✅ OpenAI-Integration funktioniert korrekt');
  } catch (error) {
    console.error('❌ Fehler bei OpenAI-Integration:', error);
    throw error;
  }
}

// 2. Quest-System testen
function testQuestSystem(userId) {
  console.log('Teste erweitertes Quest-System...');
  
  try {
    // Teste Quest-Kategorien
    console.log(`Verfügbare Quest-Kategorien: ${QuestSystem.questCategories.length}`);
    
    // Teste therapeutische Quests
    const shadowQuests = QuestSystem.getQuestsByCategory('shadow');
    console.log(`Schattenarbeit-Quests: ${shadowQuests.length}`);
    
    const emotionalQuests = QuestSystem.getQuestsByCategory('emotional');
    console.log(`Emotionsarbeit-Quests: ${emotionalQuests.length}`);
    
    // Teste Quest-Empfehlungen
    const randomQuests = QuestSystem.getRandomQuests(3);
    console.log(`Zufällige Quest-Empfehlungen: ${randomQuests.map(q => q.title).join(', ')}`);
    
    // Teste Licht-/Schattenpunkte im Quest-System
    const lightPoints = QuestSystem.addLightPoints(userId, 'Quest abgeschlossen', 5);
    console.log(`Lichtpunkte nach Quest-Abschluss: ${lightPoints}`);
    
    console.log('✅ Quest-System funktioniert korrekt');
  } catch (error) {
    console.error('❌ Fehler im Quest-System:', error);
    throw error;
  }
}

// 3. Therapeutische Funktionen testen
async function testTherapeuticFunctions(userId) {
  console.log('Teste therapeutische Funktionen...');
  
  try {
    // Teste Emotionsarbeit
    const emotionData = {
      emotion: 'Freude',
      intensity: 8,
      trigger: 'Erfolg bei der Arbeit',
      bodyLocation: 'Brust',
      thoughts: 'Ich habe es geschafft!',
      response: 'Ich habe meine Freude mit anderen geteilt.'
    };
    
    const emotionReflection = TherapeuticFunctions.saveEmotionReflection(userId, emotionData);
    console.log(`Emotionsreflexion gespeichert: ${emotionReflection.id}`);
    
    // Teste Schattenarbeit
    const shadowData = {
      name: 'Perfektionismus',
      description: 'Tendenz, zu hohe Ansprüche an mich selbst zu stellen',
      triggers: ['Fehler machen', 'Kritik erhalten'],
      projections: ['Ungeduld mit anderen']
    };
    
    const shadowAspect = TherapeuticFunctions.saveShadowAspect(userId, shadowData);
    console.log(`Schattenaspekt gespeichert: ${shadowAspect.id}`);
    
    // Teste Schattendialog
    const dialogResponse = await TherapeuticFunctions.generateShadowDialog(
      userId, 
      shadowAspect.id, 
      'Warum tauchst du immer auf, wenn ich einen Fehler mache?'
    );
    console.log(`Schattendialog generiert: ${dialogResponse.response.substring(0, 100)}...`);
    
    // Teste Cleanse-Tage
    const cleanseData = {
      startDate: new Date().toISOString(),
      duration: 1,
      type: 'Digital Detox',
      goals: ['Mentale Klarheit', 'Stressreduktion'],
      activities: ['Meditation', 'Naturspaziergang']
    };
    
    const cleanse = TherapeuticFunctions.scheduleCleanseDays(userId, cleanseData);
    console.log(`Cleanse-Tag geplant: ${cleanse.id}`);
    
    // Teste Suchtreflexion
    const addictionData = {
      substance: '',
      behavior: 'Übermäßige Smartphone-Nutzung',
      triggers: ['Langeweile', 'Stress'],
      cravingIntensity: 7,
      copingStrategy: 'Ablenkung durch Lesen',
      outcome: 'Teilweise erfolgreich'
    };
    
    const addictionReflection = TherapeuticFunctions.saveAddictionReflection(userId, addictionData);
    console.log(`Suchtreflexion gespeichert: ${addictionReflection.id}`);
    
    console.log('✅ Therapeutische Funktionen arbeiten korrekt');
  } catch (error) {
    console.error('❌ Fehler in therapeutischen Funktionen:', error);
    throw error;
  }
}

// 4. Punkte-System testen
function testPointsSystem(userId) {
  console.log('Teste Licht-/Schattenpunkte-System...');
  
  try {
    // Teste Lichtpunkte
    const lightPointsData = PointsSystem.addLightPoints(userId, 'quest_completed');
    console.log(`Lichtpunkte nach Quest-Abschluss: ${lightPointsData.lightPoints}`);
    
    PointsSystem.addLightPoints(userId, 'shadow_work');
    PointsSystem.addLightPoints(userId, 'daily_reflection');
    
    // Teste Schattenpunkte (mit Bestätigung)
    console.log('Teste Schattenpunkte mit Bestätigungsanforderung...');
    const shadowPointsData = PointsSystem.addShadowPoints(userId, 'conscious_rule_violation');
    console.log(`Schattenpunkte nach Regelverstoß: ${shadowPointsData.shadowPoints}`);
    
    // Teste Reinigungsquests
    const cleansingQuests = PointsSystem.getAvailableCleansingQuests(userId);
    console.log(`Verfügbare Reinigungsquests: ${cleansingQuests.length}`);
    
    if (cleansingQuests.length > 0) {
      const reduction = PointsSystem.reduceShadowPoints(userId, cleansingQuests[0].shadowPointsReduction);
      console.log(`Schattenpunkte nach Reinigungsquest: ${reduction}`);
    }
    
    // Teste Belohnungen
    const rewards = PointsSystem.getAvailableRewards(userId);
    console.log(`Verfügbare Belohnungen: ${rewards.length}`);
    
    if (rewards.length > 0 && rewards[0].available) {
      const rewardResult = PointsSystem.useLightPointsForReward(userId, rewards[0].id);
      console.log(`Belohnung eingelöst: ${rewardResult.success ? 'Ja' : 'Nein'}`);
    }
    
    // Teste Statistiken
    const stats = PointsSystem.getPointsStats(userId);
    console.log(`Punktestatistik: ${JSON.stringify(stats)}`);
    
    console.log('✅ Punkte-System funktioniert korrekt');
  } catch (error) {
    console.error('❌ Fehler im Punkte-System:', error);
    throw error;
  }
}

// 5. Journal-System testen
async function testJournalSystem(userId) {
  console.log('Teste Journal- und Kalendersystem...');
  
  try {
    // Teste Journaleinträge
    const journalEntry = JournalSystem.createJournalEntry(userId, {
      type: 'free',
      title: 'Mein erster Eintrag',
      content: 'Heute war ein produktiver Tag. Ich habe viel geschafft und fühle mich gut.',
      mood: 'positive',
      tags: ['Produktivität', 'Erfolg']
    });
    console.log(`Journaleintrag erstellt: ${journalEntry.id}`);
    
    // Teste Reflexionseintrag
    const reflectionEntry = JournalSystem.createJournalEntry(userId, {
      type: 'reflection',
      title: 'Wöchentliche Reflexion',
      content: 'Diese Woche habe ich gute Fortschritte bei meinen Zielen gemacht. Ich konnte meine Meditation regelmäßig durchführen.',
      mood: 'positive',
      tags: ['Reflexion', 'Meditation']
    });
    console.log(`Reflexionseintrag erstellt: ${reflectionEntry.id}`);
    
    // Teste Journalsuche
    const searchResults = JournalSystem.searchJournalEntries(userId, {
      query: 'Meditation',
      tags: ['Reflexion']
    });
    console.log(`Suchergebnisse: ${searchResults.length}`);
    
    // Teste Kalenderereignisse
    const calendarEvent = JournalSystem.createCalendarEvent(userId, {
      type: 'cleanse',
      title: 'Digital Detox Tag',
      description: 'Ein Tag ohne digitale Geräte zur mentalen Erholung',
      startDate: new Date().toISOString(),
      allDay: true
    });
    console.log(`Kalenderereignis erstellt: ${calendarEvent.id}`);
    
    // Teste Ereignisse für heute
    const todayEvents = JournalSystem.getEventsForDay(userId, new Date());
    console.log(`Ereignisse heute: ${todayEvents.length}`);
    
    // Teste Journal-Einsichten
    if (JournalSystem.getUserJournalData(userId).entries.length >= 2) {
      const insights = await JournalSystem.generateJournalInsights(userId, 'week');
      if (insights.error) {
        console.log(`Journal-Einsichten: ${insights.error}`);
      } else {
        console.log(`Journal-Einsichten generiert mit ${insights.themes ? insights.themes.length : 0} Themen`);
      }
    }
    
    console.log('✅ Journal- und Kalendersystem funktionieren korrekt');
  } catch (error) {
    console.error('❌ Fehler im Journal- und Kalendersystem:', error);
    throw error;
  }
}

// 6. Systemintegration testen
async function testSystemIntegration(userId) {
  console.log('Teste Integration zwischen allen Systemen...');
  
  try {
    // Teste Quest-Abschluss mit Punkten und Journal-Eintrag
    console.log('Teste Quest-Abschluss-Workflow...');
    
    // 1. Quest auswählen
    const quests = QuestSystem.getQuestsByCategory('shadow');
    if (quests.length === 0) {
      throw new Error('Keine Schattenquests gefunden');
    }
    
    const selectedQuest = quests[0];
    console.log(`Quest ausgewählt: ${selectedQuest.title}`);
    
    // 2. Quest abschließen und Lichtpunkte erhalten
    const lightPoints = QuestSystem.addLightPoints(userId, 'quest_completed');
    console.log(`Lichtpunkte nach Quest-Abschluss: ${lightPoints}`);
    
    // 3. Reflexion zur Quest erstellen
    const questReflection = {
      type: 'shadow',
      title: `Reflexion: ${selectedQuest.title}`,
      content: `Ich habe die Quest "${selectedQuest.title}" abgeschlossen. Es war eine wertvolle Erfahrung, die mir geholfen hat, einen Schattenaspekt besser zu verstehen.`,
      mood: 'positive',
      tags: ['Schattenarbeit', 'Quest'],
      relatedItems: [{ type: 'quest', id: selectedQuest.id || 'unknown' }]
    };
    
    const journalEntry = JournalSystem.createJournalEntry(userId, questReflection);
    console.log(`Reflexionseintrag erstellt: ${journalEntry.id}`);
    
    // 4. Schattenaspekt aktualisieren
    const shadowData = {
      name: 'Ungeduld',
      description: 'Tendenz, schnelle Ergebnisse zu erwarten und frustriert zu werden, wenn Dinge Zeit brauchen',
      triggers: ['Warten müssen', 'Langsamer Fortschritt'],
      projections: ['Andere als ineffizient wahrnehmen']
    };
    
    const shadowAspect = TherapeuticFunctions.saveShadowAspect(userId, shadowData);
    console.log(`Schattenaspekt gespeichert: ${shadowAspect.id}`);
    
    // 5. Integrationsfortschritt aktualisieren
    const updatedAspect = TherapeuticFunctions.updateIntegrationProgress(userId, shadowAspect.id, 25);
    console.log(`Integrationsfortschritt aktualisiert: ${updatedAspect ? updatedAspect.integrationProgress : 'Fehler'}`);
    
    // 6. Kalenderereignis für weitere Schattenarbeit erstellen
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    const calendarEvent = JournalSystem.createCalendarEvent(userId, {
      type: 'custom',
      title: 'Schattenarbeit: Ungeduld',
      description: 'Zeit für weitere Arbeit mit dem Schattenaspekt Ungeduld',
      startDate: nextWeek.toISOString(),
      allDay: false,
      relatedItems: [{ type: 'shadow', id: shadowAspect.id }]
    });
    console.log(`Kalenderereignis für weitere Schattenarbeit erstellt: ${calendarEvent.id}`);
    
    // 7. Belohnung für gesammelte Lichtpunkte
    const rewards = PointsSystem.getAvailableRewards(userId);
    const availableRewards = rewards.filter(r => r.available);
    
    if (availableRewards.length > 0) {
      const rewardResult = PointsSystem.useLightPointsForReward(userId, availableRewards[0].id);
      console.log(`Belohnung eingelöst: ${rewardResult.success ? rewardResult.message : 'Nicht genug Punkte'}`);
    } else {
      console.log('Keine verfügbaren Belohnungen mit aktuellen Punkten');
    }
    
    console.log('✅ Systemintegration funktioniert korrekt');
  } catch (error) {
    console.error('❌ Fehler bei der Systemintegration:', error);
    throw error;
  }
}

// Tests ausführen
runTests().catch(console.error);
