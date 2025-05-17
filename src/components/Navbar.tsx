'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars, FaTimes, FaPhone, FaCalendarAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: 'אודות', href: '#about' },
    { name: 'שירותים', href: '#services' },
    { name: 'צוות', href: '#team' },
    { name: 'המלצות', href: '#testimonials' },
    { name: 'צור קשר', href: '#contact' },
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      id="navbar"
      dir="rtl"
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 z-20">
            <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gray-200">
              <Image
                src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80"
                alt="לוגו משרד עורכי דין גמא"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-800">
                <span className="text-[#4ECDC4]">משרד עורכי דין</span>{' '}
                <span className="text-[#FF6B6B]">גמא</span>
              </h1>
              <p className="text-xs text-gray-600">מומחים במשפט ישראלי</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 space-x-reverse">
            <ul className="flex items-center space-x-6 space-x-reverse ml-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-700 hover:text-[#4ECDC4] transition-colors duration-200 text-base font-medium relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[#FF6B6B] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                </li>
              ))}
            </ul>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Link
                href="#appointment"
                className="flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white px-5 py-2.5 rounded-lg font-bold transition-all duration-200 shadow-md hover:shadow-lg"
                aria-label="קבע תור עכשיו"
              >
                <FaCalendarAlt />
                <span>קבע תור עכשיו</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden z-20 text-gray-700 hover:text-[#4ECDC4] transition-colors"
            aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-0 z-10 bg-white/95 backdrop-blur-md pt-24 px-6 pb-6 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              <ul className="space-y-6 text-right">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-800 hover:text-[#4ECDC4] text-xl font-medium block py-2 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-4">
                <Link
                  href="#appointment"
                  className="flex items-center justify-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] text-white px-5 py-3 rounded-lg font-bold transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <FaCalendarAlt />
                  <span>קבע תור עכשיו</span>
                </Link>

                <Link
                  href="tel:+972123456789"
                  className="flex items-center justify-center gap-2 bg-[#4ECDC4] hover:bg-[#3dbdb5] text-white px-5 py-3 rounded-lg font-bold transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  <FaPhone />
                  <span>התקשר עכשיו</span>
                </Link>
              </div>

              <div className="mt-auto pt-8 border-t border-gray-200">
                <p className="text-gray-500 text-sm text-center">
                  © 2023 משרד עורכי דין גמא. כל הזכויות שמורות.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;