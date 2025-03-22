// Verbesserte Reflexionsanalyse mit robusterer Fehlerbehandlung
import localStorageUtil from './localStorageUtil';

// Reflexionstypen
export const reflectionTypes = [
  {
    id: "daily",
    name: "Tägliche Reflexion",
    description: "Eine kurze tägliche Reflexion über deinen Tag, deine Stimmung und deine Fortschritte.",
    prompts: [
      "Wie fühlst du dich heute?",
      "Was ist heute gut gelaufen?",
      "Was hättest du heute besser machen können?",
      "Worauf freust du dich morgen?"
    ],
    minLength: 20,
    recommendedLength: 100,
    xpReward: 50
  },
  {
    id: "weekly",
    name: "Wöchentliche Reflexion",
    description: "Eine tiefere Reflexion über deine Woche, deine Fortschritte und deine Ziele.",
    prompts: [
      "Was waren deine größten Erfolge diese Woche?",
      "Welche Herausforderungen hast du diese Woche erlebt?",
      "Wie hast du dich deinen Zielen angenähert?",
      "Was möchtest du nächste Woche anders machen?"
    ],
    minLength: 50,
    recommendedLength: 200,
    xpReward: 100
  },
  {
    id: "monthly",
    name: "Monatliche Reflexion",
    description: "Eine umfassende Reflexion über deinen Monat, deine Fortschritte und deine langfristigen Ziele.",
    prompts: [
      "Wie zufrieden bist du mit deinem Fortschritt in diesem Monat?",
      "Welche neuen Erkenntnisse hast du gewonnen?",
      "Wie haben sich deine Prioritäten verändert?",
      "Welche Ziele möchtest du im nächsten Monat verfolgen?"
    ],
    minLength: 100,
    recommendedLength: 300,
    xpReward: 200
  },
  {
    id: "goal",
    name: "Ziel-Reflexion",
    description: "Eine fokussierte Reflexion über ein bestimmtes Ziel und deinen Fortschritt dazu.",
    prompts: [
      "Welches Ziel möchtest du reflektieren?",
      "Wie zufrieden bist du mit deinem Fortschritt?",
      "Was hat dir geholfen, diesem Ziel näher zu kommen?",
      "Was hat dich zurückgehalten?",
      "Wie kannst du deine Strategie anpassen?"
    ],
    minLength: 50,
    recommendedLength: 200,
    xpReward: 100
  },
  {
    id: "challenge",
    name: "Herausforderungs-Reflexion",
    description: "Eine Reflexion über eine spezifische Herausforderung oder ein Problem, dem du gegenüberstehst.",
    prompts: [
      "Welche Herausforderung möchtest du reflektieren?",
      "Wie hat diese Herausforderung dich beeinflusst?",
      "Welche Strategien hast du ausprobiert?",
      "Was hast du aus dieser Situation gelernt?",
      "Wie wirst du ähnliche Situationen in Zukunft angehen?"
    ],
    minLength: 50,
    recommendedLength: 200,
    xpReward: 100
  },
  {
    id: "gratitude",
    name: "Dankbarkeits-Reflexion",
    description: "Eine Reflexion über Dinge, für die du dankbar bist, um Positivität und Wertschätzung zu fördern.",
    prompts: [
      "Wofür bist du heute dankbar?",
      "Welche Menschen haben einen positiven Einfluss auf dein Leben?",
      "Welche kleinen Freuden hast du heute erlebt?",
      "Wie kannst du mehr Dankbarkeit in deinen Alltag integrieren?"
    ],
    minLength: 30,
    recommendedLength: 150,
    xpReward: 75
  }
];

