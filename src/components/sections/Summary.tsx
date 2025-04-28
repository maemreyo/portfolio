'use client';

import { useRef } from 'react';
import { ProfileSummary } from '@/types/portfolio';
import Section from '../ui/Section';
import ScrollReveal from '../animations/ScrollReveal';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import Badge from '../ui/Badge';
import { motion, useInView } from 'framer-motion';

interface SummaryProps {
  profileSummary: ProfileSummary;
}

export default function Summary({ profileSummary }: SummaryProps) {
  const pitchRef = useRef(null);
  const isInView = useInView(pitchRef, { once: true, amount: 0.3 });
  
  // Animation variants
  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }
  };
  
  const keywordVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.05 * i,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1.0],
      }
    }),
    hover: {
      scale: 1.1,
      transition: { duration: 0.2 }
    }
  };
  
  const quoteVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.05,
        delayChildren: 0.2,
      }
    }
  };
  
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };
  
  // Split the elevator pitch into individual characters for animation
  const pitchLetters = profileSummary.elevatorPitch.split('');

  return (
    <Section title="Profile Summary" className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <motion.div 
            className="max-w-3xl relative flex-1"
            variants={fadeInUpVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="absolute -left-4 top-0 h-full w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
              {profileSummary.fullText}
            </p>
          </motion.div>
          
          {/* Add a secondary image if available */}
          {profileSummary.secondaryImage && (
            <motion.div
              className="w-full md:w-1/3 flex-shrink-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <img 
                src={profileSummary.secondaryImage} 
                alt="Professional portrait"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </motion.div>
          )}
        </div>

        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </span>
              Key Strengths
            </h3>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {profileSummary.keyStrengths.map((strength, index) => (
              <StaggerItem key={index}>
                <motion.div 
                  className="flex items-start bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border-l-4 border-blue-500 dark:border-blue-600"
                  whileHover={{ 
                    x: 5, 
                    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex-shrink-0 mr-3">
                    <motion.div 
                      className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <svg 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M5 13l4 4L19 7" 
                        />
                      </svg>
                    </motion.div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">{strength}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        <div className="mb-16">
          <ScrollReveal>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </span>
              Elevator Pitch
            </h3>
          </ScrollReveal>
          
          <motion.div 
            ref={pitchRef}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-xl shadow-md border border-blue-100 dark:border-blue-900/30 relative overflow-hidden"
            variants={fadeInUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-tr-full"></div>
            
            <motion.div
              className="relative z-10"
              variants={quoteVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <svg className="w-12 h-12 text-blue-300 dark:text-blue-700 absolute -top-6 -left-6 opacity-50" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-serif">
                {pitchLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </p>
            </motion.div>
          </motion.div>
        </div>

        <div>
          <ScrollReveal>
            <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 flex items-center">
              <span className="bg-gradient-to-r from-green-600 to-teal-600 h-8 w-8 rounded-full flex items-center justify-center text-white mr-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
              </span>
              Keywords & Expertise
            </h3>
          </ScrollReveal>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {profileSummary.keywords.map((keyword, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={keywordVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Badge 
                  variant={index % 6 === 0 ? 'primary' : 
                          index % 6 === 1 ? 'secondary' : 
                          index % 6 === 2 ? 'success' : 
                          index % 6 === 3 ? 'info' :
                          index % 6 === 4 ? 'warning' : 'danger'}
                >
                  {keyword}
                </Badge>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-semibold text-blue-600 dark:text-blue-400">{profileSummary.yearsOfExperience}+ years</span> of professional experience in frontend development
            </p>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}