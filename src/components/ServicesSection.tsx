'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaHome, FaGavel, FaShieldAlt, FaBalanceScale, FaHandshake, FaFileContract, FaUserTie, FaCarCrash } from 'react-icons/fa';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-lg p-6 h-full backdrop-blur-sm bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 z-0"></div>
      <div className="relative z-10">
        <div className="text-4xl mb-4 text-[#4ECDC4] group-hover:text-[#FF6B6B] transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const ServicesSection: React.FC = () => {
  const [isRtl, setIsRtl] = useState(true);

  useEffect(() => {
    // Check if the document is available (client-side)
    if (typeof document !== 'undefined') {
      document.documentElement.dir = 'rtl';
    }
  }, []);

  const services = [
    {
      icon: <FaBuilding />,
      title: "משפט מסחרי",
      description: "ייעוץ משפטי מקיף לעסקים, חברות והתאגדויות, כולל ניסוח חוזים, הסכמי שותפות וליווי עסקאות."
    },
    {
      icon: <FaHome />,
      title: "דיני נדל\"ן",
      description: "ליווי בעסקאות נדל\"ן, רישום זכויות, הסכמי שכירות, תכנון ובנייה, ופתרון סכסוכי מקרקעין."
    },
    {
      icon: <FaGavel />,
      title: "דיני משפחה",
      description: "טיפול רגיש בענייני גירושין, משמורת ילדים, מזונות, חלוקת רכוש והסכמי ממון."
    },
    {
      icon: <FaShieldAlt />,
      title: "משפט פלילי",
      description: "ייצוג וסנגור בהליכים פליליים, כולל חקירות, מעצרים, שימועים וייצוג בבתי משפט."
    },
    {
      icon: <FaBalanceScale />,
      title: "ליטיגציה",
      description: "ייצוג בסכסוכים משפטיים, תביעות אזרחיות, ערעורים וניהול הליכים בבתי משפט."
    },
    {
      icon: <FaHandshake />,
      title: "גישור ובוררות",
      description: "פתרון סכסוכים בדרכים חלופיות, תוך חיסכון בזמן ובעלויות וניהול הליכי גישור ובוררות."
    },
    {
      icon: <FaFileContract />,
      title: "דיני עבודה",
      description: "ייעוץ למעסיקים ועובדים, ניסוח חוזי העסקה, ייצוג בסכסוכי עבודה וזכויות עובדים."
    },
    {
      icon: <FaUserTie />,
      title: "צוואות וירושות",
      description: "תכנון ירושה, ניסוח צוואות, ניהול עיזבונות וייצוג בסכסוכי ירושה."
    },
    {
      icon: <FaCarCrash />,
      title: "נזיקין ותאונות",
      description: "ייצוג נפגעי תאונות דרכים, תאונות עבודה, רשלנות רפואית ותביעות ביטוח."
    }
  ];

  return (
    <section id="services" dir="rtl" className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-[#4ECDC4]/10 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#FF6B6B]/10 translate-x-1/2 translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 relative inline-block"
          >
            <span className="relative z-10">תחומי התמחות</span>
            <span className="absolute -bottom-2 right-0 h-3 w-full bg-[#4ECDC4]/30 -z-10 transform -rotate-1"></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            משרד עורכי דין גמא מציע מגוון רחב של שירותים משפטיים מקצועיים, עם מחויבות לאיכות ומצוינות בכל תחום
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-right">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block backdrop-blur-sm bg-white/50 border border-white/20 rounded-lg p-6 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">צריכים ייעוץ משפטי?</h3>
            <p className="text-gray-600 mb-4">צוות המומחים שלנו זמין לענות על כל שאלה ולסייע בכל בעיה משפטית</p>
            <button className="bg-[#4ECDC4] hover:bg-[#FF6B6B] text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg">
              צרו קשר עכשיו
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;