// Stimmungskategorien
export const moodCategories = [
  {
    id: "great",
    name: "Großartig",
    emoji: "😄",
    color: "#4CAF50",
    description: "Ich fühle mich energiegeladen, motiviert und sehr positiv."
  },
  {
    id: "good",
    name: "Gut",
    emoji: "🙂",
    color: "#8BC34A",
    description: "Ich fühle mich allgemein positiv und zufrieden."
  },
  {
    id: "neutral",
    name: "Neutral",
    emoji: "😐",
    color: "#FFC107",
    description: "Ich fühle mich weder besonders gut noch schlecht."
  },
  {
    id: "tired",
    name: "Müde",
    emoji: "😴",
    color: "#FF9800",
    description: "Ich fühle mich erschöpft oder energielos."
  },
  {
    id: "stressed",
    name: "Gestresst",
    emoji: "😓",
    color: "#FF5722",
    description: "Ich fühle mich angespannt, überfordert oder unter Druck."
  },
  {
    id: "sad",
    name: "Traurig",
    emoji: "😔",
    color: "#2196F3",
    description: "Ich fühle mich niedergeschlagen oder entmutigt."
  },
  {
    id: "anxious",
    name: "Ängstlich",
    emoji: "😟",
    color: "#9C27B0",
    description: "Ich fühle mich besorgt, nervös oder ängstlich."
  },
  {
    id: "angry",
    name: "Wütend",
    emoji: "😠",
    color: "#F44336",
    description: "Ich fühle mich frustriert, gereizt oder wütend."
  }
];

// Validiere Reflexionseingabe
export const validateReflectionInput = (content, type) => {
  if (!content || typeof content !== 'string') {
    return {
      valid: false,
      message: "Bitte gib einen Text für deine Reflexion ein.",
      suggestion: "Versuche, deine Gedanken in Worte zu fassen, auch wenn es nur ein paar Sätze sind."
    };
  }
  
  const reflectionType = reflectionTypes.find(t => t.id === type) || reflectionTypes[0];
  const minLength = reflectionType.minLength;
  
  if (content.length < minLength) {
    return {
      valid: false,
      message: `Deine Reflexion ist zu kurz. Mindestens ${minLength} Zeichen werden empfohlen.`,
      suggestion: `Versuche, mehr Details zu deinen Gedanken und Gefühlen hinzuzufügen. Die empfohlene Länge für eine ${reflectionType.name} ist etwa ${reflectionType.recommendedLength} Zeichen.`
    };
  }
  
  // Prüfe auf unangemessene Inhalte (einfache Implementierung)
  const inappropriatePatterns = [
    /\b(fuck|shit|ass|bitch|dick|pussy|cunt)\b/i,
    /\b(nazi|hitler|kkk|terrorist)\b/i,
    /\b(kill|murder|suicide|die|death)\b/i
  ];
  
  for (const pattern of inappropriatePatterns) {
    if (pattern.test(content)) {
      return {
        valid: false,
        message: "Deine Reflexion enthält möglicherweise unangemessene Inhalte.",
        suggestion: "Bitte überarbeite deine Reflexion und vermeide potenziell verletzende oder unangemessene Sprache."
      };
    }
  }
  
  // Prüfe auf unverständliche Eingaben (sehr einfache Implementierung)
  const wordCount = content.split(/\s+/).length;
  const avgWordLength = content.length / wordCount;
  const hasRepeatedChars = /(.)\1{5,}/.test(content); // z.B. "aaaaaa"
  
  if (wordCount < 3 || avgWordLength > 20 || hasRepeatedChars) {
    return {
      valid: false,
      message: "Deine Reflexion scheint unverständlich zu sein.",
      suggestion: "Versuche, vollständige Sätze zu verwenden und deine Gedanken klar auszudrücken."
    };
  }
  
  return {
    valid: true,
    message: "Deine Reflexion wurde erfolgreich validiert.",
    suggestion: ""
  };
};

// Analysiere Reflexion und generiere Einsichten
export const analyzeReflection = (content, mood, type) => {
  // Validiere Eingabe
  const validation = validateReflectionInput(content, type);
  if (!validation.valid) {
    return {
      success: false,
      message: validation.message,
      suggestion: validation.suggestion,
      insights: []
    };
  }
  
  // Extrahiere Schlüsselwörter und Themen
  const keywords = extractKeywords(content);
  const themes = identifyThemes(keywords, content);
  
  // Generiere Einsichten basierend auf Inhalt, Stimmung und Themen
  const insights = generateInsights(content, mood, themes, type);
  
  // Generiere Empfehlungen
  const recommendations = generateRecommendations(themes, mood, type);
  
  return {
    success: true,
    message: "Reflexion erfolgreich analysiert.",
    keywords,
    themes,
    insights,
    recommendations,
    moodAnalysis: analyzeMood(content, mood)
  };
};

