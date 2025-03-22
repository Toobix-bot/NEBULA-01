// API route for authentication
export default function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    // This is a mock authentication
    // In a real application, you would validate against a database
    if (email === 'demo@nebulaodyssey.com' && password === 'password123') {
      res.status(200).json({ 
        success: true, 
        user: {
          id: 'user123',
          name: 'Demo User',
          email: 'demo@nebulaodyssey.com',
          level: 12,
          xp: 3450,
          streak: 7
        },
        token: 'mock-jwt-token'
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
