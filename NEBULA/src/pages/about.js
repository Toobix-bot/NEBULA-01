import React from 'react';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi';

const AboutPage = () => {
  return (
    <Layout title="Über Uns">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-8">Über Nebula Odyssey</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="card mb-8">
                <h2 className="text-2xl font-semibold mb-4">Die Vision</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Nebula Odyssey ist ein gamifiziertes persönliches Entwicklungssystem mit Weltraum-Thema, 
                  das entwickelt wurde, um Menschen dabei zu helfen, ihre Ziele zu erreichen und ihre persönliche 
                  Entwicklung zu visualisieren. Das System verwendet Gamification-Elemente, um Motivation zu steigern 
                  und Fortschritte greifbar zu machen.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  Die Idee hinter Nebula Odyssey ist, dass persönliche Entwicklung wie eine Reise durch das Universum ist - 
                  voller Entdeckungen, Herausforderungen und Wachstum. Jeder Benutzer ist ein Raumfahrer auf seiner eigenen 
                  Odyssee, der verschiedene Planeten (Lebensbereiche) erkundet und seine Fähigkeiten kontinuierlich verbessert.
                </p>
                <p className="text-[var(--text-secondary)]">
                  Mit der Integration von KI-Technologie bietet Nebula Odyssey personalisierte Erfahrungen, 
                  die sich an die Bedürfnisse und den Fortschritt jedes Benutzers anpassen.
                </p>
              </div>
              
              <div className="card">
                <h2 className="text-2xl font-semibold mb-4">Kernfunktionen</h2>
                <ul className="space-y-3 text-[var(--text-secondary)]">
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-2">•</span>
                    <span><strong>Gamifizierung:</strong> XP, Level und Belohnungen, um Motivation zu steigern</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-2">•</span>
                    <span><strong>Quest-System:</strong> Tägliche, wöchentliche und langfristige Herausforderungen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-2">•</span>
                    <span><strong>Skill-Entwicklung:</strong> Visualisierung und Tracking von Fähigkeiten in verschiedenen Lebensbereichen</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-2">•</span>
                    <span><strong>KI-gestützte Reflexion:</strong> Tiefgründige Fragen und Einsichten für persönliches Wachstum</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-2">•</span>
                    <span><strong>NPC-Interaktionen:</strong> Mentoren und Charaktere, die Ratschläge und Herausforderungen bieten</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[var(--accent)] mr-2">•</span>
                    <span><strong>Visuelle Fortschrittsverfolgung:</strong> Interaktive Visualisierungen der persönlichen Entwicklungsreise</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <div className="card mb-8">
                <h2 className="text-2xl font-semibold mb-4">Über das Team</h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  Nebula Odyssey wurde von einem Team entwickelt, das sich leidenschaftlich für persönliches Wachstum 
                  und innovative Technologien einsetzt. Die ursprüngliche Idee stammt von Michael Horn, der das 
                  Konzept eines gamifizierten persönlichen Entwicklungssystems mit Weltraum-Thema entwarf.
                </p>
                <p className="text-[var(--text-secondary)] mb-4">
                  Unser Team besteht aus Entwicklern, Designern und Experten für persönliche Entwicklung, 
                  die gemeinsam daran arbeiten, ein einzigartiges und wertvolles Erlebnis zu schaffen.
                </p>
                <div className="flex justify-center space-x-4 mt-6">
                  <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    <FiMail size={20} />
                  </a>
                  <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    <FiGithub size={20} />
                  </a>
                  <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    <FiLinkedin size={20} />
                  </a>
                  <a href="#" className="text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors">
                    <FiTwitter size={20} />
                  </a>
                </div>
              </div>
              
              <div className="card">
                <h2 className="text-2xl font-semibold mb-4">Unsere Geschichte</h2>
                <div className="space-y-4 text-[var(--text-secondary)]">
                  <div>
                    <h3 className="text-lg font-medium text-[var(--accent)]">Die Idee</h3>
                    <p>Das Konzept für Nebula Odyssey entstand aus Michael Horns Wunsch, persönliche Entwicklung 
                    zugänglicher und motivierender zu gestalten.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[var(--accent)]">Die Entwicklung</h3>
                    <p>Von der ursprünglichen Idee bis zur Umsetzung hat das System mehrere Iterationen durchlaufen, 
                    um die bestmögliche Benutzererfahrung zu bieten.</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-[var(--accent)]">Die Zukunft</h3>
                    <p>Nebula Odyssey wird kontinuierlich weiterentwickelt, mit neuen Funktionen, 
                    verbesserten KI-Integrationen und einer wachsenden Community von Raumfahrern.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-6">Bereit für deine eigene Odyssee?</h2>
            <button className="btn btn-primary text-lg px-8 py-4">Jetzt starten</button>
          </div>
        </motion.div>
      </div>
    </Layout>
  );
};

export default AboutPage;
