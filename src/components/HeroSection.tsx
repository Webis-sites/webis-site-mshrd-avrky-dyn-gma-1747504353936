'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaArrowLeft } from 'react-icons/fa';

interface HeroProps {}

const Hero: React.FC<HeroProps> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section 
      id="hero-section" 
      dir="rtl" 
      className="relative w-full h-[90vh] min-h-[600px] overflow-hidden text-right"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="משרד עורכי דין מקצועי"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/80 to-black/40"></div>
      </div>

      {/* Content Container */}
      <motion.div
        className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <div className="w-full max-w-2xl">
          {/* Glassmorphism Card */}
          <motion.div 
            className="backdrop-blur-md bg-white/10 p-8 sm:p-10 rounded-xl border border-white/20 shadow-xl"
            variants={itemVariants}
          >
            {/* Logo/Brand */}
            <motion.div 
              className="mb-6 inline-block"
              variants={itemVariants}
            >
              <div className="text-xl font-bold text-white bg-gradient-to-l from-[#4ECDC4] to-[#FF6B6B] bg-clip-text text-transparent py-1 px-3 rounded-lg border border-white/20">
                משרד עורכי דין גמא
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white leading-tight"
              variants={itemVariants}
            >
              משרד עורכי דין <span className="text-[#4ECDC4]">מוביל</span> בישראל
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-xl md:text-2xl text-gray-200 mb-8"
              variants={itemVariants}
            >
              חווית לקוח <span className="text-[#FF6B6B] font-semibold">מושלמת</span> בכל ביקור
            </motion.p>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="flex justify-start"
            >
              <motion.button
                className="group flex items-center gap-2 bg-gradient-to-l from-[#4ECDC4] to-[#4ECDC4]/80 hover:from-[#FF6B6B] hover:to-[#FF6B6B]/80 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                קבע תור עכשיו
                <FaArrowLeft className="mr-2 group-hover:translate-x-[-4px] transition-transform duration-300" />
              </motion.button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="mt-10 flex flex-wrap gap-4 text-white/80"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ECDC4]"></div>
                <span>ניסיון של שנים רבות</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#FF6B6B]"></div>
                <span>שירות מקצועי ואיכותי</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#4ECDC4]"></div>
                <span>ליווי אישי לכל לקוח</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/40 to-transparent z-5"></div>
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-[#4ECDC4]/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      ></motion.div>
      <motion.div 
        className="absolute bottom-40 right-20 w-40 h-40 rounded-full bg-[#FF6B6B]/20 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      ></motion.div>
    </section>
  );
};

export default Hero;