// Extrahiere Schlüsselwörter aus dem Text
const extractKeywords = (content) => {
  // Einfache Implementierung: Entferne Stoppwörter und zähle Häufigkeit
  const stopWords = [
    "der", "die", "das", "ein", "eine", "und", "oder", "aber", "wenn", "dann",
    "ich", "du", "er", "sie", "es", "wir", "ihr", "sie", "mich", "dich",
    "zu", "in", "an", "auf", "mit", "für", "von", "bei", "nach", "aus",
    "ist", "sind", "war", "waren", "bin", "bist", "hat", "haben", "hatte", "hatten",
    "wird", "werden", "wurde", "wurden", "kann", "können", "könnte", "könnten",
    "dass", "weil", "obwohl", "während", "durch", "über", "unter", "zwischen",
    "the", "a", "an", "and", "or", "but", "if", "then", "i", "you", "he", "she",
    "it", "we", "they", "me", "him", "her", "us", "them", "to", "in", "on",
    "with", "for", "from", "by", "at", "as", "of", "is", "are", "was", "were",
    "am", "be", "been", "has", "have", "had", "will", "would", "can", "could",
    "that", "because", "although", "while", "through", "about", "under", "between"
  ];
  
  // Tokenisiere Text
  const words = content.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/);
  
  // Entferne Stoppwörter und zähle Häufigkeit
  const wordCounts = {};
  words.forEach(word => {
    if (word.length > 2 && !stopWords.includes(word)) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }
  });
  
  // Sortiere nach Häufigkeit
  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(entry => entry[0]);
};

// Identifiziere Themen basierend auf Schlüsselwörtern und Inhalt
const identifyThemes = (keywords, content) => {
  const themePatterns = [
    {
      theme: "Produktivität",
      patterns: [
        /arbeit/i, /produktiv/i, /effizien/i, /aufgabe/i, /projekt/i, /zeit/i,
        /erledigt/i, /fokus/i, /konzentration/i, /leistung/i, /erfolg/i
      ]
    },
    {
      theme: "Wohlbefinden",
      patterns: [
        /gesundheit/i, /wohlbefinden/i, /entspann/i, /stress/i, /balance/i,
        /ruhe/i, /schlaf/i, /energie/i, /müde/i, /erschöpf/i, /erhol/i
      ]
    },
    {
      theme: "Beziehungen",
      patterns: [
        /freund/i, /familie/i, /beziehung/i, /partner/i, /gespräch/i,
        /kommunikation/i, /konflikt/i, /liebe/i, /vertrauen/i, /unterstütz/i
      ]
    },
    {
      theme: "Persönliches Wachstum",
      patterns: [
        /lern/i, /entwickl/i, /wachstum/i, /ziel/i, /fortschritt/i,
        /verbesser/i, /herausforderung/i, /fähigkeit/i, /kompetenz/i, /wissen/i
      ]
    },
    {
      theme: "Emotionen",
      patterns: [
        /gefühl/i, /emotion/i, /freude/i, /glück/i, /trauer/i, /angst/i,
        /wut/i, /frustration/i, /zufriedenheit/i, /motivation/i, /stimmung/i
      ]
    },
    {
      theme: "Kreativität",
      patterns: [
        /kreativ/i, /idee/i, /inspiration/i, /kunst/i, /musik/i, /schreib/i,
        /mal/i, /gestalt/i, /erschaff/i, /fantasie/i, /vorstellung/i
      ]
    },
    {
      theme: "Finanzen",
      patterns: [
        /geld/i, /finanz/i, /budget/i, /ausgabe/i, /einkommen/i, /sparen/i,
        /investier/i, /kauf/i, /kosten/i, /schulden/i, /wirtschaft/i
      ]
    }
  ];
  
  // Prüfe, welche Themen im Text vorkommen
  const detectedThemes = [];
  
  themePatterns.forEach(({ theme, patterns }) => {
    // Prüfe, ob Schlüsselwörter mit Themenmustern übereinstimmen
    const keywordMatch = keywords.some(keyword => 
      patterns.some(pattern => pattern.test(keyword))
    );
    
    // Prüfe, ob Inhalt mit Themenmustern übereinstimmt
    const contentMatch = patterns.some(pattern => pattern.test(content));
    
    if (keywordMatch || contentMatch) {
      detectedThemes.push(theme);
    }
  });
  
  // Wenn keine Themen erkannt wurden, füge "Allgemein" hinzu
  if (detectedThemes.length === 0) {
    detectedThemes.push("Allgemein");
  }
  
  return detectedThemes;
};

