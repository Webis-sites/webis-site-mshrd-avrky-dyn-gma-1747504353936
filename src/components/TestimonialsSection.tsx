'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteRight, FaStar, FaStarHalfAlt, FaChevronRight, FaChevronLeft, FaPause, FaPlay } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  caseType: string;
  rating: number;
  quote: string;
  imageUrl?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "דוד כהן",
    caseType: "תביעה אזרחית",
    rating: 5,
    quote: "משרד עורכי דין גמא סייע לי בתביעה מורכבת שהתנהלה במשך שנתיים. המקצועיות והמסירות שלהם הובילו לתוצאה מעולה. אני ממליץ בחום על השירותים שלהם לכל מי שזקוק לייצוג משפטי איכותי.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    name: "מיכל לוי",
    caseType: "דיני משפחה",
    rating: 4.5,
    quote: "הליווי המשפטי שקיבלתי ממשרד גמא היה מעל ומעבר למצופה. הם היו קשובים לצרכים שלי, הסבירו את התהליך בצורה ברורה והיו זמינים עבורי בכל שלב. התוצאה הסופית הייתה טובה יותר ממה שציפיתי.",
    imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    name: "יוסי אברהם",
    caseType: "סכסוך מסחרי",
    rating: 5,
    quote: "המומחיות של צוות משרד גמא בתחום המסחרי הצילה את העסק שלי. הם הבינו מיד את מורכבות המקרה והציעו אסטרטגיה משפטית חכמה שהובילה לפתרון מהיר ויעיל של הסכסוך. אני אסיר תודה על המקצועיות והיחס האישי.",
    imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 4,
    name: "רונית שמעוני",
    caseType: "דיני עבודה",
    rating: 5,
    quote: "לאחר שפוטרתי שלא כדין, פניתי למשרד גמא לקבלת ייעוץ. הם ליוו אותי בתהליך המורכב מול המעסיק הקודם שלי בצורה מקצועית ורגישה. הודות לטיפול המסור שלהם, הצלחתי לקבל את הפיצויים המגיעים לי במלואם.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 5,
    name: "אבי גולדשטיין",
    caseType: "נדל\"ן",
    rating: 4.5,
    quote: "עורכי הדין במשרד גמא ליוו אותי ברכישת נכס מסחרי מורכב. הם בדקו את כל ההיבטים המשפטיים בקפידה, זיהו בעיות פוטנציאליות וטיפלו בהן לפני שהפכו לבעיות אמיתיות. השירות היה מעולה והמקצועיות ניכרת בכל שלב.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
  }
];

const RatingStars: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex flex-row-reverse">
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-400" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <FaStar key={`empty-${i}`} className="text-gray-300" />
      ))}
    </div>
  );
};

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToTestimonial = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  // Setup auto-rotation
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
    
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextTestimonial]);

  // Pause on hover/focus
  const handleMouseEnter = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    if (isAutoPlaying && autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = setInterval(() => {
        nextTestimonial();
      }, 5000);
    }
  };

  return (
    <section 
      id="testimonials-section" 
      dir="rtl" 
      className="py-16 px-4 md:px-8 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, rgba(78, 205, 196, 0.1) 0%, rgba(255, 107, 107, 0.1) 100%)`,
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            מה הלקוחות שלנו אומרים
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#4ECDC4] to-[#FF6B6B] mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">
            הסיפורים האמיתיים מאחורי ההצלחות המשפטיות שלנו
          </p>
        </div>

        <div 
          ref={containerRef}
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
        >
          <div 
            className="backdrop-blur-md bg-white/70 rounded-2xl p-8 shadow-lg border border-white/20 relative overflow-hidden"
            style={{ minHeight: '400px' }}
          >
            <div className="absolute top-6 right-8 text-6xl opacity-20 text-[#4ECDC4]">
              <FaQuoteRight />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                {testimonials[currentIndex].imageUrl && (
                  <div className="md:w-1/4 flex-shrink-0">
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden border-4 border-[#4ECDC4]/30">
                      <img 
                        src={testimonials[currentIndex].imageUrl} 
                        alt={testimonials[currentIndex].name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <div className="md:w-3/4 text-right">
                  <p className="text-lg md:text-xl mb-6 leading-relaxed text-gray-700">
                    {testimonials[currentIndex].quote}
                  </p>
                  
                  <div className="mt-4">
                    <h4 className="text-xl font-bold text-gray-800">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-[#FF6B6B] font-medium">
                      {testimonials[currentIndex].caseType}
                    </p>
                    <div className="mt-2">
                      <RatingStars rating={testimonials[currentIndex].rating} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4">
            <button
              onClick={prevTestimonial}
              className="bg-white/80 backdrop-blur-sm hover:bg-[#4ECDC4] text-gray-800 hover:text-white p-3 rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:ring-opacity-50"
              aria-label="הקודם"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white/80 backdrop-blur-sm hover:bg-[#4ECDC4] text-gray-800 hover:text-white p-3 rounded-full shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:ring-opacity-50"
              aria-label="הבא"
            >
              <FaChevronRight />
            </button>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] focus:ring-opacity-50 ${
                  currentIndex === index 
                    ? 'bg-[#FF6B6B] w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`עבור לחוות דעת ${index + 1}`}
                aria-current={currentIndex === index ? 'true' : 'false'}
              />
            ))}
          </div>

          {/* Auto-play toggle */}
          <div className="absolute bottom-0 left-4">
            <button
              onClick={toggleAutoPlay}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#4ECDC4] transition-colors duration-300 focus:outline-none focus:text-[#4ECDC4]"
              aria-label={isAutoPlaying ? 'השהה החלפה אוטומטית' : 'הפעל החלפה אוטומטית'}
            >
              {isAutoPlaying ? (
                <>
                  <FaPause size={12} />
                  <span>השהה</span>
                </>
              ) : (
                <>
                  <FaPlay size={12} />
                  <span>הפעל</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;