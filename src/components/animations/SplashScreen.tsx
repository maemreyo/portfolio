'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo3D from './Logo3D';
import TypewriterEffect from './TypewriterEffect';

interface SplashScreenProps {
  onComplete: () => void;
  fullName: string;
  title: string;
}

export default function SplashScreen({ onComplete, fullName, title }: SplashScreenProps) {
  const [isAnimating, setIsAnimating] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Split name into individual letters for animation
  const nameLetters = fullName.split('');
  const titleWords = title.split(' ');
  
  const exitAnimation = useCallback(() => {
    // Immediately complete the animation without trying to animate DOM elements
    setIsAnimating(false);
    onComplete();
  }, [onComplete]);
  
  useEffect(() => {
    // Initial delay then show content
    const timeout = setTimeout(() => {
      setShowContent(true);
      
      // Auto-proceed after 5 seconds
      const autoExitTimeout = setTimeout(() => {
        if (isAnimating) {
          exitAnimation();
        }
      }, 5000);
      
      return () => clearTimeout(autoExitTimeout);
    }, 500);
    
    return () => {
      clearTimeout(timeout);
      setIsAnimating(false);
    };
  }, [isAnimating, exitAnimation]);
  
  // Generate random positions for decorative elements
  const decorativeElements = Array.from({ length: 15 }, (_, i) => {
    const size = Math.random() * 100 + 50;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const delay = Math.random() * 0.5;
    
    return { size, top, left, delay, id: i };
  });
  
  // Generate particles for a more dynamic background
  const particles = Array.from({ length: 30 }, (_, i) => {
    const size = Math.random() * 6 + 2;
    const top = Math.random() * 100;
    const left = Math.random() * 100;
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 2;
    
    return { size, top, left, duration, delay, id: i };
  });

  return (
    <AnimatePresence>
      {isAnimating && (
        <motion.div 
          className="splash-screen fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Decorative elements */}
          {decorativeElements.map((el) => (
            <motion.div
              key={el.id}
              className="decorative-element absolute rounded-full bg-white opacity-0"
              style={{ 
                width: el.size, 
                height: el.size, 
                top: `${el.top}%`, 
                left: `${el.left}%`,
                filter: 'blur(50px)',
                background: `radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ 
                duration: 1.5,
                delay: 0.2 + el.delay,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Animated particles */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay"></div>
          
          {/* Floating particles */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-white"
              style={{ 
                width: particle.size, 
                height: particle.size, 
                top: `${particle.top}%`, 
                left: `${particle.left}%`,
                opacity: 0.4
              }}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.4, 0],
                y: [0, -100, -200],
                x: [0, Math.random() * 50 - 25, Math.random() * 100 - 50]
              }}
              transition={{ 
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
          
          {showContent && (
            <div className="splash-content relative z-10 text-center px-6">
              {/* Logo */}
              <motion.div 
                className="logo-circle w-32 h-32 mx-auto mb-8 opacity-0"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Logo3D letter={nameLetters[0]} />
              </motion.div>
              
              {/* Name */}
              <div className="mb-4 overflow-hidden">
                <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
                  {nameLetters.map((letter, index) => (
                    <motion.span
                      key={index}
                      className="name-letter inline-block opacity-0"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.5 + index * 0.05,
                        duration: 0.5
                      }}
                    >
                      {letter === ' ' ? '\u00A0' : letter}
                    </motion.span>
                  ))}
                </h1>
              </div>
              
              {/* Separator line */}
              <motion.div 
                className="separator-line h-1 w-24 mx-auto my-6 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full opacity-0 origin-left"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              />
              
              {/* Title */}
              <div className="mb-12 overflow-hidden">
                <h2 className="text-xl md:text-2xl text-blue-200 font-light tracking-wide">
                  <TypewriterEffect 
                    text={title}
                    typingSpeed={70}
                    startDelay={1500}
                    className="title-word inline-block"
                  />
                </h2>
              </div>
              
              {/* Enter button */}
              <motion.button
                className="enter-button px-8 py-3 bg-white text-indigo-900 rounded-full font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-lg opacity-0 relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.5 }}
                onClick={exitAnimation}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Explore My Work</span>
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <motion.div 
                  className="absolute top-0 -right-full h-full w-full bg-white group-hover:right-0 z-0 transition-all duration-500"
                  animate={{ right: "-100%" }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}