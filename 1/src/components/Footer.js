import React from 'react';
import { useRouter } from 'next/router';

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-xl font-bold mb-2">
              <span className="nebula-text-gradient">NEBULA ODYSSEY</span>
            </h2>
            <p className="text-sm text-muted">
              © 2025 NEBULA ODYSSEY. Alle Rechte vorbehalten.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-muted hover:text-nebula-purple">
              Unterstützen
            </a>
            <a href="#" className="text-muted hover:text-nebula-purple">
              GitHub
            </a>
            <a href="#" className="text-muted hover:text-nebula-purple">
              Kontakt
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-muted">
          <p>Erstellt mit <span className="text-nebula-pink">♥</span> für persönliche Entwicklung und Wachstum.</p>
          <p className="mt-2">NEBULA ODYSSEY ist ein privates Projekt zur Förderung von Selbstreflexion, Achtsamkeit und persönlichem Wachstum.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
