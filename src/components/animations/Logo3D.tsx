'use client';

import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface Logo3DProps {
  letter: string;
  className?: string;
}

export default function Logo3D({ letter, className = '' }: Logo3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for tracking mouse position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Add spring physics for smoother movement
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  // Transform mouse position to rotation values
  const rotateX = useTransform(springY, [-100, 100], [15, -15]);
  const rotateY = useTransform(springX, [-100, 100], [-15, 15]);
  
  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };
  
  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`relative perspective-800 ${className}`}
    >
      <motion.div
        className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center transform-style-3d"
        style={{
          rotateX,
          rotateY
        }}
      >
        <span className="text-4xl font-bold text-white">
          {letter}
        </span>
        
        {/* Reflective surface effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-50"></div>
        
        {/* Shadow effect */}
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-black/20 blur-md rounded-full"></div>
      </motion.div>
    </div>
  );
}