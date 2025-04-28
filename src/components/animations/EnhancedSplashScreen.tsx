'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './SplashScreen';
import AnimatedBackground from './AnimatedBackground';

interface EnhancedSplashScreenProps {
  fullName: string;
  title: string;
}

export default function EnhancedSplashScreen({ fullName, title }: EnhancedSplashScreenProps) {
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
      {showSplash && (
        <div className="fixed inset-0 z-50">
          <AnimatedBackground />
          <SplashScreen 
            onComplete={handleSplashComplete} 
            fullName={fullName} 
            title={title} 
          />
        </div>
      )}
      
      <AnimatePresence>
        {showPortfolio && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="portfolio-content"
          >
            {/* This is where the actual portfolio content will be rendered */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}