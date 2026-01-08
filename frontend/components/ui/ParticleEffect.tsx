import React from 'react';
import { motion } from 'framer-motion';

interface ParticleEffectProps {
  count?: number;
  className?: string;
}

const Particle: React.FC<{ initialX: number; initialY: number }> = ({ initialX, initialY }) => {
  const duration = Math.random() * 4 + 3; // 3 to 7 seconds
  const delay = Math.random() * 2; // 0 to 2 seconds delay
  const size = Math.random() * 3 + 2; // 2 to 5 pixels
  const opacity = Math.random() * 0.4 + 0.2; // 0.2 to 0.6 opacity

  return (
    <motion.div
      className="absolute bg-white rounded-full pointer-events-none"
      style={{
        left: `${initialX}vw`,
        top: `${initialY}vh`,
        width: size,
        height: size,
        opacity: opacity,
      }}
      initial={{ y: 0, x: 0 }}
      animate={{
        y: [0, Math.random() * 50 - 25, 0], // Float up/down slightly
        x: [0, Math.random() * 50 - 25, 0], // Float left/right slightly
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay: delay,
      }}
    />
  );
};

const ParticleEffect: React.FC<ParticleEffectProps> = ({ count = 30, className }) => {
  const particles = Array.from({ length: count }).map((_, i) => (
    <Particle key={i} initialX={Math.random() * 100} initialY={Math.random() * 100} />
  ));

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {particles}
    </div>
  );
};

export default ParticleEffect;
