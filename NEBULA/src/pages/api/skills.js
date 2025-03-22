// Integration of AI components with API routes
import SkillAI from '../../lib/SkillAI';

export default async function handler(req, res) {
  // Mock data for skills
  const skills = [
    {
      id: 's1',
      name: 'Produktivität',
      description: 'Die Fähigkeit, effizient zu arbeiten und Aufgaben zeitnah abzuschließen.',
      level: 7,
      currentXP: 350,
      requiredXP: 500,
      category: 'mental'
    },
    {
      id: 's2',
      name: 'Kreativität',
      description: 'Die Fähigkeit, neue Ideen zu entwickeln und innovative Lösungen zu finden.',
      level: 5,
      currentXP: 200,
      requiredXP: 300,
      category: 'mental'
    },
    {
      id: 's3',
      name: 'Fitness',
      description: 'Körperliche Stärke, Ausdauer und allgemeine Gesundheit.',
      level: 4,
      currentXP: 280,
      requiredXP: 300,
      category: 'physical'
    },
    {
      id: 's4',
      name: 'Meditation',
      description: 'Die Fähigkeit, den Geist zu beruhigen und achtsam im gegenwärtigen Moment zu sein.',
      level: 3,
      currentXP: 150,
      requiredXP: 200,
      category: 'spiritual'
    },
    {
      id: 's5',
      name: 'Kommunikation',
      description: 'Die Fähigkeit, Ideen klar zu vermitteln und effektiv mit anderen zu interagieren.',
      level: 6,
      currentXP: 400,
      requiredXP: 400,
      category: 'social'
    },
    {
      id: 's6',
      name: 'Finanzen',
      description: 'Die Fähigkeit, Geld zu verwalten, zu sparen und zu investieren.',
      level: 4,
      currentXP: 150,
      requiredXP: 300,
      category: 'wealth'
    }
  ];

  if (req.method === 'GET') {
    // Check if recommendations are requested
    if (req.query.recommendations === 'true') {
      try {
        // Get user data for recommendations
        // In a real app, this would come from a database
        const userId = req.headers.authorization ? 'user123' : 'anonymous'; // In a real app, extract from JWT
        const userData = {
          skills: skills,
          completedQuests: [
            { id: 'q1', title: '5km laufen' },
            { id: 'q2', title: 'Tägliche Reflexion' }
          ],
          recentReflections: [
            { date: '2025-03-18', mood: 'positive' },
            { date: '2025-03-17', mood: 'neutral' }
          ]
        };
        
        // Use SkillAI to generate recommendations
        const recommendations = await SkillAI.generateSkillRecommendations(userId, userData);
        
        res.status(200).json({ 
          success: true, 
          recommendations
        });
      } catch (error) {
        console.error('Error generating skill recommendations:', error);
        res.status(500).json({ success: false, message: 'Error generating skill recommendations' });
      }
    } else {
      // Return all skills or filter by category if specified
      const { category } = req.query;
      if (category && category !== 'all') {
        const filteredSkills = skills.filter(skill => skill.category === category);
        res.status(200).json({ success: true, skills: filteredSkills });
      } else {
        res.status(200).json({ success: true, skills });
      }
    }
  } else if (req.method === 'POST') {
    // Create a new skill
    const newSkill = req.body;
    
    // Validate required fields
    if (!newSkill.name || !newSkill.description || !newSkill.category) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    
    // In a real application, you would save to a database
    // Here we just return success with the new skill
    res.status(201).json({ 
      success: true, 
      message: 'Skill created successfully',
      skill: {
        id: `new-${Date.now()}`,
        ...newSkill,
        level: 1,
        currentXP: 0,
        requiredXP: 100
      }
    });
  } else if (req.method === 'PUT') {
    // Update a skill (e.g., add XP or level up)
    const { id, action, amount } = req.body;
    
    if (!id || !action) {
      return res.status(400).json({ success: false, message: 'Skill ID and action are required' });
    }
    
    // Find the skill
    const skillIndex = skills.findIndex(s => s.id === id);
    if (skillIndex === -1) {
      return res.status(404).json({ success: false, message: 'Skill not found' });
    }
    
    const skill = { ...skills[skillIndex] };
    
    // Perform the requested action
    if (action === 'addXP' && amount) {
      skill.currentXP += parseInt(amount);
      
      // Check if level up is needed
      if (skill.currentXP >= skill.requiredXP) {
        skill.level += 1;
        skill.currentXP = skill.currentXP - skill.requiredXP;
        skill.requiredXP = Math.floor(skill.requiredXP * 1.2); // Increase required XP for next level
      }
    } else if (action === 'levelUp') {
      if (skill.currentXP >= skill.requiredXP) {
        skill.level += 1;
        skill.currentXP = 0;
        skill.requiredXP = Math.floor(skill.requiredXP * 1.2); // Increase required XP for next level
      } else {
        return res.status(400).json({ success: false, message: 'Not enough XP to level up' });
      }
    }
    
    // In a real application, you would update in a database
    // Here we just return success with the updated skill
    res.status(200).json({ 
      success: true, 
      message: 'Skill updated successfully',
      skill
    });
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
