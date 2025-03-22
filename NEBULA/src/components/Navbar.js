import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiMenu, FiX, FiHeart, FiStar } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Quests', path: '/quests' },
    { name: 'Skills', path: '/skills' },
    { name: 'Reflection', path: '/reflection' },
    { name: 'Therapeutic', path: '/therapeutic', icon: <FiHeart className="mr-1" /> },
    { name: 'Gratitude', path: '/gratitude', icon: <FiStar className="mr-1" /> },
    { name: 'About', path: '/about' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            />
            <span className={`text-xl font-bold ${scrolled ? 'nebula-text-gradient' : 'text-white'}`}>NEBULA ODYSSEY</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.path}
                className={`nav-link text-sm uppercase tracking-wider font-medium flex items-center ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`}
              >
                {link.icon && link.icon}
                {link.name}
              </Link>
            ))}
            <Link 
              href="/dashboard" 
              className="btn btn-primary text-sm uppercase tracking-wider"
            >
              Launch
            </Link>
          </nav>

          {/* Mobile Navigation Toggle */}
          <button 
            className={`md:hidden text-2xl ${scrolled ? 'text-gray-700' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white shadow-xl"
        >
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.path}
                  className="nav-link text-sm uppercase tracking-wider font-medium py-2 flex items-center text-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  {link.icon && link.icon}
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/dashboard" 
                className="btn btn-primary text-sm uppercase tracking-wider text-center"
                onClick={() => setIsOpen(false)}
              >
                Launch
              </Link>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
