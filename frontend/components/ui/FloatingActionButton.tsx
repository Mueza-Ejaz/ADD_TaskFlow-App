import React from 'react';
import { motion } from 'framer-motion';

interface FloatingActionButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  label?: string;
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  onClick,
  icon = '+', // Default icon is a plus sign
  label = 'New Task',
  className,
}) => {
  return (
    <motion.button
      className={`fixed bottom-6 right-6 z-40 flex items-center justify-center p-4 rounded-full text-white shadow-lg bg-primary hover:bg-opacity-80 transition-colors duration-200 ease-in-out ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      aria-label={label}
    >
      <span className="text-3xl font-bold">{icon}</span>
      {label && <span className="ml-2 hidden sm:block">{label}</span>}
    </motion.button>
  );
};

export default FloatingActionButton;
