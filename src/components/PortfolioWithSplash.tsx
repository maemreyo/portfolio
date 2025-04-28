'use client';

import { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioData } from '@/types/portfolio';
import SplashScreen from './animations/SplashScreen';
import AnimatedBackground from './animations/AnimatedBackground';

interface PortfolioWithSplashProps {
  portfolioData: PortfolioData;
  portfolioContent: ReactNode;
}

export default function PortfolioWithSplash({ 
  portfolioData, 
  portfolioContent 
}: PortfolioWithSplashProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [showPortfolio, setShowPortfolio] = useState(false);
  
  const handleSplashComplete = () => {
    setShowSplash(false);
    
    // Small delay before showing the portfolio content
    setTimeout(() => {
      setShowPortfolio(true);
      
      // Enable scrolling after splash screen
      document.body.style.overflow = 'auto';
    }, 500);
  };
  
  useEffect(() => {
    // Disable scrolling during splash screen
    document.body.style.overflow = 'hidden';
    
    // If user refreshes or navigates directly to a specific section,
    // we can check for a URL hash and skip the splash screen
    if (window.location.hash) {
      handleSplashComplete();
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);
  
  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="fixed inset-0 z-50"
            exit={{ opacity: 0 }}
          >
            <AnimatedBackground />
            <SplashScreen 
              onComplete={handleSplashComplete} 
              fullName={portfolioData.personalInfo.displayName || portfolioData.personalInfo.fullName} 
              title={portfolioData.personalInfo.title} 
            />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Render content with animation when splash is complete */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showPortfolio ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className={!showPortfolio ? 'invisible' : ''}
      >
        {portfolioContent}
      </motion.div>
    </>
  );
}
