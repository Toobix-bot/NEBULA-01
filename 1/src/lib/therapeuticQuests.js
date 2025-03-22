// Therapeutische Quests für NEBULA ODYSSEY
// Fokus auf Schattenarbeit, emotionale Reflexion, Cleanse-Tage und Suchtreflexion

const therapeuticQuests = {
  shadow: [
    {
      id: "shadow-1",
      title: "Trigger-Tagebuch führen",
      description: "Führe ein Tagebuch über Situationen, die starke emotionale Reaktionen in dir auslösen. Notiere die Situation, deine Reaktion und mögliche Verbindungen zu deinen Schattenaspekten.",
      difficulty: "Mittel",
      type: "daily",
      estimatedTime: "15 Min",
      xp: 75,
      lightPoints: 3,
      tags: ["Schattenarbeit", "Selbstreflexion", "Emotionen"]
    },
    {
      id: "shadow-2",
      title: "Dialog mit dem Schatten",
      description: "Führe einen schriftlichen Dialog mit einem Schattenaspekt deiner Persönlichkeit. Stelle Fragen, höre zu und versuche, seine Motivation zu verstehen.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "30 Min",
      xp: 150,
      lightPoints: 5,
      tags: ["Schattenarbeit", "Tiefenpsychologie", "Integration"]
    },
    {
      id: "shadow-3",
      title: "Spiegelarbeit",
      description: "Identifiziere eine Eigenschaft, die dich an anderen Menschen stört. Reflektiere, wie diese Eigenschaft ein Spiegel für einen verdrängten Aspekt deiner selbst sein könnte.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "20 Min",
      xp: 125,
      lightPoints: 4,
      tags: ["Schattenarbeit", "Projektion", "Selbsterkenntnis"]
    },
    {
      id: "shadow-4",
      title: "Traumanalyse",
      description: "Notiere einen wiederkehrenden Traum oder einen besonders intensiven Traum und analysiere mögliche Verbindungen zu deinen Schattenaspekten.",
      difficulty: "Mittel",
      type: "daily",
      estimatedTime: "20 Min",
      xp: 100,
      lightPoints: 3,
      tags: ["Schattenarbeit", "Traumdeutung", "Unbewusstes"]
    },
    {
      id: "shadow-5",
      title: "Schattenaspekt integrieren",
      description: "Wähle einen identifizierten Schattenaspekt und entwickle einen konkreten Plan, wie du seine Energie konstruktiv in dein Leben integrieren kannst.",
      difficulty: "Episch",
      type: "longterm",
      estimatedTime: "30 Tage",
      xp: 500,
      lightPoints: 20,
      tags: ["Schattenarbeit", "Integration", "Transformation"]
    }
  ],
  
  emotional: [
    {
      id: "emotion-1",
      title: "Emotionales Tagebuch",
      description: "Führe ein Tagebuch über deine Emotionen während des Tages. Notiere die Emotion, den Auslöser und deine Reaktion.",
      difficulty: "Leicht",
      type: "daily",
      estimatedTime: "10 Min",
      xp: 50,
      lightPoints: 2,
      tags: ["Emotionsarbeit", "Selbstwahrnehmung", "Achtsamkeit"]
    },
    {
      id: "emotion-2",
      title: "Körperliche Manifestation von Emotionen",
      description: "Beobachte, wie sich verschiedene Emotionen körperlich manifestieren. Wo spürst du Angst, Freude, Wut oder Trauer in deinem Körper?",
      difficulty: "Mittel",
      type: "daily",
      estimatedTime: "15 Min",
      xp: 75,
      lightPoints: 3,
      tags: ["Emotionsarbeit", "Körperbewusstsein", "Achtsamkeit"]
    },
    {
      id: "emotion-3",
      title: "Emotionale Trigger identifizieren",
      description: "Identifiziere drei Situationen oder Verhaltensweisen, die regelmäßig starke emotionale Reaktionen in dir auslösen, und reflektiere über deren Ursprung.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "30 Min",
      xp: 150,
      lightPoints: 5,
      tags: ["Emotionsarbeit", "Trigger", "Selbsterkenntnis"]
    },
    {
      id: "emotion-4",
      title: "Emotionsregulation üben",
      description: "Lerne und übe eine Technik zur Emotionsregulation (z.B. tiefes Atmen, Bodyscan, Grounding) und wende sie in einer emotional herausfordernden Situation an.",
      difficulty: "Mittel",
      type: "daily",
      estimatedTime: "15 Min",
      xp: 100,
      lightPoints: 4,
      tags: ["Emotionsarbeit", "Regulation", "Bewältigungsstrategien"]
    },
    {
      id: "emotion-5",
      title: "Emotionale Intelligenz entwickeln",
      description: "Arbeite über einen Monat hinweg daran, deine emotionale Intelligenz zu verbessern, indem du täglich Übungen zur Selbstwahrnehmung, Empathie und Emotionsregulation durchführst.",
      difficulty: "Episch",
      type: "longterm",
      estimatedTime: "30 Tage",
      xp: 450,
      lightPoints: 18,
      tags: ["Emotionsarbeit", "Emotionale Intelligenz", "Persönliches Wachstum"]
    }
  ],
  
  cleanse: [
    {
      id: "cleanse-1",
      title: "Digitaler Detox Tag",
      description: "Verbringe einen Tag ohne digitale Geräte (oder mit minimaler Nutzung) und fokussiere dich auf analoge Aktivitäten und Selbstreflexion.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "1 Tag",
      xp: 200,
      lightPoints: 8,
      shadowPoints: -5,
      tags: ["Cleanse", "Digital Detox", "Achtsamkeit"]
    },
    {
      id: "cleanse-2",
      title: "Mentales Aufräumen",
      description: "Nimm dir Zeit, um mentalen Ballast loszulassen. Schreibe belastende Gedanken auf und entscheide bewusst, welche du loslassen möchtest.",
      difficulty: "Mittel",
      type: "weekly",
      estimatedTime: "30 Min",
      xp: 125,
      lightPoints: 5,
      shadowPoints: -3,
      tags: ["Cleanse", "Mentale Gesundheit", "Loslassen"]
    },
    {
      id: "cleanse-3",
      title: "Umgebungs-Cleanse",
      description: "Räume deinen physischen Raum auf und organisiere ihn neu. Entferne Dinge, die keine Freude oder keinen Nutzen mehr bringen.",
      difficulty: "Mittel",
      type: "weekly",
      estimatedTime: "2 Std",
      xp: 150,
      lightPoints: 6,
      shadowPoints: -4,
      tags: ["Cleanse", "Organisation", "Minimalismus"]
    },
    {
      id: "cleanse-4",
      title: "Beziehungs-Cleanse",
      description: "Reflektiere über deine Beziehungen und identifiziere solche, die toxisch oder nicht mehr förderlich sind. Entwickle einen Plan, diese zu transformieren oder loszulassen.",
      difficulty: "Schwer",
      type: "longterm",
      estimatedTime: "2 Wochen",
      xp: 300,
      lightPoints: 10,
      shadowPoints: -7,
      tags: ["Cleanse", "Beziehungen", "Grenzen setzen"]
    },
    {
      id: "cleanse-5",
      title: "7-Tage-Reinigungsprogramm",
      description: "Führe ein 7-tägiges ganzheitliches Reinigungsprogramm durch, das Ernährung, Bewegung, Meditation und digitalen Detox kombiniert.",
      difficulty: "Episch",
      type: "longterm",
      estimatedTime: "7 Tage",
      xp: 500,
      lightPoints: 25,
      shadowPoints: -15,
      tags: ["Cleanse", "Ganzheitlich", "Transformation"]
    }
  ],
  
  addiction: [
    {
      id: "addiction-1",
      title: "Trigger-Bewusstsein",
      description: "Identifiziere und dokumentiere Situationen, Emotionen oder Gedanken, die Verlangen nach deinem Suchtmittel oder -verhalten auslösen.",
      difficulty: "Mittel",
      type: "daily",
      estimatedTime: "15 Min",
      xp: 75,
      lightPoints: 3,
      tags: ["Suchtbewältigung", "Selbstwahrnehmung", "Trigger"]
    },
    {
      id: "addiction-2",
      title: "Alternative Bewältigungsstrategien",
      description: "Entwickle und übe drei gesunde Alternativen, um mit Stress oder negativen Emotionen umzugehen, anstatt zum Suchtmittel zu greifen.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "1 Woche",
      xp: 200,
      lightPoints: 8,
      tags: ["Suchtbewältigung", "Bewältigungsstrategien", "Selbstfürsorge"]
    },
    {
      id: "addiction-3",
      title: "Abstinenz-Tracking",
      description: "Führe ein Tagebuch über deine abstinenten Tage und reflektiere über Erfolge, Herausforderungen und Erkenntnisse.",
      difficulty: "Mittel",
      type: "daily",
      estimatedTime: "10 Min",
      xp: 50,
      lightPoints: 2,
      tags: ["Suchtbewältigung", "Tracking", "Motivation"]
    },
    {
      id: "addiction-4",
      title: "Notfallplan erstellen",
      description: "Erstelle einen detaillierten Notfallplan für Momente, in denen das Verlangen besonders stark ist, mit konkreten Schritten und Kontaktpersonen.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "45 Min",
      xp: 150,
      lightPoints: 6,
      tags: ["Suchtbewältigung", "Planung", "Krisenintervention"]
    },
    {
      id: "addiction-5",
      title: "30-Tage-Challenge",
      description: "Verpflichte dich zu 30 Tagen Abstinenz von deinem Suchtmittel oder -verhalten, mit täglicher Reflexion und Unterstützung.",
      difficulty: "Episch",
      type: "longterm",
      estimatedTime: "30 Tage",
      xp: 600,
      lightPoints: 30,
      tags: ["Suchtbewältigung", "Challenge", "Transformation"]
    }
  ],
  
  shadow_trials: [
    {
      id: "shadowtrial-1",
      title: "Konfrontation mit der Angst",
      description: "Identifiziere eine Angst, die dich zurückhält, und unternimm einen konkreten Schritt, um dich ihr zu stellen.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "Variiert",
      xp: 250,
      lightPoints: 10,
      shadowPoints: -8,
      tags: ["Schattenprüfung", "Angst", "Mut"]
    },
    {
      id: "shadowtrial-2",
      title: "Das Verborgene enthüllen",
      description: "Teile einen Aspekt von dir, den du normalerweise verbirgst, mit einer vertrauten Person und reflektiere über die Erfahrung.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "1 Std",
      xp: 200,
      lightPoints: 8,
      shadowPoints: -6,
      tags: ["Schattenprüfung", "Verletzlichkeit", "Authentizität"]
    },
    {
      id: "shadowtrial-3",
      title: "Grenzen setzen",
      description: "Identifiziere eine Situation, in der du Grenzen setzen musst, und tue dies auf respektvolle, aber bestimmte Weise.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "Variiert",
      xp: 200,
      lightPoints: 8,
      shadowPoints: -6,
      tags: ["Schattenprüfung", "Grenzen", "Selbstbehauptung"]
    },
    {
      id: "shadowtrial-4",
      title: "Der innere Kritiker",
      description: "Führe einen Dialog mit deinem inneren Kritiker, verstehe seine Motivation und transformiere seine Energie in konstruktives Feedback.",
      difficulty: "Schwer",
      type: "weekly",
      estimatedTime: "30 Min",
      xp: 175,
      lightPoints: 7,
      shadowPoints: -5,
      tags: ["Schattenprüfung", "Innerer Kritiker", "Selbstmitgefühl"]
    },
    {
      id: "shadowtrial-5",
      title: "Die große Schattenintegration",
      description: "Durchlaufe einen intensiven Prozess der Schattenintegration, der Reflexion, kreative Ausdrucksformen und konkrete Handlungen umfasst.",
      difficulty: "Episch",
      type: "longterm",
      estimatedTime: "30 Tage",
      xp: 750,
      lightPoints: 40,
      shadowPoints: -25,
      tags: ["Schattenprüfung", "Integration", "Transformation"]
    }
  ]
};

export default therapeuticQuests;
