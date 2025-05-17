'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

export interface CardProps {
  id?: string;
  variant?: 'basic' | 'elevated' | 'outlined' | 'interactive';
  className?: string;
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  imageAlt?: string;
  footer?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  hoverEffect?: boolean;
  animationDelay?: number;
}

const Card: React.FC<CardProps> = ({
  id = `card-${Math.random().toString(36).substr(2, 9)}`,
  variant = 'basic',
  className = '',
  title,
  subtitle,
  imageUrl,
  imageAlt = 'תמונת כרטיס',
  footer,
  children,
  onClick,
  hoverEffect = true,
  animationDelay = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Base styles for all card variants
  const baseStyles = 'rounded-lg overflow-hidden flex flex-col text-right dir-rtl';
  
  // Variant-specific styles
  const variantStyles = {
    basic: 'bg-white border border-gray-200',
    elevated: 'bg-white shadow-lg',
    outlined: 'border-2 border-[#4ECDC4] bg-white/80 backdrop-blur-sm',
    interactive: 'bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md border border-white/20 shadow-md cursor-pointer transition-all duration-300',
  };

  // Hover effect styles
  const hoverStyles = hoverEffect && isHovered ? (
    variant === 'interactive' 
      ? 'transform -translate-y-1 shadow-xl border-[#4ECDC4]/50' 
      : 'shadow-md'
  ) : '';

  // Animation variants
  const cardAnimations = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: animationDelay,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      id={id}
      dir="rtl"
      initial="hidden"
      animate="visible"
      variants={cardAnimations}
      className={`${baseStyles} ${variantStyles[variant]} ${hoverStyles} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={hoverEffect ? { y: -5 } : {}}
      transition={{ duration: 0.2 }}
    >
      {imageUrl && (
        <div className="relative w-full h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={imageAlt} 
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          />
          {variant === 'interactive' && isHovered && (
            <div className="absolute inset-0 bg-[#4ECDC4]/20 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm p-2 rounded-full">
                <FaArrowLeft className="text-[#FF6B6B] transform rotate-180" />
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 p-5">
        {title && (
          <h3 className="text-xl font-bold mb-2 text-gray-800 font-display">
            {title}
          </h3>
        )}
        
        {subtitle && (
          <h4 className="text-md text-[#FF6B6B] mb-3 font-medium">
            {subtitle}
          </h4>
        )}
        
        <div className="text-gray-700">
          {children}
        </div>
      </div>
      
      {footer && (
        <div className="p-4 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm">
          {footer}
        </div>
      )}
    </motion.div>
  );
};

// Usage examples component
export const CardExamples: React.FC = () => {
  return (
    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-gray-100">
      {/* Basic Card */}
      <Card 
        title="ייעוץ משפטי"
        subtitle="התייעצות ראשונית"
        imageUrl="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        variant="basic"
        animationDelay={0.1}
      >
        <p>אנו מציעים ייעוץ משפטי מקצועי בתחומים מגוונים. פגישת ייעוץ ראשונית ללא עלות.</p>
      </Card>
      
      {/* Elevated Card */}
      <Card 
        title="דיני משפחה"
        subtitle="מומחיות וניסיון"
        imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        variant="elevated"
        animationDelay={0.2}
        footer={<p className="text-sm text-gray-500">למידע נוסף התקשרו: 03-1234567</p>}
      >
        <p>צוות המשרד מתמחה בדיני משפחה, גירושין, מזונות, משמורת ילדים ועוד.</p>
      </Card>
      
      {/* Outlined Card */}
      <Card 
        title="דיני עבודה"
        subtitle="הגנה על זכויותיך"
        imageUrl="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        variant="outlined"
        animationDelay={0.3}
      >
        <p>אנו מייצגים עובדים ומעסיקים בסכסוכי עבודה, פיטורין שלא כדין, והפרות חוזה.</p>
      </Card>
      
      {/* Interactive Card */}
      <Card 
        title="נדל״ן ומקרקעין"
        subtitle="ליווי עסקאות מורכבות"
        imageUrl="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        variant="interactive"
        animationDelay={0.4}
        onClick={() => alert('לחצת על כרטיס נדל״ן ומקרקעין')}
        footer={<div className="flex justify-between items-center"><span>לחץ לפרטים</span><FaArrowLeft className="transform rotate-180" /></div>}
      >
        <p>ליווי משפטי מקיף בעסקאות נדל״ן, רכישה ומכירה של דירות, השכרה, ותכנון ובנייה.</p>
      </Card>
    </div>
  );
};

export default Card;