// Integration of AI components with API routes
import ReflectionAI from '../../lib/ReflectionAI';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Handle new reflection submission
    const { mood, answers, questions } = req.body;
    
    if (!mood || !answers || !questions) {
      return res.status(400).json({ success: false, message: 'Mood, answers, and questions are required' });
    }
    
    try {
      // Use ReflectionAI to analyze the reflection
      const userId = req.headers.authorization ? 'user123' : 'anonymous'; // In a real app, extract from JWT
      const analysis = await ReflectionAI.analyzeReflection(userId, { mood, answers, questions });
      
      // In a real application, you would save to a database
      res.status(200).json({ 
        success: true, 
        message: 'Reflection analyzed successfully',
        reflection: {
          id: `reflection-${Date.now()}`,
          date: new Date().toISOString(),
          mood,
          answers,
          analysis
        }
      });
    } catch (error) {
      console.error('Error processing reflection:', error);
      res.status(500).json({ success: false, message: 'Error analyzing reflection' });
    }
  } else if (req.method === 'GET') {
    // Return reflection history (same as before)
    const { period } = req.query;
    
    // Mock reflection history data
    const reflections = [
      {
        id: 'reflection-1',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        mood: 'positive',
        summary: 'Produktiver Tag mit guten Fortschritten bei Projekten'
      },
      {
        id: 'reflection-2',
        date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        mood: 'neutral',
        summary: 'Durchschnittlicher Tag mit einigen Herausforderungen'
      },
      {
        id: 'reflection-3',
        date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
        mood: 'negative',
        summary: 'Schwieriger Tag mit vielen Ablenkungen'
      },
      {
        id: 'reflection-4',
        date: new Date(Date.now() - 86400000 * 7).toISOString(), // 1 week ago
        mood: 'positive',
        summary: 'Sehr erfolgreicher Tag mit wichtigen Durchbrüchen'
      }
    ];
    
    // Filter by period if specified
    let filteredReflections = reflections;
    if (period === 'week') {
      const oneWeekAgo = new Date(Date.now() - 86400000 * 7);
      filteredReflections = reflections.filter(r => new Date(r.date) >= oneWeekAgo);
    } else if (period === 'month') {
      const oneMonthAgo = new Date(Date.now() - 86400000 * 30);
      filteredReflections = reflections.filter(r => new Date(r.date) >= oneMonthAgo);
    }
    
    res.status(200).json({ 
      success: true, 
      reflections: filteredReflections
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
