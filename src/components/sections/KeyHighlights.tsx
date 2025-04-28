'use client';

import { useState, useRef } from 'react';
import Section from '../ui/Section';
import Badge from '../ui/Badge';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import { motion, useInView, AnimatePresence } from 'framer-motion';

interface KeyHighlight {
  area: string;
  highlight: string;
  impact: string;
  skillsDemonstrated: string[];
}

interface KeyHighlightsProps {
  highlights: KeyHighlight[];
}

export default function KeyHighlights({ highlights }: KeyHighlightsProps) {
  return (
    <Section title="Key Highlights">
      <div className="container mx-auto px-4 max-w-6xl">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {highlights.map((highlight, index) => (
            <StaggerItem key={index} direction="up">
              <HighlightCard highlight={highlight} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}

interface HighlightCardProps {
  highlight: KeyHighlight;
  index: number;
}

function HighlightCard({ highlight, index }: HighlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.3 });
  
  // Generate a gradient based on the index
  const gradients = [
    'from-blue-500 to-indigo-600',
    'from-purple-500 to-pink-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600'
  ];
  
  const gradient = gradients[index % gradients.length];
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    },
    hover: {
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        delay: 0.3,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };
  
  // Get icon based on area
  const getIconForArea = (area: string) => {
    if (area.toLowerCase().includes('leadership')) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    } else if (area.toLowerCase().includes('performance')) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    } else if (area.toLowerCase().includes('component') || area.toLowerCase().includes('architecture')) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      );
    } else if (area.toLowerCase().includes('collaboration')) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      );
    } else {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
    >
      <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
      <div className="p-6">
        <div className="flex items-start mb-4">
          <motion.div 
            className={`flex-shrink-0 mr-3 p-2 rounded-full bg-gradient-to-br ${gradient} text-white`}
            variants={iconVariants}
          >
            {getIconForArea(highlight.area)}
          </motion.div>
          
          <div>
            <h3 className="text-xl font-bold mb-1 text-gray-800 dark:text-gray-100">
              {highlight.area}
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-3"></div>
          </div>
        </div>
        
        <motion.p 
          className="text-gray-700 dark:text-gray-300 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {highlight.highlight}
        </motion.p>
        
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center mb-2">
            <svg className="w-4 h-4 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
              Impact
            </h4>
          </div>
          <div className="pl-6">
            <p className="text-gray-700 dark:text-gray-300 italic">
              {highlight.impact}
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Skills Demonstrated
              </h4>
            </div>
            
            <motion.button
              className="text-blue-600 dark:text-blue-400 p-1 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
              onClick={() => setIsExpanded(!isExpanded)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.svg 
                className="w-5 h-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap gap-2 pl-6">
                  {highlight.skillsDemonstrated.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * skillIndex }}
                    >
                      <Badge 
                        variant={skillIndex % 5 === 0 ? 'primary' : 
                                skillIndex % 5 === 1 ? 'info' : 
                                skillIndex % 5 === 2 ? 'success' :
                                skillIndex % 5 === 3 ? 'warning' : 'secondary'}
                        size="sm"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap gap-2 pl-6"
              >
                {highlight.skillsDemonstrated.slice(0, 3).map((skill, skillIndex) => (
                  <Badge 
                    key={skillIndex} 
                    variant={skillIndex % 3 === 0 ? 'primary' : 
                            skillIndex % 3 === 1 ? 'info' : 'secondary'}
                    size="sm"
                  >
                    {skill}
                  </Badge>
                ))}
                {highlight.skillsDemonstrated.length > 3 && (
                  <Badge variant="secondary" size="sm">
                    +{highlight.skillsDemonstrated.length - 3} more
                  </Badge>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}