'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaBalanceScale, FaHandshake, FaUserTie, FaAward } from 'react-icons/fa';
import Image from 'next/image';

interface StatisticProps {
  value: number;
  label: string;
  icon: React.ReactNode;
  duration?: number;
}

const StatisticCounter: React.FC<StatisticProps> = ({ value, label, icon, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        let startTime: number;
        const animateCount = (timestamp: number) => {
          if (!startTime) startTime = timestamp;
          const progress = timestamp - startTime;
          const percentage = Math.min(progress / duration, 1);
          setCount(Math.floor(percentage * value));
          
          if (percentage < 1) {
            requestAnimationFrame(animateCount);
          }
        };
        
        requestAnimationFrame(animateCount);
        observer.current?.disconnect();
      }
    });
    
    if (countRef.current) {
      observer.current.observe(countRef.current);
    }
    
    return () => {
      observer.current?.disconnect();
    };
  }, [value, duration]);

  return (
    <div className="flex flex-col items-center p-6 bg-white/20 backdrop-filter backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
      <div className="text-secondary-500 mb-3 text-3xl">
        {icon}
      </div>
      <span ref={countRef} className="text-4xl font-bold text-primary-500">{count}</span>
      <span className="mt-2 text-gray-700 font-medium text-center">{label}</span>
    </div>
  );
};

const AboutSection: React.FC = () => {
  return (
    <section id="about" dir="rtl" className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary-100 opacity-50 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-secondary-100 opacity-40 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="text-right mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 inline-block relative"
          >
            <span className="relative z-10">אודות משרד עורכי דין גמא</span>
            <span className="absolute bottom-2 right-0 h-3 w-full bg-primary-200 -z-0"></span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mr-auto ml-0"
          >
            אנחנו משרד עורכי דין מוביל בתחום המשפטים עם ניסיון של שנים רבות. אנחנו מתמחים במתן שירות מקצועי ואיכותי ללקוחותינו.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 rounded-xl"></div>
            <Image
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
              alt="משרד עורכי דין גמא"
              fill
              className="object-cover rounded-xl"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-filter backdrop-blur-sm p-4 rounded-lg shadow-lg max-w-xs">
              <p className="text-gray-800 font-medium text-right">
                צוות המשרד שלנו מחויב להשגת תוצאות מיטביות עבור לקוחותינו בכל תיק ותיק
              </p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-white/50 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">המומחיות שלנו</h3>
              <p className="text-gray-700 mb-6">
                משרדנו מתמחה במגוון תחומי המשפט, כולל דיני משפחה, נדל"ן, דיני עבודה, ליטיגציה מסחרית ועוד. הניסיון העשיר שלנו מאפשר לנו להציע פתרונות משפטיים מקיפים ויעילים.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">דיני משפחה</span>
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">נדל"ן</span>
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">דיני עבודה</span>
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">ליטיגציה מסחרית</span>
                <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">דיני חברות</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white/30 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-white/50 shadow-xl"
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800">הערכים שלנו</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <div className="bg-secondary-100 p-2 rounded-full text-secondary-500">
                    <FaHandshake />
                  </div>
                  <span className="text-gray-700">מחויבות מלאה ללקוחותינו</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-secondary-100 p-2 rounded-full text-secondary-500">
                    <FaBalanceScale />
                  </div>
                  <span className="text-gray-700">יושרה מקצועית ואתיקה ללא פשרות</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-secondary-100 p-2 rounded-full text-secondary-500">
                    <FaUserTie />
                  </div>
                  <span className="text-gray-700">מקצועיות ומצוינות בכל תחום</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-secondary-100 p-2 rounded-full text-secondary-500">
                    <FaAward />
                  </div>
                  <span className="text-gray-700">חדשנות וגישה יצירתית לפתרון בעיות</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">המספרים מדברים בעד עצמם</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatisticCounter 
              value={25} 
              label="שנות ניסיון" 
              icon={<FaBalanceScale />} 
            />
            <StatisticCounter 
              value={1500} 
              label="תיקים שטופלו בהצלחה" 
              icon={<FaAward />} 
            />
            <StatisticCounter 
              value={98} 
              label="אחוזי שביעות רצון" 
              icon={<FaHandshake />} 
            />
            <StatisticCounter 
              value={20} 
              label="עורכי דין מומחים" 
              icon={<FaUserTie />} 
            />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-white/40 backdrop-filter backdrop-blur-md px-8 py-6 rounded-xl border border-white/50 shadow-lg">
            <p className="text-xl text-gray-700 font-medium">
              מוזמנים ליצור קשר עם משרדנו לייעוץ ראשוני ללא התחייבות
            </p>
            <button className="mt-4 bg-secondary-500 hover:bg-secondary-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              צור קשר עכשיו
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;