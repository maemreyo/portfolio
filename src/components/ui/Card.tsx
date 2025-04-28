'use client';

import { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  clickable?: boolean;
  gradient?: string;
  onClick?: () => void;
}

export default function Card({ 
  children, 
  className = '', 
  hoverEffect = true,
  clickable = false,
  gradient,
  onClick
}: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Default gradient if none provided
  const defaultGradient = 'from-blue-500 to-indigo-600';
  const gradientClasses = gradient || defaultGradient;
  
  // Card animation variants
  const cardVariants = {
    initial: { 
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    },
    hover: hoverEffect ? { 
      y: -8,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      transition: { 
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    } : {},
    tap: clickable ? {
      scale: 0.98,
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      transition: { duration: 0.1 }
    } : {}
  };
  
  // Gradient animation variants
  const gradientVariants = {
    initial: { opacity: 0, height: '2px' },
    hover: { 
      opacity: 1, 
      height: '4px',
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden ${clickable ? 'cursor-pointer' : ''} ${className}`}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      whileTap={clickable ? "tap" : undefined}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated gradient border on hover */}
      <motion.div 
        className={`w-full bg-gradient-to-r ${gradientClasses}`}
        variants={gradientVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
      
      {children}
    </motion.div>
  );
}