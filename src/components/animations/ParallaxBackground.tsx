'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxBackgroundProps {
  className?: string;
  speed?: number;
  children?: React.ReactNode;
}

export default function ParallaxBackground({
  className = '',
  speed = 0.5,
  children
}: ParallaxBackgroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div 
        className="absolute inset-0 w-full h-full"
        style={{ y, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-indigo-600/10 dark:from-blue-900/20 dark:to-indigo-900/20"></div>
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 -right-20 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 left-1/4 w-64 h-64 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
      </motion.div>
      
      {children}
    </div>
  );
}

interface ParallaxItemProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  speed?: number;
  className?: string;
}

export function ParallaxItem({
  children,
  direction = 'up',
  speed = 20,
  className = ''
}: ParallaxItemProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const getDirectionTransform = () => {
    switch (direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], ["0%", `-${speed}%`]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], ["0%", `${speed}%`]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], ["0%", `-${speed}%`]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], ["0%", `${speed}%`]);
      default:
        return useTransform(scrollYProgress, [0, 1], ["0%", `-${speed}%`]);
    }
  };
  
  const transform = getDirectionTransform();
  const style = direction === 'left' || direction === 'right' 
    ? { x: transform } 
    : { y: transform };

  return (
    <motion.div
      ref={ref}
      style={style}
      className={className}
    >
      {children}
    </motion.div>
  );
}