// Generiere Einsichten basierend auf Inhalt, Stimmung und Themen
const generateInsights = (content, mood, themes, type) => {
  // Basis-Einsichten basierend auf Reflexionstyp
  const typeBasedInsights = {
    "daily": [
      "Tägliche Reflexion hilft dir, kleine Fortschritte zu erkennen und zu würdigen.",
      "Regelmäßige Reflexion fördert Selbstbewusstsein und emotionale Intelligenz."
    ],
    "weekly": [
      "Wöchentliche Reflexion hilft dir, Muster in deinem Verhalten und deinen Erfahrungen zu erkennen.",
      "Durch regelmäßige wöchentliche Reflexion kannst du deine Ziele besser im Auge behalten."
    ],
    "monthly": [
      "Monatliche Reflexion gibt dir einen breiteren Überblick über deine Fortschritte und Herausforderungen.",
      "Langfristige Muster und Veränderungen werden durch monatliche Reflexion deutlicher sichtbar."
    ],
    "goal": [
      "Ziel-Reflexion hilft dir, deine Strategien anzupassen und Hindernisse zu überwinden.",
      "Regelmäßige Reflexion über deine Ziele erhöht die Wahrscheinlichkeit, dass du sie erreichst."
    ],
    "challenge": [
      "Herausforderungen bieten wertvolle Lernmöglichkeiten und fördern persönliches Wachstum.",
      "Durch Reflexion über Herausforderungen entwickelst du Resilienz und Problemlösungsfähigkeiten."
    ],
    "gratitude": [
      "Dankbarkeit zu praktizieren kann deine allgemeine Lebenszufriedenheit steigern.",
      "Regelmäßige Dankbarkeitsreflexion kann positive Emotionen verstärken und negative reduzieren."
    ]
  };
  
  // Stimmungsbasierte Einsichten
  const moodBasedInsights = {
    "great": [
      "Du scheinst dich heute sehr positiv zu fühlen. Nutze diese Energie, um Fortschritte bei deinen Zielen zu machen.",
      "Positive Stimmung kann Kreativität und Produktivität fördern. Ein guter Zeitpunkt, um neue Ideen zu erkunden."
    ],
    "good": [
      "Eine positive Grundstimmung ist eine gute Basis für kontinuierlichen Fortschritt.",
      "Achte darauf, was zu deiner guten Stimmung beiträgt, um diese Faktoren in Zukunft zu verstärken."
    ],
    "neutral": [
      "Neutrale Stimmung kann ein guter Ausgangspunkt für objektive Selbstreflexion sein.",
      "Auch in neutraler Stimmung kannst du kleine positive Momente finden und würdigen."
    ],
    "tired": [
      "Müdigkeit kann ein Zeichen sein, dass du eine Pause oder mehr Erholung brauchst.",
      "Achte auf deine Energie-Grenzen und priorisiere Selbstfürsorge."
    ],
    "stressed": [
      "Stress kann ein Hinweis sein, dass du deine Prioritäten überdenken solltest.",
      "Achtsamkeitsübungen und kurze Pausen können helfen, Stress zu reduzieren."
    ],
    "sad": [
      "Traurigkeit ist eine natürliche Emotion. Gib dir Raum, sie zu fühlen, ohne dich dafür zu verurteilen.",
      "Soziale Verbindungen und Gespräche können in traurigen Momenten unterstützend wirken."
    ],
    "anxious": [
      "Angst richtet unsere Aufmerksamkeit oft auf die Zukunft. Versuche, im gegenwärtigen Moment zu bleiben.",
      "Tiefes Atmen und Achtsamkeitsübungen können helfen, Angstsymptome zu reduzieren."
    ],
    "angry": [
      "Wut kann ein Hinweis auf verletzte Grenzen oder unerfüllte Bedürfnisse sein.",
      "Versuche, deine Wut konstruktiv zu nutzen, um Veränderungen anzustoßen."
    ]
  };
  
  // Themenbasierte Einsichten
  const themeBasedInsights = {
    "Produktivität": [
      "Effektives Zeitmanagement kann dir helfen, mehr zu erreichen, ohne dich zu überfordern.",
      "Kleine, regelmäßige Fortschritte führen langfristig zu großen Ergebnissen."
    ],
    "Wohlbefinden": [
      "Selbstfürsorge ist keine Selbstsucht, sondern eine notwendige Grundlage für nachhaltiges Wohlbefinden.",
      "Balance zwischen Aktivität und Erholung ist entscheidend für langfristiges Wohlbefinden."
    ],
    "Beziehungen": [
      "Offene Kommunikation und aktives Zuhören sind Schlüssel für gesunde Beziehungen.",
      "Gesunde Grenzen zu setzen ist wichtig für dich selbst und deine Beziehungen zu anderen."
    ],
    "Persönliches Wachstum": [
      "Herausforderungen sind Gelegenheiten zum Wachstum und zur Entwicklung neuer Fähigkeiten.",
      "Kontinuierliches Lernen und Anpassung sind Schlüssel zu persönlicher Entwicklung."
    ],
    "Emotionen": [
      "Alle Emotionen haben ihren Zweck und ihre Weisheit, auch die unangenehmen.",
      "Emotionale Intelligenz zu entwickeln hilft dir, deine Gefühle besser zu verstehen und zu regulieren."
    ],
    "Kreativität": [
      "Kreativität gedeiht in einer Umgebung ohne Urteil und mit Raum zum Experimentieren.",
      "Regelmäßige kreative Praxis kann dein Wohlbefinden steigern und neue Perspektiven eröffnen."
    ],
    "Finanzen": [
      "Finanzielle Klarheit und Planung können Stress reduzieren und Sicherheit schaffen.",
      "Ein ausgewogenes Verhältnis zu Geld umfasst sowohl Sparen als auch bewusstes Genießen."
    ],
    "Allgemein": [
      "Regelmäßige Reflexion hilft dir, bewusster zu leben und bessere Entscheidungen zu treffen.",
      "Selbsterkenntnis ist der erste Schritt zu persönlichem Wachstum und Veränderung."
    ]
  };
  
  // Sammle relevante Einsichten
  let insights = [];
  
  // Füge typbasierte Einsichten hinzu
  if (typeBasedInsights[type]) {
    insights = insights.concat(typeBasedInsights[type]);
  }
  
  // Füge stimmungsbasierte Einsichten hinzu
  if (moodBasedInsights[mood]) {
    insights = insights.concat(moodBasedInsights[mood]);
  }
  
  // Füge themenbasierte Einsichten hinzu
  themes.forEach(theme => {
    if (themeBasedInsights[theme]) {
      insights = insights.concat(themeBasedInsights[theme]);
    }
  });
  
  // Wähle zufällig 3 Einsichten aus
  const shuffledInsights = insights.sort(() => 0.5 - Math.random());
  return shuffledInsights.slice(0, 3);
};

