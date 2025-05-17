'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  id?: string;
  title: string;
  subtitle?: string;
  alignment?: 'right' | 'center' | 'left';
  className?: string;
  decorativeStyle?: 'line' | 'dots' | 'none';
  size?: 'small' | 'medium' | 'large';
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  id = 'section-header',
  title,
  subtitle,
  alignment = 'right',
  className = '',
  decorativeStyle = 'line',
  size = 'medium',
}) => {
  // Determine text alignment class based on alignment prop
  const alignmentClass = {
    right: 'text-right',
    center: 'text-center',
    left: 'text-left',
  }[alignment];

  // Determine size classes
  const sizeClasses = {
    small: {
      title: 'text-xl md:text-2xl',
      subtitle: 'text-sm md:text-base',
      spacing: 'mb-4',
    },
    medium: {
      title: 'text-2xl md:text-3xl',
      subtitle: 'text-base md:text-lg',
      spacing: 'mb-6',
    },
    large: {
      title: 'text-3xl md:text-4xl lg:text-5xl',
      subtitle: 'text-lg md:text-xl',
      spacing: 'mb-8',
    },
  }[size];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Render decorative element based on style
  const renderDecorative = () => {
    switch (decorativeStyle) {
      case 'line':
        return (
          <motion.div
            variants={itemVariants}
            className={`h-1 bg-gradient-to-l from-[#4ECDC4] to-[#FF6B6B] rounded-full mt-2 mb-4 ${
              alignment === 'center' ? 'mx-auto w-24' : alignment === 'left' ? 'mr-auto ml-0 w-24' : 'ml-auto mr-0 w-24'
            }`}
          />
        );
      case 'dots':
        return (
          <motion.div
            variants={itemVariants}
            className={`flex gap-1.5 mt-2 mb-4 ${
              alignment === 'center' ? 'justify-center' : alignment === 'left' ? 'justify-start' : 'justify-end'
            }`}
          >
            <span className="inline-block h-2 w-2 rounded-full bg-[#4ECDC4]"></span>
            <span className="inline-block h-2 w-2 rounded-full bg-[#FF6B6B]"></span>
            <span className="inline-block h-2 w-2 rounded-full bg-[#4ECDC4]"></span>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      id={id}
      dir="rtl"
      className={`section-header ${alignmentClass} ${sizeClasses.spacing} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={containerVariants}
    >
      <div className="relative backdrop-blur-sm bg-white/30 p-6 rounded-lg border border-white/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4ECDC4]/10 to-[#FF6B6B]/10 rounded-lg -z-10"></div>
        
        <motion.h2
          variants={itemVariants}
          className={`font-bold ${sizeClasses.title} text-gray-800 font-display`}
        >
          {title}
        </motion.h2>
        
        {renderDecorative()}
        
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className={`${sizeClasses.subtitle} text-gray-600 mt-2 font-body`}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </motion.div>
  );
};

export default SectionHeader;