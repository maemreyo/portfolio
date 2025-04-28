'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TypewriterEffectProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  startDelay?: number;
  cursorBlinkSpeed?: number;
  onComplete?: () => void;
}

export default function TypewriterEffect({
  text,
  className = '',
  typingSpeed = 50,
  startDelay = 0,
  cursorBlinkSpeed = 500,
  onComplete
}: TypewriterEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Handle typing animation
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    // Start delay
    timeout = setTimeout(() => {
      setIsTyping(true);
      
      let currentIndex = 0;
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayedText(text.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsComplete(true);
          if (onComplete) onComplete();
        }
      }, typingSpeed);
      
      return () => clearInterval(intervalId);
    }, startDelay);
    
    return () => clearTimeout(timeout);
  }, [text, typingSpeed, startDelay, onComplete]);
  
  // Handle cursor blinking
  useEffect(() => {
    if (isComplete) {
      const intervalId = setInterval(() => {
        setCursorVisible(prev => !prev);
      }, cursorBlinkSpeed);
      
      return () => clearInterval(intervalId);
    }
  }, [isComplete, cursorBlinkSpeed]);
  
  return (
    <div className={`inline-flex text-blue-200 ${className}`}>
      <span className="text-blue-200">{displayedText}</span>
      {(isTyping || cursorVisible) && (
        <motion.span
          animate={{ opacity: cursorVisible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="ml-0.5 text-blue-200"
        >
          |
        </motion.span>
      )}
    </div>
  );
}