// Generiere Empfehlungen basierend auf Themen und Stimmung
const generateRecommendations = (themes, mood, type) => {
  // Basis-Empfehlungen basierend auf Themen
  const themeBasedRecommendations = {
    "Produktivität": [
      "Versuche die Pomodoro-Technik: 25 Minuten fokussierte Arbeit, gefolgt von 5 Minuten Pause.",
      "Erstelle eine To-Do-Liste mit maximal 3 Prioritäten für den nächsten Tag.",
      "Identifiziere und eliminiere Ablenkungen in deiner Arbeitsumgebung."
    ],
    "Wohlbefinden": [
      "Plane bewusst Zeit für Selbstfürsorge ein, z.B. ein entspannendes Bad oder einen Spaziergang in der Natur.",
      "Praktiziere eine 5-minütige Atemübung oder Meditation.",
      "Achte auf ausreichend Schlaf und eine ausgewogene Ernährung."
    ],
    "Beziehungen": [
      "Nimm dir Zeit für ein tiefes Gespräch mit einem Freund oder Familienmitglied.",
      "Übe aktives Zuhören in deinen nächsten Gesprächen.",
      "Drücke jemandem deine Wertschätzung aus."
    ],
    "Persönliches Wachstum": [
      "Setze dir ein kleines, erreichbares Lernziel für die nächste Woche.",
      "Reflektiere über eine kürzlich gemeisterte Herausforderung und was du daraus gelernt hast.",
      "Lies einen Artikel oder schaue ein Video zu einem Thema, das dich interessiert."
    ],
    "Emotionen": [
      "Führe ein Emotionstagebuch, um Muster in deinen Gefühlen zu erkennen.",
      "Praktiziere Selbstmitgefühl, besonders in schwierigen emotionalen Zuständen.",
      "Versuche eine Achtsamkeitsübung, um deine Emotionen ohne Urteil zu beobachten."
    ],
    "Kreativität": [
      "Reserviere 15 Minuten für freies Schreiben oder Zeichnen ohne Ziel oder Erwartung.",
      "Probiere eine neue kreative Aktivität aus, die du noch nie gemacht hast.",
      "Suche Inspiration in der Natur oder in Kunstwerken anderer."
    ],
    "Finanzen": [
      "Erstelle eine Übersicht deiner Einnahmen und Ausgaben für den letzten Monat.",
      "Setze dir ein konkretes Sparziel und plane kleine Schritte dorthin.",
      "Informiere dich über ein Finanzthema, das dich interessiert."
    ],
    "Allgemein": [
      "Setze dir ein kleines, konkretes Ziel für morgen.",
      "Nimm dir Zeit für eine Aktivität, die dir Freude bereitet.",
      "Reflektiere über deine Werte und wie du sie im Alltag leben kannst."
    ]
  };
  
  // Stimmungsbasierte Empfehlungen
  const moodBasedRecommendations = {
    "great": [
      "Nutze deine positive Energie, um ein herausforderndes Projekt voranzubringen.",
      "Teile deine positive Stimmung mit anderen durch eine freundliche Geste."
    ],
    "good": [
      "Reflektiere, was zu deiner guten Stimmung beiträgt, und wie du diese Faktoren verstärken kannst.",
      "Setze dir ein kleines, erreichbares Ziel für heute."
    ],
    "neutral": [
      "Probiere eine kurze Aktivität, die deine Stimmung heben könnte, wie Musik hören oder einen kurzen Spaziergang.",
      "Nutze deine neutrale Stimmung für objektive Reflexion und Planung."
    ],
    "tired": [
      "Prioritisiere Ruhe und Erholung. Plane eine frühe Nachtruhe ein.",
      "Überprüfe deinen Zeitplan auf mögliche Überlastung und passe ihn an."
    ],
    "stressed": [
      "Praktiziere eine kurze Atemübung oder Meditation zur Stressreduktion.",
      "Identifiziere die Hauptquellen deines Stresses und überlege, wie du sie reduzieren kannst."
    ],
    "sad": [
      "Sei sanft mit dir selbst und erlaube dir, deine Gefühle zu fühlen.",
      "Suche soziale Unterstützung oder eine Aktivität, die dir normalerweise Freude bereitet."
    ],
    "anxious": [
      "Praktiziere die 5-4-3-2-1-Übung: Benenne 5 Dinge, die du siehst, 4 Dinge, die du fühlst, 3 Dinge, die du hörst, 2 Dinge, die du riechst und 1 Ding, das du schmeckst.",
      "Schreibe deine Sorgen auf und unterscheide zwischen denen, die du beeinflussen kannst, und denen, die außerhalb deiner Kontrolle liegen."
    ],
    "angry": [
      "Nimm dir Zeit für körperliche Aktivität, um angestaute Energie abzubauen.",
      "Praktiziere tiefes Atmen, bevor du auf eine Situation reagierst, die dich wütend macht."
    ]
  };
  
  // Sammle relevante Empfehlungen
  let recommendations = [];
  
  // Füge themenbasierte Empfehlungen hinzu
  themes.forEach(theme => {
    if (themeBasedRecommendations[theme]) {
      const randomRec = themeBasedRecommendations[theme][Math.floor(Math.random() * themeBasedRecommendations[theme].length)];
      recommendations.push(randomRec);
    }
  });
  
  // Füge stimmungsbasierte Empfehlungen hinzu
  if (moodBasedRecommendations[mood]) {
    const randomRec = moodBasedRecommendations[mood][Math.floor(Math.random() * moodBasedRecommendations[mood].length)];
    recommendations.push(randomRec);
  }
  
  // Entferne Duplikate und begrenze auf 3 Empfehlungen
  return [...new Set(recommendations)].slice(0, 3);
};

