'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaEnvelope, FaPhone } from 'react-icons/fa';

// Define types for team members
interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialization: string;
  bio: string;
  credentials: string;
  imageUrl: string;
  contact: {
    email: string;
    phone: string;
    linkedin?: string;
  };
}

const TeamSection: React.FC = () => {
  // Team members data
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: 1,
      name: "דניאל כהן",
      role: "שותף בכיר",
      specialization: "דיני חברות ומיסים",
      bio: "בעל ניסיון של למעלה מ-15 שנה בייעוץ לחברות גדולות במשק. מומחה בתחום המיסוי הבינלאומי ומיזוגים ורכישות.",
      credentials: "עו״ד, רו״ח, בוגר אוניברסיטת תל אביב",
      imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      contact: {
        email: "daniel@gamalaw.co.il",
        phone: "03-1234567",
        linkedin: "danielcohen"
      }
    },
    {
      id: 2,
      name: "מיכל לוי",
      role: "שותפה",
      specialization: "דיני עבודה",
      bio: "מובילה את מחלקת דיני העבודה במשרד. בעלת ניסיון עשיר בייצוג מעסיקים ועובדים בבתי הדין לעבודה.",
      credentials: "עו״ד, בוגרת האוניברסיטה העברית",
      imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=776&q=80",
      contact: {
        email: "michal@gamalaw.co.il",
        phone: "03-1234568",
        linkedin: "michallevi"
      }
    },
    {
      id: 3,
      name: "אבי גולדשטיין",
      role: "שותף",
      specialization: "ליטיגציה מסחרית",
      bio: "מתמחה בניהול הליכים משפטיים מורכבים בתחום המסחרי. ייצג בהצלחה חברות מובילות במשק בסכסוכים משפטיים.",
      credentials: "עו״ד, בוגר אוניברסיטת בר אילן",
      imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      contact: {
        email: "avi@gamalaw.co.il",
        phone: "03-1234569"
      }
    },
    {
      id: 4,
      name: "נועה ברק",
      role: "עורכת דין בכירה",
      specialization: "נדל״ן ותכנון ובנייה",
      bio: "מומחית בליווי עסקאות נדל״ן מורכבות, התחדשות עירונית וייצוג מול רשויות התכנון והבנייה.",
      credentials: "עו״ד, בוגרת אוניברסיטת תל אביב",
      imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      contact: {
        email: "noa@gamalaw.co.il",
        phone: "03-1234570",
        linkedin: "noabarak"
      }
    },
    {
      id: 5,
      name: "יוסף אלון",
      role: "עורך דין",
      specialization: "הייטק וקניין רוחני",
      bio: "מתמחה בליווי סטארטאפים וחברות טכנולוגיה, הסכמי השקעה, אופציות לעובדים ורישום פטנטים.",
      credentials: "עו״ד, בוגר הטכניון",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      contact: {
        email: "yosef@gamalaw.co.il",
        phone: "03-1234571"
      }
    },
    {
      id: 6,
      name: "שירה דוד",
      role: "עורכת דין",
      specialization: "דיני משפחה וירושה",
      bio: "מלווה משפחות בתהליכי גירושין, הסכמי ממון, צוואות וירושות. בעלת גישה רגישה ואמפתית.",
      credentials: "עו״ד, בוגרת המכללה למנהל",
      imageUrl: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
      contact: {
        email: "shira@gamalaw.co.il",
        phone: "03-1234572",
        linkedin: "shiradavid"
      }
    }
  ]);

  // Animation variants for framer-motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="team-section" className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100 dir-rtl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 relative inline-block">
            <span className="relative z-10">הצוות המשפטי שלנו</span>
            <span className="absolute bottom-1 right-0 w-full h-3 bg-[#4ECDC4] opacity-30 z-0"></span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            הכירו את הצוות המקצועי והמנוסה של משרד עורכי דין גמא. אנו מחויבים להעניק ללקוחותינו את הייעוץ המשפטי הטוב ביותר, תוך שימת דגש על מקצועיות, יחס אישי ותוצאות מצוינות.
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {teamMembers.map((member) => (
            <motion.div 
              key={member.id}
              className="bg-white backdrop-filter backdrop-blur-lg bg-opacity-70 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              variants={itemVariants}
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={member.imageUrl}
                  alt={`תמונה של ${member.name}, ${member.role}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                  priority={member.id <= 3}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 right-0 p-6 text-right">
                  <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-[#4ECDC4] font-medium">{member.role}</p>
                </div>
              </div>
              
              <div className="p-6 text-right">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-sm font-medium bg-[#FF6B6B] bg-opacity-10 text-[#FF6B6B] rounded-full mb-3">
                    {member.specialization}
                  </span>
                  <p className="text-sm text-gray-500 mb-2">{member.credentials}</p>
                  <p className="text-gray-700 leading-relaxed">{member.bio}</p>
                </div>
                
                <div className="flex justify-end items-center space-x-reverse space-x-3 mt-4 pt-4 border-t border-gray-100">
                  {member.contact.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${member.contact.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4ECDC4] text-white hover:bg-[#3dbdb5] transition-colors"
                      aria-label={`הפרופיל של ${member.name} בלינקדאין`}
                    >
                      <FaLinkedinIn />
                    </a>
                  )}
                  <a 
                    href={`mailto:${member.contact.email}`} 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4ECDC4] text-white hover:bg-[#3dbdb5] transition-colors"
                    aria-label={`שלח אימייל ל${member.name}`}
                  >
                    <FaEnvelope />
                  </a>
                  <a 
                    href={`tel:${member.contact.phone}`} 
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-[#4ECDC4] text-white hover:bg-[#3dbdb5] transition-colors"
                    aria-label={`התקשר ל${member.name}`}
                  >
                    <FaPhone />
                  </a>
                  <span className="text-sm text-gray-500 mr-2">{member.contact.phone}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">צריכים ייעוץ משפטי מקצועי?</h3>
            <p className="text-gray-600 mb-6">
              צוות המומחים שלנו ישמח לעמוד לרשותכם ולסייע בכל שאלה או אתגר משפטי. אנו מזמינים אתכם ליצור קשר לקביעת פגישת ייעוץ.
            </p>
            <a 
              href="#contact" 
              className="inline-block px-8 py-3 bg-[#FF6B6B] text-white font-medium rounded-lg hover:bg-[#ff5252] transition-colors shadow-md hover:shadow-lg"
            >
              צרו קשר עכשיו
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TeamSection;