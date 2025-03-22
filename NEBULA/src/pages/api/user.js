// API route for user data
export default function handler(req, res) {
  if (req.method === 'GET') {
    // Return user data
    // In a real application, this would be fetched from a database based on authenticated user
    const userData = {
      id: 'user123',
      name: 'Demo User',
      email: 'demo@nebulaodyssey.com',
      level: 12,
      xp: 3450,
      xpToNextLevel: 5000,
      streak: 7,
      joinDate: '2025-01-15T00:00:00.000Z',
      stats: {
        completedQuests: 87,
        reflections: 42,
        skillsLeveledUp: 15,
        totalXPEarned: 24680
      },
      achievements: [
        {
          id: 'a1',
          title: 'Erste Schritte',
          description: 'Schließe deine erste Quest ab',
          date: '2025-01-16T00:00:00.000Z',
          icon: 'rocket'
        },
        {
          id: 'a2',
          title: 'Reflexionsmeister',
          description: 'Führe 10 Tage in Folge eine Reflexion durch',
          date: '2025-02-01T00:00:00.000Z',
          icon: 'brain'
        },
        {
          id: 'a3',
          title: 'Skill-Pionier',
          description: 'Erreiche Level 5 in einem Skill',
          date: '2025-02-12T00:00:00.000Z',
          icon: 'star'
        }
      ],
      recentActivity: [
        {
          id: 'act1',
          type: 'quest_completed',
          title: 'Projektplan erstellen',
          xp: 75,
          date: '2025-03-18T14:30:00.000Z'
        },
        {
          id: 'act2',
          type: 'reflection_completed',
          title: 'Tägliche Reflexion',
          xp: 50,
          date: '2025-03-18T20:15:00.000Z'
        },
        {
          id: 'act3',
          type: 'skill_leveled',
          title: 'Produktivität auf Level 7',
          xp: 100,
          date: '2025-03-17T16:45:00.000Z'
        }
      ]
    };
    
    res.status(200).json({ success: true, user: userData });
  } else if (req.method === 'PUT') {
    // Update user data
    const { field, value } = req.body;
    
    if (!field) {
      return res.status(400).json({ success: false, message: 'Field to update is required' });
    }
    
    // In a real application, you would update the user data in a database
    // Here we just return success
    res.status(200).json({ 
      success: true, 
      message: 'User data updated successfully',
      field,
      value
    });
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