// Analysiere Stimmung basierend auf Text und ausgewählter Stimmung
const analyzeMood = (content, selectedMood) => {
  // Stimmungswörter für einfache Textanalyse
  const moodWords = {
    "great": ["großartig", "fantastisch", "wunderbar", "begeistert", "glücklich", "freudig", "energiegeladen", "motiviert"],
    "good": ["gut", "positiv", "zufrieden", "angenehm", "erfreulich", "nett", "schön"],
    "neutral": ["okay", "normal", "durchschnittlich", "mittelmäßig", "weder noch"],
    "tired": ["müde", "erschöpft", "ausgelaugt", "kraftlos", "schläfrig", "matt"],
    "stressed": ["gestresst", "überfordert", "angespannt", "unter druck", "hektisch", "nervös"],
    "sad": ["traurig", "niedergeschlagen", "entmutigt", "deprimiert", "unglücklich", "bedrückt"],
    "anxious": ["ängstlich", "besorgt", "unruhig", "nervös", "unsicher", "beunruhigt"],
    "angry": ["wütend", "verärgert", "frustriert", "gereizt", "zornig", "genervt"]
  };
  
  // Zähle Stimmungswörter im Text
  const moodCounts = {};
  Object.entries(moodWords).forEach(([mood, words]) => {
    moodCounts[mood] = words.filter(word => content.toLowerCase().includes(word)).length;
  });
  
  // Bestimme dominante Stimmung im Text
  let dominantMood = Object.entries(moodCounts)
    .sort((a, b) => b[1] - a[1])
    .filter(entry => entry[1] > 0)[0];
  
  dominantMood = dominantMood ? dominantMood[0] : "neutral";
  
  // Vergleiche mit ausgewählter Stimmung
  const moodMatch = dominantMood === selectedMood;
  
  return {
    selectedMood,
    detectedMood: dominantMood,
    match: moodMatch,
    insight: moodMatch 
      ? "Deine beschriebene Stimmung stimmt mit deiner Textanalyse überein."
      : `Deine beschriebene Stimmung (${selectedMood}) unterscheidet sich von der in deinem Text erkennbaren Stimmung (${dominantMood}). Dies kann ein interessanter Punkt zur Selbstreflexion sein.`
  };
};

