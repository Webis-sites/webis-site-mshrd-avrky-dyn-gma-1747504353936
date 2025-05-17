'use client';

import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

interface SocialLink {
  id: number;
  icon: React.ReactNode;
  url: string;
  label: string;
}

interface QuickLink {
  id: number;
  title: string;
  url: string;
}

const Footer: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);

  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    { id: 1, icon: <FaFacebookF />, url: '#', label: 'פייסבוק' },
    { id: 2, icon: <FaTwitter />, url: '#', label: 'טוויטר' },
    { id: 3, icon: <FaLinkedinIn />, url: '#', label: 'לינקדאין' },
    { id: 4, icon: <FaInstagram />, url: '#', label: 'אינסטגרם' },
  ];

  const quickLinks: QuickLink[] = [
    { id: 1, title: 'דף הבית', url: '/' },
    { id: 2, title: 'אודות', url: '/about' },
    { id: 3, title: 'תחומי התמחות', url: '/services' },
    { id: 4, title: 'צוות המשרד', url: '/team' },
    { id: 5, title: 'מאמרים', url: '/articles' },
    { id: 6, title: 'צור קשר', url: '/contact' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      if (email) {
        setSubmitSuccess(true);
        setEmail('');
        setTimeout(() => setSubmitSuccess(false), 3000);
      } else {
        setSubmitError(true);
        setTimeout(() => setSubmitError(false), 3000);
      }
    }, 1000);
  };

  return (
    <footer id="footer" dir="rtl" className="bg-gradient-to-b from-gray-900 to-gray-950 text-white relative overflow-hidden">
      {/* Glassmorphism background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4ECDC4]/20 to-[#FF6B6B]/20 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Top section with logo and social links */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b border-white/10 pb-8">
          <div className="mb-6 md:mb-0 text-right">
            <div className="flex items-center justify-end">
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-[#4ECDC4]/30 mr-4">
                <span className="text-[#4ECDC4] text-2xl font-bold">גמא</span>
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-l from-[#4ECDC4] to-[#FF6B6B]">משרד עורכי דין גמא</h2>
            </div>
            <p className="text-gray-300 mt-2 text-right">אנחנו משרד עורכי דין מוביל בתחום המשפטים עם ניסיון של שנים רבות</p>
          </div>
          
          <div className="flex space-x-4 space-x-reverse">
            {socialLinks.map((link) => (
              <a
                key={link.id}
                href={link.url}
                aria-label={link.label}
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-[#4ECDC4] hover:border-[#4ECDC4] transition-all duration-300"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
        
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Quick Links */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 text-[#4ECDC4]">קישורים מהירים</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <a 
                    href={link.url} 
                    className="text-gray-300 hover:text-[#FF6B6B] transition-colors duration-300 block"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 text-[#4ECDC4]">צור קשר</h3>
            <ul className="space-y-4">
              <li className="flex items-center justify-end">
                <span className="text-gray-300 mr-2">רחוב הרצל 123, תל אביב</span>
                <FaMapMarkerAlt className="text-[#FF6B6B]" />
              </li>
              <li className="flex items-center justify-end">
                <span className="text-gray-300 mr-2">03-1234567</span>
                <FaPhone className="text-[#FF6B6B]" />
              </li>
              <li className="flex items-center justify-end">
                <span className="text-gray-300 mr-2">info@gamma-law.co.il</span>
                <FaEnvelope className="text-[#FF6B6B]" />
              </li>
            </ul>
          </div>
          
          {/* Working Hours */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 text-[#4ECDC4]">שעות פעילות</h3>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span className="text-gray-300">9:00 - 18:00</span>
                <span className="text-gray-300">ראשון - חמישי</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">9:00 - 13:00</span>
                <span className="text-gray-300">שישי</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-300">סגור</span>
                <span className="text-gray-300">שבת</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="text-right">
            <h3 className="text-xl font-bold mb-4 text-[#4ECDC4]">הישארו מעודכנים</h3>
            <p className="text-gray-300 mb-4">הירשמו לניוזלטר שלנו לקבלת עדכונים ומאמרים משפטיים</p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="כתובת אימייל"
                className="w-full px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#4ECDC4] text-right"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] text-white py-2 px-4 rounded-md hover:opacity-90 transition-opacity duration-300 disabled:opacity-50"
              >
                {isSubmitting ? 'שולח...' : 'הרשמה'}
              </button>
              {submitSuccess && (
                <p className="text-green-400 mt-2 text-sm">תודה! נרשמת בהצלחה לניוזלטר שלנו.</p>
              )}
              {submitError && (
                <p className="text-red-400 mt-2 text-sm">אנא הזן כתובת אימייל תקינה.</p>
              )}
            </form>
          </div>
        </div>
        
        {/* Bottom section with copyright and legal links */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 mb-4 md:mb-0 text-center md:text-right">
            <p>© {currentYear} משרד עורכי דין גמא. כל הזכויות שמורות.</p>
          </div>
          <div className="flex space-x-6 space-x-reverse">
            <a href="/privacy" className="text-gray-400 hover:text-[#4ECDC4] transition-colors duration-300">מדיניות פרטיות</a>
            <a href="/terms" className="text-gray-400 hover:text-[#4ECDC4] transition-colors duration-300">תנאי שימוש</a>
            <a href="/accessibility" className="text-gray-400 hover:text-[#4ECDC4] transition-colors duration-300">נגישות</a>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#4ECDC4]/10 rounded-full blur-3xl"></div>
      <div className="absolute top-20 right-10 w-40 h-40 bg-[#FF6B6B]/10 rounded-full blur-3xl"></div>
    </footer>
  );
};

export default Footer;