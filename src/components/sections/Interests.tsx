'use client';

import { useState } from 'react';
import Section from '../ui/Section';
import StaggerContainer, { StaggerItem } from '../animations/StaggerContainer';
import Card from '../ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

interface Interest {
  name: string;
  details: string;
}

interface InterestsProps {
  interests?: Interest[];
}

export default function Interests({ interests }: InterestsProps) {
  if (!interests || interests.length === 0) return null;

  return (
    <Section title="Interests & Hobbies" className="bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interests.map((interest, index) => (
            <StaggerItem key={index}>
              <InterestCard interest={interest} index={index} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}

interface InterestCardProps {
  interest: Interest;
  index: number;
}

function InterestCard({ interest, index }: InterestCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getIconForInterest = (name: string) => {
    switch (name.toLowerCase()) {
      case 'listening to podcasts':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        );
      case 'learning technologies':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      case 'reading books':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'listening to music':
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        );
      default:
        return (
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
    }
  };

  // Generate a gradient based on the index
  const gradients = [
    'from-blue-500 to-purple-500',
    'from-green-500 to-teal-500',
    'from-orange-500 to-red-500',
    'from-pink-500 to-purple-500'
  ];

  const gradient = gradients[index % gradients.length];

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full">
        <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <motion.div 
              className="flex-shrink-0 mr-3 text-blue-600 dark:text-blue-400"
              animate={isHovered ? { rotate: 360 } : {}}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              {getIconForInterest(interest.name)}
            </motion.div>
            
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {interest.name}
            </h3>
          </div>
          
          <AnimatePresence>
            <motion.p 
              className="text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {interest.details}
            </motion.p>
          </AnimatePresence>
          
          <motion.div 
            className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-end">
              <motion.button
                className="text-blue-600 dark:text-blue-400 flex items-center text-sm font-medium"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}