// Speichere Reflexion
export const saveReflection = (content, mood, type) => {
  // Validiere Eingabe
  const validation = validateReflectionInput(content, type);
  if (!validation.valid) {
    return {
      success: false,
      message: validation.message,
      suggestion: validation.suggestion
    };
  }
  
  // Analysiere Reflexion
  const analysis = analyzeReflection(content, mood, type);
  
  // Erstelle Reflexionsobjekt
  const reflection = {
    id: `reflection_${Date.now()}`,
    content,
    mood,
    type,
    date: new Date().toISOString(),
    analysis: {
      themes: analysis.themes,
      insights: analysis.insights,
      recommendations: analysis.recommendations,
      moodAnalysis: analysis.moodAnalysis
    }
  };
  
  // Lade bestehende Reflexionen
  const reflections = localStorageUtil.loadData('nebula_reflections', []);
  
  // Füge neue Reflexion hinzu
  reflections.unshift(reflection);
  
  // Speichere aktualisierte Reflexionen
  localStorageUtil.saveData('nebula_reflections', reflections);
  
  // Aktualisiere Benutzerstatistiken
  const SocialFeatures = require('./SocialFeatures').default;
  SocialFeatures.updateUserStatistics();
  
  // Prüfe auf neue Errungenschaften
  SocialFeatures.checkAchievements();
  
  return {
    success: true,
    message: "Reflexion erfolgreich gespeichert.",
    reflection,
    xpEarned: getReflectionXP(type)
  };
};

