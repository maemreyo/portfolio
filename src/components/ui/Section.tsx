'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
  id?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.1 });
  
  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };
  
  const decorationVariants = {
    hidden: { width: 0 },
    visible: { 
      width: '100px',
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
        delay: 0.3
      }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        delay: 0.4
      }
    }
  };

  return (
    <section id={id} className={`py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div 
          ref={titleRef}
          className="mb-12 relative"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={titleVariants}
        >
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100 inline-block">
            {title}
          </h2>
          <motion.div 
            className="h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mt-2 rounded-full"
            variants={decorationVariants}
          />
        </motion.div>
        
        <motion.div 
          className="mt-6"
          variants={contentVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}