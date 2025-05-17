'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

// Define types for case studies
interface CaseStudy {
  id: string;
  title: string;
  description: string;
  outcome: string;
  type: CaseType;
  imageUrl: string;
}

// Define case types
type CaseType = 'corporate' | 'family' | 'realestate' | 'criminal' | 'all';

// Case type translations
const caseTypeTranslations: Record<CaseType, string> = {
  all: 'הכל',
  corporate: 'תאגידי',
  family: 'משפחה',
  realestate: 'נדל"ן',
  criminal: 'פלילי'
};

// Sample case studies data
const caseStudiesData: CaseStudy[] = [
  {
    id: 'case1',
    title: 'ייצוג חברת הייטק בסכסוך מסחרי',
    description: 'ייצגנו חברת הייטק מובילה בסכסוך מסחרי מורכב מול ספק שירותים בינלאומי.',
    outcome: 'הושג הסכם פשרה מיטבי שחסך לחברה מיליוני שקלים והבטיח המשך פעילות עסקית תקינה.',
    type: 'corporate',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case2',
    title: 'הסדר גירושין מורכב',
    description: 'טיפלנו בתיק גירושין מורכב שכלל נכסים משותפים רבים והסדרי משמורת על ילדים.',
    outcome: 'הצלחנו להשיג הסכם הוגן לשני הצדדים תוך שמירה על טובת הילדים כעיקרון מנחה.',
    type: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1591522810850-58128c5fb089?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case3',
    title: 'עסקת נדל"ן מסחרי בהיקף גדול',
    description: 'ליווינו משקיע בעסקת רכישה של מתחם מסחרי בשווי של עשרות מיליוני שקלים.',
    outcome: 'העסקה הושלמה בהצלחה תוך הבטחת האינטרסים של הלקוח וצמצום חשיפות משפטיות.',
    type: 'realestate',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case4',
    title: 'הגנה בתיק מרמה',
    description: 'ייצגנו מנהל בכיר שהואשם בעבירות מרמה והפרת אמונים בתאגיד.',
    outcome: 'התיק הסתיים בזיכוי מלא של הלקוח לאחר הליך משפטי ממושך.',
    type: 'criminal',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case5',
    title: 'מיזוג חברות טכנולוגיה',
    description: 'ליווינו מיזוג מורכב בין שתי חברות טכנולוגיה מובילות בשוק הישראלי.',
    outcome: 'המיזוג הושלם בהצלחה תוך שמירה על זכויות העובדים והבטחת המשך פעילות החברה המאוחדת.',
    type: 'corporate',
    imageUrl: 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case6',
    title: 'סכסוך ירושה מורכב',
    description: 'טיפלנו בסכסוך ירושה מורכב שכלל נכסים בארץ ובחו"ל ומספר רב של יורשים.',
    outcome: 'הצלחנו להגיע להסכמות בין כל הצדדים ולחלוקה הוגנת של הנכסים ללא צורך בהליך משפטי ארוך.',
    type: 'family',
    imageUrl: 'https://images.unsplash.com/photo-1605664041952-4a2855d9841d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case7',
    title: 'ליווי פרויקט התחדשות עירונית',
    description: 'ליווינו פרויקט תמ"א 38 מורכב בלב תל אביב שכלל עשרות דיירים ואתגרים תכנוניים.',
    outcome: 'הפרויקט יצא לדרך לאחר השגת הסכמות מכל הדיירים והסדרת כל ההיבטים המשפטיים והתכנוניים.',
    type: 'realestate',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'case8',
    title: 'הגנה בתיק הונאת מס',
    description: 'ייצגנו איש עסקים שהואשם בהונאת מס בהיקף משמעותי.',
    outcome: 'השגנו הסדר טיעון מיטבי שמנע מאסר בפועל והפחית משמעותית את הקנס הכספי.',
    type: 'criminal',
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

const PortfolioSection = () => {
  const [selectedType, setSelectedType] = useState<CaseType>('all');
  const [filteredCases, setFilteredCases] = useState<CaseStudy[]>(caseStudiesData);
  const [isClient, setIsClient] = useState(false);

  // Handle hydration issues
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Filter cases when type changes
  useEffect(() => {
    if (selectedType === 'all') {
      setFilteredCases(caseStudiesData);
    } else {
      setFilteredCases(caseStudiesData.filter(caseStudy => caseStudy.type === selectedType));
    }
  }, [selectedType]);

  // Handle filter change
  const handleFilterChange = (type: CaseType) => {
    setSelectedType(type);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (!isClient) {
    return null; // Prevent hydration issues
  }

  return (
    <section id="portfolio-section" dir="rtl" className="py-16 px-4 md:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-right mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800" style={{ color: '#4ECDC4' }}>
            תיקים מובילים שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mr-auto ml-0">
            משרד עורכי דין גמא גאה להציג מבחר מהתיקים המשמעותיים שטיפלנו בהם. הניסיון והמומחיות שלנו מאפשרים לנו להשיג תוצאות מיטביות עבור לקוחותינו בתחומי משפט מגוונים.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-end gap-3 mb-10">
          {Object.entries(caseTypeTranslations).map(([type, label]) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type as CaseType)}
              className={`px-6 py-2 rounded-full text-lg transition-all duration-300 backdrop-blur-sm border ${
                selectedType === type
                  ? 'bg-opacity-90 border-opacity-50 shadow-md'
                  : 'bg-opacity-20 border-opacity-20 hover:bg-opacity-30'
              }`}
              style={{
                backgroundColor: selectedType === type ? '#FF6B6B' : 'rgba(255, 107, 107, 0.1)',
                color: selectedType === type ? 'white' : '#333',
                borderColor: '#FF6B6B'
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Case Studies Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedType}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredCases.map(caseStudy => (
              <motion.div
                key={caseStudy.id}
                variants={itemVariants}
                className="rounded-xl overflow-hidden backdrop-blur-sm bg-white bg-opacity-70 border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ y: -5 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={caseStudy.imageUrl}
                    alt={caseStudy.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium"
                       style={{ backgroundColor: '#4ECDC4', color: 'white' }}>
                    {caseTypeTranslations[caseStudy.type]}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-right" style={{ color: '#333' }}>
                    {caseStudy.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-right">
                    {caseStudy.description}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-bold text-right mb-2" style={{ color: '#FF6B6B' }}>
                      תוצאה:
                    </h4>
                    <p className="text-gray-700 text-right">
                      {caseStudy.outcome}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="inline-block backdrop-blur-md bg-opacity-90 p-8 rounded-2xl shadow-lg" 
               style={{ backgroundColor: 'rgba(78, 205, 196, 0.1)', borderColor: '#4ECDC4', borderWidth: '1px' }}>
            <h3 className="text-2xl font-bold mb-4" style={{ color: '#4ECDC4' }}>
              רוצים לדעת איך נוכל לעזור לכם?
            </h3>
            <p className="text-gray-700 mb-6">
              צוות המומחים שלנו מוכן לסייע לכם בכל סוגיה משפטית. פנו אלינו עוד היום לייעוץ ראשוני.
            </p>
            <button 
              className="px-8 py-3 rounded-full text-white font-medium transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#FF6B6B' }}
            >
              צרו קשר עכשיו
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;