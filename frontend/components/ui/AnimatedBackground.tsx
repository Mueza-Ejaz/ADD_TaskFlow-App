import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ className, children }) => {
  const [animationDuration, setAnimationDuration] = useState(15); // Default to desktop duration

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMediaQueryChange = () => {
      if (mediaQuery.matches) {
        setAnimationDuration(0); // Disable animation
      } else if (window.innerWidth <= 767) { // Mobile screen size (tailwind's sm breakpoint is 640px, but 767px is common for <= mobile)
        setAnimationDuration(8); // Shorter duration for mobile
      } else {
        setAnimationDuration(15); // Default desktop duration
      }
    };

    // Initial check
    handleMediaQueryChange();

    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    window.addEventListener('resize', handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      window.removeEventListener('resize', handleMediaQueryChange);
    };
  }, []);

  return (
    <motion.div
      className={`absolute inset-0 z-0 overflow-hidden ${className}`}
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{
        duration: animationDuration, // Use dynamic duration
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
      style={{
        background: 'linear-gradient(270deg, #7C3AED, #06D6A0, #0F172A)', // Deep Purple, Cyan, Dark
        backgroundSize: '200% 200%',
        willChange: 'background-position', // Add will-change for performance optimization
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedBackground;
