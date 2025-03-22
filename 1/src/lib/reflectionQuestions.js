// Erweiterte Reflexionsfragen für NEBULA ODYSSEY
// Fokus auf therapeutische Tiefe, Schattenarbeit, emotionale Reflexion und persönliches Wachstum

const reflectionQuestions = {
  daily: [
    {
      id: "daily-reflection-1",
      title: "Tägliche Grundreflexion",
      questions: [
        "Wie würdest du deine Stimmung heute auf einer Skala von 1-10 bewerten und warum?",
        "Was war der bedeutsamste Moment des Tages und warum?",
        "Welche Herausforderung hast du heute erlebt und wie bist du damit umgegangen?",
        "Wofür bist du heute besonders dankbar?",
        "Was hast du heute über dich selbst gelernt?"
      ]
    },
    {
      id: "daily-reflection-2",
      title: "Emotionale Reflexion",
      questions: [
        "Welche Emotionen hast du heute am stärksten erlebt?",
        "Gab es einen Auslöser für diese Emotionen? Wenn ja, welchen?",
        "Wie hast du auf diese Emotionen reagiert? War diese Reaktion hilfreich?",
        "Gibt es ein Muster in deinen emotionalen Reaktionen, das du erkennst?",
        "Wie könntest du morgen bewusster mit ähnlichen Emotionen umgehen?"
      ]
    },
    {
      id: "daily-reflection-3",
      title: "Produktivitäts-Reflexion",
      questions: [
        "Welche drei Dinge hast du heute erreicht, die dir wichtig waren?",
        "Gab es etwas, das dich von deinen Zielen abgelenkt hat? Wenn ja, was?",
        "Wie effektiv hast du deine Zeit heute genutzt?",
        "Was könntest du morgen anders machen, um produktiver zu sein?",
        "Welche Gewohnheit hat dir heute am meisten geholfen, fokussiert zu bleiben?"
      ]
    },
    {
      id: "daily-reflection-4",
      title: "Körper-Reflexion",
      questions: [
        "Wie hat sich dein Körper heute angefühlt?",
        "Hast du auf die Bedürfnisse deines Körpers geachtet (Schlaf, Ernährung, Bewegung)?",
        "Gab es körperliche Empfindungen, die mit bestimmten Emotionen verbunden waren?",
        "Was könntest du morgen tun, um deinen Körper besser zu unterstützen?",
        "Welche körperliche Aktivität hat dir heute am meisten Freude bereitet?"
      ]
    }
  ],
  
  weekly: [
    {
      id: "weekly-reflection-1",
      title: "Wöchentliche Fortschrittsreflexion",
      questions: [
        "Welche Fortschritte hast du diese Woche in Bezug auf deine langfristigen Ziele gemacht?",
        "Welche Herausforderungen sind diese Woche aufgetreten und wie hast du sie bewältigt?",
        "Welche Muster oder Gewohnheiten hast du diese Woche bei dir beobachtet?",
        "Was hat dir diese Woche am meisten Energie gegeben und was hat dir Energie genommen?",
        "Welche Lektion aus dieser Woche nimmst du mit in die nächste Woche?",
        "Wie möchtest du die kommende Woche gestalten, basierend auf den Erfahrungen dieser Woche?"
      ]
    },
    {
      id: "weekly-reflection-2",
      title: "Beziehungs-Reflexion",
      questions: [
        "Wie haben sich deine wichtigsten Beziehungen diese Woche entwickelt?",
        "Gab es Konflikte oder Spannungen in deinen Beziehungen? Wenn ja, wie bist du damit umgegangen?",
        "Wie hast du diese Woche Verbindung zu anderen Menschen hergestellt?",
        "Hast du deine Grenzen in Beziehungen respektiert und kommuniziert?",
        "Welche Qualität möchtest du in der kommenden Woche in deinen Beziehungen stärken?",
        "Wie könntest du in der kommenden Woche mehr Authentizität in deine Beziehungen bringen?"
      ]
    },
    {
      id: "weekly-reflection-3",
      title: "Schatten-Reflexion",
      questions: [
        "Welche Situationen haben diese Woche starke emotionale Reaktionen in dir ausgelöst?",
        "Gibt es Eigenschaften, die dich an anderen Menschen diese Woche gestört haben?",
        "Welche deiner eigenen Verhaltensweisen oder Gedanken möchtest du nicht wahrhaben?",
        "Welche wiederkehrenden Träume oder Fantasien hattest du diese Woche?",
        "Wie könntest du einen verdrängten Aspekt deiner Persönlichkeit in der kommenden Woche bewusster integrieren?",
        "Welche Angst hat dich diese Woche am meisten zurückgehalten?"
      ]
    }
  ],
  
  monthly: [
    {
      id: "monthly-reflection-1",
      title: "Monatliche Tiefenreflexion",
      questions: [
        "Welche bedeutsamen Veränderungen hast du in diesem Monat in deinem Leben bemerkt?",
        "Wie hast du dich in diesem Monat persönlich weiterentwickelt?",
        "Welche Überzeugungen oder Annahmen über dich selbst wurden in diesem Monat in Frage gestellt?",
        "Welche neuen Einsichten hast du über dich selbst gewonnen?",
        "Wie hat sich deine Beziehung zu dir selbst in diesem Monat verändert?",
        "Welche Aspekte deines Lebens benötigen mehr Aufmerksamkeit im kommenden Monat?",
        "Welches Thema oder welche Qualität möchtest du im kommenden Monat erforschen oder entwickeln?"
      ]
    },
    {
      id: "monthly-reflection-2",
      title: "Werte- und Sinn-Reflexion",
      questions: [
        "Inwieweit hast du in diesem Monat im Einklang mit deinen Werten gelebt?",
        "Welche Aktivitäten oder Erfahrungen haben dir in diesem Monat ein Gefühl von Sinn und Bedeutung gegeben?",
        "Gibt es Bereiche in deinem Leben, in denen du einen Konflikt zwischen deinen Handlungen und deinen Werten spürst?",
        "Wie hat sich dein Verständnis von dem, was dir wichtig ist, in diesem Monat verändert?",
        "Welche Schritte könntest du im kommenden Monat unternehmen, um mehr im Einklang mit deinen Werten zu leben?",
        "Was würdest du gerne am Ende des nächsten Monats über dich selbst sagen können?"
      ]
    }
  ],
  
  therapeutic: [
    {
      id: "therapeutic-reflection-1",
      title: "Emotionale Tiefenreflexion",
      questions: [
        "Welche Emotion taucht in deinem Leben am häufigsten auf und welche Botschaft könnte sie für dich haben?",
        "Gibt es eine Emotion, die du vermeidest oder unterdrückst? Wenn ja, welche und warum?",
        "Wie wurden Emotionen in deiner Familie oder Umgebung behandelt, als du aufgewachsen bist?",
        "Welche Glaubenssätze hast du über bestimmte Emotionen (z.B. 'Wut ist schlecht', 'Man sollte nicht traurig sein')?",
        "Wie könntest du eine schwierige Emotion als Lehrer oder Wegweiser betrachten?",
        "Welche Ressourcen oder Strategien helfen dir, mit intensiven Emotionen umzugehen?"
      ]
    },
    {
      id: "therapeutic-reflection-2",
      title: "Inneres Kind Reflexion",
      questions: [
        "Welche unerfüllten Bedürfnisse aus deiner Kindheit spürst du noch heute?",
        "Wie würdest du dein inneres Kind beschreiben? Was braucht es von dir?",
        "Welche Situationen triggern dein inneres Kind und bringen alte Verletzungen an die Oberfläche?",
        "Wie könntest du dein inneres Kind heute unterstützen und nähren?",
        "Welche positiven Eigenschaften deines inneren Kindes möchtest du wieder mehr in dein Leben integrieren?",
        "Wenn du mit deinem kindlichen Selbst sprechen könntest, was würdest du ihm sagen wollen?"
      ]
    },
    {
      id: "therapeutic-reflection-3",
      title: "Suchtmuster-Reflexion",
      questions: [
        "Welche Verhaltensweisen oder Substanzen nutzt du, um unangenehme Gefühle zu vermeiden?",
        "Welche Situationen, Emotionen oder Gedanken lösen Verlangen nach diesem Verhalten oder dieser Substanz aus?",
        "Welches Bedürfnis versuchst du mit diesem Verhalten oder dieser Substanz zu erfüllen?",
        "Wie würde dein Leben aussehen, wenn du dieses Verhalten oder diese Substanz nicht mehr bräuchtest?",
        "Welche gesunden Alternativen könnten das gleiche Bedürfnis erfüllen?",
        "Welche Unterstützung brauchst du, um dieses Muster zu verändern?"
      ]
    },
    {
      id: "therapeutic-reflection-4",
      title: "Selbstmitgefühl-Reflexion",
      questions: [
        "Wie behandelst du dich selbst, wenn du einen Fehler machst oder leidest?",
        "Welche kritischen oder verurteilenden Gedanken hast du oft über dich selbst?",
        "Wie würdest du einen geliebten Freund in der gleichen Situation behandeln?",
        "Was hindert dich daran, dir selbst gegenüber mitfühlender zu sein?",
        "Wie könntest du in schwierigen Momenten mehr Selbstmitgefühl praktizieren?",
        "Welche Worte oder Gesten der Selbstfürsorge könnten dir in herausfordernden Zeiten helfen?"
      ]
    }
  ],
  
  shadow: [
    {
      id: "shadow-reflection-1",
      title: "Schattenaspekte erkennen",
      questions: [
        "Welche Eigenschaften oder Verhaltensweisen bei anderen Menschen lösen starke negative Reaktionen in dir aus?",
        "Welche Teile von dir versteckst du vor anderen oder versuchst sie zu unterdrücken?",
        "Welche Rollen oder Identitäten lehnst du vollständig ab?",
        "In welchen Situationen reagierst du überraschend emotional oder unangemessen?",
        "Welche wiederkehrenden Themen oder Symbole tauchen in deinen Träumen auf?",
        "Welche Aspekte deiner Persönlichkeit würdest du am liebsten ändern oder loswerden?"
      ]
    },
    {
      id: "shadow-reflection-2",
      title: "Schattenintegration",
      questions: [
        "Wie könnte ein abgelehnter Teil deiner Persönlichkeit tatsächlich eine Stärke sein?",
        "Welche positive Absicht könnte hinter einem 'negativen' Verhaltensmuster stehen?",
        "Wie könntest du die Energie eines Schattenaspekts konstruktiv in dein Leben integrieren?",
        "Welche Qualitäten oder Fähigkeiten könnten sich entfalten, wenn du einen Schattenaspekt akzeptierst?",
        "Wie würde dein Leben aussehen, wenn du alle Teile von dir vollständig annehmen könntest?",
        "Welchen ersten Schritt könntest du unternehmen, um einen Schattenaspekt bewusst zu integrieren?"
      ]
    }
  ]
};

export default reflectionQuestions;
