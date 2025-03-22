# Nebula Odyssey System Dokumentation

## Übersicht

Nebula Odyssey ist ein gamifiziertes persönliches Entwicklungssystem mit Weltraum-Thema. Es transformiert persönliche Entwicklung in ein interaktives Weltraum-Abenteuer, bei dem Benutzer durch verschiedene Planeten navigieren, die verschiedene Lebensbereiche repräsentieren (Produktivität, mentale Stärke, soziale Fähigkeiten).

Das System wurde als Next.js-Webanwendung mit React implementiert und bietet verschiedene Funktionen wie XP-Mechaniken, Skill-Leveling, personalisierte Herausforderungen und Komponenten für Schattenarbeit.

## Systemarchitektur

### Frontend
- **Framework**: Next.js mit React
- **Styling**: CSS mit benutzerdefinierten Klassen (kein Tailwind CSS in der aktuellen Version)
- **UI-Komponenten**: Benutzerdefinierte React-Komponenten (Navbar, Hero, Layout, Footer)

### Backend
- **API-Routen**: Next.js API-Routen für Skills, Quests, Reflexion und Benutzerauthentifizierung
- **Datenbank**: Keine echte Datenbankintegration in der aktuellen Version (Mock-Daten werden verwendet)

### KI-Integration
- **SkillAI**: Modul zur Generierung von Skill-Empfehlungen und -Analysen
- **QuestAI**: Modul zur Generierung von Quest-Empfehlungen
- **ReflectionAI**: Modul zur Analyse von Benutzerreflexionen und Generierung von Einsichten

## Hauptfunktionen

### 1. Skills-Tracking
- Benutzer können verschiedene Lebensfähigkeiten verfolgen und verbessern
- Fähigkeiten sind in Kategorien organisiert
- Levelaufstiege durch XP-Sammlung

### 2. Quest-System
- Tägliche, wöchentliche und langfristige Quests
- Verschiedene Schwierigkeitsgrade und XP-Belohnungen
- Personalisierte Quest-Empfehlungen basierend auf Benutzeraktivitäten

### 3. Reflexion
- Geführte Reflexionsübungen
- Stimmungs- und Gedankenanalyse
- Personalisierte Einsichten und Empfehlungen

### 4. Therapeutische Komponenten
- Spezielle Module für Suchtbewältigung und Schizophrenie-Management
- Achtsamkeitsübungen und Selbsthilferessourcen

### 5. ChatGPT-Integration
- Nutzung von OpenAI-API für personalisierte Inhalte
- KI-gestützte Empfehlungen und Analysen

## Seitenstruktur

1. **Startseite (index.js)**: Einführung in das System mit Hero-Bereich und Funktionsübersicht
2. **Dashboard (dashboard.js)**: Übersicht über Benutzerfortschritt, Statistiken und aktuelle Quests
3. **Skills (skills.js)**: Verwaltung und Tracking von Fähigkeiten
4. **Quests (quests.js)**: Verwaltung von täglichen, wöchentlichen und langfristigen Quests
5. **Reflexion (reflection.js)**: Geführte Reflexionsübungen und -analysen
6. **Therapeutisch (therapeutic.js)**: Therapeutische Übungen und Ressourcen
7. **ChatGPT-Integration (chatgpt-integration.js)**: KI-gestützte Funktionen
8. **Dankbarkeit (gratitude.js)**: Dankbarkeitsübungen und -journal
9. **Über (about.js)**: Informationen über das System und seine Philosophie

## Design

Die verbesserte Version des Systems verwendet ein helleres Farbschema mit:
- Hellere Hintergrundfarben
- Verbesserte Lesbarkeit
- Weltraum-Thema mit Sternen-Hintergrund
- Responsive Design für verschiedene Bildschirmgrößen

## Aktuelle Einschränkungen

1. **Keine echte Datenbankintegration**: Das System verwendet derzeit Mock-Daten anstelle einer echten Datenbank
2. **Begrenzte Funktionalität**: Einige Schaltflächen und Funktionen sind nicht vollständig implementiert
3. **Keine Benutzerauthentifizierung**: Kein echtes Login-System implementiert
4. **Keine Offline-Funktionalität**: Das System funktioniert nur online
5. **Keine Datenexport/Import-Funktionen**: Keine Möglichkeit, Daten zu sichern oder zu übertragen