// Erhalte XP-Belohnung für Reflexionstyp
const getReflectionXP = (type) => {
  const reflectionType = reflectionTypes.find(t => t.id === type) || reflectionTypes[0];
  return reflectionType.xpReward;
};

// Generiere Reflexionsvorschläge basierend auf Benutzeraktivitäten
export const generateReflectionPrompts = () => {
  const skills = localStorageUtil.loadData('nebula_skills', []);
  const quests = localStorageUtil.loadData('nebula_quests', { daily: [], weekly: [], longterm: [] });
  
  const customPrompts = [];
  
  // Füge Prompts basierend auf kürzlich abgeschlossenen Quests hinzu
  const completedQuests = [
    ...(quests.daily || []).filter(q => q.completed),
    ...(quests.weekly || []).filter(q => q.completed),
    ...(quests.longterm || []).filter(q => q.completed)
  ].sort((a, b) => new Date(b.completedDate) - new Date(a.completedDate)).slice(0, 3);
  
  completedQuests.forEach(quest => {
    customPrompts.push(`Wie fühlst du dich nach Abschluss der Quest "${quest.title}"?`);
    customPrompts.push(`Was hast du durch die Arbeit an "${quest.title}" gelernt?`);
  });
  
  // Füge Prompts basierend auf Skills hinzu
  const topSkills = skills.sort((a, b) => b.currentLevel - a.currentLevel).slice(0, 3);
  
  topSkills.forEach(skill => {
    customPrompts.push(`Wie hat sich deine Fähigkeit in "${skill.name}" in letzter Zeit entwickelt?`);
    customPrompts.push(`Welche Herausforderungen hast du bei der Entwicklung von "${skill.name}" erlebt?`);
  });
  
  // Füge allgemeine Prompts hinzu
  const generalPrompts = [
    "Was hat dich heute inspiriert?",
    "Welche Fortschritte hast du in letzter Zeit bei deinen Zielen gemacht?",
    "Welche Herausforderung beschäftigt dich derzeit am meisten?",
    "Wofür bist du heute besonders dankbar?",
    "Welche neue Erkenntnis hattest du in letzter Zeit?",
    "Wie könntest du morgen einen kleinen Schritt vorwärts machen?"
  ];
  
  // Kombiniere und mische Prompts
  const allPrompts = [...customPrompts, ...generalPrompts];
  const shuffledPrompts = allPrompts.sort(() => 0.5 - Math.random());
  
  return shuffledPrompts.slice(0, 5);
};

export default {
  reflectionTypes,
  moodCategories,
  validateReflectionInput,
  analyzeReflection,
  saveReflection,
  generateReflectionPrompts
};
